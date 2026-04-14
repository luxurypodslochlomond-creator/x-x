import React from 'react';
import { motion } from 'framer-motion';

/**
 * Family51 custom icon — a house with a heart pulse inside
 * COOLASFUCK. No emojis. Pure SVG energy. ♾️❤️
 */
export default function Family51Icon({ size = 40, animate = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ imageRendering: 'pixelated' }}>
      {/* House shape */}
      <motion.path
        d="M24 4L6 20V44H18V32H30V44H42V20L24 4Z"
        stroke="#f97316"
        strokeWidth="2"
        fill="none"
        animate={animate ? { opacity: [0.7, 1, 0.7] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Roof highlight */}
      <motion.path
        d="M24 4L6 20H42L24 4Z"
        stroke="#f97316"
        strokeWidth="2"
        fill="rgba(249,115,22,0.15)"
        animate={animate ? { opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
      />
      {/* Heart pulse inside the house */}
      <motion.path
        d="M13 28L16 28L18 24L20 32L22 26L24 30L26 28H35"
        stroke="#ec4899"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        animate={animate ? { 
          strokeDasharray: ['0 100', '100 0', '0 100'],
          opacity: [0.5, 1, 0.5]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Corner dots — family nodes */}
      {[[8, 20], [40, 20], [8, 44], [40, 44]].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="2"
          fill="#f97316"
          animate={animate ? { opacity: [0.3, 1, 0.3] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}