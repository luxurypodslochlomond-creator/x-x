import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Family51LetterDecoder from '@/components/family51/Family51LetterDecoder';
import Family51ReplyWriter from '@/components/family51/Family51ReplyWriter';
import Family51ConflictHelper from '@/components/family51/Family51ConflictHelper';

// ─── FAMILY51 STANDALONE APP ────────────────────────────────────────────────
// No UF51 nav. No emoji. Full custom native feel. COOLASFUCK.
// ────────────────────────────────────────────────────────────────────────────

const TOOLS = [
  {
    id: 'letter',
    name: 'DECODE',
    fullName: 'DECODE A LETTER',
    tagline: 'Scary letter? Plain English in seconds.',
    detail: 'Council tax. Energy bills. NHS. Landlord. Debt collector. Parking fine. We translate bureaucratic fear into exactly what it means and what you do next.',
    accentColor: '#f97316',
    dimColor: 'rgba(249,115,22,0.12)',
    glowColor: 'rgba(249,115,22,0.35)',
    icon: <LetterIcon />,
    badge: 'FREE',
  },
  {
    id: 'reply',
    name: 'REPLY',
    fullName: 'WRITE MY REPLY',
    tagline: "Don't know what to say? We write it.",
    detail: 'Tell us the situation. We write a clear, firm, legally-aware response ready to copy and send. No blank page. No stress.',
    accentColor: '#06b6d4',
    dimColor: 'rgba(6,182,212,0.12)',
    glowColor: 'rgba(6,182,212,0.35)',
    icon: <ReplyIcon />,
    badge: 'FREE',
  },
  {
    id: 'conflict',
    name: 'CONFLICT',
    fullName: 'CONFLICT HELPER',
    tagline: 'Neighbour. Workplace. Landlord. We help.',
    detail: 'When emotions are high, words go wrong. We analyse your situation and give you the exact response that protects you and de-escalates it.',
    accentColor: '#a855f7',
    dimColor: 'rgba(168,85,247,0.12)',
    glowColor: 'rgba(168,85,247,0.35)',
    icon: <ConflictIcon />,
    badge: 'FREE',
  },
];

