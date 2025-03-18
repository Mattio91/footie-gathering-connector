
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';

interface EventsTableProps {
  events: EventCardProps[];
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const EventsTable = ({ events, currentPage, pageSize, onPageChange }: EventsTableProps) => {
  const { toast } = useToast();
  
  if (events.length === 0) return null;
  
  // Calculate pagination values
  const totalPages = Math.ceil(events.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, events.length);
  const currentEvents = events.slice(startIndex, endIndex);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      toast({
        title: "Invalid page",
        description: `Page must be between 1 and ${totalPages}`,
        variant: "destructive",
      });
      return;
    }
    
    onPageChange(page);
    
    // Scroll to top of table
    const tableElement = document.getElementById('events-table');
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPageItems = 5; // Maximum number of page items to show
    
    if (totalPages <= maxPageItems) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4);
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push('ellipsis-start');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  return (
    <div id="events-table">
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
            {currentEvents.map((event) => (
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
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            {/* Previous button */}
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            
            {/* Page numbers */}
            {getPageNumbers().map((page, index) => (
              <PaginationItem key={`page-${index}`}>
                {page === 'ellipsis-start' || page === 'ellipsis-end' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(Number(page))}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            
            {/* Next button */}
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default EventsTable;
