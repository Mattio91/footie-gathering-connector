
import { useEventData } from '@/hooks/useEventData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import EventsSection from '@/components/home/EventsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';

const Index = () => {
  const { 
    isLoaded,
    searchQuery, 
    filteredEvents, 
    featuredEvents, 
    tableEvents, 
    handleSearch 
  } = useEventData();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <EventsSection 
        filteredEvents={filteredEvents}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        featuredEvents={featuredEvents}
        tableEvents={tableEvents}
      />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default Index;
