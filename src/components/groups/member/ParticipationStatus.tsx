
import { Bell, Check, HelpCircle, UserX } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { GroupMember } from '@/types/group';

interface ParticipationStatusProps {
  status?: GroupMember['participationStatus'];
  memberId: string;
  onPingMember?: (memberId: string) => void;
}

const ParticipationStatus = ({ status, memberId, onPingMember }: ParticipationStatusProps) => {
  // Display appropriate status badge based on participation status
  switch(status) {
    case 'joined':
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200 rounded-full px-2.5 py-0.5 flex items-center gap-1 ml-2">
                <Check className="h-3 w-3" />
                <span className="text-xs">Joined</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Joining this event</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case 'tentative':
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200 rounded-full px-2.5 py-0.5 flex items-center gap-1 ml-2">
                <HelpCircle className="h-3 w-3" />
                <span className="text-xs">Maybe</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tentatively joining</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case 'skipping':
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="bg-red-100 text-red-800 border border-red-300 hover:bg-red-200 rounded-full px-2.5 py-0.5 flex items-center gap-1 ml-2">
                <UserX className="h-3 w-3" />
                <span className="text-xs">No</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Not participating</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case 'none':
    default:
      // Only show notification button if member has no status and onPingMember is provided
      return onPingMember ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 rounded-full ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                onClick={() => onPingMember(memberId)}
              >
                <Bell className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ping member</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200 rounded-full px-2.5 py-0.5 flex items-center gap-1 ml-2">
                <span className="text-xs">No status</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>No participation status set</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
  }
};

export default ParticipationStatus;
