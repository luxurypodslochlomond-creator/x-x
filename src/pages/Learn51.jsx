import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, UserCircle, Heart } from 'lucide-react';
import LearnProfile, { getProfiles, getActiveProfile, getProfileStars } from '@/components/learn51/LearnProfile';

// ─── UNIVERSAL DESIGN PRINCIPLES ─────────────────────────────────────────────
// 1. One thing at a time. No competing elements.
// 2. Text breathes. Generous line-height, never cramped.
// 3. Tap targets huge. No anxiety about missing.
// 4. Motion purposeful. Never decorative or distracting.
// 5. Colour carries meaning. Not decoration.
// 6. High contrast. Warm, not harsh.
// 7. Zero clutter. If it's on screen, it matters.
// This works for ADHD, dyslexia, anxiety, every brain — by default. No labels.
// ─────────────────────────────────────────────────────────────────────────────

const TILES = [
  {
    id: 'ai',
    symbol: '◈',
    title: 'AI Tutor',
    sub: 'Learns what you love. Teaches everything through it.',
    url: '/Learn51AI',
    c1: '#7c3aed',
    c2: '#4f46e5',
    glow: '#7c3aed',
    span: 2,
  },
  {
    id: 'maths',
    symbol: '∑',
    title: 'Magic Maths',
    sub: 'Numbers that click',
    url: '/GeorgieMaths',
    c1: '#7e22ce',
    c2: '#6d28d9',
    glow: '#a855f7',
    span: 1,
  },
  {
    id: 'literacy',
    symbol: '⌘',
    title: 'Literacy',
    sub: 'Words & stories',
    url: '/Literacy51',
    c1: '#065f46',
    c2: '#047857',
    glow: '#10b981',
    span: 1,
  },
  {
    id: 'world',
    symbol: '◎',
    title: 'Real World',
    sub: 'Nature · space · science',
    url: '/YoungWarriors',
    c1: '#92400e',
    c2: '#b45309',
    glow: '#f59e0b',
    span: 1,
  },
  {
    id: 'life',
    symbol: '◉',
    title: 'Life Skills',
    sub: 'Money · health · rights',
    url: '/LifeSkills51',
    c1: '#831843',
    c2: '#9d174d',
    glow: '#f472b6',
    span: 1,
  },
];

// Pixel-style symbol rendered large — universally readable, no letter confusion
function PixelSymbol({ char, color, size = 56 }) {
  return (
    <div
      className="font-black select-none leading-none"
      style={{
        fontSize: size,
        color,
        fontFamily: '"Courier New", monospace',
        textShadow: `0 0 20px ${color}80, 0 0 40px ${color}40`,
        letterSpacing: '-2px',
      }}
    >
      {char}
    </div>
  );
}

function Tile({ tile, delay }) {
  const isWide = tile.span === 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={isWide ? 'col-span-2' : 'col-span-1'}
    >
      <Link to={tile.url}>
        <div
          className="relative overflow-hidden rounded-[28px] p-6 flex flex-col justify-between active:scale-[0.97] transition-transform"
          style={{
            background: `linear-gradient(145deg, ${tile.c1}dd, ${tile.c2}aa)`,
            border: `1px solid ${tile.glow}30`,
            minHeight: isWide ? '160px' : '148px',
            boxShadow: `0 4px 32px ${tile.glow}18, inset 0 1px 0 rgba(255,255,255,0.08)`,
          }}
        >
          {/* Ambient glow — bottom right */}
          <div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none"
            style={{ background: tile.glow, opacity: 0.18 }}
          />

          {/* Top: symbol */}
          <PixelSymbol char={tile.symbol} color={tile.glow} size={isWide ? 48 : 42} />

          {/* Bottom: text — large, spaced, breathable */}
          <div className="relative z-10 mt-3">
            <p
              className="font-black leading-tight"
              style={{
                fontSize: isWide ? '22px' : '18px',
                color: 'rgba(255,255,255,0.95)',
                letterSpacing: '-0.3px',
              }}
            >
              {tile.title}
            </p>
            <p
              className="mt-1 leading-relaxed"
              style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.45)',
                fontWeight: 500,
              }}
            >
              {tile.sub}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Check if kid has used AI tutor before — personalise the tile
