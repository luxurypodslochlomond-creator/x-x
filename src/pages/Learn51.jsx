import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import LearnProfile, { getProfiles, getActiveProfile, getProfileStars } from '@/components/learn51/LearnProfile';

// ── SUBJECTS — each owns a full vibe ─────────────────────────────────────────
const SUBJECTS = [
  {
    id: 'ai',
    title: 'AI Tutor',
    hook: 'Learns what YOU love.\nTeaches everything through it.',
    cta: 'Start talking →',
    url: '/Learn51AI',
    bg: ['#0d0628', '#3b0764', '#6d28d9'],
    accent: '#a78bfa',
    glyph: '◈',
    glyphColor: '#c4b5fd',
    particles: ['✦', '◆', '⬟', '✧'],
    featured: true,
  },
  {
    id: 'maths',
    title: 'Magic Maths',
    hook: 'Numbers that\nactually click.',
    cta: 'Explore numbers →',
    url: '/GeorgieMaths',
    bg: ['#05051a', '#1e1b4b', '#312e81'],
    accent: '#818cf8',
    glyph: '∑',
    glyphColor: '#a5b4fc',
    particles: ['∞', '÷', '×', '='],
  },
  {
    id: 'literacy',
    title: 'Reading & Words',
    hook: 'Stories that pull\nyou in.',
    cta: 'Open a story →',
    url: '/Literacy51',
    bg: ['#001a0d', '#022c22', '#064e3b'],
    accent: '#34d399',
    glyph: '⌘',
    glyphColor: '#6ee7b7',
    particles: ['A', 'z', '?', '!'],
  },
  {
    id: 'world',
    title: 'Real World',
    hook: 'Nature. Space.\nScience. All of it.',
    cta: 'Go explore →',
    url: '/YoungWarriors',
    bg: ['#0a0f1a', '#1e3a5f', '#1d4ed8'],
    accent: '#60a5fa',
    glyph: '◎',
    glyphColor: '#93c5fd',
    particles: ['🌊', '⚡', '🔥', '❄️'],
  },
  {
    id: 'life',
    title: 'Life Skills',
    hook: 'Money. Health.\nYour rights. Real talk.',
    cta: 'Level up →',
    url: '/LifeSkills51',
    bg: ['#1a0010', '#4a044e', '#7e22ce'],
    accent: '#e879f9',
    glyph: '◉',
    glyphColor: '#f0abfc',
    particles: ['£', '%', '✓', '→'],
  },
];

// ── FLOATING GLYPH PARTICLES ──────────────────────────────────────────────────
function FloatingParticles({ chars, accent }) {
  const items = useRef(
    chars.map((c, i) => ({
      char: c,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 14 + Math.random() * 18,
      dur: 3 + Math.random() * 4,
      delay: i * 0.7,
    }))
  ).current;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((p, i) => (
        <motion.div
          key={i}
          className="absolute font-black select-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size, color: accent, opacity: 0 }}
          animate={{ opacity: [0, 0.25, 0], y: [0, -30, -60] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeOut' }}
        >
          {p.char}
        </motion.div>
      ))}
    </div>
  );
}

// ── SINGLE SUBJECT CARD — full screen ────────────────────────────────────────
function SubjectCard({ subject, isActive, direction }) {
  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d < 0 ? '100%' : '-100%', opacity: 0 }),
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
      style={{
        background: `linear-gradient(160deg, ${subject.bg[0]} 0%, ${subject.bg[1]} 50%, ${subject.bg[2]} 100%)`,
      }}
    >
      <FloatingParticles chars={subject.particles} accent={subject.accent} />

      {/* Giant glyph — fills the space */}
      <div className="flex-1 flex items-center justify-center relative">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, type: 'spring', stiffness: 120 }}
          className="text-center"
        >
          {/* Glow blob */}
          <div
            className="absolute rounded-full blur-3xl pointer-events-none"
            style={{
              width: 280,
              height: 280,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              background: subject.accent,
              opacity: 0.08,
            }}
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 font-black select-none"
            style={{
              fontSize: 160,
              color: subject.glyphColor,
              fontFamily: '"Courier New", monospace',
              lineHeight: 1,
              textShadow: `0 0 60px ${subject.accent}60, 0 0 120px ${subject.accent}20`,
              letterSpacing: '-8px',
            }}
          >
            {subject.glyph}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom content */}
      <motion.div
        className="relative z-10 px-8 pb-10"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.45 }}
      >
        {/* Title */}
        <h2
          className="font-black leading-none mb-4"
          style={{
            fontSize: 42,
            color: 'rgba(255,255,255,0.95)',
            letterSpacing: '-1.5px',
            textShadow: `0 0 30px ${subject.accent}40`,
          }}
        >
          {subject.title}
        </h2>

        {/* Hook text */}
        <p
          className="font-bold leading-relaxed mb-8 whitespace-pre-line"
          style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}
        >
          {subject.hook}
        </p>

        {/* CTA */}
        <Link to={subject.url}>
          <motion.div
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black"
            style={{
              background: subject.accent,
              color: '#000',
              fontSize: 16,
              letterSpacing: '-0.3px',
              boxShadow: `0 0 40px ${subject.accent}50`,
            }}
          >
            {subject.cta}
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ── DOT NAV ───────────────────────────────────────────────────────────────────
function DotNav({ count, active, accent, onDotTap }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} onClick={() => onDotTap(i)}>
          <motion.div
            animate={{ width: i === active ? 24 : 6, opacity: i === active ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
            className="rounded-full h-1.5"
            style={{ background: i === active ? accent : 'white' }}
          />
        </button>
      ))}
    </div>
  );
}

