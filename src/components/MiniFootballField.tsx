
import React, { useRef } from 'react';
import { useMiniFootballGame } from '@/hooks/useMiniFootballGame';
import MiniField from './football/MiniField';
import MiniPlayer from './football/MiniPlayer';
import MiniBall from './football/MiniBall';

const MiniFootballField: React.FC = () => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const { 
    players, 
    ballPosition, 
    activeBall, 
    selectedPlayer,
    handlePlayerClick, 
    handleFieldClick 
  } = useMiniFootballGame();
  
  return (
    <div 
      ref={fieldRef}
      className="relative w-12 h-24 mx-4 cursor-pointer"
      onClick={(e) => handleFieldClick(e, fieldRef)}
      style={{ transform: 'rotate(90deg)' }}
    >
      {/* Field background */}
      <div className="absolute inset-0 bg-green-600 rounded-lg overflow-hidden border border-green-700">
        {/* Field pattern */}
        <MiniField />
        
        {/* Ball */}
        <MiniBall position={ballPosition} isActive={activeBall} />
        
        {/* Player dots */}
        {players.map(player => (
          <MiniPlayer 
            key={player.id}
            player={player}
            isSelected={selectedPlayer === player.id}
            onClick={handlePlayerClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MiniFootballField;
