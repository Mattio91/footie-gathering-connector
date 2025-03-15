
import { Badge } from '@/components/ui/badge';
import { Crown, Shield, UserCheck, UserCog, Mail } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GroupMember } from '@/types/group';

interface RoleBadgeProps {
  role: GroupMember['role'];
}

const RoleBadge = ({ role }: RoleBadgeProps) => {
  switch(role) {
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

export default RoleBadge;
