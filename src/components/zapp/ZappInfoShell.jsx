import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Bolt = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="zapp-shell-bolt" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="50%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
    <polygon points="19,2 8,18 15,18 13,30 24,14 17,14" fill="url(#zapp-shell-bolt)" />
  </svg>
);

// One shared shell for all ZAPP info pages (About / Terms / Privacy).
// Sticky header, continuous ambient glow, calm entrance, scroll-to-top on
// mount, and a consistent footer — so moving between them feels like one
// place, not three disconnected pages.
export default function ZappInfoShell({ title, subtitle, current, children }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const navLink = (to, label, activeLabel) => (
    <Link
      to={to}
      className={current === activeLabel
        ? 'text-violet-300 text-xs font-bold'
        : 'text-white/30 hover:text-white/60 text-xs transition-colors'}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0a0f', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Shared ambient — identical on every info page so the background feels continuous */}
      <div className="fixed inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-12%', right: '15%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* Sticky header — always reachable, same on every page */}
      <header
        className="sticky top-0 z-20"
        style={{ background: 'rgba(10,10,15,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-2xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link to="/Zapp" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Bolt />
            <span className="font-black text-lg" style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ZAPP</span>
            <span className="text-white/20 text-sm">/ {current}</span>
          </Link>
          <Link to="/Zapp" className="text-violet-400 hover:text-violet-300 text-xs font-bold transition-colors">← ZAPP</Link>
        </div>
      </header>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
          <h1 className="text-3xl font-black text-white mb-2">{title}</h1>
          {subtitle && <div className="text-white/30 text-xs mb-10 space-y-1">{subtitle}</div>}

          {children}

          {/* Consistent footer nav across all info pages */}
          <div className="flex flex-wrap gap-3 mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {navLink('/ZappAbout', 'About ZAPP', 'About')}
            <span className="text-white/10">·</span>
            {navLink('/ZappTerms', 'Terms of Use', 'Terms of Use')}
            <span className="text-white/10">·</span>
            {navLink('/ZappPrivacy', 'Privacy Policy', 'Privacy Policy')}
            <span className="text-white/10">·</span>
            <Link to="/Zapp" className="text-violet-400 hover:text-violet-300 text-xs font-bold transition-colors">← Back to ZAPP</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}