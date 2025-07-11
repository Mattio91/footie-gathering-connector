
import { Users } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Player } from '@/types/player';
import { useIsMobile } from '@/hooks/use-mobile';

interface TeamCardProps {
  teamName: string;
  teamPlayers: Player[];
  teamColor: string;
  maxTeamSize: number;
  onDragStart: (e: React.DragEvent, player: Player, source: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, target: string) => void;
}

const TeamCard = ({ 
  teamName, 
  teamPlayers, 
  teamColor,
  maxTeamSize,
  onDragStart,
  onDragOver,
  onDrop
}: TeamCardProps) => {
  const emptySpots = Math.max(0, maxTeamSize - teamPlayers.length);
  const borderClass = teamName === "Home Team" ? "border-team-home/20 bg-team-home/5" : "border-team-away/20 bg-team-away/5";
  const teamId = teamName === "Home Team" ? "teamA" : "teamB";
  const isMobile = useIsMobile();
  
  return (
    <Card className={borderClass}>
      <CardHeader className={isMobile ? "p-2 pb-1" : "p-3 pb-2"}>
        <CardTitle className="text-sm">{teamName}</CardTitle>
        <CardDescription>{teamPlayers.length} players</CardDescription>
      </CardHeader>
      <CardContent className={isMobile ? "p-1.5" : "p-2"}>
        <div className="space-y-2">
          {teamPlayers.map(player => (
            <div 
              key={player.id} 
              className="flex items-center p-2 rounded-md bg-background/80 cursor-move"
              draggable
              onDragStart={(e) => onDragStart(e, player, teamId)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, teamId)}
            >
              <div className="w-6 h-6 rounded-lg overflow-hidden mr-2">
                <img 
                  src={player.avatar || `https://ui-avatars.com/api/?name=${player.name}`} 
                  alt={player.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="font-medium">
                  {player.name}
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty spots */}
          {Array.from({length: emptySpots}).map((_, i) => (
            <div 
              key={`empty-${teamId.toLowerCase()}-${i}`} 
              className="flex items-center p-2 rounded-md border border-dashed border-muted-foreground/30"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, teamId)}
            >
              <div className="w-6 h-6 rounded-lg bg-muted/50 flex items-center justify-center mr-2">
                <Users className="h-3 w-3 text-muted-foreground/50" />
              </div>
              <div className="flex-grow text-muted-foreground">
                Available
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
