import React, { useState, useEffect } from 'react';
import { X, Share, Plus, Download } from 'lucide-react';

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
      const t = setTimeout(() => setShow(true), 3000);
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
    <div
      className="fixed left-3 right-3 z-[45] rounded-xl border border-cyan-500/50 bg-black/95 backdrop-blur-sm px-4 py-3 shadow-lg shadow-cyan-500/10"
      style={{ bottom: '80px' }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
          <Download className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-bold font-mono mb-0.5">Install CB51</p>
          <p className="text-gray-400 text-xs leading-relaxed">
            Tap <Share className="w-3 h-3 inline mx-0.5 text-cyan-400" /> Share → Add to Home Screen for push notifications
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}