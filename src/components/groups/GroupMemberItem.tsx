
import { Badge } from '@/components/ui/badge';
import { GroupMember } from '@/types/group';
import { Crown, Shield, UserCheck, UserCog, Mail } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GroupMemberItemProps {
  member: GroupMember;
}

const GroupMemberItem = ({ member }: GroupMemberItemProps) => {
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
      
      {getRoleBadge()}
    </div>
  );
};

export default GroupMemberItem;
