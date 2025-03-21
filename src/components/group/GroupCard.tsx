
import { Link } from 'react-router-dom';
import { MapPin, Users, Lock, Globe } from 'lucide-react';
import { Group } from '@/types/group';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GroupCardProps {
  group: Group;
}

const GroupCard = ({ group }: GroupCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div 
        className="h-40 bg-cover bg-center border-b"
        style={{ backgroundImage: `url(${group.image || 'https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'})` }}
      ></div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{group.name}</h3>
          {group.isPrivate ? (
            <Badge variant="outline" className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Private
            </Badge>
          ) : (
            <Badge variant="outline" className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              Public
            </Badge>
          )}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          {group.city}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {group.description}
        </p>
        
        <div className="flex items-center text-sm">
          <Users className="h-4 w-4 mr-1.5" />
          <span>{group.memberCount} members</span>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 border-t">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/groups/${group.id}`}>View Group</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GroupCard;
