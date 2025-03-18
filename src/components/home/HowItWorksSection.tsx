
import { CalendarClock, Users, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HowItWorksSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-secondary/30 to-background">
      <div className="container max-w-6xl mx-auto">
        <h2 className="font-oswald text-4xl text-center uppercase tracking-tight mb-16">{t('index.howItWorks')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
              <CalendarClock className="h-8 w-8" />
            </div>
            <h3 className="font-oswald text-xl uppercase mb-3">{t('index.createOrJoin')}</h3>
            <p className="text-muted-foreground">
              {t('index.createOrJoinDesc')}
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="font-oswald text-xl uppercase mb-3">{t('index.findPlayers')}</h3>
            <p className="text-muted-foreground">
              {t('index.findPlayersDesc')}
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
              <MapPin className="h-8 w-8" />
            </div>
            <h3 className="font-oswald text-xl uppercase mb-3">{t('index.playFootball')}</h3>
            <p className="text-muted-foreground">
              {t('index.playFootballDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
