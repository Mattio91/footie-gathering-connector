import { useState, useEffect, useRef } from 'react';
import { 
  FootballPlayer, 
  BallPosition, 
  getDistance, 
  isPlayerMarkedTightly, 
  returnToPosition,
  animateBallMovement
} from '@/lib/footballUtils';

export function useFootballGame(teamAPlayers: number, teamBPlayers: number, maxPlayers: number) {
  // Calculate how many players to show (can't exceed maxPlayers/2 per team)
  const maxPlayersPerTeam = Math.floor(maxPlayers / 2);
  const displayTeamAPlayers = Math.min(teamAPlayers, maxPlayersPerTeam);
  const displayTeamBPlayers = Math.min(teamBPlayers, maxPlayersPerTeam);
  
  // State for players and ball
  const [players, setPlayers] = useState<FootballPlayer[]>([]);
  const [ballPosition, setBallPosition] = useState<BallPosition>({ x: 50, y: 50 });
  
  // Game control refs
  const animationRef = useRef<number | null>(null);
  const lastPassTimeRef = useRef<number>(0);
  const gameSpeedRef = useRef<number>(1); // 1 = normal speed
  const lastMoveRef = useRef<number>(0);
  
  // Pass the ball between players
  const passBall = (fromPlayer: FootballPlayer, toPlayer: FootballPlayer) => {
    // Animate the ball movement
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
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
      }
    );
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
    const initialPlayers: FootballPlayer[] = [];
    let idCounter = 1;
    
    // Add team A players
    for (let i = 0; i < Math.min(displayTeamAPlayers, 5); i++) {
      initialPlayers.push({
        id: idCounter++,
        team: 'A',
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
        team: 'B',
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
  
  return { players, ballPosition };
}
