
import EventCarousel from '@/components/event/EventCarousel';
import EventContent from '@/components/event/EventContent';
import { EventData, ChatMessage } from '@/types/event';
import { Player } from '@/types/player';

interface EventViewProps {
  event: EventData;
  players: Player[];
  tentativePlayers: Player[];
  isJoined: boolean;
  currentImages: string[];
  messages: ChatMessage[];
  handlers: {
    handleJoinEvent: () => void;
    handleTentativeJoin: () => void;
    handleSkipEvent: () => void;
    handleAddFriend: (name: string) => void;
    handleSendMessage: (message: string) => void;
    handleImageUpload: (file: File) => void;
    handlePingMember?: (memberId: string) => void;
  };
}

const EventView = ({ 
  event, 
  players, 
  tentativePlayers,
  isJoined, 
  currentImages, 
  messages, 
  handlers 
}: EventViewProps) => {
  return (
    <>
      {/* Field Image with title and details */}
      <EventCarousel 
        images={currentImages}
        event={event}
        playerCount={players.length}
        maxPlayers={event.maxPlayers}
        onImageUpload={handlers.handleImageUpload}
      />
      
      {/* Main content grid layout */}
      <EventContent 
        event={event}
        players={players}
        tentativePlayers={tentativePlayers}
        isJoined={isJoined}
        messages={messages}
        handlers={{
          handleJoinEvent: handlers.handleJoinEvent,
          handleTentativeJoin: handlers.handleTentativeJoin,
          handleSkipEvent: handlers.handleSkipEvent,
          handleAddFriend: handlers.handleAddFriend,
          handleSendMessage: handlers.handleSendMessage,
          handlePingMember: handlers.handlePingMember
        }}
      />
    </>
  );
};

export default EventView;
