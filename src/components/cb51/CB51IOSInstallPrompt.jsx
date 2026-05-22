import React, { useState, useEffect } from 'react';
import { X, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CB51 iOS Install Prompt — dead simple, feels native
 * Shows as a slim bottom banner, not a modal.
 * Tapping it opens a clean bottom sheet.
 */
export default function CB51IOSInstallPrompt() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.navigator.standalone === true;
    const dismissed = localStorage.getItem('cb51-ios-prompt-v2-dismissed');

    if (isIOS && !isStandalone && !dismissed) {
      const t = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    localStorage.setItem('cb51-ios-prompt-v2-dismissed', '1');
    setShow(false);
    setExpanded(false);
  }

  if (!show) return null;

  return (
    <AnimatePresence>
      {/* Slim banner */}
      {!expanded && (
        <motion.div
          key="banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-24 inset-x-4 z-40 flex items-center gap-3 bg-gray-950 border border-cyan-500/40 rounded-2xl px-4 py-3"
          style={{ boxShadow: '0 8px 32px rgba(6,182,212,0.2)' }}
        >
          {/* CB51 icon */}
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
            <span className="text-cyan-400 font-black font-mono text-xs leading-none">CB<br/>51</span>
          </div>

          <div className="flex-1 min-w-0" onClick={() => setExpanded(true)}>
            <p className="text-white font-bold text-sm leading-none mb-0.5">Add CB51 to your home screen</p>
            <p className="text-gray-500 text-xs">Get instant gig alerts</p>
          </div>

          <button
            onClick={() => setExpanded(true)}
            className="bg-cyan-500 text-black font-black text-xs px-3 py-1.5 rounded-lg flex-shrink-0"
          >
            Add
          </button>

          <button onClick={dismiss} className="p-1 text-gray-600 hover:text-gray-400">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Expanded instructions */}
      {expanded && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] bg-black/60"
            onClick={() => setExpanded(false)}
          />
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-[70] bg-gray-950 border-t border-cyan-500/30 rounded-t-3xl p-6 pb-10"
          >
            {/* Handle */}
            <div className="w-10 h-1 bg-gray-700 rounded-full mx-auto mb-5" />

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <span className="text-cyan-400 font-black font-mono text-sm leading-none text-center">CB<br/>51</span>
              </div>
              <div>
                <h3 className="text-white font-black text-lg">Add CB51 to Home Screen</h3>
                <p className="text-gray-500 text-sm">Unlock instant gig notifications</p>
              </div>
            </div>

            {/* Steps — visual, clean */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4 bg-black/40 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-400 font-black text-sm">1</span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-bold">Tap the Share icon</p>
                  <p className="text-gray-500 text-xs">The box with an arrow at the bottom of Safari</p>
                </div>
                <Share className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              </div>

              <div className="flex items-center gap-4 bg-black/40 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-400 font-black text-sm">2</span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Scroll down → "Add to Home Screen"</p>
                  <p className="text-gray-500 text-xs">It's in the share sheet</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-black/40 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 font-black text-sm">3</span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Tap "Add" — done ✓</p>
                  <p className="text-gray-500 text-xs">Open CB51 from your home screen — notifications work</p>
                </div>
              </div>
            </div>

            <button
              onClick={dismiss}
              className="w-full py-4 bg-gray-900 border border-white/10 rounded-xl text-gray-400 font-bold text-sm"
            >
              Remind me later
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}