
import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';

interface CalendarHeaderProps {
  startDate: Date;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ startDate }) => {
  // Create an array of the 7 days of the week
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  
  return (
    <div className="grid grid-cols-8 border-b bg-muted/20">
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
