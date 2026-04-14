import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sortedCheckout } from '@/functions/sortedCheckout';

const PERKS = [
  { icon: '🔒', text: 'Full case memory — pick up where you left off' },
  { icon: '♾️', text: 'Unlimited decodes, replies, and dispute plans' },
  { icon: '⚡', text: 'Priority AI — best model, always' },
  { icon: '📞', text: 'Direct escalation guide for every situation' },
  { icon: '🛡️', text: 'We stay with you until it\'s resolved' },
];

export default function SortedForLifeCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    // Block in iframes
    if (window.self !== window.top) {
      alert('Checkout only works from the published app. Please open sorted.uf51.com directly.');
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
      transition={{ delay: 0.45 }}
      style={{
        marginTop: 28,
        padding: '24px 22px',
        border: '1px solid rgba(249,115,22,0.35)',
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(249,115,22,0.07) 0%, rgba(239,68,68,0.04) 100%)',
      }}
    >
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', margin: '0 0 4px' }}>UPGRADE</p>
          <p style={{ fontSize: 17, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>SORTED FOR LIFE</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 22, fontWeight: 900, color: '#f97316', margin: 0, letterSpacing: '-0.02em' }}>£9.99</p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', margin: 0, letterSpacing: '0.05em' }}>one-off · forever</p>
        </div>
      </div>

      {/* PERKS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {PERKS.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ fontSize: 14, lineHeight: 1.4 }}>{p.icon}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>{p.text}</span>
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
          fontSize: 13, fontWeight: 900, letterSpacing: '0.1em',
          cursor: loading ? 'not-allowed' : 'pointer',
          border: '1px solid rgba(249,115,22,0.6)',
          background: loading ? 'rgba(249,115,22,0.1)' : 'rgba(249,115,22,0.18)',
          color: loading ? 'rgba(249,115,22,0.4)' : '#f97316',
          transition: 'all 0.2s',
        }}
      >
        {loading ? 'REDIRECTING...' : 'GET SORTED FOR LIFE — £9.99'}
      </motion.button>

      {error && (
        <p style={{ fontSize: 11, color: '#ef4444', textAlign: 'center', marginTop: 10 }}>{error}</p>
      )}

      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 12, letterSpacing: '0.05em' }}>
        Secure payment via Stripe · No subscription · Cancel anytime is moot — it's yours forever
      </p>
    </motion.div>
  );
}