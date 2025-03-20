
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Player } from '@/types/player';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import AddFriendForm from '@/components/AddFriendForm';

interface TeamReserveProps {
  reservePlayers: Player[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, player: Player, source: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, destination: string) => void;
  onAddFriend?: (name: string) => void;
}

const TeamReserve = ({ 
  reservePlayers, 
  onDragStart, 
  onDragOver, 
  onDrop,
  onAddFriend 
}: TeamReserveProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="bg-muted/30 rounded-md border p-2 border-dashed h-full flex flex-col"
      onDragOver={onDragOver} 
      onDrop={(e) => onDrop(e, 'reserve')}
    >
      <div className="text-sm font-medium mb-1">Reserve ({reservePlayers.length})</div>
      
      {/* Player list */}
      <div className="flex-1 overflow-auto">
        {/* Player slots */}
        <div className="flex flex-wrap justify-center gap-1 mb-2">
          {reservePlayers.map((player) => (
            <div 
              key={player.id} 
              className={cn(
                "flex flex-col items-center cursor-grab active:cursor-grabbing",
                player.isConfirmed ? "animate-pulse" : ""
              )}
              draggable
              onDragStart={(e) => onDragStart(e, player, 'reserve')}
            >
              <Avatar className="h-12 w-12 border-2 border-transparent hover:border-primary transition-all">
                <AvatarImage 
                  src={player.avatar || `https://ui-avatars.com/api/?name=${player.name}`} 
                  alt={player.name} 
                />
                <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-xs mt-1 font-medium">{player.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add friend button */}
      {onAddFriend && (
        <div className="mt-auto pt-1">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs h-7 border-dashed"
              >
                <UserPlus className="h-3 w-3 mr-1" />
                {t('event.addFriend')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{t('event.addFriendTitle')}</DialogTitle>
              </DialogHeader>
              <AddFriendForm onAddFriend={onAddFriend} />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default TeamReserve;
