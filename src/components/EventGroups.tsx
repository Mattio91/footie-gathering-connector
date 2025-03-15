
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { Group } from '@/types/group';
import GroupItem from './groups/GroupItem';
import GroupInviteForm from './groups/GroupInviteForm';
import GroupEmptyState from './groups/GroupEmptyState';

interface EventGroupsProps {
  groups: Group[];
}

const EventGroups = ({ groups }: EventGroupsProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center">
        <Users className="h-5 w-5 mr-2" />
        Groups
      </h3>

      <Card>
        <CardContent className="p-4">
          {groups.length > 0 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                {groups.map(group => (
                  <GroupItem 
                    key={group.id} 
                    group={group} 
                    isExpanded={expandedGroups[group.id] || false}
                    onToggle={toggleGroup}
                  />
                ))}
              </div>
              
              <GroupInviteForm />
            </div>
          ) : (
            <GroupEmptyState />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventGroups;
