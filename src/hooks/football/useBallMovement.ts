
import { useRef } from 'react';
import { 
  FootballPlayer,
  BallPosition,
  animateBallMovement
} from '@/lib/footballUtils';

export function useBallMovement() {
  const animationRef = useRef<number | null>(null);
  const gameSpeedRef = useRef<number>(1); // 1 = normal speed
  const isPassingRef = useRef<boolean>(false);
  
  // Pass the ball between players
  const passBall = (
    fromPlayer: FootballPlayer, 
    toPlayer: FootballPlayer,
    players: FootballPlayer[],
    setPlayers: React.Dispatch<React.SetStateAction<FootballPlayer[]>>,
    setBallPosition: React.Dispatch<React.SetStateAction<BallPosition>>
  ) => {
    // Animate the ball movement
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    isPassingRef.current = true;
    
    animationRef.current = animateBallMovement(
      { x: fromPlayer.x, y: fromPlayer.y },
      { x: toPlayer.x, y: toPlayer.y },
      gameSpeedRef,
      setBallPosition,
      () => {
        // After animation completes, update the ball possession
        const updatedPlayers = players.map(p => ({
          ...p,
          hasBall: p.id === toPlayer.id
        }));
        
        setPlayers(updatedPlayers);
        isPassingRef.current = false;
      }
    );
  };
  
  // Find a random teammate to pass to
  const findRandomTeammate = (currentPlayer: FootballPlayer, allPlayers: FootballPlayer[]) => {
    const teammates = allPlayers.filter(p => 
      p.team === currentPlayer.team && 
      p.id !== currentPlayer.id
    );
    
    if (teammates.length === 0) return null;
    
    // Get a random teammate
    const randomIndex = Math.floor(Math.random() * teammates.length);
    return teammates[randomIndex];
  };

  // Clean up animation on unmount
  const cleanupAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };
  
  return { 
    passBall, 
    findRandomTeammate, 
    animationRef,
    gameSpeedRef,
    isPassingRef,
    cleanupAnimation
  };
}
