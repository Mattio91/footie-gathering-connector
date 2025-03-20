
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
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-1">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{formattedDate}</span>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{event.time} · {event.duration}</span>
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
      
      <div className="flex items-start">
        <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
        <div>
          <div className="font-medium">{event.location}</div>
          <div className="text-sm text-white/90">
            {event.locationDetails}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCarouselDetails;
