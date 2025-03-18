
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import EventCard, { EventCardProps } from '@/components/EventCard';

interface FeaturedEventsProps {
  events: EventCardProps[];
  showEmptyState?: boolean;
}

const FeaturedEvents = ({
  events,
  showEmptyState = false,
}: FeaturedEventsProps) => {
  const { t } = useTranslation();

  if (events.length === 0 && showEmptyState) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">{t('index.noEventsFound')}</p>
        <Link to="/create-event">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t('index.createNewEvent')}
          </Button>
        </Link>
      </div>
    );
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          {...event} 
        />
      ))}
    </div>
  );
};

export default FeaturedEvents;
