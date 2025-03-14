
import React from 'react';

const Field: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-30" style={{ transform: 'scaleX(-1)' }}>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white" />
      <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white" />
      <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-white" />
      
      {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/6 rounded-full border border-white" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[2px] h-[2px] bg-white rounded-full" />
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white" />
      
      {/* Penalty areas */}
      <div className="absolute top-0 left-1/4 right-1/4 h-1/5 border-b border-l border-r border-white" />
      <div className="absolute bottom-0 left-1/4 right-1/4 h-1/5 border-t border-l border-r border-white" />
      
      {/* Goal areas */}
      <div className="absolute top-0 left-1/3 right-1/3 h-1/10 border-b border-l border-r border-white" />
      <div className="absolute bottom-0 left-1/3 right-1/3 h-1/10 border-t border-l border-r border-white" />
      
      {/* Goals */}
      <div className="absolute top-0 left-2/5 right-2/5 h-[4px] border-b border-l border-r border-white bg-white/20" />
      <div className="absolute bottom-0 left-2/5 right-2/5 h-[4px] border-t border-l border-r border-white bg-white/20" />
    </div>
  );
};

export default Field;
