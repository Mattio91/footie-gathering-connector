
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field } from '@/types/field';
import { WeeklyEventCalendar } from './WeeklyEventCalendar';
import { Button } from '@/components/ui/button';

interface FieldCardProps {
  field: Field;
}

const FieldCard: React.FC<FieldCardProps> = ({ field }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow w-full mb-8">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-64 md:w-1/3 overflow-hidden">
          <img 
            src={field.images[0]?.url || '/placeholder.svg'} 
            alt={field.images[0]?.alt || field.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{field.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{field.location}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/fields/${field.id}`}>View Details</Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              {field.description || 'No description available.'}
            </p>
            
            {/* Only show calendar if there are events */}
            {field.events.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <h4 className="font-medium">Events Schedule</h4>
                </div>
                <WeeklyEventCalendar events={field.events} />
              </div>
            )}
            
            {/* Show a message if no events */}
            {field.events.length === 0 && (
              <div className="text-center py-4 bg-muted/10 rounded-md mb-4">
                <Calendar className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No events scheduled for this field</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
            <div className="text-sm">
              <span className="font-medium">{field.events.length}</span> {field.events.length === 1 ? 'event' : 'events'} scheduled
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default FieldCard;
