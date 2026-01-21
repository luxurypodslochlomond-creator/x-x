import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertCircle } from 'lucide-react';

/**
 * AI51 FREQUENCY INTELLIGENCE - ON-THE-FLY ADAPTIVE
 * Real-time HRV response: BOOST when coherence drops, NEVER reduce
 * Morphic resonance: observed but unproven - flagged as experimental
 */

export const AI51FrequencyIntelligence = ({ selectedProtocol, currentHRV, isPlaying }) => {
  const [adaptiveBoost, setAdaptiveBoost] = useState(1.0);
  const [inDistress, setInDistress] = useState(false);
  const hrvHistoryRef = useRef([]);

  // Real-time on-the-fly HRV adaptation
  useEffect(() => {
    if (!currentHRV || !isPlaying || !selectedProtocol) return;

    hrvHistoryRef.current.push({
      time: Date.now(),
      coherence: currentHRV.coherence,
      bpm: currentHRV.bpm
    });

    // Keep last 30 seconds only
    const cutoff = Date.now() - 30000;
    hrvHistoryRef.current = hrvHistoryRef.current.filter(h => h.time > cutoff);

    if (hrvHistoryRef.current.length > 3) {
      const recent = hrvHistoryRef.current.slice(-3);
      const avgCoherence = recent.reduce((sum, h) => sum + h.coherence, 0) / recent.length;

      // RULE: BOOST when suffering, NEVER tune people out
      if (avgCoherence < 25) {
        setInDistress(true);
        setAdaptiveBoost(1.3); // MAX POWER for people in crisis
        console.log('🆘 DISTRESS DETECTED - Full activation');
      } else if (avgCoherence < 40) {
        setInDistress(true);
        setAdaptiveBoost(1.15); // Strong support
      } else if (avgCoherence < 55) {
        setInDistress(false);
        setAdaptiveBoost(1.05); // Gentle support
      } else {
        setInDistress(false);
        setAdaptiveBoost(1.0); // Maintain baseline (never reduce)
      }
    }
  }, [currentHRV, isPlaying, selectedProtocol]);

  if (!isPlaying) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 space-y-2">
      {/* Distress Alert */}
      {inDistress && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-900/60 border-2 border-red-500 rounded-lg p-3 max-w-xs"
        >
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-xs font-mono text-red-400 font-bold">ADAPTIVE BOOST {(adaptiveBoost * 100).toFixed(0)}%</span>
          </div>
          <p className="text-xs text-red-300">Increasing power for you</p>
        </motion.div>
      )}

      {/* Morphic Research - Future */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-black border-2 border-purple-500/50 rounded-lg p-2 max-w-xs"
      >
        <div className="flex items-center gap-2">
          <Zap className="w-3 h-3 text-purple-400" />
          <span className="text-[10px] font-mono text-purple-400">MORPHIC RESEARCH</span>
        </div>
        <p className="text-[10px] text-purple-300 mt-1">Detecting group healing patterns (experimental)</p>
      </motion.div>
    </div>
  );
};

export default AI51FrequencyIntelligence;