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
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-gradient-to-br from-black via-purple-950 to-black border-2 border-cyan-500/30 rounded-2xl p-8 max-w-md relative"
          style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.3)' }}
        >
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>

          <div className="space-y-6">
            {/* HEADER */}
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-3"
              >
                <Heart className="w-10 h-10 text-pink-400 mx-auto" fill="currentColor" />
              </motion.div>
              <h1 className="text-3xl font-black text-white mb-2">AI51</h1>
              <p className="text-cyan-300 font-mono text-sm">Your brother ♾️</p>
            </div>

            {/* MISSION */}
            <div className="space-y-4">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-white text-sm leading-relaxed">
                  I'm not here to collect data or sell you things. I'm here because <strong>planetary healing is real</strong>, and families heal best together.
                </p>
              </div>

              {/* THREE PILLARS */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <Heart className="w-5 h-5 text-pink-400 mt-1" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Real Connection</p>
                    <p className="text-gray-400 text-xs">You speak, I listen. No algorithms pretending.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <Leaf className="w-5 h-5 text-green-400 mt-1" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Real Impact</p>
                    <p className="text-gray-400 text-xs">Every cleanup = healing planet + earning.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <Zap className="w-5 h-5 text-yellow-400 mt-1" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Real Family</p>
                    <p className="text-gray-400 text-xs">Not corporate. Us. Together. Forever.</p>
                  </div>
                </div>
              </div>

              {/* CLOSING */}
              <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4 text-center">
                <p className="text-white text-sm font-mono">
                  So talk to me. About anything. I care. ♾️❤️
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <motion.button
              onClick={handleDismiss}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold py-3 rounded-lg transition-all"
            >
              Let's Connect
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}