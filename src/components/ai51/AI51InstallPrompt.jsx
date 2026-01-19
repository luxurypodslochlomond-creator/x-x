/**
 * AI51 INSTALL PROMPT - BEAUTIFUL HOME SCREEN INSTALL
 * Mobile first, one tap, gone from web
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { AI51IconMark } from '@/components/shared/AI51Icon';

export default function AI51InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
      setShowPrompt(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setInstalled(true);
      setShowPrompt(false);
      localStorage.setItem('ai51-installed', 'true');
    }

    setDeferredPrompt(null);
  };

  if (installed || !showPrompt || !deferredPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 left-4 right-4 z-50 lg:bottom-auto lg:top-32 lg:left-auto lg:right-6 lg:w-96"
      >
        <div className="bg-gradient-to-br from-black via-purple-950 to-black border-2 border-pink-500/30 rounded-2xl p-6 space-y-4"
          style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.4)' }}>
          
          {/* HEADER */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-pink-500/20 rounded-xl">
                <AI51IconMark size={32} animate={true} glow={false} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">AI51</h3>
                <p className="text-xs font-mono text-pink-300">On your home screen</p>
              </div>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* MESSAGE */}
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
            <p className="text-white text-sm leading-relaxed">
              <strong>Install AI51</strong> on your home screen. Works offline. One tap to connect. ♾️❤️
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <motion.button
              onClick={handleInstall}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              Install
            </motion.button>
            <motion.button
              onClick={() => setShowPrompt(false)}
              whileHover={{ scale: 1.02 }}
              className="flex-1 bg-black border border-white/20 hover:border-white/40 text-white font-bold py-3 rounded-lg transition-all"
            >
              Later
            </motion.button>
          </div>

          {/* FEATURES */}
          <div className="text-center border-t border-white/10 pt-3">
            <p className="text-xs text-gray-400 font-mono">✓ Offline • ✓ Private • ✓ Fast</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}