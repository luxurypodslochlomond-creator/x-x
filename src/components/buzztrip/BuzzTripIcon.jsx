import React from 'react';

export default function BuzzTripIcon({ size = 24, animate = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={animate ? { animation: 'buzztrip-pulse 2.5s ease-in-out infinite' } : {}}
    >
      <style>{`
        @keyframes buzztrip-pulse {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(34, 197, 94, 0.6)); }
          50% { filter: drop-shadow(0 0 12px rgba(34, 197, 94, 1)); }
        }
      `}</style>
      {/* Outer ring — nerve pulse */}
      <circle cx="16" cy="16" r="14" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5" />
      {/* Inner circle — calm core */}
      <circle cx="16" cy="16" r="9" fill="none" stroke="#22c55e" strokeWidth="1.5" />
      {/* Wave line through centre — vagal pulse */}
      <path
        d="M7 16 Q9 12 11 16 Q13 20 15 16 Q17 12 19 16 Q21 20 23 16 Q25 12 25 16"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Centre dot — the reset point */}
      <circle cx="16" cy="16" r="2" fill="#22c55e" />
    </svg>
  );
}