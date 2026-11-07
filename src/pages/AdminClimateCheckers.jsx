import React from 'react';
import GuestList from '@/components/climate/keeper/GuestList';

// The guest list has a door of its own in the shed now, and this address still works for
// anyone who has it bookmarked or was sent here. Same list, same rules, one place it lives.
export default function AdminClimateCheckers() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-6">
      <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#b3261e] mb-2">Keepers only</p>
      <h1
        className="text-[#141210] font-semibold text-[26px] leading-tight mb-4"
        style={{ fontFamily: 'var(--font-reading)', letterSpacing: '-0.01em' }}
      >
        Who may come into the record
      </h1>
      <GuestList />
    </div>
  );
}