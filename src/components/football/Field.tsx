
import React from 'react';

const Field: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-30">
      {/* Main field outline */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white" />
      <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white" />
      <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-white" />
      
      {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/6 rounded-full border border-white" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[2px] h-[2px] bg-white rounded-full" />
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white" />
      
      {/* Penalty areas - now on left and right sides */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1/5 border-r border-t border-b border-white" />
      <div className="absolute right-0 top-1/4 bottom-1/4 w-1/5 border-l border-t border-b border-white" />
      
      {/* Goal areas - now on left and right sides */}
      <div className="absolute left-0 top-1/3 bottom-1/3 w-1/10 border-r border-t border-b border-white" />
      <div className="absolute right-0 top-1/3 bottom-1/3 w-1/10 border-l border-t border-b border-white" />
      
      {/* Goals - now on left and right sides */}
      <div className="absolute left-0 top-2/5 bottom-2/5 w-[4px] border-r border-t border-b border-white bg-white/20" />
      <div className="absolute right-0 top-2/5 bottom-2/5 w-[4px] border-l border-t border-b border-white bg-white/20" />
      
      {/* Decorative corner elements - fading lines */}
      <div className="absolute top-0 left-0 w-[15%] h-[1px] bg-gradient-to-r from-white to-transparent" />
      <div className="absolute top-0 right-0 w-[15%] h-[1px] bg-gradient-to-l from-white to-transparent" />
      <div className="absolute bottom-0 left-0 w-[15%] h-[1px] bg-gradient-to-r from-white to-transparent" />
      <div className="absolute bottom-0 right-0 w-[15%] h-[1px] bg-gradient-to-l from-white to-transparent" />
      
      <div className="absolute top-0 left-0 w-[1px] h-[15%] bg-gradient-to-b from-white to-transparent" />
      <div className="absolute top-0 right-0 w-[1px] h-[15%] bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-0 left-0 w-[1px] h-[15%] bg-gradient-to-t from-white to-transparent" />
      <div className="absolute bottom-0 right-0 w-[1px] h-[15%] bg-gradient-to-t from-white to-transparent" />
      
      {/* Double lines near corners */}
      <div className="absolute top-[5%] left-0 w-[10%] h-[1px] bg-white/40" />
      <div className="absolute top-[5%] right-0 w-[10%] h-[1px] bg-white/40" />
      <div className="absolute bottom-[5%] left-0 w-[10%] h-[1px] bg-white/40" />
      <div className="absolute bottom-[5%] right-0 w-[10%] h-[1px] bg-white/40" />
      
      <div className="absolute left-[5%] top-0 w-[1px] h-[10%] bg-white/40" />
      <div className="absolute right-[5%] top-0 w-[1px] h-[10%] bg-white/40" />
      <div className="absolute left-[5%] bottom-0 w-[1px] h-[10%] bg-white/40" />
      <div className="absolute right-[5%] bottom-0 w-[1px] h-[10%] bg-white/40" />
      
      {/* Corner arcs */}
      <div className="absolute top-0 left-0 w-[10%] h-[10%] border-r border-b border-white/50 rounded-br-full" />
      <div className="absolute top-0 right-0 w-[10%] h-[10%] border-l border-b border-white/50 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-[10%] h-[10%] border-r border-t border-white/50 rounded-tr-full" />
      <div className="absolute bottom-0 right-0 w-[10%] h-[10%] border-l border-t border-white/50 rounded-tl-full" />
    </div>
  );
};

export default Field;
