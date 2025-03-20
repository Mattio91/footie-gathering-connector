
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Map as MapIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field } from '@/types/field';

interface FieldsMapProps {
  fields: Field[];
}

const FieldsMap: React.FC<FieldsMapProps> = ({ fields }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    let mapInstance: any = null;
    const markersRef: any[] = [];
    
    // Import Leaflet dynamically
    import('leaflet').then((L) => {
      // Fix the icon paths issue
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });
      
      // Initialize the map - center on Gdańsk, Poland
      mapInstance = L.map(mapRef.current!).setView([54.352, 18.6466], 12); // Coordinates for Gdańsk
      
      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);
      
      // Prepare bounds for auto-zoom
      const bounds = L.latLngBounds([]);
      let hasValidCoordinates = false;
      
      // Add markers for each field
      const geocodePromises = fields.map(field => {
        return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(field.location)}`)
          .then(response => response.json())
          .then(data => {
            if (data && data.length > 0) {
              const { lat, lon } = data[0];
              const position = [parseFloat(lat), parseFloat(lon)];
              
              // Create marker with popup
              const marker = L.marker(position as [number, number]);
              marker.addTo(mapInstance);
              markersRef.push(marker);
              
              // Add popup with field info and link
              const popupContent = document.createElement('div');
              popupContent.className = 'field-popup';
              popupContent.innerHTML = `
                <h3 class="font-semibold mb-1">${field.name}</h3>
                <p class="text-sm text-muted-foreground mb-2">${field.location}</p>
                <p class="text-sm mb-2">${field.events.length} event${field.events.length !== 1 ? 's' : ''} scheduled</p>
                <button class="text-sm text-primary hover:underline view-details-btn" data-field-id="${field.id}">View Details</button>
              `;
              
              // Create the popup and bind it
              const popup = L.popup().setContent(popupContent);
              marker.bindPopup(popup);
              
              // Extend bounds to include this marker
              bounds.extend(position as [number, number]);
              hasValidCoordinates = true;
            }
          })
          .catch(error => {
            console.error('Error geocoding location:', error);
          });
      });
      
      // Wait for all geocoding requests to complete
      Promise.all(geocodePromises)
        .then(() => {
          // Add click event listeners to all the "View Details" buttons
          document.addEventListener('click', function(e) {
            const target = e.target as HTMLElement;
            if (target && target.classList.contains('view-details-btn')) {
              const fieldId = target.getAttribute('data-field-id');
              if (fieldId) {
                navigate(`/fields/${fieldId}`);
              }
            }
          });
          
          // Fit map to bounds after adding all markers
          if (hasValidCoordinates) {
            mapInstance.fitBounds(bounds, { padding: [50, 50] });
          }
        });
    });
    
    // Cleanup function
    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [fields, navigate]);
  
  return (
    <Card className="overflow-hidden mb-8">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MapIcon className="h-5 w-5" />
          Football Fields Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div ref={mapRef} className="h-[400px] w-full rounded-md" />
          {!mapRef.current?.children.length && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-md">
              <div className="flex flex-col items-center text-muted-foreground">
                <MapPin className="h-8 w-8 mb-2" />
                <p>Loading map...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FieldsMap;

