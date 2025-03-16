
import EventTeams from '@/components/EventTeams';
import EventAbout from '@/components/EventAbout';
import EventMap from '@/components/EventMap';
import EventChat from '@/components/EventChat';
import EventGroups from '@/components/EventGroups';
import { Player } from '@/types/player';
import { Group } from '@/types/group';

interface EventContentProps {
  event: {
    description: string;
    location: string;
    locationDetails: string;
    maxPlayers: number;
    groups: Group[];
    host: {
      id: string;
      name: string;
      avatar: string;
    };
    coHosts: {
      id: string;
      name: string;
      avatar: string;
    }[];
  };
  players: Player[];
  tentativePlayers: Player[];
  isJoined: boolean;
  messages: {
    id: string;
    author: { 
      id: string; 
      name: string; 
      avatar?: string;
    };
    text: string;
    timestamp: Date;
  }[];
  handlers: {
    handleJoinEvent: () => void;
    handleTentativeJoin: () => void;
    handleSkipEvent: () => void;
    handleAddFriend: (name: string) => void;
    handleSendMessage: (message: string) => void;
    handlePingMember?: (memberId: string) => void;
  };
}

const EventContent = ({ event, players, tentativePlayers, isJoined, messages, handlers }: EventContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 compact-grid">
      {/* Main content (75% width) */}
      <div className="md:col-span-3 space-y-3 compact-spacing">
        {/* About event info button in corner */}
        <div className="flex justify-end">
          <EventAbout description={event.description} />
        </div>
        
        {/* Teams & Field visualization section with join button */}
        <EventTeams 
          players={players} 
          tentativePlayers={tentativePlayers}
          maxPlayers={event.maxPlayers} 
          isJoined={isJoined}
          onJoinEvent={handlers.handleJoinEvent}
          onTentativeJoin={handlers.handleTentativeJoin}
          onSkipEvent={handlers.handleSkipEvent}
          onAddFriend={handlers.handleAddFriend}
        />
        
        {/* Chat section */}
        <EventChat 
          messages={messages}
          onSendMessage={handlers.handleSendMessage}
        />
        
        {/* Groups */}
        <EventGroups 
          groups={event.groups} 
          onPingMember={handlers.handlePingMember}
        />
        
        {/* Map moved below groups */}
        <EventMap 
          location={event.location} 
          locationDetails={event.locationDetails}
        />
      </div>
      
      {/* Smaller right sidebar (25% width) - now empty */}
      <div className="space-y-3 compact-spacing">
        {/* This column is now empty but kept for layout purposes */}
      </div>
    </div>
  );
};

export default EventContent;
