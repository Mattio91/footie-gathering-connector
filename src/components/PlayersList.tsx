
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, User, UserPlus, X, Check, Copy } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  isConfirmed: boolean;
  isAdmin: boolean;
  avatar?: string;
}

interface PlayersListProps {
  players: Player[];
  maxPlayers: number;
  teamCount: number;
  onPlayerAdd?: (name: string) => void;
  onPlayerRemove?: (id: string) => void;
  onPlayerToggleConfirm?: (id: string) => void;
  showManagement?: boolean;
}

const PlayersList = ({
  players,
  maxPlayers,
  teamCount = 2,
  onPlayerAdd,
  onPlayerRemove,
  onPlayerToggleConfirm,
  showManagement = false,
}: PlayersListProps) => {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [activeTab, setActiveTab] = useState<number>(0);

  const teamsArray = Array.from({ length: teamCount }, (_, i) => i);
  const playersPerTeam = maxPlayers / teamCount;
  
  // Sample team names - in a real app, these would be customizable
  const teamNames = ['Home Team', 'Away Team'];
  
  // Distribute players into teams (in a real app, this might be managed differently)
  const teamPlayers = teamsArray.map((teamIndex) => {
    const startIdx = teamIndex * playersPerTeam;
    const endIdx = Math.min(startIdx + playersPerTeam, players.length);
    return players.slice(startIdx, endIdx);
  });

  const handleAddPlayer = () => {
    if (newPlayerName.trim() && onPlayerAdd) {
      onPlayerAdd(newPlayerName.trim());
      setNewPlayerName('');
    }
  };

  const getTeamColor = (index: number): string => {
    if (index === 0) return 'bg-team-home/10 border-team-home/20';
    if (index === 1) return 'bg-team-away/10 border-team-away/20';
    return 'bg-muted border-muted-foreground/20';
  };
  
  const getPlayerSpots = (teamIndex: number) => {
    const filledSpots = teamPlayers[teamIndex]?.length || 0;
    const emptySpots = playersPerTeam - filledSpots;
    return emptySpots > 0 ? Array.from({ length: emptySpots }, (_, i) => i) : [];
  };

  // Copy invite link functionality (simulated)
  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText('https://pitchmatch.app/invite/12345');
    // In a real app, you would show a toast notification here
    console.log('Invite link copied!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Players ({players.length}/{maxPlayers})</h3>
        
        {showManagement && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopyInviteLink}
            className="rounded-full text-xs"
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy Invite Link
          </Button>
        )}
      </div>
      
      {/* Team tabs */}
      <div className="flex space-x-4 border-b border-border">
        {teamsArray.map((index) => (
          <button
            key={`team-tab-${index}`}
            className={cn(
              "pb-2 px-1 text-sm font-medium transition-colors relative",
              activeTab === index 
                ? "text-primary border-b-2 border-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab(index)}
          >
            {teamNames[index] || `Team ${index + 1}`} ({teamPlayers[index]?.length || 0}/{playersPerTeam})
          </button>
        ))}
      </div>
      
      {/* Team players */}
      <div className={cn("grid gap-3 transition-all duration-300")}>
        {teamsArray.map((teamIndex) => (
          <div 
            key={`team-players-${teamIndex}`}
            className={cn(
              "space-y-3 transition-opacity duration-300",
              activeTab === teamIndex ? "block" : "hidden"
            )}
          >
            <div className={cn(
              "rounded-lg border p-3 space-y-3",
              getTeamColor(teamIndex)
            )}>
              {/* Players in this team */}
              {teamPlayers[teamIndex]?.map((player) => (
                <div 
                  key={player.id}
                  className="flex items-center justify-between p-2 rounded-md bg-background/80 backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 overflow-hidden">
                      {player.avatar ? (
                        <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium flex items-center">
                        {player.name}
                        {player.isAdmin && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            (Admin)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  {showManagement && (
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-7 w-7 rounded-full",
                          player.isConfirmed ? "text-primary bg-primary/10" : "text-muted-foreground"
                        )}
                        onClick={() => onPlayerToggleConfirm?.(player.id)}
                        title={player.isConfirmed ? "Confirmed" : "Not confirmed"}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onPlayerRemove?.(player.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Empty spots */}
              {getPlayerSpots(teamIndex).map((_, index) => (
                <div 
                  key={`empty-spot-${index}`}
                  className="flex items-center p-2 rounded-md border border-dashed border-muted-foreground/30"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center mr-3">
                    <User className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                  <p className="text-sm text-muted-foreground">Available spot</p>
                </div>
              ))}
            </div>
            
            {/* Add player form - only show in management mode */}
            {showManagement && players.length < maxPlayers && (
              <div className="flex space-x-2">
                <div className="flex-grow">
                  <Input
                    type="text"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    placeholder="Enter player name"
                    className="w-full"
                  />
                </div>
                <Button onClick={handleAddPlayer} disabled={!newPlayerName.trim()}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersList;
