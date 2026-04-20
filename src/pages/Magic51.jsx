import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceAnswerButton from '@/components/learn51/VoiceAnswerButton';
import AskMeAnything from '@/components/learn51/AskMeAnything';
import TransparencyBadge from '@/components/learn51/TransparencyBadge';

// ── WHO ARE YOU? — kids pick their vibe first ────────────────────────────────
const VIBES = [
  { id: 'football', emoji: '⚽', label: 'Football mad', color: '#22c55e' },
  { id: 'gaming', emoji: '🎮', label: 'Gamer', color: '#8b5cf6' },
  { id: 'music', emoji: '🎵', label: 'Music lover', color: '#f59e0b' },
  { id: 'animals', emoji: '🐶', label: 'Animal obsessed', color: '#f97316' },
  { id: 'space', emoji: '🚀', label: 'Space nerd', color: '#06b6d4' },
  { id: 'art', emoji: '🎨', label: 'Artist', color: '#ec4899' },
  { id: 'dinos', emoji: '🦖', label: 'Dino fan', color: '#84cc16' },
  { id: 'tech', emoji: '💻', label: 'Tech brain', color: '#3b82f6' },
];

// ── SUBJECTS — each one contextual to the vibe ───────────────────────────────
const SUBJECTS = [
  {
    id: 'ai',
    emoji: '🧠',
    title: 'Your Brain Buddy',
    getDesc: (vibe) => {
      const map = {
        football: "Ask me literally anything. I'll teach you through what YOU love. Works offline.",
        gaming: "Ask me literally anything. I'll teach you through game logic and what fascinates you.",
        music: "Ask me literally anything about music, science, history — through YOUR interests.",
        animals: "Ask me literally anything about the natural world through animal obsession.",
        space: "Ask me literally anything about the cosmos through space nerd curiosity.",
        art: "Ask me literally anything and I'll connect it to colour, patterns, creativity.",
        dinos: "Ask me literally anything. I'll answer through dinosaur facts and wonder.",
        tech: "Ask me literally anything about how tech, coding, the internet actually works.",
      };
      return map[vibe?.id] || "Ask me literally anything. I'll teach you through what YOU love. No servers watching.";
    },
    btn: "Ask me 💬",
    url: '/AskMeAnything',
    colors: { bg1: '#0a0020', bg2: '#1e0050', bg3: '#4f20a0', spot: '#c084fc', text: '#e9d5ff' },
    showInline: true, // render Ask & Voice inline
  },
  {
    id: 'maths',
    emoji: '💥',
    title: 'Smash Maths',
    getDesc: (vibe) => {
      const map = {
        football: "How does Ronaldo calculate a free kick? Pure maths. Wanna know his secret?",
        gaming: "Every game runs on maths. Learn the numbers behind your favourite games.",
        music: "Music IS maths. Beats, rhythms, frequencies — all hidden numbers.",
        animals: "How fast is a cheetah? How far can a whale dive? Real maths. Wild facts.",
        space: "How far is it to Mars? How big is the Sun? Space maths will blow your mind.",
        art: "Patterns, symmetry, the golden ratio — the hidden maths in all great art.",
        dinos: "How heavy was a T-Rex? How fast did it run? Dino maths is next level.",
        tech: "Binary, algorithms, loops — the maths that runs every computer on earth.",
      };
      return map[vibe?.id] || "Numbers, shapes & secrets they never tell you at school.";
    },
    btn: 'Smash it 💥',
    url: '/GeorgieMaths',
    colors: { bg1: '#0f172a', bg2: '#1e3a5f', bg3: '#1d4ed8', spot: '#38bdf8', text: '#bae6fd' },
  },
  {
    id: 'words',
    emoji: '📖',
    title: 'Words & Stories',
    getDesc: (vibe) => {
      const map = {
        football: "Write match reports, learn football commentary vocab, become a sports writer.",
        gaming: "Write game reviews, create your own story games, master gaming language.",
        music: "Write lyrics, understand song structure, tell your story through words.",
        animals: "Write animal stories, learn nature writing, describe the wild world.",
        space: "Write about alien worlds, create sci-fi stories, master science writing.",
        art: "Write about what you see, describe beauty, craft stories that paint pictures.",
        dinos: "Write dino adventures, create prehistoric worlds, become a science writer.",
        tech: "Write code comments, create tech reviews, master digital communication.",
      };
      return map[vibe?.id] || "Spelling, reading & writing that doesn't make you want to sleep.";
    },
    btn: 'Read something →',
    url: '/Literacy51',
    colors: { bg1: '#052e16', bg2: '#064e3b', bg3: '#065f46', spot: '#34d399', text: '#a7f3d0' },
  },
  {
    id: 'world',
    emoji: '🌍',
    title: 'The Real World',
    getDesc: (vibe) => {
      const map = {
        football: "Football clubs, countries, stadiums — geography through the beautiful game.",
        gaming: "Where are the biggest game studios? How does gaming change countries?",
        music: "Music scenes, cultures, countries — explore the world through sound.",
        animals: "Safari animals, deep sea creatures, Arctic life — the wild world revealed.",
        space: "Planets, galaxies, black holes — the universe is WILD and real.",
        art: "Sculptures, landscapes, cultures — art that changed the world.",
        dinos: "Where did they live? What did the world look like 65 million years ago?",
        tech: "Silicon Valley, data centres, how tech connects the whole planet.",
      };
      return map[vibe?.id] || "Animals. Space. Science. Why things explode.";
    },
    btn: 'Explore →',
    url: '/YoungWarriors',
    colors: { bg1: '#0c1445', bg2: '#1e3a8a', bg3: '#1d4ed8', spot: '#60a5fa', text: '#bfdbfe' },
  },
  {
    id: 'life',
    emoji: '💸',
    title: 'Real Life Stuff',
    getDesc: () => "Money. Your rights. Food. Cooking. The stuff adults forget to teach you. Essential.",
    btn: 'Find out →',
    url: '/LifeSkills51',
    colors: { bg1: '#1a0020', bg2: '#4a044e', bg3: '#6b21a8', spot: '#e879f9', text: '#f5d0fe' },
  },
];

