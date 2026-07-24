import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sortedCheckout } from '@/functions/sortedCheckout';
import { useSortedGeoPrice } from '@/hooks/useSortedGeoPrice';

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
      transition={{ delay: compact ? 0 : 0.3 }}
      style={{
        marginTop: compact ? 0 : 0,
        padding: compact ? '24px 20px' : '28px 24px',
        border: '2px solid rgba(217,119,6,0.45)',
        borderRadius: 20,
        background: 'linear-gradient(150deg, rgba(217,119,6,0.06) 0%, rgba(217,119,6,0.02) 100%)',
        boxShadow: '0 4px 20px rgba(217,119,6,0.06)',
      }}
    >
      <div style={{ marginBottom: 22 }}>
        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: '#d97706', margin: '0 0 10px' }}>
          YOU'VE SEEN IT WORK — NOW KEEP IT
        </p>
        <p style={{ fontSize: 24, fontWeight: 900, color: '#1a1208', letterSpacing: '-0.025em', margin: '0 0 8px', lineHeight: 1.1 }}>
          Every letter.<br />Every reply.<br />We've got you.
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 34, fontWeight: 900, color: '#d97706', letterSpacing: '-0.03em' }}>
            {geo.label.replace('/month', '')}
          </span>
          <span style={{ fontSize: 14, color: 'rgba(26,18,8,0.42)', fontWeight: 500 }}>
            {geo.sub}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {[
          { bold: 'Unlimited decodes', rest: 'paste, type, or snap a photo' },
          { bold: 'We write your reply', rest: 'professional, assertive, right tone' },
          { bold: 'Dispute plans', rest: 'when things go further' },
          { bold: 'Your cases stay yours', rest: 'saved privately on your device' },
          { bold: 'Pay once', rest: 'no subscription, no contract, no catch' },
        ].map(({ bold, rest }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%',
              background: 'rgba(217,119,6,0.12)', border: '1.5px solid rgba(217,119,6,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
            }}>
              <svg width="10" height="10" viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 13, color: 'rgba(26,18,8,0.72)', lineHeight: 1.5 }}>
              <strong style={{ color: '#1a1208', fontWeight: 700 }}>{bold}</strong> — {rest}
            </span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.38)', margin: '0 0 16px', lineHeight: 1.5, fontStyle: 'italic' }}>
        "More clarity than an hour of Googling — one payment, yours for life."
      </p>
      <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)', margin: '0 0 16px', lineHeight: 1.5, fontWeight: 600 }}>
        Your payment keeps SORTED free for someone who can't afford it right now.
      </p>

      <motion.button
        onClick={handleCheckout}
        disabled={loading}
        whileTap={!loading ? { scale: 0.97 } : {}}
        style={{
          width: '100%', padding: '18px 0', borderRadius: 16,
          fontSize: 16, fontWeight: 900, letterSpacing: '0.04em',
          cursor: loading ? 'not-allowed' : 'pointer',
          border: 'none',
          background: loading ? 'rgba(217,119,6,0.2)' : '#d97706',
          color: loading ? 'rgba(26,18,8,0.4)' : '#fff',
          transition: 'all 0.2s',
          boxShadow: loading ? 'none' : '0 4px 16px rgba(217,119,6,0.25)',
        }}
      >
        {loading ? 'REDIRECTING...' : geo.cta}
      </motion.button>

      {error && (
        <p style={{ fontSize: 12, color: '#ef4444', textAlign: 'center', marginTop: 10 }}>{error}</p>
      )}

      <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.32)', textAlign: 'center', marginTop: 14, letterSpacing: '0.03em', lineHeight: 1.5 }}>
        Secure · Apple Pay &amp; Google Pay · Pay once, no subscription
      </p>
    </motion.div>
  );
}