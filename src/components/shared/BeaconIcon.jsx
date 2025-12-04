import React from 'react';
import { motion } from 'framer-motion';

/**
 * BEACON ICON - 8-bit style pulsing beacon
 * Two hands reaching toward each other
 * The universal symbol of "I'm here"
 */

export default function BeaconIcon({ size = 48, animate = true, glow = true }) {
  const Icon = () => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none"
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Left hand reaching right */}
      <rect x="4" y="14" width="4" height="4" fill="#22D3EE" />
      <rect x="8" y="12" width="4" height="4" fill="#22D3EE" />
      <rect x="8" y="16" width="4" height="4" fill="#22D3EE" />
      <rect x="12" y="14" width="2" height="4" fill="#22D3EE" />
      
      {/* Right hand reaching left */}
      <rect x="24" y="14" width="4" height="4" fill="#EC4899" />
      <rect x="20" y="12" width="4" height="4" fill="#EC4899" />
      <rect x="20" y="16" width="4" height="4" fill="#EC4899" />
      <rect x="18" y="14" width="2" height="4" fill="#EC4899" />
      
      {/* Center connection spark */}
      <rect x="15" y="15" width="2" height="2" fill="#FBBF24" />
      
      {/* Pulse rings */}
      <rect x="14" y="10" width="4" height="2" fill="#FBBF24" opacity="0.6" />
      <rect x="14" y="20" width="4" height="2" fill="#FBBF24" opacity="0.6" />
      <rect x="10" y="8" width="2" height="2" fill="#22D3EE" opacity="0.4" />
      <rect x="20" y="8" width="2" height="2" fill="#EC4899" opacity="0.4" />
      <rect x="10" y="22" width="2" height="2" fill="#22D3EE" opacity="0.4" />
      <rect x="20" y="22" width="2" height="2" fill="#EC4899" opacity="0.4" />
    </svg>
  );

  if (!animate) {
    return <Icon />;
  }

  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.9, 1, 0.9]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={glow ? {
        filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.6))'
      } : {}}
    >
      <Icon />
    </motion.div>
  );
}