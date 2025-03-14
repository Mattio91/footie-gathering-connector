
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import EventFormStep1 from './EventFormStep1';
import EventFormStep2 from './EventFormStep2';
import { useTranslation } from 'react-i18next';

interface Group {
  id: string;
  name: string;
}

const CreateEventForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    title: '',
    location: {
      address: '',
      lat: 0,
      lng: 0
    },
    time: '',
    duration: '90',
    format: '6v6',
    maxPlayers: 12,
    price: '',
    visibility: 'public',
    occurrence: 'once',
    images: [] as File[],
    groups: [] as Group[],
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelect = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLocationChange = (location: { address: string; lat: number; lng: number }) => {
    setFormData(prev => ({ ...prev, location }));
  };
  
  const handleImagesChange = (images: File[]) => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ...images] }));
  };

  const handleGroupsChange = (groups: Group[]) => {
    setFormData(prev => ({ ...prev, groups }));
  };
  
  const handleNext = () => {
    setStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If no groups are selected, create a default "Event Group"
    const finalGroups = formData.groups.length === 0 
      ? [{ id: `default-${Date.now()}`, name: `Event Group` }] 
      : formData.groups;
    
    // In a real app, you would submit the form data to an API
    console.log('Form submitted:', { ...formData, date, groups: finalGroups });
    
    // Show a success message
    toast.success(t('createEvent.eventCreated'));
    
    // Navigate to the event page (in a real app, you would navigate to the newly created event)
    navigate('/');
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl">{t('createEvent.title')}</CardTitle>
        <CardDescription>
          {t('createEvent.subtitle')}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <EventFormStep1 
              formData={formData}
              date={date}
              setDate={setDate}
              handleChange={handleChange}
              handleSelect={handleSelect}
            />
          )}
          
          {step === 2 && (
            <EventFormStep2
              formData={formData}
              handleLocationChange={handleLocationChange}
              handleSelect={handleSelect}
              handleGroupsChange={handleGroupsChange}
              handleChange={handleChange}
            />
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
            {t('common.back')}
          </Button>
        )}
        {step === 1 && <div />}
        
        {step < 2 ? (
          <Button
            type="button"
            onClick={handleNext}
            disabled={!formData.title || !date || !formData.time}
          >
            {t('common.continue')}
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!formData.location.address}
          >
            {t('common.createEvent')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CreateEventForm;
