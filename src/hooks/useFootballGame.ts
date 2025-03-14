
import { useState, useEffect, useRef } from 'react';
import { FootballPlayer, BallPosition } from '@/lib/footballUtils';
import { usePlayerMovement } from './football/usePlayerMovement';
import { useBallMovement } from './football/useBallMovement';
import { useGameInitialization } from './football/useGameInitialization';

export function useFootballGame(teamAPlayers: number, teamBPlayers: number, maxPlayers: number) {
  // Calculate how many players to show (can't exceed maxPlayers/2 per team)
  const maxPlayersPerTeam = Math.floor(maxPlayers / 2);
  const displayTeamAPlayers = Math.min(teamAPlayers, maxPlayersPerTeam);
  const displayTeamBPlayers = Math.min(teamBPlayers, maxPlayersPerTeam);
  
  // Get sub-hooks
  const { updatePlayerPositions } = usePlayerMovement();
  const { 
    passBall, 
    findRandomTeammate, 
    animationRef, 
    isPassingRef,
    cleanupAnimation 
  } = useBallMovement();
  const { initializePlayers } = useGameInitialization();
  
  // State for players and ball
  const [players, setPlayers] = useState<FootballPlayer[]>([]);
  const [ballPosition, setBallPosition] = useState<BallPosition>({ x: 50, y: 50 });
  
  // Game control refs
  const lastPassTimeRef = useRef<number>(0);
  const lastMoveRef = useRef<number>(0);
  
  // Game simulation logic
  const startGameSimulation = () => {
    const gameLoop = (time: number) => {
      // Update players every ~16ms (60fps)
      if (time - lastMoveRef.current > 16) {
        lastMoveRef.current = time;
        
        // Update player positions
        setPlayers(prevPlayers => {
          const newPlayers = updatePlayerPositions(prevPlayers, time, ballPosition, isPassingRef);
          const playerWithBall = newPlayers.find(p => p.hasBall);
          
          if (!playerWithBall) return newPlayers;
          
          // Check for passing the ball (based on time)
          if (!isPassingRef.current && time - lastPassTimeRef.current > 1500) {
            const randomTeammate = findRandomTeammate(playerWithBall, newPlayers);
            
            if (randomTeammate) {
              // Pass the ball to a random teammate
              passBall(playerWithBall, randomTeammate, newPlayers, setPlayers, setBallPosition);
              lastPassTimeRef.current = time;
            }
          }
          
          // Update ball position to follow player with ball
          if (playerWithBall.hasBall && !isPassingRef.current) {
            setBallPosition({ x: playerWithBall.x, y: playerWithBall.y });
          }
          
          return newPlayers;
        });
      }
      
      animationRef.current = requestAnimationFrame(gameLoop);
    };
    
    animationRef.current = requestAnimationFrame(gameLoop);
  };
  
  // Initialize players and start game
  useEffect(() => {
    // Initialize players
    const { initialPlayers, initialBallPosition } = initializePlayers(
      displayTeamAPlayers, 
      displayTeamBPlayers
    );
    
    setPlayers(initialPlayers);
    setBallPosition(initialBallPosition);
    
    // Start game simulation
    startGameSimulation();
    
    // Cleanup on unmount
    return cleanupAnimation;
  }, [displayTeamAPlayers, displayTeamBPlayers]);
  
  return { players, ballPosition };
}
