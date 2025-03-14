
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

// Mock comments
const mockComments = [
  { 
    id: '1', 
    author: { id: '2', name: 'Sarah Smith', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    text: 'Looking forward to the game! Should we bring anything specific?',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    replies: [
      {
        id: '1-1',
        author: { id: '1', name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        text: 'Just regular football gear and water! If you have both light and dark jerseys, that would help for making teams.',
        timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
      }
    ]
  },
  {
    id: '2',
    author: { id: '3', name: 'Mike Wilson', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    text: 'Is there parking available at the field?',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    replies: []
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
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(mockComments);
  const [players, setPlayers] = useState(mockPlayers);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
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
  
  // Handle add comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      id: `comment-${Date.now()}`,
      author: { 
        id: 'current-user', 
        name: 'You', 
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' 
      },
      text: newComment,
      timestamp: new Date(),
      replies: []
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="md:col-span-2 space-y-8">
              {/* Event Images */}
              <div className="relative rounded-xl overflow-hidden aspect-video bg-muted animate-fade-in">
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
              
              {/* Event Details */}
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '150ms' }}>
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
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">About this event</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {mockEvent.description}
                  </p>
                </div>
              </div>
              
              {/* Tabs for Players, Comments, etc. */}
              <Tabs defaultValue="players" className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="players">
                    <Users className="h-4 w-4 mr-2" />
                    Players
                  </TabsTrigger>
                  <TabsTrigger value="comments">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comments
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="players" className="pt-6">
                  <PlayersList 
                    players={players} 
                    maxPlayers={mockEvent.maxPlayers} 
                    teamCount={2}
                    showManagement={false}
                  />
                </TabsContent>
                
                <TabsContent value="comments" className="pt-6">
                  <div className="space-y-6">
                    {/* Add comment */}
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src="https://randomuser.me/api/portraits/lego/1.jpg" 
                          alt="Your avatar" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <Textarea
                          placeholder="Ask a question or leave a comment..."
                          className="w-full mb-2"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button 
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                        >
                          Post Comment
                        </Button>
                      </div>
                    </div>
                    
                    {/* Comments list */}
                    <div className="space-y-6">
                      {comments.map((comment) => (
                        <div key={comment.id} className="space-y-4">
                          <div className="flex space-x-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                              <img 
                                src={comment.author.avatar || `https://ui-avatars.com/api/?name=${comment.author.name}`} 
                                alt={comment.author.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-baseline justify-between">
                                <h4 className="font-medium">{comment.author.name}</h4>
                                <span className="text-xs text-muted-foreground">
                                  {format(comment.timestamp, 'MMM d, p')}
                                </span>
                              </div>
                              <p className="mt-1 text-muted-foreground">{comment.text}</p>
                              <Button variant="ghost" size="sm" className="text-xs mt-1 h-auto py-1">
                                Reply
                              </Button>
                            </div>
                          </div>
                          
                          {/* Replies */}
                          {comment.replies.length > 0 && (
                            <div className="pl-12 space-y-4">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex space-x-3">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
                                    <img 
                                      src={reply.author.avatar || `https://ui-avatars.com/api/?name=${reply.author.name}`} 
                                      alt={reply.author.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-grow">
                                    <div className="flex items-baseline justify-between">
                                      <h4 className="font-medium text-sm">{reply.author.name}</h4>
                                      <span className="text-xs text-muted-foreground">
                                        {format(reply.timestamp, 'MMM d, p')}
                                      </span>
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">{reply.text}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {comments.length === 0 && (
                        <div className="text-center py-8">
                          <MessageCircle className="h-12 w-12 text-muted mx-auto mb-3" />
                          <p className="text-muted-foreground">Be the first to comment!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
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
