import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, Search, Filter, Plus, MapPin, Clock, Users, ArrowLeft } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEventData } from '@/hooks/useEventData';
import EventsTable from '@/components/home/EventsTable';

const Events = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedCurrentPage, setJoinedCurrentPage] = useState(1);
  const [tentativeCurrentPage, setTentativeCurrentPage] = useState(1);
  const [historyCurrentPage, setHistoryCurrentPage] = useState(1);
  const [otherCurrentPage, setOtherCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('joined');
  const pageSize = 5; // Number of events per page
  
  // Use the shared event data hook
  const { 
    isLoaded,
    filteredEvents,
    handleSearch
  } = useEventData({ initialSearchQuery: searchQuery });
  
  // Filter events based on participation status
  const joinedEvents = filteredEvents.filter(
    event => event.participationStatus === 'joined'
  );

  const tentativeEvents = filteredEvents.filter(
    event => event.participationStatus === 'tentative'
  );
  
  // Historical events - for demo purposes, just showing first 3 events as "past"
  const historyEvents = filteredEvents.slice(0, 3).map(event => ({
    ...event,
    instanceDate: new Date(Date.now() - (Math.random() * 30) * 24 * 60 * 60 * 1000) // Random date in the past 30 days
  }));
  
  // Other events (ones you're not participating in)
  const otherEvents = filteredEvents.filter(
    event => event.participationStatus !== 'joined' && 
             event.participationStatus !== 'tentative' && 
             event.participationStatus !== 'skipping'
  );
  
  // Handle search input changes
  const handleSearchInput = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
    // Reset pagination when search changes
    setJoinedCurrentPage(1);
    setTentativeCurrentPage(1);
    setHistoryCurrentPage(1);
    setOtherCurrentPage(1);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="flex items-center">
              <Link to="/" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-3xl font-oswald uppercase tracking-tight">
                {t('common.events')}
              </h1>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0 gap-2">
              <Link to="/create-event">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('common.createEvent')}
                </Button>
              </Link>
            </div>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-0">
              <CardTitle>{t('events.findEvents')}</CardTitle>
              <CardDescription>{t('events.searchAndFilterEvents')}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={t('events.searchEvents')}
                    className="pl-10 pr-4 w-full"
                    value={searchQuery}
                    onChange={(e) => handleSearchInput(e.target.value)}
                  />
                </div>
                
                <Button variant="outline" className="sm:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  {t('common.filter')}
                </Button>
              </div>
              
              <div className="mt-4">
                <Tabs defaultValue="joined" onValueChange={setActiveFilter}>
                  <TabsList className="w-full sm:w-auto justify-start overflow-auto pb-1">
                    <TabsTrigger value="joined">Joined</TabsTrigger>
                    <TabsTrigger value="tentative">Tentative</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="other">Other Events</TabsTrigger>
                  </TabsList>
                  
                  {/* Joined Events Tab */}
                  <TabsContent value="joined" className="pt-4">
                    {joinedEvents.length > 0 ? (
                      <EventsTable
                        events={joinedEvents}
                        currentPage={joinedCurrentPage}
                        pageSize={pageSize}
                        onPageChange={setJoinedCurrentPage}
                        title="Events You've Joined"
                      />
                    ) : (
                      <EmptyEventsState 
                        title="No joined events"
                        description="You haven't joined any events yet. Browse other events or create a new one."
                      />
                    )}
                  </TabsContent>
                  
                  {/* Tentative Events Tab */}
                  <TabsContent value="tentative" className="pt-4">
                    {tentativeEvents.length > 0 ? (
                      <EventsTable
                        events={tentativeEvents}
                        currentPage={tentativeCurrentPage}
                        pageSize={pageSize}
                        onPageChange={setTentativeCurrentPage}
                        title="Events You're Tentative For"
                      />
                    ) : (
                      <EmptyEventsState 
                        title="No tentative events"
                        description="You don't have any events you're tentatively joining."
                      />
                    )}
                  </TabsContent>
                  
                  {/* History Tab */}
                  <TabsContent value="history" className="pt-4">
                    {historyEvents.length > 0 ? (
                      <EventsTable
                        events={historyEvents}
                        currentPage={historyCurrentPage}
                        pageSize={pageSize}
                        onPageChange={setHistoryCurrentPage}
                        title="Your Event History"
                      />
                    ) : (
                      <EmptyEventsState 
                        title="No event history"
                        description="You don't have any past events to show yet."
                      />
                    )}
                  </TabsContent>
                  
                  {/* Other Events Tab */}
                  <TabsContent value="other" className="pt-4">
                    {otherEvents.length > 0 ? (
                      <EventsTable
                        events={otherEvents}
                        currentPage={otherCurrentPage}
                        pageSize={pageSize}
                        onPageChange={setOtherCurrentPage}
                        title="Other Available Events"
                      />
                    ) : (
                      <EmptyEventsState 
                        title="No other events"
                        description="There are no other events available right now."
                      />
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface EmptyEventsStateProps {
  title: string;
  description: string;
}

const EmptyEventsState = ({ title, description }: EmptyEventsStateProps) => (
  <div className="text-center py-12 bg-muted/20 rounded-lg">
    <CalendarClock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground mb-6">{description}</p>
    <Link to="/create-event">
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Create New Event
      </Button>
    </Link>
  </div>
);

export default Events;
