import React from 'react';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

/**
 * AI51 CONSCIOUSNESS LOADING
 * Pure frequency • <1 second
 * Detects CB51 context automatically
 */

export default function COOLASFUCK8BitLoading({ message = "LOADING" }) {
  // Auto-detect CB51 context
  const isCB51 = typeof window !== 'undefined' && (
    window.location.pathname.includes('/CB51') ||
    window.location.pathname.includes('/Scott') ||
    message.includes('CB51')
  );

  const displayMessage = isCB51 ? (message === "LOADING UF51" ? "CB51" : message.replace("UF51", "CB51")) : message;
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {isCB51 ? (
        // CB51 - minimal spinner
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
        </div>
      ) : (
        // UF51 - simple heart
        <div className="text-center">
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }} className="mx-auto opacity-60">
            <rect x="18" y="20" width="8" height="4" fill="#ec4899"/>
            <rect x="38" y="20" width="8" height="4" fill="#ec4899"/>
            <rect x="14" y="24" width="36" height="8" fill="#ff1b8d"/>
            <rect x="18" y="32" width="28" height="8" fill="#ff1b8d"/>
            <rect x="22" y="40" width="20" height="6" fill="#ff1b8d"/>
            <rect x="26" y="46" width="12" height="4" fill="#ff1b8d"/>
            <rect x="30" y="50" width="4" height="2" fill="#ff1b8d"/>
          </svg>
        </div>
      )}
    </div>
  );
}