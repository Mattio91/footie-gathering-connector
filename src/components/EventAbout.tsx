
import { useTranslation } from 'react-i18next';

interface EventAboutProps {
  description: string;
}

const EventAbout = ({ description }: EventAboutProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('event.aboutEvent')}</h3>
      <p className="text-muted-foreground whitespace-pre-line">
        {description}
      </p>
    </div>
  );
};

export default EventAbout;
