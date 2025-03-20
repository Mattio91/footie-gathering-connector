
import { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Check, X, Trophy } from 'lucide-react';
import { EventWithParticipation } from '@/types/event-instance';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ParticipationStatus from '@/components/groups/member/ParticipationStatus';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

interface EventInstancesListProps {
  eventInstances: EventWithParticipation[];
}

const EventInstancesList = ({ eventInstances }: EventInstancesListProps) => {
  const isMobile = useIsMobile();
  const [showAll, setShowAll] = useState(false);
  const maxInitialInstances = 5;
  
  // Sort by date - upcoming first, then historical
  const sortedInstances = [...eventInstances].sort((a, b) => {
    const dateA = a.instanceDate || a.date;
    const dateB = b.instanceDate || b.date;
    return dateA.getTime() - dateB.getTime();
  });
  
  const displayedInstances = showAll 
    ? sortedInstances 
    : sortedInstances.slice(0, maxInitialInstances);
  
  const now = new Date();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Event Instances</h3>
      
      <div className="space-y-3">
        {displayedInstances.map((instance, index) => {
          const instanceDate = instance.instanceDate || instance.date;
          const isPast = instanceDate < now;
          const status = instance.status || (isPast ? 'played' : 'upcoming');
          
          return (
            <Card 
              key={`${instance.id}-${index}`}
              className={cn(
                "border-l-4 overflow-hidden",
                status === 'played' && "border-l-green-500",
                status === 'upcoming' && "border-l-blue-500",
                status === 'canceled' && "border-l-red-500"
              )}
            >
              <CardContent className="p-0">
                <div className="flex items-center">
                  {/* Status indicator */}
                  <div className={cn(
                    "w-16 h-full flex-shrink-0 flex items-center justify-center",
                    status === 'played' ? "bg-green-50" : 
                    status === 'upcoming' ? "bg-blue-50" : 
                    "bg-red-50"
                  )}>
                    {status === 'played' && <Check className="h-6 w-6 text-green-500" />}
                    {status === 'upcoming' && <Calendar className="h-6 w-6 text-blue-500" />}
                    {status === 'canceled' && <X className="h-6 w-6 text-red-500" />}
                  </div>
                  
                  {/* Instance details */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-sm font-medium flex items-center gap-2">
                          {format(instanceDate, 'EEE, MMM d, yyyy')}
                          {instance.won && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              <Trophy className="h-3 w-3 mr-1 text-yellow-500" />
                              Man of the Match
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {instance.time}
                        </div>
                      </div>
                      
                      <ParticipationStatus 
                        status={instance.participationStatus} 
                        memberId={instance.id}
                      />
                    </div>
                    
                    {!isMobile && (
                      <div className="grid grid-cols-3 gap-4 mb-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="truncate">{instance.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{instance.playerCount}/{instance.maxPlayers}</span>
                        </div>
                        <div>
                          {instance.price > 0 ? `£${instance.price}` : 'Free'}
                        </div>
                      </div>
                    )}
                    
                    {isMobile && (
                      <div className="space-y-1 mb-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="truncate">{instance.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{instance.playerCount}/{instance.maxPlayers}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <Link to={`/event/${instance.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {sortedInstances.length > maxInitialInstances && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : `Show All (${sortedInstances.length})`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventInstancesList;
