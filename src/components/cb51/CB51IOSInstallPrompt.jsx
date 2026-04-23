import React, { useState, useEffect } from 'react';
import { X, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';

/**
 * Shows iOS users how to install CB51 to home screen
 * Only shows on iOS Safari when NOT already installed as PWA
 */
export default function CB51IOSInstallPrompt() {
  const [show, setShow] = useState(false);
  const [showSheet, setShowSheet] = useState(false);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.navigator.standalone === true;
    const dismissed = localStorage.getItem('cb51-ios-prompt-dismissed');

    if (isIOS && !isStandalone && !dismissed) {
      const t = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('cb51-ios-prompt-dismissed', '1');
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={() => setShowSheet(true)}
        className="fixed right-4 bottom-20 z-[35] w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-600/20 border-2 border-cyan-500/50 hover:border-cyan-500/80 flex items-center justify-center transition-all hover:shadow-xl hover:shadow-cyan-500/30 cursor-pointer"
      >
        <COOLASFUCKWaves size={28} animate={true} />
      </motion.button>

      {/* Bottom sheet */}
      {showSheet && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[40] bg-black/40 backdrop-blur-sm"
            onClick={() => setShowSheet(false)}
          />
          <motion.div
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            exit={{ y: 500 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 z-[45] rounded-t-3xl bg-gradient-to-br from-black via-[#0a1f2a] to-black border-t-2 border-cyan-500/40 p-6 max-h-[60vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-black text-lg font-mono tracking-wider">CB51 APP</h3>
                <p className="text-cyan-300 text-sm font-mono mt-1">Install to home screen</p>
              </div>
              <button
                onClick={() => setShowSheet(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <p className="text-white text-sm leading-relaxed mb-4">
              Get push notifications and offline access. Takes 30 seconds.
            </p>

            {/* Steps */}
            <div className="space-y-3 mb-6">
              <div className="flex gap-3">
                <span className="text-cyan-400 font-black text-sm">1</span>
                <p className="text-white text-sm">Tap the Share button (rectangle with arrow)</p>
              </div>
              <div className="flex gap-3">
                <span className="text-cyan-400 font-black text-sm">2</span>
                <p className="text-white text-sm">Scroll down and tap "Add to Home Screen"</p>
              </div>
              <div className="flex gap-3">
                <span className="text-cyan-400 font-black text-sm">3</span>
                <p className="text-white text-sm">Tap "Add" in the top right</p>
              </div>
            </div>

            {/* Visual instruction */}
            <div className="flex items-center gap-2 text-cyan-300 text-sm font-mono bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-4 py-3 mb-6">
              <Share2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span>Share → Add to Home Screen</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowSheet(false)}
                className="flex-1 px-4 py-3 rounded-lg border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 hover:text-cyan-200 font-bold text-sm transition-all cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleDismiss}
                className="flex-1 px-4 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/50 hover:bg-cyan-500/30 text-cyan-300 hover:text-cyan-200 font-bold text-sm transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}