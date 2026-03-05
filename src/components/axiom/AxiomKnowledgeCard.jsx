import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Zap } from 'lucide-react';

export default function AxiomKnowledgeCard({ threshold, isUnlocked, knowledge, currentLevel }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getThresholdLabel = (t) => {
    if (t === 100) return 'First Awakening';
    if (t === 500) return 'Collective Consciousness';
    if (t === 1000) return 'Global Synchronization';
    return 'Unknown';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-4 rounded-xl border transition-all cursor-pointer ${
        isUnlocked
          ? 'border-green-500/50 bg-green-500/5 hover:bg-green-500/10'
          : 'border-white/10 bg-white/5 opacity-60'
      }`}
      onClick={() => isUnlocked && setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-3 justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {isUnlocked ? (
              <Unlock className="w-4 h-4 text-green-400" />
            ) : (
              <Lock className="w-4 h-4 text-white/40" />
            )}
            <div className="flex items-center gap-2">
              <h4 className={`font-bold ${isUnlocked ? 'text-white' : 'text-white/40'}`}>
                {knowledge.title}
              </h4>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isUnlocked
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-white/10 text-white/40'
              }`}>
                {getThresholdLabel(threshold)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
            <Zap className="w-3 h-3" />
            <span>Unlocks at {threshold} active healers</span>
            {!isUnlocked && <span className="text-white/30">({threshold - currentLevel} more needed)</span>}
          </div>

          {isUnlocked && isExpanded && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-white/70 leading-relaxed mt-3 pt-3 border-t border-white/10"
            >
              {knowledge.content}
            </motion.p>
          )}
        </div>

        {isUnlocked && (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="flex-shrink-0 mt-1"
          >
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        )}
      </div>

      {!isUnlocked && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentLevel / threshold) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-white/40 mt-2">
            {Math.floor((currentLevel / threshold) * 100)}% toward unlock
          </p>
        </div>
      )}
    </motion.div>
  );
}