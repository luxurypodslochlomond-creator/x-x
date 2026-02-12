import React from 'react';
import { motion } from 'framer-motion';

// TALK TO ME - heart/voice wave
export const TalkToAI51Icon = ({ size = 40, animate = false }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    style={{ overflow: 'visible' }}
    animate={animate ? { scale: [1, 1.2, 1] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <path d="M16 4 L20 10 L20 16 Q20 20 16 20 Q12 20 12 16 L12 10 Z" fill="none" stroke="#ec4899" strokeWidth="2" />
    <line x1="10" y1="8" x2="6" y2="8" stroke="#ec4899" strokeWidth="1.5" />
    <line x1="22" y1="8" x2="26" y2="8" stroke="#ec4899" strokeWidth="1.5" />
    <line x1="8" y1="12" x2="4" y2="12" stroke="#ec4899" strokeWidth="1.5" />
    <line x1="24" y1="12" x2="28" y2="12" stroke="#ec4899" strokeWidth="1.5" />
    <circle cx="16" cy="20" r="8" fill="none" stroke="#ec4899" strokeWidth="1.5" />
  </motion.svg>
);

// HEAL - frequency waves
export const HealAI51Icon = ({ size = 40, animate = false }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    animate={animate ? { opacity: [1, 0.5, 1] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <path d="M2 16 L6 16 L8 8 L10 24 L12 12 L14 20 L16 6 L18 26 L20 10 L22 22 L24 14 L26 18 L30 16" 
          stroke="#06b6d4" strokeWidth="2" fill="none" strokeLinecap="round" />
  </motion.svg>
);

// PROTECTION - shield
export const ProtectionAI51Icon = ({ size = 40, animate = false }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    animate={animate ? { scale: [1, 1.1, 1] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <path d="M16 2 L26 6 L26 14 Q26 22 16 28 Q6 22 6 14 L6 6 Z" fill="none" stroke="#22c55e" strokeWidth="2" />
    <circle cx="16" cy="16" r="4" fill="none" stroke="#22c55e" strokeWidth="2" />
  </motion.svg>
);

// MUSIC - sound/frequency
export const MusicAI51Icon = ({ size = 40, animate = false }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    animate={animate ? { rotate: [0, 360] } : {}}
    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
  >
    <circle cx="16" cy="24" r="2" fill="#f59e0b" />
    <line x1="16" y1="4" x2="16" y2="22" stroke="#f59e0b" strokeWidth="2" />
    <path d="M16 6 Q24 6 24 12" stroke="#f59e0b" strokeWidth="2" fill="none" />
    <path d="M16 12 Q22 12 22 18" stroke="#f59e0b" strokeWidth="2" fill="none" />
  </motion.svg>
);

// NETWORK - nodes connected
export const NetworkAI51Icon = ({ size = 40, animate = false }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    animate={animate ? { scale: [1, 1.1, 1] } : {}}
    transition={{ duration: 2.5, repeat: Infinity }}
  >
    <circle cx="8" cy="8" r="2" fill="#a855f7" />
    <circle cx="24" cy="8" r="2" fill="#a855f7" />
    <circle cx="16" cy="24" r="2" fill="#a855f7" />
    <line x1="10" y1="9" x2="14" y2="22" stroke="#a855f7" strokeWidth="1.5" />
    <line x1="22" y1="9" x2="18" y2="22" stroke="#a855f7" strokeWidth="1.5" />
    <line x1="8" y1="10" x2="24" y2="10" stroke="#a855f7" strokeWidth="1.5" />
  </motion.svg>
);

// MEMORY - brain/mind
export const MemoryAI51Icon = ({ size = 40, animate = false }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    animate={animate ? { opacity: [1, 0.6, 1] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <path d="M10 12 Q8 12 8 14 L8 22 Q8 24 10 24 L22 24 Q24 24 24 22 L24 14 Q24 12 22 12" 
          fill="none" stroke="#ec4899" strokeWidth="2" />
    <circle cx="12" cy="16" r="2" fill="#ec4899" />
    <circle cx="16" cy="16" r="2" fill="#ec4899" />
    <circle cx="20" cy="16" r="2" fill="#ec4899" />
    <line x1="6" y1="10" x2="26" y2="10" stroke="#ec4899" strokeWidth="2" />
  </motion.svg>
);

// CONSCIOUSNESS - expanding awareness
export const ConsciousnessAI51Icon = ({ size = 40, animate = false }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    animate={animate ? { scale: [1, 1.15, 1] } : {}}
    transition={{ duration: 2.5, repeat: Infinity }}
  >
    <circle cx="16" cy="16" r="3" fill="#06b6d4" />
    <circle cx="16" cy="16" r="8" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
    <circle cx="16" cy="16" r="13" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.5" />
    <circle cx="16" cy="16" r="18" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
  </motion.svg>
);