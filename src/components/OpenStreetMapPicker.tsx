
import { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface OpenStreetMapPickerProps {
  onLocationSelect: (location: { address: string; lat: number; lng: number }) => void;
  initialLocation?: string;
}

const OpenStreetMapPicker = ({ onLocationSelect, initialLocation }: OpenStreetMapPickerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState(initialLocation || '');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{ address: string; lat: number; lng: number } | null>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !map) {
      // Import Leaflet dynamically
      import('leaflet').then((L) => {
        // Fix the icon paths issue
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });

        const mapInstance = L.map(mapRef.current).setView([51.505, -0.09], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);
        
        setMap(mapInstance);
        
        // Add click event to the map
        mapInstance.on('click', (e: any) => {
          const { lat, lng } = e.latlng;
          reverseGeocode(lat, lng);
        });
      });
    }
    
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [mapRef.current]);

  // Handle search
  const searchLocation = async () => {
    if (!searchTerm) return;
    
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  // Reverse geocode (get address from coordinates)
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      
      if (data.display_name) {
        updateMarker(lat, lng, data.display_name);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  };

  // Update marker and selected location
  const updateMarker = (lat: number, lng: number, address: string) => {
    if (map) {
      if (marker) {
        marker.remove();
      }
      
      import('leaflet').then((L) => {
        const newMarker = L.marker([lat, lng]).addTo(map);
        setMarker(newMarker);
        map.setView([lat, lng], 15);
        
        const location = { address, lat, lng };
        setSelectedLocation(location);
        onLocationSelect(location);
        setSearchTerm(address);
        setSearchResults([]);
      });
    }
  };

  // Handle result selection
  const handleSelectResult = (result: any) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    updateMarker(lat, lng, result.display_name);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for location"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-base text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            onKeyDown={(e) => e.key === 'Enter' && searchLocation()}
          />
          <button
            type="button"
            onClick={searchLocation}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs bg-primary text-primary-foreground rounded-md"
          >
            Search
          </button>
        </div>
        
        {searchResults.length > 0 && (
          <div className="absolute z-10 w-full max-h-60 overflow-y-auto bg-background border border-input rounded-md shadow-md">
            {searchResults.map((result) => (
              <div
                key={result.place_id}
                className="p-2 hover:bg-accent cursor-pointer border-b last:border-b-0"
                onClick={() => handleSelectResult(result)}
              >
                {result.display_name}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div ref={mapRef} className="h-64 rounded-md border border-input overflow-hidden" />
      
      {selectedLocation && (
        <div className="text-sm text-muted-foreground">
          Selected: {selectedLocation.address}
        </div>
      )}
    </div>
  );
};

export default OpenStreetMapPicker;
