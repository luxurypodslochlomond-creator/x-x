import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

// PURE SIGNAL. ZERO EXTRACTION.
// Anonymous one-tap outcome tracker — no identity, no surveillance.
// Just "did this help?" aggregated to show future users real proof.

export default function OutcomeTracker({ protocol }) {
  const [voted, setVoted] = useState(false);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load total count of people helped
  useEffect(() => {
    const load = async () => {
      const outcomes = await base44.entities.HealingOutcome.filter({ protocol, helped: true });
      setCount(outcomes.length);
    };
    load();
  }, [protocol]);

  const handleVote = async (helped) => {
    if (voted || loading) return;
    setLoading(true);
    await base44.entities.HealingOutcome.create({ protocol, helped });
    if (helped) setCount(c => c + 1);
    setVoted(true);
    setLoading(false);
  };

  return (
    <div className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-5 text-center space-y-3 mb-4">
      {/* COUNTER */}
      {count !== null && count > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-1"
        >
          <span className="text-green-400 font-black text-2xl">{count}</span>
          <span className="text-gray-500 text-sm ml-2">people found relief with this protocol</span>
        </motion.div>
      )}

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