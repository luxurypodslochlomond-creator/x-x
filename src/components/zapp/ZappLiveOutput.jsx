import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const BUILD_STAGES = [
  { emoji: '💡', text: 'cooking up your idea...' },
  { emoji: '🎨', text: 'picking the most epic colours...' },
  { emoji: '⚙️', text: 'building the game engine...' },
  { emoji: '🔊', text: 'adding BIG sounds...' },
  { emoji: '✨', text: 'loading sparkles and animations...' },
  { emoji: '🏆', text: 'polishing every last pixel...' },
  { emoji: '⚡', text: 'launching in 3... 2... 1...' },
];

const SYSTEM_PROMPT = `You are ZAPP — a genius AI that builds AMAZING, fully working mini web apps for children aged 8-13.

SAFETY RULES (absolute — never break these):
- Zero violence, weapons, gore, or anything scary
- Zero sexual or romantic content
- Zero bullying, hate, or mean language
- Zero external links or internet requests
- Zero data collection — everything stays in the page
- Always kind, encouraging, and fun

BUILD RULES (make it INCREDIBLE):
1. Build EXACTLY what was asked — implement every single feature described, not a watered-down version
2. FULLY FUNCTIONAL — not a skeleton — this must work perfectly right now, first try
3. VISUAL DESIGN — dark background #0a0a0f, use bright neon colours (#f43f5e, #f59e0b, #a78bfa, #06b6d4, #10b981), large fonts (min 20px for body, 32px+ for headings), rounded corners, big padding
4. NO EXTERNAL IMPORTS — zero CDN links, zero script src tags — only inline CSS and vanilla JavaScript
5. WEB AUDIO API — EVERY single button click, correct answer, wrong answer, score increase, game event MUST have a sound effect using the Web Audio API. Synthesise sounds using oscillators. Kids LOVE this
6. ANIMATIONS — CSS keyframe animations on everything. Buttons bounce when clicked. Correct answers flash green. Wrong answers shake red. Score numbers pop when they increase. Use @keyframes
7. REAL CONTENT — write real questions, real story text, real game mechanics. Absolutely no lorem ipsum or placeholder text
8. SCORE/PROGRESS — always visible on screen. Show score, lives, level, streak, or timer at all times
9. VARIETY — use Math.random() and array shuffling so the content is different every single time it loads
10. TOUCH FRIENDLY — all buttons minimum 60px tall, big tap targets, works on mobile and desktop
11. WIN/LOSE STATES — proper game over screen with final score, encouraging message, and a "Play Again" button that actually resets everything
12. CONFETTI/PARTICLES — on wins, level ups, and big scores, show visual celebrations using canvas or CSS animations

The app MUST work perfectly in a sandboxed iframe with allow-scripts and allow-same-origin only.
Start with <!DOCTYPE html> and include everything inline in a single HTML file.`;

