
import React from 'react';

const MiniField: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-40">
      {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-white"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white"></div>
      
      {/* Goal areas - on left and right sides */}
      <div className="absolute left-0 top-1/3 bottom-1/3 w-2 border-r border-t border-b border-white"></div>
      <div className="absolute right-0 top-1/3 bottom-1/3 w-2 border-l border-t border-b border-white"></div>
      
      {/* Field outline */}
      <div className="absolute inset-0.5 border border-white rounded-md"></div>
      
      {/* Decorative corner elements - fading lines */}
      <div className="absolute top-0.5 left-0.5 w-3 h-[1px] bg-gradient-to-r from-white to-transparent"></div>
      <div className="absolute top-0.5 right-0.5 w-3 h-[1px] bg-gradient-to-l from-white to-transparent"></div>
      <div className="absolute bottom-0.5 left-0.5 w-3 h-[1px] bg-gradient-to-r from-white to-transparent"></div>
      <div className="absolute bottom-0.5 right-0.5 w-3 h-[1px] bg-gradient-to-l from-white to-transparent"></div>
      
      <div className="absolute top-0.5 left-0.5 w-[1px] h-2 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute top-0.5 right-0.5 w-[1px] h-2 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0.5 left-0.5 w-[1px] h-2 bg-gradient-to-t from-white to-transparent"></div>
      <div className="absolute bottom-0.5 right-0.5 w-[1px] h-2 bg-gradient-to-t from-white to-transparent"></div>
      
      {/* Corner arcs */}
      <div className="absolute top-0.5 left-0.5 w-2 h-2 border-r border-b border-white/50 rounded-br-full"></div>
      <div className="absolute top-0.5 right-0.5 w-2 h-2 border-l border-b border-white/50 rounded-bl-full"></div>
      <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-r border-t border-white/50 rounded-tr-full"></div>
      <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-l border-t border-white/50 rounded-tl-full"></div>
      
      {/* Double line effect near corners */}
      <div className="absolute top-1.5 left-3 w-3 h-[0.5px] bg-white/30"></div>
      <div className="absolute top-1.5 right-3 w-3 h-[0.5px] bg-white/30"></div>
      <div className="absolute bottom-1.5 left-3 w-3 h-[0.5px] bg-white/30"></div>
      <div className="absolute bottom-1.5 right-3 w-3 h-[0.5px] bg-white/30"></div>
    </div>
  );
};

export default MiniField;
