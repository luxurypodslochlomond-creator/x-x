import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="10" y="6" width="36" height="44" rx="5" stroke="#f97316" strokeWidth="2" fill="rgba(249,115,22,0.06)" />
        <path d="M19 18h18M19 26h18M19 34h12" stroke="#f97316" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <circle cx="42" cy="42" r="10" fill="#f97316" />
        <path d="M38 42l2.5 2.5L46 37" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Got a letter you don't understand?",
    sub: "Bailiff notice. Court summons. Council tax demand. HMRC. Eviction. Debt collector. Whatever it is — paste it in.",
    color: "#f97316",
    tag: "YOU ARE NOT ALONE",
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="22" stroke="#06b6d4" strokeWidth="2" fill="rgba(6,182,212,0.06)" />
        <path d="M18 28l7 7 13-14" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 10v4M28 42v4M10 28h4M42 28h4" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
    title: "We decode it in seconds",
    sub: "What it actually means. What happens if you ignore it. Your deadline. Exactly what to do next. No jargon.",
    color: "#06b6d4",
    tag: "10 SECONDS",
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
        background: '#faf8f5',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '40px 28px',
      }}
    >
      {/* Skip */}
      <button
        onClick={onDone}
        style={{ position: 'absolute', top: 20, right: 20, fontSize: 11, fontWeight: 700, color: 'rgba(26,18,8,0.35)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em' }}
      >
        SKIP
      </button>

      {/* Progress */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 52 }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{
            width: i === step ? 24 : 6, height: 6, borderRadius: 3,
            background: i === step ? s.color : 'rgba(26,18,8,0.12)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ textAlign: 'center', maxWidth: 360 }}
        >
          {/* Tag */}
          <div style={{ marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: s.color }} />
            <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.18em', color: s.color }}>{s.tag}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            {s.icon}
          </div>
          <h2 style={{
            fontSize: 'clamp(24px, 7vw, 34px)', fontWeight: 900, lineHeight: 1.1,
            letterSpacing: '-0.03em', color: '#1a1208', margin: '0 0 16px'
          }}>
            {s.title}
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(26,18,8,0.6)', lineHeight: 1.7, margin: 0 }}>
            {s.sub}
          </p>
        </motion.div>
      </AnimatePresence>

      <div style={{ marginTop: 52, width: '100%', maxWidth: 360 }}>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={next}
          style={{
            width: '100%', padding: '19px 0', borderRadius: 14, cursor: 'pointer',
            background: s.color, border: 'none', color: '#000',
            fontSize: 15, fontWeight: 900, letterSpacing: '0.04em',
          }}
        >
          {step < STEPS.length - 1 ? 'Show me →' : "Let's go — paste my letter →"}
        </motion.button>

        {step === STEPS.length - 1 && (
          <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(26,18,8,0.3)', marginTop: 14, letterSpacing: '0.06em', lineHeight: 1.6 }}>
            10 FREE · NO CARD · NOTHING STORED · NO ACCOUNT
          </p>
        )}
      </div>
    </motion.div>
  );
}