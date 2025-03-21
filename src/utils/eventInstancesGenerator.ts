
import { EventWithParticipation } from '@/types/event-instance';

// Generate mock event instances for an event
export const getEventInstances = (event: EventWithParticipation, count = 10): EventWithParticipation[] => {
  const instances: EventWithParticipation[] = [];
  const today = new Date();
  
  // Create instances in the past (historical)
  for (let i = 1; i <= Math.floor(count/2); i++) {
    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - (i * 7)); // Weekly in the past
    
    instances.push({
      ...event,
      id: `${event.id}-past-${i}`,
      instanceDate: pastDate,
      status: Math.random() > 0.2 ? 'played' : 'canceled', // 20% chance of canceled
      won: Math.random() > 0.8, // 20% chance of being MVP
      participationStatus: Math.random() > 0.3 ? 'joined' : 'skipping' // 70% joined, 30% skipped
    });
  }
  
  // Create instances in the future (upcoming)
  for (let i = 0; i < Math.ceil(count/2); i++) {
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + (i * 7)); // Weekly in the future
    
    instances.push({
      ...event,
      id: `${event.id}-future-${i}`,
      instanceDate: futureDate,
      status: 'upcoming',
      participationStatus: i === 0 ? 'joined' : (i === 1 ? 'tentative' : 'none') // First upcoming is joined, second is tentative
    });
  }
  
  return instances;
};
