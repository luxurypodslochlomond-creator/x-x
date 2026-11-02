import React, { useState, useEffect } from 'react';
import BuzzStopEngine from '@/components/healing/BuzzStopEngine';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Menu, X, Scale, Eye, Info as InfoIcon, Wifi, WifiOff, AlertCircle } from 'lucide-react';
import BuzzStopReportWidget from '@/components/healing/BuzzStopReportWidget';
import { AnimatePresence, motion } from 'framer-motion';
import { isPreviewSandbox } from '@/lib/previewWorkers';

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
   const [reportOpen, setReportOpen] = useState(false);
   const [isOnline, setIsOnline] = useState(navigator.onLine);
   const [swReady, setSwReady] = useState(false);
   const [testMode] = useState(() => window.location.search.includes('test=true') || window.self !== window.top);
   const [showEngine, setShowEngine] = useState(0);

  useEffect(() => {
    // Register service worker for offline support
    if ('serviceWorker' in navigator && !isPreviewSandbox()) {
      navigator.serviceWorker.register('/api/functions/buzzstopServiceWorker')
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
    <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative">

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

        {/* ── FULL SCREEN MENU OVERLAY ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[200] flex flex-col"
              style={{ background: '#000000', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: '1px solid rgba(34,197,94,0.2)' }}>
                <div className="flex items-center gap-2.5">
                  <BuzzStopMark />
                  <div>
                    <span className="text-white font-black text-xl tracking-tight">BUZZ</span>
                    <span className="font-black text-xl tracking-tight" style={{ color: '#22c55e' }}>STOP</span>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 flex flex-col justify-center px-6 space-y-3 max-w-sm mx-auto w-full">

                <Link to="/BuzzStopAbout" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 px-5 py-5 rounded-2xl transition-all"
                  style={{ background: 'rgba(34,197,94,0.07)', border: '1.5px solid rgba(34,197,94,0.25)' }}>
                  <InfoIcon className="w-6 h-6 flex-shrink-0" style={{ color: '#22c55e' }} />
                  <div>
                    <div className="font-black text-lg text-white">About BuzzStop</div>
                    <div className="text-sm mt-0.5" style={{ color: 'rgba(34,197,94,0.6)' }}>How it works · Free forever</div>
                  </div>
                </Link>

                <Link to="/BuzzStopTerms" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 px-5 py-5 rounded-2xl transition-all"
                  style={{ background: 'rgba(34,197,94,0.07)', border: '1.5px solid rgba(34,197,94,0.25)' }}>
                  <Scale className="w-6 h-6 flex-shrink-0" style={{ color: '#22c55e' }} />
                  <div>
                    <div className="font-black text-lg text-white">Terms of Use</div>
                    <div className="text-sm mt-0.5" style={{ color: 'rgba(34,197,94,0.6)' }}>Legal terms + safety info</div>
                  </div>
                </Link>

                <Link to="/BuzzStopPrivacy" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 px-5 py-5 rounded-2xl transition-all"
                  style={{ background: 'rgba(34,197,94,0.07)', border: '1.5px solid rgba(34,197,94,0.25)' }}>
                  <Eye className="w-6 h-6 flex-shrink-0" style={{ color: '#22c55e' }} />
                  <div>
                    <div className="font-black text-lg text-white">Privacy Policy</div>
                    <div className="text-sm mt-0.5" style={{ color: 'rgba(34,197,94,0.6)' }}>Zero data stored · All local</div>
                  </div>
                </Link>

                <button onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-4 px-5 py-5 rounded-2xl transition-all text-left"
                  style={{ background: 'rgba(34,197,94,0.07)', border: '1.5px solid rgba(34,197,94,0.25)' }}>
                  <ArrowLeft className="w-6 h-6 flex-shrink-0" style={{ color: '#22c55e' }} />
                  <div>
                    <div className="font-black text-lg text-white">Back to BuzzStop</div>
                    <div className="text-sm mt-0.5" style={{ color: 'rgba(34,197,94,0.6)' }}>Close menu · Return to app</div>
                  </div>
                </button>
              </div>

              {/* Footer */}
              <div className="px-6 py-6 text-center space-y-2"
                style={{ borderTop: '1px solid rgba(34,197,94,0.1)' }}>
                <p className="font-black text-xs tracking-widest" style={{ color: '#22c55e' }}>
                  100% FREE · ALWAYS · NO ACCOUNTS
                </p>
                <p className="text-gray-800 text-xs">Not a medical device · © 2026 Universal Frequency 51</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Content */}
       <div className={`${swReady && !isOnline ? 'pt-20' : 'pt-14'} pb-14 transition-all`}>
         <BuzzStopEngine key={showEngine} onStop={() => setShowEngine(n => n + 1)} />
       </div>

      {/* ── FOOTER ── */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3"
        style={{ background: 'rgba(0,4,0,0.96)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(34,197,94,0.15)' }}>
        <div className="flex flex-col items-center justify-center gap-3 max-w-2xl mx-auto text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono" style={{ color: 'rgba(34,197,94,0.7)' }}>
            <Link to="/BuzzStopAbout" className="hover:text-green-500 transition-colors">About</Link>
            <span>·</span>
            <Link to="/BuzzStopTerms" className="hover:text-green-500 transition-colors">Terms</Link>
            <span>·</span>
            <Link to="/BuzzStopPrivacy" className="hover:text-green-500 transition-colors">Privacy</Link>
            <span>·</span>
            <button onClick={() => setReportOpen(true)} className="hover:text-green-500 transition-colors flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Report
            </button>
          </div>
          <p className="text-xs font-mono" style={{ color: 'rgba(34,197,94,0.5)' }}>© 2026 Universal Frequency 51</p>
        </div>
      </footer>

      {/* ── PROBLEM REPORTER ── */}
      <BuzzStopReportWidget open={reportOpen} onClose={() => setReportOpen(false)} />
    </div>
  );
}