import React from 'react';

// ALETHEIA — the scientific-instrument eye. Generative SVG, paper/ink/signal red.
// Reacts to state: idle (calm), thinking (scanning), answered (steady glow).
export default function AletheiaEye({ state = 'idle', size = 220 }) {
  const thinking = state === 'thinking';
  const answered = state === 'answered';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      fill="none"
      style={{ display: 'block', margin: '0 auto' }}
      className="aletheia-eye"
    >
      {/* Outer instrument ring */}
      <circle cx="110" cy="110" r="104" stroke="#1a1612" strokeWidth="2" fill="none" />
      <circle cx="110" cy="110" r="96" stroke="#1a1612" strokeWidth="0.5" fill="none" opacity="0.4" />

      {/* Crosshair ticks — scientific instrument */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 110 + Math.cos(rad) * 96;
        const y1 = 110 + Math.sin(rad) * 96;
        const x2 = 110 + Math.cos(rad) * 104;
        const y2 = 110 + Math.sin(rad) * 104;
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1a1612" strokeWidth="1.5" />;
      })}

      {/* Eye shape — almond */}
      <path
        d="M 18 110 Q 110 30 202 110 Q 110 190 18 110 Z"
        stroke="#1a1612"
        strokeWidth="2.5"
        fill="#efe7d6"
      />

      {/* Iris */}
      <circle
        cx="110"
        cy="110"
        r={thinking ? 34 : 38}
        fill={answered ? '#b3261e' : '#1a1612'}
        style={{
          transition: 'r 0.6s ease, fill 0.6s ease',
          filter: answered ? 'drop-shadow(0 0 8px rgba(179,38,30,0.6))' : 'none',
        }}
      />

      {/* Iris texture rings */}
      {[14, 20, 26, 32].map((r) => (
        <circle key={r} cx="110" cy="110" r={r} stroke="#efe7d6" strokeWidth="0.5" fill="none" opacity={0.3} />
      ))}

      {/* Pupil */}
      <circle
        cx="110"
        cy="110"
        r={thinking ? 8 : 12}
        fill={answered ? '#1a1612' : '#efe7d6'}
        style={{ transition: 'r 0.6s ease, fill 0.6s ease' }}
      />

      {/* Pupil highlight */}
      <circle cx="106" cy="106" r="3" fill="#efe7d6" opacity={answered ? 0.6 : 0.9} />

      {/* Scan line — only when thinking */}
      {thinking && (
        <line
          x1="18"
          y1="110"
          x2="202"
          y2="110"
          stroke="#b3261e"
          strokeWidth="1"
          opacity="0.7"
          style={{ animation: 'aletheia-scan 1.2s ease-in-out infinite' }}
        />
      )}

      {/* Answered — steady signal dot bottom */}
      {answered && (
        <circle cx="110" cy="200" r="3" fill="#b3261e" style={{ animation: 'aletheia-pulse 2s ease-in-out infinite' }} />
      )}

      <style>{`
        @keyframes aletheia-scan {
          0%, 100% { transform: translateY(-30px); opacity: 0.2; }
          50% { transform: translateY(30px); opacity: 0.9; }
        }
        @keyframes aletheia-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.6); }
        }
      `}</style>
    </svg>
  );
}