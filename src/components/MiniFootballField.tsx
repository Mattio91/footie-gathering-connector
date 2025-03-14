
import React from 'react';
import MiniField from './football/MiniField';

const MiniFootballField: React.FC = () => {
  return (
    <div className="relative w-12 h-16 mx-2">
      <div className="absolute inset-0 bg-green-600 rounded-lg overflow-hidden border border-green-700">
        <MiniField />
      </div>
    </div>
  );
};

export default MiniFootballField;
