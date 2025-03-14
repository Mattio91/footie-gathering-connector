
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, Clock, Users, DollarSign, Lock, LockOpen, Flag } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import FieldLocation from './FieldLocation';

const CreateEventForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    time: '',
    duration: '90',
    format: '6v6',
    maxPlayers: 12,
    price: '',
    visibility: 'public',
    images: [] as File[],
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelect = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLocationChange = (location: string) => {
    setFormData(prev => ({ ...prev, location }));
  };
  
  const handleImagesChange = (images: File[]) => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ...images] }));
  };
  
  const handleNext = () => {
    setStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the form data to an API
    console.log('Form submitted:', { ...formData, date });
    // Navigate to the event page (in a real app, you would navigate to the newly created event)
    navigate('/');
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl">Create Football Event</CardTitle>
        <CardDescription>
          Set up a match and invite players to join your game.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6 animate-slide-up">
              <div className="space-y-3">
                <Label htmlFor="title" className="input-label">Event Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Saturday Morning Kickabout"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="date" className="input-label">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="time" className="input-label">Start Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="duration" className="input-label">Duration (mins)</Label>
                  <Select 
                    value={formData.duration} 
                    onValueChange={(value) => handleSelect('duration', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">120 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="format" className="input-label">Format</Label>
                  <div className="relative">
                    <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Select 
                      value={formData.format} 
                      onValueChange={(value) => handleSelect('format', value)}
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5v5">5-a-side</SelectItem>
                        <SelectItem value="6v6">6-a-side</SelectItem>
                        <SelectItem value="7v7">7-a-side</SelectItem>
                        <SelectItem value="11v11">11-a-side</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="maxPlayers" className="input-label">Max Players</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="maxPlayers"
                      name="maxPlayers"
                      type="number"
                      min={2}
                      value={formData.maxPlayers}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Location & Visibility */}
          {step === 2 && (
            <div className="space-y-6 animate-slide-up">
              <FieldLocation 
                onLocationChange={handleLocationChange}
                onImagesChange={handleImagesChange}
              />
              
              <div className="space-y-4 pt-2">
                <Label className="input-label">Visibility</Label>
                <RadioGroup 
                  value={formData.visibility}
                  onValueChange={(value) => handleSelect('visibility', value)}
                  className="grid grid-cols-1 md:grid-cols-3 gap-3"
                >
                  <div>
                    <RadioGroupItem
                      value="public"
                      id="public"
                      className="peer hidden"
                    />
                    <Label
                      htmlFor="public"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <LockOpen className="h-5 w-5 mb-2" />
                      <span className="font-medium">Public</span>
                      <span className="text-xs text-muted-foreground text-center">
                        Anyone can view and join
                      </span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem
                      value="invite"
                      id="invite"
                      className="peer hidden"
                    />
                    <Label
                      htmlFor="invite"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Lock className="h-5 w-5 mb-2" />
                      <span className="font-medium">Invite Only</span>
                      <span className="text-xs text-muted-foreground text-center">
                        Only players with a link
                      </span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem
                      value="group"
                      id="group"
                      className="peer hidden"
                    />
                    <Label
                      htmlFor="group"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Users className="h-5 w-5 mb-2" />
                      <span className="font-medium">Group Only</span>
                      <span className="text-xs text-muted-foreground text-center">
                        Only for your group
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="price" className="input-label">
                  Price per Player (optional)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min={0}
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Leave empty if the event is free.
                </p>
              </div>
            </div>
          )}
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t p-6">
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        {step === 1 && <div />}
        
        {step < 2 ? (
          <Button
            type="button"
            onClick={handleNext}
            disabled={!formData.title || !date || !formData.time}
          >
            Continue
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!formData.location}
          >
            Create Event
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CreateEventForm;
