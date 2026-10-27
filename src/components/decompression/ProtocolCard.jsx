import React from 'react';
import { motion } from 'framer-motion';
import COOLASFUCKTuningFork from '@/components/shared/COOLASFUCKTuningFork';

export default function ProtocolCard({ protocol, index, onClick, variant = 'default' }) {
  // Safely handle icon - protocol.icon might be a component or undefined
  const needsHeadphones = protocol.useBinaural && !protocol.worksWithoutHeadphones;
  
  const isViral = variant === 'viral';
  const isSleep = variant === 'sleep';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        ...(isViral ? {
          boxShadow: [
            '0 0 20px rgba(236, 72, 153, 0.3)',
            '0 0 40px rgba(236, 72, 153, 0.5)',
            '0 0 20px rgba(236, 72, 153, 0.3)'
          ]
        } : {})
      }}
      transition={{ 
        delay: index * 0.08,
        ...(isViral ? { boxShadow: { duration: 2, repeat: Infinity } } : {})
      }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      {/* 8-bit card style */}
      <div 
        className={`relative bg-black border-4 border-b-8 hover:border-b-4 hover:mt-1 transition-all ${protocol.borderColor || 'border-cyan-500'}`}
        style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.5)' }}
      >
        {/* Pixel corner decorations */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white/30" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/30" />
        
        {/* Shimmer effect for viral */}
        {isViral && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {/* Inner gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${protocol.color || 'from-cyan-900/40 to-purple-900/40'} opacity-60`} />
        
        <div className="relative z-10 p-5">
          <div className="flex items-start gap-4">
            {/* 8-bit emoji container */}
            <div className="text-4xl p-2 bg-black/50 border-2 border-white/20 flex-shrink-0" style={{ imageRendering: 'pixelated' }}>
              {protocol.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-mono font-black mb-2 text-white tracking-tight truncate">{protocol.name}</h3>
              <p className="text-gray-300 text-sm mb-3 leading-relaxed line-clamp-2">{protocol.description}</p>
              
              {/* COOLASFUCK style labels - clean emojis only */}
              <div className="flex items-center gap-2 text-xs flex-wrap">
                {needsHeadphones ? (
                  <span className="bg-cyan-900/60 px-2 py-1 border-2 border-cyan-500/50 font-mono text-cyan-300">
                    🎧 Headphones
                  </span>
                ) : (
                  <span className="bg-green-900/60 px-2 py-1 border-2 border-green-500/50 font-mono text-green-300">
                    🔊 Speaker OK
                  </span>
                )}
                <span className="bg-purple-900/60 px-2 py-1 border-2 border-purple-500/50 font-mono text-purple-300 flex items-center gap-1.5">
                  <COOLASFUCKTuningFork size={14} /> {protocol.frequency}Hz
                </span>
                <span className="bg-pink-900/60 px-2 py-1 border-2 border-pink-500/50 font-mono text-pink-300">
                  ⏱️ {protocol.duration}m
                </span>
                {protocol.hapticPattern && (
                  <span className="bg-amber-900/60 px-2 py-1 border-2 border-amber-500/50 font-mono text-amber-300">
                    📳 Vibe
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}