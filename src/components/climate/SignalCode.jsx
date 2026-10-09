import React from 'react';

// Beadie Signal classification code — two-letter monospace symbols in signal red.
// Like a periodic table for climate. Big science, not toys.
// Used for category codes (AG, WA, HE...) and country codes (US, GB, FR...).
export default function SignalCode({ code, size = 'sm' }) {
  const sizes = {
    sm: 'text-[8px] px-1 py-0.5',
    md: 'text-[9px] px-1.5 py-1',
    lg: 'text-[10px] px-2 py-1',
  };
  return (
    <span className={`${sizes[size] || sizes.sm} font-black font-mono uppercase text-[#e2602a] border border-[#e2602a]/40 leading-none flex-shrink-0 inline-block`}>
      {code || 'OT'}
    </span>
  );
}