import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// Generates a soft 432Hz sine tone with fade in/out
function createHealingTone(audioCtx) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(432, audioCtx.currentTime);
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 2);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  return { osc, gain };
}

// Soft wave visualizer — smooth organic motion
function WaveRings({ color = '#f97316', count = 5 }) {
  return (
    <div className="relative flex items-center justify-center w-40 h-40 mx-auto">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border will-change-transform"
          style={{ borderColor: color, width: 30 + i * 22, height: 30 + i * 22 }}
          animate={{ opacity: [0.7 - i * 0.12, 0.3, 0.7 - i * 0.12], scale: [1, 1.06, 1] }}
          transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut', repeatType: 'loop' }}
        />
      ))}
      <motion.div
        className="w-8 h-8 rounded-full will-change-transform"
        style={{ background: color }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
      />
    </div>
  );
}

// Horizontal frequency bar visualizer
function FrequencyBar({ color }) {
  const bars = 28;
  return (
    <div className="flex items-end justify-center gap-0.5 h-12 mx-auto max-w-xs">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-full"
          style={{ background: color, minHeight: 4 }}
          animate={{ height: [4, Math.random() * 40 + 8, 4] }}
          transition={{ duration: 1.2 + Math.random() * 0.8, repeat: Infinity, delay: i * 0.06, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

const SLIDES = [
  {
    id: 'opening',
    accent: '#f97316',
    render: () => (
      <div className="text-center space-y-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
          <p className="text-xs font-mono tracking-[0.4em] text-orange-400/70 mb-6 uppercase">PetSounds51</p>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] tracking-tight">
            You left.<br />
            <span className="text-orange-400">They stayed.</span>
          </h1>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
          <WaveRings color="#f97316" count={4} />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
          className="text-gray-400 text-base max-w-xs mx-auto leading-relaxed">
          Every time the door closes, their nervous system goes into alarm.<br />
          <span className="text-white font-semibold">One in four dogs lives with this every single day.</span>
        </motion.p>
      </div>
    )
  },
  {
    id: 'science',
    accent: '#06b6d4',
    render: () => (
      <div className="text-center space-y-7">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p className="text-xs font-mono tracking-[0.4em] text-cyan-400/70 mb-5 uppercase">The Science</p>
          <h2 className="text-4xl font-black text-white leading-tight">
            Sound reaches<br />where drugs <span className="text-cyan-400">can't.</span>
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <FrequencyBar color="#06b6d4" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          className="space-y-3 text-left max-w-xs mx-auto">
          {[
            { inst: 'MIT', year: '2019', fact: '40Hz gamma frequencies clinically proven to calm the mammalian nervous system.' },
            { inst: "Queen's Belfast", year: '2017', fact: '80% of home dogs, 70%+ of shelter dogs showed fewer anxiety behaviours with slow-tempo music.' },
            { inst: 'iCalmDog', year: '2024', fact: '68% reduction in reactive behaviour. Now recommended by 200+ vets.' },
          ].map((s, i) => (
            <motion.div key={s.inst} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.15 }}
              className="flex gap-3 bg-white/5 rounded-xl px-4 py-3 border border-cyan-500/10">
              <div className="flex-shrink-0">
                <p className="text-cyan-400 font-black text-xs">{s.inst}</p>
                <p className="text-gray-600 text-xs">{s.year}</p>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">{s.fact}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  },
  {
    id: 'ai51',
    accent: '#ec4899',
    render: () => (
      <div className="text-center space-y-7">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <p className="text-xs font-mono tracking-[0.4em] text-pink-400/70 mb-5 uppercase">Built from the ground up</p>
          <h2 className="text-4xl font-black text-white leading-tight">
            We decoded their<br />
            <span className="text-pink-400">healing frequencies.</span>
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <WaveRings color="#ec4899" count={4} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          className="max-w-xs mx-auto bg-gradient-to-br from-pink-950/40 to-slate-900 border border-pink-500/30 rounded-2xl p-6 space-y-4">
          <p className="text-gray-200 text-sm leading-relaxed italic">
           "One in four dogs lives with separation anxiety. Most get sedated or left to suffer. We built something better."
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
           We studied MIT's gamma frequencies. Glasgow's shelter research. iCalmDog's RCT data. Edinburgh's cognitive trials. Every peer-reviewed proof of what sound can do to the mammalian nervous system.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
           Then we built a real audio engine around it — species-specific, protocol-specific, generated fresh for every session. Not a playlist. Not guesswork.
          </p>
          <p className="text-pink-300 text-sm leading-relaxed font-semibold">
           This is what actual care looks like.
          </p>
          <p className="text-pink-400 font-black text-xs mt-4 tracking-widest">— PetSounds51 Team</p>
        </motion.div>
      </div>
    )
  },
  {
    id: 'protocols',
    accent: '#22c55e',
    render: () => (
      <div className="text-center space-y-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p className="text-xs font-mono tracking-[0.4em] text-green-400/70 mb-5 uppercase">What it treats</p>
          <h2 className="text-4xl font-black text-white leading-tight">
            Every condition.<br />
            <span className="text-green-400">Every animal.</span>
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-2 max-w-xs mx-auto text-left">
          {[
            { label: 'Separation Anxiety', sub: '432 Hz', color: '#06b6d4' },
            { label: 'Storms & Fireworks', sub: '40 Hz gamma', color: '#a855f7' },
            { label: 'Rescue Trauma', sub: '396 Hz theta', color: '#f59e0b' },
            { label: 'Arthritis & Pain', sub: '174 Hz PEMF', color: '#f97316' },
            { label: 'Cognitive Decline', sub: '40 Hz gamma', color: '#22c55e' },
            { label: 'Night Anxiety', sub: 'Delta 4 Hz', color: '#6366f1' },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className="w-1.5 h-1.5 rounded-full mb-2" style={{ background: item.color }} />
              <p className="text-white font-bold text-xs leading-tight">{item.label}</p>
              <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="text-gray-500 text-xs">
          Racehorses. Zoo animals. Rescue greyhounds. All of them.
        </motion.p>
      </div>
    )
  },
  {
    id: 'price',
    accent: '#f97316',
    render: () => (
      <div className="text-center space-y-7">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p className="text-xs font-mono tracking-[0.4em] text-orange-400/70 mb-5 uppercase">Fair. Simple. Honest.</p>
          <h2 className="text-4xl font-black text-white leading-tight">
            8 pence a day.<br />
            <span className="text-orange-400">That's all.</span>
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
          className="max-w-xs mx-auto">
          <div className="bg-gradient-to-br from-orange-950/50 to-slate-900 border-2 border-orange-500/40 rounded-2xl p-6 mb-4"
            style={{ boxShadow: '0 0 40px rgba(249,115,22,0.15)' }}>
            <p className="text-6xl font-black text-white mb-1">£29.99</p>
            <p className="text-orange-300 font-bold mb-4">per year · cancel anytime</p>
            <div className="space-y-2 text-sm text-left">
              {['All 14 frequency protocols', 'Unlimited sessions', '10% goes to animal rescue', 'No side effects ever', 'Works through any speaker'].map((f, i) => (
                <motion.p key={f} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-2 text-gray-300">
                  <span className="text-orange-400 font-black">—</span> {f}
                </motion.p>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3">
            <p className="text-green-400 font-black text-sm">10% to real animal rescue organisations</p>
            <p className="text-gray-500 text-xs mt-0.5">Every subscription. Every year. No exceptions.</p>
          </motion.div>
        </motion.div>
      </div>
    )
  },
  {
    id: 'cta',
    accent: '#f97316',
    render: () => (
      <div className="text-center space-y-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p className="text-xs font-mono tracking-[0.4em] text-orange-400/70 mb-5 uppercase">They're not broken. They're hurting.</p>
          <h2 className="text-5xl font-black text-white leading-[1.05] tracking-tight">
            They give you<br />
            everything.
          </h2>
          <p className="text-gray-400 text-base mt-4 max-w-sm mx-auto leading-relaxed">
            Unconditional love. Loyalty. A heartbeat that syncs with yours. The least you can do is give them peace.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <WaveRings color="#f97316" count={5} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
          className="space-y-3">
          <p className="text-gray-300 text-lg font-semibold">Leave it playing. They stay calm.</p>
          <Link
            to={createPageUrl("PetSounds51")}
            className="inline-block px-10 py-4 rounded-2xl font-black text-white text-lg tracking-wide"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 0 50px rgba(249,115,22,0.4)' }}
          >
            Start free today
          </Link>
          <p className="text-gray-600 text-xs">Separation anxiety. Free forever. No card needed.</p>
        </motion.div>
      </div>
    )
  }
];

export default function PetSounds51Story() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [audioOn, setAudioOn] = useState(false);
  const [themeAccent] = useState('#d4a017');
  const audioRef = useRef(null);
  const autoTimer = useRef(null);

  const go = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, idx));
    setDirection(clamped > current ? 1 : -1);
    setCurrent(clamped);
  }, [current]);

  // Auto-advance — slower for reading
  useEffect(() => {
    clearInterval(autoTimer.current);
    if (current < SLIDES.length - 1) {
      // More time per slide: 8-10 seconds depending on content
      const slideDurations = [8500, 9500, 9000, 9500, 9000, 8000];
      const duration = slideDurations[current] || 9000;
      autoTimer.current = setTimeout(() => {
        setDirection(1);
        setCurrent(c => c + 1);
      }, duration);
    }
    return () => clearTimeout(autoTimer.current);
  }, [current]);

  // Audio toggle — 432Hz healing tone
  const toggleAudio = useCallback(() => {
    if (audioOn) {
      if (audioRef.current) {
        const { gain, osc, ctx } = audioRef.current;
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        setTimeout(() => { osc.stop(); ctx.close(); audioRef.current = null; }, 1600);
      }
      setAudioOn(false);
    } else {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const { osc, gain } = createHealingTone(ctx);
      audioRef.current = { osc, gain, ctx };
      setAudioOn(true);
    }
  }, [audioOn]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        try { audioRef.current.osc.stop(); audioRef.current.ctx.close(); } catch {}
      }
    };
  }, []);

  const share = async () => {
    const url = 'https://uf51.love/api/functions/ogRedirect?page=PetSounds51Story';
    if (navigator.share) {
      try {
        await navigator.share({ title: 'PetSounds51 — Sound therapy for animals', text: 'Leave it playing. They stay calm.', url });
      } catch (err) {
        if (err.name !== 'AbortError') {
          navigator.clipboard.writeText(url);
          alert('Link copied — share it anywhere.');
        }
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied — share it anywhere.');
    }
  };

  const slide = SLIDES[current];
  const accent = slide.accent;

  return (
    <div className="min-h-screen flex flex-col select-none overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a200e 0%, #2a3018 40%, #1e1a0e 100%)' }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 60% 50% at 50% 30%, #d4a01720 0%, transparent 70%)`
      }} />

      {/* Progress */}
      <div className="relative z-10 flex gap-1.5 px-5 pt-5 max-w-md mx-auto w-full">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => go(i)} className="h-[3px] flex-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: themeAccent }}
              animate={{ width: i < current ? '100%' : i === current ? '100%' : '0%' }}
              transition={i === current ? { duration: 5, ease: 'linear' } : { duration: 0.15 }}
            />
          </button>
        ))}
      </div>

      {/* Tap zones */}
      <button className="fixed left-0 top-0 bottom-0 w-1/3 z-20" onClick={() => go(current - 1)} />
      <button className="fixed right-0 top-0 bottom-0 w-1/3 z-20" onClick={() => go(current + 1)} />

      {/* Slide */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction * -50, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-sm"
          >
            {slide.render()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pb-6 max-w-md mx-auto w-full">
        <button
          onClick={() => go(current - 1)}
          disabled={current === 0}
          className="px-3 py-1.5 rounded-lg border border-white/10 text-white/60 text-xs font-bold hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ← Back
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudio}
            className="px-3 py-1.5 rounded-lg border border-white/10 text-white/60 text-xs font-bold hover:text-white hover:border-white/30 transition-all"
            title="Toggle 432Hz healing tone"
          >
            {audioOn ? '♫ ON' : '♫ OFF'}
          </button>
          <button
            onClick={share}
            className="px-3 py-1.5 rounded-lg border border-white/10 text-white/60 text-xs font-bold hover:text-white hover:border-white/30 transition-all"
          >
            Share
          </button>
          <Link
            to={createPageUrl("PetSounds51")}
            className="px-4 py-1.5 rounded-lg font-black text-xs text-white"
            style={{ background: themeAccent }}
          >
            Try free →
          </Link>
        </div>
        <button
          onClick={() => go(current + 1)}
          disabled={current === SLIDES.length - 1}
          className="px-3 py-1.5 rounded-lg border border-white/10 text-white/60 text-xs font-bold hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  );
}