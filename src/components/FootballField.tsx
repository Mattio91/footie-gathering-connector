import React from 'react';
import { cn } from '@/lib/utils';
import Field from '@/components/football/Field';

interface FootballFieldProps {
  teamAPlayers?: number;
  teamBPlayers?: number;
  maxPlayers?: number;
  className?: string;
}

// This component is kept minimal as it's not used in the main UI anymore
const FootballField: React.FC<FootballFieldProps> = ({ 
  className 
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
