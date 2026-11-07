import React from 'react';

// ── THE SHED'S OWN MARKS ─────────────────────────────────────────────────────────
// Four marks, drawn here as strokes rather than borrowed from an icon set, because a
// stock set says "dashboard" and this room is not a dashboard. A key for the yes, an
// eye for the second look, a ledger for what the record holds, a root for where a thing
// came from. One hairline weight, one colour (currentColor), no fills — so a mark sits
// in the type the way an engraving sits in a page, and never shouts over it.

const BASE = {
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// The yes. A heavy old key: bow, shaft, two teeth cut into it.
export function MarkKey({ size = 28, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="11" r="6" />
      <circle cx="20" cy="11" r="1.7" />
      <path d="M20 17v15" />
      <path d="M20 27.5h5.5" />
      <path d="M20 32h3.5" />
    </svg>
  );
}

// The second look. An eye with lashes — the pair of eyes the record promises.
export function MarkEye({ size = 28, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M5.5 20c5.6-7.4 23.4-7.4 29 0-5.6 7.4-23.4 7.4-29 0Z" />
      <circle cx="20" cy="20" r="4.2" />
      <path d="M20 4.5v3.4" />
      <path d="M8.6 7.4l2 2.7" />
      <path d="M31.4 7.4l-2 2.7" />
    </svg>
  );
}

// What the record holds. An open ledger, ruled, with entries already written on it.
export function MarkLedger({ size = 28, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M20 13.2c-4.2-2.6-9.2-3-13.4-2.4V31c4.2-.6 9.2-.2 13.4 2.4 4.2-2.6 9.2-3 13.4-2.4V10.8C29.2 10.2 24.2 10.6 20 13.2Z" />
      <path d="M20 13.2v20.2" />
      <path d="M11 16.6h4.6M11 20.8h4.6M11 25h3.2" />
      <path d="M24.4 16.6H29M24.4 20.8H29M25.8 25H29" />
    </svg>
  );
}

// Where it came from. An origin going down into roots: the source, and the sources of
// the sources, which is the only reason an entry is allowed to exist here.
export function MarkRoot({ size = 28, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="6.8" r="2.4" />
      <path d="M20 9.2v7.3" />
      <path d="M20 16.5c-3.4 2.6-7.4 4-11.6 4.2" />
      <path d="M20 16.5c3.4 2.6 7.4 4 11.6 4.2" />
      <path d="M20 16.5v9.4" />
      <path d="M20 25.9c-2.2 1.6-4.6 2.6-7.4 3.2" />
      <path d="M20 25.9c2.2 1.6 4.6 2.6 7.4 3.2" />
    </svg>
  );
}