// ── PARTICLE BURST ────────────────────────────────────────────────────────────
function Burst({ emoji, color }) {
  const particles = useRef(
    Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2;
      const d = 55 + Math.random() * 90;
      return { x: Math.cos(a) * d, y: Math.sin(a) * d, s: 10 + Math.random() * 16, dur: 0.45 + Math.random() * 0.4 };
    })
  ).current;
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute" style={{ fontSize: p.s }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.1 }}
          transition={{ duration: p.dur, ease: 'easeOut' }}
        >{emoji}</motion.div>
      ))}
    </div>
  );
}

// ── FLOATING PARTICLES ────────────────────────────────────────────────────────
function FloatingEmojis({ vibe }) {
  const items = useRef(
    Array.from({ length: 6 }, (_, i) => ({
      emoji: vibe?.emoji || '⭐',
      x: 10 + Math.random() * 80,
      startY: 110 + Math.random() * 20,
      dur: 8 + Math.random() * 6,
      delay: i * 1.2,
      size: 14 + Math.random() * 16,
    }))
  ).current;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${p.x}%`, fontSize: p.size, opacity: 0.15 }}
          animate={{ y: [p.startY + '%', '-10%'], opacity: [0, 0.25, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'linear' }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}

// ── VIBE PICKER SCREEN ────────────────────────────────────────────────────────
function VibePicker({ onPick }) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #050010 0%, #0a0020 50%, #10003a 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 flex flex-col h-full px-6 pt-12 pb-8">
        {/* Header */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
          <div className="text-5xl mb-3">✨</div>
          <h1 className="font-black leading-none mb-2"
            style={{ fontSize: 36, background: 'linear-gradient(90deg, #c084fc, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1.5px' }}>
            What are you into?
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 15, fontWeight: 700 }}>
            I'll teach everything through YOUR thing
          </p>
        </motion.div>

        {/* Vibe grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 flex-1 content-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {VIBES.map((v, i) => (
            <motion.button
              key={v.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * i, type: 'spring', stiffness: 300 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => onPick(v)}
              className="flex flex-col items-center justify-center gap-2 rounded-3xl py-5 font-black"
              style={{
                background: `${v.color}15`,
                border: `2px solid ${v.color}35`,
                boxShadow: `0 0 20px ${v.color}10`,
              }}
            >
              <span style={{ fontSize: 36 }}>{v.emoji}</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.2px' }}>{v.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skip */}
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          onClick={() => onPick(null)}
          style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, fontWeight: 700, marginTop: 16 }}
        >
          Just show me everything →
        </motion.button>
      </div>
    </motion.div>
  );
}

// ── SUBJECT CARD ──────────────────────────────────────────────────────────────
function SubjectCard({ s, dir, vibe }) {
  const [burst, setBurst] = useState(false);
  const c = s.colors;
  const desc = s.getDesc(vibe);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      initial={{ x: dir > 0 ? '100%' : '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: dir < 0 ? '100%' : '-100%' }}
      transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
      style={{ background: `radial-gradient(ellipse at 50% 15%, ${c.bg3}99 0%, ${c.bg2} 45%, ${c.bg1} 100%)` }}
    >
      <FloatingEmojis vibe={vibe} />

      {/* Radial glow */}
      <div className="absolute pointer-events-none" style={{
        width: 340, height: 340,
        top: '8%', left: '50%', transform: 'translateX(-50%)',
        background: `radial-gradient(circle, ${c.spot}25 0%, transparent 70%)`,
        borderRadius: '50%',
      }} />

      {/* VIBE CONTEXT TAG — top left */}
      {vibe && (
        <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{
          background: `${vibe.color}18`, border: `1px solid ${vibe.color}40`,
        }}>
          <span style={{ fontSize: 12 }}>{vibe.emoji}</span>
          <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', color: vibe.color }}>for {vibe.label}s</span>
        </div>
      )}

      {/* EMOJI — centre */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative" onClick={() => { setBurst(true); setTimeout(() => setBurst(false), 700); }}>
          {burst && <Burst emoji={s.emoji} color={c.spot} />}
          <motion.div
            animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontSize: 120, lineHeight: 1, cursor: 'pointer', userSelect: 'none',
              filter: `drop-shadow(0 0 50px ${c.spot}88)`,
            }}
          >
            {s.emoji}
          </motion.div>
        </div>
      </div>

      {/* BOTTOM CONTENT */}
      <motion.div
        className="relative z-10 px-7 pb-10"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.06, duration: 0.38 }}
      >
        <h2 className="font-black leading-none mb-3" style={{
          fontSize: 40, color: '#fff', letterSpacing: '-1.8px',
          textShadow: `0 2px 40px ${c.spot}55`,
        }}>
          {s.title}
        </h2>

        <p className="font-bold mb-8 leading-relaxed" style={{
          fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6,
        }}>
          {desc}
        </p>

        {/* INLINE FEATURES — Ask Me Anything + Voice + Transparency */}
        {s.showInline && (
          <div className="mb-8 space-y-4">
            <TransparencyBadge />
          </div>
        )}

        <Link to={s.url}>
          <motion.div
            whileTap={{ scale: 0.94 }}
            className="inline-flex items-center gap-2 rounded-2xl font-black"
            style={{
              padding: '16px 32px',
              background: `linear-gradient(135deg, ${c.spot} 0%, ${c.bg3} 100%)`,
              color: '#fff',
              fontSize: 17,
              letterSpacing: '-0.3px',
              boxShadow: `0 10px 50px ${c.spot}60, 0 2px 10px rgba(0,0,0,0.5)`,
            }}
          >
            {s.btn}
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Magic51Page() {
  const [vibe, setVibe] = useState(() => {
    try { const v = localStorage.getItem('magic51_vibe'); return v ? JSON.parse(v) : undefined; } catch { return undefined; }
  });
  const [showVibePicker, setShowVibePicker] = useState(vibe === undefined);
  const [[idx, dir], setPage] = useState([0, 0]);
  const touchX = useRef(null);
  const s = SUBJECTS[idx];
  const c = s.colors;

  const pickVibe = (v) => {
    setVibe(v);
    setShowVibePicker(false);
    try { localStorage.setItem('magic51_vibe', JSON.stringify(v)); } catch {}
  };

  const go = (d) => setPage(([i]) => [(i + d + SUBJECTS.length) % SUBJECTS.length, d]);
  const goTo = (i) => setPage(([cur]) => [i, i >= cur ? 1 : -1]);

  if (showVibePicker) {
    return <VibePicker onPick={pickVibe} />;
  }

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden select-none"
      style={{ background: '#000', touchAction: 'pan-y' }}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (!touchX.current) return;
        const d = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(d) > 44) go(d < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* ── TOP BAR ── */}
      <div className="relative z-30 flex items-center justify-between flex-shrink-0" style={{ padding: '18px 20px 8px' }}>
        <div>
          <motion.span key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="block font-black"
            style={{
              fontSize: 24, letterSpacing: '-1px',
              background: `linear-gradient(90deg, ${c.spot} 0%, #ffffff 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}
          >
            Magic51 ✨
          </motion.span>
          <span className="block font-bold" style={{ fontSize: 9, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 1 }}>
            Free · No login · Always
          </span>
        </div>

        {/* Vibe switcher + links */}
        <div className="flex items-center gap-2">
          {vibe && (
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setShowVibePicker(true)}
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-black"
              style={{
                fontSize: 11, background: `${vibe.color}18`,
                border: `1px solid ${vibe.color}40`, color: vibe.color,
              }}
            >
              {vibe.emoji} Change
            </motion.button>
          )}
          <Link to="/SupportLearn51">
            <div className="px-2.5 py-1.5 rounded-xl font-black" style={{
              fontSize: 9, letterSpacing: '0.1em',
              background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.25)',
              color: 'rgba(236,72,153,0.75)',
            }}>❤️ Donate</div>
          </Link>
        </div>
      </div>

      {/* ── STAGE ── */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} mode="sync">
          <SubjectCard key={s.id} s={s} dir={dir} vibe={vibe} />
        </AnimatePresence>
        <button onClick={() => go(-1)} className="absolute left-0 top-0 bottom-0 z-20 w-12 flex items-center justify-center"
          style={{ background: 'transparent', color: 'rgba(255,255,255,0.1)', fontSize: 28, fontWeight: 900 }}>‹</button>
        <button onClick={() => go(1)} className="absolute right-0 top-0 bottom-0 z-20 w-12 flex items-center justify-center"
          style={{ background: 'transparent', color: 'rgba(255,255,255,0.1)', fontSize: 28, fontWeight: 900 }}>›</button>
      </div>

      {/* ── BOTTOM DOCK ── */}
      <div className="relative z-30 flex-shrink-0" style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.97) 60%, transparent 100%)',
        paddingTop: 16,
      }}>
        {/* Subject scroll */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {SUBJECTS.map((sub, i) => (
            <motion.button
              key={sub.id}
              onClick={() => goTo(i)}
              whileTap={{ scale: 0.92 }}
              className="flex-shrink-0 flex items-center gap-1.5 rounded-2xl font-black"
              style={{
                padding: '8px 12px', fontSize: 11, whiteSpace: 'nowrap',
                background: i === idx ? `linear-gradient(135deg, ${sub.colors.spot}cc, ${sub.colors.bg3})` : 'rgba(255,255,255,0.05)',
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

        {/* Dots + hint */}
        <div className="flex items-center justify-between px-5 pb-8">
          <div className="flex items-center gap-2">
            {SUBJECTS.map((sub, i) => (
              <motion.button
                key={sub.id}
                onClick={() => goTo(i)}
                animate={{ width: i === idx ? 24 : 5, opacity: i === idx ? 1 : 0.18 }}
                transition={{ duration: 0.25 }}
                className="rounded-full h-1.5 block"
                style={{ background: i === idx ? c.spot : '#fff' }}
              />
            ))}
          </div>
          <motion.span
            animate={{ opacity: [0.12, 0.35, 0.12] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontWeight: 800, letterSpacing: '0.12em' }}
          >
            TAP EMOJI · SWIPE
          </motion.span>
        </div>
      </div>
    </div>
  );
}