import React, { useState, useEffect } from 'react';
import BuzzStopEngine from '@/components/healing/BuzzStopEngine';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Menu, X, Scale, Eye, Info as InfoIcon, Wifi, WifiOff } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const BuzzStopMark = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path d="M2 16 L5 16 L7 9 L9 23 L11 13 L13 19 L16 4 L19 28 L21 12 L23 20 L25 16 L30 16"
      stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    <rect x="13" y="11" width="10" height="10" rx="2" fill="#000" stroke="#22c55e" strokeWidth="1.5" opacity="0.95"/>
    <rect x="15" y="13" width="6" height="6" rx="1" fill="#22c55e"/>
  </svg>
);

export default function BuzzStopPage() {
   const [menuOpen, setMenuOpen] = useState(false);
   const [isOnline, setIsOnline] = useState(navigator.onLine);
   const [swReady, setSwReady] = useState(false);
   const [testMode] = useState(() => window.location.search.includes('test=true') || window.self !== window.top);
   const [showEngine, setShowEngine] = useState(true);

  useEffect(() => {
    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/buzzstop-sw.js')
        .then((reg) => {
          console.log('BuzzStop offline cache ready ✓');
          setSwReady(true);
        })
        .catch((err) => console.log('SW registration optional:', err));
    }

    // Track online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── OFFLINE/CACHED BADGE ── */}
      {swReady && !isOnline && (
        <div className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-2 py-1.5 px-4"
          style={{ background: 'rgba(34,197,94,0.15)', borderBottom: '1px solid rgba(34,197,94,0.3)' }}>
          <WifiOff className="w-3 h-3" style={{ color: '#22c55e' }} />
          <span className="text-xs font-mono font-bold" style={{ color: '#22c55e' }}>OFFLINE MODE — fully cached, no internet needed</span>
        </div>
      )}

      {/* ── HEADER ── */}
      <header className={`fixed ${swReady && !isOnline ? 'top-7' : 'top-0'} left-0 right-0 z-50 transition-all`}
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(34,197,94,0.15)' }}>
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">

          {/* Logo */}
          <Link to="/BuzzStop" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <BuzzStopMark />
            <div>
              <span className="text-white font-black text-lg tracking-tight">BUZZ</span>
              <span className="font-black text-lg tracking-tight" style={{ color: '#22c55e' }}>STOP</span>
            </div>
          </Link>

          {/* Tagline — hidden on mobile */}
          <p className="hidden sm:block text-gray-600 text-xs font-mono tracking-wider">
            TINNITUS CANCELLATION ENGINE
          </p>

          <div className="flex items-center gap-3">
            {/* UF51 back link */}
            <Link to={createPageUrl('Welcome')}
              className="flex items-center gap-1.5 text-gray-600 hover:text-gray-400 font-mono text-xs transition-colors">
              <ArrowLeft className="w-3 h-3" />
              UF51
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: '#22c55e' }}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── SLIDE-DOWN MENU ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ borderTop: '1px solid rgba(34,197,94,0.12)', overflow: 'hidden', background: 'rgba(0,4,0,0.98)' }}
            >
              <div className="max-w-2xl mx-auto px-4 py-4 space-y-1">

                <Link to="/BuzzStopAbout" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all"
                  style={{ border: '1px solid rgba(34,197,94,0.15)', color: '#22c55e' }}>
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-sm">About</div>
                    <div className="text-xs text-gray-600">How it works · Relief vs cure · Privacy</div>
                  </div>
                </Link>

                <Link to="/BuzzStopTerms" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all"
                  style={{ border: '1px solid rgba(34,197,94,0.15)', color: '#22c55e' }}>
                  <Scale className="w-4 h-4 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-sm">Terms of Use</div>
                    <div className="text-xs text-gray-600">Legal terms + safety</div>
                  </div>
                </Link>

                <Link to="/BuzzStopPrivacy" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all"
                  style={{ border: '1px solid rgba(34,197,94,0.15)', color: '#22c55e' }}>
                  <Eye className="w-4 h-4 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-sm">Privacy Policy</div>
                    <div className="text-xs text-gray-600">Zero data stored. All local.</div>
                  </div>
                </Link>

                <div className="flex items-center gap-3 px-3 py-3 rounded-xl"
                  style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                  <InfoIcon className="w-4 h-4 flex-shrink-0 text-gray-600" />
                  <p className="text-xs text-gray-600">Not a medical device. Not medical advice. For wellbeing use only.</p>
                </div>

                <p className="text-center text-gray-800 text-xs font-mono pb-1">© 2026 Universal Frequency 51</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Content */}
       <div className={`${swReady && !isOnline ? 'pt-20' : 'pt-14'} pb-14 transition-all`}>
         {showEngine && <BuzzStopEngine onStop={() => setShowEngine(false)} />}
       </div>

      {/* ── FOOTER ── */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 px-4 py-2"
        style={{ background: 'rgba(0,4,0,0.96)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(34,197,94,0.15)' }}>
        <div className="flex items-center justify-center gap-3 max-w-2xl mx-auto">
          <p className="text-xs font-mono" style={{ color: 'rgba(34,197,94,0.7)' }}>Not a medical device · family@uf51.love</p>
        </div>
      </footer>
    </div>
  );
}