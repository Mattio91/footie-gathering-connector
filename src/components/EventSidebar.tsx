
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Host {
  id: string;
  name: string;
  avatar?: string;
}

interface EventSidebarProps {
  isJoined: boolean;
  players: Array<{id: string, name: string}>;
  maxPlayers: number;
  host: Host;
  onJoinEvent: () => void;
}

const EventSidebar = ({ 
  isJoined, 
  players, 
  maxPlayers, 
  host, 
  onJoinEvent 
}: EventSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Join Card */}
      <Card className="shadow-md border-border sticky top-24 animate-fade-in" style={{ animationDelay: '150ms' }}>
        <CardHeader>
          <CardTitle>Ready to play?</CardTitle>
          <CardDescription>
            {isJoined 
              ? `You're signed up for this event.` 
              : `Join this football match (${players.length}/${maxPlayers} players).`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              className={cn("w-full", isJoined && "bg-destructive hover:bg-destructive/90")}
              onClick={onJoinEvent}
            >
              {isJoined 
                ? "Leave Event" 
                : players.length >= maxPlayers 
                  ? "Join Waitlist" 
                  : "Join Event"
              }
            </Button>
            
            <div className="rounded-lg border p-3">
              <div className="text-sm">
                <div className="font-medium mb-1">Organized by</div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <img 
                      src={host.avatar || `https://ui-avatars.com/api/?name=${host.name}`} 
                      alt={host.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{host.name}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button variant="outline" className="w-full">
            <Share2 className="h-4 w-4 mr-2" />
            Share with Friends
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventSidebar;
