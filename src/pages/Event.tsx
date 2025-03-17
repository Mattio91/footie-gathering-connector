
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventSkeleton from '@/components/event/EventSkeleton';
import EventError from '@/components/event/EventError';
import EventView from '@/components/event/EventView';
import { useEventData } from '@/hooks/useEventData';

const Event = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    event, 
    players, 
    tentativePlayers,
    isJoined, 
    currentImages, 
    messages,
    isLoading,
    error,
    handleJoinEvent,
    handleTentativeJoin,
    handleSkipEvent,
    handleAddFriend,
    handleSendMessage,
    handleImageUpload,
    handlePingMember
  } = useEventData(id || '');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-14 pb-16" data-lov-name="main">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Error state */}
          {error && <EventError error={error} />}
          
          {/* Loading state */}
          {isLoading ? (
            <EventSkeleton />
          ) : (
            event && (
              <EventView 
                event={event}
                players={players}
                tentativePlayers={tentativePlayers}
                isJoined={isJoined}
                currentImages={currentImages}
                messages={messages}
                handlers={{
                  handleJoinEvent,
                  handleTentativeJoin,
                  handleSkipEvent,
                  handleAddFriend,
                  handleSendMessage,
                  handleImageUpload,
                  handlePingMember
                }}
              />
            )
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Event;
