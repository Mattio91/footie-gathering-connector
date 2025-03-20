
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventImageGalleryProps {
  images: string[];
}

const EventImageGallery = ({ images }: EventImageGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
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

  if (images.length === 0) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">No image available</span>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-full overflow-hidden">
        <img 
          src={images[activeImageIndex]} 
          alt="Event image" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Image navigation */}
      {images.length > 1 && (
        <>
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
          
          {/* Image indicators */}
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
        </>
      )}
    </>
  );
};

export default EventImageGallery;
