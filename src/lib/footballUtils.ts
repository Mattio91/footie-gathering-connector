
// Utility functions for football game logic

// Helper to calculate distance between two points
export const getDistance = (p1: {x: number, y: number}, p2: {x: number, y: number}): number => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

// Check if a player is tightly marked by opponents
export const isPlayerMarkedTightly = (
  player: FootballPlayer, 
  opponents: FootballPlayer[]
): boolean => {
  for (const opponent of opponents) {
    if (getDistance(player, opponent) < 10) {
      return true;
    }
  }
  return false;
};

// Helper to return player to base position
export const returnToPosition = (
  player: FootballPlayer, 
  speed: number
): void => {
  const dx = (player.baseX - player.x) * speed;
  const dy = (player.baseY - player.y) * speed;
  
  player.x += dx;
  player.y += dy;
};

// Player type definition
export interface FootballPlayer {
  id: number;
  team: 'A' | 'B';
  x: number;
  y: number;
  hasBall: boolean;
  baseX: number;
  baseY: number;
  isDefending: boolean;
  lastMoveTime: number;
}

// Ball position type
export interface BallPosition {
  x: number;
  y: number;
}

// Animate ball movement between two points
export const animateBallMovement = (
  start: BallPosition,
  end: BallPosition,
  gameSpeedRef: React.MutableRefObject<number>,
  setBallPosition: (position: BallPosition) => void,
  onComplete: () => void
): number => {
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
      return requestAnimationFrame(animate);
    } else {
      onComplete();
      return null;
    }
  };
  
  return requestAnimationFrame(animate);
};
