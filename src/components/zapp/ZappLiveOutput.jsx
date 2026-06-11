import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const BUILD_STAGES = [
  { label: 'thinking about your idea...', duration: 800 },
  { label: 'designing the layout...', duration: 600 },
  { label: 'writing the logic...', duration: 400 },
  { label: 'adding the finishing touches...', duration: 400 },
  { label: 'almost there...', duration: 300 },
];

export default function ZappLiveOutput({ idea, phase, builderMode, onComplete, onReset, generatedCode, appTitle }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [streamedCode, setStreamedCode] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [error, setError] = useState(null);
  const [shareMsg, setShareMsg] = useState('');
  const iframeRef = useRef(null);
  const codeEndRef = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (phase === 'building' && !hasStarted.current) {
      hasStarted.current = true;
      startBuilding();
    }
  }, [phase]);

  // Auto-scroll code stream
  useEffect(() => {
    if (builderMode && codeEndRef.current) {
      codeEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [streamedCode]);

  const startBuilding = async () => {
    setIsBuilding(true);

    // Run through stages
    for (let i = 0; i < BUILD_STAGES.length; i++) {
      setStageIndex(i);
      await sleep(BUILD_STAGES[i].duration);
    }

    // Call AI to generate the app
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are ZAPP — an AI that builds real, working mini web apps for children aged 8-13.

The child wants to build: "${idea}"

Generate a COMPLETE, self-contained HTML page that:
1. Works perfectly as a standalone app — no external dependencies except inline CSS and vanilla JS
2. Is genuinely fun, interactive and polished — NOT basic
3. Has beautiful, bold, colourful design — dark background, bright colours, large readable fonts
4. Is safe — no external links, no data collection, no adult content
5. Actually does what the child asked for — if they want a quiz, it's a real quiz with questions and scoring
6. Has a clear title at the top
7. Uses modern CSS (flexbox, grid, animations, gradients) — looks amazing on screen
8. If it's a game, it should actually be playable and fun
9. If it's a story/quiz, have real content relevant to the topic
10. Add satisfying interactions — button clicks, animations, sounds via Web Audio API if relevant

IMPORTANT: Return your response as JSON with a single key "html" containing the complete HTML string starting with <!DOCTYPE html>. No markdown fences, no explanation — just the html field with the full working page.

Make it genuinely impressive. A child should look at it and say "WHOA I made this!"`,
        model: 'claude_sonnet_4_6',
        response_json_schema: {
          type: 'object',
          properties: {
            html: { type: 'string', description: 'The complete HTML page' }
          }
        }
      });

      // Extract HTML from result object
      const fullCode = result?.html || (typeof result === 'string' ? result : JSON.stringify(result));
      if (builderMode) {
        await streamCodeEffect(fullCode);
      } else {
        setStreamedCode(fullCode);
      }

      // Extract title from HTML
      const titleMatch = fullCode.match(/<title>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : idea;

      onComplete(fullCode, title);
    } catch (err) {
      console.error('ZAPP build error:', err);
      setError(`Something went wrong — ${err?.message || 'tap to try again'}`);
      setIsBuilding(false);
    }
  };

  const streamCodeEffect = async (code) => {
    const chunkSize = 8;
    for (let i = 0; i < code.length; i += chunkSize) {
      setStreamedCode(code.slice(0, i + chunkSize));
      await sleep(2);
    }
    setStreamedCode(code);
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setShareMsg('link copied!');
      setTimeout(() => setShareMsg(''), 2000);
    }
  };

  // Inject generated code into iframe
  const iframeSrcDoc = phase === 'done' && generatedCode ? generatedCode : null;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5">
        <div className="flex items-center gap-3 min-w-0">
          {phase === 'building' ? (
            <div className="flex items-center gap-2">
              <BuildingSpinner />
              <AnimatePresence mode="wait">
                <motion.span
                  key={stageIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-sm font-medium text-violet-300"
                >
                  {BUILD_STAGES[stageIndex]?.label}
                </motion.span>
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-lg">✓</span>
              <span className="text-white/80 text-sm font-bold truncate">{appTitle || idea}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {phase === 'done' && (
            <>
              <motion.button
                onClick={handleShare}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                style={{
                  background: shareMsg ? 'rgba(34, 197, 94, 0.2)' : 'rgba(167, 139, 250, 0.15)',
                  border: shareMsg ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(167, 139, 250, 0.3)',
                  color: shareMsg ? '#4ade80' : '#c4b5fd',
                }}
              >
                {shareMsg || 'share with friends'}
              </motion.button>
            </>
          )}
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg text-sm font-bold text-white/40 hover:text-white/80 transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            build something new
          </button>
        </div>
      </div>

      {/* Idea label */}
      <div className="px-6 py-2 border-b border-white/5">
        <span className="text-xs text-white/25 font-mono">you wanted: </span>
        <span className="text-xs text-white/50 font-medium">{idea}</span>
      </div>

      {/* Main area */}
      <div className={`flex-1 flex overflow-hidden ${builderMode && (streamedCode || phase === 'building') ? 'flex-row' : 'flex-col'}`}>
        
        {/* Code stream — builder mode */}
        {builderMode && (streamedCode || phase === 'building') && (
          <div className="w-1/2 overflow-y-auto border-r border-white/5 p-4">
            <div className="text-xs font-mono text-white/20 mb-2 font-bold tracking-widest">BUILDING YOUR APP</div>
            <pre className="text-xs font-mono leading-relaxed overflow-x-auto" style={{ color: '#a78bfa' }}>
              <CodeHighlight code={streamedCode} />
              {phase === 'building' && <span className="animate-pulse text-pink-400">▋</span>}
            </pre>
            <div ref={codeEndRef} />
          </div>
        )}

        {/* App preview */}
        <div className={`${builderMode && (streamedCode || phase === 'building') ? 'w-1/2' : 'flex-1'} relative`}>
          {phase === 'building' && !builderMode && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <ZappBuildAnimation />
              <AnimatePresence mode="wait">
                <motion.div
                  key={stageIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-center"
                >
                  <p className="text-white/60 text-lg font-medium">{BUILD_STAGES[stageIndex]?.label}</p>
                  <p className="text-white/25 text-sm mt-1">your app is coming to life...</p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {phase === 'done' && iframeSrcDoc && (
            <motion.iframe
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              ref={iframeRef}
              srcDoc={iframeSrcDoc}
              className="w-full h-full border-0"
              title="Your ZAPP creation"
              sandbox="allow-scripts allow-same-origin"
            />
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-400 text-lg font-bold">{error}</p>
                <button onClick={onReset} className="mt-4 px-6 py-3 rounded-xl bg-violet-600 text-white font-bold">
                  try again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Pulsing bolt animation during build
function ZappBuildAnimation() {
  return (
    <div className="relative">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 70%)' }}
          animate={{ scale: [1, 2.5 + i * 0.5], opacity: [0.6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
        />
      ))}
      <motion.div
        animate={{
          filter: [
            'drop-shadow(0 0 10px rgba(167,139,250,0.8))',
            'drop-shadow(0 0 30px rgba(244,114,182,1))',
            'drop-shadow(0 0 10px rgba(167,139,250,0.8))',
          ],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <svg width="80" height="80" viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="buildGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
          <polygon points="19,2 8,18 15,18 13,30 24,14 17,14" fill="url(#buildGrad)" />
        </svg>
      </motion.div>
    </div>
  );
}

function BuildingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-4 h-4 rounded-full border-2 border-violet-500 border-t-transparent flex-shrink-0"
    />
  );
}

function CodeHighlight({ code }) {
  // Simple syntax colouring
  const highlighted = code
    .replace(/(&lt;|<)(\/?)(\w+)/g, (m, lt, slash, tag) =>
      `<span style="color:#f472b6">${lt}${slash}${tag}</span>`)
    .replace(/(#[0-9a-fA-F]{3,6})/g, '<span style="color:#60a5fa">$1</span>');

  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
}