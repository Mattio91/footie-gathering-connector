
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EventWithParticipation } from '@/types/event-instance';

interface EventDropdownProps {
  selectedEvent: EventWithParticipation | null;
  displayedEvents: EventWithParticipation[];
  onSelectEvent: (event: EventWithParticipation | null) => void;
}

const EventDropdown = ({ 
  selectedEvent, 
  displayedEvents, 
  onSelectEvent 
}: EventDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[120px] justify-between">
          {selectedEvent ? selectedEvent.title : 'Select Event'}
          <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto bg-background">
        <DropdownMenuItem className="font-medium" onClick={() => onSelectEvent(null)}>
          All Events
        </DropdownMenuItem>
        
        {displayedEvents.length > 0 && displayedEvents.map(event => (
          <DropdownMenuItem 
            key={event.id} 
            className={selectedEvent?.id === event.id ? "bg-accent text-accent-foreground" : ""}
            onClick={() => onSelectEvent(event)}
          >
            {event.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EventDropdown;
