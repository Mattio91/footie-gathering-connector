
import { Button } from '@/components/ui/button';
import { PhoneCall, X, ImagePlus, Share2 } from 'lucide-react';
import EventAbout from '@/components/EventAbout';

interface EventCarouselActionsProps {
  isHost: boolean;
  onCallPlayers: (() => void) | undefined;
  onCancelEvent: (() => void) | undefined;
  description: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventCarouselActions = ({ 
  isHost, 
  onCallPlayers, 
  onCancelEvent, 
  description,
  onImageChange
}: EventCarouselActionsProps) => {
  return (
    <div className="flex space-x-2">
      {isHost && (
        <>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white bg-black/40 hover:bg-black/60"
            onClick={onCallPlayers}
          >
            <PhoneCall className="h-4 w-4 mr-1" />
            Call
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white bg-black/40 hover:bg-black/60"
            onClick={onCancelEvent}
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        </>
      )}
      
      <EventAbout description={description} />
      
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
          onChange={onImageChange}
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
  );
};

export default EventCarouselActions;
