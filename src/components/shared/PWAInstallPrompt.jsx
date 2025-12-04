import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * PWA INSTALL PROMPT
 * Detects if app can be installed
 * Shows native install prompt or manual instructions
 */

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // DISABLED during Creative Scotland review period
    // No popups = no distractions for reviewers
    return;
    
    // Check if already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                       window.navigator.standalone === true;
    setIsStandalone(standalone);

    // Don't show if already installed
    if (standalone) return;

    // Check if dismissed recently
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismiss = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismiss < 30) return; // Don't show for 30 days
    }

    // Listen for beforeinstallprompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Show manual instructions on iOS or if no prompt (only if not dismissed)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS && !dismissed) {
      setTimeout(() => setShowPrompt(true), 10000); // Wait 10 seconds instead of 3
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // Show manual instructions for iOS
      setShowInstructions(true);
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    setShowPrompt(false);
  };

  if (isStandalone || !showPrompt) return null;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  return (
    <AnimatePresence>
      {showInstructions ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
          onClick={() => setShowInstructions(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-gradient-to-br from-cyan-900 to-purple-900 border-4 border-cyan-500 rounded-2xl p-8 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">INSTALL UF51</h2>
              <button onClick={() => setShowInstructions(false)} className="text-white/60 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {isIOS ? (
              <div className="space-y-4 text-white">
                <p className="text-sm">Tap <span className="inline-flex items-center gap-1 bg-blue-500 rounded px-2 py-1 text-xs">Share <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/></svg></span> then scroll to <strong>"Add to Home Screen"</strong></p>
                <div className="bg-black/40 rounded-lg p-4 space-y-2">
                  <p className="text-xs text-cyan-300">1. Tap Share button (bottom toolbar)</p>
                  <p className="text-xs text-cyan-300">2. Scroll down and tap "Add to Home Screen"</p>
                  <p className="text-xs text-cyan-300">3. Tap "Add" in top right</p>
                  <p className="text-xs text-cyan-300">4. UF51 icon appears on your home screen</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-white">
                <p className="text-sm">Open Chrome menu (⋮) and select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></p>
                <div className="bg-black/40 rounded-lg p-4 space-y-2">
                  <p className="text-xs text-cyan-300">1. Tap menu (⋮) in browser</p>
                  <p className="text-xs text-cyan-300">2. Select "Install app" or "Add to Home screen"</p>
                  <p className="text-xs text-cyan-300">3. Confirm installation</p>
                </div>
              </div>
            )}

            <Button
              onClick={() => setShowInstructions(false)}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-4 font-black"
            >
              Got it ♾️❤️♾️
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
        >
          <div className="bg-gradient-to-r from-cyan-600 to-purple-600 border-4 border-white/20 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-black text-lg mb-1">Install UF51</h3>
                <p className="text-white/90 text-sm">
                  Works offline. Fast. No app store bullshit.
                </p>
              </div>
              <button onClick={handleDismiss} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleInstall}
                className="flex-1 bg-white hover:bg-gray-100 text-black font-black py-3"
              >
                <Download className="w-5 h-5 mr-2" />
                Install
              </Button>
              <Button
                onClick={handleDismiss}
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                Later
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-white/70 text-xs">
              <Zap className="w-4 h-4" />
              <span>1-tap install • 0 permissions • 100% yours</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}