
import React from 'react';
import { Player } from '@/types/player';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  UserRound, 
  UserCheck, 
  Users, 
  PieChart, 
  Calendar,
  Trophy 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Group } from '@/types/group';

// Sample data for player statistics - in a real app, this would come from an API
const playerStats = {
  gamesPlayed: 28,
  gamesWon: 15,
  winRate: 53.6,
  manOfTheMatch: 3,
};

// Sample groups data - in a real app, this would come from an API
const playerGroups: Group[] = [
  { id: "g1", name: "Weekend Warriors", memberCount: 12, city: "Gdańsk", isPrivate: true },
  { id: "g2", name: "City League", memberCount: 24, city: "Gdańsk", isPrivate: false },
  { id: "g3", name: "Corporate Team", memberCount: 15, city: "Gdańsk", isPrivate: true }
];

interface PlayerProfileProps {
  player: Player;
}

const PlayerProfile = ({ player }: PlayerProfileProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center space-y-0 gap-4">
          <Avatar className="h-16 w-16 rounded-lg">
            <AvatarImage 
              src={player.avatar || `https://ui-avatars.com/api/?name=${player.name}`}
              alt={player.name}
              className="rounded-lg"
            />
            <AvatarFallback className="rounded-lg text-lg">{player.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{player.name}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              {player.isAdmin ? (
                <span className="flex items-center text-sm">
                  <UserCheck className="h-3.5 w-3.5 mr-1" />
                  {t('players.admin', 'Admin')}
                </span>
              ) : (
                <span className="flex items-center text-sm">
                  <UserRound className="h-3.5 w-3.5 mr-1" />
                  {t('players.player', 'Player')}
                </span>
              )}
              
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full inline-flex items-center",
                player.isConfirmed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              )}>
                {player.isConfirmed 
                  ? t('players.confirmed', 'Confirmed') 
                  : t('players.pending', 'Pending')}
              </span>
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-muted/30 p-4 rounded-lg border">
              <div className="text-muted-foreground text-sm mb-1 flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                {t('players.gamesPlayed', 'Games Played')}
              </div>
              <div className="text-2xl font-semibold">{playerStats.gamesPlayed}</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg border">
              <div className="text-muted-foreground text-sm mb-1 flex items-center">
                <PieChart className="h-3.5 w-3.5 mr-1.5" />
                {t('players.winRate', 'Win Rate')}
              </div>
              <div className="text-2xl font-semibold">{playerStats.winRate}%</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg border">
              <div className="text-muted-foreground text-sm mb-1 flex items-center">
                <Trophy className="h-3.5 w-3.5 mr-1.5" />
                {t('players.manOfTheMatch', 'Man of the Match')}
              </div>
              <div className="text-2xl font-semibold">{playerStats.manOfTheMatch}</div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              {t('players.groups', 'Groups')} ({playerGroups.length})
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {playerGroups.map(group => (
                <div 
                  key={group.id}
                  className="border rounded-lg p-3 hover:bg-muted/20 transition-colors"
                >
                  <div className="font-medium">{group.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center mt-1">
                    <Users className="h-3.5 w-3.5 mr-1.5" />
                    {group.memberCount} {t('players.members', 'members')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerProfile;
