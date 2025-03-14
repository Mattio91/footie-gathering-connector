
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users, UserPlus, SendHorizontal, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Group {
  id: string;
  name: string;
  memberCount: number;
}

interface EventGroupsProps {
  groups: Group[];
}

const EventGroups = ({ groups }: EventGroupsProps) => {
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center">
        <Users className="h-5 w-5 mr-2" />
        Groups
      </h3>

      <Card>
        <CardContent className="p-4">
          {groups.length > 0 ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {groups.map(group => (
                  <Badge key={group.id} variant="secondary" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {group.name} ({group.memberCount})
                  </Badge>
                ))}
              </div>
              
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
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <Users className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p>No groups associated with this event</p>
              <Button variant="outline" size="sm" className="mt-2">
                <Share2 className="h-4 w-4 mr-1" />
                Share with a group
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventGroups;
