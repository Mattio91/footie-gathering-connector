
import { DollarSign, Lock, LockOpen, Users } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import OpenStreetMapPicker from './OpenStreetMapPicker';
import GroupSelector from './GroupSelector';
import { useTranslation } from 'react-i18next';

interface Group {
  id: string;
  name: string;
}

interface EventFormStep2Props {
  formData: {
    location: {
      address: string;
      lat: number;
      lng: number;
    };
    price: string;
    visibility: string;
    groups: Group[];
  };
  handleLocationChange: (location: { address: string; lat: number; lng: number }) => void;
  handleSelect: (name: string, value: string) => void;
  handleGroupsChange: (groups: Group[]) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventFormStep2 = ({ 
  formData, 
  handleLocationChange, 
  handleSelect, 
  handleGroupsChange,
  handleChange
}: EventFormStep2Props) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="space-y-3">
        <Label className="input-label">{t('common.location')}</Label>
        <OpenStreetMapPicker 
          onLocationSelect={handleLocationChange}
          initialLocation={formData.location.address}
        />
      </div>
      
      <div className="space-y-3">
        <GroupSelector 
          selectedGroups={formData.groups}
          onGroupsChange={handleGroupsChange}
        />
      </div>
      
      <div className="space-y-4 pt-2">
        <Label className="input-label">{t('createEvent.whoCanJoin')}</Label>
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
              <span className="font-medium">{t('createEvent.public')}</span>
              <span className="text-xs text-muted-foreground text-center">
                {t('createEvent.publicDesc')}
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
              <span className="font-medium">{t('createEvent.inviteOnly')}</span>
              <span className="text-xs text-muted-foreground text-center">
                {t('createEvent.inviteDesc')}
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
              <span className="font-medium">{t('createEvent.groupOnly')}</span>
              <span className="text-xs text-muted-foreground text-center">
                {t('createEvent.groupDesc')}
              </span>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="price" className="input-label">
          {t('createEvent.pricePerPlayer')}
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
            placeholder={t('createEvent.pricePlaceholder')}
            className="pl-10"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {t('createEvent.priceHelp')}
        </p>
      </div>
    </div>
  );
};

export default EventFormStep2;
