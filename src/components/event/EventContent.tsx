
import EventTeams from '@/components/EventTeams';
import EventAbout from '@/components/EventAbout';
import EventMap from '@/components/EventMap';
import EventChat from '@/components/EventChat';
import EventGroups from '@/components/EventGroups';
import EventHostInfo from '@/components/event/EventHostInfo';
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
    handleAddFriend: (name: string) => void;
    handleSendMessage: (message: string) => void;
    handleUpdateMemberRole: (groupId: string, memberId: string, role: string) => void;
  };
}

const EventContent = ({ event, players, isJoined, messages, handlers }: EventContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left/Main content (2/3 width) */}
      <div className="md:col-span-2 space-y-8">
        {/* Teams & Field visualization section with join button */}
        <EventTeams 
          players={players} 
          maxPlayers={event.maxPlayers} 
          isJoined={isJoined}
          onJoinEvent={handlers.handleJoinEvent}
          onAddFriend={handlers.handleAddFriend}
        />
        
        {/* About the event */}
        <EventAbout description={event.description} />
        
        {/* Location map */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Location</h3>
          <EventMap 
            location={event.location} 
            locationDetails={event.locationDetails}
          />
        </div>
        
        {/* Chat section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Event Chat</h3>
          <EventChat 
            messages={messages}
            onSendMessage={handlers.handleSendMessage}
          />
        </div>
      </div>
      
      {/* Right sidebar (1/3 width) */}
      <div className="space-y-8">
        {/* Event host information */}
        <EventHostInfo host={event.host} coHosts={event.coHosts} />
        
        {/* Event groups and invitation */}
        <EventGroups 
          groups={event.groups}
          onUpdateMemberRole={handlers.handleUpdateMemberRole}
        />
      </div>
    </div>
  );
};

export default EventContent;
