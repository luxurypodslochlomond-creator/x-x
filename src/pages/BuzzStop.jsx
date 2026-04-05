import React, { useState } from 'react';
import BuzzStopEngine from '@/components/healing/BuzzStopEngine';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';
import LiveClock from '@/components/shared/LiveClock';

// Custom BuzzStop logo mark
const BuzzStopMark = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    {/* Waveform with a cut/stop through it */}
    <path d="M2 16 L5 16 L7 9 L9 23 L11 13 L13 19 L16 4 L19 28 L21 12 L23 20 L25 16 L30 16"
      stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    {/* Stop block overlay */}
    <rect x="13" y="11" width="10" height="10" rx="2" fill="#000" stroke="#22c55e" strokeWidth="1.5" opacity="0.95"/>
    <rect x="15" y="13" width="6" height="6" rx="1" fill="#22c55e"/>
  </svg>
);

export default function BuzzStopPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── BUZZSTOP HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 lg:left-80"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(34,197,94,0.15)' }}>
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <BuzzStopMark />
            <div>
              <span className="text-white font-black text-lg tracking-tight">BUZZ</span>
              <span className="font-black text-lg tracking-tight" style={{ color: '#22c55e' }}>STOP</span>
            </div>
          </div>

          {/* Tagline — hidden on mobile */}
          <p className="hidden sm:block text-gray-600 text-xs font-mono tracking-wider">
            TINNITUS CANCELLATION ENGINE
          </p>

          {/* UF51 link */}
          <Link to={createPageUrl('Welcome')}
            className="flex items-center gap-1.5 text-gray-600 hover:text-gray-400 font-mono text-xs transition-colors">
            <ArrowLeft className="w-3 h-3" />
            UF51
          </Link>
        </div>
      </header>

      {/* Push content below header */}
      <div className="pt-14 pb-16">
        <BuzzStopEngine />
      </div>

      {/* ── FOOTER ── */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 px-4 py-2.5"
        style={{ background: 'rgba(0,6,0,0.95)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(34,197,94,0.2)' }}>
        <div className="flex items-center justify-center gap-3 text-xs font-mono flex-wrap">
          <Link to="/BuzzStopTerms" className="transition-colors" style={{ color: '#22c55e' }}>Terms</Link>
          <span style={{ color: 'rgba(34,197,94,0.3)' }}>·</span>
          <Link to="/BuzzStopPrivacy" className="transition-colors" style={{ color: '#22c55e' }}>Privacy</Link>
          <span style={{ color: 'rgba(34,197,94,0.3)' }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>Not medical advice</span>
          <span style={{ color: 'rgba(34,197,94,0.3)' }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>© 2026 UF51</span>
        </div>
        <div className="flex justify-center mt-1">
          <LiveClock />
        </div>
      </footer>
    </div>
  );
}