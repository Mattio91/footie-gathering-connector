
import { Player } from '@/types/player';
import { ChatMessage } from '@/types/event';
import { useEventParticipation } from './useEventParticipation';
import { useEventSocial } from './useEventSocial';
import { useEventManagement } from './useEventManagement';
import { useEventMedia } from './useEventMedia';

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

export const useEventActions = (props: EventActionsProps) => {
  // Participation hooks (join, tentative, skip)
  const participationActions = useEventParticipation(props);
  
  // Social hooks (messaging, friends, pinging)
  const socialActions = useEventSocial(props);
  
  // Management hooks (call players, cancel event)
  const managementActions = useEventManagement(props);
  
  // Media hooks (image upload)
  const mediaActions = useEventMedia(props);

  return {
    ...participationActions,
    ...socialActions,
    ...managementActions,
    ...mediaActions
  };
};

export * from './useEventParticipation';
export * from './useEventSocial';
export * from './useEventManagement';
export * from './useEventMedia';
