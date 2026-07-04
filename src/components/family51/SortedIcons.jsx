import React from 'react';

/**
 * SORTED — Custom Icon Set
 * A cohesive family: 1.5px strokes, rounded caps, geometric simplicity.
 * Each icon is drawn by hand — no generic library icons.
 * The visual language: warmth, clarity, resolution.
 */

// ── BRAND MARK ──
// A tangled line that becomes a straight arrow — chaos becoming clarity.
export function SortedMark({ size = 28, color = '#d4a574' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M4 16 Q8 8 12 16 Q16 24 20 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35" />
      <path d="M20 16 L28 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M24.5 12.5 L28 16 L24.5 19.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// ── APERTURE (Photo/Camera) ──
// An iris, not a camera body. "Capture" without being literal.
export function ApertureIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M12 3 L12 8 M21 12 L16 12 M12 21 L12 16 M3 12 L8 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── DOCUMENT (File) ──
// A clean page with a folded corner and content lines.
export function DocumentIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M7 3 L15 3 L19 7 L19 21 L7 21 Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M15 3 L15 7 L19 7" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M10 12 L16 12 M10 16 L14 16" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ── COMPASS (Location) ──
// A compass needle, not a map pin. "Where you are" as direction.
export function CompassIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M12 7 L13.5 12 L12 17 L10.5 12 Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" fill="none" />
      <circle cx="12" cy="12" r="1" fill={color} />
    </svg>
  );
}

// ── RESOLVE (Submit/Sort) ──
// A clean arrow — the satisfying action of moving forward.
export function ResolveIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12 L19 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M13 6 L19 12 L13 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// ── SHIELD (Privacy/Trust) ──
// A protective shield — clean, geometric, not a padlock.
export function ShieldIcon({ size = 12, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3 L19 6 L19 12 Q19 17 12 20.5 Q5 17 5 12 L5 6 Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    </svg>
  );
}