const getAITileMemory = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('learn51ai_progress') || 'null');
    if (saved?.interest && saved?.stars > 0) return saved;
    return null;
  } catch { return null; }
};

export default function Learn51Page() {
  const [showProfilePicker, setShowProfilePicker] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState(getActiveProfile);
  const [profiles, setProfiles] = useState(getProfiles);
  const aiMemory = getAITileMemory();

  const activeProfile = profiles.find(p => p.id === activeProfileId) || null;
  const stars = activeProfileId ? getProfileStars(activeProfileId) : 0;

  const handleProfileSelected = (profile) => {
    setActiveProfileId(profile.id);
    setProfiles(getProfiles());
    setShowProfilePicker(false);
  };

  if (showProfilePicker) {
    return <LearnProfile onSelect={handleProfileSelected} />;
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: 'radial-gradient(ellipse at 30% 0%, #1a0a2e 0%, #05080f 60%)' }}
    >
      <div className="max-w-md mx-auto px-4 pt-8 pb-20">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between mb-8"
        >
          {/* Wordmark */}
          <div>
            <h1
              className="font-black leading-none tracking-tight"
              style={{
                fontSize: '32px',
                background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 50%, #34d399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Learn51
            </h1>
            <p
              className="mt-1.5 leading-relaxed"
              style={{ fontSize: '13px', color: 'rgba(255,255,255,0.28)', fontWeight: 500 }}
            >
              Free for every child on Earth
            </p>
          </div>

          {/* Profile — large tap target, always visible */}
          <button
            onClick={() => setShowProfilePicker(true)}
            className="flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 border transition-all active:scale-95"
            style={{
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.05)',
              minWidth: '80px',
            }}
          >
            {activeProfile ? (
              <>
                <span className="text-2xl leading-none">{activeProfile.avatar}</span>
                <div className="text-left">
                  <p className="text-white font-black text-xs leading-none">{activeProfile.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-black">{stars}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-1.5">
                <UserCircle className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.25)' }} />
                <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  You
                </span>
              </div>
            )}
          </button>
        </motion.div>

        {/* ── TILE GRID ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {TILES.map((tile, i) => {
            // Personalise AI tile if we know their interest
            const personalised = tile.id === 'ai' && aiMemory
              ? { ...tile, sub: `${aiMemory.stars}⭐ earned · loves ${aiMemory.interest} · pick up where you left off` }
              : tile;
            return <Tile key={tile.id} tile={personalised} delay={i * 0.06 + 0.1} />;
          })}
        </div>

        {/* ── TRUST — ultra minimal, not patronising ─────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mb-8"
          style={{
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            padding: '16px 20px',
          }}
        >
          <p
            className="font-black uppercase tracking-widest mb-3"
            style={{ fontSize: '10px', color: 'rgba(255,255,255,0.18)' }}
          >
            For parents & teachers
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              'No data collected',
              'No login needed',
              'No adverts. Ever.',
              'Works offline',
            ].map(text => (
              <div key={text} className="flex items-center gap-2">
                <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 900 }}>✓</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', fontWeight: 500 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── FOOTER ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="text-center space-y-2"
        >
          <Link
            to="/SupportLearn51"
            className="inline-flex items-center gap-2 transition-all active:scale-95"
            style={{ color: 'rgba(255,255,255,0.18)', fontSize: '12px', fontWeight: 700 }}
          >
            <Heart className="w-3 h-3" style={{ color: '#f472b6' }} />
            Keep it free — donate
          </Link>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.08)' }}>
            Built with love · Free forever · UF51
          </p>
        </motion.div>

      </div>
    </div>
  );
}