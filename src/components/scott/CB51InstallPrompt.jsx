import React, { useState, useEffect } from 'react';
import { Radio, X, Smartphone, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CB51 INSTALL PROMPT
 * Clean, professional prompt for adding CB51 to home screen
 * Shows once, then never again
 */

export default function CB51InstallPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if not seen before and user is on iOS Safari
    const hasSeenPrompt = localStorage.getItem('cb51_install_prompt_seen');
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (!hasSeenPrompt && isIOS && !isStandalone) {
      setTimeout(() => setShow(true), 2000);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('cb51_install_prompt_seen', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black border-2 border-cyan-500 rounded-2xl max-w-md w-full overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 p-6 border-b border-cyan-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center">
                    <Radio className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">CB51</h3>
                    <p className="text-cyan-400 text-xs font-bold font-mono">ARTIST CO-MANAGER</p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm">Add to Home Screen</p>
                    <p className="text-gray-400 text-xs">One tap access to CB51</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm">Works Offline</p>
                    <p className="text-gray-400 text-xs">Access gigs & data anywhere</p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 space-y-2">
                <p className="text-white font-bold text-sm mb-3">How to add:</p>
                <div className="space-y-2 text-xs text-gray-300">
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">1.</span>
                    <span>Tap the <span className="font-bold text-white">Share</span> button (bottom of Safari)</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">2.</span>
                    <span>Scroll down → tap <span className="font-bold text-white">"Add to Home Screen"</span></span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">3.</span>
                    <span>Change name to <span className="font-bold text-white">"CB51 📻"</span></span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">4.</span>
                    <span>Tap <span className="font-bold text-white">Add</span></span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  onClick={handleDismiss}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold"
                >
                  Got it
                </Button>
                <Button
                  onClick={handleDismiss}
                  variant="ghost"
                  className="w-full text-gray-400 hover:text-white text-sm"
                >
                  Maybe later
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}