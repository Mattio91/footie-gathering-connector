
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, Filter, Plus, MapPin, Clock, ArrowLeft, UserPlus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Mock data for groups
interface GroupProps {
  id: string;
  name: string;
  location: string;
  memberCount: number;
  maxMembers: number;
  description: string;
  isPrivate: boolean;
  lastActive: Date;
  image?: string;
}

const mockGroups: GroupProps[] = [
  {
    id: '1',
    name: 'London Weekday Warriors',
    location: 'Central London',
    memberCount: 24,
    maxMembers: 30,
    description: 'Regular after-work football games in central London parks.',
    isPrivate: false,
    lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
  },
  {
    id: '2',
    name: 'North London FC',
    location: 'North London',
    memberCount: 42,
    maxMembers: 50,
    description: 'Community football group organizing matches and training sessions in North London.',
    isPrivate: false,
    lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1473976345543-9ffc928e648d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: '3',
    name: 'East London 5-a-side',
    location: 'East London',
    memberCount: 18,
    maxMembers: 20,
    description: 'Regular 5-a-side matches in East London every weekend.',
    isPrivate: true,
    lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2093&q=80',
  },
  {
    id: '4',
    name: 'South London Veterans',
    location: 'South London',
    memberCount: 28,
    maxMembers: 40,
    description: 'Football group for players over 35 in South London area.',
    isPrivate: false,
    lastActive: new Date(),
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2029&q=80',
  },
  {
    id: '5',
    name: 'West London Futsal',
    location: 'West London',
    memberCount: 15,
    maxMembers: 25,
    description: 'Indoor futsal games in West London sports centers.',
    isPrivate: false,
    lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1499673610122-01c7122c5dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
  },
  {
    id: '6',
    name: 'Hackney Marshes Sunday League',
    location: 'Hackney, London',
    memberCount: 65,
    maxMembers: 100,
    description: 'Official Sunday league teams playing at Hackney Marshes.',
    isPrivate: false,
    lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80',
  },
];

const GroupCard = ({ group }: { group: GroupProps }) => {
  // Format date for "last active"
  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div 
        className="h-40 bg-cover bg-center border-b"
        style={{ backgroundImage: `url(${group.image || 'https://images.unsplash.com/photo-1508098682722-e99c643e7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'})` }}
      ></div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{group.name}</CardTitle>
          {group.isPrivate && (
            <Badge variant="outline" className="ml-2">Private</Badge>
          )}
        </div>
        <CardDescription className="flex items-center">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          {group.location}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {group.description}
        </p>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1.5 text-muted-foreground" />
            <span>
              {group.memberCount}/{group.maxMembers} members
            </span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>Active {formatLastActive(group.lastActive)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/group/${group.id}`}>View Group</Link>
        </Button>
        
        <Button size="sm">
          <UserPlus className="h-4 w-4 mr-2" />
          Join
        </Button>
      </CardFooter>
    </Card>
  );
};

const Groups = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter groups based on search query and active filter
  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (!matchesSearch) return false;
    
    switch (activeFilter) {
      case 'private':
        return group.isPrivate;
      case 'public':
        return !group.isPrivate;
      case 'active':
        // Groups active in the last 3 days
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        return group.lastActive >= threeDaysAgo;
      default:
        return true;
    }
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="flex items-center">
              <Link to="/" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-3xl font-oswald uppercase tracking-tight">
                {t('common.groups')}
              </h1>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0 gap-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </div>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-0">
              <CardTitle>{t('groups.findGroups')}</CardTitle>
              <CardDescription>{t('groups.searchAndFilterGroups')}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={t('groups.searchGroups')}
                    className="pl-10 pr-4 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button variant="outline" className="sm:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  {t('common.filter')}
                </Button>
              </div>
              
              <div className="mt-4">
                <Tabs defaultValue="all" onValueChange={setActiveFilter}>
                  <TabsList className="w-full sm:w-auto justify-start overflow-auto pb-1">
                    <TabsTrigger value="all">All Groups</TabsTrigger>
                    <TabsTrigger value="active">Recently Active</TabsTrigger>
                    <TabsTrigger value="public">Public</TabsTrigger>
                    <TabsTrigger value="private">Private</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>
          
          {filteredGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No groups found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Group
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Groups;
