
import { Link } from 'react-router-dom';
import { ChevronLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EventHeaderActions = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to events
      </Link>
      
      <Button variant="ghost" size="sm" className="text-muted-foreground">
        <Share2 className="h-4 w-4 mr-1" />
        Share
      </Button>
    </div>
  );
};

export default EventHeaderActions;
