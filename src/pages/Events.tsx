
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEventData } from '@/hooks/useEventData';
import EventSummary from '@/components/home/EventSummary';
import EventInstancesList from '@/components/home/EventInstancesList';
import EventsSearchFilter from '@/components/events/EventsSearchFilter';
import EventDropdown from '@/components/events/EventDropdown';
import NoEventsFound from '@/components/events/NoEventsFound';
import { getEventInstances } from '@/utils/eventInstancesGenerator';

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventInstances, setEventInstances] = useState([]);
  const [viewFilter, setViewFilter] = useState('all');
  
  // Use the shared event data hook
  const { 
    isLoaded,
    filteredEvents,
    handleSearch
  } = useEventData({ initialSearchQuery: searchQuery });
  
  // Select the first event by default when data is loaded
  useEffect(() => {
    if (isLoaded && filteredEvents.length > 0 && !selectedEvent) {
      setSelectedEvent(filteredEvents[0]);
    }
  }, [isLoaded, filteredEvents, selectedEvent]);
  
  // Generate event instances when selected event changes
  useEffect(() => {
    if (selectedEvent) {
      const instances = getEventInstances(selectedEvent, 10);
      setEventInstances(instances);
    }
  }, [selectedEvent]);
  
  // Handle search input changes
  const handleSearchInput = (query) => {
    setSearchQuery(query);
    handleSearch(query);
    setSelectedEvent(null); // Reset selected event when search changes
  };

  // Filter events based on the selected view filter
  const getFilteredEventsByType = () => {
    if (viewFilter === 'all') return filteredEvents;
    if (viewFilter === 'joined') return filteredEvents.filter(event => event.participationStatus === 'joined');
    if (viewFilter === 'tentative') return filteredEvents.filter(event => event.participationStatus === 'tentative');
    if (viewFilter === 'open') return filteredEvents.filter(event => !event.isPrivate);
    return filteredEvents;
  };
  
  const displayedEvents = getFilteredEventsByType();
  
  // Handle event selection from dropdown
  const selectEventFromDropdown = (event) => {
    setSelectedEvent(event);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-4 mt-4">
            <EventsSearchFilter
              searchQuery={searchQuery}
              viewFilter={viewFilter}
              onSearchChange={handleSearchInput}
              onViewFilterChange={setViewFilter}
            />
            
            <EventDropdown 
              selectedEvent={selectedEvent}
              displayedEvents={displayedEvents}
              onSelectEvent={selectEventFromDropdown}
            />
          </div>
          
          {selectedEvent && (
            <>
              {/* Event Summary */}
              <EventSummary 
                event={selectedEvent}
                groups={selectedEvent.groups || []}
              />
              
              {/* Event Instances */}
              <EventInstancesList eventInstances={eventInstances} />
            </>
          )}
          
          {isLoaded && !selectedEvent && displayedEvents.length === 0 && (
            <NoEventsFound />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
