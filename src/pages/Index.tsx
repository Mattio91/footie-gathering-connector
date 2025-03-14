import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, CalendarClock, MapPin, Search, Users, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard, { EventCardProps } from '@/components/EventCard';
import { useTranslation } from 'react-i18next';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';

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
  const { t } = useTranslation();
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="pt-28 pb-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
        
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <span className="tag bg-primary/10 text-primary mb-4 animate-fade-in">
                <CalendarClock className="h-3 w-3 mr-1" />
                {t('index.heroSubtitle')}
              </span>
              
              <h1 className="font-oswald text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight mb-6 animate-fade-in leading-none" style={{ animationDelay: '150ms' }}>
                <span className="block">GATHER</span>
                <span className="text-emerald-500">to play</span>
              </h1>
              
              <p className="text-muted-foreground text-lg max-w-md mb-10 animate-fade-in" style={{ animationDelay: '300ms' }}>
                {t('index.heroSubtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '450ms' }}>
                <Link to="/create-event">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('common.createEvent')}
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <MapPin className="h-4 w-4 mr-2" />
                  {t('common.findLocalGames')}
                </Button>
              </div>
            </div>
            
            <div className="hidden md:flex md:justify-center md:items-center">
              <div className="relative w-full max-w-md aspect-video bg-primary/5 rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 border-2 border-emerald-500/40 rounded-md relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-emerald-500/40"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-emerald-500/40"></div>
                    <div className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full border border-emerald-500/40 -translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1/5 border-r border-t border-b border-emerald-500/40"></div>
                    <div className="absolute right-0 top-1/4 bottom-1/4 w-1/5 border-l border-t border-b border-emerald-500/40"></div>
                    
                    <div className="absolute left-[15%] top-[30%] w-3 h-3 bg-team-home rounded-full"></div>
                    <div className="absolute left-[25%] top-[50%] w-3 h-3 bg-team-home rounded-full"></div>
                    <div className="absolute left-[15%] top-[70%] w-3 h-3 bg-team-home rounded-full"></div>
                    <div className="absolute left-[40%] top-[30%] w-3 h-3 bg-team-home rounded-full"></div>
                    <div className="absolute left-[40%] top-[70%] w-3 h-3 bg-team-home rounded-full"></div>
                    
                    <div className="absolute right-[15%] top-[30%] w-3 h-3 bg-team-away rounded-full"></div>
                    <div className="absolute right-[25%] top-[50%] w-3 h-3 bg-team-away rounded-full"></div>
                    <div className="absolute right-[15%] top-[70%] w-3 h-3 bg-team-away rounded-full"></div>
                    <div className="absolute right-[40%] top-[30%] w-3 h-3 bg-team-away rounded-full"></div>
                    <div className="absolute right-[40%] top-[70%] w-3 h-3 bg-team-away rounded-full"></div>
                    
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30,50 L60,30" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="1" fill="none" strokeDasharray="4 2" />
                      <polygon points="60,30 56,32 58,27" fill="rgba(34, 197, 94, 0.6)" />
                      
                      <path d="M30,50 L60,70" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="1" fill="none" strokeDasharray="4 2" />
                      <polygon points="60,70 56,68 58,73" fill="rgba(34, 197, 94, 0.6)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/30">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="font-oswald text-3xl uppercase tracking-tight mb-2">{t('index.upcomingEvents')}</h2>
              <p className="text-muted-foreground">{t('index.upcomingEventsSubtitle')}</p>
            </div>
            
            <div className="mt-4 md:mt-0 relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('index.searchPlaceholder')}
                className="pl-10 pr-4 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {featuredEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {featuredEvents.map((event, index) => (
                <EventCard 
                  key={event.id} 
                  {...event} 
                />
              ))}
            </div>
          )}
          
          {tableEvents.length > 0 && (
            <Card className="mt-8 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Players</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="font-medium">{format(event.date, 'EEE, MMM d')}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">{event.duration}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>{event.format}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{event.playerCount}/{event.maxPlayers}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {event.price > 0 ? `£${event.price}` : 'Free'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to={`/event/${event.id}`}>
                          <Button variant="outline" size="sm">View</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">{t('index.noEventsFound')}</p>
              <Link to="/create-event">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('index.createNewEvent')}
                </Button>
              </Link>
            </div>
          )}
          
          {filteredEvents.length > 0 && (
            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg" className="group">
                {t('common.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <section className="py-20 px-4 bg-gradient-to-br from-secondary/30 to-background">
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-oswald text-4xl text-center uppercase tracking-tight mb-16">{t('index.howItWorks')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <CalendarClock className="h-8 w-8" />
              </div>
              <h3 className="font-oswald text-xl uppercase mb-3">{t('index.createOrJoin')}</h3>
              <p className="text-muted-foreground">
                {t('index.createOrJoinDesc')}
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-oswald text-xl uppercase mb-3">{t('index.findPlayers')}</h3>
              <p className="text-muted-foreground">
                {t('index.findPlayersDesc')}
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="font-oswald text-xl uppercase mb-3">{t('index.playFootball')}</h3>
              <p className="text-muted-foreground">
                {t('index.playFootballDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
