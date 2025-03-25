
import React, { useEffect } from 'react';
import EventHeader from '@/components/EventHeader';
import EventContent from '@/components/event/EventContent';
import EventCarousel from '@/components/event/EventCarousel';
import EventHostInfo from '@/components/event/EventHostInfo';
import { EventData } from '@/types/event';
import { Player } from '@/types/player';
import { useIsMobile } from '@/hooks/use-mobile';
import { Helmet } from 'react-helmet';

interface EventViewProps {
  event: EventData;
  players: Player[];
  tentativePlayers: Player[];
  isJoined: boolean;
  currentImages: string[];
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
  const isMobile = useIsMobile();
  const isHost = event.host.id === "current-user-id"; // Replace with actual check
  const eventStatus = "upcoming"; // This can be dynamic based on event timing

  // Add touch-specific styles when on mobile
  useEffect(() => {
    if (isMobile) {
      document.body.classList.add('touch-device');
    } else {
      document.body.classList.remove('touch-device');
    }
    
    return () => {
      document.body.classList.remove('touch-device');
    };
  }, [isMobile]);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      </Helmet>
    
      {/* Event carousel */}
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
      
      {/* Event header */}
      <EventHeader 
        title={event.title}
        date={event.date}
        time={event.time}
        duration={event.duration}
        location={event.location}
        locationDetails={event.locationDetails}
        format={event.format}
        price={event.price}
      />
      
      {/* Host info */}
      <EventHostInfo 
        host={event.host}
        coHosts={event.coHosts || []}
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
        handlers={handlers}
      />
    </div>
  );
};

export default EventView;
