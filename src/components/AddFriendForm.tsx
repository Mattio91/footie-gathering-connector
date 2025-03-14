
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';

interface AddFriendFormProps {
  onAddFriend: (name: string) => void;
}

const AddFriendForm = ({ onAddFriend }: AddFriendFormProps) => {
  const [friendName, setFriendName] = useState('');

  const handleAddFriend = () => {
    if (friendName.trim()) {
      onAddFriend(friendName.trim());
      setFriendName('');
    }
  };

  return (
    <div className="flex space-x-2">
      <Input
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        placeholder="Friend's name"
        className="flex-grow"
      />
      <Button 
        size="sm" 
        onClick={handleAddFriend} 
        disabled={!friendName.trim()}
      >
        <UserPlus className="h-4 w-4 mr-1" />
        Add
      </Button>
    </div>
  );
};

export default AddFriendForm;
