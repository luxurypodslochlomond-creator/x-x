import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Zap } from 'lucide-react';
import LearnProfile, { getProfiles, getActiveProfile, getProfileStars } from '@/components/learn51/LearnProfile';

// Floating particle — pure vibe
function Particle({ emoji, x, y, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none text-2xl"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0, rotate: -20 }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0, 1.2, 0.8],
        y: [0, -40],
        rotate: [0, 15],
      }}
      transition={{ delay, duration: 3, repeat: Infinity, repeatDelay: Math.random() * 4 + 2 }}
    >
      {emoji}
    </motion.div>
  );
}

const WORLD_TILES = [
  {
    id: 'ai',
    emoji: '🧠',
    title: 'Talk to your\nAI Tutor',
    glow: '#a855f7',
    bg: 'linear-gradient(145deg, #3b0764, #6d28d9)',
    url: '/Learn51AI',
    big: true,
    pulse: true,
  },
  {
    id: 'maths',
    emoji: '🔢',
    title: 'Magic\nMaths',
    glow: '#818cf8',
    bg: 'linear-gradient(145deg, #1e1b4b, #3730a3)',
    url: '/GeorgieMaths',
  },
  {
    id: 'literacy',
    emoji: '📖',
    title: 'Reading\n& Words',
    glow: '#34d399',
    bg: 'linear-gradient(145deg, #022c22, #065f46)',
    url: '/Literacy51',
  },
  {
    id: 'world',
    emoji: '🌍',
    title: 'Real\nWorld',
    glow: '#fbbf24',
    bg: 'linear-gradient(145deg, #451a03, #92400e)',
    url: '/YoungWarriors',
  },
  {
    id: 'life',
    emoji: '⚡',
    title: 'Life\nSkills',
    glow: '#f472b6',
    bg: 'linear-gradient(145deg, #4a044e, #86198f)',
    url: '/LifeSkills51',
  },
];

const PARTICLES = [
  { emoji: '⭐', x: 10, y: 15, delay: 0 },
  { emoji: '🚀', x: 85, y: 10, delay: 1.2 },
  { emoji: '💡', x: 75, y: 60, delay: 0.6 },
  { emoji: '🌟', x: 5, y: 70, delay: 2 },
  { emoji: '✨', x: 50, y: 5, delay: 1.8 },
  { emoji: '🎯', x: 90, y: 80, delay: 0.4 },
];

const getAITileMemory = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('learn51ai_progress') || 'null');
    if (saved?.interest && saved?.stars > 0) return saved;
    return null;
  } catch { return null; }
};

