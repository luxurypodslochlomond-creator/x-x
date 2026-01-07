import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { COOLASFUCKWaves } from './COOLASFUCKIcon';

/**
 * COOLASFUCK 8-BIT LOADING SCREEN
 * Fast, retro, no BS
 */

export default function COOLASFUCK8BitLoading({ message = "LOADING" }) {
    const [color, setColor] = useState('#22c55e');
    
    useEffect(() => {
        // Rainbow cycle
        const colors = ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6', '#ec4899'];
        let index = 0;
        const interval = setInterval(() => {
            setColor(colors[index % colors.length]);
            index++;
        }, 500);
        return () => clearInterval(interval);
    }, []);
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center">
        {/* RAINBOW FREQUENCY RINGS */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          className="mb-8"
        >
          <svg width="128" height="128" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }} className="mx-auto">
            <motion.rect x="8" y="8" width="48" height="48" fill="none" stroke="#ef4444" strokeWidth="2" 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.rect x="12" y="12" width="40" height="40" fill="none" stroke="#f59e0b" strokeWidth="2"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.rect x="16" y="16" width="32" height="32" fill="none" stroke="#eab308" strokeWidth="2"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
            <motion.rect x="20" y="20" width="24" height="24" fill="none" stroke="#22c55e" strokeWidth="2"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
            />
            <motion.rect x="24" y="24" width="16" height="16" fill="none" stroke="#06b6d4" strokeWidth="2"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}
            />
            <motion.rect x="28" y="28" width="8" height="8" fill="none" stroke="#8b5cf6" strokeWidth="2"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 1 }}
            />
            <motion.circle cx="32" cy="32" r="4" fill={color}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </svg>
        </motion.div>

        {/* RAINBOW MESSAGE */}
        <motion.h1
          className="text-4xl font-black font-mono mb-6"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            background: 'linear-gradient(90deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #8b5cf6, #ec4899)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {message}
        </motion.h1>

        {/* Frequency bars */}
        <div className="flex justify-center gap-2">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-cyan-400"
              style={{ height: '40px', boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)' }}
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>

        <p className="text-gray-600 text-xs font-mono mt-6">
          ♾️❤️♾️
        </p>
      </div>
    </div>
  );
}