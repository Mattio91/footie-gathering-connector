
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  UserPlus, 
  SendHorizontal, 
  Share2, 
  ChevronDown, 
  ChevronRight, 
  Shield, 
  UserCog 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GroupMember {
  id: string;
  name: string;
  role: 'Host' | 'Admin' | 'Member';
  avatar?: string;
}

interface Group {
  id: string;
  name: string;
  memberCount: number;
  members?: GroupMember[];
}

interface EventGroupsProps {
  groups: Group[];
  onUpdateMemberRole?: (groupId: string, memberId: string, role: string) => void;
}

const EventGroups = ({ groups, onUpdateMemberRole }: EventGroupsProps) => {
  const [email, setEmail] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
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

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleRoleChange = (groupId: string, memberId: string, role: string) => {
    if (onUpdateMemberRole) {
      onUpdateMemberRole(groupId, memberId, role);
      
      toast({
        title: "Role updated",
        description: `Member role has been updated to ${role}`,
      });
    }
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
                  <Collapsible key={group.id} className="border rounded-md p-2">
                    <div className="flex items-center justify-between">
                      <CollapsibleTrigger 
                        onClick={() => toggleGroup(group.id)}
                        className="flex items-center w-full text-left"
                      >
                        {expandedGroups[group.id] ? 
                          <ChevronDown className="h-4 w-4 mr-1" /> : 
                          <ChevronRight className="h-4 w-4 mr-1" />
                        }
                        <Badge variant="secondary" className="flex items-center gap-1 mr-2">
                          <Users className="h-3 w-3" />
                          {group.name}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          ({group.memberCount} members)
                        </span>
                      </CollapsibleTrigger>
                    </div>
                    
                    <CollapsibleContent className="mt-2 pl-6">
                      {group.members ? (
                        <div className="space-y-2">
                          {group.members.map(member => (
                            <div key={member.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full overflow-hidden">
                                  <img 
                                    src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}`} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="text-sm">{member.name}</span>
                                
                                {member.role === 'Host' && (
                                  <Badge className="bg-green-600">Host</Badge>
                                )}
                                {member.role === 'Admin' && (
                                  <Badge className="bg-blue-600">Admin</Badge>
                                )}
                              </div>
                              
                              <Select 
                                defaultValue={member.role}
                                onValueChange={(value) => handleRoleChange(group.id, member.id, value)}
                              >
                                <SelectTrigger className="w-28 h-8">
                                  <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Host">
                                    <div className="flex items-center">
                                      <Shield className="h-3 w-3 mr-1" />
                                      Host
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="Admin">
                                    <div className="flex items-center">
                                      <UserCog className="h-3 w-3 mr-1" />
                                      Admin
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="Member">Member</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No member details available</p>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
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
