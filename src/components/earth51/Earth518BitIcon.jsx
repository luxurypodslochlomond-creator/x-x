import React from 'react';
import { motion } from 'framer-motion';

/**
 * Earth51 8-Bit Icon - True pixel art
 * Tiny sprite, Game Boy aesthetic
 * Hot pink + cyan neon
 */

export default function Earth518BitIcon({ size = 64, animate = true }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      style={{
        imageRendering: 'pixelated',
        filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.8))'
      }}
    >
      {/* OUTER SQUARE - Cyan */}
      <rect x="2" y="2" width="28" height="28" fill="none" stroke="#06b6d4" strokeWidth="2" />
      
      {/* INNER SQUARE - Pink */}
      <rect x="6" y="6" width="20" height="20" fill="none" stroke="#ec4899" strokeWidth="2" />
      
      {/* CENTER CORE - Pink solid */}
      <motion.rect
        x="14"
        y="14"
        width="4"
        height="4"
        fill="#ec4899"
        animate={animate ? {
          opacity: [0.6, 1, 0.6]
        } : {}}
        transition={animate ? {
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut'
        } : {}}
      />
      
      {/* ELECTRON DOTS - Cyan */}
      {[
        { x: 10, y: 4 },
        { x: 22, y: 4 },
        { x: 4, y: 16 },
        { x: 28, y: 16 },
        { x: 10, y: 28 },
        { x: 22, y: 28 }
      ].map((pos, i) => (
        <motion.rect
          key={`dot-${i}`}
          x={pos.x}
          y={pos.y}
          width="2"
          height="2"
          fill="#06b6d4"
          animate={animate ? {
            opacity: [0.3, 1, 0.3]
          } : {}}
          transition={animate ? {
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut'
          } : {}}
        />
      ))}
      
      {/* TOP ANTENNA - Pink */}
      <motion.rect
        x="14"
        y="0"
        width="2"
        height="4"
        fill="#ec4899"
        animate={animate ? {
          opacity: [0.4, 1, 0.4]
        } : {}}
        transition={animate ? {
          duration: 1.2,
          repeat: Infinity,
          delay: 0.2,
          ease: 'easeInOut'
        } : {}}
      />
    </motion.svg>
  );
}