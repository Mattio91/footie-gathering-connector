
import React from 'react';
import { cn } from '@/lib/utils';
import { Player } from '@/hooks/useMiniFootballGame';

interface MiniPlayerProps {
  player: Player;
  isSelected: boolean;
  onClick: (id: number) => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ player, isSelected, onClick }) => {
  return (
    <div 
      className={cn(
        "absolute w-1.5 h-1.5 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300",
        player.team === 'home' ? "bg-team-home" : "bg-team-away",
        isSelected ? "ring-2 ring-white ring-opacity-70 scale-125" : "",
        player.hasBall ? "ring-1 ring-white ring-opacity-70" : ""
      )}
      style={{ 
        left: `${player.x}%`, 
        top: `${player.y}%`,
        zIndex: isSelected ? 10 : 5
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(player.id);
      }}
    />
  );
};

export default MiniPlayer;
