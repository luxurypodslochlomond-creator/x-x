import React, { useState, useEffect } from 'react';
import { X, Share2, Smartphone, Radio, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Shows iOS users how to install CB51 to home screen
 * Only shows on iOS Safari when NOT already installed as PWA
 */
export default function CB51IOSInstallPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.navigator.standalone === true;
    const dismissed = localStorage.getItem('cb51-ios-prompt-dismissed');

    if (isIOS && !isStandalone && !dismissed) {
      const t = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem('cb51-ios-prompt-dismissed', '1');
    setShow(false);
  };

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 bottom-0 z-[45] p-4 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-sm mx-auto">
        <div className="relative rounded-2xl bg-gradient-to-br from-black via-[#0a1f2a] to-black border-2 border-cyan-500/40 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 overflow-hidden">
          {/* Animated background glow */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
          </div>

          <div className="relative px-6 py-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-600/20 border border-cyan-500/50 flex items-center justify-center flex-shrink-0">
                  <Radio className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm font-mono tracking-wider">CB51 APP</h3>
                  <p className="text-cyan-300 text-xs font-mono">Install to home screen</p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="mb-4 space-y-3">
              <p className="text-white text-sm leading-relaxed">
                Get instant push notifications and offline access. Install CB51 directly to your home screen.
              </p>
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-3 py-2">
                <Share2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Tap Share <ArrowRight className="w-3 h-3 inline mx-1" /> Add to Home Screen</span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleDismiss}
              className="w-full px-4 py-2.5 rounded-lg border border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 font-bold text-sm transition-all hover:border-cyan-500/80 cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}