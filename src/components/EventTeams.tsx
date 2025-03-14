
import { useState, useEffect } from 'react';
import { Users, GripVertical, UserPlus } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import FootballField from '@/components/FootballField';
import AddFriendForm from '@/components/AddFriendForm';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

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
  isJoined: boolean;
  onJoinEvent: () => void;
  onAddFriend?: (name: string) => void;
}

const EventTeams = ({ 
  players, 
  maxPlayers, 
  isJoined, 
  onJoinEvent,
  onAddFriend
}: EventTeamsProps) => {
  const [activeTab, setActiveTab] = useState("teams");
  const [teamA, setTeamA] = useState<Player[]>([]);
  const [teamB, setTeamB] = useState<Player[]>([]);
  const [reservePlayers, setReservePlayers] = useState<Player[]>([]);
  const { toast } = useToast();
  
  // Initialize teams when players change
  useEffect(() => {
    const confirmedPlayers = players.filter(p => p.isConfirmed);
    const halfwayPoint = Math.ceil(confirmedPlayers.length / 2);
    
    setTeamA(confirmedPlayers.slice(0, halfwayPoint));
    setTeamB(confirmedPlayers.slice(halfwayPoint));
    setReservePlayers(players.filter(p => !p.isConfirmed));
  }, [players]);
  
  // Handlers for drag and drop
  const handleDragStart = (e: React.DragEvent, playerId: string, source: 'teamA' | 'teamB' | 'reserve') => {
    e.dataTransfer.setData('playerId', playerId);
    e.dataTransfer.setData('source', source);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, target: 'teamA' | 'teamB' | 'reserve') => {
    e.preventDefault();
    const playerId = e.dataTransfer.getData('playerId');
    const source = e.dataTransfer.getData('source') as 'teamA' | 'teamB' | 'reserve';
    
    if (source === target) return;
    
    // Find the player object
    let player: Player | undefined;
    let sourceArray: Player[];
    let sourceSetFunction: React.Dispatch<React.SetStateAction<Player[]>>;
    
    // Get the player and source array
    if (source === 'teamA') {
      sourceArray = teamA;
      sourceSetFunction = setTeamA;
    } else if (source === 'teamB') {
      sourceArray = teamB;
      sourceSetFunction = setTeamB;
    } else {
      sourceArray = reservePlayers;
      sourceSetFunction = setReservePlayers;
    }
    
    player = sourceArray.find(p => p.id === playerId);
    if (!player) return;
    
    // Remove from source array
    sourceSetFunction(sourceArray.filter(p => p.id !== playerId));
    
    // Add to target array
    if (target === 'teamA') {
      setTeamA([...teamA, {...player, isConfirmed: true}]);
      toast({
        title: "Player moved to Home Team",
        description: `${player.name} has been added to the Home Team.`,
      });
    } else if (target === 'teamB') {
      setTeamB([...teamB, {...player, isConfirmed: true}]);
      toast({
        title: "Player moved to Away Team",
        description: `${player.name} has been added to the Away Team.`,
      });
    } else {
      setReservePlayers([...reservePlayers, {...player, isConfirmed: false}]);
      toast({
        title: "Player moved to Reserve",
        description: `${player.name} has been moved to the reserve list.`,
      });
    }
  };
  
  // Handle adding a friend
  const handleAddFriend = (name: string) => {
    if (onAddFriend) {
      onAddFriend(name);
      toast({
        title: "Friend added",
        description: `${name} has been added to the event.`,
      });
    }
  };
  
  // Generate empty spots for teams
  const generateEmptySpots = (team: 'A' | 'B', count: number) => {
    const teamArray = team === 'A' ? teamA : teamB;
    const targetTeam = team === 'A' ? 'teamA' : 'teamB';
    const maxTeamSize = Math.floor(maxPlayers / 2);
    const emptySpots = Math.max(0, maxTeamSize - teamArray.length);
    
    return Array.from({length: emptySpots}).map((_, i) => (
      <div 
        key={`empty-${team.toLowerCase()}-${i}`} 
        className="flex items-center p-2 rounded-md border border-dashed border-muted-foreground/30"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, targetTeam as 'teamA' | 'teamB')}
      >
        <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center mr-3">
          <Users className="h-4 w-4 text-muted-foreground/50" />
        </div>
        <div className="flex-grow text-sm text-muted-foreground">
          Available spot
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Teams</h2>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">{players.length}/{maxPlayers}</span> players
        </div>
      </div>
      
      {/* Join Button in center */}
      <div className="flex justify-center mb-4">
        <Button 
          className={cn("w-64", isJoined && "bg-destructive hover:bg-destructive/90")}
          onClick={onJoinEvent}
        >
          {isJoined 
            ? "Leave Event" 
            : players.length >= maxPlayers 
              ? "Join Waitlist" 
              : "Join Event"
          }
        </Button>
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
                      className="flex items-center p-2 rounded-md bg-background/80 cursor-move"
                      draggable
                      onDragStart={(e) => handleDragStart(e, player.id, 'teamA')}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'teamA')}
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img 
                          src={player.avatar || `https://ui-avatars.com/api/?name=${player.name}`} 
                          alt={player.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium text-sm flex items-center">
                          {player.name}
                          <GripVertical className="h-4 w-4 ml-2 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty spots */}
                  {generateEmptySpots('A', Math.max(0, Math.ceil(maxPlayers/2) - teamA.length))}
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
                      className="flex items-center p-2 rounded-md bg-background/80 cursor-move"
                      draggable
                      onDragStart={(e) => handleDragStart(e, player.id, 'teamB')}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'teamB')}
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img 
                          src={player.avatar || `https://ui-avatars.com/api/?name=${player.name}`} 
                          alt={player.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium text-sm flex items-center">
                          {player.name}
                          <GripVertical className="h-4 w-4 ml-2 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty spots */}
                  {generateEmptySpots('B', Math.max(0, Math.floor(maxPlayers/2) - teamB.length))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Reserve Players directly below teams */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Reserve Players</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'reserve')}
                >
                  {reservePlayers.length > 0 ? (
                    reservePlayers.map(player => (
                      <div 
                        key={player.id} 
                        className="flex items-center p-2 rounded-md bg-muted/10 cursor-move"
                        draggable
                        onDragStart={(e) => handleDragStart(e, player.id, 'reserve')}
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                          <img 
                            src={player.avatar || `https://ui-avatars.com/api/?name=${player.name}`} 
                            alt={player.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="font-medium text-sm flex items-center">
                            {player.name}
                            <GripVertical className="h-4 w-4 ml-2 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-foreground text-sm text-center py-4">
                      No reserve players
                    </div>
                  )}
                </div>
                
                {/* Add friend form */}
                {onAddFriend && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Friends to Event
                    </h4>
                    <AddFriendForm onAddFriend={handleAddFriend} />
                  </div>
                )}
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
