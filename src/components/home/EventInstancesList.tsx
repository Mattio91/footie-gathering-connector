
import { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Check, X, Trophy, History } from 'lucide-react';
import { EventWithParticipation } from '@/types/event-instance';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

interface EventInstancesListProps {
  eventInstances: EventWithParticipation[];
}

const EventInstancesList = ({ eventInstances }: EventInstancesListProps) => {
  const isMobile = useIsMobile();
  const [showAllPast, setShowAllPast] = useState(false);
  
  const now = new Date();
  
  // Separate upcoming and historical events
  const upcomingEvents = eventInstances.filter(instance => {
    const instanceDate = instance.instanceDate || instance.date;
    return instanceDate >= now;
  }).sort((a, b) => {
    const dateA = a.instanceDate || a.date;
    const dateB = b.instanceDate || b.date;
    return dateA.getTime() - dateB.getTime();
  });
  
  const historicalEvents = eventInstances.filter(instance => {
    const instanceDate = instance.instanceDate || instance.date;
    return instanceDate < now;
  }).sort((a, b) => {
    const dateA = a.instanceDate || a.date;
    const dateB = b.instanceDate || b.date;
    return dateB.getTime() - dateA.getTime(); // Sort historical events in reverse order
  });
  
  // Get only the closest upcoming event
  const nextEvent = upcomingEvents.length > 0 ? [upcomingEvents[0]] : [];
    
  // Show either a limited number of past events or all of them
  const displayedHistorical = showAllPast 
    ? historicalEvents 
    : historicalEvents.slice(0, 3);
  
  const hasMorePastEvents = historicalEvents.length > 3;
  
  const renderEventCard = (instance, index) => {
    const instanceDate = instance.instanceDate || instance.date;
    const isPast = instanceDate < now;
    const status = instance.status || (isPast ? 'played' : 'upcoming');
    
    return (
      <Card 
        key={`${instance.id}-${index}`}
        className={cn(
          "border-l-4 overflow-hidden mb-2", // Reduced margin
          status === 'played' && "border-l-green-500",
          status === 'upcoming' && "border-l-blue-500",
          status === 'canceled' && "border-l-red-500"
        )}
      >
        <CardContent className="p-3"> {/* Reduced padding */}
          <div className="flex items-center">
            {/* Status indicator */}
            <div className={cn(
              "w-10 h-full flex-shrink-0 flex items-center justify-center", // Reduced width
              status === 'played' ? "bg-green-50" : 
              status === 'upcoming' ? "bg-blue-50" : 
              "bg-red-50"
            )}>
              {status === 'played' && <Check className="h-4 w-4 text-green-500" />}
              {status === 'upcoming' && <Calendar className="h-4 w-4 text-blue-500" />}
              {status === 'canceled' && <X className="h-4 w-4 text-red-500" />}
            </div>
            
            {/* Instance details */}
            <div className="flex-1 pl-3 pr-2 py-1"> {/* Reduced padding */}
              <div className="flex justify-between items-start gap-2">
                <div>
                  <div className="text-xs font-medium flex items-center gap-2"> {/* Reduced text size */}
                    {format(instanceDate, 'EEE, MMM d, yyyy')}
                    {instance.won && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs"> {/* Smaller badge */}
                        <Trophy className="h-3 w-3 mr-1 text-yellow-500" />
                        MVP
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-2 mt-1 text-xs text-muted-foreground"> {/* Reduced gap */}
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {instance.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate max-w-[120px]">{instance.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{instance.playerCount}/{instance.maxPlayers}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1"> {/* Reduced gap */}
                  <Link to={`/event/${instance.id}`}>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-xs">View</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-2"> {/* Reduced spacing */}
      {/* Next Event Section */}
      {nextEvent.length > 0 && (
        <div className="space-y-1"> {/* Reduced spacing */}
          <h3 className="text-sm font-medium flex items-center"> {/* Reduced text size */}
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Next Event
          </h3>
          <div className="space-y-1"> {/* Reduced spacing */}
            {nextEvent.map(renderEventCard)}
          </div>
        </div>
      )}
      
      {/* Separator when both sections are present */}
      {nextEvent.length > 0 && displayedHistorical.length > 0 && (
        <Separator className="my-2" /> // Reduced margin
      )}
      
      {/* Historical Events Section */}
      {displayedHistorical.length > 0 && (
        <div className="space-y-1"> {/* Reduced spacing */}
          <h3 className="text-sm font-medium flex items-center"> {/* Reduced text size */}
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Past Events
          </h3>
          <div className="space-y-1"> {/* Reduced spacing */}
            {displayedHistorical.map(renderEventCard)}
          </div>
          
          {/* Load more past events button */}
          {hasMorePastEvents && (
            <div className="text-center pt-1"> {/* Reduced padding */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAllPast(!showAllPast)}
                className="gap-1 text-xs" // Reduced gap, smaller text
              >
                <History className="h-3 w-3" /> {/* Smaller icon */}
                {showAllPast ? "Show Less" : `Load Older Events (${historicalEvents.length - 3})`}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventInstancesList;

