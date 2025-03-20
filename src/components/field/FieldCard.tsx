
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field } from '@/types/field';
import { Button } from '@/components/ui/button';
import { WeeklyEventCalendar } from './WeeklyEventCalendar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FieldCardProps {
  field: Field;
}

const FieldCard: React.FC<FieldCardProps> = ({ field }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  // Check if there are any events
  const hasEvents = field.events && field.events.length > 0;
  
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
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
            <div className="text-sm">
              <span className="font-medium">{field.events.length}</span> {field.events.length === 1 ? 'event' : 'events'} scheduled
            </div>
            
            {hasEvents && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <Calendar className="h-4 w-4" />
                <span>Event Schedule</span>
                {showCalendar ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            )}
          </CardFooter>
        </div>
      </div>
      
      {/* Collapsible Calendar */}
      {hasEvents && (
        <Collapsible open={showCalendar} onOpenChange={setShowCalendar}>
          <CollapsibleContent className="px-6 pb-6">
            <WeeklyEventCalendar events={field.events} />
          </CollapsibleContent>
        </Collapsible>
      )}
    </Card>
  );
};

export default FieldCard;
