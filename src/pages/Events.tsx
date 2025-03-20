
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useEventData } from '@/hooks/useEventData';
import EventSummary from '@/components/home/EventSummary';
import EventInstancesList from '@/components/home/EventInstancesList';

// Mock function to get upcoming and historical instances of an event
const getEventInstances = (event, count = 10) => {
  const instances = [];
  const today = new Date();
  
  // Create instances in the past (historical)
  for (let i = 1; i <= Math.floor(count/2); i++) {
    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - (i * 7)); // Weekly in the past
    
    instances.push({
      ...event,
      id: `${event.id}-past-${i}`,
      instanceDate: pastDate,
      status: Math.random() > 0.2 ? 'played' : 'canceled', // 20% chance of canceled
      won: Math.random() > 0.8, // 20% chance of being MVP
      participationStatus: Math.random() > 0.3 ? 'joined' : 'skipping' // 70% joined, 30% skipped
    });
  }
  
  // Create instances in the future (upcoming)
  for (let i = 0; i < Math.ceil(count/2); i++) {
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + (i * 7)); // Weekly in the future
    
    instances.push({
      ...event,
      id: `${event.id}-future-${i}`,
      instanceDate: futureDate,
      status: 'upcoming',
      participationStatus: i === 0 ? 'joined' : (i === 1 ? 'tentative' : 'none') // First upcoming is joined, second is tentative
    });
  }
  
  return instances;
};

const Events = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventInstances, setEventInstances] = useState([]);
  
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-oswald uppercase tracking-tight">
              {t('common.events')}
            </h1>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-0">
              <CardTitle>{t('events.findEvents')}</CardTitle>
              <CardDescription>{t('events.searchAndFilterEvents')}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t('events.searchEvents')}
                  className="pl-10 pr-4 w-full"
                  value={searchQuery}
                  onChange={(e) => handleSearchInput(e.target.value)}
                />
              </div>
              
              {isLoaded && filteredEvents.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {filteredEvents.map(event => (
                    <Button
                      key={event.id}
                      variant={selectedEvent?.id === event.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedEvent(event)}
                    >
                      {event.title}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
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
          
          {isLoaded && !selectedEvent && filteredEvents.length === 0 && (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your search or create a new event.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
