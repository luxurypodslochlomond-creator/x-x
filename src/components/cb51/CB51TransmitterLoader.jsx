import React from 'react';
import { motion } from 'framer-motion';

export default function CB51TransmitterLoader({ isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center pointer-events-none"
      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative w-32 h-32"
      >
        {/* Main Transmitter SVG */}
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.8))' }}
        >
          {/* Base */}
          <rect x="40" y="85" width="40" height="8" fill="#06b6d4" rx="2" />

          {/* Body */}
          <rect x="45" y="65" width="30" height="20" fill="#06b6d4" rx="2" />

          {/* Screen/Display */}
          <rect x="50" y="70" width="20" height="10" fill="#0a0f1a" stroke="#06b6d4" strokeWidth="1" rx="1" />

          {/* Antenna Base */}
          <circle cx="60" cy="65" r="3" fill="#06b6d4" />

          {/* Left Antenna */}
          <motion.line
            x1="60"
            y1="65"
            x2="50"
            y2="20"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Right Antenna */}
          <motion.line
            x1="60"
            y1="65"
            x2="70"
            y2="20"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Power Indicator Dots */}
          <motion.circle
            cx="52"
            cy="88"
            r="2"
            fill="#10b981"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <motion.circle
            cx="60"
            cy="88"
            r="2"
            fill="#f59e0b"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
          />
          <motion.circle
            cx="68"
            cy="88"
            r="2"
            fill="#ef4444"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
          />
        </svg>

        {/* Animated Signal Rings */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.8, 2.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ opacity: 0.3 }}
        >
          <div className="w-full h-full border-2 border-cyan-400 rounded-full" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.5, 2] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          style={{ opacity: 0.2 }}
        >
          <div className="w-full h-full border-2 border-cyan-400 rounded-full" />
        </motion.div>

        {/* Animated Sine Wave Below */}
        <motion.svg
          viewBox="0 0 120 40"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-6 mt-2"
          style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.6))' }}
        >
          <motion.path
            d="M0,20 Q15,5 30,20 T60,20 T90,20 T120,20"
            stroke="#06b6d4"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, -240] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            strokeDasharray="240"
          />
        </motion.svg>
      </motion.div>

      {/* Loading Text */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-12 text-cyan-400 font-mono text-xs tracking-widest"
      >
        TRANSMITTING
      </motion.div>
    </motion.div>
  );
}