
import { BallPosition } from '@/hooks/useMiniFootballGame';

// Animate ball movement between two points
export const animateBallMovement = (
  start: BallPosition,
  end: BallPosition,
  onComplete: () => void,
  setBallPosition: (position: BallPosition) => void,
  animationRef: React.MutableRefObject<number | null>
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
