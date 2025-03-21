
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, MapPin, Calendar, Globe, Lock, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventsTable from '@/components/home/EventsTable';
import { mockGroups } from '@/data/mockGroupsData';
import { getMockEvent } from '@/data/mockEventData';
import { Group } from '@/types/group';
import { EventWithParticipation } from '@/types/event-instance';
import { addDays, format } from 'date-fns';

const GroupDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const [events, setEvents] = useState<EventWithParticipation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Find the group by ID
    const foundGroup = mockGroups.find(g => g.id === id);
    
    if (foundGroup) {
      setGroup(foundGroup);
      
      // Create mock events for this group
      const mockEventsForGroup = Array.from({ length: 3 }, (_, i) => {
        const baseEvent = getMockEvent(`group-event-${i}`);
        const eventDate = addDays(new Date(), i + 1);
        
        return {
          ...baseEvent,
          id: `group-event-${foundGroup.id}-${i}`,
          title: `${foundGroup.name} Match ${i + 1}`,
          instanceDate: eventDate,
          date: eventDate,
          location: foundGroup.city,
          playerCount: Math.floor(Math.random() * foundGroup.memberCount),
          maxPlayers: 10 + Math.floor(Math.random() * 10),
          participationStatus: Math.random() > 0.5 ? 'joined' : 'none',
        };
      });
      
      setEvents(mockEventsForGroup);
    } else {
      setError('Group not found');
    }
    
    setIsLoading(false);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="text-center py-12">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !group) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p className="text-muted-foreground">{error || 'Group not found'}</p>
            <Button className="mt-4" asChild>
              <Link to="/groups">Back to Groups</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/groups">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Groups
            </Link>
          </Button>
        </div>
        
        {/* Group header */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div 
            className="h-56 bg-cover bg-center"
            style={{ backgroundImage: `url(${group.image || 'https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-3xl font-bold">{group.name}</h1>
              {group.isPrivate ? (
                <Badge variant="outline" className="flex items-center gap-1 border-white text-white">
                  <Lock className="h-3 w-3" />
                  Private
                </Badge>
              ) : (
                <Badge variant="outline" className="flex items-center gap-1 border-white text-white">
                  <Globe className="h-3 w-3" />
                  Public
                </Badge>
              )}
            </div>
            
            <div className="flex items-center text-gray-200 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              {group.city}
            </div>
            
            <div className="flex items-center gap-3">
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Join Group
              </Button>
              
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Share
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* About the group */}
            <div className="bg-card rounded-lg border p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-muted-foreground">{group.description}</p>
            </div>
            
            {/* Upcoming events */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 mr-2" />
                <h2 className="text-xl font-semibold">Upcoming Events</h2>
              </div>
              
              {events.length > 0 ? (
                <EventsTable 
                  events={events} 
                  currentPage={currentPage} 
                  pageSize={5} 
                  onPageChange={setCurrentPage} 
                />
              ) : (
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No upcoming events</p>
                  
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div>
            {/* Members */}
            <div className="bg-card rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <h2 className="text-xl font-semibold">Members</h2>
                </div>
                <Badge variant="secondary">{group.memberCount}</Badge>
              </div>
              
              {group.members && group.members.length > 0 ? (
                <div className="space-y-4">
                  {group.members.map(member => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          {member.avatar ? (
                            <img 
                              src={member.avatar} 
                              alt={member.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                              {member.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {group.memberCount > (group.members?.length || 0) && (
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      View All Members
                    </Button>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground text-center">No member data available</p>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GroupDetail;
