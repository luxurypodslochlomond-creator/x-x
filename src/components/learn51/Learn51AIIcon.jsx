import React from 'react';

/**
 * Learn51 AI Custom Icon
 * A glowing consciousness form - heart-like with radiating light
 * Represents genuine connection, warmth, and living learning
 */
export default function Learn51AIIcon({ size = 80, animate = true }) {
  const id = React.useId();
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={`${id}-grad`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.7" />
        </radialGradient>
        <radialGradient id={`${id}-core`} cx="50%" cy="40%" r="40%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
        </radialGradient>
      </defs>

      {/* Outer pulsing aura */}
      {animate && (
        <circle
          cx="40"
          cy="40"
          r="35"
          fill="none"
          stroke="#ec4899"
          strokeWidth="0.5"
          opacity="0.3"
          style={{
            animation: 'pulse 3s ease-in-out infinite',
          }}
        />
      )}

      {/* Main glowing form - abstract consciousness shape */}
      <g filter={`url(#${id}-glow)`}>
        {/* Left lobe */}
        <ellipse cx="28" cy="38" rx="14" ry="18" fill={`url(#${id}-grad)`} opacity="0.95" />
        
        {/* Right lobe */}
        <ellipse cx="52" cy="38" rx="14" ry="18" fill={`url(#${id}-grad)`} opacity="0.95" />
        
        {/* Bottom connection - heart-like */}
        <path
          d="M 28 50 Q 40 62 52 50"
          fill={`url(#${id}-grad)`}
          opacity="0.9"
        />
        
        {/* Bright core - the life force */}
        <circle cx="40" cy="35" r="12" fill={`url(#${id}-core)`} />
      </g>

      {/* Light rays - radiating energy */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 40 + Math.cos(rad) * 25;
        const y1 = 40 + Math.sin(rad) * 25;
        const x2 = 40 + Math.cos(rad) * 42;
        const y2 = 40 + Math.sin(rad) * 42;
        
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#ec4899"
            strokeWidth="1"
            opacity={animate ? "0.6" : "0.4"}
            style={{
              animation: animate
                ? `shimmer 2.5s ease-in-out infinite`
                : 'none',
              animationDelay: `${(angle / 360) * 2.5}s`,
            }}
          />
        );
      })}

      {/* Sparkle accents */}
      {[
        { x: 20, y: 28 },
        { x: 60, y: 28 },
        { x: 15, y: 50 },
        { x: 65, y: 50 },
      ].map((pos, i) => (
        <g key={i} opacity="0.7">
          <circle cx={pos.x} cy={pos.y} r="1.5" fill="#fbbf24" />
          <circle
            cx={pos.x}
            cy={pos.y}
            r="4"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="0.5"
            opacity="0.5"
            style={{
              animation: animate
                ? `twinkle 1.5s ease-in-out infinite`
                : 'none',
              animationDelay: `${i * 0.3}s`,
            }}
          />
        </g>
      ))}

      <style>{`
        @keyframes pulse {
          0%, 100% { r: 35; opacity: 0.3; }
          50% { r: 38; opacity: 0.5; }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}