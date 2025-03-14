
import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddFriendFormProps {
  onAddFriend: (name: string) => void;
}

const AddFriendForm = ({ onAddFriend }: AddFriendFormProps) => {
  const [friendName, setFriendName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (friendName.trim()) {
      onAddFriend(friendName.trim());
      setFriendName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mt-4">
      <Input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        placeholder="Enter friend's name"
        className="flex-grow"
      />
      <Button type="submit" disabled={!friendName.trim()}>
        <UserPlus className="h-4 w-4 mr-2" />
        Add Friend
      </Button>
    </form>
  );
};

export default AddFriendForm;
