
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

interface AddFriendFormProps {
  onAddFriend: (name: string) => void;
  onClose?: () => void;
}

const AddFriendForm = ({ onAddFriend, onClose }: AddFriendFormProps) => {
  const { t } = useTranslation();
  const [friendName, setFriendName] = useState('');
  const { toast } = useToast();

  const handleAddFriend = () => {
    if (friendName.trim()) {
      // In a real app, this would link with the user's account friends
      onAddFriend(friendName.trim());
      setFriendName('');
      
      toast({
        title: t('event.friendAdded'),
        description: t('event.friendLinkedToAccount', { name: friendName.trim() }),
      });
      
      if (onClose) {
        onClose();
      }
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
