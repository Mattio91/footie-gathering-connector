
import { Button } from '@/components/ui/button';
import { Share2, Users } from 'lucide-react';

const GroupEmptyState = () => {
  return (
    <div className="text-center py-4 text-muted-foreground">
      <Users className="h-10 w-10 mx-auto mb-2 opacity-50" />
      <p>No groups associated with this event</p>
      <Button variant="outline" size="sm" className="mt-2">
        <Share2 className="h-4 w-4 mr-1" />
        Share with a group
      </Button>
    </div>
  );
};

export default GroupEmptyState;
