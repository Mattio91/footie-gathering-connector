
import { Users, UserPlus, Clock, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Player } from '@/types/player';
import TeamCard from '@/components/TeamCard';
import TeamReserve from '@/components/TeamReserve';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import TentativePlayers from '@/components/TentativePlayers';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
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
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-2">
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
              size={isMobile ? "sm" : "default"}
            >
              <UserPlus className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
              Join
            </Button>
            
            <Button 
              variant="secondary"
              onClick={onTentativeJoin}
              size={isMobile ? "sm" : "default"}
            >
              <Clock className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
              Tentative
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={onSkipEvent}
              size={isMobile ? "sm" : "default"}
            >
              <UserX className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
              Can't Join
            </Button>
          </div>
        )}
      </div>
      
      {/* Teams section - no tabs */}
      <div className="pt-2">
        {/* Teams grid - responsive */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-2'}`}>
          {isMobile ? (
            // Mobile layout - stack vertically
            <>
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
              
              {/* Reserve Players */}
              <TeamReserve
                reservePlayers={reservePlayers}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onAddFriend={handleAddFriend}
              />
            </>
          ) : (
            // Desktop layout - side by side
            <>
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
              
              {/* Reserve Players */}
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
            </>
          )}
        </div>
        
        {/* Tentative Players */}
        <div className="mt-3">
          <TentativePlayers tentativePlayers={tentativePlayers} />
        </div>
      </div>
    </div>
  );
};

export default EventTeams;
