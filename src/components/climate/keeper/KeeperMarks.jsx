import React from 'react';

// ── THE SHED'S OWN MARKS ─────────────────────────────────────────────────────────
// Drawn here as strokes rather than borrowed from an icon set, because a stock set says
// "dashboard" and this room is not a dashboard.
//
// Every mark is drawn for the job behind the door, and for nothing else:
//   the stamp   — a yes pressed onto the page, which is the only thing a keeper does here
//   the eye     — a pair of eyes opening a source, which is the whole of checking
//   the doorway — who may come in; a keyhole, because that door is answered with a key
//   the ledger  — what the record holds, counted
//   the root    — where a claim came from, and where that came from
//   the lens, the seal, the mast — finding a thing again, a fingerprint anyone can check,
//   and something said from far off and heard here
//
// They were hairlines once, and a hairline at forty pixels on a phone is a smudge you have
// to squint at. A door you squint at is a door you do not want to open, so the weight has
// gone up and each mark carries one solid mass — the inked stamp, the pupil, the keyhole,
// the spine of the book. That solid is the difference between a diagram and an object.
//
// One weight, one colour (currentColor), no second colour, no shadow. They sit in the type
// the way an engraving sits in a page — so they read at 18px and carry at 76px.
const BASE = {
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// The yes. A stamp coming down on the page: handled, inked, and already leaving its line.
export function MarkStamp({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M15.4 4.8h9.2a1.6 1.6 0 0 1 1.6 1.6v3.4h-12.4V6.4a1.6 1.6 0 0 1 1.6-1.6Z" />
      <path d="M20 9.8v3.6" />
      <path d="M8.8 13.4h22.4a1.4 1.4 0 0 1 1.4 1.4v6.4H7.4v-6.4a1.4 1.4 0 0 1 1.4-1.4Z" fill="currentColor" stroke="none" />
      <path d="M5.6 24.2h28.8" />
      <path d="M11.6 30.4h16.8" />
      <path d="M15.2 35.4h9.6" />
    </svg>
  );
}

// The second look. An eye with lashes — the pair of eyes the record promises.
export function MarkEye({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M3.8 20.4c6.6-8.8 25.8-8.8 32.4 0-6.6 8.8-25.8 8.8-32.4 0Z" />
      <circle cx="20" cy="20.4" r="5.2" />
      <circle cx="20" cy="20.4" r="2.3" fill="currentColor" stroke="none" />
      <path d="M20 4.4v3.4" />
      <path d="M7.4 8.2l2.4 2.8" />
      <path d="M32.6 8.2l-2.4 2.8" />
    </svg>
  );
}

// Who may come in. A doorway with a solid keyhole: the list, and the one thing it decides.
export function MarkGate({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M8.4 33.8V15.4a11.6 11.6 0 0 1 23.2 0v18.4" />
      <path d="M4.4 33.8h31.2" />
      <circle cx="20" cy="19.6" r="2.6" fill="currentColor" stroke="none" />
      <path d="M20 22v5" />
    </svg>
  );
}

// What the record holds. An open ledger, ruled, with entries already written.
export function MarkLedger({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M20 12.6c-4.6-2.9-10-3.3-14.6-2.6v21.6c4.6-.7 10-.3 14.6 2.6 4.6-2.9 10-3.3 14.6-2.6V10c-4.6-.7-10-.3-14.6 2.6Z" />
      <path d="M20 12.6v21.6" />
      <path d="M10.2 16.4h5.4M10.2 21.2h5.4M10.2 26h3.8" />
      <path d="M24.4 16.4h5.4M24.4 21.2h5.4M26.2 26h3.6" />
      <circle cx="20" cy="6.2" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Finding a thing again. A lens on the page.
export function MarkSearch({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="16.6" cy="16.6" r="9.6" />
      <path d="M23.8 23.8l10 10" />
      <path d="M11.8 16.6h9.6" />
      <circle cx="16.6" cy="16.6" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

// The seal. A stamp on a ribbon: the fingerprint anybody can recompute.
export function MarkSeal({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="15.8" r="9.4" />
      <circle cx="20" cy="15.8" r="3.6" fill="currentColor" stroke="none" />
      <path d="M13.6 23.6L9.4 35.4l10.6-4.6 10.6 4.6-4.2-11.8" />
    </svg>
  );
}

// The wire. Something said from far off, heard here.
export function MarkWire({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="27.4" r="2.8" fill="currentColor" stroke="none" />
      <path d="M12.6 20.4a10.4 10.4 0 0 1 14.8 0" />
      <path d="M7 13.6a18 18 0 0 1 26 0" />
    </svg>
  );
}

// Where it came from. An origin going down into roots: the source, and the sources of the
// sources, which is the only reason an entry is allowed to exist here.
export function MarkRoot({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="6.6" r="3.2" fill="currentColor" stroke="none" />
      <path d="M20 10.2v6.6" />
      <path d="M20 16.8c-3.8 3-8.2 4.4-12.8 4.6" />
      <path d="M20 16.8c3.8 3 8.2 4.4 12.8 4.6" />
      <path d="M20 16.8v8.6" />
      <path d="M20 25.4c-2.6 2-5.4 3-8.6 3.6" />
      <path d="M20 25.4c2.6 2 5.4 3 8.6 3.6" />
      <path d="M20 33.8v3" />
    </svg>
  );
}

// The key that used to stand for the yes. Kept, because access to this room is by the
// record's own list and a key is still what opens it — used on the doors that say so.
export function MarkKey({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="10.8" r="6.6" />
      <circle cx="20" cy="10.8" r="2.6" fill="currentColor" stroke="none" />
      <path d="M20 17.6v16.6" />
      <path d="M20 26.4h6.6" />
      <path d="M20 31.8h4.4" />
    </svg>
  );
}