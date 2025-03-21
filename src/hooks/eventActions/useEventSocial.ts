
import { Player } from '@/types/player';
import { useToast } from '@/hooks/use-toast';
import { ChatMessage } from '@/types/event';

interface EventSocialProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const useEventSocial = ({
  players,
  setPlayers,
  messages,
  setMessages
}: EventSocialProps) => {
  const { toast } = useToast();
  
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

  return {
    handlePingMember,
    handleAddFriend,
    handleSendMessage
  };
};
