
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CalendarIcon, Clock, MapPin, Users, ImagePlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface EventImageCarouselProps {
  images: string[];
  title: string;
  date: Date;
  time: string;
  duration: string;
  location: string;
  locationDetails?: string;
  playerCount?: number;
  maxPlayers?: number;
  onImageUpload?: (file: File) => void;
}

const EventImageCarousel = ({ 
  images, 
  title,
  date,
  time,
  duration,
  location,
  locationDetails,
  playerCount,
  maxPlayers,
  onImageUpload
}: EventImageCarouselProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Format date
  const formattedDate = format(date, 'EEEE, MMMM d, yyyy');
  
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
    if (e.target.files && e.target.files[0] && onImageUpload) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden aspect-[21/9] bg-muted animate-fade-in mb-8">
      <img 
        src={images[activeImageIndex]} 
        alt="Event image" 
        className="w-full h-full object-cover"
      />
      
      {/* Image upload button */}
      {onImageUpload && (
        <div className="absolute top-4 right-4 z-10">
          <label htmlFor="image-upload" className="cursor-pointer">
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-black/50 hover:bg-black/70 text-white"
            >
              <ImagePlus className="h-4 w-4 mr-1" />
              Change Image
            </Button>
            <input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange}
            />
          </label>
        </div>
      )}
      
      {/* Overlay with event details */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <h1 className="text-3xl font-bold mb-3">{title}</h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{formattedDate}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{time} · {duration}</span>
            </div>
            
            {playerCount !== undefined && maxPlayers !== undefined && (
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{playerCount}/{maxPlayers} players</span>
              </div>
            )}
          </div>
          
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
            <div>
              <div className="font-medium">{location}</div>
              <div className="text-sm text-white/90">
                {locationDetails}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image navigation */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
          onClick={handlePrevImage}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
          onClick={handleNextImage}
        >
          <ChevronLeft className="h-5 w-5 transform rotate-180" />
        </Button>
      </div>
      
      {/* Image indicators */}
      <div className="absolute bottom-20 sm:bottom-24 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === activeImageIndex 
                ? "bg-white w-4" 
                : "bg-white/50 hover:bg-white/80"
            )}
            onClick={() => setActiveImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventImageCarousel;
