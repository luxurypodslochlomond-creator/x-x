import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ── THE WORLDS — designed for actual kids, not pitch decks ───────────────────
const WORLDS = [
  {
    id: 'brain',
    emoji: '🧠',
    name: 'Your Brain Buddy',
    vibe: 'Tell it ANYTHING.\nIt teaches you through your stuff.',
    action: 'Let\'s go 🚀',
    url: '/Learn51AI',
    bg: 'linear-gradient(160deg, #0d0628 0%, #2e1065 50%, #4c1d95 100%)',
    spotColor: '#a855f7',
    tag: '⚡ talks back',
  },
  {
    id: 'maths',
    emoji: '💥',
    name: 'Smash Maths',
    vibe: 'Numbers, shapes & secrets\nthey never tell you at school.',
    action: 'Smash it 💥',
    url: '/GeorgieMaths',
    bg: 'linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #1d4ed8 100%)',
    spotColor: '#38bdf8',
    tag: '🔢 makes sense now',
  },
  {
    id: 'words',
    emoji: '📖',
    name: 'Words & Stories',
    vibe: 'Spelling, reading & writing\nthat doesn\'t make you want to sleep.',
    action: 'Read something →',
    url: '/Literacy51',
    bg: 'linear-gradient(160deg, #052e16 0%, #064e3b 50%, #065f46 100%)',
    spotColor: '#34d399',
    tag: '🌟 actually fun',
  },
  {
    id: 'world',
    emoji: '🌍',
    name: 'The Real World',
    vibe: 'Animals. Space. Science.\nWhy things explode.',
    action: 'Explore →',
    url: '/YoungWarriors',
    bg: 'linear-gradient(160deg, #0c1445 0%, #1e3a8a 50%, #1d4ed8 100%)',
    spotColor: '#60a5fa',
    tag: '🔥 wild facts',
  },
  {
    id: 'life',
    emoji: '💸',
    name: 'Real Life Stuff',
    vibe: 'Money. Your rights. Food.\nThings adults forget to teach.',
    action: 'Find out →',
    url: '/LifeSkills51',
    bg: 'linear-gradient(160deg, #1a0020 0%, #4a044e 50%, #6b21a8 100%)',
    spotColor: '#e879f9',
    tag: '💡 nobody tells you this',
  },
  {
    id: 'lennox',
    emoji: '🔢',
    name: 'Rounding & Decimals',
    vibe: 'Decimals, circles & why\nmaths is hiding in music.',
    action: 'Try it →',
    url: '/LennoxMaths',
    bg: 'linear-gradient(160deg, #0a0f1a 0%, #1c1917 50%, #292524 100%)',
    spotColor: '#fb923c',
    tag: '🎵 maths in music',
  },
];

// ── EMOJI BURST on mount ──────────────────────────────────────────────────────
function EmojiBurst({ emoji, color }) {
  const items = useRef(
    Array.from({ length: 8 }, (_, i) => ({
      angle: (i / 8) * 360,
      dist: 60 + Math.random() * 80,
      size: 14 + Math.random() * 14,
      dur: 0.6 + Math.random() * 0.5,
    }))
  ).current;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      {items.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.dist;
        const ty = Math.sin(rad) * p.dist;
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: tx, y: ty, opacity: 0, scale: 0.3 }}
            transition={{ duration: p.dur, ease: 'easeOut' }}
            style={{ fontSize: p.size }}
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
}

