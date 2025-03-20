
import React from 'react';
import { format, addMinutes, set } from 'date-fns';
import { EventData } from '@/types/event';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface EventItemProps {
  event: EventData;
  dayIndex: number;
  minHour: number;
  onClick: (eventId: string) => void;
  isMobile?: boolean;
}

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

export const EventItem: React.FC<EventItemProps> = ({ event, dayIndex, minHour, onClick, isMobile = false }) => {
  // Calculate event position and height in the grid
  const getEventStyle = () => {
    const startTime = event.startTime ? timeToDate(event.startTime) : timeToDate(event.time);
    const endTime = event.endTime ? timeToDate(event.endTime) : getEndTime(event.time, event.duration);
    
    const startHour = startTime.getHours();
    const startMinutes = startTime.getMinutes();
    const endHour = endTime.getHours();
    const endMinutes = endTime.getMinutes();
    
    // Calculate position relative to the minHour
    const top = ((startHour - minHour) * 60 + startMinutes) / 60;
    
    // Calculate height based on duration
    const height = ((endHour - startHour) * 60 + (endMinutes - startMinutes)) / 60;
    
    // For mobile, adjust column width
    const colPercentage = isMobile ? 25 : 12.5;
    const leftPosition = `calc(${dayIndex + 1} * ${colPercentage}%)`;
    const widthPercentage = isMobile ? 20 : 10;
    const marginLeftPercentage = isMobile ? 2.5 : 1;
    
    return {
      top: `${top * 3}rem`, // Each hour is 3rem tall
      height: `${height * 3}rem`,
      backgroundColor: event.color || '#3b82f6',
      left: leftPosition,
      width: `${widthPercentage}%`,
      marginLeft: `${marginLeftPercentage}%`,
    };
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="absolute rounded text-white text-xs p-1 overflow-hidden cursor-pointer"
            style={getEventStyle()}
            onClick={() => onClick(event.id)}
          >
            <div className="font-medium truncate">{event.title}</div>
            {!isMobile && (
              <div className="text-[10px]">
                {event.startTime || event.time} - {event.endTime || format(getEndTime(event.time, event.duration), 'HH:mm')}
              </div>
            )}
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
  );
};
