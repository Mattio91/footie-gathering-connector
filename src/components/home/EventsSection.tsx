
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { EventCardProps } from '@/components/EventCard';
import { EventWithParticipation } from '@/types/event-instance';
import EventsTable from './EventsTable';
import FeaturedEvents from './FeaturedEvents';

interface EventsSectionProps {
  filteredEvents: EventWithParticipation[];
  searchQuery: string;
  onSearch: (query: string) => void;
  featuredEvents: EventWithParticipation[];
  tableEvents: EventWithParticipation[];
}

const EventsSection = ({
  filteredEvents,
  searchQuery,
  onSearch,
  featuredEvents,
  tableEvents
}: EventsSectionProps) => {
  const { t } = useTranslation();
  const [userRelatedCurrentPage, setUserRelatedCurrentPage] = useState(1);
  const [openEventsCurrentPage, setOpenEventsCurrentPage] = useState(1);
  const pageSize = 5; // Number of events per page
  
  // Split events into user-related and open events
  const [userRelatedEvents, setUserRelatedEvents] = useState<EventWithParticipation[]>([]);
  const [openEvents, setOpenEvents] = useState<EventWithParticipation[]>([]);
  
  // Reset to page 1 when search query changes
  const handleSearch = (query: string) => {
    setUserRelatedCurrentPage(1);
    setOpenEventsCurrentPage(1);
    onSearch(query);
  };
  
  // Filter events into two categories when tableEvents change
  useEffect(() => {
    // User-related events: events where the user has a participation status
    const related = tableEvents.filter(event => 
      event.participationStatus === 'joined' || 
      event.participationStatus === 'tentative' || 
      event.participationStatus === 'skipping'
    );
    
    // Open events: events that are not private and not related to the user
    const open = tableEvents.filter(event => 
      !event.isPrivate && 
      (event.participationStatus === 'none' || event.participationStatus === undefined)
    );
    
    setUserRelatedEvents(related);
    setOpenEvents(open);
  }, [tableEvents]);

  return (
    <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/30">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="font-oswald text-3xl uppercase tracking-tight mb-2">{t('index.upcomingEvents')}</h2>
            <p className="text-muted-foreground">{t('index.upcomingEventsSubtitle')}</p>
          </div>
          
          <div className="mt-4 md:mt-0 relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('index.searchPlaceholder')}
              className="pl-10 pr-4 w-full"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        
        <FeaturedEvents events={featuredEvents} />
        
        {/* User-related events table */}
        {userRelatedEvents.length > 0 && (
          <EventsTable 
            events={userRelatedEvents} 
            currentPage={userRelatedCurrentPage}
            pageSize={pageSize}
            onPageChange={setUserRelatedCurrentPage}
            title="Your Upcoming Events"
          />
        )}
        
        {/* Open events table */}
        {openEvents.length > 0 && (
          <EventsTable 
            events={openEvents} 
            currentPage={openEventsCurrentPage}
            pageSize={pageSize}
            onPageChange={setOpenEventsCurrentPage}
            title="Open Events Looking for Players"
          />
        )}
        
        {filteredEvents.length === 0 && (
          <FeaturedEvents events={[]} showEmptyState={true} />
        )}
        
        {filteredEvents.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" className="group">
              {t('common.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