// ── SINGLE WORLD CARD ─────────────────────────────────────────────────────────
function WorldCard({ world, direction, onBurst }) {
  const [bursting, setBursting] = useState(false);

  const handleTap = () => {
    setBursting(true);
    setTimeout(() => setBursting(false), 800);
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      key={world.id}
      initial={{ x: direction > 0 ? '100%' : '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: direction < 0 ? '100%' : '-100%' }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      style={{ background: world.bg }}
    >
      {/* Spot glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: world.spotColor,
          opacity: 0.07,
          filter: 'blur(80px)',
        }}
      />

      {/* Tag pill */}
      <div className="absolute top-6 right-6 z-10">
        <div
          className="px-3 py-1.5 rounded-full font-black"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            fontSize: 11,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.05em',
          }}
        >
          {world.tag}
        </div>
      </div>

      {/* Centre — the big emoji */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="relative" onClick={handleTap}>
          {bursting && <EmojiBurst emoji={world.emoji} color={world.spotColor} />}
          <motion.div
            animate={{ 
              y: [0, -16, 0],
              rotate: [0, -3, 3, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: 110, cursor: 'pointer', userSelect: 'none', display: 'block', lineHeight: 1 }}
          >
            {world.emoji}
          </motion.div>
        </div>
      </div>

      {/* Bottom — name, vibe, CTA */}
      <motion.div
        className="relative z-10 px-7 pb-8"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.4 }}
      >
        <h2
          className="font-black leading-none mb-3"
          style={{
            fontSize: 38,
            color: '#fff',
            letterSpacing: '-1.5px',
            textShadow: `0 0 40px ${world.spotColor}50`,
          }}
        >
          {world.name}
        </h2>
        <p
          className="font-bold mb-7 whitespace-pre-line"
          style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}
        >
          {world.vibe}
        </p>
        <Link to={world.url}>
          <motion.div
            whileTap={{ scale: 0.94 }}
            className="inline-flex items-center gap-2 rounded-2xl font-black px-7 py-4"
            style={{
              background: world.spotColor,
              color: '#000',
              fontSize: 16,
              boxShadow: `0 0 40px ${world.spotColor}55`,
              letterSpacing: '-0.2px',
            }}
          >
            {world.action}
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ── SWIPE DOT ─────────────────────────────────────────────────────────────────
function Pip({ active, color, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      animate={{ width: active ? 20 : 5, opacity: active ? 1 : 0.25 }}
      transition={{ duration: 0.25 }}
      className="rounded-full h-1.5 block"
      style={{ background: active ? color : 'white' }}
    />
  );
}

// ── QUICK ROW ─────────────────────────────────────────────────────────────────
function QuickRow({ worlds, active, onPick }) {
  return (
    <div
      className="flex gap-2 px-5 py-2.5 overflow-x-auto"
      style={{ scrollbarWidth: 'none' }}
    >
      {worlds.map((w, i) => (
        <button
          key={w.id}
          onClick={() => onPick(i)}
          className="flex-shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-2 font-black transition-all"
          style={{
            fontSize: 12,
            background: i === active ? w.spotColor : 'rgba(255,255,255,0.07)',
            color: i === active ? '#000' : 'rgba(255,255,255,0.35)',
            border: i === active ? 'none' : '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <span style={{ fontSize: 14 }}>{w.emoji}</span>
          <span style={{ fontSize: 10 }}>{w.name}</span>
        </button>
      ))}
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function Learn51Page() {
  const [[idx, dir], setPage] = useState([0, 0]);
  const touchStart = useRef(null);
  const world = WORLDS[idx];

  const go = (newDir) => {
    const next = (idx + newDir + WORLDS.length) % WORLDS.length;
    setPage([next, newDir]);
  };

  const goTo = (i) => setPage([i, i > idx ? 1 : -1]);

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const d = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(d) > 45) go(d < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <div
      className="fixed inset-0 flex flex-col select-none overflow-hidden"
      style={{ background: '#000', touchAction: 'pan-y' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >

      {/* ── TOP BAR ─────────────────────────────────── */}
      <div
        className="relative z-30 flex items-center justify-between px-5 pt-5 pb-2"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
      >
        <motion.div
          key={world.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-black tracking-widest uppercase"
          style={{
            fontSize: 12,
            background: `linear-gradient(90deg, ${world.spotColor}, #fff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.25em',
          }}
        >
          LEARN51
        </motion.div>

        <Link
          to="/Learn51About"
          className="font-black rounded-full px-3 py-1"
          style={{
            fontSize: 10,
            background: 'rgba(255,255,255,0.07)',
            color: 'rgba(255,255,255,0.3)',
            border: '1px solid rgba(255,255,255,0.08)',
            letterSpacing: '0.1em',
          }}
        >
          FREE · ALWAYS
        </Link>
      </div>

      {/* ── STAGE ───────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={dir} mode="sync">
          <WorldCard key={world.id} world={world} direction={dir} />
        </AnimatePresence>

        {/* Tap-edge arrows */}
        <button
          onClick={() => go(-1)}
          className="absolute left-0 top-0 bottom-0 z-20 w-12 flex items-center justify-center"
          style={{ background: 'transparent', color: 'rgba(255,255,255,0.15)', fontSize: 22, fontWeight: 900 }}
        >
          ‹
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-0 top-0 bottom-0 z-20 w-12 flex items-center justify-center"
          style={{ background: 'transparent', color: 'rgba(255,255,255,0.15)', fontSize: 22, fontWeight: 900 }}
        >
          ›
        </button>
      </div>

      {/* ── BOTTOM DOCK ─────────────────────────────── */}
      <div
        className="relative z-30"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 100%)' }}
      >
        <QuickRow worlds={WORLDS} active={idx} onPick={goTo} />

        <div className="flex items-center justify-between px-6 pb-7 pt-1">
          {/* Pips */}
          <div className="flex items-center gap-2">
            {WORLDS.map((w, i) => (
              <Pip key={w.id} active={i === idx} color={w.spotColor} onClick={() => goTo(i)} />
            ))}
          </div>

          {/* Swipe hint */}
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontWeight: 800, letterSpacing: '0.1em' }}
          >
            SWIPE →
          </motion.div>
        </div>
      </div>
    </div>
  );
}