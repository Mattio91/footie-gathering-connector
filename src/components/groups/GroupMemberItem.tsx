
import { Badge } from '@/components/ui/badge';
import { GroupMember } from '@/types/group';
import { Crown, Shield, UserCheck, UserCog, Mail } from 'lucide-react';

interface GroupMemberItemProps {
  member: GroupMember;
}

const GroupMemberItem = ({ member }: GroupMemberItemProps) => {
  const getRoleBadge = () => {
    switch(member.role) {
      case 'Admin':
        return (
          <Badge className="bg-red-600 flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Admin
          </Badge>
        );
      case 'Co-Admin':
        return (
          <Badge className="bg-orange-600 flex items-center gap-1">
            <UserCog className="h-3 w-3" />
            Co-Admin
          </Badge>
        );
      case 'Founder':
        return (
          <Badge className="bg-yellow-600 flex items-center gap-1">
            <Crown className="h-3 w-3" />
            Founder
          </Badge>
        );
      case 'Member':
        return (
          <Badge className="bg-blue-600 flex items-center gap-1">
            <UserCheck className="h-3 w-3" />
            Member
          </Badge>
        );
      case 'New':
        return (
          <Badge className="bg-green-600 flex items-center gap-1">
            <Mail className="h-3 w-3" />
            New
          </Badge>
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
