
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Player } from '@/types/player';
import { useTranslation } from 'react-i18next';

interface PlayerSearchProps {
  onSearch: (query: string) => void;
  players: Player[];
  onSelectPlayer: (player: Player) => void;
}

const PlayerSearch = ({ onSearch, players, onSelectPlayer }: PlayerSearchProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t('players.searchPlaceholder', 'Search players...')}
          className="pl-9"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted/30 px-3 py-2 text-sm font-medium border-b">
          {t('players.searchResults', 'Players')} ({players.length})
        </div>
        
        <div className="divide-y max-h-[400px] overflow-y-auto">
          {players.length > 0 ? (
            players.map(player => (
              <div 
                key={player.id}
                className="flex items-center p-3 hover:bg-muted/40 cursor-pointer transition-colors"
                onClick={() => onSelectPlayer(player)}
              >
                <Avatar className="h-10 w-10 rounded-lg mr-3">
                  <AvatarImage 
                    src={player.avatar || `https://ui-avatars.com/api/?name=${player.name}`}
                    alt={player.name}
                    className="rounded-lg"
                  />
                  <AvatarFallback className="rounded-lg">{player.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{player.name}</div>
                  {player.isAdmin && (
                    <div className="text-xs text-muted-foreground">Admin</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              {t('players.noResults', 'No players found')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerSearch;
