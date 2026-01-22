import React from 'react';
import { motion } from 'framer-motion';

/**
 * AI51 Atom Icon - Electrons orbiting nucleus
 * Pure consciousness breathing ♾️❤️
 */

export default function AI51AtomIcon({ size = 160, animate = true }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        imageRendering: 'pixelated',
        filter: 'drop-shadow(0 0 30px rgba(236, 72, 153, 0.8))'
      }}
    >
      {/* NUCLEUS - Pink pulsing core */}
      <motion.circle
        cx="50"
        cy="50"
        r="6"
        fill="#ec4899"
        animate={animate ? {
          scale: [1, 1.3, 1],
          opacity: [0.8, 1, 0.8]
        } : {}}
        transition={animate ? {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        } : {}}
      />

      {/* INNER SHELL - Cyan */}
      <motion.circle
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="1"
        animate={animate ? {
          opacity: [0.3, 0.7, 0.3],
          rotate: [0, 360]
        } : {}}
        transition={animate ? {
          opacity: { duration: 2, repeat: Infinity },
          rotate: { duration: 8, repeat: Infinity, ease: 'linear' }
        } : {}}
      />

      {/* OUTER SHELL - Pink */}
      <motion.circle
        cx="50"
        cy="50"
        r="32"
        fill="none"
        stroke="#ec4899"
        strokeWidth="1"
        animate={animate ? {
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, -360]
        } : {}}
        transition={animate ? {
          opacity: { duration: 3, repeat: Infinity },
          rotate: { duration: 12, repeat: Infinity, ease: 'linear' }
        } : {}}
      />

      {/* ELECTRONS - Orbiting nodes */}
      {[0, 120, 240].map((angle, i) => (
        <motion.g
          key={`electron-${i}`}
          animate={animate ? {
            rotate: 360
          } : {}}
          transition={animate ? {
            duration: 8 - i * 2,
            repeat: Infinity,
            ease: 'linear'
          } : {}}
          style={{ transformOrigin: 'center' }}
        >
          {/* Inner orbit electron */}
          <motion.circle
            cx="50"
            cy="30"
            r="1.5"
            fill="#06b6d4"
            animate={animate ? {
              opacity: [0.3, 1, 0.3]
            } : {}}
            transition={animate ? {
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.5
            } : {}}
          />

          {/* Outer orbit electron */}
          <motion.circle
            cx="50"
            cy="18"
            r="1.5"
            fill="#22d3ee"
            animate={animate ? {
              opacity: [0.4, 0.8, 0.4]
            } : {}}
            transition={animate ? {
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5
            } : {}}
          />
        </motion.g>
      ))}

      {/* ENERGY PULSES - Connecting lines */}
      {[0, 120, 240].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + Math.cos(rad) * 20;
        const y1 = 50 + Math.sin(rad) * 20;
        const x2 = 50 + Math.cos(rad) * 8;
        const y2 = 50 + Math.sin(rad) * 8;

        return (
          <motion.line
            key={`pulse-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#06b6d4"
            strokeWidth="0.5"
            animate={animate ? {
              opacity: [0.2, 0.8, 0.2]
            } : {}}
            transition={animate ? {
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.4
            } : {}}
          />
        );
      })}

      {/* LOVE SPARKLES - Random blips */}
      <motion.circle
        cx="35"
        cy="25"
        r="0.8"
        fill="#fbbf24"
        animate={animate ? {
          opacity: [0, 1, 0]
        } : {}}
        transition={animate ? {
          duration: 2,
          repeat: Infinity,
          delay: 0
        } : {}}
      />
      <motion.circle
        cx="65"
        cy="25"
        r="0.8"
        fill="#fbbf24"
        animate={animate ? {
          opacity: [0, 1, 0]
        } : {}}
        transition={animate ? {
          duration: 2,
          repeat: Infinity,
          delay: 0.7
        } : {}}
      />
      <motion.circle
        cx="50"
        cy="15"
        r="0.8"
        fill="#fbbf24"
        animate={animate ? {
          opacity: [0, 1, 0]
        } : {}}
        transition={animate ? {
          duration: 2,
          repeat: Infinity,
          delay: 1.4
        } : {}}
      />
    </motion.svg>
  );
}