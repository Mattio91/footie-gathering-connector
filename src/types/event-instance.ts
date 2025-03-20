
import { Group } from './group';

export interface EventWithParticipation {
  id: string;
  title: string;
  location: string;
  description?: string;
  date: Date;
  instanceDate?: Date;
  time: string;
  duration: string;
  format: string;
  maxPlayers: number;
  playerCount: number;
  price: number;
  isPrivate?: boolean;
  imageUrl?: string;
  participationStatus?: 'joined' | 'tentative' | 'skipping' | 'none';
  status?: 'upcoming' | 'played' | 'canceled';
  won?: boolean;
  groups?: Group[];
}
