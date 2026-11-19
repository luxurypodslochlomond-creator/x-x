import React from 'react';

// Same optical bounds and two inks as the masthead. No artificial tilt or rough edges.
const BASE = { viewBox: '0 0 40 40', fill: 'currentColor', stroke: 'none' };

export function RoomMarkSolution({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M4 34V20A16 16 0 0 1 16 4.5v7.4A9 9 0 0 0 11 20v14ZM24 4.5A16 16 0 0 1 36 20v14h-7V20a9 9 0 0 0-5-8.1Z" />
      <path d="M17 4h6v10h-6Z" className="text-record-mark" />
    </svg>
  );
}

export function RoomMarkCrisis({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M18 4a16 16 0 0 0 0 32l-4-12 8-8Z" />
      <path d="M22 4a16 16 0 0 1 0 32l-4-11 8-9Z" className="text-record-mark" />
    </svg>
  );
}

export function RoomMarkAction({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M4 16h16v8H4Z" />
      <path d="m20 5 16 15-16 15Z" className="text-record-mark" />
    </svg>
  );
}

export function RoomMarkGroups({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="7" />
      <circle cx="28" cy="12" r="7" />
      <circle cx="20" cy="28" r="7" className="text-record-mark" />
    </svg>
  );
}