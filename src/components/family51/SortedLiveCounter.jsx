import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SortedLiveCounter() {
  const [displayed, setDisplayed] = useState(143);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayed(d => d + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      style={{
        padding: '18px 22px',
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(245,166,35,0.04) 0%, rgba(245,166,35,0.02) 100%)',
        border: '1.5px solid rgba(245,166,35,0.15)',
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
            {displayed.toLocaleString()}
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