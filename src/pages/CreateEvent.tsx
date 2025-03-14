
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreateEventForm from "@/components/CreateEventForm";

const CreateEvent = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Create Football Event | PitchMatch</title>
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create Football Event</h1>
          <p className="text-muted-foreground">
            Set up your football match and invite players to join.
          </p>
        </div>
        
        <CreateEventForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateEvent;
