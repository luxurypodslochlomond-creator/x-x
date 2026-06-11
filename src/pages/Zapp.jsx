import React, { useState } from 'react';
import ZappCreator from '@/components/zapp/ZappCreator';
import ZappLiveOutput from '@/components/zapp/ZappLiveOutput';
import { motion, AnimatePresence } from 'framer-motion';

// Inline bolt so no extra import needed
const Bolt = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="bolt-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="50%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
    <polygon points="19,2 8,18 15,18 13,30 24,14 17,14" fill="url(#bolt-g)" />
  </svg>
);

export default function Zapp() {
  const [idea, setIdea] = useState('');
  const [phase, setPhase] = useState('home'); // home | building
  const [builderMode, setBuilderMode] = useState(false);

  const handleIdeaSubmit = (ideaText) => {
    setIdea(ideaText);
    setPhase('building');
  };

  const handleReset = () => {
    setIdea('');
    setPhase('home');
  };

  return (
    <div
      className="min-h-screen text-white overflow-hidden"
      style={{
        background: '#0a0a0f',
        fontFamily: "'Inter', system-ui, sans-serif"
      }}
    >
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: 'absolute', top: '-10%', left: '20%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '20%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(219,39,119,0.10) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '5%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)'
        }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(120,80,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(120,80,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.button
          onClick={handleReset}
          className="flex items-center gap-2.5"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            animate={phase === 'home' ? {
              filter: ['drop-shadow(0 0 8px rgba(167,139,250,0.8))', 'drop-shadow(0 0 20px rgba(244,114,182,1))', 'drop-shadow(0 0 8px rgba(167,139,250,0.8))']
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Bolt size={32} />
          </motion.div>
          <span className="font-black text-2xl tracking-tight" style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>ZAPP</span>
          {phase === 'home' && (
            <span className="text-white/25 text-xs font-semibold hidden sm:block">
              build anything · AI · for kids
            </span>
          )}
        </motion.button>

        <div className="flex items-center gap-3">
          {/* Builder mode toggle */}
          <button
            onClick={() => setBuilderMode(!builderMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{
              background: builderMode ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)',
              border: builderMode ? '1px solid rgba(167,139,250,0.5)' : '1px solid rgba(255,255,255,0.08)',
              color: builderMode ? '#c4b5fd' : 'rgba(255,255,255,0.2)',
            }}
          >
            <span className="font-mono text-[11px]">{builderMode ? '</>' : '<>'}</span>
            <span className="hidden sm:inline">{builderMode ? 'builder mode' : 'magic mode'}</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.12)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-70" />
            safe · free · no account
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {phase === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <ZappCreator onSubmit={handleIdeaSubmit} />
            </motion.div>
          ) : (
            <motion.div
              key="building"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ZappLiveOutput
                idea={idea}
                builderMode={builderMode}
                onComplete={() => {}}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}