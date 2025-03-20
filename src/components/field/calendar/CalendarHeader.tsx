
import React from 'react';
import { format, addDays } from 'date-fns';

interface CalendarHeaderProps {
  startDate: Date;
  isMobile?: boolean;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ startDate, isMobile = false }) => {
  // Create an array of the days based on mobile or desktop view
  const daysToShow = isMobile ? 3 : 7;
  const weekDays = Array.from({ length: daysToShow }, (_, i) => addDays(startDate, i));
  
  return (
    <div className={`grid ${isMobile ? 'grid-cols-4' : 'grid-cols-8'} border-b bg-muted/20`}>
      <div className="p-2 text-xs font-medium text-center border-r">Hour</div>
      {weekDays.map((day, index) => (
        <div key={index} className="p-2 text-xs font-medium text-center">
          <div>{format(day, 'EEE')}</div>
          <div className="text-muted-foreground">{format(day, 'd')}</div>
        </div>
      ))}
    </div>
  );
};
