
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventHeaderActions from '@/components/event/EventHeaderActions';
import EventImageCarousel from '@/components/EventImageCarousel';
import EventTeams from '@/components/EventTeams';
import EventAbout from '@/components/EventAbout';
import EventMap from '@/components/EventMap';
import EventChat from '@/components/EventChat';
import EventGroups from '@/components/EventGroups';
import EventHostInfo from '@/components/event/EventHostInfo';
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
          <EventImageCarousel 
            images={currentImages} 
            title={event.title}
            date={event.date}
            time={event.time}
            duration={event.duration}
            location={event.location}
            locationDetails={event.locationDetails}
            playerCount={players.length}
            maxPlayers={event.maxPlayers}
            onImageUpload={handleImageUpload}
          />
          
          {/* Main content area - grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left/Main content (2/3 width) */}
            <div className="md:col-span-2 space-y-8">
              {/* Teams & Field visualization section with join button */}
              <EventTeams 
                players={players} 
                maxPlayers={event.maxPlayers} 
                isJoined={isJoined}
                onJoinEvent={handleJoinEvent}
                onAddFriend={handleAddFriend}
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
                  onSendMessage={handleSendMessage}
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
                onUpdateMemberRole={handleUpdateMemberRole}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Event;