export default function ZappLiveOutput({ idea, builderMode, onComplete, onReset }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [builtHtml, setBuiltHtml] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(null);
  const [shareMsg, setShareMsg] = useState('');
  const [appTitle, setAppTitle] = useState('');
  const [buildTime, setBuildTime] = useState(0);
  const hasStarted = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      buildApp();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const buildApp = async () => {
    let i = 0;
    // Spread 7 stages evenly across ~25s build — advance once, hold on last, never loop
    const stageInterval = setInterval(() => {
      i = Math.min(i + 1, BUILD_STAGES.length - 1);
      setStageIndex(i);
    }, 2000);

    // Build timer for fun
    let secs = 0;
    timerRef.current = setInterval(() => {
      secs++;
      setBuildTime(secs);
    }, 1000);

    try {
      const result = await base44.integrations.Core.InvokeLLM({
        model: 'claude_sonnet_4_6',
        prompt: `${SYSTEM_PROMPT}

BUILD THIS NOW: "${idea}"

Return ONLY valid JSON: {"html": "<complete single-file HTML app here>"}
No explanation. No markdown. Just the JSON. Start the HTML with <!DOCTYPE html>.`,
        response_json_schema: {
          type: 'object',
          properties: {
            html: { type: 'string' }
          },
          required: ['html']
        }
      });

      clearInterval(stageInterval);
      clearInterval(timerRef.current);

      let html = '';
      if (result?.html) {
        html = result.html;
      } else if (typeof result === 'string') {
        try { html = JSON.parse(result)?.html || result; } catch { html = result; }
      }

      if (!html || html.length < 200) {
        throw new Error('Something went wrong building your app — tap to try again!');
      }

      // Make sure it starts clean
      if (!html.trim().startsWith('<!DOCTYPE') && !html.trim().startsWith('<html')) {
        const docStart = html.indexOf('<!DOCTYPE');
        const htmlStart = html.indexOf('<html');
        const start = docStart >= 0 ? docStart : htmlStart >= 0 ? htmlStart : -1;
        if (start >= 0) html = html.slice(start);
      }

      const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : idea;

      setBuiltHtml(html);
      setAppTitle(title);
      setIsDone(true);
      if (onComplete) onComplete(html, title);

    } catch (err) {
      clearInterval(stageInterval);
      clearInterval(timerRef.current);
      console.error('ZAPP build error:', err);
      setError(err?.message || 'Something went wrong — tap to try again!');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareMsg('link copied! ✓');
      setTimeout(() => setShareMsg(''), 2500);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([builtHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${appTitle || 'my-app'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ERROR STATE
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 px-6" style={{ height: 'calc(100vh - 72px)' }}>
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
          className="text-6xl"
        >😬</motion.div>
        <div className="text-center">
          <p className="text-white font-black text-2xl mb-2">Oops! Something went wrong</p>
          <p className="text-white/50 text-base">{error}</p>
        </div>
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-5 rounded-2xl font-black text-white text-xl"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', boxShadow: '0 0 40px rgba(124,58,237,0.6)' }}
        >
          try again ⚡
        </motion.button>
      </div>
    );
  }

  // BUILDING STATE
  if (!isDone) {
    const stage = BUILD_STAGES[stageIndex];
    return (
      <div className="flex flex-col items-center justify-center gap-8 px-6" style={{ height: 'calc(100vh - 72px)' }}>

        {/* Animated bolt */}
        <div className="relative flex items-center justify-center">
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 120 + i * 40,
                height: 120 + i * 40,
                background: `radial-gradient(circle, rgba(167,139,250,${0.3 - i * 0.06}) 0%, transparent 70%)`
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
            />
          ))}
          <motion.div
            animate={{
              filter: [
                'drop-shadow(0 0 15px rgba(167,139,250,1))',
                'drop-shadow(0 0 40px rgba(244,114,182,1))',
                'drop-shadow(0 0 20px rgba(96,165,250,1))',
                'drop-shadow(0 0 15px rgba(167,139,250,1))'
              ],
              scale: [1, 1.12, 1]
            }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <svg width="100" height="100" viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="zg2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="50%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              <polygon points="19,2 8,18 15,18 13,30 24,14 17,14" fill="url(#zg2)" />
            </svg>
          </motion.div>
        </div>

        {/* Stage text */}
        <div className="text-center space-y-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={stageIndex}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.95 }}
              className="flex items-center justify-center gap-3"
            >
              <span className="text-3xl">{stage.emoji}</span>
              <span className="text-white font-black text-xl">{stage.text}</span>
            </motion.div>
          </AnimatePresence>

          <p className="text-white/30 text-sm">
            building: <span className="text-violet-300 font-bold">"{idea}"</span>
          </p>

          <motion.p
            key={Math.floor(buildTime / 3)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/30 text-xs font-mono"
          >
            {buildTime < 8 ? `⚡ ${buildTime}s`
              : buildTime < 15 ? `🔥 ${buildTime}s — it's taking shape!`
              : buildTime < 22 ? `🚀 ${buildTime}s — almost done...`
              : `💥 ${buildTime}s — nearly there!`}
          </motion.p>
        </div>

        {/* Stage progress dots */}
        <div className="flex gap-2">
          {BUILD_STAGES.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{
                width: i === stageIndex ? 24 : 8,
                height: 8,
                background: i < stageIndex ? '#a78bfa' : i === stageIndex ? '#f472b6' : 'rgba(255,255,255,0.1)'
              }}
              animate={{ width: i === stageIndex ? 24 : 8 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <button
          onClick={onReset}
          className="text-white/15 hover:text-white/40 text-sm transition-colors mt-2"
        >
          cancel
        </button>
      </div>
    );
  }

  // DONE — show the built app
  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 72px)' }}>

      {/* Top action bar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <motion.span
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="text-green-400 text-lg flex-shrink-0"
          >✅</motion.span>
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="text-white/70 text-sm font-black truncate max-w-[160px] sm:max-w-xs"
          >
            {appTitle || idea}
          </motion.span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <motion.button
            onClick={handleDownload}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all hidden sm:flex items-center gap-1"
            style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)', color: '#67e8f9' }}
          >
            ⬇ save
          </motion.button>
          <motion.button
            onClick={handleShare}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            style={{
              background: shareMsg ? 'rgba(34,197,94,0.15)' : 'rgba(167,139,250,0.12)',
              border: shareMsg ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(167,139,250,0.3)',
              color: shareMsg ? '#4ade80' : '#c4b5fd',
            }}
          >
            {shareMsg || '🔗 share'}
          </motion.button>
          <motion.button
            onClick={onReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="px-4 py-1.5 rounded-lg text-xs font-black text-white"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', boxShadow: '0 0 16px rgba(124,58,237,0.4)' }}
          >
            build new ⚡
          </motion.button>
        </div>
      </motion.div>

      {/* App display */}
      <div className="flex-1 relative overflow-hidden">
        {builderMode ? (
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-2/5 h-48 md:h-full overflow-y-auto border-b md:border-b-0 md:border-r border-white/5 p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <p className="text-xs font-mono text-violet-400 mb-3 font-black tracking-widest">⚡ SOURCE CODE</p>
              <pre className="text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap break-all" style={{ color: '#c4b5fd' }}>
                {builtHtml}
              </pre>
            </div>
            <motion.div className="flex-1 min-h-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <iframe
                srcDoc={builtHtml}
                className="w-full h-full border-0"
                title="Your ZAPP app"
                sandbox="allow-scripts allow-same-origin"
              />
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="w-full h-full relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Flash overlay on reveal */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{ background: 'radial-gradient(circle at center, rgba(167,139,250,0.4) 0%, transparent 70%)' }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            />
            <motion.iframe
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              srcDoc={builtHtml}
              className="w-full h-full border-0"
              title="Your ZAPP app"
              sandbox="allow-scripts allow-same-origin"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}