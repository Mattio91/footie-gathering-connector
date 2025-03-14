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
  
  // State for players
  const [players, setPlayers] = useState<{
    id: number;
    team: 'A' | 'B';
    x: number;
    y: number;
    hasBall: boolean;
    baseX: number;
    baseY: number;
    isDefending: boolean;
    lastMoveTime: number;
  }[]>([]);
  
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const fieldRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastPassTimeRef = useRef<number>(0);
  const gameSpeedRef = useRef<number>(1); // 1 = normal speed
  const lastMoveRef = useRef<number>(0);
  
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
        isDefending: false,
        lastMoveTime: 0
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
        isDefending: false,
        lastMoveTime: 0
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
  
  // Pass the ball between players
  const passBall = (fromPlayer: typeof players[0], toPlayer: typeof players[0]) => {
    // Animate the ball movement
    animateBallMovement(
      { x: fromPlayer.x, y: fromPlayer.y },
      { x: toPlayer.x, y: toPlayer.y },
      () => {
        // After animation completes, update the ball possession
        const updatedPlayers = players.map(p => ({
          ...p,
          hasBall: p.id === toPlayer.id
        }));
        
        setPlayers(updatedPlayers);
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
      
      // Add slight arc to the ball path for realism
      const newX = start.x + (end.x - start.x) * progress;
      const newY = start.y + (end.y - start.y) * progress;
      
      // Add a slight arc for the ball movement
      // Higher in the middle of the pass
      const arcHeight = 5; // Maximum arc height
      const arcY = Math.sin(progress * Math.PI) * arcHeight;
      
      setBallPosition({ 
        x: newX, 
        y: newY - arcY // Subtract to make ball go up (Y is inverted)
      });
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  // Game simulation logic
  const startGameSimulation = () => {
    const gameLoop = (time: number) => {
      // Update players every ~16ms (60fps)
      if (time - lastMoveRef.current > 16) {
        lastMoveRef.current = time;
        updatePlayerPositions(time);
      }
      
      animationRef.current = requestAnimationFrame(gameLoop);
    };
    
    animationRef.current = requestAnimationFrame(gameLoop);
  };
  
  // Update player positions and handle AI
  const updatePlayerPositions = (time: number) => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      const playerWithBall = newPlayers.find(p => p.hasBall);
      
      if (!playerWithBall) return newPlayers;
      
      // Check for passing the ball (based on time and randomness)
      if (time - lastPassTimeRef.current > 2000 && Math.random() < 0.03) {
        const possibleReceivers = newPlayers.filter(p => 
          p.team === playerWithBall.team && 
          p.id !== playerWithBall.id &&
          !isPlayerMarkedTightly(p, newPlayers.filter(op => op.team !== p.team))
        );
        
        if (possibleReceivers.length > 0) {
          // Find best passing option
          let bestReceiver = possibleReceivers[0];
          let bestScore = -Infinity;
          
          for (const receiver of possibleReceivers) {
            // Calculate how good this passing option is
            const distToBall = getDistance(playerWithBall, receiver);
            const isForward = (playerWithBall.team === 'A' && receiver.y > playerWithBall.y) ||
                              (playerWithBall.team === 'B' && receiver.y < playerWithBall.y);
            
            // Prefer forward passes that aren't too far
            const forwardBonus = isForward ? 20 : 0;
            const distanceScore = 100 - Math.min(distToBall, 80); // Closer is better but not too close
            const score = distanceScore + forwardBonus;
            
            if (score > bestScore) {
              bestScore = score;
              bestReceiver = receiver;
            }
          }
          
          // Pass the ball to the best receiver
          passBall(playerWithBall, bestReceiver);
          lastPassTimeRef.current = time;
          return newPlayers;
        }
      }
      
      // Handle player movement
      for (const player of newPlayers) {
        // Skip very frequent movements to create smoother animations
        if (time - player.lastMoveTime < 50) continue;
        player.lastMoveTime = time;
        
        // Player with ball moves slightly forward
        if (player.hasBall) {
          const forwardDirection = player.team === 'A' ? 1 : -1;
          const sidewaysMovement = (Math.random() - 0.5) * 0.5; // Slight sideways movement
          
          // Move forward with the ball, but stay in bounds
          if (player.team === 'A' && player.y < 85) {
            player.y += 0.2 * forwardDirection;
            player.x += sidewaysMovement;
          } else if (player.team === 'B' && player.y > 15) {
            player.y += 0.2 * forwardDirection;
            player.x += sidewaysMovement;
          }
          
          // Keep ball with player
          setBallPosition({ x: player.x, y: player.y });
          
          // Keep within bounds
          player.x = Math.max(5, Math.min(95, player.x));
          player.y = Math.max(5, Math.min(95, player.y));
        } 
        // Defending players (opposite team from ball holder) press the ball
        else if (player.team !== playerWithBall.team) {
          const distToBall = getDistance(player, playerWithBall);
          
          // Closest players press the ball
          if (distToBall < 30) {
            player.isDefending = true;
            // Make some defensive movements toward ball holder
            const dx = (playerWithBall.x - player.x) * 0.05;
            const dy = (playerWithBall.y - player.y) * 0.05;
            
            player.x += dx;
            player.y += dy;
          } 
          // Others maintain formation
          else {
            player.isDefending = false;
            // Return to base position
            returnToPosition(player, 0.02);
          }
        } 
        // Same team as ball holder - provide support
        else {
          const distToBall = getDistance(player, playerWithBall);
          
          // Make supporting runs when team has possession
          if (distToBall > 15 && distToBall < 40) {
            // Find space away from defending players
            let targetX = player.baseX + (Math.random() - 0.5) * 5;
            let targetY = player.baseY;
            
            // Make forward runs
            if (player.team === 'A') {
              targetY = Math.min(player.baseY + 10, 85);
            } else {
              targetY = Math.max(player.baseY - 10, 15);
            }
            
            // Move slightly toward the calculated position
            const dx = (targetX - player.x) * 0.03;
            const dy = (targetY - player.y) * 0.03;
            
            player.x += dx;
            player.y += dy;
          } else {
            // Return toward base position
            returnToPosition(player, 0.01);
          }
        }
      }
      
      return newPlayers;
    });
  };
  
  // Check if a player is tightly marked by opponents
  const isPlayerMarkedTightly = (player: typeof players[0], opponents: typeof players) => {
    for (const opponent of opponents) {
      if (getDistance(player, opponent) < 10) {
        return true;
      }
    }
    return false;
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
      className={cn("relative w-full aspect-[2/3] mx-auto max-w-md", className)}
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
          className="absolute w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-sm"
          style={{ 
            left: `${ballPosition.x}%`, 
            top: `${ballPosition.y}%`,
          }}
        ></div>
        
        {/* Players */}
        {players.map(player => (
          <div 
            key={player.id}
            className={cn(
              "absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2",
              player.team === 'A' ? "bg-team-home" : "bg-team-away",
              player.isDefending ? "animate-pulse-gentle" : "",
              player.hasBall ? "ring-1 ring-white ring-opacity-80" : ""
            )}
            style={{ 
              left: `${player.x}%`, 
              top: `${player.y}%`,
              zIndex: player.hasBall ? 10 : 5,
              transition: 'transform 0.2s ease-out'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FootballField;
