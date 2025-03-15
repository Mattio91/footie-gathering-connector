import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, UserCog } from 'lucide-react';
import { GroupMember } from '@/types/group';

interface GroupMemberItemProps {
  member: GroupMember;
  groupId: string;
  onRoleChange: (groupId: string, memberId: string, role: string) => void;
}

const GroupMemberItem = ({ member, groupId, onRoleChange }: GroupMemberItemProps) => {
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
        
        {member.role === 'Host' && (
          <Badge className="bg-green-600">Host</Badge>
        )}
        {member.role === 'Admin' && (
          <Badge className="bg-blue-600">Admin</Badge>
        )}
      </div>
      
      <Select 
        defaultValue={member.role}
        onValueChange={(value) => onRoleChange(groupId, member.id, value)}
      >
        <SelectTrigger className="w-28 h-8">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Host">
            <div className="flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Host
            </div>
          </SelectItem>
          <SelectItem value="Admin">
            <div className="flex items-center">
              <UserCog className="h-3 w-3 mr-1" />
              Admin
            </div>
          </SelectItem>
          <SelectItem value="Member">Member</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default GroupMemberItem;
