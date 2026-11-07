import React from 'react';

// Holds the map's space while the mapping library arrives, so the page paints
// immediately and nothing jumps when the map appears. It says one quiet line — it used
// to pulse two red dots around the words RECEIVING SIGNALS, which is a machine warming
// up, not a page of the record opening.
export default function ClimateMapPlaceholder() {
  return (
    <div className="absolute inset-0 bg-[#efe7d6] flex items-center justify-center">
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5a5246]">Placing the entries…</span>
    </div>
  );
}