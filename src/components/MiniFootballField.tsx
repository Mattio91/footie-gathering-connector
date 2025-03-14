import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const MiniFootballField = () => {
  // State for players and ball positions
  const [players, setPlayers] = useState([
    { id: 1, team: 'home', x: 25, y: 33, hasBall: false },
    { id: 2, team: 'home', x: 33, y: 66, hasBall: false },
    { id: 3, team: 'away', x: 75, y: 33, hasBall: false },
    { id: 4, team: 'away', x: 66, y: 66, hasBall: false },
  ]);
  
  const [ballPosition, setBallPosition] = useState({ x: 33, y: 50 });
  const [activeBall, setActiveBall] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Initialize the game - place ball with a random player at start
  useEffect(() => {
    const randomPlayerIndex = Math.floor(Math.random() * players.length);
    const newPlayers = [...players];
    newPlayers[randomPlayerIndex].hasBall = true;
    setPlayers(newPlayers);
    setBallPosition({ 
      x: newPlayers[randomPlayerIndex].x, 
      y: newPlayers[randomPlayerIndex].y 
    });
    
    // Flip player positions horizontally
    setPlayers(prevPlayers => 
      prevPlayers.map(player => ({
        ...player,
        // Flip X coordinates (100 - x)
        x: 100 - player.x
      }))
    );
    
    // Start simple AI movement of players
    startAutoMovement();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Handle clicking on players
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
      passBall(selectedPlayer, playerId);
    }
  };
  
  // Pass the ball between players
  const passBall = (fromId: number, toId: number) => {
    const fromPlayer = players.find(p => p.id === fromId);
    const toPlayer = players.find(p => p.id === toId);
    
    if (!fromPlayer || !toPlayer) return;
    
    // Only allow passing to players on the same team
    if (fromPlayer.team !== toPlayer.team) return;
    
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
    const duration = 500; // ms
    
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
    const updatedPlayers = players.map(p => {
      if (p.id === selectedPlayer) {
        // Animate player movement
        movePlayerTo(p.id, x, y);
        return p;
      }
      return p;
    });
    
    setPlayers(updatedPlayers);
  };
  
  // Move a player to a new position with animation
  const movePlayerTo = (playerId: number, targetX: number, targetY: number) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;
    
    const startPos = { x: player.x, y: player.y };
    const startTime = performance.now();
    const duration = 800; // ms
    
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
  
  // Auto movement for non-selected players
  const startAutoMovement = () => {
    const moveInterval = 5000; // ms
    let lastMove = performance.now();
    
    const randomizeMovement = (time: number) => {
      if (time - lastMove > moveInterval) {
        lastMove = time;
        
        // Move each player randomly, except the selected one
        setPlayers(prevPlayers => 
          prevPlayers.map(player => {
            if (player.id === selectedPlayer) return player;
            
            // Random movement within 10% range
            const deltaX = (Math.random() - 0.5) * 10;
            const deltaY = (Math.random() - 0.5) * 10;
            
            // Keep within field bounds
            const newX = Math.max(10, Math.min(90, player.x + deltaX));
            const newY = Math.max(10, Math.min(90, player.y + deltaY));
            
            // If this player has the ball, move the ball with them
            if (player.hasBall) {
              setBallPosition({ x: newX, y: newY });
            }
            
            return { ...player, x: newX, y: newY };
          })
        );
      }
      
      animationRef.current = requestAnimationFrame(randomizeMovement);
    };
    
    animationRef.current = requestAnimationFrame(randomizeMovement);
  };
  
  return (
    <div 
      ref={fieldRef}
      className="relative w-24 h-12 mx-4 cursor-pointer"
      onClick={handleFieldClick}
      style={{ transform: 'scaleX(-1)' }} // Flip the entire field horizontally
    >
      {/* Field background */}
      <div className="absolute inset-0 bg-green-600 rounded-lg overflow-hidden border border-green-700">
        {/* Field pattern */}
        <div className="absolute inset-0 opacity-40">
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-white"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white"></div>
          
          {/* Goal areas */}
          <div className="absolute top-0 left-1/3 right-1/3 h-1.5 border-b border-l border-r border-white"></div>
          <div className="absolute bottom-0 left-1/3 right-1/3 h-1.5 border-t border-l border-r border-white"></div>
          
          {/* Field outline */}
          <div className="absolute inset-0.5 border border-white rounded-md"></div>
        </div>
        
        {/* Ball */}
        <div 
          className={cn(
            "absolute w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2",
            activeBall ? "animate-pulse" : ""
          )}
          style={{ 
            left: `${ballPosition.x}%`, 
            top: `${ballPosition.y}%`,
            transition: !activeBall ? 'left 0.5s ease-out, top 0.5s ease-out' : 'none',
            transform: 'scaleX(-1)' // Flip the ball back so it doesn't look mirrored
          }}
        ></div>
        
        {/* Player dots */}
        {players.map(player => (
          <div 
            key={player.id}
            className={cn(
              "absolute w-1.5 h-1.5 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300",
              player.team === 'home' ? "bg-team-home" : "bg-team-away",
              selectedPlayer === player.id ? "ring-2 ring-white ring-opacity-70 scale-125" : "",
              player.hasBall ? "ring-1 ring-white ring-opacity-70" : ""
            )}
            style={{ 
              left: `${player.x}%`, 
              top: `${player.y}%`,
              zIndex: selectedPlayer === player.id ? 10 : 5,
              transform: 'scaleX(-1)' // Flip the players back so they don't look mirrored
            }}
            onClick={(e) => {
              e.stopPropagation();
              handlePlayerClick(player.id);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MiniFootballField;
