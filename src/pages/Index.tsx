import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { EventCardProps } from '@/components/EventCard';
import HeroSection from '@/components/home/HeroSection';
import EventsSection from '@/components/home/EventsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';

const mockEvents: EventCardProps[] = [
  {
    id: '1',
    title: 'Saturday Morning Kickabout',
    location: 'Hackney Marshes, London',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    time: '09:00',
    duration: '90 mins',
    format: '6v6',
    playerCount: 8,
    maxPlayers: 12,
    price: 5,
    isPrivate: false,
    imageUrl: 'https://images.unsplash.com/photo-1592656094267-764a45160876?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '2',
    title: 'Sunday League Match',
    location: 'Regent\'s Park, London',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    time: '14:30',
    duration: '2 hours',
    format: '11v11',
    playerCount: 18,
    maxPlayers: 22,
    price: 7.5,
    isPrivate: true,
    imageUrl: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
  },
  {
    id: '3',
    title: 'After Work 5-a-side',
    location: 'Victoria Park, London',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    time: '18:00',
    duration: '1 hour',
    format: '5v5',
    playerCount: 10,
    maxPlayers: 10,
    price: 0,
    isPrivate: false,
    imageUrl: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '4',
    title: 'Friendly Match',
    location: 'Wormwood Scrubs, London',
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    time: '11:00',
    duration: '90 mins',
    format: '7v7',
    playerCount: 12,
    maxPlayers: 14,
    price: 5,
    isPrivate: false,
    imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '5',
    title: 'Weekend Tournament',
    location: 'Greenwich Park, London',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    time: '10:00',
    duration: '4 hours',
    format: '5v5',
    playerCount: 25,
    maxPlayers: 30,
    price: 10,
    isPrivate: false,
    imageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '6',
    title: 'Charity Football Match',
    location: 'Finsbury Park, London',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    time: '13:00',
    duration: '2 hours',
    format: '11v11',
    playerCount: 20,
    maxPlayers: 22,
    price: 15,
    isPrivate: false,
    imageUrl: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '7',
    title: 'Community Cup',
    location: 'Hampstead Heath, London',
    date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    time: '15:00',
    duration: '3 hours',
    format: '7v7',
    playerCount: 10,
    maxPlayers: 14,
    price: 8,
    isPrivate: false,
    imageUrl: 'https://images.unsplash.com/photo-1516731415730-0c607149933a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  }
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<EventCardProps[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<EventCardProps[]>([]);
  const [tableEvents, setTableEvents] = useState<EventCardProps[]>([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const sortedEvents = [...mockEvents].sort((a, b) => a.date.getTime() - b.date.getTime());
    
    const filtered = searchQuery.trim() 
      ? sortedEvents.filter(event => {
          const query = searchQuery.toLowerCase();
          return event.title.toLowerCase().includes(query) ||
                 event.location.toLowerCase().includes(query) ||
                 event.format.toLowerCase().includes(query);
        })
      : sortedEvents;
    
    setFilteredEvents(filtered);
    setFeaturedEvents(filtered.slice(0, 3));
    setTableEvents(filtered.slice(3, 13));
  }, [searchQuery, mockEvents]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <EventsSection 
        filteredEvents={filteredEvents}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        featuredEvents={featuredEvents}
        tableEvents={tableEvents}
      />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default Index;
