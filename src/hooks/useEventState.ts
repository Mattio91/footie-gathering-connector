
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { EventData, ChatMessage } from '@/types/event';
import { Player } from '@/types/player';
import { getMockEvent, getMockPlayers, getMockMessages, mockImages } from '@/data/mockEventData';

export const useEventState = (eventId: string) => {
  const { toast } = useToast();
  
  // States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<EventData | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [tentativePlayers, setTentativePlayers] = useState<Player[]>([]);
  const [isJoined, setIsJoined] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Fetch event data
  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if event ID is valid (in a real app, this would be an API check)
        if (!eventId || eventId === 'undefined') {
          throw new Error('Invalid event ID');
        }
        
        // For demo purposes: randomly fail 10% of the time to show error state
        if (Math.random() < 0.1) {
          throw new Error('Failed to load event data');
        }
        
        // Set mock data
        setEvent(getMockEvent(eventId));
        setCurrentImages(mockImages);
        setPlayers(getMockPlayers());
        setTentativePlayers([]);
        setMessages(getMockMessages());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : 'Failed to load event data',
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [eventId, toast]);

  return {
    isLoading,
    error,
    event,
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
  };
};
