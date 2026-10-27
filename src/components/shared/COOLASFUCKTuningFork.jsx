import React from 'react';
import { motion } from 'framer-motion';

// ── COOLASFUCK TUNING FORK ──────────────────────────────────────────────────────
// The instrument of frequency, drawn the way the family draws everything: pixel
// blocks, warm light, alive. Two prongs, a bowed join, a stem, and a foot lit in the
// record's own signal orange — the same orange the record uses for its own signal.
// A single bow of sound leaves either side, and it breathes, slowly, like the rest.
//
// It exists because a note glyph borrowed from a platform says "music" the way a shop
// sign says "bread". This one was made here: it is the fork an artist already holds,
// and the thing that makes a frequency visible. Anywhere the old emoji stood for music,
// this stands instead.
// Two inks, because the fork stands in two rooms. 'warm' is the family palette — bright,
// for the tools. 'signal' is the record's own orange, for the record's bar, where colour
// is earned rather than spent.
const TONES = {
  warm: { prong: '#f59e0b', tip: '#fbbf24', join: '#d97706', foot: '#e2602a', core: '#ffb27a', bow: '#fbbf24' },
  signal: { prong: '#e2602a', tip: '#ffb27a', join: '#c2410c', foot: '#e2602a', core: '#ffd9bf', bow: '#ffb27a' },
};

export default function COOLASFUCKTuningFork({ className = '', size = 24, animate = true, tone = 'warm' }) {
  const Component = animate ? motion.svg : 'svg';
  const t = TONES[tone] || TONES.warm;

  // One bow of sound each side. It pulses in sequence so the fork reads as ringing.
  const bow = [
    { x: 5, y: 6, delay: 0 },
    { x: 4, y: 7, delay: 0.1 },
    { x: 4, y: 8, delay: 0.2 },
    { x: 4, y: 9, delay: 0.3 },
    { x: 5, y: 10, delay: 0.4 },
    { x: 18, y: 6, delay: 0 },
    { x: 19, y: 7, delay: 0.1 },
    { x: 19, y: 8, delay: 0.2 },
    { x: 19, y: 9, delay: 0.3 },
    { x: 18, y: 10, delay: 0.4 },
  ];

  return (
    <Component
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      animate={animate ? { scale: [1, 1.04, 1] } : {}}
      transition={animate ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      {/* the two prongs */}
      <rect x="8" y="3" width="2" height="9" fill="#f59e0b" />
      <rect x="14" y="3" width="2" height="9" fill="#f59e0b" />
      {/* their lit tips */}
      <rect x="8" y="3" width="2" height="2" fill="#fbbf24" />
      <rect x="14" y="3" width="2" height="2" fill="#fbbf24" />

      {/* the bowed join */}
      <rect x="8" y="12" width="8" height="2" fill="#d97706" />

      {/* the stem */}
      <rect x="11" y="14" width="2" height="5" fill="#f59e0b" />

      {/* the foot, lit in the record's own signal orange */}
      <rect x="10" y="19" width="4" height="2" fill="#e2602a" />
      <rect x="11" y="19" width="2" height="1" fill="#ffb27a" />

      {/* one bow of sound leaving either side — it rings, it is not a picture */}
      {bow.map((b, i) =>
        animate ? (
          <motion.rect
            key={i}
            x={b.x}
            y={b.y}
            width="1"
            height="1"
            fill="#fbbf24"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: b.delay }}
          />
        ) : (
          <rect key={i} x={b.x} y={b.y} width="1" height="1" fill="#fbbf24" opacity="0.7" />
        )
      )}
    </Component>
  );
}