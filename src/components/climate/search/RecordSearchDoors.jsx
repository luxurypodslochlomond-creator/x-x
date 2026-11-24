import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// ── THE OTHER WAY IN ─────────────────────────────────────────────────────────────
// The front of Base 1 used to end after the search line, with half the glass empty
// beneath it. A reader who had not typed anything yet was shown a page that looked
// finished and asked nothing of them.
//
// These are the record's own rooms, printed the way Base 1 prints everything: a red
// label, an ink rule, the mark's red on the arrow. No pictures, no cards, no ranking —
// the same eight doors anybody can walk through, in the record's own hand.
const DOORS = [
  { label: 'The record', to: '/TogetherChangeClimate' },
  { label: 'The Wire', to: '/ClimateWire' },
  { label: 'Map & reach', to: '/ClimateMap' },
  { label: 'Music given', to: '/ClimateMusic' },
  { label: 'Drawings', to: '/ClimateCartoons' },
  { label: 'The roll', to: '/ClimateRoll' },
  { label: 'Method & corrections', to: '/ClimateMethod' },
];

export default function RecordSearchDoors() {
  return (
    <nav aria-label="The record's rooms" className="record-search-doors border-t border-record-ink/20 pt-3">
      <p className="base-one-label font-mono uppercase text-record-mark">Or walk in somewhere</p>
      <ul className="mt-2 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        {DOORS.map((door) => (
          <li key={door.to}>
            <Link
              to={door.to}
              className="base-one-label font-mono uppercase flex min-h-11 items-center justify-between gap-3 border-b border-record-ink/20 py-2 text-record-ink transition-colors hover:border-record-mark hover:text-record-mark"
            >
              <span className="min-w-0 truncate">{door.label}</span>
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 opacity-60" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}