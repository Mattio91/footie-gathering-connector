import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FootballFieldProps {
  teamAPlayers: number;
  teamBPlayers: number;
  maxPlayers: number;
  className?: string;
}

const FootballField = ({ 
  teamAPlayers, 
  teamBPlayers, 
  maxPlayers, 
  className 
}: FootballFieldProps) => {
  // Calculate how many players to show (can't exceed maxPlayers/2 per team)
  const maxPlayersPerTeam = Math.floor(maxPlayers / 2);
  const displayTeamAPlayers = Math.min(teamAPlayers, maxPlayersPerTeam);
  const displayTeamBPlayers = Math.min(teamBPlayers, maxPlayersPerTeam);
  
  // State for interactive players
  const [players, setPlayers] = useState<{
    id: number;
    team: 'A' | 'B';
    x: number;
    y: number;
    hasBall: boolean;
    baseX: number;
    baseY: number;
    isDefending: boolean;
  }[]>([]);
  
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [activeBall, setActiveBall] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastAiMoveRef = useRef<number>(0);
  const gameSpeedRef = useRef<number>(1); // 1 = normal speed
  
  // Initialize players based on formation
  useEffect(() => {
    // For team A (5 players including GK)
    const teamAPositions = [
      { x: 50, y: 10 }, // GK
      { x: 30, y: 30 }, // DEF
      { x: 70, y: 30 }, // DEF
      { x: 40, y: 60 }, // MID/FWD
      { x: 60, y: 60 }  // MID/FWD
    ];
    
    // For team B (5 players including GK)
    const teamBPositions = [
      { x: 50, y: 90 }, // GK
      { x: 30, y: 70 }, // DEF
      { x: 70, y: 70 }, // DEF
      { x: 40, y: 40 }, // MID/FWD
      { x: 60, y: 40 }  // MID/FWD
    ];
    
    // Create actual players
    const initialPlayers = [];
    let idCounter = 1;
    
    // Add team A players
    for (let i = 0; i < Math.min(displayTeamAPlayers, 5); i++) {
      initialPlayers.push({
        id: idCounter++,
        team: 'A' as const,
        x: teamAPositions[i].x,
        y: teamAPositions[i].y,
        baseX: teamAPositions[i].x,
        baseY: teamAPositions[i].y,
        hasBall: false,
        isDefending: false
      });
    }
    
    // Add team B players
    for (let i = 0; i < Math.min(displayTeamBPlayers, 5); i++) {
      initialPlayers.push({
        id: idCounter++,
        team: 'B' as const,
        x: teamBPositions[i].x,
        y: teamBPositions[i].y,
        baseX: teamBPositions[i].x,
        baseY: teamBPositions[i].y,
        hasBall: false,
        isDefending: false
      });
    }
    
    // Give the ball to a random player on team A to start
    const teamAPlayers = initialPlayers.filter(p => p.team === 'A');
    if (teamAPlayers.length > 0) {
      const randomIndex = Math.floor(Math.random() * teamAPlayers.length);
      const randomPlayer = teamAPlayers[randomIndex];
      randomPlayer.hasBall = true;
      setBallPosition({ x: randomPlayer.x, y: randomPlayer.y });
    }
    
    setPlayers(initialPlayers);
    
    // Start game simulation
    startGameSimulation();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [displayTeamAPlayers, displayTeamBPlayers]);
  
  // Handle clicking on a player
  const handlePlayerClick = (playerId: number) => {
    const playerWithBall = players.find(p => p.hasBall);
    const clickedPlayer = players.find(p => p.id === playerId);
    
    if (!clickedPlayer) return;
    
    // If the clicked player has the ball, make them active for passing
    if (clickedPlayer.hasBall) {
      setSelectedPlayer(playerId);
      setActiveBall(true);
      return;
    }
    
    // If we have a selected player with the ball, pass to the clicked player
    if (selectedPlayer && playerWithBall && playerWithBall.id === selectedPlayer) {
      // Only allow passing to players on the same team
      if (playerWithBall.team === clickedPlayer.team) {
        passBall(selectedPlayer, playerId);
      }
    }
  };
  
  // Pass the ball between players
  const passBall = (fromId: number, toId: number) => {
    const fromPlayer = players.find(p => p.id === fromId);
    const toPlayer = players.find(p => p.id === toId);
    
    if (!fromPlayer || !toPlayer) return;
    
    // Animate the ball movement
    animateBallMovement(
      { x: fromPlayer.x, y: fromPlayer.y },
      { x: toPlayer.x, y: toPlayer.y },
      () => {
        // After animation completes, update the ball possession
        const updatedPlayers = players.map(p => ({
          ...p,
          hasBall: p.id === toId
        }));
        
        setPlayers(updatedPlayers);
        setSelectedPlayer(null);
        setActiveBall(false);
      }
    );
  };
  
  // Animate ball movement between two points
  const animateBallMovement = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    onComplete: () => void
  ) => {
    const startTime = performance.now();
    const duration = 500 / gameSpeedRef.current; // ms
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Simple linear interpolation
      const newX = start.x + (end.x - start.x) * progress;
      const newY = start.y + (end.y - start.y) * progress;
      
      setBallPosition({ x: newX, y: newY });
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  // Field click handler - move selected player
  const handleFieldClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedPlayer || !fieldRef.current) return;
    
    const rect = fieldRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Move the selected player
    movePlayerTo(selectedPlayer, x, y);
  };
  
  // Move a player to a new position with animation
  const movePlayerTo = (playerId: number, targetX: number, targetY: number) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;
    
    const startPos = { x: player.x, y: player.y };
    const startTime = performance.now();
    const duration = 800 / gameSpeedRef.current; // ms
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setPlayers(prevPlayers => prevPlayers.map(p => {
        if (p.id === playerId) {
          const newX = startPos.x + (targetX - startPos.x) * progress;
          const newY = startPos.y + (targetY - startPos.y) * progress;
          
          // If this player has the ball, move the ball with them
          if (p.hasBall) {
            setBallPosition({ x: newX, y: newY });
          }
          
          return { ...p, x: newX, y: newY };
        }
        return p;
      }));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };
  
  // Game simulation logic
  const startGameSimulation = () => {
    const gameLoop = (time: number) => {
      // AI decision making - run every 100ms
      if (time - lastAiMoveRef.current > 100) {
        lastAiMoveRef.current = time;
        simulateAI();
      }
      
      animationRef.current = requestAnimationFrame(gameLoop);
    };
    
    animationRef.current = requestAnimationFrame(gameLoop);
  };
  
  // AI decision making
  const simulateAI = () => {
    // Find player with ball
    const playerWithBall = players.find(p => p.hasBall);
    if (!playerWithBall) return;
    
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      
      // For each player without the ball
      for (const player of newPlayers) {
        if (player.id === playerWithBall.id || player.id === selectedPlayer) continue;
        
        // Opposing team behavior - press the ball
        if (player.team !== playerWithBall.team) {
          // Closest defenders should press
          const distToBall = getDistance(player, playerWithBall);
          
          // If player is close to the ball holder, press them
          if (distToBall < 30) {
            player.isDefending = true;
            
            // Move toward ball holder
            const dx = (playerWithBall.x - player.x) * 0.05;
            const dy = (playerWithBall.y - player.y) * 0.05;
            
            player.x += dx;
            player.y += dy;
          } 
          // Otherwise return to position gradually
          else {
            player.isDefending = false;
            returnToPosition(player, 0.02);
          }
        } 
        // Same team behavior - maintain formation and offer passing options
        else {
          // Make supporting runs when team has possession
          const distToBall = getDistance(player, playerWithBall);
          
          // If not too close to ball holder, make supporting runs
          if (distToBall > 15 && distToBall < 40) {
            // Find space away from opposing players
            const opponentPositions = players.filter(p => p.team !== player.team);
            let targetX = player.baseX;
            let targetY = player.baseY;
            
            // Simple offensive movement - move forward
            if (player.team === 'A') {
              targetY = Math.min(player.baseY + 15, 80);
            } else {
              targetY = Math.max(player.baseY - 15, 20);
            }
            
            // Move slightly toward the calculated position
            const dx = (targetX - player.x) * 0.04;
            const dy = (targetY - player.y) * 0.04;
            
            player.x += dx;
            player.y += dy;
          } else {
            // Return to base position if far from play
            returnToPosition(player, 0.02);
          }
        }
      }
      
      // AI team may occasionally attempt a pass
      if (playerWithBall.team === 'B' && Math.random() < 0.01) {
        // Find a teammate to pass to
        const teammates = newPlayers.filter(p => p.team === 'B' && p.id !== playerWithBall.id);
        if (teammates.length > 0) {
          // Find a good passing option (not closely marked)
          let bestPassOption = teammates[0];
          let lowestPressure = 100;
          
          for (const teammate of teammates) {
            // Calculate pressure on this teammate from opposing players
            let pressure = 0;
            const opponents = newPlayers.filter(p => p.team === 'A');
            for (const opponent of opponents) {
              const dist = getDistance(teammate, opponent);
              pressure += dist < 15 ? (15 - dist) : 0;
            }
            
            if (pressure < lowestPressure) {
              lowestPressure = pressure;
              bestPassOption = teammate;
            }
          }
          
          // Execute the pass
          setTimeout(() => {
            passBall(playerWithBall.id, bestPassOption.id);
          }, Math.random() * 1000); // Random delay to make it seem more natural
        }
      }
      
      return newPlayers;
    });
  };
  
  // Helper to return player to base position
  const returnToPosition = (player: typeof players[0], speed: number) => {
    const dx = (player.baseX - player.x) * speed;
    const dy = (player.baseY - player.y) * speed;
    
    player.x += dx;
    player.y += dy;
  };
  
  // Helper to calculate distance between players
  const getDistance = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };
  
  return (
    <div 
      ref={fieldRef}
      className={cn("relative w-full aspect-[2/3] mx-auto max-w-md cursor-pointer", className)}
      onClick={handleFieldClick}
    >
      {/* Field background */}
      <div className="absolute inset-0 bg-green-600 rounded-xl overflow-hidden">
        {/* Field pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white" />
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white" />
          <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-white" />
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/6 rounded-full border border-white" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[2px] h-[2px] bg-white rounded-full" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white" />
          
          {/* Penalty areas */}
          <div className="absolute top-0 left-1/4 right-1/4 h-1/5 border-b border-l border-r border-white" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-1/5 border-t border-l border-r border-white" />
          
          {/* Goal areas */}
          <div className="absolute top-0 left-1/3 right-1/3 h-1/10 border-b border-l border-r border-white" />
          <div className="absolute bottom-0 left-1/3 right-1/3 h-1/10 border-t border-l border-r border-white" />
          
          {/* Goals */}
          <div className="absolute top-0 left-2/5 right-2/5 h-[4px] border-b border-l border-r border-white bg-white/20" />
          <div className="absolute bottom-0 left-2/5 right-2/5 h-[4px] border-t border-l border-r border-white bg-white/20" />
        </div>
        
        {/* Ball */}
        <div 
          className={cn(
            "absolute w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20",
            activeBall ? "animate-pulse-gentle" : ""
          )}
          style={{ 
            left: `${ballPosition.x}%`, 
            top: `${ballPosition.y}%`,
            transition: !activeBall ? 'left 0.3s ease-out, top 0.3s ease-out' : 'none',
            boxShadow: '0 0 5px rgba(0,0,0,0.3)'
          }}
        ></div>
        
        {/* Interactive player dots */}
        {players.map(player => (
          <div 
            key={player.id}
            className={cn(
              "absolute w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer",
              player.team === 'A' ? "bg-team-home" : "bg-team-away",
              selectedPlayer === player.id ? "ring-2 ring-white ring-opacity-70 scale-125" : "",
              player.hasBall ? "ring-1 ring-white ring-opacity-70" : "",
              player.isDefending ? "animate-pulse-gentle" : ""
            )}
            style={{ 
              left: `${player.x}%`, 
              top: `${player.y}%`,
              zIndex: selectedPlayer === player.id ? 10 : 5,
              transition: 'transform 0.2s ease-out'
            }}
            onClick={(e) => {
              e.stopPropagation();
              handlePlayerClick(player.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FootballField;
