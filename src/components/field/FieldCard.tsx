
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field } from '@/types/field';

interface FieldCardProps {
  field: Field;
}

const FieldCard: React.FC<FieldCardProps> = ({ field }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={field.images[0]?.url || '/placeholder.svg'} 
          alt={field.images[0]?.alt || field.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{field.name}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{field.location}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {field.description || 'No description available.'}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{field.events.length} {field.events.length === 1 ? 'event' : 'events'}</span>
        </div>
        <Link 
          to={`/fields/${field.id}`} 
          className="text-sm font-medium text-primary hover:underline"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FieldCard;
