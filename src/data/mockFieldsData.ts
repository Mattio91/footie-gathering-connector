
import { Field } from '@/types/field';
import { getMockEvent } from './mockEventData';
import { addDays, format } from 'date-fns';

// Create an array of mock events for a field ensuring they don't overlap
const createMockEventsForField = (fieldName: string, count: number = 3) => {
  if (count === 0) return [];
  
  return Array.from({ length: count }, (_, i) => {
    // Create base event
    const event = getMockEvent(`${fieldName}-${i + 1}`);
    
    // Set different day of week for each event
    const today = new Date();
    const dayOfWeek = i % 5; // Use Monday (0) through Friday (4)
    const daysToAdd = dayOfWeek + (8 - today.getDay()); // Next week starting Monday
    
    // Set different times to avoid overlaps (2-hour blocks)
    const startHours = [10, 14, 18]; // Morning, afternoon, evening times
    const startHour = startHours[i % startHours.length];
    const endHour = startHour + 2;
    
    const eventDate = addDays(today, daysToAdd);
    
    return {
      ...event,
      location: `${fieldName}, Gdańsk`,
      date: eventDate,
      time: `${startHour}:00`,
      duration: '2 hours',
      color: i === 0 ? '#3b82f6' : i === 1 ? '#10b981' : '#f59e0b', // Blue, green, amber
      // Add explicit start and end times for calendar display
      startTime: `${startHour}:00`,
      endTime: `${endHour}:00`,
    };
  });
};

export const mockFields: Field[] = [
  {
    id: '1',
    name: 'Stadion Energa Gdańsk',
    location: 'Pokoleń Lechii Gdańsk 1, 80-560 Gdańsk, Poland',
    description: 'The Energa Gdańsk Stadium is a multi-purpose stadium in Gdańsk, Poland. It hosts football matches and various sports events with a capacity of 41,620 spectators.',
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', alt: 'Stadion Energa Gdańsk main field' },
      { id: '2', url: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1000', alt: 'Football field aerial view' },
    ],
    events: createMockEventsForField('Stadion Energa Gdańsk', 3)
  },
  {
    id: '2',
    name: 'Boisko MOSiR Gdańsk',
    location: 'Traugutta 29, 80-221 Gdańsk, Poland',
    description: 'A well-maintained sports facility with several football pitches available for both professional teams and casual players.',
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=1000', alt: 'MOSiR Gdańsk football field' },
      { id: '2', url: 'https://images.unsplash.com/photo-1494778696781-8f23fd5553c4?q=80&w=1000', alt: 'Football match at MOSiR' },
    ],
    events: createMockEventsForField('Boisko MOSiR Gdańsk', 2)
  },
  {
    id: '3',
    name: 'Boisko przy Politechnice Gdańskiej',
    location: 'Narutowicza 11/12, 80-233 Gdańsk, Poland',
    description: 'Sports facilities at the Gdańsk University of Technology offering football pitches for students and local community games.',
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1542144582-1f02695554ac?q=80&w=1000', alt: 'Polytechnic field' },
      { id: '2', url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000', alt: 'Football pitch at Polytechnic' },
    ],
    events: createMockEventsForField('Boisko przy Politechnice Gdańskiej', 1)
  },
  {
    id: '4',
    name: 'Orlik Gdańsk Przymorze',
    location: 'Obrońców Wybrzeża 1, 80-398 Gdańsk, Poland',
    description: 'A public sports facility with artificial turf offering free access to football pitches as part of the national Orlik program.',
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?q=80&w=1000', alt: 'Orlik field' },
      { id: '2', url: 'https://images.unsplash.com/photo-1626248801386-6a5463d42e4e?q=80&w=1000', alt: 'Football at Orlik' },
    ],
    events: createMockEventsForField('Orlik Gdańsk Przymorze', 0) // This field has no events to test the empty state
  },
];

