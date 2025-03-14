
import React from 'react';
import { cn } from '@/lib/utils';

interface FootballFieldProps {
  teamAPlayers: number;
  teamBPlayers: number;
  maxPlayers: number;
  className?: string;
}

const FootballField = ({ 
  teamAPlayers, 
  teamBPlayers, 
  maxPlayers, 
  className 
}: FootballFieldProps) => {
  // Calculate how many players to show (can't exceed maxPlayers/2 per team)
  const maxPlayersPerTeam = Math.floor(maxPlayers / 2);
  const displayTeamAPlayers = Math.min(teamAPlayers, maxPlayersPerTeam);
  const displayTeamBPlayers = Math.min(teamBPlayers, maxPlayersPerTeam);
  
  // Generate player dots for each team
  const generatePlayerDots = (count: number, team: 'A' | 'B') => {
    const isTeamA = team === 'A';
    const dots = [];
    
    // Define formations based on player count (simplified)
    let positions;
    
    if (maxPlayersPerTeam === 6) { // 6v6 formation
      positions = [
        // Formations represented as [x, y] in percentage of field
        [[50, 10]], // GK
        [[30, 30], [70, 30]], // Defenders
        [[20, 50], [50, 50], [80, 50]], // Midfielders
        [[50, 70]]  // Striker
      ];
    } else if (maxPlayersPerTeam === 5) { // 5v5 formation
      positions = [
        [[50, 10]], // GK
        [[30, 30], [70, 30]], // Defenders
        [[50, 50]], // Midfielder
        [[30, 70], [70, 70]]  // Strikers
      ];
    } else {
      // Default to 11v11 formation
      positions = [
        [[50, 5]], // GK
        [[30, 15], [50, 15], [70, 15]], // Defenders
        [[20, 35], [40, 35], [60, 35], [80, 35]], // Midfielders
        [[30, 55], [70, 55]], // Attacking Midfielders
        [[50, 70]] // Striker
      ];
    }
    
    // Flatten array and take only the dots we need
    const flatPositions = positions.flat().slice(0, count);
    
    // For team B, invert the Y positions
    const teamPositions = isTeamA 
      ? flatPositions 
      : flatPositions.map(([x, y]) => [x, 100 - y]);
    
    return teamPositions.map(([x, y], index) => {
      return (
        <div 
          key={`${team}-${index}`}
          className={cn(
            "absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2",
            isTeamA 
              ? "bg-team-home/90 border-white" 
              : "bg-team-away/90 border-white"
          )}
          style={{ 
            left: `${x}%`, 
            top: `${y}%`,
            transition: 'all 0.3s ease-out',
            zIndex: 5
          }}
        />
      );
    });
  };
  
  return (
    <div className={cn("relative w-full aspect-[2/3] mx-auto max-w-md", className)}>
      {/* Field background */}
      <div className="absolute inset-0 bg-green-600 rounded-xl overflow-hidden">
        {/* Field pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white" />
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white" />
          <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-white" />
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/6 rounded-full border border-white" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[2px] h-[2px] bg-white rounded-full" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white" />
          
          {/* Penalty areas */}
          <div className="absolute top-0 left-1/4 right-1/4 h-1/5 border-b border-l border-r border-white" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-1/5 border-t border-l border-r border-white" />
          
          {/* Goal areas */}
          <div className="absolute top-0 left-1/3 right-1/3 h-1/10 border-b border-l border-r border-white" />
          <div className="absolute bottom-0 left-1/3 right-1/3 h-1/10 border-t border-l border-r border-white" />
          
          {/* Goals */}
          <div className="absolute top-0 left-2/5 right-2/5 h-[4px] border-b border-l border-r border-white bg-white/20" />
          <div className="absolute bottom-0 left-2/5 right-2/5 h-[4px] border-t border-l border-r border-white bg-white/20" />
        </div>
        
        {/* Player dots */}
        {generatePlayerDots(displayTeamAPlayers, 'A')}
        {generatePlayerDots(displayTeamBPlayers, 'B')}
      </div>
    </div>
  );
};

export default FootballField;
