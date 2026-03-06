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

  const handleDismiss = (e) => {
    e.stopPropagation();
    localStorage.setItem('cb51-ios-prompt-dismissed', '1');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed top-[72px] left-0 right-0 z-[55] border-b border-cyan-500/40 bg-black/95 backdrop-blur-sm px-4 py-2.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-cyan-400 text-xs font-mono whitespace-nowrap">📲 Install CB51:</span>
          <span className="text-gray-300 text-xs truncate">
            Safari <Share className="w-3 h-3 inline mx-0.5 text-cyan-400" /> Share → <Plus className="w-3 h-3 inline mx-0.5 text-cyan-400" /> Add to Home Screen → get push notifications
          </span>
        </div>
        <button onClick={handleDismiss} className="text-gray-600 hover:text-white flex-shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}