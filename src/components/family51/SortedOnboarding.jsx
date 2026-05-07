import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  {
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <rect x="10" y="6" width="32" height="40" rx="4" stroke="#f97316" strokeWidth="2" fill="rgba(249,115,22,0.06)" />
        <path d="M18 17h16M18 24h16M18 31h10" stroke="#f97316" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <circle cx="38" cy="38" r="9" fill="#f97316" />
        <path d="M35 38l2 2 4-4" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Paste any scary letter",
    sub: "Council tax. Eviction notice. Court summons. HMRC. Whatever's keeping you up at night.",
    color: "#f97316",
  },
  {
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="26" r="20" stroke="#06b6d4" strokeWidth="2" fill="rgba(6,182,212,0.06)" />
        <path d="M17 26l6 6 12-12" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "We decode it in seconds",
    sub: "Plain English. What it actually means. What you need to do. Deadlines. Who to call. No jargon.",
    color: "#06b6d4",
  },
  {
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <rect x="6" y="12" width="40" height="28" rx="4" stroke="#22c55e" strokeWidth="2" fill="rgba(34,197,94,0.06)" />
        <path d="M14 24h24M14 30h16" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <path d="M42 20l-6-5v10l6-5z" fill="#22c55e" />
      </svg>
    ),
    title: "We write your reply",
    sub: "Professional tone. Your rights. Their obligations. Copy, paste, send. Done.",
    color: "#22c55e",
  },
];

export default function SortedOnboarding({ onDone }) {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      onDone();
    }
  };

  const s = STEPS[step];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: '#080a0f',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      {/* Skip */}
      <button
        onClick={onDone}
        style={{ position: 'absolute', top: 20, right: 20, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.25)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em' }}
      >
        SKIP
      </button>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 48 }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{
            width: i === step ? 20 : 6, height: 6, borderRadius: 3,
            background: i === step ? s.color : 'rgba(255,255,255,0.15)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ textAlign: 'center', maxWidth: 360 }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            {s.icon}
          </div>
          <h2 style={{
            fontSize: 'clamp(22px, 6vw, 30px)', fontWeight: 900, lineHeight: 1.15,
            letterSpacing: '-0.03em', color: '#fff', margin: '0 0 14px'
          }}>
            {s.title}
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0 }}>
            {s.sub}
          </p>
        </motion.div>
      </AnimatePresence>

      <div style={{ marginTop: 48, width: '100%', maxWidth: 360 }}>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={next}
          style={{
            width: '100%', padding: '18px 0', borderRadius: 14, cursor: 'pointer',
            background: s.color, border: 'none', color: '#000',
            fontSize: 15, fontWeight: 900, letterSpacing: '0.04em',
            transition: 'all 0.15s',
          }}
        >
          {step < STEPS.length - 1 ? 'Next →' : "Let's go →"}
        </motion.button>

        {step === STEPS.length - 1 && (
          <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 14, letterSpacing: '0.06em' }}>
            5 FREE · NO CARD · NOTHING STORED
          </p>
        )}
      </div>
    </motion.div>
  );
}