import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const BUILD_STAGES = [
  'thinking about your idea...',
  'designing the layout...',
  'writing the code...',
  'adding colours and animations...',
  'almost ready...',
];

export default function ZappLiveOutput({ idea, builderMode, onComplete, onReset }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [builtHtml, setBuiltHtml] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(null);
  const [shareMsg, setShareMsg] = useState('');
  const [appTitle, setAppTitle] = useState('');
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      buildApp();
    }
  }, []);

  const buildApp = async () => {
    // Cycle build stages while waiting
    let i = 0;
    const stageInterval = setInterval(() => {
      i = (i + 1) % BUILD_STAGES.length;
      setStageIndex(i);
    }, 1800);

    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are ZAPP — a safe, child-friendly AI that builds real, working mini web apps for children aged 8-13.

SAFETY RULES (non-negotiable):
- ZERO violence, weapons, gore, or anything scary
- ZERO sexual or romantic content
- ZERO bullying, hate, or mean language  
- ZERO external links or internet connections
- ZERO data collection or tracking
- If the idea seems inappropriate, make a fun safe version instead
- Always kind and encouraging

The child wants to build: "${idea}"

Generate a COMPLETE, self-contained HTML page that:
1. Actually builds EXACTLY what the child asked for — a clicker game should have clicking mechanics, upgrades, a score; a quiz should have real questions about the topic; a drawing tool should let you draw
2. Is genuinely fun and polished — NOT a basic placeholder
3. Has bold, colourful, exciting design — dark background, bright colours, large fonts, satisfying animations
4. Works 100% offline — only inline CSS and vanilla JS, no CDN imports
5. Has a big clear title at the top
6. Includes real content — if it's a quiz about horses, write actual horse questions
7. MUST have satisfying sound effects using Web Audio API (beeps, pops, whooshes on every interaction) — kids LOVE this
8. Has big score tracking, animations on click, confetti or particles when you win
8. Works great on both desktop and mobile

IMPORTANT: Return JSON with a single key "html" containing the complete HTML as a string starting with <!DOCTYPE html>`,
        response_json_schema: {
          type: 'object',
          properties: {
            html: { type: 'string' }
          },
          required: ['html']
        }
      });

      clearInterval(stageInterval);

      // Robustly extract HTML
      let html = '';
      if (result?.html) {
        html = result.html;
      } else if (typeof result === 'string') {
        try { html = JSON.parse(result)?.html || result; } catch { html = result; }
      }

      if (!html || html.length < 100) {
        throw new Error('App generation failed — please try again');
      }

      const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : idea;

      setBuiltHtml(html);
      setAppTitle(title);
      setIsDone(true);
      onComplete(html, title);

    } catch (err) {
      clearInterval(stageInterval);
      console.error('ZAPP build error:', err);
      setError(err?.message || 'Something went wrong — tap to try again');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareMsg('link copied! ✓');
      setTimeout(() => setShareMsg(''), 2500);
    }
  };

  // ERROR STATE
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] gap-6">
        <div className="text-5xl">😬</div>
        <p className="text-red-400 text-lg font-bold text-center max-w-sm">{error}</p>
        <button
          onClick={onReset}
          className="px-8 py-4 rounded-2xl font-black text-white text-lg"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', boxShadow: '0 0 30px rgba(124,58,237,0.5)' }}
        >
          try again ⚡
        </button>
      </div>
    );
  }

  // BUILDING STATE
  if (!isDone) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] gap-8">
        {/* Pulsing bolt */}
        <div className="relative">
          {[0,1,2].map(i => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 70%)' }}
              animate={{ scale: [1, 3 + i * 0.6], opacity: [0.5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
            />
          ))}
          <motion.div
            animate={{
              filter: ['drop-shadow(0 0 12px rgba(167,139,250,0.9))', 'drop-shadow(0 0 35px rgba(244,114,182,1))', 'drop-shadow(0 0 12px rgba(167,139,250,0.9))'],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <svg width="90" height="90" viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="zg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="50%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              <polygon points="19,2 8,18 15,18 13,30 24,14 17,14" fill="url(#zg)" />
            </svg>
          </motion.div>
        </div>

        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={stageIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-white/70 text-xl font-semibold"
            >
              {BUILD_STAGES[stageIndex]}
            </motion.p>
          </AnimatePresence>
          <p className="text-white/30 text-sm mt-2">building: <span className="text-violet-300">{idea}</span></p>
        </div>

        <button
          onClick={onReset}
          className="text-white/20 hover:text-white/50 text-sm transition-colors"
        >
          cancel
        </button>
      </div>
    );
  }

  // DONE — show the app
  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-green-400 text-base flex-shrink-0">✓</span>
          <span className="text-white/70 text-sm font-bold truncate">{appTitle || idea}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <motion.button
            onClick={handleShare}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
            style={{
              background: shareMsg ? 'rgba(34,197,94,0.15)' : 'rgba(167,139,250,0.12)',
              border: shareMsg ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(167,139,250,0.3)',
              color: shareMsg ? '#4ade80' : '#c4b5fd',
            }}
          >
            {shareMsg || '🔗 share'}
          </motion.button>
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg text-sm font-bold text-white/40 hover:text-white/80 transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            build something new ⚡
          </button>
        </div>
      </div>

      {/* App iframe — full remaining height */}
      <div className="flex-1 relative overflow-hidden">
        {builderMode ? (
          // Builder mode: code left, preview right
          <div className="flex h-full">
            <div className="w-2/5 overflow-y-auto border-r border-white/5 p-4 bg-black/30">
              <p className="text-xs font-mono text-white/20 mb-2 font-bold tracking-widest">SOURCE CODE</p>
              <pre className="text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap break-all" style={{ color: '#a78bfa' }}>
                {builtHtml}
              </pre>
            </div>
            <div className="flex-1">
              <iframe
                srcDoc={builtHtml}
                className="w-full h-full border-0"
                title="Your ZAPP app"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        ) : (
          // Magic mode: just the app, full screen
          <motion.iframe
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            srcDoc={builtHtml}
            className="w-full h-full border-0"
            title="Your ZAPP app"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>
    </div>
  );
}