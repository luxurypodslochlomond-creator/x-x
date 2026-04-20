import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SUBJECTS = [
  {
    id: 'maths',
    emoji: '🔢',
    title: 'Magic Maths',
    who: 'Georgie',
    desc: 'Numbers, shapes & tricks\nnobody shows you in class.',
    btn: 'Let\'s smash it',
    url: '/GeorgieMaths',
    colors: { bg1: '#12003a', bg2: '#3b0764', bg3: '#6d28d9', spot: '#a78bfa', text: '#ddd6fe' },
  },
  {
    id: 'decimals',
    emoji: '🎵',
    title: 'Numbers & Music',
    who: 'Lennox',
    desc: 'Decimals, rounding & the secret\nmaths hiding inside every beat.',
    btn: 'Find the beat',
    url: '/LennoxMaths',
    colors: { bg1: '#001220', bg2: '#0c2a4a', bg3: '#0369a1', spot: '#38bdf8', text: '#bae6fd' },
  },
  {
    id: 'words',
    emoji: '📚',
    title: 'Words & Stories',
    who: 'Literacy 51',
    desc: 'Phonics, spelling & stories\nthat actually keep you hooked.',
    btn: 'Open it up',
    url: '/Literacy51',
    colors: { bg1: '#001a0a', bg2: '#033d1a', bg3: '#15803d', spot: '#4ade80', text: '#bbf7d0' },
  },
  {
    id: 'world',
    emoji: '🌍',
    title: 'Amazing World',
    who: 'Nature · Space · Science',
    desc: 'Wild animals, black holes\n& things that actually explode.',
    btn: 'Go explore',
    url: '/YoungWarriors',
    colors: { bg1: '#000d20', bg2: '#0f2d5c', bg3: '#1d4ed8', spot: '#60a5fa', text: '#bfdbfe' },
  },
  {
    id: 'life',
    emoji: '💡',
    title: 'Real Life',
    who: 'Life Skills',
    desc: 'Money. Your rights. Food.\nThe stuff adults forget to teach.',
    btn: 'Show me',
    url: '/LifeSkills51',
    colors: { bg1: '#150010', bg2: '#3b0050', bg3: '#7e22ce', spot: '#e879f9', text: '#f5d0fe' },
  },
  {
    id: 'ai',
    emoji: '🧠',
    title: 'Ask Anything',
    who: 'Brain Buddy',
    desc: 'Tell it what you love.\nIt teaches everything through that.',
    btn: 'Start chatting',
    url: '/Learn51AI',
    colors: { bg1: '#0a0020', bg2: '#1e0050', bg3: '#4f20a0', spot: '#c084fc', text: '#e9d5ff' },
  },
];

// ── STAR FIELD ────────────────────────────────────────────────────────────────
function Stars({ color }) {
  const stars = useRef(
    Array.from({ length: 28 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      dur: 2 + Math.random() * 3,
      delay: Math.random() * 3,
    }))
  ).current;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, background: color }}
          animate={{ opacity: [0.08, 0.45, 0.08] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </div>
  );
}

// ── EMOJI BURST ───────────────────────────────────────────────────────────────
function Burst({ emoji }) {
  const p = useRef(
    Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      const d = 50 + Math.random() * 80;
      return { x: Math.cos(a) * d, y: Math.sin(a) * d, s: 10 + Math.random() * 14, dur: 0.5 + Math.random() * 0.35 };
    })
  ).current;
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {p.map((item, i) => (
        <motion.div key={i} className="absolute" style={{ fontSize: item.s }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: item.x, y: item.y, opacity: 0, scale: 0.2 }}
          transition={{ duration: item.dur, ease: 'easeOut' }}
        >{emoji}</motion.div>
      ))}
    </div>
  );
}

