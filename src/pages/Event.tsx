
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign, 
  MessageCircle,
  Share2,
  Pencil,
  Flag,
  Star,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlayersList from '@/components/PlayersList';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import FootballField from '@/components/FootballField';
import EventMap from '@/components/EventMap';
import EventChat from '@/components/EventChat';

// Mock data to simulate an event
const mockEvent = {
  id: '1',
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
  description: 'Casual 6-a-side match on Saturday morning. All skill levels welcome! We\'ll play for about 90 minutes. There\'s a small fee to cover pitch rental. Please bring both dark and light colored shirts so we can make teams on the day.',
  imageUrl: 'https://images.unsplash.com/photo-1592656094267-764a45160876?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
};

// Mock players
const mockPlayers = [
  { id: '1', name: 'Alex Johnson', isConfirmed: true, isAdmin: true, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '2', name: 'Sarah Smith', isConfirmed: true, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '3', name: 'Mike Wilson', isConfirmed: true, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: '4', name: 'Jessica Taylor', isConfirmed: false, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/women/23.jpg' },
  { id: '5', name: 'David Brown', isConfirmed: true, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/men/86.jpg' },
  { id: '6', name: 'Emma Davis', isConfirmed: false, isAdmin: false, avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: '7', name: 'Ryan Clark', isConfirmed: true, isAdmin: false },
];

// Mock chat messages
const mockMessages = [
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

// Event Images
const mockImages = [
  'https://images.unsplash.com/photo-1592656094267-764a45160876?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
];

const Event = () => {
  const { id } = useParams<{ id: string }>();
  const [isJoined, setIsJoined] = useState(false);
  const [chatMessages, setChatMessages] = useState(mockMessages);
  const [players, setPlayers] = useState(mockPlayers);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("teams");
  
  // Format date
  const formattedDate = format(mockEvent.date, 'EEEE, MMMM d, yyyy');
  
  // Handle join event
  const handleJoinEvent = () => {
    if (isJoined) {
      // Remove self from players list
      setPlayers(players.filter(player => player.id !== 'current-user'));
    } else {
      // Add self to players list
      setPlayers([
        ...players, 
        { 
          id: 'current-user', 
          name: 'You', 
          isConfirmed: false, 
          isAdmin: false,
          avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
        }
      ]);
    }
    setIsJoined(!isJoined);
  };
  
  // Handle add chat message
  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: `message-${Date.now()}`,
      author: { 
        id: 'current-user', 
        name: 'You', 
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' 
      },
      text: messageText,
      timestamp: new Date(),
    };
    
    setChatMessages([...chatMessages, newMessage]);
  };
  
  // Handle next/prev image
  const handleNextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === mockImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? mockImages.length - 1 : prevIndex - 1
    );
  };

  // Get team distributions
  const teamA = players.slice(0, Math.ceil(players.length / 2));
  const teamB = players.slice(Math.ceil(players.length / 2));
  const reservePlayers = players.length > mockEvent.maxPlayers ? 
    players.slice(mockEvent.maxPlayers) : [];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Back button and share */}
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to events
            </Link>
            
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
          
          {/* Field Image */}
          <div className="relative rounded-xl overflow-hidden aspect-video bg-muted animate-fade-in mb-8">
            <img 
              src={mockImages[activeImageIndex]} 
              alt={mockEvent.title} 
              className="w-full h-full object-cover"
            />
            
            {/* Image navigation */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
                onClick={handleNextImage}
              >
                <ChevronLeft className="h-5 w-5 transform rotate-180" />
              </Button>
            </div>
            
            {/* Image indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {mockImages.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === activeImageIndex 
                      ? "bg-white w-4" 
                      : "bg-white/50 hover:bg-white/80"
                  )}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
          </div>
          
          {/* Page content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event header */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="tag bg-primary/10 text-primary border-none">
                    <Flag className="h-3 w-3 mr-1" />
                    {mockEvent.format}
                  </span>
                  {mockEvent.price > 0 && (
                    <span className="tag bg-muted text-muted-foreground border-none">
                      <DollarSign className="h-3 w-3 mr-1" />
                      ${mockEvent.price} per player
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold">{mockEvent.title}</h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center text-muted-foreground gap-4">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{formattedDate}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{mockEvent.time} · {mockEvent.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-1 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{mockEvent.location}</div>
                    <div className="text-sm text-muted-foreground">
                      {mockEvent.locationDetails}
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Teams & Field visualization section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Teams</h2>
                  <div className="text-sm text-muted-foreground">
                    {players.length}/{mockEvent.maxPlayers} players
                  </div>
                </div>
                
                {/* Tabs for team management */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="teams">Teams</TabsTrigger>
                    <TabsTrigger value="field">Field View</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="teams" className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Team A */}
                      <Card className="border-team-home/20 bg-team-home/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Home Team</CardTitle>
                          <CardDescription>{teamA.length} players</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {teamA.map(player => (
                              <div 
                                key={player.id} 
                                className="flex items-center p-2 rounded-md bg-background/80"
                              >
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                  <img 
                                    src={player.avatar || `https://ui-avatars.com/api/?name=${player.name}`} 
                                    alt={player.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <div className="font-medium text-sm">{player.name}</div>
                                </div>
                              </div>
                            ))}
                            
                            {/* Empty spots */}
                            {Array.from({length: Math.max(0, Math.ceil(mockEvent.maxPlayers/2) - teamA.length)}).map((_, i) => (
                              <div 
                                key={`empty-a-${i}`} 
                                className="flex items-center p-2 rounded-md border border-dashed border-muted-foreground/30"
                              >
                                <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center mr-3">
                                  <Users className="h-4 w-4 text-muted-foreground/50" />
                                </div>
                                <div className="flex-grow text-sm text-muted-foreground">
                                  Available spot
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Team B */}
                      <Card className="border-team-away/20 bg-team-away/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Away Team</CardTitle>
                          <CardDescription>{teamB.length} players</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {teamB.map(player => (
                              <div 
                                key={player.id} 
                                className="flex items-center p-2 rounded-md bg-background/80"
                              >
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                  <img 
                                    src={player.avatar || `https://ui-avatars.com/api/?name=${player.name}`} 
                                    alt={player.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <div className="font-medium text-sm">{player.name}</div>
                                </div>
                              </div>
                            ))}
                            
                            {/* Empty spots */}
                            {Array.from({length: Math.max(0, Math.floor(mockEvent.maxPlayers/2) - teamB.length)}).map((_, i) => (
                              <div 
                                key={`empty-b-${i}`} 
                                className="flex items-center p-2 rounded-md border border-dashed border-muted-foreground/30"
                              >
                                <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center mr-3">
                                  <Users className="h-4 w-4 text-muted-foreground/50" />
                                </div>
                                <div className="flex-grow text-sm text-muted-foreground">
                                  Available spot
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="field" className="pt-4">
                    <div className="rounded-xl border p-6 bg-muted/10">
                      <FootballField 
                        teamAPlayers={teamA.length} 
                        teamBPlayers={teamB.length}
                        maxPlayers={mockEvent.maxPlayers}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Reserve players section */}
              {reservePlayers.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Reserve Players</h3>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        {reservePlayers.map(player => (
                          <div 
                            key={player.id} 
                            className="flex items-center p-2 rounded-md bg-muted/10"
                          >
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                              <img 
                                src={player.avatar || `https://ui-avatars.com/api/?name=${player.name}`} 
                                alt={player.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="font-medium text-sm">{player.name}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* About the event */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">About this event</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {mockEvent.description}
                </p>
              </div>
              
              {/* Location map */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Location</h3>
                <EventMap 
                  location={mockEvent.location} 
                  locationDetails={mockEvent.locationDetails}
                />
              </div>
              
              {/* Chat section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Event Chat</h3>
                <EventChat 
                  messages={chatMessages}
                  onSendMessage={handleSendMessage}
                />
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Join Card */}
              <Card className="shadow-md border-border sticky top-24 animate-fade-in" style={{ animationDelay: '150ms' }}>
                <CardHeader>
                  <CardTitle>Ready to play?</CardTitle>
                  <CardDescription>
                    {isJoined 
                      ? `You're signed up for this event.` 
                      : `Join this football match (${players.length}/${mockEvent.maxPlayers} players).`
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button 
                      className={cn("w-full", isJoined && "bg-destructive hover:bg-destructive/90")}
                      onClick={handleJoinEvent}
                    >
                      {isJoined 
                        ? "Leave Event" 
                        : players.length >= mockEvent.maxPlayers 
                          ? "Join Waitlist" 
                          : "Join Event"
                      }
                    </Button>
                    
                    <div className="rounded-lg border p-3">
                      <div className="text-sm">
                        <div className="font-medium mb-1">Organized by</div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                            <img 
                              src={mockEvent.host.avatar || `https://ui-avatars.com/api/?name=${mockEvent.host.name}`} 
                              alt={mockEvent.host.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span>{mockEvent.host.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share with Friends
                  </Button>
                </CardFooter>
              </Card>
              
              {/* After game section */}
              {false && ( // This is hidden until the game is played
                <Card className="shadow-md border-border animate-fade-in">
                  <CardHeader>
                    <CardTitle>Match Completed!</CardTitle>
                    <CardDescription>
                      Rate your experience and vote for the MVP.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="input-label">Final Score</Label>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <Input 
                            type="number" 
                            min="0" 
                            placeholder="0"
                            className="text-center"
                          />
                          <div className="text-center font-medium text-muted-foreground">vs</div>
                          <Input 
                            type="number" 
                            min="0" 
                            placeholder="0"
                            className="text-center"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="input-label">Vote for MVP</Label>
                        {players.slice(0, 3).map((player) => (
                          <div 
                            key={player.id}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                          >
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                                <img 
                                  src={player.avatar || `https://ui-avatars.com/api/?name=${player.name}`} 
                                  alt={player.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-sm">{player.name}</span>
                            </div>
                            <Star className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Submit Ratings
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Event;
