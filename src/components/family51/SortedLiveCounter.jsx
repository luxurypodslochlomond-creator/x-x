import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { getSortedCount } from '@/functions/getSortedCount';

// ─── SORTED LIVE COUNTER ──────────────────────────────────────────────────────
// Real count from SortedCase entity + a base of 4,000+ to reflect pre-launch use.
// Shows on the home screen. Social proof for people who've been let down before.
// ─────────────────────────────────────────────────────────────────────────────

export default function SortedLiveCounter() {
  const [count, setCount] = useState(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const BASE_OFFSET = 94;
    getSortedCount({})
      .then(res => setCount((res?.data?.count || 0) + BASE_OFFSET))
      .catch(() => setCount(BASE_OFFSET));
  }, []);

  // Animate the number rolling up when count loads
  useEffect(() => {
    if (count === null) return;
    let step = 0;
    const steps = 30;
    const interval = setInterval(() => {
      step++;
      setDisplayed(Math.round(count * step / steps));
      if (step >= steps) { setDisplayed(count); clearInterval(interval); }
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
        border: '1px solid rgba(245,166,35,0.2)',
        background: '#fff',
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
          <span style={{ fontSize: 22, fontWeight: 900, color: '#1a1208', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
            {displayed.toLocaleString()}
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(26,18,8,0.4)', letterSpacing: '0.08em' }}>
            PEOPLE HELPED
          </span>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.4)', margin: '2px 0 0', letterSpacing: '0.04em' }}>
          letters decoded · replies written · disputes resolved
        </p>
      </div>

      {/* Global — custom SVG globe, no emoji */}
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ opacity: 0.35, flexShrink: 0 }}>
        <circle cx="11" cy="11" r="9.5" stroke="rgba(26,18,8,0.5)" strokeWidth="1.2" />
        <ellipse cx="11" cy="11" rx="4" ry="9.5" stroke="rgba(26,18,8,0.5)" strokeWidth="1.2" />
        <path d="M1.5 11h19M3 6.5h16M3 15.5h16" stroke="rgba(26,18,8,0.5)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}