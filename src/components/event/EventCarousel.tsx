
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Calendar, Clock, MapPin, Users, ImagePlus, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import EventAbout from '@/components/EventAbout';
import { EventData } from '@/types/event';
import { Link } from 'react-router-dom';

interface EventCarouselProps {
  images: string[];
  event: EventData;
  playerCount: number;
  maxPlayers: number;
  onImageUpload: (file: File) => void;
}

const EventCarousel = ({ images, event, playerCount, maxPlayers, onImageUpload }: EventCarouselProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Format date
  const formattedDate = format(new Date(event.date), 'EEEE, MMMM d, yyyy');
  
  // Handle next/prev image
  const handleNextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden aspect-[21/14] bg-muted animate-fade-in mb-2">
      {/* Navigation Buttons directly on the image */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 z-20">
        <Link to="/" className="text-white hover:text-white/80 transition-colors inline-flex items-center bg-black/40 px-2 py-1 rounded-md">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Link>
        
        <div className="flex space-x-2">
          <EventAbout description={event.description} />
          
          <label htmlFor="image-upload" className="cursor-pointer">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white bg-black/40 hover:bg-black/60"
            >
              <ImagePlus className="h-4 w-4 mr-1" />
              Image
            </Button>
            <input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange}
            />
          </label>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white bg-black/40 hover:bg-black/60"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {images.length > 0 ? (
        <div className="w-full h-full overflow-hidden">
          <img 
            src={images[activeImageIndex]} 
            alt="Event image" 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <span className="text-muted-foreground">No image available</span>
        </div>
      )}
      
      {/* Overlay with event details */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
          <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-1">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{formattedDate}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{event.time} · {event.duration}</span>
            </div>
            
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{playerCount}/{maxPlayers} players</span>
            </div>
          </div>
          
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
            <div>
              <div className="font-medium">{event.location}</div>
              <div className="text-sm text-white/90">
                {event.locationDetails}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image navigation */}
      {images.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={handlePrevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={handleNextImage}
          >
            <ChevronLeft className="h-4 w-4 transform rotate-180" />
          </Button>
        </div>
      )}
      
      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all",
                index === activeImageIndex 
                  ? "bg-white w-3" 
                  : "bg-white/50 hover:bg-white/80"
              )}
              onClick={() => setActiveImageIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCarousel;
