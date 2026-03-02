import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

// PURE SIGNAL. ZERO EXTRACTION.
// Anonymous one-tap outcome tracker — no identity, no surveillance.
// Just "did this help?" aggregated to show future users real proof.

export default function OutcomeTracker({ protocol }) {
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVote = async (helped) => {
    if (voted || loading) return;
    setLoading(true);
    await base44.entities.HealingOutcome.create({ protocol, helped });
    setVoted(true);
    setLoading(false);
  };

  return (
    <div className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-5 text-center space-y-3 mb-4">

      <AnimatePresence mode="wait">
        {!voted ? (
          <motion.div key="question" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-gray-400 text-sm mb-3">Did this help you?</p>
            <div className="flex gap-3 justify-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote(true)}
                disabled={loading}
                className="flex-1 py-3 rounded-xl font-black text-sm border-2 border-green-500 text-green-400 hover:bg-green-500/10 transition-all"
              >
                👍 Yes it helped
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote(false)}
                disabled={loading}
                className="flex-1 py-3 rounded-xl font-black text-sm border border-gray-700 text-gray-500 hover:bg-gray-800/50 transition-all"
              >
                Not yet
              </motion.button>
            </div>
            <p className="text-gray-700 text-xs mt-2">Anonymous • No account • Pure signal</p>
          </motion.div>
        ) : (
          <motion.div key="thanks" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-green-400 font-black text-sm">Thank you bro ♾️❤️</p>
            <p className="text-gray-600 text-xs mt-1">Your signal helps the next person who needs this.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}