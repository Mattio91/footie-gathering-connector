
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventData } from '@/types/event';
import { CalendarHeader } from './calendar/CalendarHeader';
import { HourSlots } from './calendar/HourSlots';
import { EventItem } from './calendar/EventItem';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  getWeekStart,
  generateWeekDays,
  calculateHourRange,
  generateHourSlots,
  getEventsForDay,
  hasVisibleEvents
} from './calendar/calendarUtils';

interface WeeklyEventCalendarProps {
  events: EventData[];
  isLoading?: boolean;
}

export const WeeklyEventCalendar: React.FC<WeeklyEventCalendarProps> = ({ 
  events, 
  isLoading = false 
}) => {
  const navigate = useNavigate();
  
  // Get the current week starting from Monday
  const startDate = useMemo(() => getWeekStart(), []);
  
  // Create an array of the 7 days of the week
  const weekDays = useMemo(() => generateWeekDays(startDate), [startDate]);
  
  // Calculate the minimum and maximum hours for events
  const hourRange = useMemo(() => calculateHourRange(events), [events]);
  
  // Generate hour slots
  const hourSlots = useMemo(() => 
    generateHourSlots(hourRange.minHour, hourRange.maxHour), 
    [hourRange]
  );
  
  // Handle navigating to the event detail page
  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  // Check if there are any events displayed in the calendar
  const eventsVisible = useMemo(() => 
    hasVisibleEvents(weekDays, events), 
    [weekDays, events]
  );

  // If there are no events and we're not loading, don't render the calendar
  if (!eventsVisible && !isLoading) {
    return null;
  }

  // If we're still loading, show a skeleton
  if (isLoading) {
    return (
      <div className="rounded-lg border overflow-hidden">
        {/* Skeleton for header */}
        <div className="grid grid-cols-8 border-b bg-muted/20">
          <Skeleton className="h-12 m-2" />
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-12 m-2" />
          ))}
        </div>
        
        {/* Skeleton for hour slots */}
        <div className="relative">
          {Array.from({ length: 8 }).map((_, hourIndex) => (
            <div key={hourIndex} className="grid grid-cols-8 border-b last:border-b-0">
              <Skeleton className="h-12 m-2" />
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <Skeleton key={dayIndex} className="h-12 m-2" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      {/* Day headers */}
      <CalendarHeader startDate={startDate} />
      
      {/* Hour rows */}
      <div className="relative">
        <HourSlots hourSlots={hourSlots} weekDays={weekDays} />
        
        {/* Events as position-absolute rectangles */}
        {weekDays.map((day, dayIndex) => {
          const dayEvents = getEventsForDay(day, events);
          
          return dayEvents.map((event) => (
            <EventItem
              key={`${dayIndex}-${event.id}`}
              event={event}
              dayIndex={dayIndex}
              minHour={hourRange.minHour}
              onClick={handleEventClick}
            />
          ));
        })}
      </div>
    </div>
  );
};
