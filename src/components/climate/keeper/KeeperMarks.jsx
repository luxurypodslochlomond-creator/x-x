import React from 'react';

// ── THE SHED'S OWN MARKS ─────────────────────────────────────────────────────────
// Drawn here as strokes rather than borrowed from an icon set, because a stock set says
// "dashboard" and this room is not a dashboard.
//
// They were hairlines, and a hairline at 46px on a phone is a smudge you have to squint
// at. A door you have to squint at is a door you do not want to open — so the weight has
// gone up, and each mark now carries one solid form rather than being all outline: the
// filled bow of the key, the filled pupil of the eye, the filled keyhole in the gate.
// That solid is what makes the thing an object instead of a diagram, and it is the only
// difference between a mark you read and a mark you want to press.
//
// One weight, one colour (currentColor), no second colour, no shadow. They still sit in
// the type the way an engraving sits in a page.
const BASE = {
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// The yes. A heavy old key: solid bow, cut shaft, two teeth.
export function MarkKey({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="10.5" r="6.4" />
      <circle cx="20" cy="10.5" r="2.5" fill="currentColor" stroke="none" />
      <path d="M20 17.2v16.3" />
      <path d="M20 26.6h6.4" />
      <path d="M20 31.8h4.2" />
    </svg>
  );
}

// The second look. An eye with lashes — the pair of eyes the record promises.
export function MarkEye({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M4.6 19.6c6.2-8.2 24.6-8.2 30.8 0-6.2 8.2-24.6 8.2-30.8 0Z" />
      <circle cx="20" cy="19.6" r="4.9" />
      <circle cx="20" cy="19.6" r="2.1" fill="currentColor" stroke="none" />
      <path d="M20 3.6v3.2" />
      <path d="M7.6 7l2.2 2.6" />
      <path d="M32.4 7l-2.2 2.6" />
    </svg>
  );
}

// What the record holds. An open ledger, ruled, with entries already written.
export function MarkLedger({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M20 12.8c-4.4-2.8-9.6-3.2-14-2.5V31.4c4.4-.7 9.6-.3 14 2.5 4.4-2.8 9.6-3.2 14-2.5V10.3c-4.4-.7-9.6-.3-14 2.5Z" />
      <path d="M20 12.8v21.1" />
      <path d="M10.6 16.4h5.2M10.6 21h5.2M10.6 25.6h3.6" />
      <path d="M24.2 16.4h5.2M24.2 21h5.2M26 25.6h3.4" />
      <path d="M20 6.2v3.4" />
    </svg>
  );
}

// Who may come in. A doorway with a solid keyhole: the list, and the one thing it decides.
export function MarkGate({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M9 34V15.6a11 11 0 0 1 22 0V34" />
      <path d="M5.4 34h29.2" />
      <circle cx="20" cy="20.4" r="2.4" fill="currentColor" stroke="none" />
      <path d="M20 22.6v4.6" />
    </svg>
  );
}

// Finding a thing again. A lens on the page.
export function MarkSearch({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="17" cy="17" r="9.2" />
      <path d="M23.7 23.7l9.4 9.4" />
      <path d="M12.6 17h8.8" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// The seal. A stamp on a ribbon: the fingerprint anybody can recompute.
export function MarkSeal({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="16" r="9" />
      <circle cx="20" cy="16" r="3.2" fill="currentColor" stroke="none" />
      <path d="M14.2 23.4L10.4 35l9.6-4.3 9.6 4.3-3.8-11.6" />
    </svg>
  );
}

// The wire. Something said from far off, heard here.
export function MarkWire({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="27.6" r="2.6" fill="currentColor" stroke="none" />
      <path d="M13 20.8a9.8 9.8 0 0 1 14 0" />
      <path d="M7.6 14.4a17 17 0 0 1 24.8 0" />
    </svg>
  );
}

// Where it came from. An origin going down into roots: the source, and the sources of the
// sources, which is the only reason an entry is allowed to exist here.
export function MarkRoot({ size = 46, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="7" r="3" fill="currentColor" stroke="none" />
      <path d="M20 10.4v6.4" />
      <path d="M20 16.8c-3.6 2.8-7.8 4.2-12.2 4.4" />
      <path d="M20 16.8c3.6 2.8 7.8 4.2 12.2 4.4" />
      <path d="M20 16.8v8.8" />
      <path d="M20 25.6c-2.4 1.8-5 2.8-8 3.4" />
      <path d="M20 25.6c2.4 1.8 5 2.8 8 3.4" />
    </svg>
  );
}