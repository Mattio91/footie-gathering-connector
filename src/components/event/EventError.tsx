
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface EventErrorProps {
  error: string;
}

const EventError = ({ error }: EventErrorProps) => {
  return (
    <Alert variant="destructive" className="mb-8">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error}. Please try refreshing the page.
      </AlertDescription>
    </Alert>
  );
};

export default EventError;
