
import { Card, CardContent } from '@/components/ui/card';
import { GripVertical, UserPlus } from 'lucide-react';
import { Player } from '@/types/player';
import AddFriendForm from './AddFriendForm';

interface TeamReserveProps {
  reservePlayers: Player[];
  onDragStart: (e: React.DragEvent, playerId: string, source: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, target: string) => void;
  onAddFriend?: (name: string) => void;
}

const TeamReserve = ({ 
  reservePlayers,
  onDragStart,
  onDragOver,
  onDrop,
  onAddFriend
}: TeamReserveProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Reserve Players</h3>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, 'reserve')}
          >
            {reservePlayers.length > 0 ? (
              reservePlayers.map(player => (
                <div 
                  key={player.id} 
                  className="flex items-center p-2 rounded-md bg-muted/10 cursor-move"
                  draggable
                  onDragStart={(e) => onDragStart(e, player.id, 'reserve')}
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
              <AddFriendForm onAddFriend={onAddFriend} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamReserve;
