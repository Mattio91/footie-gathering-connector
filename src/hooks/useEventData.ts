
import { EventData } from '@/types/event';
import { useEventState } from '@/hooks/useEventState';
import { useEventActions } from '@/hooks/useEventActions';

export const useEventData = (eventId: string) => {
  // Get state from useEventState
  const {
    isLoading,
    error,
    event,
    players,
    setPlayers,
    isJoined,
    setIsJoined,
    currentImages,
    setCurrentImages,
    messages,
    setMessages
  } = useEventState(eventId);

  // Get actions from useEventActions
  const {
    handleJoinEvent,
    handleAddFriend,
    handleSendMessage,
    handleImageUpload,
    handleUpdateMemberRole
  } = useEventActions({
    players,
    setPlayers,
    isJoined,
    setIsJoined,
    currentImages,
    setCurrentImages,
    messages,
    setMessages
  });

  return {
    event: event as EventData, // Type assertion since it's null initially but we handle that in the component
    players,
    isJoined,
    currentImages,
    messages,
    isLoading,
    error,
    handleJoinEvent,
    handleAddFriend,
    handleSendMessage,
    handleImageUpload,
    handleUpdateMemberRole
  };
};
