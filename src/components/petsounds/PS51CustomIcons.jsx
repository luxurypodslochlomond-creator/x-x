import React from 'react';

// Custom PS51 icon set — branded, 8-bit, feels like "we know the score"
export const PS51Icons = {
  // TV icon — watch together experience
  WatchTogether: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="3" width="20" height="14" rx="1" stroke="currentColor" strokeWidth="2"/>
      <path d="M7 17h10M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  ),

  // Science icon — research backed
  Science: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L3 7v8c0 7 9 8 9 8s9-1 9-8V7l-9-5z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <path d="M8 8L4 4M16 8L20 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  // Frequency waves — the core
  Frequency: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 12h2M10 6v12M14 6v12M20 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 12c0-1.5.5-3 1.5-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // Heart for animal care
  AnimalCare: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      <circle cx="7" cy="8" r="1.5" fill="white" opacity="0.8"/>
      <circle cx="17" cy="8" r="1.5" fill="white" opacity="0.8"/>
    </svg>
  ),

  // Paw print — pet specific
  Paw: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      {/* Main pad */}
      <circle cx="12" cy="16" r="3.5" />
      {/* Toe pads */}
      <circle cx="5" cy="10" r="2.5" />
      <circle cx="12" cy="6" r="2.5" />
      <circle cx="19" cy="10" r="2.5" />
      <circle cx="9" cy="3" r="1.8" opacity="0.7" />
      <circle cx="15" cy="3" r="1.8" opacity="0.7" />
    </svg>
  ),

  // Shield — safety/trust
  Trust: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L4 6v6c0 6 8 8 8 8s8-2 8-8V6l-8-4z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Speaker — audio playback
  Speaker: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 9v6c0 2 1 4 3 4h2l4-6V9l-4-6H6c-2 0-3 2-3 4z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M15 11c1 0 2 1 2 2s-1 2-2 2M18 9c2 0 3 2 3 4s-1 4-3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  // Lock — no side effects / safe
  Safe: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="5" y="10" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="2"/>
      <path d="M7 10V7a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="15" r="1.5" fill="currentColor"/>
    </svg>
  ),

  // Gift/bonus — 10% to rescue
  Rescue: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 6h12v3H6zM7 9h10v10c0 1-1 2-2 2H9c-1 0-2-1-2-2V9z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M10 6V5c0-1 1-1 2-1s2 0 2 1v1M12 12v4M10 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Cat face — feline specific
  Cat: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Pointed ears */}
      <path d="M5 11L3 4l5 4M19 11L21 4l-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor"/>
      {/* Round head */}
      <circle cx="12" cy="14" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
      {/* Slit pupils */}
      <ellipse cx="9.5" cy="13.5" rx="1" ry="1.8" fill="currentColor"/>
      <ellipse cx="14.5" cy="13.5" rx="1" ry="1.8" fill="currentColor"/>
      {/* Small triangle nose */}
      <path d="M11.5 16l.5-.7.5.7z" fill="currentColor"/>
      {/* Whiskers */}
      <path d="M3 14h5M16 14h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <path d="M3.5 12l4.5 1.5M20.5 12l-4.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),

  // Horseshoe open UP — holds the luck in ✅
  Horse: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Horseshoe — open at top, arch at bottom */}
      <path d="M7 4v10a5 5 0 0 0 10 0V4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Open top of horseshoe — the two tips */}
      <path d="M7 4h2M15 4h2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Nail holes */}
      <circle cx="8.5" cy="7" r="1" fill="currentColor"/>
      <circle cx="15.5" cy="7" r="1" fill="currentColor"/>
      <circle cx="8" cy="11" r="1" fill="currentColor"/>
      <circle cx="16" cy="11" r="1" fill="currentColor"/>
    </svg>
  ),

  // Heart for grief & loss — remembering bonds
  Heart: ({ size = 24, className = '', animate = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}
      style={animate ? { 
        filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.8))',
        animation: 'heartbeat-glow 1.5s ease-in-out infinite'
      } : {}}>
      <path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" strokeLinejoin="round"/>
      <style>{`
        @keyframes heartbeat-glow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(236, 72, 153, 0.8)); transform: scale(1); }
          50% { filter: drop-shadow(0 0 16px rgba(236, 72, 153, 1)); transform: scale(1.08); }
        }
      `}</style>
    </svg>
  ),
  };

// Wrapper component for easy use
export default function PS51Icon({ type, size = 24, className = '' }) {
  const Icon = PS51Icons[type];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}