
import { addMinutes, set, isSameDay, startOfWeek } from 'date-fns';
import { EventData } from '@/types/event';

// Convert string time (HH:MM) to a Date object for proper comparison
export const timeToDate = (timeStr: string): Date => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return set(new Date(), { hours, minutes, seconds: 0, milliseconds: 0 });
};

// Parse duration to minutes
export const getDurationInMinutes = (duration: string): number => {
  const durationMatch = duration.match(/(\d+)/);
  return durationMatch ? parseInt(durationMatch[1], 10) : 60; // Default to 60 minutes
};

// Calculate end time
export const getEndTime = (startTimeStr: string, duration: string): Date => {
  const startTime = timeToDate(startTimeStr);
  const durationMins = getDurationInMinutes(duration);
  return addMinutes(startTime, durationMins);
};

// Get start of week
export const getWeekStart = (): Date => {
  return startOfWeek(new Date(), { weekStartsOn: 1 });
};

// Generate week days
export const generateWeekDays = (startDate: Date): Date[] => {
  return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
};

// Get events for a specific day
export const getEventsForDay = (day: Date, events: EventData[]): EventData[] => {
  return events.filter(event => {
    // Check if event is on this day
    const eventDate = new Date(event.date);
    return isSameDay(eventDate, day);
  });
};

// Helper function to add days to a date
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(date.getDate() + days);
  return result;
}

// Calculate hour range for displaying events
export const calculateHourRange = (events: EventData[]): { minHour: number; maxHour: number } => {
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
};

// Generate hour slots
export const generateHourSlots = (minHour: number, maxHour: number): number[] => {
  return Array.from(
    { length: maxHour - minHour + 1 },
    (_, i) => minHour + i
  );
};

// Check if there are any visible events in the calendar
export const hasVisibleEvents = (weekDays: Date[], events: EventData[]): boolean => {
  return weekDays.some(day => getEventsForDay(day, events).length > 0);
};
