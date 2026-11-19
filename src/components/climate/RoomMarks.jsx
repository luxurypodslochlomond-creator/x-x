import React from 'react';

// Solid cut impressions, sharing the masthead's ink and one purposeful red part.
const CUT = { viewBox: '0 0 40 40', fill: 'currentColor', stroke: 'none' };

// A graft: established growth and a new branch joined at the cut.
export function RoomMarkSolution({ size = 26, className = '' }) {
  return (
    <svg {...CUT} width={size} height={size} className={className} aria-hidden="true">
      <path d="m17.4 35.6 1.1-13.4C12.1 21.1 6.8 16.8 5.4 9.1c7.8.5 12.3 4.7 14.2 10.6l1.1-8 5.6 1.4-2.7 22.2Z" />
      <path d="M24.8 13.6c-.7-6 2.9-10.1 10.1-10.7-.5 6.8-3.6 10.8-10.1 10.7Z" />
      <path className="text-record-mark" d="m19.1 16.6 9.1-2.7 1.4 5.5-9.8 2.4Z" />
    </svg>
  );
}

// A section of the world pulled out of true; the fault stays visible.
export function RoomMarkCrisis({ size = 26, className = '' }) {
  return (
    <svg {...CUT} width={size} height={size} className={className} aria-hidden="true">
      <path d="M19.2 4.4C10.6 4.2 4.3 10.9 4.8 19.1c.4 7.3 5.9 13.3 13.1 14.3l-3.1-10.7 5.8-5.3-4-4.5Z" />
      <path d="M25 6.3c7.4 1.7 12 8.8 10.2 16.2-1.2 5.3-5.6 10.1-11.5 10.9l2-10.2-4.9-5 6-5.6Z" />
      <path className="text-record-mark" d="m18.4 18.4 6.1 4.9-3.3 14.2-4.1-12.9 4.2-2.4Z" />
    </svg>
  );
}

// A step already taken, not an arrow promising movement.
export function RoomMarkAction({ size = 26, className = '' }) {
  return (
    <svg {...CUT} width={size} height={size} className={className} aria-hidden="true">
      <path d="M18.7 24.5c-2.9-2-3.9-6.6-2.4-11.7C18 7 22.5 2.5 26.1 3.8c4 1.5 3.9 7.5 1.6 12.3l-4.4 10.7Z" />
      <path className="text-record-mark" d="m15.8 27.1 6.6 3c-1.3 4.4-4.1 7-7 5.7-2.7-1.3-2.2-4.6.4-8.7Z" />
    </svg>
  );
}

// Separate strands interwoven, with one contribution in red.
export function RoomMarkGroups({ size = 26, className = '' }) {
  return (
    <svg {...CUT} width={size} height={size} className={className} aria-hidden="true">
      <path d="m6.2 5.1 7.3 1.2 8.4 28.1-7.4.4Z" />
      <path d="m25.8 4.7 7.5 1.5-3 10.5-7-2.2Zm-4 17.6 7.2 1.9-2.7 11.4-7.5-1.3Z" />
      <path d="m4.2 25.9 8.4-2.6 1.8 6.4-8.9 2.7Z" />
      <path className="text-record-mark" d="m15.5 22.1 19.1-6.2 1.5 7.1-18.7 5.6Z" />
    </svg>
  );
}