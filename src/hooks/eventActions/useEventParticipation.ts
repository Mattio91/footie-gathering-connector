
import { Player } from '@/types/player';
import { useToast } from '@/hooks/use-toast';
import { ChatMessage } from '@/types/event';

interface EventParticipationProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  tentativePlayers: Player[];
  setTentativePlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  isJoined: boolean;
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const useEventParticipation = ({
  players,
  setPlayers,
  tentativePlayers,
  setTentativePlayers,
  isJoined,
  setIsJoined,
  messages,
  setMessages
}: EventParticipationProps) => {
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
    
    toast({
      title: "Status Updated",
      description: "You've indicated that you can't participate in this event.",
    });
  };

  return {
    handleJoinEvent,
    handleTentativeJoin,
    handleSkipEvent
  };
};
