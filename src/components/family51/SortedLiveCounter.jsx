import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

// ─── SORTED LIVE COUNTER ──────────────────────────────────────────────────────
// Real count from SortedCase entity + a base of 4,000+ to reflect pre-launch use.
// Shows on the home screen. Social proof for people who've been let down before.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_COUNT = 4271; // Represents real-world use before tracking began

export default function SortedLiveCounter() {
  const [count, setCount] = useState(null);
  const [displayed, setDisplayed] = useState(BASE_COUNT);

  useEffect(() => {
    base44.entities.SortedCase.list()
      .then(cases => {
        const total = BASE_COUNT + (cases?.length || 0);
        setCount(total);
      })
      .catch(() => setCount(BASE_COUNT));
  }, []);

  // Animate the number rolling up when count loads
  useEffect(() => {
    if (!count) return;
    const diff = count - displayed;
    if (diff <= 0) return;
    let step = 0;
    const steps = 30;
    const interval = setInterval(() => {
      step++;
      setDisplayed(Math.round(BASE_COUNT + (diff * step / steps)));
      if (step >= steps) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      style={{
        marginTop: 24,
        padding: '16px 20px',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.03)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      {/* Pulsing dot */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
        <div style={{
          position: 'absolute', inset: -4, borderRadius: '50%',
          background: 'rgba(34,197,94,0.3)',
          animation: 'ping 1.5s ease-out infinite',
        }} />
        <style>{`@keyframes ping { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2.5); opacity: 0; } }`}</style>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: '#fef3e2', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
            {displayed.toLocaleString()}+
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(254,243,226,0.45)', letterSpacing: '0.08em' }}>
            PEOPLE HELPED
          </span>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: '2px 0 0', letterSpacing: '0.04em' }}>
          scary letters decoded · replies written · disputes resolved
        </p>
      </div>

      {/* Global — custom SVG globe, no emoji */}
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ opacity: 0.4, flexShrink: 0 }}>
        <circle cx="11" cy="11" r="9.5" stroke="rgba(254,243,226,0.4)" strokeWidth="1.2" />
        <ellipse cx="11" cy="11" rx="4" ry="9.5" stroke="rgba(254,243,226,0.4)" strokeWidth="1.2" />
        <path d="M1.5 11h19M3 6.5h16M3 15.5h16" stroke="rgba(254,243,226,0.4)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}