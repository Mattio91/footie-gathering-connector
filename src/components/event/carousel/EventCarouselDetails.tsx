
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EventData } from '@/types/event';

interface EventCarouselDetailsProps {
  event: EventData;
  playerCount: number;
  maxPlayers: number;
}

const EventCarouselDetails = ({ event, playerCount, maxPlayers }: EventCarouselDetailsProps) => {
  const formattedDate = format(new Date(event.date), 'EEEE, MMMM d, yyyy');
  
  return (
    <div className="absolute bottom-0 left-0 w-full p-4 text-white">
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 mb-1 text-sm">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">{formattedDate}</span>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">{event.time} · {event.duration}</span>
        </div>
        
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className={cn(
            playerCount < maxPlayers ? "text-amber-300 font-medium" : ""
          )}>
            {playerCount}/{maxPlayers} players
            {playerCount < maxPlayers && " (need more)"}
          </span>
        </div>
      </div>
      
      <div className="flex items-start mt-1">
        <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-medium truncate">{event.location}</div>
          <div className="text-sm text-white/90 truncate max-w-full">
            {event.locationDetails}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCarouselDetails;
