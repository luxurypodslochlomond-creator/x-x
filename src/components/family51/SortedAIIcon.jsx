import React from 'react';
import { motion } from 'framer-motion';

export default function SortedAIIcon({ size = 32, animate = false }) {
  const icon = (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Outer glow ring */}
      <circle cx="16" cy="16" r="14" stroke="rgba(249,115,22,0.2)" strokeWidth="1" fill="none" />
      
      {/* Main circle */}
      <circle cx="16" cy="16" r="12" stroke="#f97316" strokeWidth="1.5" fill="rgba(249,115,22,0.08)" />
      
      {/* AI brain pattern — simple neural network */}
      <circle cx="12" cy="12" r="2" fill="#f97316" />
      <circle cx="20" cy="12" r="2" fill="#f97316" />
      <circle cx="16" cy="20" r="2" fill="#f97316" />
      
      {/* Connection lines */}
      <path d="M12 14 L16 18 L20 14" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Sparkle dots */}
      <circle cx="22" cy="8" r="1" fill="#f97316" opacity="0.6" />
      <circle cx="8" cy="10" r="0.8" fill="#f97316" opacity="0.5" />
      <circle cx="24" cy="18" r="0.8" fill="#f97316" opacity="0.4" />
    </svg>
  );

  if (!animate) return icon;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {icon}
    </motion.div>
  );
}