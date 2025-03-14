
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreateEventForm from "@/components/CreateEventForm";
import { useTranslation } from "react-i18next";

const CreateEvent = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{t('createEvent.title')} | PitchMatch</title>
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t('createEvent.title')}</h1>
          <p className="text-muted-foreground">
            {t('createEvent.subtitle')}
          </p>
        </div>
        
        <CreateEventForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateEvent;
