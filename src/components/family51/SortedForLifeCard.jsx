import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sortedCheckout } from '@/functions/sortedCheckout';

const PERKS = [
  { icon: '⚡', text: 'Unlimited decodes, replies & dispute plans' },
  { icon: '🤖', text: 'Best AI model — elite advice every time' },
  { icon: '🛡️', text: 'We stay with you until it\'s resolved' },
  { icon: '📞', text: 'Direct escalation guide for every situation' },
  { icon: '❌', text: 'Cancel anytime — no contract' },
];

export default function SortedForLifeCard({ compact = false }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    if (window.self !== window.top) {
      alert('Checkout only works from the published app. Please open it directly.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await sortedCheckout({
        success_url: window.location.origin + '/Family51?sorted=success',
        cancel_url:  window.location.origin + '/Family51',
      });
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        setError('Could not start checkout. Try again in a moment.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: compact ? 0 : 0.45 }}
      style={{
        marginTop: compact ? 0 : 28,
        padding: compact ? '20px 18px' : '24px 22px',
        border: '1px solid rgba(249,115,22,0.4)',
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(249,115,22,0.09) 0%, rgba(239,68,68,0.05) 100%)',
      }}
    >
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', margin: '0 0 4px' }}>UNLOCK FULL ACCESS</p>
          <p style={{ fontSize: 17, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>SORTED FOR LIFE</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 24, fontWeight: 900, color: '#f97316', margin: 0, letterSpacing: '-0.02em' }}>£9.99</p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', margin: 0, letterSpacing: '0.05em' }}>per month · cancel anytime</p>
        </div>
      </div>

      {/* PERKS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 18 }}>
        {PERKS.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ fontSize: 13, lineHeight: 1.4 }}>{p.icon}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', lineHeight: 1.45 }}>{p.text}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        onClick={handleCheckout}
        disabled={loading}
        whileTap={!loading ? { scale: 0.97 } : {}}
        style={{
          width: '100%', padding: '15px 0', borderRadius: 12,
          fontSize: 13, fontWeight: 900, letterSpacing: '0.08em',
          cursor: loading ? 'not-allowed' : 'pointer',
          border: 'none',
          background: loading ? 'rgba(249,115,22,0.2)' : '#f97316',
          color: loading ? 'rgba(255,255,255,0.4)' : '#000',
          transition: 'all 0.2s',
        }}
      >
        {loading ? 'REDIRECTING...' : 'GET SORTED — £9.99/MONTH'}
      </motion.button>

      {error && (
        <p style={{ fontSize: 11, color: '#ef4444', textAlign: 'center', marginTop: 10 }}>{error}</p>
      )}

      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 10, letterSpacing: '0.04em' }}>
        Secure payment via Stripe · Apple Pay &amp; Google Pay accepted · Cancel anytime
      </p>
    </motion.div>
  );
}