// ── QUICK ACCESS STRIP ────────────────────────────────────────────────────────
function QuickStrip({ subjects, activeIdx, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 py-3" style={{ scrollbarWidth: 'none' }}>
      {subjects.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onSelect(i)}
          className="flex-shrink-0 rounded-xl px-3 py-2 font-black transition-all"
          style={{
            fontSize: 11,
            background: i === activeIdx ? s.accent : 'rgba(255,255,255,0.06)',
            color: i === activeIdx ? '#000' : 'rgba(255,255,255,0.4)',
            border: i === activeIdx ? 'none' : '1px solid rgba(255,255,255,0.08)',
            letterSpacing: '0.03em',
          }}
        >
          {s.title}
        </button>
      ))}
    </div>
  );
}

const getAITileMemory = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('learn51ai_progress') || 'null');
    if (saved?.interest && saved?.stars > 0) return saved;
    return null;
  } catch { return null; }
};

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Learn51Page() {
  const [[activeIdx, direction], setPage] = useState([0, 0]);
  const [showProfilePicker, setShowProfilePicker] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState(getActiveProfile);
  const [profiles, setProfiles] = useState(getProfiles);
  const dragStartX = useRef(null);
  const aiMemory = getAITileMemory();

  const activeProfile = profiles.find(p => p.id === activeProfileId) || null;
  const stars = activeProfileId ? getProfileStars(activeProfileId) : 0;
  const subject = SUBJECTS[activeIdx];

  const paginate = (newDir) => {
    const next = (activeIdx + newDir + SUBJECTS.length) % SUBJECTS.length;
    setPage([next, newDir]);
  };

  const goTo = (idx) => {
    const dir = idx > activeIdx ? 1 : -1;
    setPage([idx, dir]);
  };

  const handleTouchStart = (e) => { dragStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (dragStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - dragStartX.current;
    if (Math.abs(delta) > 50) paginate(delta < 0 ? 1 : -1);
    dragStartX.current = null;
  };

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
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: '#000', touchAction: 'pan-y' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── TOP HUD ──────────────────────────────────── */}
      <div
        className="relative z-30 flex items-center justify-between px-5 pt-6 pb-2"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)' }}
      >
        {/* Wordmark */}
        <div>
          <span
            className="font-black tracking-widest uppercase"
            style={{
              fontSize: 13,
              background: `linear-gradient(90deg, ${subject.accent}, white)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.2em',
            }}
          >
            LEARN51
          </span>
        </div>

        {/* Profile pill */}
        <button
          onClick={() => setShowProfilePicker(true)}
          className="flex items-center gap-2 rounded-full px-3 py-1.5"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span style={{ fontSize: 16 }}>{activeProfile?.avatar || '👾'}</span>
          {activeProfile && stars > 0 && (
            <span className="font-black" style={{ fontSize: 11, color: '#fbbf24' }}>{stars}★</span>
          )}
          {!activeProfile && (
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 800, letterSpacing: '0.1em' }}>YOU?</span>
          )}
        </button>
      </div>

      {/* ── SWIPEABLE STAGE ──────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <SubjectCard
            key={activeIdx}
            subject={subject}
            isActive={true}
            direction={direction}
          />
        </AnimatePresence>

        {/* Swipe hint arrows — subtle */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full p-3"
          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)', fontSize: 18 }}
        >
          ‹
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full p-3"
          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)', fontSize: 18 }}
        >
          ›
        </button>
      </div>

      {/* ── BOTTOM DOCK ──────────────────────────────── */}
      <div
        className="relative z-30"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)' }}
      >
        {/* Continue banner */}
        {aiMemory && activeIdx === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-5 mb-2"
          >
            <Link to="/Learn51AI">
              <div
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                style={{
                  background: 'rgba(167,139,250,0.15)',
                  border: '1px solid rgba(167,139,250,0.25)',
                }}
              >
                <span style={{ fontSize: 16 }}>⚡</span>
                <div className="flex-1 min-w-0">
                  <span className="font-black text-white" style={{ fontSize: 12 }}>
                    Continue · {aiMemory.stars}★ · {aiMemory.interest}
                  </span>
                </div>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>→</span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Quick access strip */}
        <QuickStrip subjects={SUBJECTS} activeIdx={activeIdx} onSelect={goTo} />

        {/* Dot nav + profile nudge */}
        <div className="flex items-center justify-between px-5 pb-6 pt-1">
          <DotNav count={SUBJECTS.length} active={activeIdx} accent={subject.accent} onDotTap={goTo} />

          <div className="flex items-center gap-4">
            {!activeProfile && (
              <button
                onClick={() => setShowProfilePicker(true)}
                className="font-black rounded-lg px-3 py-1.5"
                style={{
                  fontSize: 10,
                  background: subject.accent,
                  color: '#000',
                  letterSpacing: '0.08em',
                }}
              >
                SET UP PROFILE
              </button>
            )}
            <Link to="/SupportLearn51">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 opacity-30" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}