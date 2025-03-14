
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useFootballGame } from '@/hooks/useFootballGame';
import Field from '@/components/football/Field';
import Player from '@/components/football/Player';
import Ball from '@/components/football/Ball';

interface FootballFieldProps {
  teamAPlayers: number;
  teamBPlayers: number;
  maxPlayers: number;
  className?: string;
}

const FootballField: React.FC<FootballFieldProps> = ({ 
  teamAPlayers, 
  teamBPlayers, 
  maxPlayers, 
  className 
}) => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const { players, ballPosition } = useFootballGame(teamAPlayers, teamBPlayers, maxPlayers);
  
  return (
    <div 
      ref={fieldRef}
      className={cn("relative w-full aspect-[3/2] mx-auto max-w-md", className)}
      style={{ transform: 'scaleX(-1)' }} // Flip the entire field horizontally
    >
      {/* Field background */}
      <div className="absolute inset-0 bg-green-600 rounded-xl overflow-hidden">
        {/* Field pattern */}
        <Field />
        
        {/* Ball */}
        <Ball position={ballPosition} />
        
        {/* Players */}
        {players.map(player => (
          <Player key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default FootballField;
