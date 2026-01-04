import React from 'react';
import { motion } from 'framer-motion';
import { COOLASFUCKWaves } from './COOLASFUCKIcon';

/**
 * COOLASFUCK 8-BIT ERROR SCREEN
 * Retro game over vibes but helpful
 */

export default function COOLASFUCK8BitError({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
      {/* 8-bit scanlines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)'
      }} />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 max-w-2xl w-full"
      >
        {/* 8-bit border */}
        <div className="bg-black border-8 border-red-500 p-8" style={{ 
          boxShadow: '0 0 60px rgba(239, 68, 68, 0.6), inset 0 0 20px rgba(239, 68, 68, 0.3)',
          imageRendering: 'pixelated'
        }}>
          
          {/* Glitching header */}
          <motion.div
            animate={{ 
              x: [0, -2, 2, -1, 1, 0],
              opacity: [1, 0.8, 1, 0.9, 1]
            }}
            transition={{ 
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="text-center mb-6"
          >
            <p className="text-red-400 text-6xl font-black font-mono mb-2" style={{ 
              textShadow: '4px 4px 0px rgba(0,0,0,1), 8px 8px 0px rgba(239, 68, 68, 0.5)',
              imageRendering: 'pixelated'
            }}>
              ERROR
            </p>
            <p className="text-red-300 text-xl font-bold font-mono">GAME OVER... OR IS IT?</p>
          </motion.div>

          {/* Pixelated skull or broken heart */}
          <div className="flex justify-center mb-6">
            <motion.svg 
              width="80" 
              height="80" 
              viewBox="0 0 64 64" 
              style={{ imageRendering: 'pixelated' }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              {/* 8-bit broken heart */}
              <rect x="20" y="24" width="8" height="4" fill="#ef4444"/>
              <rect x="36" y="24" width="8" height="4" fill="#ef4444"/>
              <rect x="16" y="28" width="16" height="4" fill="#dc2626"/>
              <rect x="36" y="28" width="16" height="4" fill="#dc2626"/>
              <rect x="16" y="32" width="16" height="4" fill="#dc2626"/>
              <rect x="36" y="32" width="16" height="4" fill="#dc2626"/>
              <rect x="20" y="36" width="12" height="4" fill="#dc2626"/>
              <rect x="36" y="36" width="8" height="4" fill="#dc2626"/>
              <rect x="24" y="40" width="8" height="4" fill="#b91c1c"/>
              <rect x="28" y="44" width="4" height="4" fill="#b91c1c"/>
              
              {/* Break line */}
              <rect x="32" y="20" width="4" height="28" fill="#000000"/>
            </motion.svg>
          </div>

          {/* Error message in retro terminal style */}
          <div className="bg-black border-4 border-red-500/50 p-4 mb-6 font-mono text-sm">
            <p className="text-green-400 mb-2">{'>'} SYSTEM ERROR DETECTED</p>
            <p className="text-red-400 mb-2">{'>'} {error?.message || 'Unknown error occurred'}</p>
            <p className="text-gray-500">{'>'} Don't worry bro - nothing broken forever ♾️</p>
          </div>

          {/* Action buttons - 8-bit style */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetErrorBoundary}
              className="w-full bg-cyan-500 hover:bg-cyan-400 border-4 border-cyan-400 text-black font-black py-4 text-lg font-mono"
              style={{ boxShadow: '8px 8px 0px rgba(6, 182, 212, 0.6)' }}
            >
              ↻ RESTART GAME
            </motion.button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-black hover:bg-gray-900 border-4 border-gray-700 text-gray-400 hover:text-gray-300 font-black py-3 text-sm font-mono"
            >
              ← BACK TO START
            </button>
          </div>

          {/* Continue counter like old games */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <div className="flex items-center justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-red-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  style={{ imageRendering: 'pixelated' }}
                />
              ))}
            </div>
            <p className="text-gray-600 text-xs font-mono mt-2">ERROR CODE: {Date.now().toString(36).toUpperCase()}</p>
          </motion.div>

          {/* Footer with love */}
          <div className="mt-6 pt-6 border-t-2 border-red-500/30 text-center">
            <COOLASFUCKWaves size={32} animate={true} className="mx-auto mb-2" />
            <p className="text-gray-600 text-xs font-mono">
              Errors happen bro - we still love you ♾️❤️♾️
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}