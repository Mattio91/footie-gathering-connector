
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, Clock, MapPin, Users, Lock, LockOpen, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export interface EventCardProps {
  id: string;
  title: string;
  location: string;
  date: Date;
  time: string;
  duration: string;
  format: string;
  playerCount: number;
  maxPlayers: number;
  price: number;
  isPrivate: boolean;
  imageUrl?: string;
}

const EventCard = ({
  id,
  title,
  location,
  date,
  time,
  duration,
  format,
  playerCount,
  maxPlayers,
  price,
  isPrivate,
  imageUrl,
}: EventCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const formattedDate = format(date, 'EEE, MMM d');
  const isFullyBooked = playerCount >= maxPlayers;
  
  // Default image if none provided
  const backgroundImage = imageUrl || 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl transition-all duration-500 ease-out transform opacity-0 translate-y-4',
        isVisible ? 'opacity-100 translate-y-0' : ''
      )}
      style={{ transitionDelay: '150ms' }}
    >
      <Link to={`/event/${id}`} className="block">
        <div className="relative h-full">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center rounded-xl transform transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 rounded-xl" />
          
          {/* Status Tags */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {isPrivate ? (
              <span className="tag bg-black/50 text-white border-none">
                <Lock className="h-3 w-3 mr-1" />
                Private
              </span>
            ) : (
              <span className="tag bg-primary/80 text-white border-none">
                <LockOpen className="h-3 w-3 mr-1" />
                Open
              </span>
            )}
            
            {price > 0 && (
              <span className="tag bg-black/50 text-white border-none">
                <DollarSign className="h-3 w-3 mr-1" />
                {price}
              </span>
            )}
          </div>
          
          {/* Content */}
          <div className="relative p-6 h-full flex flex-col justify-end">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="tag bg-white/10 text-white border-none backdrop-blur-sm">
                  {format}
                </span>
                <span className={cn(
                  "tag backdrop-blur-sm border-none",
                  isFullyBooked 
                    ? "bg-destructive/80 text-white" 
                    : "bg-primary/80 text-white"
                )}>
                  <Users className="h-3 w-3 mr-1" />
                  {playerCount}/{maxPlayers}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                {title}
              </h3>
              
              <div className="space-y-1">
                <div className="flex items-center text-white/90">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm truncate">{location}</span>
                </div>
                
                <div className="flex items-center text-white/90">
                  <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{formattedDate}</span>
                </div>
                
                <div className="flex items-center text-white/90">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{time} · {duration}</span>
                </div>
              </div>
            </div>
            
            {/* View Button - Only visible on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                className="bg-primary/90 hover:bg-primary text-white rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
                onClick={(e) => e.preventDefault()}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
