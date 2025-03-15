
import { Badge } from '@/components/ui/badge';
import { GroupMember } from '@/types/group';
import { Crown, Shield, UserCheck, UserCog, Mail, Bell, UserX, HelpCircle, Check } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';

interface GroupMemberItemProps {
  member: GroupMember;
  onPingMember?: (memberId: string) => void;
}

const GroupMemberItem = ({ member, onPingMember }: GroupMemberItemProps) => {
  const getRoleBadge = () => {
    switch(member.role) {
      case 'Admin':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="bg-red-600 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Admin</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'Co-Admin':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="bg-orange-600 flex items-center gap-1">
                  <UserCog className="h-3 w-3" />
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Co-Admin</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'Founder':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="bg-yellow-600 flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Founder</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'Member':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="bg-blue-600 flex items-center gap-1">
                  <UserCheck className="h-3 w-3" />
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Member</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'New':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="bg-green-600 flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>New</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      default:
        return null;
    }
  };

  const getParticipationStatus = () => {
    switch(member.participationStatus) {
      case 'joined':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 flex items-center gap-1 ml-2">
                  <Check className="h-3 w-3" />
                  <span className="text-xs">Joined</span>
                </Badge>
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
              <TooltipTrigger asChild>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200 flex items-center gap-1 ml-2">
                  <HelpCircle className="h-3 w-3" />
                  <span className="text-xs">Maybe</span>
                </Badge>
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
              <TooltipTrigger asChild>
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 hover:bg-red-200 flex items-center gap-1 ml-2">
                  <UserX className="h-3 w-3" />
                  <span className="text-xs">No</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Not participating</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'none':
      default:
        return onPingMember ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 rounded-full ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  onClick={() => onPingMember(member.id)}
                >
                  <Bell className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ping member</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full overflow-hidden">
          <img 
            src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}`} 
            alt={member.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-sm">{member.name}</span>
      </div>
      
      <div className="flex items-center">
        {getRoleBadge()}
        {getParticipationStatus()}
      </div>
    </div>
  );
};

export default GroupMemberItem;