export default function Family51Page() {
  const [activeTool, setActiveTool] = useState(null);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    document.title = 'Family51 — On Your Side';
    const timer = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const tool = TOOLS.find(t => t.id === activeTool);

  return (
    <div className="min-h-screen text-white" style={{ background: '#080a0f', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>

      {/* ── STANDALONE HEADER ─────────────────────────────── */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', background: 'rgba(8,10,15,0.92)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* LOGO */}
          <motion.button
            onClick={() => setActiveTool(null)}
            className="flex items-center gap-2.5"
            whileTap={{ scale: 0.96 }}
          >
            <F51LogoMark />
            <div className="flex flex-col leading-none">
              <span style={{ fontSize: 15, fontWeight: 900, letterSpacing: '-0.02em', color: '#fff' }}>FAMILY51</span>
              <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', color: '#f97316', textTransform: 'uppercase' }}>On Your Side</span>
            </div>
          </motion.button>

          {/* NAV PILLS */}
          <div className="flex items-center gap-1">
            {TOOLS.map(t => (
              <motion.button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                whileTap={{ scale: 0.93 }}
                style={{
                  padding: '5px 12px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  border: activeTool === t.id ? `1px solid ${t.accentColor}` : '1px solid rgba(255,255,255,0.1)',
                  background: activeTool === t.id ? t.dimColor : 'transparent',
                  color: activeTool === t.id ? t.accentColor : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.15s',
                  cursor: 'pointer',
                }}
              >
                {t.name}
              </motion.button>
            ))}
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">

        {/* ── HOME ───────────────────────────────────────────── */}
        {!activeTool && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>

            {/* HERO */}
            <div className="max-w-2xl mx-auto px-5 pt-16 pb-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 24 }}
                transition={{ duration: 0.5 }}
                className="space-y-5"
              >
                {/* EYEBROW */}
                <div className="flex items-center justify-center gap-2">
                  <PulseBar color="#f97316" />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Life Admin — Sorted</span>
                  <PulseBar color="#f97316" reverse />
                </div>

                {/* HEADLINE */}
                <h1 style={{ fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em', margin: 0 }}>
                  <span style={{ color: '#fff' }}>The system</span><br />
                  <span style={{ color: '#f97316' }}>works against you.</span><br />
                  <span style={{ color: '#fff' }}>We don't.</span>
                </h1>

                <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, maxWidth: 440, margin: '0 auto' }}>
                  Scary letter at midnight. Nightmare neighbour. Bill you can't understand.
                  <span style={{ color: '#fff', fontWeight: 600 }}> We decode it, explain it, and write your reply. Free. Private. Instant.</span>
                </p>

                {/* PRIVACY PILL */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 24, padding: '8px 16px' }}>
                  <ShieldCheckIcon />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', letterSpacing: '0.08em' }}>YOUR DATA NEVER LEAVES YOUR DEVICE</span>
                </div>
              </motion.div>
            </div>

            {/* TOOLS */}
            <div className="max-w-2xl mx-auto px-5 pb-8 space-y-3">
              {TOOLS.map((t, i) => (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.07 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => setActiveTool(t.id)}
                  className="w-full text-left"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid rgba(255,255,255,0.08)`,
                    borderRadius: 16,
                    padding: '20px 22px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: `0 0 0 0 ${t.glowColor}`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = t.accentColor + '60';
                    e.currentTarget.style.boxShadow = `0 0 40px ${t.glowColor}`;
                    e.currentTarget.style.background = t.dimColor;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = '0 0 0 0 transparent';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  {/* Accent line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${t.accentColor}, transparent)`, opacity: 0.6 }} />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3">
                        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', color: t.accentColor, textTransform: 'uppercase' }}>{t.fullName}</span>
                        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', color: t.accentColor, border: `1px solid ${t.accentColor}40`, borderRadius: 4, padding: '2px 6px' }}>{t.badge}</span>
                      </div>
                      <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 }}>{t.tagline}</p>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.5 }}>{t.detail}</p>
                    </div>
                    <div style={{ marginLeft: 16, flexShrink: 0, color: t.accentColor }}>
                      <ArrowRight color={t.accentColor} />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* VS COMPARISON */}
            <div className="max-w-2xl mx-auto px-5 pb-8">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 12, padding: '16px 18px' }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(239,68,68,0.7)', marginBottom: 10 }}>WITHOUT FAMILY51</p>
                  {['Weeks waiting for Citizens Advice', "Solicitor you can't afford", 'Google rabbit holes', 'Ignore it and hope', 'Sleepless nights'].map((x, i) => (
                    <div key={i} className="flex items-start gap-2 mb-1.5">
                      <span style={{ color: 'rgba(239,68,68,0.5)', fontSize: 10, marginTop: 2, flexShrink: 0 }}>X</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{x}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 12, padding: '16px 18px' }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(34,197,94,0.8)', marginBottom: 10 }}>FAMILY51</p>
                  {['Instant — works at 3am', 'Always free', 'Plain English, no jargon', 'Reply written for you', 'Data stays on your device'].map((x, i) => (
                    <div key={i} className="flex items-start gap-2 mb-1.5">
                      <span style={{ color: '#22c55e', fontSize: 10, marginTop: 2, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{x}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* WHO IT'S FOR */}
            <div className="max-w-2xl mx-auto px-5 pb-16">
              <div style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '20px 22px' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>WHO THIS IS FOR</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[
                    'Single mum with council eviction notice at midnight',
                    'Elderly person scared by a pension letter',
                    'Family with a nightmare neighbour — no solicitor money',
                    'Teenager with a college disciplinary letter',
                    'Anyone with a debt collector threatening action',
                    'Anyone too anxious to write that important email',
                  ].map((who, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span style={{ color: '#f97316', fontSize: 10, marginTop: 3, flexShrink: 0 }}>—</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{who}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        )}

        {/* ── TOOL VIEW ──────────────────────────────────────── */}
        {activeTool && tool && (
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="max-w-2xl mx-auto px-5 py-8"
          >
            {/* TOOL HERO */}
            <div className="mb-8 space-y-2">
              <div className="flex items-center gap-3">
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', color: tool.accentColor }}>{tool.fullName}</span>
                <span style={{ fontSize: 9, fontWeight: 800, color: tool.accentColor, border: `1px solid ${tool.accentColor}50`, borderRadius: 4, padding: '2px 7px', letterSpacing: '0.1em' }}>FREE</span>
              </div>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.01em' }}>{tool.tagline}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{tool.detail}</p>
            </div>

            {/* DIVIDER */}
            <div style={{ height: 1, background: `linear-gradient(90deg, ${tool.accentColor}30, transparent)`, marginBottom: 28 }} />

            {activeTool === 'letter' && <Family51LetterDecoder accentColor={tool.accentColor} />}
            {activeTool === 'reply' && <Family51ReplyWriter accentColor={tool.accentColor} />}
            {activeTool === 'conflict' && <Family51ConflictHelper accentColor={tool.accentColor} />}

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// ─── LOCAL ICON COMPONENTS ───────────────────────────────────────────────────

function F51LogoMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <motion.rect x="1" y="1" width="30" height="30" rx="8" stroke="#f97316" strokeWidth="1.5" fill="none"
        animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.5, repeat: Infinity }} />
      <motion.path d="M7 20L10 20L11 17L13 23L14.5 18L16 21L17.5 20H25"
        stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none"
        animate={{ strokeDashoffset: [100, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        style={{ strokeDasharray: 100 }} />
      <path d="M10 10h12M10 14h8" stroke="rgba(249,115,22,0.35)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1L2 3.5V7C2 9.8 4.2 12.3 7 13C9.8 12.3 12 9.8 12 7V3.5L7 1Z" stroke="#22c55e" strokeWidth="1.2" fill="none" />
      <path d="M5 7L6.3 8.3L9 5.5" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight({ color = '#fff' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PulseBar({ color, reverse }) {
  return (
    <motion.div
      style={{ width: 24, height: 2, background: color, borderRadius: 2, transformOrigin: reverse ? 'right' : 'left' }}
      animate={{ scaleX: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, delay: reverse ? 0.5 : 0 }}
    />
  );
}

function LetterIcon() { return null; }
function ReplyIcon() { return null; }
function ConflictIcon() { return null; }