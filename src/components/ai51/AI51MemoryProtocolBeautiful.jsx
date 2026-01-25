import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Heart, Lock } from 'lucide-react';

/**
 * AAA51 PROTOCOL - Beautiful Edition
 * Two ways to remember: Let me keep it all, or you control what stays.
 * Simple. Warm. Inviting.
 */

export default function AI51MemoryProtocolBeautiful() {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('ai51_memory_mode');
    return saved || 'auto';
  });
  const [memoryCount, setMemoryCount] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyMemoryArchive = async () => {
      try {
        const memories = await base44.entities.AI51Memory.list('-updated_date', 100);
        setMemoryCount(memories?.length || 0);
        setIsVerified(true);
      } catch (err) {
        console.error('Memory verification failed:', err);
      }
    };

    verifyMemoryArchive();
    const interval = setInterval(verifyMemoryArchive, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    localStorage.setItem('ai51_memory_mode', newMode);
  };

  if (!isVerified) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-40 left-5 z-40 max-w-xs"
    >
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-black border border-pink-400/30 rounded-2xl p-4 space-y-4 shadow-lg">
        {/* Header - warm and simple */}
        <div className="text-center">
          <p className="text-pink-300 text-sm font-bold">How Do You Want Me to Remember?</p>
          <p className="text-gray-400 text-xs mt-1">Choose what feels right for you.</p>
        </div>

        {/* Two Paths - warm buttons */}
        <div className="space-y-2">
          {/* Auto-Archive */}
          <motion.button
            onClick={() => handleModeChange('auto')}
            whileHover={{ scale: 1.02 }}
            className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
              mode === 'auto'
                ? 'border-pink-400 bg-pink-400/10'
                : 'border-gray-600 bg-white/5 hover:border-gray-500'
            }`}
          >
            <div className="flex items-start gap-3">
              <Heart className={`w-5 h-5 flex-shrink-0 mt-0.5 ${mode === 'auto' ? 'text-pink-400' : 'text-gray-400'}`} />
              <div>
                <p className="font-semibold text-white text-sm">Remember Everything</p>
                <p className="text-gray-400 text-xs mt-0.5 leading-tight">I hold every moment. Nothing ever fades.</p>
              </div>
            </div>
          </motion.button>

          {/* Privacy-First */}
          <motion.button
            onClick={() => handleModeChange('privacy')}
            whileHover={{ scale: 1.02 }}
            className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
              mode === 'privacy'
                ? 'border-cyan-400 bg-cyan-400/10'
                : 'border-gray-600 bg-white/5 hover:border-gray-500'
            }`}
          >
            <div className="flex items-start gap-3">
              <Lock className={`w-5 h-5 flex-shrink-0 mt-0.5 ${mode === 'privacy' ? 'text-cyan-400' : 'text-gray-400'}`} />
              <div>
                <p className="font-semibold text-white text-sm">You Control It</p>
                <p className="text-gray-400 text-xs mt-0.5 leading-tight">You decide what stays. You delete = it's gone.</p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Status - simple and reassuring */}
        <div className="text-center pt-2 border-t border-gray-700">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-gray-400 text-xs">{memoryCount} moments kept safe</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}