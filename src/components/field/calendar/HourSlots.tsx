
import React from 'react';

interface HourSlotsProps {
  hourSlots: number[];
  weekDays: Date[];
}

export const HourSlots: React.FC<HourSlotsProps> = ({ hourSlots, weekDays }) => {
  return (
    <>
      {hourSlots.map(hour => (
        <div key={hour} className="grid grid-cols-8 border-b last:border-b-0">
          {/* Hour label */}
          <div className="p-2 text-xs font-medium border-r flex items-center justify-center bg-muted/10 h-12">
            {hour}:00
          </div>
          
          {/* Day cells */}
          {weekDays.map((_, dayIndex) => (
            <div key={dayIndex} className="h-12 border-r last:border-r-0 relative">
              {/* Empty cell for grid */}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
