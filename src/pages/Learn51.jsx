import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import LearnProfile, { getProfiles, getActiveProfile, getProfileStars } from '@/components/learn51/LearnProfile';

// ── STAR FIELD ────────────────────────────────────────────────────────────────
function StarField() {
  const stars = useRef(
    Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4,
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [s.opacity, s.opacity * 0.2, s.opacity] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
      {/* Nebula clouds */}
      <div className="absolute top-0 left-0 w-full h-full" style={{
        background: `
          radial-gradient(ellipse 60% 30% at 20% 15%, rgba(139,92,246,0.12) 0%, transparent 70%),
          radial-gradient(ellipse 40% 20% at 80% 70%, rgba(6,182,212,0.08) 0%, transparent 70%),
          radial-gradient(ellipse 50% 25% at 60% 30%, rgba(236,72,153,0.06) 0%, transparent 70%)
        `
      }} />
    </div>
  );
}

// ── CSS PLANET ────────────────────────────────────────────────────────────────
function Planet({ config, onClick, isSelected }) {
  const {
    size, color, glowColor, ringColor, hasRing, hasMoon,
    craters, atmosphere, label, sublabel, url, orbitX, orbitY, animDelay
  } = config;

  return (
    <Link to={url}>
      <motion.div
        className="absolute cursor-pointer"
        style={{ left: `${orbitX}%`, top: `${orbitY}%`, transform: 'translate(-50%, -50%)' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: animDelay, duration: 0.6, type: 'spring', stiffness: 160, damping: 14 }}
        whileTap={{ scale: 0.88 }}
      >
        {/* Orbit glow ring when selected */}
        {isSelected && (
          <motion.div
            className="absolute rounded-full"
            style={{
              width: size + 40,
              height: size + 40,
              top: -(20),
              left: -(20),
              border: `2px solid ${glowColor}60`,
              boxShadow: `0 0 30px ${glowColor}40`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* Atmosphere glow */}
        {atmosphere && (
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size + 24,
              height: size + 24,
              top: -12,
              left: -12,
              background: `radial-gradient(circle, transparent 40%, ${glowColor}25 70%, ${glowColor}08 100%)`,
              filter: `blur(4px)`,
            }}
          />
        )}

        {/* Saturn-style ring — behind planet */}
        {hasRing && (
          <div
            className="absolute pointer-events-none"
            style={{
              width: size * 1.9,
              height: size * 0.4,
              top: size * 0.3,
              left: -(size * 0.45),
              border: `4px solid ${ringColor}`,
              borderRadius: '50%',
              transform: 'rotateX(70deg)',
              boxShadow: `0 0 12px ${ringColor}60`,
              zIndex: 0,
            }}
          />
        )}

        {/* Planet body */}
        <motion.div
          className="relative rounded-full flex items-center justify-center"
          style={{
            width: size,
            height: size,
            background: color,
            boxShadow: `0 0 ${size * 0.5}px ${glowColor}50, inset -${size * 0.15}px -${size * 0.1}px ${size * 0.2}px rgba(0,0,0,0.4), inset ${size * 0.05}px ${size * 0.05}px ${size * 0.15}px rgba(255,255,255,0.15)`,
            zIndex: 1,
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4 + animDelay, repeat: Infinity, ease: 'easeInOut', delay: animDelay * 0.5 }}
        >
          {/* Surface bands */}
          {config.bands && config.bands.map((band, i) => (
            <div
              key={i}
              className="absolute w-full"
              style={{
                height: `${band.h}%`,
                top: `${band.top}%`,
                background: band.color,
                borderRadius: '50%',
                opacity: 0.4,
              }}
            />
          ))}

          {/* Craters */}
          {craters && craters.map((c, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: c.size,
                height: c.size,
                top: `${c.y}%`,
                left: `${c.x}%`,
                background: 'rgba(0,0,0,0.2)',
                boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.3)',
              }}
            />
          ))}
        </motion.div>

        {/* Moon */}
        {hasMoon && (
          <motion.div
            className="absolute rounded-full"
            style={{
              width: size * 0.22,
              height: size * 0.22,
              background: 'radial-gradient(circle at 35% 35%, #d4d4d8, #71717a)',
              boxShadow: '0 0 8px rgba(255,255,255,0.3)',
              transformOrigin: `${size * -0.7}px 0px`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* Label */}
        <div
          className="absolute text-center pointer-events-none"
          style={{ top: size + 10, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
        >
          <p className="font-black text-white leading-none" style={{ fontSize: size * 0.22, textShadow: `0 0 12px ${glowColor}` }}>
            {label}
          </p>
          <p className="font-medium mt-1" style={{ fontSize: size * 0.15, color: 'rgba(255,255,255,0.4)' }}>
            {sublabel}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

// ── PLANET CONFIG ─────────────────────────────────────────────────────────────
const PLANETS = [
  {
    id: 'sun',
    label: 'AI Tutor',
    sublabel: 'Your guide',
    url: '/Learn51AI',
    size: 100,
    color: 'radial-gradient(circle at 35% 30%, #fde68a, #f59e0b, #d97706, #92400e)',
    glowColor: '#fbbf24',
    atmosphere: true,
    orbitX: 50,
    orbitY: 22,
    animDelay: 0.1,
    bands: [
      { h: 15, top: 30, color: 'rgba(251,191,36,0.5)' },
      { h: 12, top: 55, color: 'rgba(217,119,6,0.4)' },
    ],
  },
  {
    id: 'maths',
    label: 'Maths',
    sublabel: 'Numbers & logic',
    url: '/GeorgieMaths',
    size: 72,
    color: 'radial-gradient(circle at 30% 30%, #a78bfa, #7c3aed, #4c1d95)',
    glowColor: '#8b5cf6',
    hasRing: true,
    ringColor: '#c4b5fd80',
    orbitX: 16,
    orbitY: 48,
    animDelay: 0.25,
    craters: [
      { size: 10, x: 20, y: 25 },
      { size: 6, x: 55, y: 60 },
    ],
  },
  {
    id: 'literacy',
    label: 'Reading',
    sublabel: 'Words & stories',
    url: '/Literacy51',
    size: 68,
    color: 'radial-gradient(circle at 35% 25%, #6ee7b7, #10b981, #065f46)',
    glowColor: '#34d399',
    hasMoon: true,
    atmosphere: true,
    orbitX: 82,
    orbitY: 46,
    animDelay: 0.4,
    bands: [
      { h: 20, top: 25, color: 'rgba(110,231,183,0.5)' },
    ],
  },
  {
    id: 'world',
    label: 'Real World',
    sublabel: 'Science & nature',
    url: '/YoungWarriors',
    size: 64,
    color: 'radial-gradient(circle at 30% 30%, #93c5fd, #3b82f6, #1e3a8a)',
    glowColor: '#60a5fa',
    atmosphere: true,
    orbitX: 25,
    orbitY: 74,
    animDelay: 0.55,
    bands: [
      { h: 25, top: 35, color: 'rgba(147,197,253,0.5)' },
    ],
    craters: [
      { size: 14, x: 30, y: 20 },
    ],
  },
  {
    id: 'life',
    label: 'Life Skills',
    sublabel: 'How the world works',
    url: '/LifeSkills51',
    size: 60,
    color: 'radial-gradient(circle at 35% 30%, #fca5a5, #ef4444, #7f1d1d)',
    glowColor: '#f87171',
    hasRing: true,
    ringColor: '#fca5a580',
    orbitX: 74,
    orbitY: 75,
    animDelay: 0.7,
    craters: [
      { size: 8, x: 40, y: 50 },
      { size: 5, x: 65, y: 25 },
    ],
  },
];

const getAITileMemory = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('learn51ai_progress') || 'null');
    if (saved?.interest && saved?.stars > 0) return saved;
    return null;
  } catch { return null; }
};

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Learn51Page() {
  const [showProfilePicker, setShowProfilePicker] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState(getActiveProfile);
  const [profiles, setProfiles] = useState(getProfiles);
  const [showIntro, setShowIntro] = useState(true);
  const aiMemory = getAITileMemory();

  const activeProfile = profiles.find(p => p.id === activeProfileId) || null;
  const stars = activeProfileId ? getProfileStars(activeProfileId) : 0;

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000);
    return () => clearTimeout(timer);
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
      className="min-h-screen text-white relative overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #0d0628 0%, #020408 60%, #000000 100%)',
        minHeight: '100svh',
      }}
    >
      <StarField />

      {/* ── INTRO SPLASH ─────────────────────────────── */}
      {showIntro && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: '#000' }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 1.8, times: [0, 0.6, 1] }}
        >
          <motion.div
            animate={{ scale: [0.8, 1.2, 1], opacity: [0, 1, 1] }}
            transition={{ duration: 1.2 }}
            className="text-center"
          >
            <div style={{ fontSize: 72 }}>🌌</div>
            <p className="font-black text-white mt-3 tracking-widest" style={{ fontSize: 13, letterSpacing: '0.3em', opacity: 0.5 }}>
              LEARN51
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* ── HUD TOP ──────────────────────────────────── */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-8 pb-2">
        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <p
            className="font-black tracking-[0.25em] uppercase"
            style={{
              fontSize: 13,
              background: 'linear-gradient(90deg, #a78bfa, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            LEARN51
          </p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em', fontWeight: 700 }}>
            FREE · EVERY CHILD · EARTH
          </p>
        </motion.div>

        {/* Profile HUD */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowProfilePicker(true)}
          className="flex items-center gap-2 rounded-full px-3 py-2"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span style={{ fontSize: 18 }}>{activeProfile?.avatar || '👾'}</span>
          {activeProfile && stars > 0 && (
            <span className="font-black text-yellow-400" style={{ fontSize: 11 }}>
              {stars}★
            </span>
          )}
          {!activeProfile && (
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.1em' }}>
              WHO?
            </span>
          )}
        </motion.button>
      </div>

      {/* ── MISSION TEXT ─────────────────────────────── */}
      <motion.div
        className="relative z-20 text-center px-6 mt-2 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.6 }}
      >
        {activeProfile ? (
          <p className="font-black text-white" style={{ fontSize: 22 }}>
            Welcome back, {activeProfile.name} {activeProfile.avatar}
          </p>
        ) : (
          <p className="font-black" style={{ fontSize: 20, color: 'rgba(255,255,255,0.9)' }}>
            Choose your planet 🚀
          </p>
        )}
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 4, fontWeight: 600, letterSpacing: '0.05em' }}>
          Tap a planet to begin exploring
        </p>
      </motion.div>

      {/* ── PLANET FIELD ─────────────────────────────── */}
      <motion.div
        className="relative z-10"
        style={{ height: '58vh', minHeight: 360 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        {PLANETS.map(planet => (
          <Planet key={planet.id} config={planet} />
        ))}

        {/* Orbit paths — subtle rings suggesting solar system */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.04 }}
        >
          <ellipse cx="50%" cy="22%" rx="18%" ry="5%" fill="none" stroke="white" strokeWidth="1" />
          <ellipse cx="50%" cy="48%" rx="40%" ry="12%" fill="none" stroke="white" strokeWidth="1" />
          <ellipse cx="50%" cy="74%" rx="52%" ry="15%" fill="none" stroke="white" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* ── CONTINUE BANNER if returning ─────────────── */}
      {aiMemory && (
        <motion.div
          className="relative z-20 mx-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
        >
          <Link to="/Learn51AI">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.08))',
                border: '1px solid rgba(251,191,36,0.25)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span style={{ fontSize: 24 }}>⭐</span>
              <div className="flex-1 min-w-0">
                <p className="font-black text-white" style={{ fontSize: 13 }}>Continue your journey</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                  {aiMemory.stars} stars · {aiMemory.interest} · AI Tutor
                </p>
              </div>
              <span style={{ fontSize: 18, opacity: 0.5 }}>→</span>
            </div>
          </Link>
        </motion.div>
      )}

      {/* ── NO PROFILE NUDGE ─────────────────────────── */}
      {!activeProfile && (
        <motion.div
          className="relative z-20 mx-4 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
        >
          <button
            onClick={() => setShowProfilePicker(true)}
            className="w-full py-3 rounded-2xl font-black text-sm tracking-widest uppercase"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.2))',
              border: '1px solid rgba(139,92,246,0.4)',
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.15em',
              backdropFilter: 'blur(10px)',
            }}
          >
            Create your explorer profile →
          </button>
        </motion.div>
      )}

      {/* ── BOTTOM HUD ───────────────────────────────── */}
      <motion.div
        className="relative z-20 flex items-center justify-between px-5 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
      >
        <div className="flex items-center gap-3 flex-wrap">
          {['🔒 Private', '✈️ Offline', '💛 Free'].map(item => (
            <span key={item} style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', fontWeight: 700, letterSpacing: '0.08em' }}>
              {item}
            </span>
          ))}
        </div>
        <Link to="/SupportLearn51">
          <span className="flex items-center gap-1" style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', fontWeight: 700 }}>
            <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
            Donate
          </span>
        </Link>
      </motion.div>

    </div>
  );
}