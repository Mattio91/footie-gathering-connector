
import React, { useMemo } from 'react';
import { format, startOfWeek, addDays, isSameDay, parseISO, set } from 'date-fns';
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
  
  // Convert string time (HH:MM) to a Date object for proper comparison
  const timeToDate = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return set(new Date(), { hours, minutes, seconds: 0, milliseconds: 0 });
  };
  
  // Calculate the minimum and maximum hours for events
  const hourRange = useMemo(() => {
    let minHour = 8; // Default minimum hour (8 AM)
    let maxHour = 22; // Default maximum hour (10 PM)
    
    events.forEach(event => {
      if (event.time) {
        const eventDate = timeToDate(event.time);
        const eventHour = eventDate.getHours();
        
        // Update min and max hours if needed
        minHour = Math.min(minHour, eventHour);
        
        // Estimate end time based on duration (assume format like "90 mins")
        if (event.duration) {
          const durationMatch = event.duration.match(/(\d+)/);
          if (durationMatch) {
            const durationMins = parseInt(durationMatch[1], 10);
            const endTime = new Date(eventDate.getTime() + durationMins * 60000);
            const endHour = endTime.getHours() + (endTime.getMinutes() > 0 ? 1 : 0); // Round up
            maxHour = Math.max(maxHour, endHour);
          }
        } else {
          // If no duration, assume events last at least 1 hour
          maxHour = Math.max(maxHour, eventHour + 1);
        }
      }
    });
    
    // Ensure minimum range of at least 3 hours
    if (maxHour - minHour < 3) {
      maxHour = minHour + 3;
    }
    
    // Ensure we don't exceed reasonable hours
    minHour = Math.max(6, minHour); // Not earlier than 6 AM
    maxHour = Math.min(23, maxHour); // Not later than 11 PM
    
    return { minHour, maxHour };
  }, [events]);
  
  // Generate hour slots
  const hourSlots = useMemo(() => {
    return Array.from(
      { length: hourRange.maxHour - hourRange.minHour + 1 },
      (_, i) => hourRange.minHour + i
    );
  }, [hourRange]);
  
  // Get events for a specific day and hour
  const getEventsForDayAndHour = (day: Date, hour: number) => {
    return events.filter(event => {
      // Check if event is on this day
      const eventDate = new Date(event.date);
      if (!isSameDay(eventDate, day)) return false;
      
      // Check if event is at this hour
      if (!event.time) return false;
      
      const eventTime = timeToDate(event.time);
      const eventHour = eventTime.getHours();
      
      return eventHour === hour;
    });
  };

  return (
    <div className="rounded-lg border overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-8 border-b bg-muted/20">
        <div className="p-2 text-xs font-medium text-center border-r">Hour</div>
        {weekDays.map((day, index) => (
          <div key={index} className="p-2 text-xs font-medium text-center">
            <div>{format(day, 'EEE')}</div>
            <div className="text-muted-foreground">{format(day, 'd')}</div>
          </div>
        ))}
      </div>
      
      {/* Hour rows */}
      {hourSlots.map(hour => (
        <div key={hour} className="grid grid-cols-8 border-b last:border-b-0">
          {/* Hour label */}
          <div className="p-2 text-xs font-medium border-r flex items-center justify-center bg-muted/10">
            {hour}:00
          </div>
          
          {/* Day cells */}
          {weekDays.map((day, dayIndex) => {
            const cellEvents = getEventsForDayAndHour(day, hour);
            
            return (
              <div key={dayIndex} className="p-1 h-12 border-r last:border-r-0 relative">
                {cellEvents.length > 0 ? (
                  <div className="flex flex-wrap gap-1 h-full items-center justify-center">
                    {cellEvents.map((event) => (
                      <TooltipProvider key={event.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link to={`/event/${event.id}`}>
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-white text-xs"
                                style={{ backgroundColor: event.color || '#3b82f6' }}
                              >
                                {format(timeToDate(event.time), 'H:mm')}
                              </div>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs p-1">
                              <div className="font-medium">{event.title}</div>
                              <div>{event.time} • {event.duration}</div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
