
import { EventData } from '@/types/event';
import { Link } from 'react-router-dom';
import EventStatusIndicator from './carousel/EventStatusIndicator';
import EventCarouselNav from './carousel/EventCarouselNav';
import EventCarouselActions from './carousel/EventCarouselActions';
import EventCarouselDetails from './carousel/EventCarouselDetails';
import EventImageGallery from './carousel/EventImageGallery';

interface EventCarouselProps {
  images: string[];
  event: EventData;
  playerCount: number;
  maxPlayers: number;
  onImageUpload: (file: File) => void;
  isHost?: boolean;
  status?: 'upcoming' | 'in-progress' | 'completed';
  onCallPlayers?: () => void;
  onCancelEvent?: () => void;
}

const EventCarousel = ({ 
  images, 
  event, 
  playerCount, 
  maxPlayers, 
  onImageUpload, 
  isHost = false,
  status = 'upcoming',
  onCallPlayers,
  onCancelEvent
}: EventCarouselProps) => {
  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden aspect-[21/5] bg-muted animate-fade-in mb-1">
      {/* Navigation Buttons directly on the image */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 z-20">
        <EventCarouselNav 
          statusIndicator={<EventStatusIndicator status={status} />} 
        />
        
        <EventCarouselActions 
          isHost={isHost}
          onCallPlayers={onCallPlayers}
          onCancelEvent={onCancelEvent}
          description={event.description}
          onImageChange={handleImageChange}
        />
      </div>
      
      {/* Event Image Gallery */}
      <EventImageGallery images={images} />
      
      {/* Overlay with event details */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <EventCarouselDetails 
          event={event}
          playerCount={playerCount}
          maxPlayers={maxPlayers}
        />
      </div>
    </div>
  );
};

export default EventCarousel;
