import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// The Break-It-Down Blueprint — the keystone of "Grooves, Not Grades".
// Before any code exists, the kid turns one big idea into smaller pieces while
// their buddy asks the questions. This carves the decomposition groove — the one
// shape every other kind of thinking stacks on. (Kirk's AGI thesis: after AGI,
// information is a commodity; cognitive shape is not. So we shape the brain.)
//
// The notes are TRANSIENT. They fold into the idea sent to the AI for this one
// build and are never stored on the device or the server. The input guard on the
// server already strips PII from the combined text, so the Blueprint keeps
// ZAPP COPPA-clean — nothing new is collected.
//
// Honest-machine touch: the buddy admits it gets things wrong, so the kid's
// notes are framed as helping the AI — not as a test of the kid. That models
// calibrated skepticism (the single most valuable groove next to AGI) and
// extends the philosophy to AI too: a fallible collaborator, never an oracle.

const QUESTIONS = [
  { key: 'opening',     n: 1, q: 'When it opens, what do you see first?' },
  { key: 'interaction', n: 2, q: 'What does tapping the main thing do?' },
  { key: 'ending',      n: 3, q: 'How does it end — or loop forever?' },
  { key: 'trickiest',   n: 4, q: 'Which bit do you most want to get right?' },
];

export default function ZappBlueprint({ idea, buddy, onBuild, onSkip }) {
  const [parts, setParts] = useState({ opening: '', interaction: '', ending: '', trickiest: '' });
  const firstRef = useRef(null);

  // Gentle focus on desktop only — auto-focus inside mobile scroll views caused
  // background scroll-lock (a known dead-end), so we skip it on touch screens.
  useEffect(() => {
    if (window.innerWidth >= 768) setTimeout(() => firstRef.current?.focus(), 350);
  }, []);

  const set = (k, v) => setParts(p => ({ ...p, [k]: v }));

  const buddyEmoji = buddy?.emoji || '⚡';
  const buddyName = buddy?.name || 'ZAPP';
  const buddyColor = buddy?.color || '#a78bfa';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col items-center justify-start px-4 pt-7 pb-20 w-full"
      style={{ overflowY: 'auto', height: '100%' }}
    >
      {/* Buddy + the honest line */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex items-center gap-2.5 mb-5 max-w-2xl"
      >
        <span style={{ fontSize: 26, filter: `drop-shadow(0 0 10px ${buddyColor}70)`, flexShrink: 0 }}>{buddyEmoji}</span>
        <span className="text-white/55 text-sm leading-relaxed">
          {buddyName} says: <span className="italic">“Let’s break it into pieces. I get things wrong sometimes — your notes help me build what you actually want.”</span>
        </span>
      </motion.div>

      {/* Warm parchment blueprint card — a thinking space, not a play space */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.35 }}
        className="w-full max-w-2xl relative"
        style={{
          background: '#f3ead7',
          borderRadius: 26,
          boxShadow: '0 24px 70px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.6)',
          border: '1px solid #d9c9a8',
          overflow: 'hidden',
        }}
      >
        {/* faint paper grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(154,141,106,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(154,141,106,0.10) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }} />
        {/* tape corners for warmth, not clutter */}
        <div style={{ position:'absolute', top:-6, left:24, width:54, height:18, background:'rgba(251,191,36,0.55)', transform:'rotate(-4deg)', borderRadius:2, boxShadow:'0 2px 6px rgba(0,0,0,0.15)' }} />
        <div style={{ position:'absolute', top:-6, right:24, width:54, height:18, background:'rgba(251,191,36,0.55)', transform:'rotate(5deg)', borderRadius:2, boxShadow:'0 2px 6px rgba(0,0,0,0.15)' }} />

        <div className="relative px-5 sm:px-7 py-7">
          <h2 className="font-black leading-none mb-1" style={{ color:'#2a241c', fontSize:'clamp(1.6rem,5vw,2.2rem)', letterSpacing:'-0.01em' }}>
            let’s break it down
          </h2>
          <p className="text-sm mb-5" style={{ color:'#7a6d4f' }}>answer any or all — then we build</p>

          {/* The kid's idea, pinned as the brief */}
          <div className="mb-6 rounded-xl p-3.5" style={{ background:'rgba(124,58,237,0.06)', border:'1px dashed rgba(124,58,237,0.25)' }}>
            <p className="text-[10px] font-black tracking-widest uppercase mb-1" style={{ color:'#7c3aed' }}>your idea</p>
            <p className="text-sm leading-relaxed" style={{ color:'#2a241c', maxHeight: 90, overflowY:'auto' }}>{idea || '—'}</p>
          </div>

          {/* Decomposition questions — buddy asks, kid answers */}
          <div className="flex flex-col gap-5">
            {QUESTIONS.map((q, i) => (
              <div key={q.key}>
                <label className="flex items-center gap-2.5 mb-1.5" htmlFor={`zb-${q.key}`}>
                  <span className="flex items-center justify-center font-black text-xs"
                    style={{ width:24, height:24, borderRadius:'50%', background:'#7c3aed', color:'#fff', flexShrink:0 }}>{q.n}</span>
                  <span className="font-bold text-sm" style={{ color:'#2a241c' }}>{q.q}</span>
                </label>
                <input
                  id={`zb-${q.key}`}
                  ref={i === 0 ? firstRef : null}
                  value={parts[q.key]}
                  onChange={e => set(q.key, e.target.value)}
                  aria-label={q.q}
                  placeholder="type a few words…"
                  className="w-full bg-transparent outline-none pb-1.5"
                  style={{ color:'#2a241c', borderBottom:'2px solid #c9b98e', fontSize:16, fontWeight:500 }}
                />
              </div>
            ))}
          </div>

          {/* ZAPP IT — same gradient bolt as the rest of ZAPP */}
          <motion.button
            onClick={() => onBuild(parts)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-7 flex items-center justify-center gap-2 font-black text-base"
            style={{
              padding:'14px 22px', borderRadius:16,
              background:'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
              color:'#fff',
              boxShadow:'0 0 28px rgba(124,58,237,0.55), 0 6px 20px rgba(219,39,119,0.3)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><polygon points="19,2 8,18 15,18 13,30 24,14 17,14" fill="#fff" /></svg>
            ZAPP IT
          </motion.button>

          {/* Calm-but-fast escape hatch — never force the kid to think */}
          <button
            onClick={onSkip}
            className="w-full mt-2.5 text-center text-sm font-bold transition-colors hover:opacity-70"
            style={{ color:'#7a6d4f' }}
          >
            just build it →
          </button>
        </div>
      </motion.div>

      <p className="text-white/20 text-xs mt-5 text-center max-w-md font-mono">
        your notes aren’t saved anywhere — they just help this one build
      </p>
    </motion.div>
  );
}