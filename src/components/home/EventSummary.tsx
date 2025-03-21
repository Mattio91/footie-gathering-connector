
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users, CalendarClock, UserCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EventWithParticipation } from '@/types/event-instance';
import { Group } from '@/types/group';

interface EventSummaryProps {
  event: EventWithParticipation;
  groups?: Group[];
}

const EventSummary = ({ event, groups = [] }: EventSummaryProps) => {
  return (
    <Card className="overflow-hidden mb-6">
      <div className="relative">
        {/* Event Image */}
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(${event.imageUrl || 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'})` 
          }}
        >
          {/* Improved gradient overlay with better spacing */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
          
          {/* Contained title area with improved positioning */}
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                {event.format}
              </Badge>
              {event.price > 0 ? (
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                  £{event.price}
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                  Free
                </Badge>
              )}
            </div>
            <h2 className="text-2xl font-medium text-white mb-1 line-clamp-1">{event.title}</h2>
          </div>
        </div>
        
        <CardContent className="p-4 pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Event Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{event.time} · {event.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{event.playerCount}/{event.maxPlayers} players</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Regular event</span>
                  </div>
                </div>
              </div>
              
              {groups.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Groups</h3>
                  <div className="flex flex-wrap gap-2">
                    {groups.map(group => (
                      <Badge key={group.id} variant="outline" className="flex items-center">
                        <UserCircle className="h-3 w-3 mr-1" />
                        {group.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {event.description || "No description provided for this event."}
              </p>
              
              <div className="flex justify-end">
                <Link to={`/event/${event.id}`}>
                  <Button>View Full Details</Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default EventSummary;
