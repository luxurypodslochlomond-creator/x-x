import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import ZappCreator from '@/components/zapp/ZappCreator';
import ZappLiveOutput from '@/components/zapp/ZappLiveOutput';
import ZappGallery from '@/components/zapp/ZappGallery';
import ZappSaveModal from '@/components/zapp/ZappSaveModal';
import ZappRemixModal from '@/components/zapp/ZappRemixModal';
import ZappGeometricIcon from '@/components/zapp/ZappGeometricIcon';
import { motion, AnimatePresence } from 'framer-motion';

const Bolt = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="bolt-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="50%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
    <polygon points="19,2 8,18 15,18 13,30 24,14 17,14" fill="url(#bolt-g)" />
  </svg>
);

export default function Zapp() {
  const [idea, setIdea] = useState('');
  const [phase, setPhase] = useState('home'); // home | gallery | building | play — land on builder, not gallery
  const [builderMode, setBuilderMode] = useState(false);
  const [builtHtml, setBuiltHtml] = useState('');
  const [appTitle, setAppTitle] = useState('');
  const [showSave, setShowSave] = useState(false);
  const [showRemix, setShowRemix] = useState(null);
  const [remixSource, setRemixSource] = useState(null);
  const [remixInstruction, setRemixInstruction] = useState('');
  const [savedId, setSavedId] = useState(null); // ID after saving — used for share link
  const [directPlay, setDirectPlay] = useState(null); // ZappCreation for direct play via URL

  // Handle ?play=ID in URL — load and play that app directly
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const playId = params.get('play');
    if (playId) {
      base44.entities.ZappCreation.filter({ id: playId }).then(results => {
        const item = results?.[0];
        if (item) {
          setDirectPlay(item);
          setPhase('play');
        }
      }).catch(() => {});
    }
  }, []);

  const handleIdeaSubmit = (ideaText) => {
    setIdea(ideaText);
    setRemixSource(null);
    setRemixInstruction('');
    setBuiltHtml('');
    setAppTitle('');
    setPhase('building');
  };

  const handleReset = () => {
    setIdea('');
    setPhase('home');
    setBuiltHtml('');
    setAppTitle('');
    setRemixSource(null);
    setRemixInstruction('');
    setShowSave(false);
    setSavedId(null);
  };

  // Retry keeps the same idea/remix context — just re-mounts ZappLiveOutput
  const [buildKey, setBuildKey] = useState(0);
  const handleRetry = () => {
    setBuildKey(k => k + 1);
  };

  const handleBuildComplete = (html, title) => {
    setBuiltHtml(html);
    setAppTitle(title);
    setSavedId(null);
    // Don't auto-show save modal — kids want to play first, save button is in toolbar
  };

  const handleRemixRequest = (original, instruction) => {
    setShowRemix(null);
    setRemixSource(original);
    setRemixInstruction(instruction);
    // Build a remixed idea incorporating the instruction
    const remixIdea = `Take this existing app: "${original.idea}" — and make this change: ${instruction}. Keep everything that works well but evolve it.`;
    setIdea(remixIdea);
    setBuiltHtml('');
    setAppTitle('');
    setBuildKey(k => k + 1); // Force ZappLiveOutput to remount — otherwise hasStarted ref blocks rebuild
    setPhase('building');
  };

  return (
    <div
      className="text-white overflow-hidden"
      style={{ background: '#0a0a0f', fontFamily: "'Inter', system-ui, sans-serif", height: '100dvh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(219,39,119,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(120,80,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(120,80,255,0.025) 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.button
          onClick={handleReset}
          className="flex items-center gap-2.5"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            animate={phase === 'home' ? { filter: ['drop-shadow(0 0 8px rgba(167,139,250,0.8))', 'drop-shadow(0 0 20px rgba(244,114,182,1))', 'drop-shadow(0 0 8px rgba(167,139,250,0.8))'] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Bolt size={32} />
          </motion.div>
          <span className="font-black text-2xl tracking-tight" style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>ZAPP</span>
          {phase === 'home' && (
            <span className="text-white/25 text-xs font-semibold hidden sm:block">build anything · AI · for kids</span>
          )}
        </motion.button>

        <div className="flex items-center gap-2">
          {/* Gallery tab */}
          <motion.button
            onClick={() => setPhase(phase === 'gallery' ? 'home' : 'gallery')}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{
              background: phase === 'gallery' ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.04)',
              border: phase === 'gallery' ? '1px solid rgba(251,191,36,0.5)' : '1px solid rgba(255,255,255,0.08)',
              color: phase === 'gallery' ? '#fbbf24' : 'rgba(255,255,255,0.3)',
            }}
          >
            {phase === 'gallery' ? (
              <>
                <ZappGeometricIcon shape="zap" size={16} color="#fbbf24" accent="#fde68a" />
                <span className="hidden sm:inline">build yours</span>
              </>
            ) : (
              <>
                <ZappGeometricIcon shape="trophy" size={16} color="rgba(255,255,255,0.3)" accent="rgba(255,255,255,0.5)" />
                <span className="hidden sm:inline">Hall of Fame</span>
              </>
            )}
          </motion.button>

          {/* Builder mode toggle */}
          <button
            onClick={() => setBuilderMode(!builderMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{
              background: builderMode ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)',
              border: builderMode ? '1px solid rgba(167,139,250,0.5)' : '1px solid rgba(255,255,255,0.08)',
              color: builderMode ? '#c4b5fd' : 'rgba(255,255,255,0.2)',
            }}
          >
            <span className="font-mono text-[11px]">{builderMode ? '</>' : '<>'}</span>
            <span className="hidden sm:inline">{builderMode ? 'builder mode' : 'magic mode'}</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: 'rgba(52,211,153,0.85)' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 8px rgba(52,211,153,0.8)' }} />
            kid-safe · checked · free
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 min-h-0" style={{ overflow: phase === 'home' ? 'auto' : 'hidden' }}>
        <AnimatePresence mode="wait" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {phase === 'play' && directPlay ? (
            <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col" style={{ height: '100%' }}>
              <div className="flex items-center justify-between px-4 py-2 flex-shrink-0"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.4)' }}>
                <div className="flex items-center gap-2">
                  {directPlay.emoji && /^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}]/u.test(directPlay.emoji)
                    ? <span className="text-xl">{directPlay.emoji}</span>
                    : <ZappGeometricIcon shape={directPlay.emoji || 'zap'} size={20} color="#fbbf24" accent="#fde68a" />
                  }
                  <span className="text-white font-black text-sm truncate max-w-[200px]">{directPlay.title}</span>
                  {directPlay.creator_name && <span className="text-white/30 text-xs">by {directPlay.creator_name}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => { setShowRemix(directPlay); }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5"
                    style={{ background: 'rgba(244,114,182,0.15)', border: '1px solid rgba(244,114,182,0.4)', color: '#f472b6' }}
                  >
                    <ZappGeometricIcon shape="shuffle" size={14} color="#f472b6" accent="#f9a8d4" /> remix
                  </motion.button>
                  <motion.button
                    onClick={handleReset}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 rounded-lg text-xs font-black text-white flex items-center gap-1.5"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
                  >
                    <ZappGeometricIcon shape="zap" size={14} color="#fff" accent="#fff" /> build new
                  </motion.button>
                </div>
              </div>
              <iframe srcDoc={directPlay.html} className="flex-1 w-full border-0" title={directPlay.title} sandbox="allow-scripts allow-same-origin" />
            </motion.div>
          ) : phase === 'gallery' ? (
            <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <ZappGallery
                onPlay={(item) => { setDirectPlay(item); setPhase('play'); }}
                onRemix={(item) => setShowRemix(item)}
              />
            </motion.div>
          ) : phase === 'home' ? (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }} style={{ height: '100%', overflowY: 'auto' }}>
              <ZappCreator onSubmit={handleIdeaSubmit} />
            </motion.div>
          ) : (
            <motion.div key="building" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ height: '100%' }}>
              <ZappLiveOutput
                key={buildKey}
                idea={idea}
                builderMode={builderMode}
                onComplete={handleBuildComplete}
                onReset={handleReset}
                onRetry={handleRetry}
                savedId={savedId}
                onSave={builtHtml ? () => setShowSave(true) : undefined}
                onRemix={builtHtml ? () => {
                  setShowRemix({ id: null, title: appTitle || idea, idea });
                } : undefined}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Save Modal */}
      <AnimatePresence>
        {showSave && builtHtml && (
          <ZappSaveModal
            appTitle={appTitle}
            html={builtHtml}
            idea={idea}
            remixOf={remixSource?.id || null}
            remixInstruction={remixInstruction || null}
            onSaved={(id) => { setSavedId(id); setShowSave(false); }}
            onClose={() => setShowSave(false)}
          />
        )}
      </AnimatePresence>

      {/* Footer — always visible */}
      <footer className="relative z-20 flex items-center justify-center gap-4 py-2 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <a href="/ZappAbout" className="text-white/30 hover:text-white/60 text-xs transition-colors">About</a>
        <span className="text-white/10">·</span>
        <a href="/ZappTerms" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms</a>
        <span className="text-white/10">·</span>
        <a href="/ZappPrivacy" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy</a>
        <span className="text-white/10">·</span>
        <span className="text-white/20 text-xs">kid-safe · checked · free · no account · any language · built by UF51</span>
      </footer>

      {/* Remix Modal */}
      <AnimatePresence>
        {showRemix && (
          <ZappRemixModal
            original={showRemix}
            onSubmit={handleRemixRequest}
            onClose={() => setShowRemix(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}