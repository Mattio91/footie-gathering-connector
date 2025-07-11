
import React from 'react';
import { Landmark } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FieldCard from '@/components/field/FieldCard';
import FieldsMap from '@/components/field/FieldsMap';
import { mockFields } from '@/data/mockFieldsData';
import { useTranslation } from 'react-i18next';
import '@/styles/leaflet.css'; // Import Leaflet CSS

const Fields = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        {/* Map of all fields */}
        <FieldsMap fields={mockFields} />
        
        {mockFields.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Landmark className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Fields Available</h2>
            <p className="text-muted-foreground max-w-md">
              There are no football fields available at the moment. Check back later or contact us to add a new field.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {mockFields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Fields;
