
import { useToast } from '@/hooks/use-toast';
import { ChatMessage } from '@/types/event';

interface EventManagementProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const useEventManagement = ({
  messages,
  setMessages
}: EventManagementProps) => {
  const { toast } = useToast();
  
  // Handle call to free players
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
  
  // Handle cancel event
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
    handleCallPlayers,
    handleCancelEvent
  };
};
