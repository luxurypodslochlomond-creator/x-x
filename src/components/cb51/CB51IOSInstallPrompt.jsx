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
      initial={{ y: 120 }}
      animate={{ y: 0 }}
      exit={{ y: 120 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed left-4 right-4 bottom-4 z-[35]"
    >
      <div className="rounded-2xl bg-gradient-to-br from-black via-[#0a1f2a] to-black border-2 border-cyan-500/40 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/30 to-cyan-600/20 border border-cyan-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Radio className="w-5 h-5 text-cyan-400" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="text-white font-black text-sm font-mono tracking-wider">CB51 APP</h3>
                <p className="text-cyan-300 text-xs font-mono">Push notifications + offline</p>
              </div>
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2.5 flex items-center gap-2 text-cyan-300 text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-2.5 py-1.5">
              <Share2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>Share → Add to Home Screen</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}