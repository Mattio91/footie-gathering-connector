
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import PlayerSearch from '@/components/PlayerSearch';
import PlayerProfile from '@/components/PlayerProfile';
import { Player } from '@/types/player';

// Sample player data - in a real app, this would come from an API
const samplePlayers: Player[] = [
  {
    id: "p1",
    name: "John Smith",
    isConfirmed: true,
    isAdmin: false,
    avatar: "https://ui-avatars.com/api/?name=John+Smith&background=0D8ABC&color=fff",
    participationStatus: "joined"
  },
  {
    id: "p2",
    name: "Sarah Johnson",
    isConfirmed: true,
    isAdmin: true,
    avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=1D8A3C&color=fff",
    participationStatus: "joined"
  },
  {
    id: "p3",
    name: "Mike Wilson",
    isConfirmed: false,
    isAdmin: false,
    avatar: "https://ui-avatars.com/api/?name=Mike+Wilson&background=8A1D3C&color=fff",
    participationStatus: "tentative"
  }
];

const Players = () => {
  const { t } = useTranslation();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlayers = searchQuery
    ? samplePlayers.filter(player => 
        player.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : samplePlayers;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">{t('players.title', 'Players')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <PlayerSearch 
              onSearch={setSearchQuery} 
              players={filteredPlayers}
              onSelectPlayer={setSelectedPlayer}
            />
          </div>
          
          <div className="md:col-span-2">
            {selectedPlayer ? (
              <PlayerProfile player={selectedPlayer} />
            ) : (
              <div className="bg-muted/30 rounded-lg border p-8 text-center">
                <h3 className="text-lg font-medium mb-2">{t('players.selectPrompt', 'Select a player')}</h3>
                <p className="text-muted-foreground">
                  {t('players.selectDescription', 'Choose a player from the list to view their profile')}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Players;
