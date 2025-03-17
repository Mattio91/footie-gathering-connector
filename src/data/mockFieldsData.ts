
import { Field } from '@/types/field';
import { getMockEvent } from './mockEventData';

// Create an array of mock events using the getMockEvent function
const createMockEventsForField = (fieldName: string, count: number = 3) => {
  return Array.from({ length: count }, (_, i) => {
    const event = getMockEvent(`${fieldName}-${i + 1}`);
    return {
      ...event,
      location: `${fieldName}, London`,
    };
  });
};

export const mockFields: Field[] = [
  {
    id: '1',
    name: 'Hackney Marshes',
    location: 'Hackney Marshes, London E9 5PF',
    description: 'Hackney Marshes is an area of open space in London\'s Lower Lea Valley, with 88 full-size football pitches.',
    images: [
      { id: '1', url: '/images/fields/hackney-marshes-1.jpg', alt: 'Hackney Marshes main field' },
      { id: '2', url: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1000', alt: 'Football field aerial view' },
    ],
    events: createMockEventsForField('Hackney Marshes', 2)
  },
  {
    id: '2',
    name: 'Regent\'s Park',
    location: 'Regent\'s Park, London NW1 4NR',
    description: 'The Hub is home to the largest outdoor sports facility in London, with over 40 pitches catering for football, rugby, cricket and more.',
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=1000', alt: 'Regent\'s Park football field' },
      { id: '2', url: 'https://images.unsplash.com/photo-1494778696781-8f23fd5553c4?q=80&w=1000', alt: 'Football match at Regent\'s Park' },
    ],
    events: createMockEventsForField('Regent\'s Park', 3)
  },
  {
    id: '3',
    name: 'Victoria Park',
    location: 'Victoria Park, London E9 7DD',
    description: 'Victoria Park has excellent sports facilities including football pitches that can be booked for matches or casual games.',
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1542144582-1f02695554ac?q=80&w=1000', alt: 'Victoria Park field' },
      { id: '2', url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000', alt: 'Football pitch at Victoria Park' },
    ],
    events: createMockEventsForField('Victoria Park', 2)
  },
  {
    id: '4',
    name: 'Wormwood Scrubs',
    location: 'Wormwood Scrubs, London W12 0DF',
    description: 'Wormwood Scrubs offers several football pitches available for booking, popular among local teams and casual players.',
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?q=80&w=1000', alt: 'Wormwood Scrubs field' },
      { id: '2', url: 'https://images.unsplash.com/photo-1626248801386-6a5463d42e4e?q=80&w=1000', alt: 'Football at Wormwood Scrubs' },
    ],
    events: createMockEventsForField('Wormwood Scrubs', 1)
  },
];
