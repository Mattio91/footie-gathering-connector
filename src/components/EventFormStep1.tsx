
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Flag, Repeat, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EventFormStep1Props {
  formData: {
    title: string;
    time: string;
    duration: string;
    format: string;
    maxPlayers: number;
    occurrence: string;
  };
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (name: string, value: string) => void;
}

const EventFormStep1 = ({ 
  formData, 
  date, 
  setDate, 
  handleChange, 
  handleSelect 
}: EventFormStep1Props) => {
  return (
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
      
      <div className="space-y-3">
        <Label htmlFor="occurrence" className="input-label">Occurrence</Label>
        <div className="relative">
          <Repeat className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Select 
            value={formData.occurrence} 
            onValueChange={(value) => handleSelect('occurrence', value)}
          >
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="How often?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="once">One time only</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Every two weeks</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
  );
};

export default EventFormStep1;
