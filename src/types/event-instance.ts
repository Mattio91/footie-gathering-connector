
import { EventCardProps } from '@/components/EventCard';

// Extended type to include participation status and instance date
export type EventWithParticipation = EventCardProps & {
  participationStatus?: 'joined' | 'tentative' | 'skipping' | 'none';
  instanceDate?: Date;
};
