
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface EventMapProps {
  location: string;
  locationDetails?: string;
}

const EventMap = ({ location, locationDetails }: EventMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This is a placeholder for actual map implementation
    // In a real app, you would integrate with Google Maps, Mapbox, etc.
    if (mapRef.current) {
      const mapElement = mapRef.current;
      mapElement.innerHTML = '';
      
      // Create a placeholder map
      const mapPlaceholder = document.createElement('div');
      mapPlaceholder.className = 'h-full w-full bg-muted/30 rounded-xl flex items-center justify-center';
      
      // Map content
      const mapContent = document.createElement('div');
      mapContent.className = 'text-center p-3';
      
      // Map icon
      const mapIcon = document.createElement('div');
      mapIcon.className = 'mx-auto mb-2 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center';
      mapIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      `;
      
      const mapTitle = document.createElement('div');
      mapTitle.className = 'font-medium text-sm';
      mapTitle.textContent = location;
      
      const mapDetails = document.createElement('div');
      mapDetails.className = 'text-xs text-muted-foreground';
      mapDetails.textContent = locationDetails || 'Map integration will be added here';
      
      // Assemble the map placeholder
      mapContent.appendChild(mapIcon);
      mapContent.appendChild(mapTitle);
      mapContent.appendChild(mapDetails);
      mapPlaceholder.appendChild(mapContent);
      mapElement.appendChild(mapPlaceholder);
    }
  }, [location, locationDetails]);
  
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold flex items-center">
        <MapPin className="h-4 w-4 mr-1" />
        Location
      </h3>
      <div ref={mapRef} className="w-full h-40 rounded-xl overflow-hidden border border-border">
        {/* Map will be rendered here */}
      </div>
    </div>
  );
};

export default EventMap;
