
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventData } from '@/types/event';
import { CalendarHeader } from './calendar/CalendarHeader';
import { HourSlots } from './calendar/HourSlots';
import { EventItem } from './calendar/EventItem';
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
}

export const WeeklyEventCalendar: React.FC<WeeklyEventCalendarProps> = ({ events }) => {
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

  // If there are no events, don't render the calendar
  if (!eventsVisible) {
    return null;
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
