
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AddFriendFormProps {
  onAddFriend: (name: string) => void;
}

const AddFriendForm = ({ onAddFriend }: AddFriendFormProps) => {
  const { t } = useTranslation();
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
        placeholder={t('event.friendName')}
        className="flex-grow"
      />
      <Button 
        size="sm" 
        onClick={handleAddFriend} 
        disabled={!friendName.trim()}
      >
        <UserPlus className="h-4 w-4 mr-1" />
        {t('event.add')}
      </Button>
    </div>
  );
};

export default AddFriendForm;
