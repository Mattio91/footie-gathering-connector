
import { Calendar, Clock, CheckCircle } from 'lucide-react';

interface EventStatusIndicatorProps {
  status: 'upcoming' | 'in-progress' | 'completed';
}

const EventStatusIndicator = ({ status }: EventStatusIndicatorProps) => {
  switch(status) {
    case 'in-progress':
      return (
        <div className="bg-amber-500 text-white px-2 py-1 rounded-md flex items-center text-xs">
          <Clock className="h-3 w-3 mr-1" /> In Progress
        </div>
      );
    case 'completed':
      return (
        <div className="bg-green-600 text-white px-2 py-1 rounded-md flex items-center text-xs">
          <CheckCircle className="h-3 w-3 mr-1" /> Completed
        </div>
      );
    default:
      return (
        <div className="bg-blue-600 text-white px-2 py-1 rounded-md flex items-center text-xs">
          <Calendar className="h-3 w-3 mr-1" /> Upcoming
        </div>
      );
  }
};

export default EventStatusIndicator;
