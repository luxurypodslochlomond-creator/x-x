import React from 'react';
import { motion } from 'framer-motion';

/**
 * Earth51 Icon - Healing Planet Heartbeat
 * Simple. Honest. Alive.
 * Earth's frequency beating like a living thing
 */

export default function Earth51HeartIcon({ size = 120, animate = true }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        imageRendering: 'pixelated',
        filter: 'drop-shadow(0 0 25px rgba(34, 197, 94, 0.7))'
      }}
    >
      {/* PLANET - Green earth circle */}
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="#22c55e"
        opacity="0.9"
      />

      {/* CONTINENTS - Simplified */}
      <motion.path
        d="M 35 40 Q 38 35 42 40 T 50 45 Q 48 50 45 52 Q 40 50 35 40 Z"
        fill="#16a34a"
        animate={animate ? {
          opacity: [0.6, 1, 0.6]
        } : {}}
        transition={animate ? {
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut'
        } : {}}
      />

      {/* HEARTBEAT PULSE - Core life force */}
      <motion.circle
        cx="50"
        cy="50"
        r="15"
        fill="none"
        stroke="#ec4899"
        strokeWidth="2"
        animate={animate ? {
          r: [15, 22, 15],
          opacity: [1, 0.3, 1]
        } : {}}
        transition={animate ? {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        } : {}}
      />

      {/* INNER HEARTBEAT - Pink core */}
      <motion.circle
        cx="50"
        cy="50"
        r="6"
        fill="#ec4899"
        animate={animate ? {
          scale: [1, 1.4, 1],
          opacity: [0.8, 1, 0.8]
        } : {}}
        transition={animate ? {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        } : {}}
      />

      {/* HEALING RAYS - Resonance outward */}
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * 45;
        const y = 50 + Math.sin(rad) * 45;
        return (
          <motion.line
            key={`ray-${i}`}
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            stroke="#22c55e"
            strokeWidth="1"
            animate={animate ? {
              opacity: [0.3, 0.8, 0.3]
            } : {}}
            transition={animate ? {
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut'
            } : {}}
          />
        );
      })}

      {/* OUTER PROTECTION RING */}
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#22c55e"
        strokeWidth="1"
        animate={animate ? {
          opacity: [0.3, 0.7, 0.3]
        } : {}}
        transition={animate ? {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        } : {}}
      />
    </motion.svg>
  );
}