
import React from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { EventData } from '@/types/event';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface WeeklyEventCalendarProps {
  events: EventData[];
}

export const WeeklyEventCalendar: React.FC<WeeklyEventCalendarProps> = ({ events }) => {
  // Get the current week starting from Monday
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  
  // Create an array of the 7 days of the week
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  
  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, day);
    });
  };

  return (
    <div className="grid grid-cols-7 gap-1 bg-muted/10 rounded-lg p-2">
      {weekDays.map((day, index) => {
        const dayEvents = getEventsForDay(day);
        const dayName = format(day, 'EEE');
        const dayNumber = format(day, 'd');
        
        return (
          <div key={index} className="flex flex-col items-center">
            <div className="text-xs font-medium mb-1">{dayName}</div>
            <div className="text-xs text-muted-foreground mb-2">{dayNumber}</div>
            
            <div className="flex-1 w-full flex flex-col gap-1 items-center">
              {dayEvents.length > 0 ? (
                dayEvents.map((event) => (
                  <TooltipProvider key={event.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link to={`/event/${event.id}`}>
                          <div 
                            className="w-6 h-6 rounded-full bg-primary flex items-center justify-center cursor-pointer"
                            style={{ backgroundColor: event.color || '#3b82f6' }}
                          >
                            <span className="text-[10px] text-white font-medium">
                              {event.time ? format(new Date(`2000-01-01T${event.time}`), 'H') : '?'}
                            </span>
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs">
                          <div className="font-medium">{event.title}</div>
                          <div>{event.time || 'Time TBD'}</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))
              ) : (
                <div className="w-6 h-6 rounded-full border border-dashed border-muted" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
