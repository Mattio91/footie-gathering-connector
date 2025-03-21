
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
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
    <div className="flex flex-col">
      <span className="text-sm text-muted-foreground mb-1">Filter by event</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="min-w-[180px] justify-between bg-background">
            {selectedEvent ? selectedEvent.title : 'Select Event'}
            <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto bg-background w-[250px]">
          <DropdownMenuLabel>Select Event</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {displayedEvents.length > 0 ? (
            displayedEvents.map(event => (
              <DropdownMenuItem 
                key={event.id} 
                className={selectedEvent?.id === event.id ? "bg-accent text-accent-foreground" : ""}
                onClick={() => onSelectEvent(event)}
              >
                {event.title}
              </DropdownMenuItem>
            ))
          ) : (
            <div className="px-2 py-1.5 text-sm text-muted-foreground">No events found</div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EventDropdown;
