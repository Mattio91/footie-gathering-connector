
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
    
    // Set filtered events
    setFilteredEvents(filtered);
    
    // For featured events, prioritize events the user has joined or is tentative for
    const userEvents = filtered.filter(
      event => event.participationStatus === 'joined' || event.participationStatus === 'tentative'
    ).slice(0, 3);
    
    // If we don't have 3 user events, fill with other events
    const featured = userEvents.length === 3 
      ? userEvents 
      : [...userEvents, ...filtered.filter(
          event => event.participationStatus !== 'joined' && event.participationStatus !== 'tentative'
        )].slice(0, 3);
    
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
