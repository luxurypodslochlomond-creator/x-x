import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Bolt = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="bolt-g-a" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="50%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
    <polygon points="19,2 8,18 15,18 13,30 24,14 17,14" fill="url(#bolt-g-a)" />
  </svg>
);

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-black text-white mb-3" style={{ color: '#c4b5fd' }}>{title}</h2>
    <div className="text-white/60 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
);

export default function ZappAbout() {
  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0a0f', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <Link to="/Zapp" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Bolt />
            <span className="font-black text-xl" style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ZAPP</span>
          </Link>
          <span className="text-white/20 text-sm">/ About</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          <h1 className="text-3xl font-black text-white mb-2">What is ZAPP?</h1>
          <p className="text-white/40 text-sm mb-10">Built by Universal Frequency 51 · UF51</p>

          <Section title="✨ The idea">
            <p>ZAPP lets any kid — or adult — describe any idea and watch it turn into a real, working, playable app in seconds.</p>
            <p>No code. No account. No ads. No nonsense. Just pure creative freedom.</p>
          </Section>

          <Section title="👧 Who it's for">
            <p>ZAPP is built primarily for children aged 8–13. We believe every child on Earth deserves the ability to build something — not just consume content.</p>
            <p>Adults are welcome too. The experience is designed to feel magical at any age.</p>
          </Section>

          <Section title="🔒 Safety first">
            <p>ZAPP is designed with children in mind:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>No account required — ever</li>
              <li>No personal data collected from kids</li>
              <li>No advertising of any kind</li>
              <li>No in-app purchases targeting children</li>
              <li>All generated apps run in a sandboxed environment — they can't access your device, camera, contacts, or files</li>
              <li>All feedback inside generated games is kind and encouraging — never harsh</li>
            </ul>
          </Section>

          <Section title="🤖 How it works">
            <p>You describe an idea. Our AI (powered by Google Gemini) builds a complete, working HTML app — games, puzzles, art tools, music makers — and renders it instantly in your browser.</p>
            <p>Everything runs locally in your browser. The AI does the hard part. You get to play the result in seconds.</p>
          </Section>

          <Section title="🏆 Hall of Fame">
            <p>Kids can optionally save their creation to the ZAPP Hall of Fame — a public gallery where anyone can play and remix each other's apps.</p>
            <p>Saving is always optional. You only share a first name (optional). Nothing else is collected.</p>
          </Section>

          <Section title="🌍 Who built this?">
            <p>ZAPP is part of the Universal Frequency 51 (UF51) platform — a not-for-profit ecosystem of tools that heal, educate, and empower people.</p>
            <p>We believe technology should feel like a superpower, not a trap. ZAPP is our way of giving that superpower to kids — for free, forever.</p>
          </Section>

          <div className="flex flex-wrap gap-3 mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Link to="/ZappTerms" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms of Use</Link>
            <span className="text-white/10">·</span>
            <Link to="/ZappPrivacy" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy Policy</Link>
            <span className="text-white/10">·</span>
            <Link to="/Zapp" className="text-violet-400 hover:text-violet-300 text-xs font-bold transition-colors">← Back to ZAPP</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}