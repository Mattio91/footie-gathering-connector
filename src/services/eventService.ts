
import { EventWithParticipation } from '@/types/event-instance';

// Mock events updated with participation status and instance dates
export const getMockEvents = (): EventWithParticipation[] => [
  {
    id: '1',
    title: 'Saturday Morning Kickabout',
    location: 'Hackney Marshes, London',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    instanceDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Same as date for now
    time: '09:00',
    duration: '90 mins',
    format: '6v6',
    playerCount: 8,
    maxPlayers: 12,
    price: 5,
    isPrivate: false,
    participationStatus: 'joined', // User has joined this event
    imageUrl: 'https://images.unsplash.com/photo-1592656094267-764a45160876?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '2',
    title: 'Sunday League Match',
    location: 'Regent\'s Park, London',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    instanceDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Same as date for now
    time: '14:30',
    duration: '2 hours',
    format: '11v11',
    playerCount: 18,
    maxPlayers: 22,
    price: 7.5,
    isPrivate: true,
    participationStatus: 'tentative', // User is tentative for this event
    imageUrl: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
  },
  {
    id: '3',
    title: 'After Work 5-a-side',
    location: 'Victoria Park, London',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    instanceDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Same as date for now
    time: '18:00',
    duration: '1 hour',
    format: '5v5',
    playerCount: 10,
    maxPlayers: 10,
    price: 0,
    isPrivate: false,
    participationStatus: 'skipping', // User can't join this event
    imageUrl: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '4',
    title: 'Friendly Match',
    location: 'Wormwood Scrubs, London',
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    instanceDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // Same as date for now
    time: '11:00',
    duration: '90 mins',
    format: '7v7',
    playerCount: 12,
    maxPlayers: 14,
    price: 5,
    isPrivate: false,
    participationStatus: 'none', // User hasn't responded to this event
    imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  // Weekly recurring event with multiple instances
  {
    id: '5a', // This is an instance of event 5
    title: 'Weekend Tournament - Week 1',
    location: 'Greenwich Park, London',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Original event date
    instanceDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Instance date
    time: '10:00',
    duration: '4 hours',
    format: '5v5',
    playerCount: 25,
    maxPlayers: 30,
    price: 10,
    isPrivate: false,
    participationStatus: 'joined',
    imageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '5b', // Second instance of event 5
    title: 'Weekend Tournament - Week 2',
    location: 'Greenwich Park, London',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Original event date
    instanceDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // Week 2
    time: '10:00',
    duration: '4 hours',
    format: '5v5',
    playerCount: 23,
    maxPlayers: 30,
    price: 10,
    isPrivate: false,
    participationStatus: 'tentative',
    imageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '6',
    title: 'Charity Football Match',
    location: 'Finsbury Park, London',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    instanceDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Same as date for now
    time: '13:00',
    duration: '2 hours',
    format: '11v11',
    playerCount: 20,
    maxPlayers: 22,
    price: 15,
    isPrivate: false,
    participationStatus: 'joined',
    imageUrl: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '7',
    title: 'Community Cup',
    location: 'Hampstead Heath, London',
    date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    instanceDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // Same as date for now
    time: '15:00',
    duration: '3 hours',
    format: '7v7',
    playerCount: 10,
    maxPlayers: 14,
    price: 8,
    isPrivate: false,
    participationStatus: 'none',
    imageUrl: 'https://images.unsplash.com/photo-1516731415730-0c607149933a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  }
];
