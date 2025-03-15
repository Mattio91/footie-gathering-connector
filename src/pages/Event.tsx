
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventHeaderActions from '@/components/event/EventHeaderActions';
import EventCarousel from '@/components/event/EventCarousel';
import EventContent from '@/components/event/EventContent';
import { useEventData } from '@/hooks/useEventData';

const Event = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    event, 
    players, 
    isJoined, 
    currentImages, 
    messages,
    handleJoinEvent,
    handleAddFriend,
    handleSendMessage,
    handleImageUpload,
    handleUpdateMemberRole
  } = useEventData(id || '');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Back button and share */}
          <EventHeaderActions />
          
          {/* Field Image with title and details */}
          <EventCarousel 
            images={currentImages}
            event={event}
            playerCount={players.length}
            maxPlayers={event.maxPlayers}
            onImageUpload={handleImageUpload}
          />
          
          {/* Main content grid layout */}
          <EventContent 
            event={event}
            players={players}
            isJoined={isJoined}
            messages={messages}
            handlers={{
              handleJoinEvent,
              handleAddFriend,
              handleSendMessage,
              handleUpdateMemberRole
            }}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Event;
