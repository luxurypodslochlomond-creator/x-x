import React from 'react';
import '@/components/climate/record-navigator.css';
import RecordTongueDoor from '@/components/climate/RecordTongueDoor';

/* ── THE READER'S OWN TONGUE, IN THE RECORD'S OWN HAND ────────────────────────
   This is the same door the climate record signs its masthead with — the same
   eighteen-pixel mark, the same searchable list of every tongue on earth, the same
   honour that nothing is refused at the door. It was a small square button here
   before, which read as a setting bolted onto a page rather than the seventh way
   through it.

   It reads and writes the platform's one language choice, so a tongue picked on
   this hill is already picked on the next page, and the whole sheet — the lead,
   the history, the wildlife, the stay — follows it. */
export default function MastheadTongue() {
  return (
    <div className="shrink-0">
      <RecordTongueDoor inline size={18} />
    </div>
  );
}