
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GroupsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const GroupsHeader = ({ searchQuery, onSearchChange }: GroupsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search groups..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Create Group
      </Button>
    </div>
  );
};

export default GroupsHeader;
