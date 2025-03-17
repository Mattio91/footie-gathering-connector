
import React from 'react';
import { cn } from '@/lib/utils';
import Field from '@/components/football/Field';

interface FootballFieldProps {
  className?: string;
  teamAPlayers?: number;
  teamBPlayers?: number;
  maxPlayers?: number;
}

// This component isn't actively used in the UI anymore
const FootballField: React.FC<FootballFieldProps> = ({ 
  className,
  teamAPlayers,
  teamBPlayers,
  maxPlayers
}) => {
  return (
    <div 
      className={cn("relative w-full aspect-[3/2] mx-auto max-w-md", className)}
    >
      <div className="absolute inset-0 bg-green-600 rounded-xl overflow-hidden">
        <Field />
      </div>
    </div>
  );
};

export default FootballField;