// Big bouncy card
function WorldTile({ tile, delay, index }) {
  const [tapped, setTapped] = useState(false);

  const handleTap = () => {
    setTapped(true);
    setTimeout(() => setTapped(false), 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: index % 2 === 0 ? -3 : 3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
      className={tile.big ? 'col-span-2' : 'col-span-1'}
    >
      <Link to={tile.url} onClick={handleTap}>
        <motion.div
          animate={tile.pulse && !tapped ? {
            boxShadow: [
              `0 0 20px ${tile.glow}40`,
              `0 0 50px ${tile.glow}80`,
              `0 0 20px ${tile.glow}40`,
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          whileTap={{ scale: 0.92, rotate: index % 2 === 0 ? -2 : 2 }}
          className="relative overflow-hidden flex flex-col items-center justify-center text-center active:scale-95"
          style={{
            background: tile.bg,
            borderRadius: tile.big ? '32px' : '28px',
            minHeight: tile.big ? '160px' : '140px',
            border: `2px solid ${tile.glow}50`,
            boxShadow: `0 8px 32px ${tile.glow}25`,
          }}
        >
          {/* Glow blob behind emoji */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 40%, ${tile.glow}20 0%, transparent 70%)`,
            }}
          />

          {/* Emoji — HUGE */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 }}
            style={{ fontSize: tile.big ? '56px' : '44px', lineHeight: 1 }}
          >
            {tile.emoji}
          </motion.div>

          {/* Title */}
          <p
            className="font-black mt-3 leading-tight relative z-10 whitespace-pre-line px-2"
            style={{
              fontSize: tile.big ? '20px' : '16px',
              color: 'rgba(255,255,255,0.95)',
              textShadow: `0 0 20px ${tile.glow}80`,
            }}
          >
            {tile.title}
          </p>

          {/* Tap ripple */}
          <AnimatePresence>
            {tapped && (
              <motion.div
                className="absolute inset-0 rounded-[32px]"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                style={{ background: 'rgba(255,255,255,0.15)' }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function Learn51Page() {
  const [showProfilePicker, setShowProfilePicker] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState(getActiveProfile);
  const [profiles, setProfiles] = useState(getProfiles);
  const [greeting, setGreeting] = useState('');
  const aiMemory = getAITileMemory();

  const activeProfile = profiles.find(p => p.id === activeProfileId) || null;
  const stars = activeProfileId ? getProfileStars(activeProfileId) : 0;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Hey');
    else setGreeting('Evening');
  }, []);

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
      className="min-h-screen text-white relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 20% 0%, #1a0a2e 0%, #050810 70%)' }}
    >
      {/* Floating particles — ambient magic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      <div className="max-w-md mx-auto px-4 pt-10 pb-24 relative z-10">

        {/* ── HEADER ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="flex items-center justify-between mb-8"
        >
          {/* Greeting */}
          <div>
            {activeProfile ? (
              <>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
                  {greeting} 👋
                </p>
                <h1
                  className="font-black leading-tight"
                  style={{ fontSize: '28px', color: 'white' }}
                >
                  {activeProfile.avatar} {activeProfile.name}
                </h1>
                {stars > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-yellow-400 font-black text-sm">{stars} stars earned!</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
                  Welcome to
                </p>
                <h1
                  className="font-black leading-tight"
                  style={{
                    fontSize: '34px',
                    background: 'linear-gradient(135deg, #a78bfa, #38bdf8, #34d399)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Learn51 🚀
                </h1>
              </>
            )}
          </div>

          {/* Profile button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowProfilePicker(true)}
            className="flex flex-col items-center justify-center rounded-2xl p-3"
            style={{
              border: '2px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.06)',
              minWidth: '60px',
            }}
          >
            <span className="text-2xl">{activeProfile?.avatar || '👤'}</span>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 700, marginTop: 2 }}>
              {activeProfile ? 'switch' : 'who?'}
            </span>
          </motion.button>
        </motion.div>

        {/* ── NUDGE if no profile ──────────────────────── */}
        {!activeProfile && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowProfilePicker(true)}
            className="w-full mb-6 py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-lg"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
              boxShadow: '0 8px 30px rgba(124,58,237,0.4)',
              color: 'white',
            }}
          >
            <Zap className="w-5 h-5" />
            Tap here to start! ✨
          </motion.button>
        )}

        {/* ── AI TUTOR CALL OUT if they have memory ─── */}
        {aiMemory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-5"
          >
            <Link to="/Learn51AI">
              <div
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))',
                  border: '2px solid rgba(124,58,237,0.4)',
                }}
              >
                <span className="text-3xl">🧠</span>
                <div>
                  <p className="font-black text-white text-sm">Continue learning!</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                    {aiMemory.stars}⭐ · loves {aiMemory.interest} · pick up where you left off →
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* ── WORLD TILES ─────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {WORLD_TILES.map((tile, i) => (
            <WorldTile key={tile.id} tile={tile} delay={i * 0.08 + 0.15} index={i} />
          ))}
        </div>

        {/* ── TRUST strip — tiny, not school-ish ──────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-4 mb-6 flex-wrap"
        >
          {['🔒 No data', '🚫 No ads', '✈️ Works offline', '💛 Always free'].map(item => (
            <span
              key={item}
              className="font-bold"
              style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* ── FOOTER ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Link
            to="/SupportLearn51"
            className="inline-flex items-center gap-2"
            style={{ color: 'rgba(255,255,255,0.15)', fontSize: '12px', fontWeight: 700 }}
          >
            <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
            Keep it free — donate
          </Link>
        </motion.div>

      </div>
    </div>
  );
}