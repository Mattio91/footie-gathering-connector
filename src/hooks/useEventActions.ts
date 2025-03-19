import { Player } from '@/types/player';
import { useToast } from '@/hooks/use-toast';
import { ChatMessage } from '@/types/event';

interface EventActionsProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  tentativePlayers: Player[];
  setTentativePlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  isJoined: boolean;
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
  currentImages: string[];
  setCurrentImages: React.Dispatch<React.SetStateAction<string[]>>;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const useEventActions = ({
  players,
  setPlayers,
  tentativePlayers,
  setTentativePlayers,
  isJoined,
  setIsJoined,
  currentImages,
  setCurrentImages,
  messages,
  setMessages
}: EventActionsProps) => {
  const { toast } = useToast();

  // Handle join event
  const handleJoinEvent = () => {
    if (isJoined) {
      // Remove self from players list
      setPlayers(players.filter(player => player.id !== 'current-user'));
      // Also remove from tentative if somehow there
      setTentativePlayers(tentativePlayers.filter(player => player.id !== 'current-user'));
      setIsJoined(false);
      
      toast({
        title: "Left Event",
        description: "You have been removed from the event.",
      });
    } else {
      // Add self to players list as an unconfirmed player (reserve)
      setPlayers([
        ...players, 
        { 
          id: 'current-user', 
          name: 'You', 
          isConfirmed: false, 
          isAdmin: false,
          isTentative: false,
          isSkipping: false,
          participationStatus: 'joined' as const,
          avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
        }
      ]);
      setIsJoined(true);
      
      toast({
        title: "Joined Event",
        description: "You have been added to the reserve list.",
      });
    }
  };
  
  // Handle tentative join event
  const handleTentativeJoin = () => {
    if (isJoined) {
      // This shouldn't happen in regular UI flow, but handling edge case
      handleJoinEvent();
      return;
    }
    
    // Add self to tentative players list
    setTentativePlayers([
      ...tentativePlayers, 
      { 
        id: 'current-user', 
        name: 'You', 
        isConfirmed: false, 
        isAdmin: false,
        isTentative: true,
        isSkipping: false,
        participationStatus: 'tentative' as const,
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
      }
    ]);
    
    setIsJoined(true);
    
    toast({
      title: "Tentatively Joined",
      description: "You've been added as a tentative player. Please confirm later.",
    });
  };
  
  // Handle skip event (can't participate)
  const handleSkipEvent = () => {
    if (isJoined) {
      // If already joined, remove first
      handleJoinEvent();
    }
    
    // Add a notification that user won't participate
    const newMessage = {
      id: `message-${Date.now()}`,
      author: { 
        id: 'current-user', 
        name: 'You', 
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' 
      },
      text: "I won't be able to participate in this event.",
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    
    // Set user status as skipping in storage if needed
    // This would typically be sent to an API
    
    toast({
      title: "Status Updated",
      description: "You've indicated that you can't participate in this event.",
    });
  };
  
  // Handle ping member
  const handlePingMember = (memberId: string) => {
    // In a real app, this would send a notification to the member
    toast({
      title: "Reminder Sent",
      description: "A reminder has been sent to the member.",
    });
  };
  
  // Handle add friend
  const handleAddFriend = (name: string) => {
    // Generate a random ID for the friend
    const friendId = `friend-${Date.now()}`;
    
    // Add the friend to the players list as an unconfirmed player (reserve)
    const newPlayer: Player = {
      id: friendId,
      name: name,
      isConfirmed: false,
      isAdmin: false,
      participationStatus: 'none' as const
      // No avatar provided, will use UI avatars
    };
    
    setPlayers([...players, newPlayer]);
    
    toast({
      title: "Friend Added",
      description: `${name} has been linked to your account and added to the event as your friend.`,
    });
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
    
    setMessages([...messages, newMessage]);
  };

  // Handle image upload
  const handleImageUpload = (file: File) => {
    try {
      const imageUrl = URL.createObjectURL(file);
      setCurrentImages([imageUrl, ...currentImages.slice(1)]);
      
      toast({
        title: "Image Updated",
        description: "Your event image has been updated successfully.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };
  
  // New function: Handle call to free players
  const handleCallPlayers = () => {
    // In a real app, this would send notifications to players who haven't confirmed
    toast({
      title: "Reminder Sent",
      description: "Notification sent to all free players about this event.",
    });
    
    // Add system message
    const newMessage = {
      id: `message-${Date.now()}`,
      author: { 
        id: 'system', 
        name: 'System' 
      },
      text: "The host has sent a reminder to all players who haven't joined yet.",
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
  };
  
  // New function: Handle cancel event
  const handleCancelEvent = () => {
    // In a real app, this would call an API to cancel the event
    toast({
      title: "Event Cancelled",
      description: "This event instance has been cancelled. Players will be notified.",
      variant: "destructive",
    });
    
    // Add system message
    const newMessage = {
      id: `message-${Date.now()}`,
      author: { 
        id: 'system', 
        name: 'System' 
      },
      text: "⚠️ This event has been cancelled by the host.",
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
  };

  return {
    handleJoinEvent,
    handleTentativeJoin,
    handleSkipEvent,
    handleAddFriend,
    handleSendMessage,
    handleImageUpload,
    handlePingMember,
    handleCallPlayers,
    handleCancelEvent
  };
};
