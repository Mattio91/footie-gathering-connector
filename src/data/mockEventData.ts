
import { EventData, ChatMessage } from '@/types/event';
import { Player } from '@/types/player';

// Colors for events
const eventColors = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
];

// Mock event data
export const getMockEvent = (eventId: string): EventData => ({
  id: eventId || '1',
  title: 'Saturday Morning Kickabout',
  location: 'Hackney Marshes, London',
  locationDetails: 'Meet at pitch 3, near the car park entrance',
  date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  time: '09:00',
  duration: '90 mins',
  format: '6v6',
  maxPlayers: 12,
  price: 5,
  isPrivate: false,
  host: {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  coHosts: [
    {
      id: '2',
      name: 'Sarah Smith',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  ],
  description: 'Casual 6-a-side match on Saturday morning. All skill levels welcome! We\'ll play for about 90 minutes. There\'s a small fee to cover pitch rental. Please bring both dark and light colored shirts so we can make teams on the day.',
  imageUrl: 'https://images.unsplash.com/photo-1592656094267-764a45160876?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  groups: [
    { 
      id: '1', 
      name: 'Sunday League', 
      memberCount: 14,
      members: [
        { id: '1', name: 'Alex Johnson', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { id: '2', name: 'Sarah Smith', role: 'Co-Admin', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { id: '3', name: 'Mike Wilson', role: 'Member', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
        { id: '4', name: 'Jessica Taylor', role: 'Member', avatar: 'https://randomuser.me/api/portraits/women/23.jpg' }
      ]
    },
    { 
      id: '2', 
      name: 'Neighborhood Crew', 
      memberCount: 8,
      members: [
        { id: '1', name: 'Alex Johnson', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { id: '5', name: 'David Brown', role: 'Member', avatar: 'https://randomuser.me/api/portraits/men/86.jpg' },
        { id: '6', name: 'Emma Davis', role: 'Member', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' }
      ]
    }
  ],
  color: eventColors[Math.floor(Math.random() * eventColors.length)],
});

// Mock images
export const mockImages = [
  'https://images.unsplash.com/photo-1592656094267-764a45160876?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
];

export const getMockPlayers = (): Player[] => [
  { id: '1', name: 'Alex Johnson', isConfirmed: true, isAdmin: true, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '2', name: 'Sarah Smith', isConfirmed: true, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '3', name: 'Mike Wilson', isConfirmed: true, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: '4', name: 'Jessica Taylor', isConfirmed: false, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/women/23.jpg' },
  { id: '5', name: 'David Brown', isConfirmed: true, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/men/86.jpg' },
  { id: '6', name: 'Emma Davis', isConfirmed: false, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: '7', name: 'Ryan Clark', isConfirmed: true, isAdmin: false },
];

export const getMockMessages = (): ChatMessage[] => [
  { 
    id: '1', 
    author: { id: '2', name: 'Sarah Smith', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    text: 'Looking forward to the game! Should we bring anything specific?',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: '2',
    author: { id: '1', name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    text: 'Just regular football gear and water! If you have both light and dark jerseys, that would help for making teams.',
    timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
  },
  {
    id: '3',
    author: { id: '3', name: 'Mike Wilson', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    text: 'Is there parking available at the field?',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  }
];
