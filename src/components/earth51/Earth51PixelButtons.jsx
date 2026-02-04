import React from 'react';

/**
 * Pure 8-bit pixel art buttons for Earth51
 * No emojis - authentic retro
 */

export function GameIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      {/* Volcano triangle */}
      <polygon points="8,2 14,10 2,10" fill="#000"/>
      {/* Lava flow */}
      <rect x="6" y="10" width="4" height="2" fill="#000"/>
    </svg>
  );
}

export function SafeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      {/* Shield */}
      <path d="M8 2 L14 5 L14 10 Q8 14 8 14 Q2 14 2 10 L2 5 Z" fill="none" stroke="#000" strokeWidth="2"/>
      {/* Checkmark */}
      <line x1="5" y1="9" x2="7" y2="11" stroke="#000" strokeWidth="2"/>
      <line x1="7" y1="11" x2="11" y2="7" stroke="#000" strokeWidth="2"/>
    </svg>
  );
}

export function EarnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      {/* Coin circle */}
      <circle cx="8" cy="8" r="6" fill="none" stroke="#000" strokeWidth="2"/>
      {/* Dollar sign */}
      <line x1="8" y1="4" x2="8" y2="12" stroke="#000" strokeWidth="2"/>
      <path d="M5 6 Q8 5 11 6" fill="none" stroke="#000" strokeWidth="1"/>
      <path d="M5 10 Q8 11 11 10" fill="none" stroke="#000" strokeWidth="1"/>
    </svg>
  );
}

export function HealIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      {/* Waveform */}
      <path d="M2 8 L4 5 L6 11 L8 6 L10 10 L12 7 L14 8" fill="none" stroke="#000" strokeWidth="2"/>
      {/* Dots under wave */}
      <rect x="3" y="12" width="1" height="1" fill="#000"/>
      <rect x="8" y="12" width="1" height="1" fill="#000"/>
      <rect x="13" y="12" width="1" height="1" fill="#000"/>
    </svg>
  );
}

export function CameraIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 20 20" style={{ imageRendering: 'pixelated' }}>
      {/* Camera body */}
      <rect x="2" y="4" width="16" height="12" fill="none" stroke="#000" strokeWidth="2"/>
      {/* Lens */}
      <circle cx="10" cy="10" r="4" fill="none" stroke="#000" strokeWidth="2"/>
      {/* Flash */}
      <rect x="15" y="5" width="2" height="2" fill="#000"/>
    </svg>
  );
}