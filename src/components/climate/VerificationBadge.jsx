import React from 'react';
import { verificationOf } from '@/components/climate/verification';

// One word about how well an entry is known, worn on the card and on the entry's own
// page. Deliberately the same three words wherever they appear: nothing on the record
// should look more certain than it is.
export default function VerificationBadge({ entry, className = '' }) {
  const badge = verificationOf(entry);
  return (
    <span className={`px-2 py-0.5 text-[9px] font-black font-mono uppercase tracking-wide ${badge.tone} ${className}`}>
      {badge.label}
    </span>
  );
}