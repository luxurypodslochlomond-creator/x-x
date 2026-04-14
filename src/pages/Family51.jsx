import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Family51LetterDecoder from '@/components/family51/Family51LetterDecoder';
import Family51ReplyWriter from '@/components/family51/Family51ReplyWriter';
import Family51ConflictHelper from '@/components/family51/Family51ConflictHelper';

// ─── FAMILY51 ────────────────────────────────────────────────────────────────
// Instant. Like pressing play. No reading first.
// ────────────────────────────────────────────────────────────────────────────

export default function Family51Page() {
  const [activeTool, setActiveTool] = useState(null);

  useEffect(() => {
    document.title = 'Family51 — On Your Side';
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#fff', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>

      {/* ── STICKY HEADER ──────────────────────────────────── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8,10,15,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.button onClick={() => setActiveTool(null)} whileTap={{ scale: 0.95 }} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <F51Mark />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '-0.01em', color: '#fff' }}>FAMILY51</div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: '#f97316' }}>ON YOUR SIDE</div>
          </div>
        </motion.button>

        {activeTool ? (
          <motion.button
            onClick={() => setActiveTool(null)}
            whileTap={{ scale: 0.95 }}
            style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            BACK
          </motion.button>
        ) : (
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { id: 'letter',   label: 'DECODE',   color: '#f97316' },
              { id: 'reply',    label: 'REPLY',    color: '#06b6d4' },
              { id: 'conflict', label: 'DISPUTE',  color: '#ef4444' },
            ].map(t => (
              <motion.button key={t.id} onClick={() => setActiveTool(t.id)} whileTap={{ scale: 0.93 }}
                style={{ padding: '6px 13px', borderRadius: 20, fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', border: `1px solid ${t.color}40`, background: `${t.color}10`, color: t.color, cursor: 'pointer' }}>
                {t.label}
              </motion.button>
            ))}
          </div>
        )}
      </header>

      <AnimatePresence mode="wait">

        {/* ── HOME: 3 BIG BUTTONS, NOTHING ELSE ─────────────── */}
        {!activeTool && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ maxWidth: 520, margin: '0 auto', padding: '40px 20px 60px' }}>

            {/* HEADLINE — SHORT AND SHARP */}
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>WHAT DO YOU NEED?</div>
                <h1 style={{ fontSize: 'clamp(28px, 7vw, 44px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0 }}>
                    <span style={{ color: '#fff' }}>Got a scary</span>{' '}
                    <span style={{ color: '#f97316' }}>letter?</span><br />
                    <span style={{ color: '#fff' }}>Need a</span>{' '}
                    <span style={{ color: '#06b6d4' }}>reply?</span><br />
                    <span style={{ color: '#fff' }}>Stuck in a</span>{' '}
                    <span style={{ color: '#ef4444' }}>dispute?</span>
                  </h1>
              </motion.div>
            </div>

            {/* THREE GIANT BUTTONS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

              <BigButton
                delay={0.05}
                color="#f97316"
                onClick={() => setActiveTool('letter')}
                icon={<DocIcon color="#f97316" />}
                label="DECODE A LETTER"
                sub="Paste it. Understand it in seconds."
                tag="FREE"
              />

              <BigButton
                delay={0.1}
                color="#06b6d4"
                onClick={() => setActiveTool('reply')}
                icon={<ReplyIcon color="#06b6d4" />}
                label="WRITE MY REPLY"
                sub="We write it for you. Copy and send."
                tag="FREE"
              />

              <BigButton
                delay={0.15}
                color="#ef4444"
                onClick={() => setActiveTool('conflict')}
                icon={<ConflictIcon color="#ef4444" />}
                label="DISPUTE HELP"
                sub="Neighbour. Employer. Landlord. We fight back."
                tag="FREE"
              />

            </div>

            {/* INSTANT TRUST — tiny, below the fold */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{ marginTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}
            >
              <TrustPill text="Data stays on your device" />
              <TrustPill text="Works at 3am" />
              <TrustPill text="Nothing stored" />
            </motion.div>

            {/* PAYWALL TEASER */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{ marginTop: 28, textAlign: 'center', padding: '16px 20px', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 12, background: 'rgba(249,115,22,0.04)' }}
            >
              <p style={{ fontSize: 12, fontWeight: 800, color: '#f97316', letterSpacing: '0.1em', margin: '0 0 4px' }}>FAMILY51 PRO — COMING SOON</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>Full case memory. See your issue through to the end. Never repeat yourself to the AI again.</p>
            </motion.div>

          </motion.div>
        )}

        {/* ── TOOL VIEW ─────────────────────────────────────── */}
        {activeTool && (
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ maxWidth: 560, margin: '0 auto', padding: '28px 20px 60px' }}
          >
            {activeTool === 'letter'   && <Family51LetterDecoder   accentColor="#f97316" />}
            {activeTool === 'reply'    && <Family51ReplyWriter     accentColor="#06b6d4" />}
            {activeTool === 'conflict' && <Family51ConflictHelper  accentColor="#ef4444" />}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// ─── BIG BUTTON ───────────────────────────────────────────────────────────────
function BigButton({ color, onClick, icon, label, sub, tag, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%', textAlign: 'left', cursor: 'pointer', padding: '22px 22px',
        borderRadius: 16, border: `1px solid ${hovered ? color + '80' : color + '30'}`,
        background: hovered ? `${color}12` : `${color}07`,
        transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 18,
        boxShadow: hovered ? `0 0 30px ${color}25` : 'none',
      }}
    >
      <div style={{ flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 15, fontWeight: 900, letterSpacing: '-0.01em', color: '#fff' }}>{label}</span>
          <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color, border: `1px solid ${color}50`, borderRadius: 4, padding: '2px 6px' }}>{tag}</span>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.4 }}>{sub}</p>
      </div>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, opacity: hovered ? 1 : 0.3, transition: 'opacity 0.15s' }}>
        <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  );
}

// ─── TRUST PILLS ─────────────────────────────────────────────────────────────
function TrustPill({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e' }} />
      <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>{text}</span>
    </div>
  );
}

// ─── CUSTOM ICONS ────────────────────────────────────────────────────────────
function F51Mark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect x="1" y="1" width="28" height="28" rx="7" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <path d="M6 19L9 19L10 16L12 22L13.5 17L15 20L16.5 19H24" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M8 9h14M8 13h9" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DocIcon({ color }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="8" y="4" width="20" height="28" rx="3" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M13 11h10M13 16h10M13 21h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="27" cy="27" r="6" fill={color} />
      <path d="M25 27l1.5 1.5L29 25" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReplyIcon({ color }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="4" y="8" width="28" height="20" rx="3" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M10 16h16M10 20h10" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M30 14l-5-4v8l5-4z" fill={color} />
    </svg>
  );
}

function ConflictIcon({ color }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="13" cy="13" r="7" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="23" cy="23" r="7" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M18 8v4M18 24v4M8 18h4M24 18h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}