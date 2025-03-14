
import { format } from 'date-fns';
import { CalendarIcon, Clock, MapPin, Flag, DollarSign } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface EventHeaderProps {
  title: string;
  date: Date;
  time: string;
  duration: string;
  location: string;
  locationDetails?: string;
  format: string;
  price: number;
}

const EventHeader = ({
  title,
  date,
  time,
  duration,
  location,
  locationDetails,
  format: eventFormat,
  price
}: EventHeaderProps) => {
  // Format date
  const formattedDate = format(date, 'EEEE, MMMM d, yyyy');

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <span className="tag bg-primary/10 text-primary border-none">
          <Flag className="h-3 w-3 mr-1" />
          {eventFormat}
        </span>
        {price > 0 && (
          <span className="tag bg-muted text-muted-foreground border-none">
            <DollarSign className="h-3 w-3 mr-1" />
            ${price} per player
          </span>
        )}
      </div>
      
      <h1 className="text-3xl font-bold">{title}</h1>
      
      <div className="flex flex-col sm:flex-row sm:items-center text-muted-foreground gap-4">
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{formattedDate}</span>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{time} · {duration}</span>
        </div>
      </div>
      
      <div className="flex items-start">
        <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-1 text-muted-foreground" />
        <div>
          <div className="font-medium">{location}</div>
          <div className="text-sm text-muted-foreground">
            {locationDetails}
          </div>
        </div>
      </div>

      <Separator />
    </div>
  );
};

export default EventHeader;
