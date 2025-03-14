import { useState, useEffect, useRef } from 'react';
import { animateBallMovement } from '@/lib/miniFootballUtils';

export type Player = {
  id: number;
  team: 'home' | 'away';
  x: number;
  y: number;
  hasBall: boolean;
};

export type BallPosition = {
  x: number;
  y: number;
};

export function useMiniFootballGame() {
  // State for players and ball positions
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, team: 'home', x: 25, y: 33, hasBall: false },
    { id: 2, team: 'home', x: 33, y: 66, hasBall: false },
    { id: 3, team: 'away', x: 75, y: 33, hasBall: false },
    { id: 4, team: 'away', x: 66, y: 66, hasBall: false },
  ]);
  
  const [ballPosition, setBallPosition] = useState<BallPosition>({ x: 33, y: 50 });
  const [activeBall, setActiveBall] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
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
      },
      setBallPosition,
      animationRef
    );
  };
  
  // Handle field click for moving selected player
  const handleFieldClick = (e: React.MouseEvent<HTMLDivElement>, fieldRef: React.RefObject<HTMLDivElement>) => {
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
  
  return {
    players,
    ballPosition,
    activeBall,
    selectedPlayer,
    handlePlayerClick,
    handleFieldClick
  };
}
