
import EventTeams from '@/components/EventTeams';
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
  isHost: boolean;
  eventStatus: 'upcoming' | 'in-progress' | 'completed';
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
    handleCallPlayers?: () => void;
    handleCancelEvent?: () => void;
  };
}

const EventContent = ({ 
  event, 
  players, 
  tentativePlayers, 
  isJoined, 
  isHost,
  eventStatus,
  messages, 
  handlers 
}: EventContentProps) => {
  return (
    <div className="space-y-3 compact-spacing">
      {/* Teams section with join button */}
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
  );
};

export default EventContent;
