
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import EventCard, { EventCardProps } from '@/components/EventCard';
import EventsTable from './EventsTable';

interface EventsSectionProps {
  filteredEvents: EventCardProps[];
  searchQuery: string;
  onSearch: (query: string) => void;
  featuredEvents: EventCardProps[];
  tableEvents: EventCardProps[];
}

const EventsSection = ({
  filteredEvents,
  searchQuery,
  onSearch,
  featuredEvents,
  tableEvents
}: EventsSectionProps) => {
  const { t } = useTranslation();

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
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
        
        {featuredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {featuredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                {...event} 
              />
            ))}
          </div>
        )}
        
        <EventsTable events={tableEvents} />
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">{t('index.noEventsFound')}</p>
            <Link to="/create-event">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t('index.createNewEvent')}
              </Button>
            </Link>
          </div>
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
