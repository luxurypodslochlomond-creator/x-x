import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSortedCount } from '@/functions/getSortedCount';

// Honest counter — shows the REAL number of cases decoded (from getSortedCount).
// No fake ticking, no seed number. If we're early, we say we're early.
export default function SortedLiveCounter() {
  const [count, setCount] = useState(null); // null = loading

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

  // Still early — honest framing, no fake numbers
  if (count === null || count === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          padding: '18px 22px',
          borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(217,119,6,0.04) 0%, rgba(217,119,6,0.02) 100%)',
          border: '1.5px solid rgba(217,119,6,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: '#1a1208', lineHeight: 1.2 }}>
            Be among the first helped
          </div>
          <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.38)', margin: '3px 0 0' }}>
            We're early — built honest, growing by word of mouth
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
        padding: '18px 22px',
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(217,119,6,0.04) 0%, rgba(217,119,6,0.02) 100%)',
        border: '1.5px solid rgba(217,119,6,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: 24, fontWeight: 900, color: '#1a1208' }}>
            {count.toLocaleString()}
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(26,18,8,0.4)' }}>
            PEOPLE HELPED
          </span>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.38)', margin: '3px 0 0' }}>
          letters decoded · replies written · disputes resolved
        </p>
      </div>
    </motion.div>
  );
}