import React from 'react';

// ALETHEIA — the scientific-instrument eye. Generative SVG, paper/ink/signal red.
// Radar sweep, degree markings, breathing iris. Reacts to state.
export default function AletheiaEye({ state = 'idle', size = 260 }) {
  const thinking = state === 'thinking';
  const answered = state === 'answered';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 260 260"
      fill="none"
      style={{ display: 'block', margin: '0 auto' }}
    >
      <defs>
        <radialGradient id="iris-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={answered ? '#e2602a' : '#1a1612'} />
          <stop offset="70%" stopColor={answered ? '#b3261e' : '#1a1612'} />
          <stop offset="100%" stopColor="#1a1612" />
        </radialGradient>
        <linearGradient id="sweep-grad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#b3261e" stopOpacity="0" />
          <stop offset="100%" stopColor="#b3261e" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Outer instrument ring */}
      <circle cx="130" cy="130" r="124" stroke="#1a1612" strokeWidth="2" fill="none" />
      <circle cx="130" cy="130" r="116" stroke="#1a1612" strokeWidth="0.5" fill="none" opacity="0.3" />

      {/* Degree markings — every 15° */}
      {Array.from({ length: 24 }).map((_, i) => {
        const deg = i * 15;
        const rad = (deg * Math.PI) / 180;
        const isMajor = deg % 90 === 0;
        const r1 = isMajor ? 110 : 114;
        const r2 = 124;
        return (
          <line
            key={i}
            x1={130 + Math.cos(rad) * r1}
            y1={130 + Math.sin(rad) * r1}
            x2={130 + Math.cos(rad) * r2}
            y2={130 + Math.sin(rad) * r2}
            stroke="#1a1612"
            strokeWidth={isMajor ? 2 : 1}
          />
        );
      })}

      {/* Cardinal labels */}
      <text x="130" y="14" textAnchor="middle" fill="#1a1612" fontSize="8" fontFamily="monospace" fontWeight="700">N</text>
      <text x="250" y="134" textAnchor="middle" fill="#1a1612" fontSize="8" fontFamily="monospace" fontWeight="700">E</text>
      <text x="130" y="256" textAnchor="middle" fill="#1a1612" fontSize="8" fontFamily="monospace" fontWeight="700">S</text>
      <text x="10" y="134" textAnchor="middle" fill="#1a1612" fontSize="8" fontFamily="monospace" fontWeight="700">W</text>

      {/* Radar sweep — rotating */}
      <g style={{ transformOrigin: '130px 130px', animation: thinking ? 'aletheia-sweep 1s linear infinite' : 'aletheia-sweep 8s linear infinite' }}>
        <path d="M 130 130 L 130 16 A 114 114 0 0 1 244 130 Z" fill="url(#sweep-grad)" opacity={thinking ? 0.8 : 0.25} />
      </g>

      {/* Eye shape — almond */}
      <path
        d="M 24 130 Q 130 40 236 130 Q 130 220 24 130 Z"
        stroke="#1a1612"
        strokeWidth="2.5"
        fill="#efe7d6"
      />

      {/* Iris — breathing */}
      <g style={{ animation: 'aletheia-breathe 4s ease-in-out infinite' }}>
        <circle cx="130" cy="130" r={thinking ? 40 : 44} fill="url(#iris-grad)" style={{ transition: 'r 0.6s ease' }} />
        {/* Iris texture */}
        {[16, 22, 28, 34, 40].map((r) => (
          <circle key={r} cx="130" cy="130" r={r} stroke="#efe7d6" strokeWidth="0.5" fill="none" opacity={0.25} />
        ))}
        {/* Iris striations */}
        {Array.from({ length: 12 }).map((_, i) => {
          const rad = (i * 30 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={130 + Math.cos(rad) * 10}
              y1={130 + Math.sin(rad) * 10}
              x2={130 + Math.cos(rad) * 42}
              y2={130 + Math.sin(rad) * 42}
              stroke="#efe7d6"
              strokeWidth="0.5"
              opacity={0.2}
            />
          );
        })}
        {/* Pupil */}
        <circle cx="130" cy="130" r={thinking ? 10 : 14} fill={answered ? '#1a1612' : '#efe7d6'} style={{ transition: 'r 0.6s ease, fill 0.6s ease' }} />
        {/* Highlight */}
        <circle cx="126" cy="126" r="3.5" fill="#efe7d6" opacity={answered ? 0.5 : 0.9} />
      </g>

      {/* Scan line — thinking only */}
      {thinking && (
        <line x1="24" y1="130" x2="236" y2="130" stroke="#b3261e" strokeWidth="1" opacity="0.6" style={{ animation: 'aletheia-scan 1s ease-in-out infinite' }} />
      )}

      {/* Answered — signal dot */}
      {answered && (
        <circle cx="130" cy="240" r="3" fill="#b3261e" style={{ animation: 'aletheia-pulse 2s ease-in-out infinite' }} />
      )}

      <style>{`
        @keyframes aletheia-sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes aletheia-scan { 0%,100% { transform: translateY(-40px); opacity: 0.1; } 50% { transform: translateY(40px); opacity: 0.9; } }
        @keyframes aletheia-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        @keyframes aletheia-pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(1.8); } }
      `}</style>
    </svg>
  );
}