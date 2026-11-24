import React from 'react';

// Drawn for Fergus's room: bold line art, one accent, readable at a thumb's width.
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };

export function NibIcon({ size = 32 }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" {...base}>
    <path d="M16 4 25 13 16 28 7 13Z" />
    <path d="M16 10v8" />
    <circle cx="16" cy="21" r="1.8" fill="currentColor" stroke="none" />
  </svg>;
}

export function ClapperIcon({ size = 32 }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" {...base}>
    <path d="M5 12h22v15H5z" />
    <path d="M5 12 8 5h19l-3 7" />
    <path d="m13 5-2.5 7M20 5l-2.5 7" />
    <path d="M11 20h7" />
  </svg>;
}

export function BallIcon({ size = 32 }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" {...base}>
    <circle cx="16" cy="16" r="11" />
    <path d="m16 10 5 3.6-2 6H13l-2-6z" />
    <path d="M16 10V5M21 13.6l4.5-1.6M19 19.6l2.8 3.9M13 19.6l-2.8 3.9M11 13.6 6.5 12" />
  </svg>;
}

export function CardIcon({ size = 32 }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" {...base}>
    <rect x="4" y="8" width="24" height="16" rx="2.5" />
    <path d="M8 14h9M8 19h5" />
    <circle cx="23" cy="18" r="3" />
  </svg>;
}

export function NoteIcon({ size = 32 }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" {...base}>
    <path d="M6 8h20v13H15l-6 5v-5H6z" />
    <path d="M11 13h10M11 17h6" />
  </svg>;
}

export function RoomIcon({ size = 32 }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" {...base}>
    <path d="M6 14 16 6l10 8" />
    <path d="M9 13v13h14V13" />
    <path d="M14 26v-7h4v7" />
  </svg>;
}

export function LockIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...base}>
    <rect x="4.5" y="10" width="15" height="10.5" rx="2.5" />
    <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
    <path d="M12 14v3" />
  </svg>;
}

export function GoIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...base}>
    <path d="M5 12h13" /><path d="m13 7 5 5-5 5" />
  </svg>;
}

export const FERGUS_ICONS = { home: RoomIcon, note: NibIcon, film: ClapperIcon, football: BallIcon, card: CardIcon, notes: NoteIcon };