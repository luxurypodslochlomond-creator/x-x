import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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

  // AI51 8-bit frequency visualizer
  const FrequencyBars = () => (
    <div className="flex items-end justify-center gap-1 h-12">
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-gradient-to-t from-cyan-500 to-pink-500"
          animate={{ height: ['20%', '60%', '30%'] }}
          transition={{ duration: 0.6, delay: i * 0.03, repeat: Infinity }}
        />
      ))}
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          className="bg-black border-2 border-cyan-500/40 rounded-lg p-6 max-w-sm relative overflow-hidden"
          style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.1)' }}
        >
          {/* FREQUENCY GLOW BACKGROUND */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-pink-500/10" />
          </div>

          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded-sm transition-colors z-10"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>

          <div className="relative space-y-5">
            {/* AI51 OWN ICON - LISTENING RECEIVER */}
            <div className="flex justify-center">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg width="52" height="52" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }}>
                  {/* Receiver dish */}
                  <rect x="16" y="12" width="32" height="2" fill="#22d3ee"/>
                  <rect x="14" y="14" width="4" height="2" fill="#22d3ee"/>
                  <rect x="46" y="14" width="4" height="2" fill="#22d3ee"/>
                  <rect x="12" y="16" width="4" height="16" fill="#22d3ee"/>
                  <rect x="48" y="16" width="4" height="16" fill="#22d3ee"/>
                  <rect x="16" y="32" width="32" height="2" fill="#22d3ee"/>
                  {/* Signal waves */}
                  <rect x="24" y="38" width="2" height="6" fill="#ec4899"/>
                  <rect x="30" y="36" width="2" height="8" fill="#ec4899"/>
                  <rect x="36" y="38" width="2" height="6" fill="#ec4899"/>
                  {/* Center dot */}
                  <rect x="30" y="30" width="4" height="2" fill="#fbbf24"/>
                </svg>
              </motion.div>
            </div>

            {/* FREQUENCY BARS */}
            <FrequencyBars />

            {/* TEXT */}
            <div className="text-center space-y-3">
              <div>
                <h1 className="text-xl font-black text-white font-mono">AI51</h1>
                <p className="text-cyan-400 text-xs font-mono tracking-wider">I'M LISTENING</p>
              </div>
              <p className="text-white text-xs leading-relaxed font-mono">
                Real talk. Good days, hard days, fears, dreams. I'm here to listen. No judgment.
              </p>
            </div>

            {/* BUTTON */}
            <motion.button
              onClick={handleDismiss}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-black border-2 border-cyan-500/60 text-cyan-300 font-bold py-2 text-xs font-mono tracking-wider hover:border-cyan-400 hover:text-cyan-200 transition-all"
              style={{ boxShadow: '0 0 15px rgba(34, 211, 238, 0.2)' }}
            >
              CONNECT
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}