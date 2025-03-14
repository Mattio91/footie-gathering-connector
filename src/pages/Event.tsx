import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Share2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventMap from '@/components/EventMap';
import EventChat from '@/components/EventChat';
import EventImageCarousel from '@/components/EventImageCarousel';
import EventTeams from '@/components/EventTeams';
import EventAbout from '@/components/EventAbout';

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
          
          {/* Field Image with title and details on it */}
          <EventImageCarousel 
            images={mockImages} 
            title={mockEvent.title}
            date={mockEvent.date}
            time={mockEvent.time}
            duration={mockEvent.duration}
            location={mockEvent.location}
            locationDetails={mockEvent.locationDetails}
          />
          
          {/* Main content area */}
          <div className="space-y-8">
            {/* Teams & Field visualization section with join button */}
            <EventTeams 
              players={players} 
              maxPlayers={mockEvent.maxPlayers} 
              isJoined={isJoined}
              onJoinEvent={handleJoinEvent}
            />
            
            {/* About the event */}
            <EventAbout description={mockEvent.description} />
            
            {/* Location map */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Location</h3>
              <EventMap 
                location={mockEvent.location} 
                locationDetails={mockEvent.locationDetails}
              />
            </div>
            
            {/* Event host information */}
            <div className="rounded-lg border p-3 max-w-xs">
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
            
            {/* Chat section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Event Chat</h3>
              <EventChat 
                messages={chatMessages}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Event;
