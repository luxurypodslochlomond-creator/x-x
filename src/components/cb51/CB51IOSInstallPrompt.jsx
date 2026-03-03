import React, { useState, useEffect } from 'react';
import { X, Share, Plus } from 'lucide-react';

/**
 * Shows iOS users how to install CB51 to home screen
 * Only shows on iOS Safari when NOT already installed as PWA
 */
export default function CB51IOSInstallPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show on iOS Safari, not already installed
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.navigator.standalone === true;
    const dismissed = localStorage.getItem('cb51-ios-prompt-dismissed');

    if (isIOS && !isStandalone && !dismissed) {
      // Small delay so it doesn't jump in instantly
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
    <div className="fixed bottom-6 left-4 right-4 z-[200] animate-in slide-in-from-bottom-4">
      <div
        className="bg-black border-2 border-cyan-500/60 rounded-2xl p-4 shadow-2xl"
        style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
              <span className="text-black font-black text-xs">CB</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Install CB51</p>
              <p className="text-cyan-400 text-xs font-mono">Get real-time gig notifications</p>
            </div>
          </div>
          <button onClick={handleDismiss} className="text-gray-500 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
              <span className="text-cyan-400 font-bold text-xs">1</span>
            </div>
            <span>Tap <Share className="w-4 h-4 inline text-cyan-400 mx-1" /> <span className="text-cyan-400 font-bold">Share</span> at the bottom of Safari</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
              <span className="text-cyan-400 font-bold text-xs">2</span>
            </div>
            <span>Tap <Plus className="w-4 h-4 inline text-cyan-400 mx-1" /> <span className="text-cyan-400 font-bold">Add to Home Screen</span></span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
              <span className="text-cyan-400 font-bold text-xs">3</span>
            </div>
            <span>Open CB51 from your home screen ✅</span>
          </div>
        </div>

        <p className="text-gray-600 text-xs mt-3 font-mono">
          Push notifications + badge count require installation
        </p>
      </div>
    </div>
  );
}