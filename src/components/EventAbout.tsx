
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info } from 'lucide-react';

interface EventAboutProps {
  description: string;
}

const EventAbout = ({ description }: EventAboutProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-8 w-8 rounded-full"
          >
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">{t('event.aboutEvent')}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" side="top">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">{t('event.aboutEvent')}</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {description}
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EventAbout;