// ── CARD ──────────────────────────────────────────────────────────────────────
function Card({ s, dir }) {
  const [burst, setBurst] = useState(false);
  const c = s.colors;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      initial={{ x: dir > 0 ? '100%' : '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: dir < 0 ? '100%' : '-100%' }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      style={{ background: `radial-gradient(ellipse at 50% 20%, ${c.bg3}88 0%, ${c.bg2} 50%, ${c.bg1} 100%)` }}
    >
      <Stars color={c.spot} />

      {/* Radial glow behind emoji */}
      <div className="absolute pointer-events-none" style={{
        width: 320, height: 320,
        top: '12%', left: '50%', transform: 'translateX(-50%)',
        background: `radial-gradient(circle, ${c.spot}22 0%, transparent 70%)`,
        borderRadius: '50%',
      }} />

      {/* WHO label — top left */}
      <div className="absolute top-5 left-5 z-20">
        <div className="px-3 py-1 rounded-full font-black" style={{
          fontSize: 9,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          background: `${c.spot}18`,
          border: `1px solid ${c.spot}35`,
          color: c.text,
        }}>
          {s.who}
        </div>
      </div>

      {/* EMOJI — centre stage */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative" onClick={() => { setBurst(true); setTimeout(() => setBurst(false), 700); }}>
          {burst && <Burst emoji={s.emoji} />}
          <motion.div
            animate={{ y: [0, -18, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: 118, lineHeight: 1, cursor: 'pointer', userSelect: 'none', filter: `drop-shadow(0 0 40px ${c.spot}66)` }}
          >
            {s.emoji}
          </motion.div>
        </div>
      </div>

      {/* BOTTOM CONTENT */}
      <motion.div
        className="relative z-10 px-7 pb-9"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.36 }}
      >
        {/* Title */}
        <h2 className="font-black leading-none mb-2" style={{
          fontSize: 42,
          color: '#ffffff',
          letterSpacing: '-1.8px',
          textShadow: `0 2px 30px ${c.spot}44`,
        }}>
          {s.title}
        </h2>

        {/* Desc */}
        <p className="font-medium mb-7 whitespace-pre-line" style={{
          fontSize: 15,
          color: 'rgba(255,255,255,0.35)',
          lineHeight: 1.65,
          letterSpacing: '0.01em',
        }}>
          {s.desc}
        </p>

        {/* CTA */}
        <Link to={s.url}>
          <motion.div
            whileTap={{ scale: 0.94 }}
            className="inline-flex items-center gap-2 rounded-2xl font-black"
            style={{
              padding: '14px 28px',
              background: `linear-gradient(135deg, ${c.spot} 0%, ${c.bg3} 100%)`,
              color: '#fff',
              fontSize: 15,
              letterSpacing: '-0.2px',
              boxShadow: `0 8px 40px ${c.spot}50, 0 2px 8px rgba(0,0,0,0.4)`,
            }}
          >
            {s.btn} →
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Magic51Page() {
  const [[idx, dir], setPage] = useState([0, 0]);
  const touchX = useRef(null);
  const s = SUBJECTS[idx];
  const c = s.colors;

  const go = (d) => setPage(([i]) => [(i + d + SUBJECTS.length) % SUBJECTS.length, d]);
  const goTo = (i) => setPage(([cur]) => [i, i >= cur ? 1 : -1]);

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: '#000', touchAction: 'pan-y' }}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (!touchX.current) return;
        const d = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(d) > 44) go(d < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >

      {/* ── TOP BAR ──────────────────────────────────────── */}
      <motion.div
        className="relative z-30 flex items-center justify-between flex-shrink-0"
        style={{ padding: '20px 20px 8px' }}
      >
        {/* Wordmark */}
        <div>
          <motion.span
            key={s.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="block font-black"
            style={{
              fontSize: 26,
              background: `linear-gradient(90deg, ${c.spot} 0%, #ffffff 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px',
            }}
          >
            Magic51
          </motion.span>
          <span className="block font-bold" style={{
            fontSize: 9, color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 1,
          }}>
            Free · No login · Always
          </span>
        </div>

        {/* Part of suite badge */}
        <div className="flex items-center gap-2">
          <Link to="/CB51">
            <div className="px-2.5 py-1.5 rounded-xl font-black" style={{
              fontSize: 9, letterSpacing: '0.1em',
              background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)',
              color: 'rgba(6,182,212,0.7)',
            }}>CB51</div>
          </Link>
          <Link to="/PetSounds51">
            <div className="px-2.5 py-1.5 rounded-xl font-black" style={{
              fontSize: 9, letterSpacing: '0.1em',
              background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.2)',
              color: 'rgba(212,160,23,0.7)',
            }}>PS51</div>
          </Link>
          <Link to="/SupportLearn51">
            <div className="px-2.5 py-1.5 rounded-xl font-black" style={{
              fontSize: 9, letterSpacing: '0.1em',
              background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.25)',
              color: 'rgba(236,72,153,0.75)',
            }}>❤️ Donate</div>
          </Link>
        </div>
      </motion.div>

      {/* ── STAGE ───────────────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} mode="sync">
          <Card key={s.id} s={s} dir={dir} />
        </AnimatePresence>

        {/* Edge tap zones */}
        <button onClick={() => go(-1)} className="absolute left-0 top-0 bottom-0 z-20 w-12 flex items-end justify-center pb-1/2"
          style={{ background: 'transparent', color: 'rgba(255,255,255,0.1)', fontSize: 28, fontWeight: 900 }}>‹</button>
        <button onClick={() => go(1)} className="absolute right-0 top-0 bottom-0 z-20 w-12 flex items-end justify-center pb-1/2"
          style={{ background: 'transparent', color: 'rgba(255,255,255,0.1)', fontSize: 28, fontWeight: 900 }}>›</button>
      </div>

      {/* ── BOTTOM DOCK ──────────────────────────────────────── */}
      <div className="relative z-30 flex-shrink-0" style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.97) 60%, transparent 100%)',
        paddingTop: 16,
      }}>
        {/* Subject scroll row */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {SUBJECTS.map((sub, i) => (
            <motion.button
              key={sub.id}
              onClick={() => goTo(i)}
              whileTap={{ scale: 0.93 }}
              className="flex-shrink-0 flex items-center gap-1.5 rounded-2xl font-black"
              style={{
                padding: '8px 12px',
                fontSize: 11,
                whiteSpace: 'nowrap',
                background: i === idx
                  ? `linear-gradient(135deg, ${sub.colors.spot}cc, ${sub.colors.bg3})`
                  : 'rgba(255,255,255,0.05)',
                color: i === idx ? '#fff' : 'rgba(255,255,255,0.28)',
                border: i === idx ? 'none' : '1px solid rgba(255,255,255,0.06)',
                boxShadow: i === idx ? `0 4px 20px ${sub.colors.spot}40` : 'none',
              }}
            >
              <span style={{ fontSize: 13 }}>{sub.emoji}</span>
              <span>{sub.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Dot row */}
        <div className="flex items-center justify-between px-5 pb-8">
          <div className="flex items-center gap-2">
            {SUBJECTS.map((sub, i) => (
              <motion.button
                key={sub.id}
                onClick={() => goTo(i)}
                animate={{
                  width: i === idx ? 24 : 5,
                  opacity: i === idx ? 1 : 0.18,
                  background: i === idx ? c.spot : '#fff',
                }}
                transition={{ duration: 0.25 }}
                className="rounded-full h-1.5 block"
                style={{ background: i === idx ? c.spot : '#fff' }}
              />
            ))}
          </div>

          {/* Tap emoji hint */}
          <motion.span
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 800, letterSpacing: '0.12em' }}
          >
            TAP EMOJI · SWIPE
          </motion.span>
        </div>
      </div>
    </div>
  );
}