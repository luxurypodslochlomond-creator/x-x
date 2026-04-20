import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SUBJECTS = [
  {
    id: 'maths',
    emoji: '🔢',
    title: 'Magic Maths',
    sub: 'Georgie\'s Maths',
    desc: 'Numbers, shapes & tricks\nthey never show you in class.',
    btn: 'Let\'s smash it',
    url: '/GeorgieMaths',
    from: '#1a0533',
    to: '#7c3aed',
    spot: '#a78bfa',
  },
  {
    id: 'decimals',
    emoji: '🎵',
    title: 'Decimals & Music',
    sub: 'Lennox\'s Maths',
    desc: 'Rounding, decimals & why\nmaths is hiding inside music.',
    btn: 'Find the beat',
    url: '/LennoxMaths',
    from: '#0c1a2e',
    to: '#0369a1',
    spot: '#38bdf8',
  },
  {
    id: 'words',
    emoji: '📚',
    title: 'Words & Reading',
    sub: 'Literacy 51',
    desc: 'Phonics, spelling & stories\nthat actually keep you reading.',
    btn: 'Open it up',
    url: '/Literacy51',
    from: '#052e16',
    to: '#15803d',
    spot: '#4ade80',
  },
  {
    id: 'life',
    emoji: '💡',
    title: 'Life Skills',
    sub: 'The stuff they forget to teach',
    desc: 'Money. Your rights. Food.\nReal talk for real life.',
    btn: 'Show me',
    url: '/LifeSkills51',
    from: '#1a0020',
    to: '#7e22ce',
    spot: '#e879f9',
  },
  {
    id: 'world',
    emoji: '🌍',
    title: 'Amazing World',
    sub: 'Nature · Space · Science',
    desc: 'Wild animals, black holes\n& things that actually explode.',
    btn: 'Explore',
    url: '/YoungWarriors',
    from: '#0a1628',
    to: '#1d4ed8',
    spot: '#60a5fa',
  },
  {
    id: 'ai',
    emoji: '🧠',
    title: 'Ask Anything',
    sub: 'Your brain buddy',
    desc: 'Tell it what you\'re into.\nIt teaches everything through that.',
    btn: 'Start chatting',
    url: '/Learn51AI',
    from: '#0d0628',
    to: '#6d28d9',
    spot: '#c084fc',
  },
];

// Confetti burst when emoji is tapped
function Burst({ emoji }) {
  const pieces = useRef(
    Array.from({ length: 10 }, (_, i) => ({
      angle: (i / 10) * 360,
      dist: 55 + Math.random() * 70,
      size: 12 + Math.random() * 16,
      dur: 0.5 + Math.random() * 0.4,
    }))
  ).current;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {pieces.map((p, i) => {
        const r = (p.angle * Math.PI) / 180;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ fontSize: p.size }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: Math.cos(r) * p.dist, y: Math.sin(r) * p.dist, opacity: 0 }}
            transition={{ duration: p.dur, ease: 'easeOut' }}
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
}

