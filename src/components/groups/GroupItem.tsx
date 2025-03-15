
import { Badge } from '@/components/ui/badge';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Users } from 'lucide-react';
import { Group } from '@/types/group';
import GroupMemberItem from './GroupMemberItem';

interface GroupItemProps {
  group: Group;
  isExpanded: boolean;
  onToggle: (groupId: string) => void;
}

const GroupItem = ({ group, isExpanded, onToggle }: GroupItemProps) => {
  return (
    <Collapsible className="border rounded-md p-2">
      <div className="flex items-center justify-between">
        <CollapsibleTrigger 
          onClick={() => onToggle(group.id)}
          className="flex items-center w-full text-left"
        >
          {isExpanded ? 
            <ChevronDown className="h-4 w-4 mr-1" /> : 
            <ChevronRight className="h-4 w-4 mr-1" />
          }
          <Badge variant="secondary" className="flex items-center gap-1 mr-2">
            <Users className="h-3 w-3" />
            {group.name}
          </Badge>
          <span className="text-xs text-muted-foreground">
            ({group.memberCount} members)
          </span>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="mt-2 pl-6">
        {group.members ? (
          <div className="space-y-2">
            {group.members.map(member => (
              <GroupMemberItem 
                key={member.id} 
                member={member}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No member details available</p>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default GroupItem;
