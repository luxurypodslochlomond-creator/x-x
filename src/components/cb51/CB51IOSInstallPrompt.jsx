import React, { useState, useEffect } from 'react';
import { X, Share2, ChevronDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';

/**
 * Shows iOS users how to install CB51 to home screen
 * Only shows on iOS Safari when NOT already installed as PWA
 */
export default function CB51IOSInstallPrompt() {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

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
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed right-4 bottom-20 z-[35]"
    >
      {/* Main button with dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-600/20 border-2 border-cyan-500/50 hover:border-cyan-500/80 flex items-center justify-center flex-shrink-0 transition-all hover:shadow-xl hover:shadow-cyan-500/30 cursor-pointer"
        >
          <COOLASFUCKWaves size={28} animate={true} />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 bottom-full mb-3 w-60 rounded-2xl bg-gradient-to-br from-black via-[#0a1f2a] to-black border-2 border-cyan-500/40 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 p-4 space-y-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-black text-sm font-mono tracking-wider">CB51 APP</h3>
                <p className="text-cyan-300 text-xs font-mono">Install to home screen</p>
              </div>
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Info text */}
            <p className="text-white text-xs leading-relaxed">
              Get push notifications and offline access instantly.
            </p>

            {/* Action button */}
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-3 py-2">
              <Share2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>Share → Add to Home Screen</span>
            </div>

            {/* Close dropdown */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-3 py-2 rounded-lg border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 hover:text-cyan-200 text-xs font-mono transition-all cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </motion.div>
  );
}