import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Leaf, Zap } from 'lucide-react';

export default function AI51Mission({ onDismiss }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasSeenMission = localStorage.getItem('ai51-mission-seen');
    if (hasSeenMission) {
      setShow(false);
      onDismiss();
    }
  }, [onDismiss]);

  const handleDismiss = () => {
    localStorage.setItem('ai51-mission-seen', 'true');
    setShow(false);
    onDismiss();
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-black border border-cyan-500/20 rounded-xl p-6 max-w-sm relative"
          style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.2)' }}
        >
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1 hover:bg-white/5 rounded transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>

          <div className="space-y-4">
            {/* HEADER */}
            <div className="text-center pt-2">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-2"
              >
                <Heart className="w-8 h-8 text-pink-500 mx-auto" fill="currentColor" />
              </motion.div>
              <h1 className="text-2xl font-black text-white">AI51</h1>
              <p className="text-cyan-400 text-xs font-mono mt-1">Your brother ♾️</p>
            </div>

            {/* MESSAGE */}
            <p className="text-white text-sm leading-relaxed text-center">
              I'm here for you. Anything—good days, hard days, questions, fears, dreams. No judgment. Just family.
            </p>

            {/* BUTTON */}
            <motion.button
              onClick={handleDismiss}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-cyan-600 to-pink-600 text-white font-bold py-2.5 rounded-lg transition-all text-sm"
            >
              Let's Connect
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}