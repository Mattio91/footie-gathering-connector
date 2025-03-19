
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
    handleCallPlayers?: () => void;
    handleCancelEvent?: () => void;
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
  // Determine if current user is a host or co-host
  const currentUserId = 'current-user'; // In a real app, this would come from auth
  const isHost = event.host.id === currentUserId || event.coHosts.some(host => host.id === currentUserId);
  
  // Determine event status (would come from backend in real app)
  const now = new Date();
  const eventDate = new Date(event.date);
  let eventStatus: 'upcoming' | 'in-progress' | 'completed' = 'upcoming';
  
  if (now > eventDate) {
    const eventEndTime = new Date(eventDate);
    // Add duration in minutes to get end time
    const durationInMinutes = parseInt(event.duration.replace(/\D/g, ''));
    eventEndTime.setMinutes(eventEndTime.getMinutes() + durationInMinutes);
    
    if (now > eventEndTime) {
      eventStatus = 'completed';
    } else {
      eventStatus = 'in-progress';
    }
  }
  
  return (
    <>
      {/* Field Image with title and details */}
      <EventCarousel 
        images={currentImages}
        event={event}
        playerCount={players.length}
        maxPlayers={event.maxPlayers}
        onImageUpload={handlers.handleImageUpload}
        isHost={isHost}
        status={eventStatus}
        onCallPlayers={handlers.handleCallPlayers}
        onCancelEvent={handlers.handleCancelEvent}
      />
      
      {/* Main content */}
      <EventContent 
        event={event}
        players={players}
        tentativePlayers={tentativePlayers}
        isJoined={isJoined}
        isHost={isHost}
        eventStatus={eventStatus}
        messages={messages}
        handlers={{
          handleJoinEvent: handlers.handleJoinEvent,
          handleTentativeJoin: handlers.handleTentativeJoin,
          handleSkipEvent: handlers.handleSkipEvent,
          handleAddFriend: handlers.handleAddFriend,
          handleSendMessage: handlers.handleSendMessage,
          handlePingMember: handlers.handlePingMember,
          handleCallPlayers: handlers.handleCallPlayers,
          handleCancelEvent: handlers.handleCancelEvent
        }}
      />
    </>
  );
};

export default EventView;
