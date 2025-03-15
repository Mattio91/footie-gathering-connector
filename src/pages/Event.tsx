
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventHeaderActions from '@/components/event/EventHeaderActions';
import EventSkeleton from '@/components/event/EventSkeleton';
import EventError from '@/components/event/EventError';
import EventView from '@/components/event/EventView';
import { useEventData } from '@/hooks/useEventData';

const Event = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    event, 
    players, 
    isJoined, 
    currentImages, 
    messages,
    isLoading,
    error,
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
                isJoined={isJoined}
                currentImages={currentImages}
                messages={messages}
                handlers={{
                  handleJoinEvent,
                  handleAddFriend,
                  handleSendMessage,
                  handleImageUpload,
                  handleUpdateMemberRole
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
