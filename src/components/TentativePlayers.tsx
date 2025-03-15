
import { 
  Card, 
  CardContent,
} from '@/components/ui/card';
import { Player } from '@/types/player';
import { Clock } from 'lucide-react';

interface TentativePlayersProps {
  tentativePlayers: Player[];
}

const TentativePlayers = ({ tentativePlayers }: TentativePlayersProps) => {
  if (tentativePlayers.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Clock className="h-4 w-4 text-orange-500" />
        Tentative Players
      </h3>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            {tentativePlayers.map(player => (
              <div 
                key={player.id} 
                className="flex items-center p-2 rounded-md bg-muted/10"
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
                <span className="text-xs text-orange-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Pending
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TentativePlayers;
