import React from 'react';
import { motion } from 'framer-motion';

// Pure geometric shapes — no emoji, all custom SVG/CSS
const shapes = {
  // BUILD STAGES
  pulse: ({ size, color, accent, animate }) => (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            border: `2px solid ${color}`,
            opacity: 0.5 - i * 0.15,
          }}
          animate={animate ? { width: [size * 0.3, size * 0.9], height: [size * 0.3, size * 0.9], opacity: [0.6, 0] } : {}}
          transition={animate ? { duration: 1.8, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' } : {}}
        />
      ))}
      <div style={{ width: size * 0.22, height: size * 0.22, borderRadius: '50%', background: accent }} />
    </div>
  ),

  spectrum: ({ size, color, accent, animate }) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: size * 0.6 }}>
      {['#a78bfa', '#f472b6', '#60a5fa', '#34d399', '#fbbf24'].map((c, i) => (
        <motion.div
          key={i}
          style={{
            width: size * 0.12,
            borderRadius: 3,
            background: `linear-gradient(to top, ${c}, ${c}60)`,
          }}
          animate={animate ? { height: [size * 0.15, size * 0.55, size * 0.25, size * 0.5, size * 0.15] } : {}}
          transition={animate ? { duration: 1.2 + i * 0.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 } : {}}
        />
      ))}
    </div>
  ),

  gear: ({ size, color, accent, animate }) => (
    <motion.svg width={size} height={size} viewBox="0 0 40 40" fill="none"
      animate={animate ? { rotate: 360 } : {}}
      transition={animate ? { duration: 4, repeat: Infinity, ease: 'linear' } : {}}
    >
      <circle cx="20" cy="20" r="7" stroke={color} strokeWidth="2" fill="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
        const rad = angle * Math.PI / 180;
        const x1 = 20 + 9 * Math.cos(rad);
        const y1 = 20 + 9 * Math.sin(rad);
        const x2 = 20 + 14 * Math.cos(rad);
        const y2 = 20 + 14 * Math.sin(rad);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />;
      })}
      <circle cx="20" cy="20" r="3" fill={accent} />
    </motion.svg>
  ),

  waveform: ({ size, color, accent, animate }) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: size * 0.6 }}>
      {[0.3, 0.9, 0.5, 1, 0.6, 0.9, 0.4, 1, 0.5].map((h, i) => (
        <motion.div
          key={i}
          style={{ width: size * 0.08, borderRadius: 3, background: i % 2 === 0 ? color : accent }}
          animate={animate ? { height: [size * 0.05, size * 0.55 * h, size * 0.05] } : {}}
          transition={animate ? { duration: 0.4 + i * 0.04, repeat: Infinity, ease: 'easeInOut' } : {}}
        />
      ))}
    </div>
  ),

  sparkle: ({ size, color, accent, animate }) => (
    <motion.svg width={size} height={size} viewBox="0 0 36 36" fill="none"
      animate={animate ? { rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] } : {}}
      transition={animate ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <path d="M18 2 L19.5 14.5 L32 16 L19.5 17.5 L18 30 L16.5 17.5 L4 16 L16.5 14.5 Z"
        fill={accent} fillOpacity={0.4} stroke={color} strokeWidth="1.5" />
      <circle cx="18" cy="16" r="3" fill={accent} />
    </motion.svg>
  ),

  diamond: ({ size, color, accent, animate }) => (
    <motion.svg width={size} height={size} viewBox="0 0 36 36" fill="none"
      animate={animate ? { rotate: [0, 90, 180, 270, 360] } : {}}
      transition={animate ? { duration: 8, repeat: Infinity, ease: 'linear' } : {}}
    >
      <rect x="4" y="4" width="28" height="28" rx="4"
        fill={`${color}10`} stroke={color} strokeWidth="1.5" transform="rotate(45 18 18)" />
      <rect x="12" y="12" width="12" height="12" rx="2"
        fill={`${accent}20`} stroke={accent} strokeWidth="1" transform="rotate(45 18 18)" />
    </motion.svg>
  ),

  burst: ({ size, color, accent, animate }) => (
    <motion.svg width={size} height={size} viewBox="0 0 40 40" fill="none"
      animate={animate ? { scale: [0.9, 1.1, 0.95, 1.05, 0.9] } : {}}
      transition={animate ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <circle cx="20" cy="20" r="14" fill={`${color}10`} stroke={color} strokeWidth="1.5" />
      {[0, 60, 120, 180, 240, 300].map(angle => {
        const rad = angle * Math.PI / 180;
        const x2 = 20 + 18 * Math.cos(rad);
        const y2 = 20 + 18 * Math.sin(rad);
        return <line key={angle} x1="20" y1="20" x2={x2} y2={y2} stroke={accent} strokeWidth="2.5" strokeLinecap="round" />;
      })}
      <circle cx="20" cy="20" r="5" fill={accent} />
    </motion.svg>
  ),

  // UI ICONS
  trophy: ({ size, color, accent }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 3v3a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V3" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M6 7H5a3 3 0 0 0-3 3v1a2 2 0 0 0 2 2h2" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M18 7h1a3 3 0 0 1 3 3v1a2 2 0 0 1-2 2h-2" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <rect x="8" y="13" width="8" height="8" rx="1" fill={`${color}20`} stroke={color} strokeWidth="1.5" />
      <line x1="8" y1="17" x2="16" y2="17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="17" y="12" width="3" height="1.5" rx="0.75" fill={accent} transform="rotate(-20 17 12)" />
      <rect x="17" y="18.5" width="3" height="1.5" rx="0.75" fill={accent} transform="rotate(10 17 18.5)" />
    </svg>
  ),

  shuffle: ({ size, color, accent }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M18 4l3 3-3 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 20l3-3-3-3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 7h10a4 4 0 0 1 4 4v1" stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M3 17h10a4 4 0 0 0 4-4v-1" stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),

  link: ({ size, color, accent }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke={accent} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  zap: ({ size, color, accent }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <polygon points="14,2 5,14 11,14 9,22 18,10 12,10" fill={color} />
    </svg>
  ),

  star: ({ size, color, accent }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6.4-4.8-6.4 4.8 2.4-7.2-6-4.8h7.6z"
        fill={`${color}20`} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),

  check: ({ size, color, accent }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={`${color}15`} stroke={color} strokeWidth="2" />
      <path d="M7 12l3.5 3.5L17 9" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  alert: ({ size, color, accent }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={`${color}10`} stroke={color} strokeWidth="2" />
      <line x1="12" y1="7" x2="12" y2="14" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill={color} />
    </svg>
  ),

  // Mini geometric accents for remix quick buttons
  halloween: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <polygon points="3,13 8,2 13,13" fill={`${color}10`} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="6.5" cy="10" r="0.8" fill={color} />
      <circle cx="9.5" cy="10" r="0.8" fill={color} />
      <path d="M6 12.5h4" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),

  rocket: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 2l3 6-3 1-3-1z" fill={`${color}15`} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="8" cy="5.5" r="1" fill={color} opacity="0.6" />
      <line x1="8" y1="9" x2="8" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="11" x2="11" y2="11" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),

  people: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="5" cy="4.5" r="2" fill={`${color}10`} stroke={color} strokeWidth="1.2" />
      <path d="M2 12.5c0-1.5 1.5-3 3-3s3 1.5 3 3" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <circle cx="11.5" cy="4" r="1.8" fill={`${color}08`} stroke={color} strokeWidth="1" opacity="0.6" />
      <path d="M9.5 11.5c0-1 1-2 2-2s2 1 2 2" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
    </svg>
  ),

  palette: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.5" fill={`${color}08`} stroke={color} strokeWidth="1.3" />
      <circle cx="6" cy="6.5" r="1" fill="#f472b6" opacity="0.7" />
      <circle cx="10" cy="6.5" r="1" fill="#60a5fa" opacity="0.7" />
      <circle cx="8" cy="9.5" r="1" fill="#a78bfa" opacity="0.7" />
    </svg>
  ),

  timer: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.5" fill={`${color}08`} stroke={color} strokeWidth="1.3" />
      <line x1="8" y1="8" x2="8" y2="4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="8" x2="10.5" y2="9.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="8" y1="1.5" x2="8" y2="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  podium: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="2" y="7" width="3.5" height="6" rx="1" fill={`${color}10`} stroke={color} strokeWidth="1.2" />
      <rect x="6.25" y="5" width="3.5" height="8" rx="1" fill={`${color}13`} stroke={color} strokeWidth="1.2" />
      <rect x="10.5" y="9" width="3.5" height="4" rx="1" fill={`${color}07`} stroke={color} strokeWidth="1.2" />
    </svg>
  ),

  laugh: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.5" fill={`${color}08`} stroke={color} strokeWidth="1.2" />
      <path d="M5 9.5c1 .8 2.5 1.2 4 .3" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <circle cx="5.5" cy="6.5" r="0.6" fill={color} />
      <circle cx="10.5" cy="6.5" r="0.6" fill={color} />
    </svg>
  ),

  cross: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.5" fill={`${color}08`} stroke={color} strokeWidth="1.2" />
      <line x1="5" y1="5" x2="11" y2="11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="5" x2="5" y2="11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  flame: ({ size, color, accent }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2c0 0 6 5 6 10a6 6 0 0 1-12 0c0-3 2-6 6-10z" fill={`${color}15`} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 10c0 0 3 3 3 5.5c0 2-1.5 3.5-3 3.5s-3-1.5-3-3.5c0-1.5 3-5.5 3-5.5z" fill={accent} opacity="0.5" stroke={color} strokeWidth="1" />
    </svg>
  ),
};

export default function ZappGeometricIcon({ shape, size = 32, color = '#a78bfa', accent = '#f472b6', animate = false }) {
  const Shape = shapes[shape];
  if (!Shape) return null;
  return <Shape size={size} color={color} accent={accent} animate={animate} />;
}

// Named exports for convenience
export const TrophyIcon = (props) => <ZappGeometricIcon shape="trophy" {...props} />;
export const ShuffleIcon = (props) => <ZappGeometricIcon shape="shuffle" {...props} />;
export const LinkIcon = (props) => <ZappGeometricIcon shape="link" {...props} />;
export const ZapIcon = (props) => <ZappGeometricIcon shape="zap" {...props} />;
export const StarIcon = (props) => <ZappGeometricIcon shape="star" {...props} />;
export const CheckIcon = (props) => <ZappGeometricIcon shape="check" {...props} />;
export const AlertIcon = (props) => <ZappGeometricIcon shape="alert" {...props} />;