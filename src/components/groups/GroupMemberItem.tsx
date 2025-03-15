
import { GroupMember } from '@/types/group';
import MemberAvatar from './member/MemberAvatar';
import RoleBadge from './member/RoleBadge';
import ParticipationStatus from './member/ParticipationStatus';

interface GroupMemberItemProps {
  member: GroupMember;
  onPingMember?: (memberId: string) => void;
}

const GroupMemberItem = ({ member, onPingMember }: GroupMemberItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MemberAvatar name={member.name} avatar={member.avatar} />
        <span className="text-sm">{member.name}</span>
      </div>
      
      <div className="flex items-center">
        <RoleBadge role={member.role} />
        <ParticipationStatus 
          status={member.participationStatus} 
          memberId={member.id}
          onPingMember={onPingMember}
        />
      </div>
    </div>
  );
};

export default GroupMemberItem;
