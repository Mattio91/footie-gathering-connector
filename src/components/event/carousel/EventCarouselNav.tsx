
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventCarouselNavProps {
  statusIndicator: React.ReactNode;
}

const EventCarouselNav = ({ statusIndicator }: EventCarouselNavProps) => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/" className="text-white hover:text-white/80 transition-colors inline-flex items-center bg-black/40 px-2 py-1 rounded-md">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back
      </Link>
      {statusIndicator}
    </div>
  );
};

export default EventCarouselNav;
