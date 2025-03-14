
import { useState } from 'react';
import { MapPin, Image, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FieldLocationProps {
  onLocationChange: (location: string) => void;
  onImagesChange: (images: File[]) => void;
}

const FieldLocation = ({ onLocationChange, onImagesChange }: FieldLocationProps) => {
  const [location, setLocation] = useState('');
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [recentLocations] = useState([
    'Hackney Marshes, London',
    'Regent\'s Park, London',
    'Victoria Park, London',
    'Wormwood Scrubs, London',
  ]);

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    onLocationChange(newLocation);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Preview the images
      const newImageUrls = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviewUrls([...imagePreviewUrls, ...newImageUrls]);
      
      // Pass the files to parent component
      onImagesChange(filesArray);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-3">
        <Label htmlFor="location" className="input-label">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="location"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            placeholder="Enter field location"
            className="pl-10"
          />
        </div>
        
        {/* Recent locations */}
        {recentLocations.length > 0 && location === '' && (
          <div className="mt-3">
            <p className="text-sm text-muted-foreground mb-2">Recent locations:</p>
            <div className="flex flex-wrap gap-2">
              {recentLocations.map((loc) => (
                <Button
                  key={loc}
                  variant="outline"
                  size="sm"
                  onClick={() => handleLocationChange(loc)}
                  className="rounded-full text-xs"
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  {loc}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Field images upload */}
      <div className="space-y-3">
        <Label className="input-label">Field Images</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Image previews */}
          {imagePreviewUrls.map((url, index) => (
            <div 
              key={index}
              className="relative aspect-square rounded-md overflow-hidden border border-border bg-muted/30"
            >
              <img 
                src={url} 
                alt={`Field preview ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {/* Upload button */}
          <label 
            className="aspect-square flex flex-col items-center justify-center rounded-md border border-dashed border-border bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <Input 
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <Plus className="h-6 w-6 text-muted-foreground mb-2" />
            <span className="text-xs text-muted-foreground text-center px-2">Add images</span>
          </label>
        </div>
        <p className="text-xs text-muted-foreground">
          Upload images of the football field to help players recognize the location.
        </p>
      </div>
    </div>
  );
};

export default FieldLocation;
