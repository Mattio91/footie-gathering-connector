
import { useState } from 'react';
import { Users, UserPlus, Clock } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import FootballField from '@/components/FootballField';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Player } from '@/types/player';
import TeamCard from '@/components/TeamCard';
import TeamReserve from '@/components/TeamReserve';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TentativePlayers from '@/components/TentativePlayers';

interface EventTeamsProps {
  players: Player[];
  tentativePlayers: Player[];
  maxPlayers: number;
  isJoined: boolean;
  onJoinEvent: () => void;
  onTentativeJoin: () => void;
  onAddFriend?: (name: string) => void;
}

const EventTeams = ({ 
  players, 
  tentativePlayers,
  maxPlayers, 
  isJoined, 
  onJoinEvent,
  onTentativeJoin,
  onAddFriend
}: EventTeamsProps) => {
  const [activeTab, setActiveTab] = useState("teams");
  const { toast } = useToast();
  
  const {
    teamA,
    teamB,
    reservePlayers,
    handleDragStart,
    handleDragOver,
    handleDrop
  } = useDragAndDrop(players, maxPlayers);
  
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
        {isJoined ? (
          <Button 
            className="w-64 bg-destructive hover:bg-destructive/90"
            onClick={onJoinEvent}
          >
            Leave Event
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-64">
                <UserPlus className="h-4 w-4 mr-2" />
                Join
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onJoinEvent}>
                <UserPlus className="h-4 w-4 mr-2" />
                <span>Join Now</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onTentativeJoin}>
                <Clock className="h-4 w-4 mr-2" />
                <span>Join Tentatively</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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
            <TeamCard
              teamName="Home Team"
              teamPlayers={teamA}
              teamColor="team-home"
              maxTeamSize={Math.ceil(maxPlayers/2)}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
            
            {/* Team B */}
            <TeamCard
              teamName="Away Team"
              teamPlayers={teamB}
              teamColor="team-away"
              maxTeamSize={Math.floor(maxPlayers/2)}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          </div>
          
          {/* Reserve Players */}
          <TeamReserve
            reservePlayers={reservePlayers}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onAddFriend={handleAddFriend}
          />
          
          {/* Tentative Players */}
          <TentativePlayers tentativePlayers={tentativePlayers} />
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
