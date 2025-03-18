
import { CalendarClock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="pt-28 pb-14 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      
      <div className="container max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <span className="tag bg-primary/10 text-primary mb-4 animate-fade-in">
              <CalendarClock className="h-3 w-3 mr-1" />
              {t('index.heroSubtitle')}
            </span>
            
            <h1 className="font-oswald text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight mb-6 animate-fade-in leading-none" style={{ animationDelay: '150ms' }}>
              <span className="block">GATHER</span>
              <span className="text-emerald-500">to play</span>
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-md mb-10 animate-fade-in" style={{ animationDelay: '300ms' }}>
              {t('index.heroSubtitle')}
            </p>
          </div>
          
          <div className="hidden md:flex md:justify-center md:items-center">
            <div className="relative w-full max-w-md aspect-video bg-primary/5 rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 border-2 border-emerald-500/40 rounded-md relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-emerald-500/40"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-emerald-500/40"></div>
                  <div className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full border border-emerald-500/40 -translate-x-1/2 -translate-y-1/2"></div>
                  
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-1/5 border-r border-t border-b border-emerald-500/40"></div>
                  <div className="absolute right-0 top-1/4 bottom-1/4 w-1/5 border-l border-t border-b border-emerald-500/40"></div>
                  
                  <div className="absolute left-[15%] top-[30%] w-3 h-3 bg-team-home rounded-full"></div>
                  <div className="absolute left-[25%] top-[50%] w-3 h-3 bg-team-home rounded-full"></div>
                  <div className="absolute left-[15%] top-[70%] w-3 h-3 bg-team-home rounded-full"></div>
                  <div className="absolute left-[40%] top-[30%] w-3 h-3 bg-team-home rounded-full"></div>
                  <div className="absolute left-[40%] top-[70%] w-3 h-3 bg-team-home rounded-full"></div>
                  
                  <div className="absolute right-[15%] top-[30%] w-3 h-3 bg-team-away rounded-full"></div>
                  <div className="absolute right-[25%] top-[50%] w-3 h-3 bg-team-away rounded-full"></div>
                  <div className="absolute right-[15%] top-[70%] w-3 h-3 bg-team-away rounded-full"></div>
                  <div className="absolute right-[40%] top-[30%] w-3 h-3 bg-team-away rounded-full"></div>
                  <div className="absolute right-[40%] top-[70%] w-3 h-3 bg-team-away rounded-full"></div>
                  
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30,50 L60,30" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="1" fill="none" strokeDasharray="4 2" />
                    <polygon points="60,30 56,32 58,27" fill="rgba(34, 197, 94, 0.6)" />
                    
                    <path d="M30,50 L60,70" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="1" fill="none" strokeDasharray="4 2" />
                    <polygon points="60,70 56,68 58,73" fill="rgba(34, 197, 94, 0.6)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
