
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ParticipationStatus from '@/components/groups/member/ParticipationStatus';
import { EventWithParticipation } from '@/types/event-instance';

interface EventCardMobileProps {
  event: EventWithParticipation;
}

const EventCardMobile = ({ event }: EventCardMobileProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-base">{event.title}</h3>
            <div className="text-sm text-muted-foreground flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              {format(event.instanceDate || event.date, 'EEE, MMM d')} · {event.time}
            </div>
          </div>
          <ParticipationStatus 
            status={event.participationStatus} 
            memberId={event.id}
            size="sm"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-3 text-sm">
          <div>
            <div className="text-muted-foreground text-xs">Format</div>
            <div>{event.format}</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">Price</div>
            <div>{event.price > 0 ? `£${event.price}` : 'Free'}</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">Duration</div>
            <div>{event.duration}</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">Players</div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>{event.playerCount}/{event.maxPlayers}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center mb-3 text-sm">
          <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
          <span className="truncate">{event.location}</span>
        </div>
        
        <div className="flex justify-end">
          <Link to={`/event/${event.id}`}>
            <Button variant="outline" size="sm">View</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCardMobile;
