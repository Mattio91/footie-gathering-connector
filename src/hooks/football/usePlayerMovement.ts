import { useState, useRef } from 'react';
import { 
  FootballPlayer, 
  getDistance, 
  returnToPosition 
} from '@/lib/footballUtils';
import { BallPosition } from '@/lib/footballUtils';

export function usePlayerMovement() {
  // Update player positions and handle AI
  const updatePlayerPositions = (
    prevPlayers: FootballPlayer[], 
    time: number, 
    ballPosition: BallPosition,
    isPassingRef: React.MutableRefObject<boolean>
  ) => {
    const newPlayers = [...prevPlayers];
    const playerWithBall = newPlayers.find(p => p.hasBall);
    
    if (!playerWithBall) return newPlayers;

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
  };

  return { updatePlayerPositions };
}
