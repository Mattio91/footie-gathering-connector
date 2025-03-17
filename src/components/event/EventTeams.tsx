
import { useState } from 'react';
import { Users, UserPlus, Clock, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Player } from '@/types/player';
import TeamCard from '@/components/TeamCard';
import TeamReserve from '@/components/TeamReserve';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import TentativePlayers from '@/components/TentativePlayers';

interface EventTeamsProps {
  players: Player[];
  tentativePlayers: Player[];
  maxPlayers: number;
  isJoined: boolean;
  onJoinEvent: () => void;
  onTentativeJoin: () => void;
  onSkipEvent: () => void;
  onAddFriend?: (name: string) => void;
}

const EventTeams = ({ 
  players, 
  tentativePlayers,
  maxPlayers, 
  isJoined, 
  onJoinEvent,
  onTentativeJoin,
  onSkipEvent,
  onAddFriend
}: EventTeamsProps) => {
  const { toast } = useToast();
  
  const {
    teamA,
    teamB,
    reservePlayers,
    handleDragStart,
    handleDragOver,
    handleDrop
  } = useDragAndDrop(players, maxPlayers);
  
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
    <div className="space-y-2 compact-spacing">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Teams</h2>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">{players.length}/{maxPlayers}</span> players
        </div>
      </div>
      
      <div className="flex justify-center mb-2">
        {isJoined ? (
          <Button 
            className="w-64 bg-destructive hover:bg-destructive/90"
            onClick={onJoinEvent}
          >
            Leave Event
          </Button>
        ) : (
          <div className="grid grid-cols-3 gap-2 w-full">
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={onJoinEvent}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Join
            </Button>
            
            <Button 
              variant="secondary"
              onClick={onTentativeJoin}
            >
              <Clock className="h-4 w-4 mr-2" />
              Tentative
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={onSkipEvent}
            >
              <UserX className="h-4 w-4 mr-2" />
              Can't Join
            </Button>
          </div>
        )}
      </div>
      
      {/* Teams section - now always visible without tabs */}
      <div className="pt-2">
        {/* Teams side by side */}
        <div className="grid grid-cols-3 gap-2 compact-grid">
          {/* Home Team */}
          <TeamCard
            teamName="Home Team"
            teamPlayers={teamA}
            teamColor="team-home"
            maxTeamSize={Math.ceil(maxPlayers/2)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
          
          {/* Reserve Players - now between Home and Away teams */}
          <TeamReserve
            reservePlayers={reservePlayers}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onAddFriend={handleAddFriend}
          />
          
          {/* Away Team */}
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
        
        {/* Tentative Players */}
        <div className="mt-2">
          <TentativePlayers tentativePlayers={tentativePlayers} />
        </div>
      </div>
    </div>
  );
};

export default EventTeams;
