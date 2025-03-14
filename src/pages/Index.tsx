
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, CalendarClock, MapPin, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard, { EventCardProps } from '@/components/EventCard';

// Mock data for demonstration
const mockEvents: EventCardProps[] = [
  {
    id: '1',
    title: 'Saturday Morning Kickabout',
    location: 'Hackney Marshes, London',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
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
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
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
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
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
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    time: '11:00',
    duration: '90 mins',
    format: '7v7',
    playerCount: 12,
    maxPlayers: 14,
    price: 5,
    isPrivate: false,
    imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter events based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredEvents(mockEvents);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = mockEvents.filter(
      event => 
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.format.toLowerCase().includes(query)
    );
    
    setFilteredEvents(filtered);
  }, [searchQuery]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
        
        <div className="container max-w-6xl mx-auto text-center">
          <span className="tag bg-primary/10 text-primary mb-4 animate-fade-in">
            <CalendarClock className="h-3 w-3 mr-1" />
            Organizing football matches made simple
          </span>
          
          <h1 className="h1 md:text-5xl lg:text-6xl mb-6 animate-fade-in" style={{ animationDelay: '150ms' }}>
            Connect with players.<br />Organize matches.<br />Play football.
          </h1>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '300ms' }}>
            PitchMatch makes it easy to organize football games, find players, and manage your teams all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '450ms' }}>
            <Link to="/create-event">
              <Button size="lg" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <MapPin className="h-4 w-4 mr-2" />
              Find Local Games
            </Button>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="h2 mb-2">Upcoming Events</h2>
              <p className="text-muted-foreground">Join a match and play football with others.</p>
            </div>
            
            {/* Search Bar */}
            <div className="mt-4 md:mt-0 relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by title, location, or format..."
                className="pl-10 pr-4 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                {...event} 
              />
            ))}
          </div>
          
          {/* Show this when no events match search */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No events match your search criteria.</p>
              <Link to="/create-event">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create a New Event
                </Button>
              </Link>
            </div>
          )}
          
          {/* Pagination (simplified) */}
          {filteredEvents.length > 0 && (
            <div className="flex justify-center mt-12">
              <Button variant="outline" size="sm" className="mr-2">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="mx-1 bg-primary text-white">
                1
              </Button>
              <Button variant="outline" size="sm" className="mx-1">
                2
              </Button>
              <Button variant="outline" size="sm" className="mx-1">
                3
              </Button>
              <Button variant="outline" size="sm" className="ml-2">
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container max-w-6xl mx-auto">
          <h2 className="h2 text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <CalendarClock className="h-8 w-8" />
              </div>
              <h3 className="h4 mb-2">Create or Join</h3>
              <p className="text-muted-foreground">
                Create your own football event or join existing ones in your area.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="h4 mb-2">Find Players</h3>
              <p className="text-muted-foreground">
                Invite friends or let others discover and join your event.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="h4 mb-2">Play Football</h3>
              <p className="text-muted-foreground">
                Meet up at the pitch, play the game, and track scores and stats.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
        
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="h2 md:text-4xl mb-6">Ready to organize your first football match?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            Create an event, invite players, and get ready for kickoff. It only takes a few minutes to set up.
          </p>
          
          <Link to="/create-event">
            <Button size="lg" className="px-8">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Event
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
