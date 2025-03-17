
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Flag, ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { mockFields } from '@/data/mockFieldsData';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Field = () => {
  const { id } = useParams<{ id: string }>();
  const field = mockFields.find(field => field.id === id);
  
  if (!field) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Field Not Found</h1>
          <p className="mb-8">The field you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/fields" 
            className="inline-flex items-center text-primary hover:underline"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Fields
          </Link>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <Link 
          to="/fields" 
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Fields
        </Link>
        
        {/* Field Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{field.name}</h1>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{field.location}</span>
          </div>
        </div>
        
        {/* Field Images */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field.images.map((image) => (
              <div key={image.id} className="rounded-lg overflow-hidden h-64">
                <img 
                  src={image.url} 
                  alt={image.alt || field.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Field Description */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">About this Field</h2>
          <p className="text-muted-foreground">{field.description}</p>
        </Card>
        
        {/* Field Events */}
        <Tabs defaultValue="upcoming" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Events at {field.name}</h2>
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            {field.events.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Upcoming Events</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                  There are no upcoming events scheduled at this field.
                </p>
                <Link 
                  to="/create-event" 
                  className="text-primary hover:underline"
                >
                  Create an Event
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {field.events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="past">
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Past Events</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                There are no past events for this field.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Field;
