
import { Group } from '@/types/group';

export interface EventHost {
  id: string;
  name: string;
  avatar: string;
}

export interface EventData {
  id: string;
  title: string;
  location: string;
  locationDetails: string;
  date: Date;
  time: string;
  duration: string;
  format: string;
  maxPlayers: number;
  price: number;
  isPrivate: boolean;
  host: EventHost;
  coHosts: EventHost[];
  description: string;
  imageUrl: string;
  groups: Group[];
  color: string;
  startTime?: string; // Optional for explicit start time display
  endTime?: string;   // Optional for explicit end time display
}

export interface ChatMessage {
  id: string;
  author: { 
    id: string; 
    name: string; 
    avatar?: string;
  };
  text: string;
  timestamp: Date;
}
