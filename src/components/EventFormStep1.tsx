
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Flag, Repeat, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="space-y-3">
        <Label htmlFor="title" className="input-label">{t('createEvent.eventTitle')}</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder={t('createEvent.titlePlaceholder')}
          required
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="date" className="input-label">{t('common.date')}</Label>
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
              {date ? format(date, "PPP") : <span>{t('createEvent.selectDate')}</span>}
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
        <Label htmlFor="occurrence" className="input-label">{t('createEvent.occurrence')}</Label>
        <div className="relative">
          <Repeat className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Select 
            value={formData.occurrence} 
            onValueChange={(value) => handleSelect('occurrence', value)}
          >
            <SelectTrigger className="pl-10">
              <SelectValue placeholder={t('createEvent.howOften')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="once">{t('createEvent.oneTime')}</SelectItem>
              <SelectItem value="weekly">{t('createEvent.weekly')}</SelectItem>
              <SelectItem value="biweekly">{t('createEvent.biweekly')}</SelectItem>
              <SelectItem value="monthly">{t('createEvent.monthly')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="time" className="input-label">{t('createEvent.startTime')}</Label>
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
          <Label htmlFor="duration" className="input-label">{t('createEvent.durationMinutes')}</Label>
          <Select 
            value={formData.duration} 
            onValueChange={(value) => handleSelect('duration', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('common.duration')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="60">{t('createEvent.minutes60')}</SelectItem>
              <SelectItem value="90">{t('createEvent.minutes90')}</SelectItem>
              <SelectItem value="120">{t('createEvent.minutes120')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="format" className="input-label">{t('common.format')}</Label>
          <div className="relative">
            <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Select 
              value={formData.format} 
              onValueChange={(value) => handleSelect('format', value)}
            >
              <SelectTrigger className="pl-10">
                <SelectValue placeholder={t('common.format')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5v5">{t('createEvent.format5v5')}</SelectItem>
                <SelectItem value="6v6">{t('createEvent.format6v6')}</SelectItem>
                <SelectItem value="7v7">{t('createEvent.format7v7')}</SelectItem>
                <SelectItem value="11v11">{t('createEvent.format11v11')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="maxPlayers" className="input-label">{t('createEvent.maxPlayers')}</Label>
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
