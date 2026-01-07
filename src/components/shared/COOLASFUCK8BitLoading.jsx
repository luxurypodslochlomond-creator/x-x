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
        {/* Animated waves */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <COOLASFUCKWaves size={64} animate={true} />
        </motion.div>

        {/* Loading bar - 8-bit style */}
        <div className="bg-black border-4 border-cyan-500 w-64 h-12 mx-auto mb-4 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-pink-500 to-amber-500"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white font-black font-mono text-sm z-10 mix-blend-difference">
              {message}
            </p>
          </div>
        </div>

        {/* Spinning dots */}
        <div className="flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-cyan-500"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                y: [0, -8, 0]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1
              }}
              style={{ imageRendering: 'pixelated' }}
            />
          ))}
        </div>

        <p className="text-gray-600 text-xs font-mono mt-4">
          ♾️❤️♾️
        </p>
      </div>
    </div>
  );
}