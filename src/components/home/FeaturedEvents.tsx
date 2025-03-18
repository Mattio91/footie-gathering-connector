
import { Link } from 'react-router-dom';
import { Plus, Calendar, Clock, MapPin, Users, AlertTriangle, UserCheck, Clock as ClockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { EventWithParticipation } from '@/types/event-instance';

interface FeaturedEventsProps {
  events: EventWithParticipation[];
  showEmptyState?: boolean;
}

const FeaturedEvents = ({
  events,
  showEmptyState = false,
}: FeaturedEventsProps) => {
  const { t } = useTranslation();

  if (events.length === 0 && showEmptyState) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">{t('index.noEventsFound')}</p>
        <Link to="/create-event">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t('index.createNewEvent')}
          </Button>
        </Link>
      </div>
    );
  }

  if (events.length === 0) {
    return null;
  }

  // We're now only displaying the closest event
  const event = events[0];
  const eventDate = event.instanceDate || event.date;
  
  // Calculate if we need more players
  const needsMorePlayers = event.playerCount < event.maxPlayers;
  const playersNeeded = event.maxPlayers - event.playerCount;

  // Define status badge color and label
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'joined':
        return <Badge className="bg-green-500 hover:bg-green-600">You're Going</Badge>;
      case 'tentative':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">You're Tentative</Badge>;
      default:
        return <Badge className="bg-blue-500 hover:bg-blue-600">Open</Badge>;
    }
  };

  // Get status indicator banner
  const getStatusBanner = () => {
    if (event.participationStatus === 'joined') {
      return (
        <div className="absolute top-0 left-0 w-full bg-green-500/90 text-white py-2 px-4 flex items-center justify-center">
          <UserCheck className="h-4 w-4 mr-2" />
          <span className="font-medium text-sm">You're attending this event</span>
        </div>
      );
    } else if (event.participationStatus === 'tentative') {
      return (
        <div className="absolute top-0 left-0 w-full bg-yellow-500/90 text-white py-2 px-4 flex items-center justify-center">
          <ClockIcon className="h-4 w-4 mr-2" />
          <span className="font-medium text-sm">You're tentatively attending</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-medium mb-4">Your Next Event</h3>
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Image column */}
          <div className="relative h-64 md:h-full">
            {getStatusBanner()}
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              {getStatusBadge(event.participationStatus)}
            </div>
            
            {/* Missing players indicator */}
            {needsMorePlayers && (
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-400" />
                  <span className="font-medium">{playersNeeded} more player{playersNeeded > 1 ? 's' : ''} needed</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Content column */}
          <div className="col-span-2 p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-2xl">{event.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="p-0 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{format(eventDate, 'EEE, MMM d, yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{event.time} · {event.duration}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className={`h-4 w-4 mr-2 ${needsMorePlayers ? 'text-orange-500' : 'text-muted-foreground'}`} />
                  <span className={needsMorePlayers ? 'text-orange-500 font-medium' : ''}>
                    {event.playerCount}/{event.maxPlayers} players
                  </span>
                </div>
              </div>
              
              <div>
                <Badge variant="outline">{event.format}</Badge>
                {event.price > 0 ? (
                  <Badge variant="outline" className="ml-2">£{event.price}</Badge>
                ) : (
                  <Badge variant="outline" className="ml-2">Free</Badge>
                )}
                {event.isPrivate && (
                  <Badge variant="outline" className="ml-2">Private</Badge>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="p-0 pt-6">
              <Link to={`/event/${event.id}`} className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">View Details</Button>
              </Link>
              
              {/* Conditional Join button if not already joined */}
              {event.participationStatus !== 'joined' && (
                <Button 
                  className="w-full sm:w-auto ml-2 bg-green-600 hover:bg-green-700"
                  onClick={(e) => {
                    e.preventDefault();
                    // In a real app, this would update the participation status
                    console.log('Joining event', event.id);
                  }}
                >
                  Join Now
                </Button>
              )}
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeaturedEvents;
