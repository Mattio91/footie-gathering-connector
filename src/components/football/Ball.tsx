
import React from 'react';
import { BallPosition } from '@/lib/footballUtils';

interface BallProps {
  position: BallPosition;
}

const Ball: React.FC<BallProps> = ({ position }) => {
  return (
    <div 
      className="absolute w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-sm"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
      }}
    />
  );
};

export default Ball;
