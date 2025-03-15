
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizontal, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GroupInviteForm = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSendInvite = () => {
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send an actual invitation
    toast({
      title: "Invitation sent",
      description: `Invite sent to ${email}`,
    });
    setEmail('');
  };

  return (
    <div className="border-t pt-4">
      <div className="flex items-center gap-2 mb-2">
        <UserPlus className="h-4 w-4" />
        <span className="text-sm font-medium">Invite People</span>
      </div>
      
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="friend@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow"
        />
        <Button size="sm" onClick={handleSendInvite}>
          <SendHorizontal className="h-4 w-4 mr-1" />
          Send
        </Button>
      </div>
    </div>
  );
};

export default GroupInviteForm;
