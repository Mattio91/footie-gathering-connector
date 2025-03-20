
import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface OpenStreetMapDisplayProps {
  location: string;
  className?: string;
}

const OpenStreetMapDisplay = ({ location, className = '' }: OpenStreetMapDisplayProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    let mapInstance: any = null;
    
    // Import Leaflet dynamically
    import('leaflet').then((L) => {
      // Fix the icon paths issue
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });
      
      // Geocode the location string to get coordinates
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            
            // Initialize map with the location coordinates
            mapInstance = L.map(mapRef.current!).setView([parseFloat(lat), parseFloat(lon)], 15);
            
            // Add OpenStreetMap tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance);
            
            // Add a marker at the location
            const marker = L.marker([parseFloat(lat), parseFloat(lon)]);
            marker.addTo(mapInstance);
            
            // Add a popup with the location name
            marker.bindPopup(location).openPopup();
          } else {
            // If geocoding fails, show an error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'flex items-center justify-center h-full text-muted-foreground';
            errorMessage.textContent = 'Location could not be found on the map';
            mapRef.current!.appendChild(errorMessage);
          }
        })
        .catch(error => {
          console.error('Error loading map:', error);
          
          // Show error message
          const errorMessage = document.createElement('div');
          errorMessage.className = 'flex items-center justify-center h-full text-muted-foreground';
          errorMessage.textContent = 'Failed to load map';
          mapRef.current!.appendChild(errorMessage);
        });
    });
    
    // Cleanup function
    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [location]);
  
  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-md" />
      {!mapRef.current?.children.length && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-md">
          <div className="flex flex-col items-center text-muted-foreground">
            <MapPin className="h-8 w-8 mb-2" />
            <p>Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenStreetMapDisplay;
