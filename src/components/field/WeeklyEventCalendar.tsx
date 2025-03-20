
import React, { useMemo } from 'react';
import { format, startOfWeek, addDays, isSameDay, set, addMinutes } from 'date-fns';
import { EventData } from '@/types/event';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface WeeklyEventCalendarProps {
  events: EventData[];
}

export const WeeklyEventCalendar: React.FC<WeeklyEventCalendarProps> = ({ events }) => {
  const navigate = useNavigate();
  
  // Get the current week starting from Monday
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  
  // Create an array of the 7 days of the week
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  
  // Convert string time (HH:MM) to a Date object for proper comparison
  const timeToDate = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return set(new Date(), { hours, minutes, seconds: 0, milliseconds: 0 });
  };
  
  // Parse duration to minutes
  const getDurationInMinutes = (duration: string): number => {
    const durationMatch = duration.match(/(\d+)/);
    return durationMatch ? parseInt(durationMatch[1], 10) : 60; // Default to 60 minutes
  };
  
  // Calculate end time
  const getEndTime = (startTimeStr: string, duration: string): Date => {
    const startTime = timeToDate(startTimeStr);
    const durationMins = getDurationInMinutes(duration);
    return addMinutes(startTime, durationMins);
  };
  
  // Calculate the minimum and maximum hours for events
  const hourRange = useMemo(() => {
    if (events.length === 0) {
      return { minHour: 9, maxHour: 18 }; // Default range if no events
    }

    let minHour = 23; // Start with maximum possible hour
    let maxHour = 0; // Start with minimum possible hour
    
    events.forEach(event => {
      if (event.time) {
        const eventDate = timeToDate(event.time);
        const eventHour = eventDate.getHours();
        
        // Update min and max hours
        minHour = Math.min(minHour, eventHour);
        
        // Calculate end time based on duration
        if (event.duration) {
          const endTime = getEndTime(event.time, event.duration);
          const endHour = endTime.getHours();
          const endMinutes = endTime.getMinutes();
          // If end time has minutes, round up to the next hour
          const adjustedEndHour = endMinutes > 0 ? endHour + 1 : endHour;
          maxHour = Math.max(maxHour, adjustedEndHour);
        } else {
          // If no duration, assume events last at least 1 hour
          maxHour = Math.max(maxHour, eventHour + 1);
        }
      }
    });
    
    // Ensure minimum range of at least 3 hours if needed
    if (maxHour <= minHour) {
      maxHour = minHour + 3;
    }
    
    return { minHour, maxHour };
  }, [events]);
  
  // Generate hour slots
  const hourSlots = useMemo(() => {
    return Array.from(
      { length: hourRange.maxHour - hourRange.minHour + 1 },
      (_, i) => hourRange.minHour + i
    );
  }, [hourRange]);
  
  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      // Check if event is on this day
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, day);
    });
  };

  // Calculate event position and height in the grid
  const getEventStyle = (event: EventData) => {
    const startTime = event.startTime ? timeToDate(event.startTime) : timeToDate(event.time);
    const endTime = event.endTime ? timeToDate(event.endTime) : getEndTime(event.time, event.duration);
    
    const startHour = startTime.getHours();
    const startMinutes = startTime.getMinutes();
    const endHour = endTime.getHours();
    const endMinutes = endTime.getMinutes();
    
    // Calculate position relative to the hourRange.minHour
    const top = ((startHour - hourRange.minHour) * 60 + startMinutes) / 60;
    
    // Calculate height based on duration
    const height = ((endHour - startHour) * 60 + (endMinutes - startMinutes)) / 60;
    
    return {
      top: `${top * 3}rem`, // Each hour is 3rem tall
      height: `${height * 3}rem`,
      backgroundColor: event.color || '#3b82f6',
    };
  };

  // Handle navigating to the event detail page
  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  // Check if there are any events displayed in the calendar
  const hasVisibleEvents = useMemo(() => {
    return weekDays.some(day => getEventsForDay(day).length > 0);
  }, [weekDays, events]);

  // If there are no events, don't render the calendar
  if (!hasVisibleEvents) {
    return null;
  }

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
      <div className="relative">
        {hourSlots.map(hour => (
          <div key={hour} className="grid grid-cols-8 border-b last:border-b-0">
            {/* Hour label */}
            <div className="p-2 text-xs font-medium border-r flex items-center justify-center bg-muted/10 h-12">
              {hour}:00
            </div>
            
            {/* Day cells */}
            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className="h-12 border-r last:border-r-0 relative">
                {/* Empty cell for grid */}
              </div>
            ))}
          </div>
        ))}
        
        {/* Events as position-absolute rectangles */}
        {weekDays.map((day, dayIndex) => {
          const dayEvents = getEventsForDay(day);
          
          return dayEvents.map((event) => (
            <TooltipProvider key={`${dayIndex}-${event.id}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="absolute rounded text-white text-xs p-1 overflow-hidden cursor-pointer"
                    style={{
                      ...getEventStyle(event),
                      left: `calc(${dayIndex + 1} * 12.5%)`, // Position based on day column
                      width: '10%', // Slightly narrower than the cell
                      marginLeft: '1%', // Centering within the cell
                    }}
                    onClick={() => handleEventClick(event.id)}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="text-[10px]">
                      {event.startTime || event.time} - {event.endTime || format(getEndTime(event.time, event.duration), 'HH:mm')}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs p-1">
                    <div className="font-medium">{event.title}</div>
                    <div>{event.startTime || event.time} - {event.endTime || format(getEndTime(event.time, event.duration), 'HH:mm')}</div>
                    <div>{event.duration}</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ));
        })}
      </div>
    </div>
  );
};
