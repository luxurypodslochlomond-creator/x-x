import React from 'react';

// Holds the map's space while the mapping library arrives, so the page paints
// immediately and nothing jumps when the map appears.
export default function ClimateMapPlaceholder() {
  return (
    <div className="absolute inset-0 bg-[#efe7d6] flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#b3261e] animate-pulse" />
          <span className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#1a1612]">RECEIVING SIGNALS</span>
          <span className="w-2 h-2 rounded-full bg-[#b3261e] animate-pulse" />
        </div>
        <div className="text-[8px] font-mono text-[#6b6258] tracking-widest">from a warming world…</div>
      </div>
    </div>
  );
}