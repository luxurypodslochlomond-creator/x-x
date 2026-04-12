import React from 'react';

export default function CustomSaxIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Sax body - organic curves */}
      <path
        d="M 10 8 Q 12 6 14 6 L 16 6 Q 18 6 19 8 L 20 15 Q 20.5 18 20 22 L 19 26 Q 18.5 28 17 28 L 15 28 Q 13.5 28 13 26 L 12 22 Q 11.5 18 12 15 L 13 8"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Bell */}
      <ellipse cx="13" cy="26" rx="3" ry="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
      
      {/* Keys - top row */}
      <circle cx="11" cy="10" r="1" fill="currentColor" opacity="0.8" />
      <circle cx="15" cy="9" r="1" fill="currentColor" opacity="0.8" />
      <circle cx="19" cy="10" r="1" fill="currentColor" opacity="0.8" />
      
      {/* Keys - middle row */}
      <circle cx="10" cy="15" r="1" fill="currentColor" opacity="0.8" />
      <circle cx="14" cy="14" r="1" fill="currentColor" opacity="0.8" />
      <circle cx="18" cy="15" r="1" fill="currentColor" opacity="0.8" />
      
      {/* Keys - lower row */}
      <circle cx="11" cy="20" r="1" fill="currentColor" opacity="0.8" />
      <circle cx="15" cy="19" r="1" fill="currentColor" opacity="0.8" />
      <circle cx="19" cy="20" r="1" fill="currentColor" opacity="0.8" />
      
      {/* Mouthpiece */}
      <rect x="13" y="3" width="2" height="3" rx="0.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <line x1="12.5" y1="4" x2="15.5" y2="4" stroke="currentColor" strokeWidth="0.8" />
      
      {/* AI + Human fusion: subtle quantum glow around keys */}
      <circle cx="14" cy="14" r="6" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.4" />
      
      {/* Harmony wave beneath sax */}
      <path
        d="M 10 29 Q 12 27.5 14 29 Q 16 30.5 18 29"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}