
import { 
  Card, 
  CardContent,
} from '@/components/ui/card';

interface Player {
  id: string;
  name: string;
  isConfirmed: boolean;
  isAdmin: boolean;
  avatar?: string;
}

interface ReservePlayersProps {
  reservePlayers: Player[];
}

const ReservePlayers = ({ reservePlayers }: ReservePlayersProps) => {
  if (reservePlayers.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Reserve Players</h3>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            {reservePlayers.map(player => (
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservePlayers;
