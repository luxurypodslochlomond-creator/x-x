import React from 'react';

// COOLASFUCK Platform Icon — open API symbol, circuit meets humanity
export default function PlatformIcon({ size = 24, animate = false, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Outer ring */}
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 1.5" opacity="0.4" />
      {/* Inner core */}
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
      {/* Cardinal connectors — like API endpoints */}
      <line x1="12" y1="2" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="12" x2="7" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Diagonal connectors — mesh network feel */}
      <line x1="5.5" y1="5.5" x2="8.5" y2="8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="15.5" y1="15.5" x2="18.5" y2="18.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="18.5" y1="5.5" x2="15.5" y2="8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="5.5" y1="18.5" x2="8.5" y2="15.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      {/* Endpoint dots */}
      <circle cx="12" cy="2" r="1.2" fill="currentColor" />
      <circle cx="12" cy="22" r="1.2" fill="currentColor" />
      <circle cx="2" cy="12" r="1.2" fill="currentColor" />
      <circle cx="22" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}