
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventHeaderActions from '@/components/event/EventHeaderActions';
import EventCarousel from '@/components/event/EventCarousel';
import EventContent from '@/components/event/EventContent';
import { useEventData } from '@/hooks/useEventData';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

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
          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}. Please try refreshing the page.
              </AlertDescription>
            </Alert>
          )}
          
          {/* Loading state */}
          {isLoading ? (
            <div className="space-y-8">
              {/* Carousel skeleton */}
              <Skeleton className="w-full aspect-[16/9] rounded-xl" />
              
              {/* Content grid skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <Skeleton className="h-64 w-full rounded-xl" />
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-64 w-full rounded-xl" />
                  <Skeleton className="h-96 w-full rounded-xl" />
                </div>
                <div className="space-y-8">
                  <Skeleton className="h-64 w-full rounded-xl" />
                  <Skeleton className="h-96 w-full rounded-xl" />
                </div>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Event;
