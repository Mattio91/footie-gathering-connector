
import React from 'react';
import { cn } from '@/lib/utils';
import { BallPosition } from '@/hooks/useMiniFootballGame';

interface MiniBallProps {
  position: BallPosition;
  isActive: boolean;
}

const MiniBall: React.FC<MiniBallProps> = ({ position, isActive }) => {
  return (
    <div 
      className={cn(
        "absolute w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2",
        isActive ? "animate-pulse" : ""
      )}
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transition: !isActive ? 'left 0.5s ease-out, top 0.5s ease-out' : 'none'
      }}
    />
  );
};

export default MiniBall;
