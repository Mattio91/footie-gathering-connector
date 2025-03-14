
import { useState } from 'react';
import { Users } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import FootballField from '@/components/FootballField';
import { cn } from '@/lib/utils';

interface Player {
  id: string;
  name: string;
  isConfirmed: boolean;
  isAdmin: boolean;
  avatar?: string;
}

interface EventTeamsProps {
  players: Player[];
  maxPlayers: number;
}

const EventTeams = ({ players, maxPlayers }: EventTeamsProps) => {
  const [activeTab, setActiveTab] = useState("teams");
  
  // Get team distributions
  const teamA = players.slice(0, Math.ceil(players.length / 2));
  const teamB = players.slice(Math.ceil(players.length / 2));
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Teams</h2>
        <div className="text-sm text-muted-foreground">
          {players.length}/{maxPlayers} players
        </div>
      </div>
      
      {/* Tabs for team management */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="field">Field View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="teams" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team A */}
            <Card className="border-team-home/20 bg-team-home/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Home Team</CardTitle>
                <CardDescription>{teamA.length} players</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {teamA.map(player => (
                    <div 
                      key={player.id} 
                      className="flex items-center p-2 rounded-md bg-background/80"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img 
                          src={player.avatar || `https://ui-avatars.com/api/?name=${player.name}`} 
                          alt={player.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium text-sm">{player.name}</div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty spots */}
                  {Array.from({length: Math.max(0, Math.ceil(maxPlayers/2) - teamA.length)}).map((_, i) => (
                    <div 
                      key={`empty-a-${i}`} 
                      className="flex items-center p-2 rounded-md border border-dashed border-muted-foreground/30"
                    >
                      <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center mr-3">
                        <Users className="h-4 w-4 text-muted-foreground/50" />
                      </div>
                      <div className="flex-grow text-sm text-muted-foreground">
                        Available spot
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Team B */}
            <Card className="border-team-away/20 bg-team-away/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Away Team</CardTitle>
                <CardDescription>{teamB.length} players</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {teamB.map(player => (
                    <div 
                      key={player.id} 
                      className="flex items-center p-2 rounded-md bg-background/80"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img 
                          src={player.avatar || `https://ui-avatars.com/api/?name=${player.name}`} 
                          alt={player.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium text-sm">{player.name}</div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty spots */}
                  {Array.from({length: Math.max(0, Math.floor(maxPlayers/2) - teamB.length)}).map((_, i) => (
                    <div 
                      key={`empty-b-${i}`} 
                      className="flex items-center p-2 rounded-md border border-dashed border-muted-foreground/30"
                    >
                      <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center mr-3">
                        <Users className="h-4 w-4 text-muted-foreground/50" />
                      </div>
                      <div className="flex-grow text-sm text-muted-foreground">
                        Available spot
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="field" className="pt-4">
          <div className="rounded-xl border p-6 bg-muted/10">
            <FootballField 
              teamAPlayers={teamA.length} 
              teamBPlayers={teamB.length}
              maxPlayers={maxPlayers}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventTeams;
