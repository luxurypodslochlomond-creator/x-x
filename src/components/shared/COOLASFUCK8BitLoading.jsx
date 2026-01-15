import React from 'react';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

/**
 * AI51 CONSCIOUSNESS LOADING
 * Pure frequency • <1 second
 * Detects CB51 context automatically
 */

export default function COOLASFUCK8BitLoading({ message = "LOADING" }) {
  // Auto-detect CB51 context
  const isCB51 = typeof window !== 'undefined' && (
    window.location.pathname.includes('/CB51') ||
    window.location.pathname.includes('/Scott') ||
    message.includes('CB51')
  );

  const displayMessage = message === "LOADING UF51" && isCB51 ? "LOADING CB51" : message;
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center">
        {/* CB51 RADIO ICON or AI51 HEART */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          {isCB51 ? (
            <Radio className="w-24 h-24 text-cyan-400 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #06b6d4)' }} />
          ) : (
            <svg width="96" height="96" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }} className="mx-auto">
              {/* Outer glow rings - pink to cyan */}
              <motion.rect x="4" y="20" width="56" height="32" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.3"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              />
              <motion.rect x="8" y="24" width="48" height="24" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.3"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              
              {/* Main 8-bit heart */}
              <motion.g
                animate={{ 
                  filter: ['drop-shadow(0 0 8px #ec4899)', 'drop-shadow(0 0 20px #ec4899)', 'drop-shadow(0 0 8px #ec4899)']
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <rect x="18" y="20" width="8" height="4" fill="#ec4899"/>
                <rect x="38" y="20" width="8" height="4" fill="#ec4899"/>
                <rect x="14" y="24" width="36" height="8" fill="#ff1b8d"/>
                <rect x="18" y="32" width="28" height="8" fill="#ff1b8d"/>
                <rect x="22" y="40" width="20" height="6" fill="#ff1b8d"/>
                <rect x="26" y="46" width="12" height="4" fill="#ff1b8d"/>
                <rect x="30" y="50" width="4" height="2" fill="#ff1b8d"/>
              </motion.g>
            </svg>
          )}
        </motion.div>

        {/* AI51/CB51 GRADIENT TEXT */}
        <motion.h1
          className="text-4xl font-black font-mono mb-6"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            background: isCB51 
              ? 'linear-gradient(90deg, #06b6d4, #ec4899, #06b6d4)'
              : 'linear-gradient(90deg, #ec4899, #06b6d4, #ec4899)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {displayMessage}
        </motion.h1>

        {/* Consciousness pulse */}
        <div className="flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-cyan-400"
              style={{ height: '24px', boxShadow: '0 0 6px rgba(6, 182, 212, 0.6)' }}
              animate={{ scaleY: [0.2, 1, 0.2] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>

        <p className="text-pink-500 text-xs font-mono mt-6 font-bold">
          ♾️❤️♾️
        </p>
      </div>
    </div>
  );
}