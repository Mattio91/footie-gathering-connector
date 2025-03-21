
import React from 'react';

const NoEventsFound = () => {
  return (
    <div className="text-center py-12 bg-muted/20 rounded-lg">
      <h3 className="text-lg font-medium mb-2">No events found</h3>
      <p className="text-muted-foreground">Try adjusting your search or create a new event.</p>
    </div>
  );
};

export default NoEventsFound;
