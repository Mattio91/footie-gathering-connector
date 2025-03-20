
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import ParticipationStatus from '@/components/groups/member/ParticipationStatus';
import TablePagination from './TablePagination';
import { EventWithParticipation } from '@/types/event-instance';
import { useIsMobile } from '@/hooks/use-mobile';
import EventCardMobile from './EventCardMobile';

interface EventsTableProps {
  events: EventWithParticipation[];
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  title?: string;
}

const EventsTable = ({ events, currentPage, pageSize, onPageChange, title }: EventsTableProps) => {
  const isMobile = useIsMobile();

  if (events.length === 0) return null;
  
  // Calculate pagination values
  const totalPages = Math.ceil(events.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, events.length);
  const currentEvents = events.slice(startIndex, endIndex);
  
  return (
    <div id={`events-table-${title ? title.toLowerCase().replace(/\s+/g, '-') : 'default'}`} className="mb-8">
      {title && (
        <h3 className="text-xl font-medium mb-3">{title}</h3>
      )}
      
      {isMobile ? (
        // Mobile view - card layout
        <div className="space-y-4">
          {currentEvents.map((event) => (
            <EventCardMobile key={event.id} event={event} />
          ))}
        </div>
      ) : (
        // Desktop view - table layout
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Players</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="font-medium">
                      {format(event.instanceDate || event.date, 'EEE, MMM d')}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {event.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground">{event.duration}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{event.format}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{event.playerCount}/{event.maxPlayers}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {event.price > 0 ? `£${event.price}` : 'Free'}
                  </TableCell>
                  <TableCell>
                    <ParticipationStatus 
                      status={event.participationStatus} 
                      memberId={event.id} 
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/event/${event.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
      
      {/* Pagination */}
      <TablePagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        tableId={`events-table-${title ? title.toLowerCase().replace(/\s+/g, '-') : 'default'}`}
      />
    </div>
  );
};

export default EventsTable;
