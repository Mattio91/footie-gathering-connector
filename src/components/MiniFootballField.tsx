
import React from 'react';

const MiniFootballField = () => {
  return (
    <div className="relative w-24 h-12 mx-4">
      {/* Field background */}
      <div className="absolute inset-0 bg-green-600 rounded-lg overflow-hidden border border-green-700">
        {/* Field pattern */}
        <div className="absolute inset-0 opacity-40">
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-white"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white"></div>
          
          {/* Goal areas */}
          <div className="absolute top-0 left-1/3 right-1/3 h-1.5 border-b border-l border-r border-white"></div>
          <div className="absolute bottom-0 left-1/3 right-1/3 h-1.5 border-t border-l border-r border-white"></div>
          
          {/* Field outline */}
          <div className="absolute inset-0.5 border border-white rounded-md"></div>
        </div>
        
        {/* Ball */}
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        
        {/* Player dots */}
        <div className="absolute w-1.5 h-1.5 bg-team-home rounded-full left-1/4 top-1/3"></div>
        <div className="absolute w-1.5 h-1.5 bg-team-home rounded-full left-1/3 top-2/3"></div>
        <div className="absolute w-1.5 h-1.5 bg-team-away rounded-full right-1/4 top-1/3"></div>
        <div className="absolute w-1.5 h-1.5 bg-team-away rounded-full right-1/3 top-2/3"></div>
      </div>
    </div>
  );
};

export default MiniFootballField;
