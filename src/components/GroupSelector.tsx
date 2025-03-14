
import { useState } from 'react';
import { Plus, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface Group {
  id: string;
  name: string;
}

interface GroupSelectorProps {
  selectedGroups: Group[];
  onGroupsChange: (groups: Group[]) => void;
}

const GroupSelector = ({ selectedGroups, onGroupsChange }: GroupSelectorProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [myGroups] = useState<Group[]>([
    { id: '1', name: 'Sunday League' },
    { id: '2', name: 'Work Team' },
    { id: '3', name: 'Neighborhood Crew' },
  ]);
  
  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = { 
        id: `group-${Date.now()}`, 
        name: newGroupName.trim() 
      };
      onGroupsChange([...selectedGroups, newGroup]);
      setNewGroupName('');
      setIsDialogOpen(false);
    }
  };
  
  const toggleGroupSelection = (group: Group) => {
    const isSelected = selectedGroups.some(g => g.id === group.id);
    
    if (isSelected) {
      onGroupsChange(selectedGroups.filter(g => g.id !== group.id));
    } else {
      onGroupsChange([...selectedGroups, group]);
    }
  };
  
  const removeGroup = (groupId: string) => {
    onGroupsChange(selectedGroups.filter(g => g.id !== groupId));
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">Assign to Groups</div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" /> Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Group</DialogTitle>
              <DialogDescription>
                Create a new group to organize your football events and players.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="group-name" className="text-sm font-medium">
                  Group Name
                </label>
                <Input
                  id="group-name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="e.g., Weekend Warriors"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateGroup} 
                disabled={!newGroupName.trim()}
              >
                Create Group
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {selectedGroups.map(group => (
          <Badge key={group.id} variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {group.name}
            <button 
              onClick={() => removeGroup(group.id)}
              className="ml-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {selectedGroups.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No groups selected. A default group will be created for this event.
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {myGroups.map(group => (
          <Button
            key={group.id}
            variant={selectedGroups.some(g => g.id === group.id) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleGroupSelection(group)}
            className="justify-start"
          >
            <Users className="h-4 w-4 mr-2" />
            {group.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GroupSelector;
