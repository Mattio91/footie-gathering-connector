
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventImageCarouselProps {
  images: string[];
}

const EventImageCarousel = ({ images }: EventImageCarouselProps) => {
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

  return (
    <div className="relative rounded-xl overflow-hidden aspect-video bg-muted animate-fade-in mb-8">
      <img 
        src={images[activeImageIndex]} 
        alt="Event image" 
        className="w-full h-full object-cover"
      />
      
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
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
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
