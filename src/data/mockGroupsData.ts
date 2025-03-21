
import { Group } from '@/types/group';

export const mockGroups: Group[] = [
  // Private groups
  {
    id: '1',
    name: 'Sunday Warriors',
    city: 'Gdańsk',
    memberCount: 24,
    isPrivate: true,
    description: 'Private group for Sunday morning football games in Gdańsk',
    image: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    members: [
      { id: '1', name: 'Alex Johnson', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { id: '2', name: 'Sarah Smith', role: 'Co-Admin', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: '3', name: 'Mike Wilson', role: 'Member', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    ]
  },
  {
    id: '2',
    name: 'Neighborhood Crew',
    city: 'Gdańsk',
    memberCount: 18, 
    isPrivate: true,
    description: 'Group for neighbors who love to play football together in Gdańsk Wrzeszcz area',
    image: 'https://images.unsplash.com/photo-1473976345543-9ffc928e648d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    members: [
      { id: '1', name: 'Alex Johnson', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { id: '5', name: 'David Brown', role: 'Member', avatar: 'https://randomuser.me/api/portraits/men/86.jpg' },
    ]
  },
  {
    id: '3',
    name: 'Work Colleagues',
    city: 'Gdańsk',
    memberCount: 12,
    isPrivate: true,
    description: 'Office football group for after-work matches in Gdańsk',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2093&q=80',
    members: [
      { id: '4', name: 'Jessica Taylor', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/women/23.jpg' },
      { id: '6', name: 'Emma Davis', role: 'Member', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
    ]
  },
  
  // Public groups
  {
    id: '4',
    name: 'Football Gdańsk',
    city: 'Gdańsk',
    memberCount: 142,
    isPrivate: false,
    description: 'The biggest public football community in Gdańsk. Join us for regular matches throughout the week!',
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2029&q=80',
    members: [
      { id: '7', name: 'Robert Kowalski', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
      { id: '8', name: 'Anna Nowak', role: 'Co-Admin', avatar: 'https://randomuser.me/api/portraits/women/29.jpg' },
    ]
  },
  {
    id: '5',
    name: 'Gdańsk Amateur League',
    city: 'Gdańsk',
    memberCount: 78,
    isPrivate: false,
    description: 'Amateur football league in Gdańsk area. We organize competitive matches every weekend.',
    image: 'https://images.unsplash.com/photo-1499673610122-01c7122c5dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    members: [
      { id: '9', name: 'Piotr Lewandowski', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
    ]
  },
  {
    id: '6',
    name: 'Gdańsk Futsal',
    city: 'Gdańsk',
    memberCount: 45,
    isPrivate: false,
    description: 'Indoor futsal group playing in Gdańsk sports centers',
    image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80',
    members: [
      { id: '10', name: 'Marek Jankowski', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
    ]
  },
  {
    id: '7',
    name: 'Gdańsk Seniors',
    city: 'Gdańsk',
    memberCount: 32,
    isPrivate: false,
    description: 'Football group for players over 40 in Gdańsk area',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?q=80&w=1000',
    members: [
      { id: '11', name: 'Tadeusz Nowicki', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/61.jpg' },
    ]
  },
  {
    id: '8',
    name: 'Gdańsk University FC',
    city: 'Gdańsk',
    memberCount: 68,
    isPrivate: false,
    description: 'Football group for university students in Gdańsk',
    image: 'https://images.unsplash.com/photo-1542144582-1f02695554ac?q=80&w=1000',
    members: [
      { id: '12', name: 'Tomasz Kowalczyk', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/42.jpg' },
    ]
  },
  {
    id: '9',
    name: 'Wrzeszcz Wanderers',
    city: 'Gdańsk',
    memberCount: 29,
    isPrivate: false,
    description: 'Local football group from Wrzeszcz district in Gdańsk',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000',
    members: [
      { id: '13', name: 'Jakub Wójcik', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/36.jpg' },
    ]
  },
  {
    id: '10',
    name: 'Oliwa Lions',
    city: 'Gdańsk',
    memberCount: 41,
    isPrivate: false,
    description: 'Football group based in Oliwa district, Gdańsk',
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2029&q=80',
    members: [
      { id: '14', name: 'Michał Kamiński', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/28.jpg' },
    ]
  },
  {
    id: '11',
    name: 'Przymorze United',
    city: 'Gdańsk',
    memberCount: 37,
    isPrivate: false,
    description: 'Football enthusiasts from Przymorze area in Gdańsk',
    image: 'https://images.unsplash.com/photo-1626248801386-6a5463d42e4e?q=80&w=1000',
    members: [
      { id: '15', name: 'Adam Zieliński', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/19.jpg' },
    ]
  },
  {
    id: '12',
    name: 'Letnica Team',
    city: 'Gdańsk',
    memberCount: 22,
    isPrivate: false,
    description: 'Football team playing near Energa Stadium in Letnica, Gdańsk',
    image: 'https://images.unsplash.com/photo-1597640931603-a0cee32d8560?q=80&w=1000',
    members: [
      { id: '16', name: 'Krzysztof Szymański', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/84.jpg' },
    ]
  },
];
