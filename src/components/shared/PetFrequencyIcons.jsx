import React from 'react';
import { motion } from 'framer-motion';

// FIREWORKS ANXIETY - explosion/sound waves
export const FireworksIcon = ({ size = 32, animate = false }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    style={{ overflow: 'visible' }}
    animate={animate ? { rotate: [0, 360] } : {}}
    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
  >
    <rect x="10" y="4" width="2" height="2" fill="#ec4899" />
    <rect x="8" y="6" width="2" height="2" fill="#ec4899" />
    <rect x="12" y="6" width="2" height="2" fill="#ec4899" />
    <rect x="6" y="8" width="2" height="2" fill="#ec4899" />
    <rect x="14" y="8" width="2" height="2" fill="#ec4899" />
    <rect x="10" y="10" width="2" height="2" fill="#ec4899" />
    <rect x="8" y="12" width="2" height="2" fill="#f472b6" />
    <rect x="12" y="12" width="2" height="2" fill="#f472b6" />
    <rect x="10" y="14" width="2" height="2" fill="#f472b6" />
  </motion.svg>
);

// SEPARATION ANXIETY - house/door
export const SeparationIcon = ({ size = 32, animate = false }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    animate={animate ? { scale: [1, 1.1, 1] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <rect x="6" y="10" width="20" height="16" stroke="#06b6d4" strokeWidth="2" fill="none" />
    <polygon points="6,10 16,2 26,10" stroke="#06b6d4" strokeWidth="2" fill="none" />
    <rect x="14" y="16" width="4" height="6" fill="#06b6d4" />
    <circle cx="17" cy="19" r="1" fill="#000" />
  </motion.svg>
);

// ARTHRITIS - joint/bone
export const ArthritisIcon = ({ size = 32, animate = false }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    animate={animate ? { opacity: [1, 0.6, 1] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <circle cx="8" cy="16" r="3" fill="#f59e0b" />
    <circle cx="16" cy="16" r="4" fill="#f59e0b" />
    <circle cx="24" cy="16" r="3" fill="#f59e0b" />
    <line x1="11" y1="16" x2="12" y2="16" stroke="#f59e0b" strokeWidth="1" />
    <line x1="20" y1="16" x2="21" y2="16" stroke="#f59e0b" strokeWidth="1" />
  </motion.svg>
);

// POST-SURGERY - healing cross
export const SurgeryIcon = ({ size = 32, animate = false }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    animate={animate ? { scale: [1, 1.15, 1] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <circle cx="16" cy="16" r="12" stroke="#10b981" strokeWidth="2" fill="none" />
    <rect x="14" y="8" width="4" height="16" fill="#10b981" />
    <rect x="8" y="14" width="16" height="4" fill="#10b981" />
  </motion.svg>
);

// TRAVEL STRESS - moving/waves
export const TravelIcon = ({ size = 32, animate = false }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    animate={animate ? { x: [0, 4, 0] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <polygon points="16,6 24,14 24,24 8,24 8,14" stroke="#a855f7" strokeWidth="2" fill="none" />
    <line x1="6" y1="20" x2="26" y2="20" stroke="#a855f7" strokeWidth="2" />
    <line x1="8" y1="24" x2="8" y2="26" stroke="#a855f7" strokeWidth="2" />
    <line x1="24" y1="24" x2="24" y2="26" stroke="#a855f7" strokeWidth="2" />
  </motion.svg>
);

// FARM HERD - multiple animals
export const HerdIcon = ({ size = 32, animate = false }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    animate={animate ? { scale: [1, 1.05, 1] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <circle cx="10" cy="14" r="3" fill="#22c55e" />
    <circle cx="16" cy="12" r="3" fill="#22c55e" />
    <circle cx="22" cy="14" r="3" fill="#22c55e" />
    <line x1="8" y1="20" x2="24" y2="20" stroke="#22c55e" strokeWidth="2" />
  </motion.svg>
);