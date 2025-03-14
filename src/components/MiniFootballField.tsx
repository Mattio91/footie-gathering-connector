
import React from 'react';
import MiniField from './football/MiniField';

// This component is kept minimal as it's not used in the main UI anymore
const MiniFootballField: React.FC = () => {
  return (
    <div className="relative w-12 h-24 mx-4">
      <div className="absolute inset-0 bg-green-600 rounded-lg overflow-hidden border border-green-700">
        <MiniField />
      </div>
    </div>
  );
};

export default MiniFootballField;
