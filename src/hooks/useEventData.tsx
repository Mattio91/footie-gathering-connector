
import { useState, useEffect } from 'react';
import { EventWithParticipation } from '@/types/event-instance';
import { getMockEvents } from '@/services/eventService';

interface UseEventDataProps {
  initialSearchQuery?: string;
}

interface UseEventDataResult {
  isLoaded: boolean;
  searchQuery: string;
  filteredEvents: EventWithParticipation[];
  featuredEvents: EventWithParticipation[];
  tableEvents: EventWithParticipation[];
  handleSearch: (query: string) => void;
}

export const useEventData = ({ initialSearchQuery = '' }: UseEventDataProps = {}): UseEventDataResult => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [filteredEvents, setFilteredEvents] = useState<EventWithParticipation[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<EventWithParticipation[]>([]);
  const [tableEvents, setTableEvents] = useState<EventWithParticipation[]>([]);
  const [mockEvents] = useState<EventWithParticipation[]>(getMockEvents());
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter and sort events when search query changes
  useEffect(() => {
    // Sort events by instance date (not original event date)
    const sortedEvents = [...mockEvents].sort((a, b) => 
      (a.instanceDate || a.date).getTime() - (b.instanceDate || b.date).getTime()
    );
    
    // Filter events based on search query
    const filtered = searchQuery.trim() 
      ? sortedEvents.filter(event => {
          const query = searchQuery.toLowerCase();
          return event.title.toLowerCase().includes(query) ||
                 event.location.toLowerCase().includes(query) ||
                 event.format.toLowerCase().includes(query);
        })
      : sortedEvents;
    
    setFilteredEvents(filtered);
    
    // For featured events, only show the closest event that user has joined, is tentative for, or hasn't decided on
    const relevantEvents = filtered.filter(
      event => event.participationStatus === 'joined' || 
               event.participationStatus === 'tentative' || 
               event.participationStatus === 'none' ||
               event.participationStatus === undefined
    );
    
    // Just take the closest (first) relevant event
    const featured = relevantEvents.length > 0 ? [relevantEvents[0]] : [];
    
    setFeaturedEvents(featured);
    
    // Table events - all events excluding featured ones
    const tableEventIds = featured.map(event => event.id);
    setTableEvents(filtered.filter(event => !tableEventIds.includes(event.id)).slice(0, 10));
  }, [searchQuery, mockEvents]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  return {
    isLoaded,
    searchQuery,
    filteredEvents,
    featuredEvents,
    tableEvents,
    handleSearch
  };
};
