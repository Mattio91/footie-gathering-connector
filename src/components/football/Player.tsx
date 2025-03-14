
import React from 'react';
import { cn } from '@/lib/utils';
import { FootballPlayer } from '@/lib/footballUtils';

interface PlayerProps {
  player: FootballPlayer;
}

const Player: React.FC<PlayerProps> = ({ player }) => {
  return (
    <div 
      className={cn(
        "absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2",
        player.team === 'A' ? "bg-team-home" : "bg-team-away",
        player.isDefending ? "animate-pulse-gentle" : "",
        player.hasBall ? "ring-1 ring-white ring-opacity-80" : ""
      )}
      style={{ 
        left: `${player.x}%`, 
        top: `${player.y}%`,
        zIndex: player.hasBall ? 10 : 5,
        transition: 'transform 0.2s ease-out'
      }}
    />
  );
};

export default Player;
