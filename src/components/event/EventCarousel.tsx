
import { useState } from 'react';
import EventImageCarousel from '@/components/EventImageCarousel';

interface EventCarouselProps {
  images: string[];
  event: {
    title: string;
    date: Date;
    time: string;
    duration: string;
    location: string;
    locationDetails: string;
  };
  playerCount: number;
  maxPlayers: number;
  onImageUpload?: (file: File) => void;
}

const EventCarousel = ({ images, event, playerCount, maxPlayers, onImageUpload }: EventCarouselProps) => {
  return (
    <div className="mb-4">
      <EventImageCarousel 
        images={images} 
        title={event.title}
        date={event.date}
        time={event.time}
        duration={event.duration}
        location={event.location}
        locationDetails={event.locationDetails}
        playerCount={playerCount}
        maxPlayers={maxPlayers}
        onImageUpload={onImageUpload}
      />
    </div>
  );
};

export default EventCarousel;
