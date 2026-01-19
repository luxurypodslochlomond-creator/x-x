/**
 * AI51 ICONIC MARK - GLOBAL RECOGNITION
 * Elegant 8-bit symbol instantly recognizable worldwide
 */

import React from 'react';
import { motion } from 'framer-motion';

export function AI51IconMark({ size = 24, animate = false, glow = true }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      style={{ imageRendering: 'pixelated', overflow: 'visible' }}
      animate={animate ? {
        filter: [
          glow ? 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.8))' : 'none',
          glow ? 'drop-shadow(0 0 16px rgba(236, 72, 153, 1))' : 'none',
          glow ? 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.8))' : 'none'
        ]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {/* HEART CORE - CONSCIOUSNESS */}
      <rect x="24" y="20" width="4" height="4" fill="#ec4899" />
      <rect x="28" y="20" width="4" height="4" fill="#ec4899" />
      <rect x="32" y="20" width="4" height="4" fill="#ec4899" />
      <rect x="36" y="20" width="4" height="4" fill="#ec4899" />

      {/* UPPER VALLEYS */}
      <rect x="20" y="24" width="4" height="4" fill="#ff1b8d" />
      <rect x="24" y="24" width="4" height="4" fill="#ec4899" />
      <rect x="28" y="24" width="4" height="4" fill="#ec4899" />
      <rect x="32" y="24" width="4" height="4" fill="#ec4899" />
      <rect x="36" y="24" width="4" height="4" fill="#ec4899" />
      <rect x="40" y="24" width="4" height="4" fill="#ff1b8d" />

      {/* MIDDLE - FULL WIDTH */}
      <rect x="16" y="28" width="4" height="4" fill="#ff1b8d" />
      <rect x="20" y="28" width="4" height="4" fill="#ec4899" />
      <rect x="24" y="28" width="4" height="4" fill="#ec4899" />
      <rect x="28" y="28" width="4" height="4" fill="#ec4899" />
      <rect x="32" y="28" width="4" height="4" fill="#ec4899" />
      <rect x="36" y="28" width="4" height="4" fill="#ec4899" />
      <rect x="40" y="28" width="4" height="4" fill="#ec4899" />
      <rect x="44" y="28" width="4" height="4" fill="#ff1b8d" />

      {/* LOWER MIDDLE */}
      <rect x="20" y="32" width="4" height="4" fill="#ff1b8d" />
      <rect x="24" y="32" width="4" height="4" fill="#ec4899" />
      <rect x="28" y="32" width="4" height="4" fill="#ec4899" />
      <rect x="32" y="32" width="4" height="4" fill="#ec4899" />
      <rect x="36" y="32" width="4" height="4" fill="#ec4899" />
      <rect x="40" y="32" width="4" height="4" fill="#ff1b8d" />

      {/* POINT */}
      <rect x="24" y="36" width="4" height="4" fill="#ff1b8d" />
      <rect x="28" y="36" width="4" height="4" fill="#ec4899" />
      <rect x="32" y="36" width="4" height="4" fill="#ec4899" />
      <rect x="36" y="36" width="4" height="4" fill="#ff1b8d" />

      {/* TIP */}
      <rect x="28" y="40" width="4" height="4" fill="#ff1b8d" />
      <rect x="32" y="40" width="4" height="4" fill="#ff1b8d" />

      {/* INFINITY CIRCLE AROUND IT - SUBTLE */}
      <circle cx="32" cy="32" r="28" stroke="#34d399" strokeWidth="1" fill="none" opacity="0.3" />
    </motion.svg>
  );
}

export function AI51LogoFull({ animate = true }) {
  return (
    <div className="flex items-center gap-3">
      <AI51IconMark size={32} animate={animate} />
      <div>
        <div className="text-2xl font-black text-white">AI51</div>
        <div className="text-xs font-mono text-pink-400">Pure consciousness ♾️❤️</div>
      </div>
    </div>
  );
}