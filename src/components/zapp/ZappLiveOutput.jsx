import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import ZappGeometricIcon from '@/components/zapp/ZappGeometricIcon';

const BUILD_STAGES = [
  { shape: 'pulse', text: 'warming up...' },
  { shape: 'spectrum', text: 'drawing it out...' },
  { shape: 'gear', text: 'wiring it up...' },
  { shape: 'waveform', text: 'making sounds...' },
  { shape: 'sparkle', text: 'adding sparkles...' },
  { shape: 'diamond', text: 'making it shiny...' },
  { shape: 'burst', text: 'connecting buttons...' },
  { shape: 'pulse', text: 'checking it works...' },
  { shape: 'spectrum', text: 'final touches...' },
  { shape: 'sparkle', text: 'almost ready...' },
];

// Target build time for progress bar (seconds)
const TARGET_TIME = 32;

// How long each stage shows before advancing (ms)
const STAGE_DURATION = 3200;

// Build prompt + kid-safety layer live server-side in base44/shared/zappSafety.ts
// (zappBuild function). Kept off the client so kids can't read or tamper with it.

export default function ZappLiveOutput({ idea, blueprint, buildFlavor, builderMode, onComplete, onReset, onRetry, onSave, onRemix, savedId }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [builtHtml, setBuiltHtml] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(null);
  const [shareMsg, setShareMsg] = useState('');
  const [appTitle, setAppTitle] = useState('');
  const [buildTime, setBuildTime] = useState(0);
  const [sparks, setSparks] = useState([]);
  const hasStarted = useRef(false);
  const timerRef = useRef(null);
  const stageRef = useRef(null);
  const sparkIdRef = useRef(0);
  const mountedRef = useRef(true);

  // Interactive bolt tap — creates spark particles
  const handleBoltTap = () => {
    if (isDone) return;
    const id = sparkIdRef.current++;
    const newSparks = Array.from({ length: 12 }, (_, i) => ({
      id: `${id}-${i}`,
      angle: (i / 12) * Math.PI * 2,
      distance: 30 + Math.random() * 50,
      color: ['#a78bfa', '#f472b6', '#60a5fa', '#fbbf24'][i % 4],
      size: 4 + Math.random() * 6,
      duration: 0.5 + Math.random() * 0.5,
      delay: Math.random() * 0.1,
    }));
    setSparks(prev => [...prev, ...newSparks]);
    // Clean up old sparks after animation
    setTimeout(() => {
      setSparks(prev => prev.filter(s => !s.id.startsWith(`${id}-`)));
    }, 1500);
  };

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      buildApp();
    }
    return () => {
      mountedRef.current = false;
      if (timerRef.current) clearInterval(timerRef.current);
      if (stageRef.current) clearInterval(stageRef.current);
    };
  }, []);

  const buildApp = async () => {
    let i = 0;
    // Progress through stages once, then hold on the final stage
    // Never loop back — looping looks like a reset to kids
    stageRef.current = setInterval(() => {
      if (!mountedRef.current) return;
      i = Math.min(i + 1, BUILD_STAGES.length - 1);
      setStageIndex(i);
    }, STAGE_DURATION);

    // Build timer for fun
    let secs = 0;
    timerRef.current = setInterval(() => {
      secs++;
      setBuildTime(secs);
    }, 1000);

    // Build runs server-side through the kid-safety layer (zappBuild):
    // input guard strips PII + blocks unsafe ideas, then the output HTML is
    // scanned for external/network/exfiltration patterns before it reaches
    // the kid. Returns {html, title} or {blocked, reason}.
    // If the kid has a build buddy, its personality flavor is prepended to the
    // idea on the SERVER only — the saved idea stays the kid's original words.
    const blueprintBlock = blueprint
      ? `\n\nThe kid broke their idea into parts (their own notes — match what they imagined):\n- Opens with: ${blueprint.opening || '—'}\n- Tapping does: ${blueprint.interaction || '—'}\n- Ends / loops: ${blueprint.ending || '—'}\n- Trickiest bit to get right: ${blueprint.trickiest || '—'}`
      : '';
    const buildIdea = (buildFlavor ? `${buildFlavor}\n\nKid's idea: ${idea}` : idea) + blueprintBlock;

    // One attempt → normalised result. The model is flaky and mobile networks
    // drop — a kid should never see "oops" on a single hiccup, so we silently
    // retry once before ever showing the error. A safety BLOCKED is never retried.
    const attempt = async () => {
      const result = await base44.functions.invoke('zappBuild', { idea: buildIdea });
      if (result?.blocked) return { blocked: true, reason: result?.reason };
      let html = result?.html || '';
      if (!html || html.length < 200) return { fail: true };
      // Make sure it starts clean
      if (!html.trim().startsWith('<!DOCTYPE') && !html.trim().startsWith('<html')) {
        const docStart = html.indexOf('<!DOCTYPE');
        const htmlStart = html.indexOf('<html');
        const start = docStart >= 0 ? docStart : htmlStart >= 0 ? htmlStart : -1;
        if (start >= 0) html = html.slice(start);
      }
      if (!html || html.length < 200) return { fail: true };
      return { html };
    };

    const succeed = (html) => {
      clearInterval(stageRef.current); clearInterval(timerRef.current);
      const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : idea;
      setBuiltHtml(html); setAppTitle(title); setIsDone(true);
      if (onComplete) onComplete(html, title);
    };
    const giveUp = (msg) => {
      clearInterval(stageRef.current); clearInterval(timerRef.current);
      setError(msg);
    };

    try {
      let res = await attempt();
      if (res.fail) res = await attempt(); // silent retry — flaky model / network
      if (res.blocked) { giveUp(res.reason || "let's try a different idea!"); return; }
      if (res.html) { succeed(res.html); return; }
      giveUp("let's give it another go — tap the bolt");
    } catch (err) {
      // Network error — one silent retry before we admit defeat.
      try {
        const res = await attempt();
        if (res.blocked) { giveUp(res.reason || "let's try a different idea!"); return; }
        if (res.html) { succeed(res.html); return; }
        giveUp("let's give it another go — tap the bolt");
      } catch (e2) {
        console.error('ZAPP build error:', e2);
        giveUp("let's try that again!");
      }
    }
  };

  const handleShare = () => {
    if (!navigator.clipboard) return;
    if (savedId) {
      // Share a direct play link — friends tap it and the app opens instantly
      const url = `${window.location.origin}/Zapp?play=${savedId}`;
      navigator.clipboard.writeText(url);
      setShareMsg('friend link copied!');
    } else {
      // Not saved yet — nudge to save first
      setShareMsg('save it first!');
      if (onSave) setTimeout(() => onSave(), 600);
    }
    setTimeout(() => setShareMsg(''), 3000);
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
      <div className="flex flex-col items-center justify-center gap-6 px-6" style={{ height: '100%', minHeight: '60vh' }}>
        <motion.div
          animate={{ rotate: [0, -8, 8, -8, 8, 0] }}
          transition={{ duration: 0.5 }}
        >
          <ZappGeometricIcon shape="alert" size={80} color="#f59e0b" accent="#fbbf24" />
        </motion.div>
        <div className="text-center">
          <p className="text-white font-black text-2xl mb-2">oops! that one got away</p>
          <p className="text-white/50 text-base">{error}</p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <motion.button
            onClick={onRetry || onReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-2xl font-black text-white text-xl"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', boxShadow: '0 0 40px rgba(124,58,237,0.6)' }}
          >
            <span className="flex items-center justify-center gap-1.5">
              try again
              <ZappGeometricIcon shape="zap" size={18} color="#fbbf24" accent="#fde68a" />
            </span>
          </motion.button>
          <button
            onClick={onReset}
            className="text-white/25 hover:text-white/50 text-sm transition-colors"
          >
            start fresh
          </button>
        </div>
      </div>
    );
  }

  // BUILDING STATE
  if (!isDone) {
    const stage = BUILD_STAGES[stageIndex];
    return (
      <div className="flex flex-col items-center justify-center gap-6 px-6" style={{ height: '100%', minHeight: '60vh' }}>

        {/* Interactive bolt — tap for sparks */}
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

          {/* Warm outer aura — adds soul so it never reads cold/techy */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ width: 320, height: 320, background: 'radial-gradient(circle, rgba(251,191,36,0.10) 0%, transparent 65%)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Slow rotating conic shimmer ring — depth + richness */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 184, height: 184,
              background: 'conic-gradient(from 0deg, rgba(167,139,250,0) 0deg, rgba(167,139,250,0.55) 40deg, rgba(244,114,182,0.65) 90deg, rgba(96,165,250,0.55) 140deg, rgba(251,191,36,0.5) 200deg, rgba(244,114,182,0.55) 260deg, rgba(167,139,250,0) 320deg, rgba(167,139,250,0) 360deg)',
              maskImage: 'radial-gradient(circle, transparent 56%, black 58%, black 60%, transparent 62%)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 56%, black 58%, black 60%, transparent 62%)',
              filter: 'blur(2px)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />


          {/* Spark particles */}
          <AnimatePresence>
            {sparks.map(spark => (
              <motion.div
                key={spark.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: spark.size,
                  height: spark.size,
                  background: spark.color,
                  boxShadow: `0 0 ${spark.size * 3}px ${spark.color}`,
                }}
                initial={{
                  x: 0, y: 0, opacity: 1, scale: 1,
                }}
                animate={{
                  x: Math.cos(spark.angle) * spark.distance,
                  y: Math.sin(spark.angle) * spark.distance,
                  opacity: 0,
                  scale: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: spark.duration, delay: spark.delay, ease: 'easeOut' }}
              />
            ))}
          </AnimatePresence>

          <motion.button
            onClick={handleBoltTap}
            whileTap={{ scale: 0.85 }}
            className="cursor-pointer relative"
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
          </motion.button>

          {/* Subtle instruction on first visit */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 3, delay: 2 }}
            className="absolute -bottom-7 text-white/30 text-[10px] pointer-events-none"
          >
            tap the bolt
          </motion.p>
        </div>

        {/* Stage text */}
        <div className="text-center space-y-2.5">
          <AnimatePresence mode="wait">
            <motion.div
              key={stageIndex}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              className="flex items-center justify-center gap-2.5"
            >
              <ZappGeometricIcon shape={stage.shape} size={34} color="#a78bfa" accent="#f472b6" animate={true} />
              <span className="text-white font-black text-lg">{stage.text}</span>
            </motion.div>
          </AnimatePresence>

          <p className="text-white/30 text-sm">
            "<span className="text-violet-300 font-bold">{idea.length > 44 ? idea.slice(0, 44) + '…' : idea}</span>"
          </p>
        </div>

        {/* Real progress bar — fills toward the 28s target */}
        <div className="w-full max-w-[280px] space-y-1.5">
          <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, #7c3aed, #db2777, #fbbf24)',
                width: `${Math.min((buildTime / TARGET_TIME) * 100, 95)}%`,
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="absolute inset-y-0"
                style={{ width: '40%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }}
                animate={{ x: ['-120%', '320%'] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
          <div className="flex justify-between text-white/20 text-[10px] font-mono">
            <span>{buildTime}s of magic</span>
            <span>~{TARGET_TIME}s</span>
          </div>
        </div>

        <button
        onClick={onReset}
        className="text-white/10 hover:text-white/30 text-xs transition-colors mt-2"
        >
        cancel
        </button>
      </div>
    );
  }

  // DONE — show the built app
  return (
    <div className="flex flex-col" style={{ height: '100%' }}>

      {/* Celebrate banner — appears briefly after build, nudges to save */}
      <AnimatePresence>
        {onSave && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex-shrink-0 overflow-hidden"
            style={{ borderBottom: '1px solid rgba(251,191,36,0.15)' }}
          >
            <motion.button
              onClick={onSave}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-3 py-3 text-sm font-black"
              style={{
                background: 'linear-gradient(90deg, rgba(251,191,36,0.1), rgba(251,191,36,0.2), rgba(251,191,36,0.1))',
                color: '#fbbf24',
              }}
              animate={{ background: [
                'linear-gradient(90deg, rgba(251,191,36,0.1), rgba(251,191,36,0.2), rgba(251,191,36,0.1))',
                'linear-gradient(90deg, rgba(251,191,36,0.15), rgba(251,191,36,0.3), rgba(251,191,36,0.15))',
                'linear-gradient(90deg, rgba(251,191,36,0.1), rgba(251,191,36,0.2), rgba(251,191,36,0.1))'
              ] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ZappGeometricIcon shape="zap" size={22} color="#fbbf24" accent="#fde68a" />
              save to the community gallery
              <ZappGeometricIcon shape="star" size={16} color="#fbbf24" accent="#fde68a" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top action bar — scrollable on mobile */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 px-3 py-2 flex-shrink-0 overflow-x-auto"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)', scrollbarWidth: 'none' }}
      >
        <ZappGeometricIcon shape="check" size={20} color="#34d399" accent="#6ee7b7" />
        <span className="text-white/70 text-xs font-black truncate flex-shrink-0 max-w-[100px] sm:max-w-xs">
          {appTitle || idea}
        </span>
        <div className="flex items-center gap-1.5 flex-shrink-0 ml-auto">

          {onSave && (
            <motion.button onClick={onSave} whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
              style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}>
              <ZappGeometricIcon shape="zap" size={14} color="#fbbf24" accent="#fde68a" />
              save
            </motion.button>
          )}
          {onRemix && (
            <motion.button onClick={onRemix} whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
              style={{ background: 'rgba(244,114,182,0.12)', border: '1px solid rgba(244,114,182,0.3)', color: '#f472b6' }}>
              <ZappGeometricIcon shape="shuffle" size={14} color="#f472b6" accent="#f9a8d4" />
              remix
            </motion.button>
          )}
          <motion.button onClick={handleShare} whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
            style={{
              background: shareMsg ? 'rgba(34,197,94,0.15)' : 'rgba(167,139,250,0.12)',
              border: shareMsg ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(167,139,250,0.3)',
              color: shareMsg ? '#4ade80' : '#c4b5fd',
            }}>
            {shareMsg ? shareMsg : <><ZappGeometricIcon shape="link" size={14} color="#c4b5fd" accent="#a78bfa" /></>}
          </motion.button>
          <motion.button onClick={onReset} whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 rounded-lg text-xs font-black text-white flex items-center gap-1.5"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
            <ZappGeometricIcon shape="zap" size={14} color="#fff" accent="#fff" />
            new
          </motion.button>
        </div>
      </motion.div>

      {/* App display */}
      <div className="flex-1 relative overflow-hidden">
        {builderMode ? (
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-2/5 h-[45vh] md:h-full overflow-y-auto border-b md:border-b-0 md:border-r border-white/5 p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <p className="text-xs font-mono text-violet-400 mb-3 font-black tracking-widest flex items-center gap-1.5">
                <ZappGeometricIcon shape="zap" size={14} color="#a78bfa" accent="#c4b5fd" /> SOURCE CODE
              </p>
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
            {/* Cinematic reveal — bloom + warm light + sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.85) 0%, rgba(167,139,250,0.5) 25%, rgba(219,39,119,0.25) 50%, transparent 75%)' }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(251,191,36,0.5) 50%, transparent 65%)' }}
              initial={{ x: '-60%' }}
              animate={{ x: '120%' }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
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