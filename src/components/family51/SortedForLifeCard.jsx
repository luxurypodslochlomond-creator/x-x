import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sortedCheckout } from '@/functions/sortedCheckout';
import { useSortedGeoPrice } from '@/hooks/useSortedGeoPrice';

// Custom SVG icons — no emoji
const IconUnlimited = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
    <path d="M2 8c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2s-.9 2-2 2H4c-1.1 0-2-.9-2-2z" stroke="#f97316" strokeWidth="1.3" fill="none"/>
    <path d="M5.5 8h5" stroke="#f97316" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IconAI = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
    <circle cx="8" cy="8" r="6" stroke="#f97316" strokeWidth="1.3" fill="none"/>
    <path d="M5 8l2 2 4-4" stroke="#f97316" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconShield = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
    <path d="M8 2L3 4.5v4c0 2.5 2 4.5 5 5.5 3-1 5-3 5-5.5v-4L8 2z" stroke="#f97316" strokeWidth="1.3" fill="none"/>
    <path d="M5.5 8l1.5 1.5L10 6.5" stroke="#f97316" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconGuide = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
    <rect x="3" y="2" width="10" height="12" rx="2" stroke="#f97316" strokeWidth="1.3" fill="none"/>
    <path d="M5.5 6h5M5.5 9h3" stroke="#f97316" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IconCancel = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
    <circle cx="8" cy="8" r="6" stroke="#f97316" strokeWidth="1.3" fill="none"/>
    <path d="M6 8h4" stroke="#f97316" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const PERKS = [
  { Icon: IconUnlimited, text: 'Unlimited decodes, replies & dispute plans' },
  { Icon: IconAI,        text: 'AI that breaks down complex letters into plain English' },
  { Icon: IconShield,    text: 'Every letter, every reply, every dispute — fully private, nothing stored' },
  { Icon: IconGuide,     text: 'Step-by-step escalation guide for every situation' },
  { Icon: IconCancel,    text: 'Cancel anytime — no contract, no catch' },
];

export default function SortedForLifeCard({ compact = false }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const geo = useSortedGeoPrice();

  const handleCheckout = async () => {
    if (window.self !== window.top) {
      alert('Checkout only works from the published app. Please open it directly.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await sortedCheckout({
        success_url: window.location.origin + '/Sorted?sorted=success',
        cancel_url:  window.location.origin + '/Sorted',
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
        padding: compact ? '22px 20px' : '26px 24px',
        border: '1px solid rgba(249,115,22,0.45)',
        borderRadius: 18,
        background: 'linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(239,68,68,0.06) 100%)',
      }}
    >
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.45)', margin: '0 0 5px' }}>UNLOCK FULL ACCESS</p>
          <p style={{ fontSize: 19, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', margin: 0, lineHeight: 1 }}>SORTED FOR LIFE</p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
          <p style={{ fontSize: 26, fontWeight: 900, color: '#f97316', margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>{geo.label.replace('/month', '')}</p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: '3px 0 0', letterSpacing: '0.04em' }}>{geo.sub}</p>
        </div>
      </div>

      {/* PERKS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 20 }}>
        {PERKS.map(({ Icon, text }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Icon />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.45 }}>{text}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        onClick={handleCheckout}
        disabled={loading}
        whileTap={!loading ? { scale: 0.97 } : {}}
        style={{
          width: '100%', padding: '16px 0', borderRadius: 12,
          fontSize: 14, fontWeight: 900, letterSpacing: '0.06em',
          cursor: loading ? 'not-allowed' : 'pointer',
          border: 'none',
          background: loading ? 'rgba(249,115,22,0.25)' : '#f97316',
          color: loading ? 'rgba(255,255,255,0.5)' : '#000',
          transition: 'all 0.2s',
        }}
      >
        {loading ? 'REDIRECTING TO STRIPE...' : geo.cta}
      </motion.button>

      {error && (
        <p style={{ fontSize: 12, color: '#ef4444', textAlign: 'center', marginTop: 10, margin: '10px 0 0' }}>{error}</p>
      )}

      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 12, letterSpacing: '0.03em', lineHeight: 1.5 }}>
        Secure payment via Stripe · Apple Pay &amp; Google Pay accepted
      </p>
    </motion.div>
  );
}