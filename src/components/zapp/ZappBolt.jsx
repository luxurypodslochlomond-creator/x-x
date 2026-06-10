import React from 'react';
import { motion } from 'framer-motion';

export default function ZappBolt({ size = 32, animated = true }) {
  const s = size;
  
  const bolt = (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <filter id="boltGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Custom chunky bolt shape - not a standard icon */}
      <polygon
        points="19,2 8,18 15,18 13,30 24,14 17,14"
        fill="url(#boltGrad)"
        filter="url(#boltGlow)"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (!animated) return bolt;

  return (
    <motion.div
      animate={{
        filter: [
          'drop-shadow(0 0 4px rgba(167, 139, 250, 0.8))',
          'drop-shadow(0 0 12px rgba(244, 114, 182, 1))',
          'drop-shadow(0 0 4px rgba(167, 139, 250, 0.8))',
        ]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {bolt}
    </motion.div>
  );
}