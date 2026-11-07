import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import ZappCreator from '@/components/zapp/ZappCreator';
import ZappLiveOutput from '@/components/zapp/ZappLiveOutput';
import ZappGallery from '@/components/zapp/ZappGallery';
import ZappSaveModal from '@/components/zapp/ZappSaveModal';
import ZappRemixModal from '@/components/zapp/ZappRemixModal';
import ZappGeometricIcon from '@/components/zapp/ZappGeometricIcon';
import ZappBuddyPicker from '@/components/zapp/ZappBuddyPicker';
import ZappBlueprint from '@/components/zapp/ZappBlueprint';
import { getAnimal } from '@/components/zapp/ZappAnimals';
import { getBuddyId, setBuddyId as persistBuddy, rememberBuild, getBuildCount } from '@/components/zapp/ZappAnimalMemory';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import GlobalErrorBoundary from '@/components/shared/GlobalErrorBoundary';

const Bolt = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="bolt-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e2602a" />
        <stop offset="50%" stopColor="#b3261e" />
        <stop offset="100%" stopColor="#f4efe4" />
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
  const [remixHtml, setRemixHtml] = useState(null); // existing HTML to evolve on remix
  const [savedId, setSavedId] = useState(null); // ID after saving — used for share link
  const [directPlay, setDirectPlay] = useState(null); // ZappCreation for direct play via URL
  const [buddyId, setBuddyIdState] = useState(() => getBuddyId()); // device-local build buddy
  const [showPicker, setShowPicker] = useState(false);
  const [pickerDismissed, setPickerDismissed] = useState(false); // so "skip for now" actually dismisses
  const [blueprint, setBlueprint] = useState(null); // kid's decomposition notes — transient, never stored

  const buddy = getAnimal(buddyId);
  const buildsDone = getBuildCount();
  const buddyGreeting = buddy
    ? (buildsDone > 0 ? buddy.returns[Math.min(buildsDone - 1, buddy.returns.length - 1)] : buddy.greets[0])
    : '';

  const handleBuddyChoose = (id) => {
    if (id) { persistBuddy(id); setBuddyIdState(id); }
    setShowPicker(false);
    setPickerDismissed(true);
  };

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
    setRemixHtml(null);
    setBuiltHtml('');
    setAppTitle('');
    setBlueprint(null);
    setPhase('building');
  };

  // Opt-in: kid taps "break it down first" on the home screen to reach the
  // Blueprint. The fast path (type → ZAPP IT) stays untouched — one tap to magic.
  const handleBreakItDown = (ideaText) => {
    setIdea(ideaText);
    setRemixSource(null);
    setRemixInstruction('');
    setRemixHtml(null);
    setBuiltHtml('');
    setAppTitle('');
    setBlueprint(null);
    setPhase('blueprint');
  };

  const handleReset = () => {
    setIdea('');
    setPhase('home');
    setBuiltHtml('');
    setAppTitle('');
    setRemixSource(null);
    setRemixInstruction('');
    setRemixHtml(null);
    setShowSave(false);
    setSavedId(null);
    setBlueprint(null);
  };

  // Retry keeps the same idea/remix context — just re-mounts ZappLiveOutput
  const [buildKey, setBuildKey] = useState(0);
  const handleRetry = () => {
    setBuildKey(k => k + 1);
  };

  const handleBlueprintBuild = (parts) => {
    setBlueprint(parts);
    setBuildKey(k => k + 1);
    setPhase('building');
  };
  const handleBlueprintSkip = () => {
    setBlueprint(null);
    setBuildKey(k => k + 1);
    setPhase('building');
  };

  const handleBuildComplete = (html, title) => {
    setBuiltHtml(html);
    setAppTitle(title);
    setSavedId(null);
    // Remember this build ON THE DEVICE ONLY — nothing sent to us (COPPA-clean).
    rememberBuild(idea);
    // Don't auto-show save modal — kids want to play first, save button is in toolbar
  };

  const handleRemixRequest = (original, instruction) => {
    setShowRemix(null);
    setRemixSource(original);
    setRemixInstruction(instruction);
    // Pass the REAL built HTML so the server evolves the actual app, not a
    // rebuild from the text idea (which is what made remix feel broken).
    setRemixHtml(original.html || null);
    // The idea sent to the server is just the change the kid asked for —
    // short, focused. The existing HTML travels separately as existingHtml.
    setIdea(instruction);
    setBuiltHtml('');
    setAppTitle('');
    setBlueprint(null); // remix is a different idea — don't carry stale notes
    setBuildKey(k => k + 1); // Force ZappLiveOutput to remount — otherwise hasStarted ref blocks rebuild
    setPhase('building');
  };

  return (
    <GlobalErrorBoundary>
    <div
      className="overflow-hidden text-[#f4efe4]"
      style={{ background: '#1a1612', fontFamily: 'var(--font-body)', height: '100dvh', display: 'flex', flexDirection: 'column' }}
    >
      {/* THE BOARD ──────────────────────────────────────────────────────────────────
          This used to float on a black field with violet and magenta clouds behind it, which
          is a different product's weather entirely — so ZAPP read as something bolted onto the
          record rather than a room in it. It stands on the record's own ink now, the warm dark
          of the masthead, with one signal-orange glow and the grid of a workshop.
          Everything a child makes keeps its own colour. The room around it belongs to the book. */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: 'absolute', top: '-12%', left: '8%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(226,96,42,0.16) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', bottom: '-14%', right: '4%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(179,38,30,0.14) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(244,239,228,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(244,239,228,0.035) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(244,239,228,0.12)' }}>
        <motion.button
          onClick={handleReset}
          className="flex items-center gap-2.5"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            animate={phase === 'home' ? { filter: ['drop-shadow(0 0 6px rgba(226,96,42,0.7))', 'drop-shadow(0 0 16px rgba(226,96,42,1))', 'drop-shadow(0 0 6px rgba(226,96,42,0.7))'] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Bolt size={32} />
          </motion.div>
          <span className="font-black text-2xl tracking-tight" style={{
            background: 'linear-gradient(135deg, #f4efe4 0%, #e2602a 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>ZAPP</span>
          {phase === 'home' && (
            <span className="text-[#f4efe4]/45 text-xs font-semibold hidden sm:block">build anything · AI · for kids</span>
          )}
        </motion.button>

        <div className="flex items-center gap-2">
          {/* Gallery tab */}
          <motion.button
            onClick={() => setPhase(phase === 'gallery' ? 'home' : 'gallery')}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{
              background: phase === 'gallery' ? 'rgba(226,96,42,0.16)' : 'rgba(244,239,228,0.05)',
              border: phase === 'gallery' ? '1px solid rgba(226,96,42,0.5)' : '1px solid rgba(244,239,228,0.14)',
              color: phase === 'gallery' ? '#e2602a' : 'rgba(244,239,228,0.45)',
            }}
          >
            {phase === 'gallery' ? (
              <>
                <ZappGeometricIcon shape="zap" size={16} color="#e2602a" accent="#f2d3a0" />
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
              background: builderMode ? 'rgba(244,239,228,0.12)' : 'rgba(244,239,228,0.05)',
              border: builderMode ? '1px solid rgba(244,239,228,0.45)' : '1px solid rgba(244,239,228,0.14)',
              color: builderMode ? '#f4efe4' : 'rgba(244,239,228,0.3)',
            }}
          >
            <span className="font-mono text-[11px]">{builderMode ? '</>' : '<>'}</span>
            <span className="hidden sm:inline">{builderMode ? 'builder mode' : 'magic mode'}</span>
          </button>

          {buddy && (
            <motion.button
              onClick={() => { setPickerDismissed(false); setShowPicker(true); }}
              whileTap={{ scale: 0.92 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: `${buddy.color}15`, border: `1px solid ${buddy.color}40` }}
              title="change your build buddy"
            >
              <span style={{ fontSize: 16, filter: `drop-shadow(0 0 6px ${buddy.color}80)` }}>{buddy.emoji}</span>
              <span className="hidden sm:inline text-xs font-bold" style={{ color: buddy.accent }}>{buddy.name}</span>
            </motion.button>
          )}
          <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: 'rgba(226,96,42,0.9)' }}>
            <span className="w-2 h-2 rounded-full bg-[#e2602a]" style={{ boxShadow: '0 0 8px rgba(226,96,42,0.7)' }} />
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
                style={{ borderBottom: '1px solid rgba(244,239,228,0.12)', background: 'rgba(26,22,18,0.6)' }}>
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
                    style={{ background: 'rgba(226,96,42,0.16)', border: '1px solid rgba(226,96,42,0.45)', color: '#e2602a' }}
                  >
                    <ZappGeometricIcon shape="shuffle" size={14} color="#e2602a" accent="#f2d3a0" /> remix
                  </motion.button>
                  <motion.button
                    onClick={handleReset}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 rounded-lg text-xs font-black text-white flex items-center gap-1.5"
                    style={{ background: 'linear-gradient(135deg, #b3261e, #e2602a)' }}
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
              {buddy && buddyGreeting && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="text-center pt-6"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm" style={{ background: `${buddy.color}10`, border: `1px solid ${buddy.color}25`, color: buddy.accent }}>
                    <span style={{ fontSize: 16 }}>{buddy.emoji}</span>
                    {buddyGreeting}
                  </span>
                </motion.div>
              )}
              <ZappCreator onSubmit={handleIdeaSubmit} onBreakItDown={handleBreakItDown} />
            </motion.div>
          ) : phase === 'blueprint' ? (
            <motion.div key="blueprint" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} style={{ height: '100%', display:'flex', flexDirection:'column' }}>
              <ZappBlueprint idea={idea} buddy={buddy} onBuild={handleBlueprintBuild} onSkip={handleBlueprintSkip} />
            </motion.div>
          ) : (
            <motion.div key="building" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ height: '100%' }}>
              <ZappLiveOutput
                key={buildKey}
                idea={idea}
                blueprint={blueprint}
                buildFlavor={buddy?.buildFlavor || ''}
                builderMode={builderMode}
                existingHtml={remixHtml}
                onComplete={handleBuildComplete}
                onReset={handleReset}
                onRetry={handleRetry}
                savedId={savedId}
                onSave={builtHtml ? () => setShowSave(true) : undefined}
                onRemix={builtHtml ? () => {
                  setShowRemix({ id: null, title: appTitle || idea, idea, html: builtHtml });
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
      <footer className="relative z-20 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 px-4 flex-shrink-0" style={{ borderTop: '1px solid rgba(244,239,228,0.1)' }}>
        <Link to="/ZappAbout" className="text-[#f4efe4]/55 hover:text-[#e2602a] text-xs font-semibold transition-colors">About</Link>
        <span className="text-[#f4efe4]/20">·</span>
        <Link to="/ZappTerms" className="text-[#f4efe4]/55 hover:text-[#e2602a] text-xs font-semibold transition-colors">Terms</Link>
        <span className="text-[#f4efe4]/20">·</span>
        <Link to="/ZappPrivacy" className="text-[#f4efe4]/55 hover:text-[#e2602a] text-xs font-semibold transition-colors">Privacy</Link>
        <span className="text-[#f4efe4]/20 hidden sm:inline">·</span>
        <span className="text-[#f4efe4]/35 text-xs">kid-safe · no account · a room in the record</span>
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

      {/* Build Buddy Picker — first visit, or when kid taps their buddy to change */}
      <AnimatePresence>
        {(!buddyId || showPicker) && !pickerDismissed && (
          <ZappBuddyPicker key="picker" onChoose={handleBuddyChoose} />
        )}
      </AnimatePresence>
    </div>
    </GlobalErrorBoundary>
  );
}