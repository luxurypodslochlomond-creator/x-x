import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift } from 'lucide-react';

/**
 * REAL REWARDS - NO CREDIT GRIND
 * 1kg cleanup = Instant P51 + Progress to next unlock
 */

export default function CleanupRewards({ weight, p51Earned, nextUnlock, progressToNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-3"
    >
      {/* INSTANT P51 */}
      <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-4 border-green-500 p-4">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-green-400 animate-pulse" />
          <p className="text-green-400 font-black font-mono text-sm">INSTANT EARNED</p>
        </div>
        <div className="text-center">
          <p className="text-5xl font-black font-mono text-green-400 mb-1">
            {p51Earned.toFixed(1)} P51
          </p>
          <p className="text-green-300 text-xs font-mono">From {weight}kg cleanup</p>
          <p className="text-green-600 text-[10px] font-mono mt-1">
            ✓ Spend in shop RIGHT NOW
          </p>
        </div>
      </div>

      {/* NEXT UNLOCK PROGRESS */}
      {nextUnlock && (
        <div className="bg-black border-4 border-purple-500 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-purple-400" />
            <p className="text-purple-400 font-black font-mono text-sm">UNLOCK PROGRESS</p>
          </div>
          <div className="text-center mb-3">
            <p className="text-2xl mb-1">{nextUnlock.emoji}</p>
            <p className="text-white font-black font-mono text-xs">{nextUnlock.name}</p>
            <p className="text-gray-500 text-[10px]">{nextUnlock.description}</p>
          </div>
          <div className="bg-black/60 border border-purple-500/30 h-3">
            <motion.div
              className="h-full bg-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressToNext}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <p className="text-gray-400 text-xs font-mono text-center mt-2">
            Almost there! Keep cleaning ♾️
          </p>
        </div>
      )}

      {/* NO CREDIT SYSTEM MESSAGE */}
      <div className="bg-black border-2 border-cyan-500/50 p-3 text-center">
        <p className="text-cyan-400 font-black font-mono text-xs">
          💚 NO CREDIT GRIND • REAL VALUE TODAY 💚
        </p>
      </div>
    </motion.div>
  );
}