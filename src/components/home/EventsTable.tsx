
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { EventCardProps } from '@/components/EventCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface EventsTableProps {
  events: EventCardProps[];
}

const EventsTable = ({ events }: EventsTableProps) => {
  if (events.length === 0) return null;
  
  return (
    <Card className="mt-8 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Format</TableHead>
            <TableHead>Players</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                <div className="font-medium">{format(event.date, 'EEE, MMM d')}</div>
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
  );
};

export default EventsTable;
