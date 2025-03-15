
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
          avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
        }
      ]);
      toast({
        title: "Joined Event",
        description: "You have been added to the reserve list.",
      });
    }
    setIsJoined(!isJoined);
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
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
      }
    ]);
    
    setIsJoined(true);
    
    toast({
      title: "Tentatively Joined",
      description: "You've been added as a tentative player. Please confirm later.",
    });
  };
  
  // Handle add friend
  const handleAddFriend = (name: string) => {
    // Generate a random ID for the friend
    const friendId = `friend-${Date.now()}`;
    
    // Add the friend to the players list as an unconfirmed player (reserve)
    const newPlayer = {
      id: friendId,
      name: name,
      isConfirmed: false,
      isAdmin: false,
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

  return {
    handleJoinEvent,
    handleTentativeJoin,
    handleAddFriend,
    handleSendMessage,
    handleImageUpload
  };
};
