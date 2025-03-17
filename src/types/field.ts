
import { EventData } from '@/types/event';

export interface FieldImage {
  id: string;
  url: string;
  alt?: string;
}

export interface Field {
  id: string;
  name: string;
  location: string;
  description?: string;
  images: FieldImage[];
  events: EventData[];
}