function Card({ subject, dir }) {
  const [tapped, setTapped] = useState(false);

  const tap = () => {
    setTapped(true);
    setTimeout(() => setTapped(false), 700);
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      initial={{ x: dir > 0 ? '100%' : '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: dir < 0 ? '100%' : '-100%' }}
      transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
      style={{ background: `linear-gradient(170deg, ${subject.from} 0%, ${subject.to} 100%)` }}
    >
      {/* Glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 380, height: 380,
          top: '8%', left: '50%',
          transform: 'translateX(-50%)',
          background: subject.spot,
          opacity: 0.09,
          filter: 'blur(90px)',
        }}
      />

      {/* Subject label */}
      <div className="absolute top-6 left-6 z-10">
        <div
          className="px-3 py-1 rounded-full font-black"
          style={{
            fontSize: 10,
            background: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {subject.sub}
        </div>
      </div>

      {/* Big emoji centre */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative" onClick={tap} style={{ cursor: 'pointer' }}>
          {tapped && <Burst emoji={subject.emoji} />}
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, -4, 4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: 120, lineHeight: 1, userSelect: 'none' }}
          >
            {subject.emoji}
          </motion.div>
        </div>
      </div>

      {/* Bottom content */}
      <motion.div
        className="relative z-10 px-7 pb-10"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.38 }}
      >
        <h2
          className="font-black mb-2 leading-none"
          style={{
            fontSize: 40,
            color: '#fff',
            letterSpacing: '-1.5px',
            textShadow: `0 0 40px ${subject.spot}55`,
          }}
        >
          {subject.title}
        </h2>
        <p
          className="font-semibold mb-7 whitespace-pre-line"
          style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', lineHeight: 1.6 }}
        >
          {subject.desc}
        </p>
        <Link to={subject.url}>
          <motion.button
            whileTap={{ scale: 0.93 }}
            className="rounded-2xl font-black px-8 py-4"
            style={{
              background: subject.spot,
              color: '#000',
              fontSize: 16,
              boxShadow: `0 0 40px ${subject.spot}55`,
              border: 'none',
            }}
          >
            {subject.btn} →
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function Magic51Page() {
  const [[idx, dir], setPage] = useState([0, 0]);
  const touchX = useRef(null);
  const s = SUBJECTS[idx];

  const go = (d) => setPage(([i]) => [(i + d + SUBJECTS.length) % SUBJECTS.length, d]);
  const goTo = (i) => setPage(([cur]) => [i, i >= cur ? 1 : -1]);

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: '#000', touchAction: 'pan-y' }}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchX.current === null) return;
        const d = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(d) > 44) go(d < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* TOP */}
      <div
        className="relative z-30 flex items-center justify-between px-5 pt-6 pb-2 flex-shrink-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
      >
        <div>
          <span
            className="font-black"
            style={{
              fontSize: 22,
              background: `linear-gradient(90deg, ${s.spot}, #fff)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            Magic51
          </span>
          <span
            className="block font-bold"
            style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase' }}
          >
            Free · No login · Always
          </span>
        </div>

        <Link
          to="/SupportLearn51"
          className="font-black rounded-full px-3 py-1.5"
          style={{
            fontSize: 10,
            background: 'rgba(255,255,255,0.07)',
            color: 'rgba(255,255,255,0.3)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          ❤️ Support
        </Link>
      </div>

      {/* STAGE */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} mode="sync">
          <Card key={s.id} subject={s} dir={dir} />
        </AnimatePresence>

        {/* Edge tap zones */}
        <button
          onClick={() => go(-1)}
          className="absolute left-0 top-0 bottom-0 z-20 w-14"
          style={{ background: 'transparent', color: 'rgba(255,255,255,0.12)', fontSize: 26, fontWeight: 900 }}
        >
          ‹
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-0 top-0 bottom-0 z-20 w-14"
          style={{ background: 'transparent', color: 'rgba(255,255,255,0.12)', fontSize: 26, fontWeight: 900 }}
        >
          ›
        </button>
      </div>

      {/* BOTTOM */}
      <div
        className="relative z-30 flex-shrink-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)' }}
      >
        {/* Subject pills */}
        <div className="flex gap-2 px-4 pt-3 pb-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {SUBJECTS.map((sub, i) => (
            <button
              key={sub.id}
              onClick={() => goTo(i)}
              className="flex-shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-2 font-black"
              style={{
                fontSize: 11,
                background: i === idx ? sub.spot : 'rgba(255,255,255,0.07)',
                color: i === idx ? '#000' : 'rgba(255,255,255,0.3)',
                border: i === idx ? 'none' : '1px solid rgba(255,255,255,0.06)',
                whiteSpace: 'nowrap',
              }}
            >
              <span>{sub.emoji}</span>
              <span>{sub.title}</span>
            </button>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-between px-6 pb-8 pt-2">
          <div className="flex items-center gap-2">
            {SUBJECTS.map((sub, i) => (
              <motion.button
                key={sub.id}
                onClick={() => goTo(i)}
                animate={{ width: i === idx ? 22 : 5, opacity: i === idx ? 1 : 0.22 }}
                transition={{ duration: 0.25 }}
                className="rounded-full h-1.5"
                style={{ background: i === idx ? s.spot : '#fff' }}
              />
            ))}
          </div>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', fontWeight: 800, letterSpacing: '0.12em' }}
          >
            SWIPE →
          </motion.span>
        </div>
      </div>
    </div>
  );
}