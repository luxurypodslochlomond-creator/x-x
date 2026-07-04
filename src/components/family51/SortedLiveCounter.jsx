import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSortedCount } from '@/functions/getSortedCount';

const GOLD = '#c6995c';
const INK = '#1c1c1e';

// Honest counter — shows the REAL number of cases decoded.
// No fake ticking, no seed number. If we're early, we say we're early — humanly.
export default function SortedLiveCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getSortedCount()
      .then((res) => {
        if (cancelled) return;
        const real = res?.data?.count;
        setCount(typeof real === 'number' ? real : null);
      })
      .catch(() => { if (!cancelled) setCount(null); });
    return () => { cancelled = true; };
  }, []);

  // Still early — honest, human, no startup pitch
  if (count === null || count === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          padding: '16px 20px',
          borderRadius: 14,
          background: 'rgba(198,153,92,0.04)',
          border: '1px solid rgba(198,153,92,0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: INK, lineHeight: 1.2 }}>
            You're not alone
          </div>
          <p style={{ fontSize: 11, color: 'rgba(28,28,30,0.35)', margin: '2px 0 0' }}>
            Built with care in Scotland — here for anyone who needs it
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      style={{
        padding: '16px 20px',
        borderRadius: 14,
        background: 'rgba(198,153,92,0.04)',
        border: '1px solid rgba(198,153,92,0.12)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: INK }}>
            {count.toLocaleString()}
          </span>
          <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(28,28,30,0.35)', letterSpacing: '0.1em' }}>
            PEOPLE HELPED
          </span>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(28,28,30,0.35)', margin: '2px 0 0' }}>
          letters decoded · replies written · disputes resolved
        </p>
      </div>
    </motion.div>
  );
}