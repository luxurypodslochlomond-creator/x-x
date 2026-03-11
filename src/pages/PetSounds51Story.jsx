import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const STORY_SLIDES = [
  {
    id: 1,
    bg: 'from-slate-950 via-slate-900 to-slate-950',
    accent: '#f97316',
    content: (
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
          className="text-8xl"
        >
          🐕
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-black text-white leading-tight"
        >
          You left.<br />
          <span style={{ color: '#f97316' }}>They're spiraling.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-gray-400 text-lg max-w-xs mx-auto"
        >
          1 in 4 dogs has separation anxiety. Most owners have no idea what to do.
        </motion.p>
      </div>
    )
  },
  {
    id: 2,
    bg: 'from-slate-950 via-orange-950/20 to-slate-950',
    accent: '#06b6d4',
    content: (
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mx-auto w-48 h-48"
        >
          {/* Animated frequency rings */}
          {[1,2,3,4].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: '#06b6d4' }}
              initial={{ scale: 0.3, opacity: 0.8 }}
              animate={{ scale: 1.5 + i * 0.4, opacity: 0 }}
              transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center text-6xl">🎵</div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-3xl font-black text-white"
        >
          Sound heals the<br />
          <span style={{ color: '#06b6d4' }}>nervous system.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-400 max-w-xs mx-auto"
        >
          Science proved it. MIT. Glasgow University. Edinburgh. 40Hz gamma frequencies reduce anxiety — in dogs AND humans.
        </motion.p>
      </div>
    )
  },
  {
    id: 3,
    bg: 'from-slate-950 via-slate-900 to-slate-950',
    accent: '#22c55e',
    content: (
      <div className="text-center space-y-5">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm font-bold tracking-widest uppercase"
        >
          What we built
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-black text-white"
        >
          Leave it playing.<br />
          <span style={{ color: '#22c55e' }}>Your pet stays calm.</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3 text-left max-w-sm mx-auto"
        >
          {[
            { emoji: '😰', label: 'Separation anxiety', color: '#06b6d4' },
            { emoji: '⛈️', label: 'Thunderstorm & fireworks', color: '#a855f7' },
            { emoji: '🏥', label: 'Vet & car fear', color: '#f59e0b' },
            { emoji: '🧠', label: 'Cognitive decline', color: '#22c55e' },
            { emoji: '💔', label: 'Rescue trauma & grief', color: '#ec4899' },
            { emoji: '🦴', label: 'Arthritis & pain', color: '#f97316' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2"
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-white font-bold text-sm">{item.label}</span>
              <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  },
  {
    id: 4,
    bg: 'from-slate-950 via-slate-900 to-slate-950',
    accent: '#f59e0b',
    content: (
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          className="text-7xl"
        >
          🏇
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-black text-white"
        >
          Not just dogs & cats.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 text-3xl"
        >
          {['🐕','🐈','🐴','🐇','🦜','🐾','🐬','🐘'].map((e, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 + i * 0.08, type: 'spring' }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-gray-400 max-w-xs mx-auto"
        >
          Racehorses. Rescue greyhounds. Zoo animals. Captive dolphins. Every animal deserves calm.
        </motion.p>
      </div>
    )
  },
  {
    id: 5,
    bg: 'from-orange-950/30 via-slate-950 to-slate-950',
    accent: '#f97316',
    content: (
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-orange-500/10 border-2 border-orange-500/40 rounded-2xl p-6 max-w-xs mx-auto"
        >
          <p className="text-5xl font-black text-white mb-2">£29.99</p>
          <p className="text-orange-300 font-bold">per year</p>
          <div className="h-px bg-orange-500/30 my-4" />
          <p className="text-gray-300 text-sm">That's 8p a day.</p>
          <p className="text-gray-400 text-xs mt-1">Less than a single dog treat.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-3 max-w-xs mx-auto"
        >
          <p className="text-green-400 font-black text-sm">🐾 10% goes to animal rescue</p>
          <p className="text-gray-400 text-xs mt-1">Every subscription funds real rescues.</p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-cyan-300 font-bold"
        >
          Safe. Drug-free. No side effects.<br />Works through any speaker.
        </motion.p>
      </div>
    )
  },
  {
    id: 6,
    bg: 'from-slate-950 via-orange-950/10 to-slate-950',
    accent: '#f97316',
    content: (
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          className="text-8xl"
        >
          ❤️
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-black text-white"
        >
          They give you<br />
          <span style={{ color: '#f97316' }}>everything.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-gray-300 text-lg max-w-xs mx-auto"
        >
          Give them this.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Link
            to={createPageUrl("PetSounds51")}
            className="inline-block px-8 py-4 rounded-2xl font-black text-white text-lg"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 0 40px rgba(249, 115, 22, 0.5)' }}
          >
            Start free today →
          </Link>
        </motion.div>
      </div>
    )
  }
];

export default function PetSounds51Story() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const autoRef = useRef(null);

  const go = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(Math.max(0, Math.min(STORY_SLIDES.length - 1, idx)));
  };

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setCurrent(prev => {
        if (prev < STORY_SLIDES.length - 1) {
          setDirection(1);
          return prev + 1;
        }
        return prev;
      });
    }, 4500);
    return () => clearInterval(autoRef.current);
  }, []);

  const slide = STORY_SLIDES[current];

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'PetSounds51 — Heal your pet with sound', url });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied!');
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${slide.bg} flex flex-col transition-all duration-700`}>
      {/* Progress bar */}
      <div className="flex gap-1 p-4 pt-6 max-w-md mx-auto w-full">
        {STORY_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="h-1 flex-1 rounded-full overflow-hidden bg-white/20"
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: slide.accent }}
              initial={{ width: i < current ? '100%' : '0%' }}
              animate={{ width: i < current ? '100%' : i === current ? '100%' : '0%' }}
              transition={i === current ? { duration: 4.5, ease: 'linear' } : { duration: 0.2 }}
            />
          </button>
        ))}
      </div>

      {/* Tap zones */}
      <div className="flex-1 relative flex items-center justify-center px-6">
        <button className="absolute left-0 top-0 bottom-0 w-1/3 z-10" onClick={() => go(current - 1)} />
        <button className="absolute right-0 top-0 bottom-0 w-1/3 z-10" onClick={() => go(current + 1)} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-sm"
          >
            {slide.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom actions */}
      <div className="p-6 flex items-center justify-between max-w-md mx-auto w-full">
        <p className="text-white/40 text-xs font-bold font-mono tracking-widest">PETSOUNDS51</p>
        <div className="flex items-center gap-3">
          <button
            onClick={share}
            className="px-4 py-2 rounded-xl border border-white/20 text-white text-sm font-bold hover:bg-white/10 transition-all"
          >
            Share 🔗
          </button>
          <Link
            to={createPageUrl("PetSounds51")}
            className="px-4 py-2 rounded-xl font-bold text-sm text-white"
            style={{ background: slide.accent }}
          >
            Try it →
          </Link>
        </div>
      </div>
    </div>
  );
}