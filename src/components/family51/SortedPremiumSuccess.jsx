import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SortedPremiumSuccess({ onDismiss }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 8000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      style={{
        marginBottom: 20,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Animated gradient background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(34,197,94,0.1) 50%, rgba(6,182,212,0.15) 100%)',
        border: '1px solid rgba(249,115,22,0.4)',
        borderRadius: 16,
      }} />

      <div style={{ position: 'relative', padding: '24px 20px 20px', textAlign: 'center' }}>
        {/* Big tick */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 280 }}
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: '#22c55e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M6 14l6 6 10-12" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.25em', color: 'rgba(249,115,22,0.8)', marginBottom: 8 }}>
            SORTED FOR LIFE
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
            You're fully SORTED.
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '0 0 16px', lineHeight: 1.5 }}>
            Unlimited access. Any letter, any dispute, any time.<br />
            We've genuinely got your back.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
            {['Unlimited uses', 'All 3 tools', 'Any country', 'Cancel anytime'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{f}</span>
              </div>
            ))}
          </div>
          <button
            onClick={onDismiss}
            style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em' }}
          >
            START USING SORTED →
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}