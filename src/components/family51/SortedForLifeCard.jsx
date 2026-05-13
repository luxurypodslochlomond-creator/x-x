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
        marginTop: compact ? 0 : 24,
        padding: compact ? '24px 20px' : '28px 24px',
        border: '1.5px solid rgba(245,166,35,0.5)',
        borderRadius: 18,
        background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(217,119,6,0.04) 100%)',
      }}
    >
      {/* EMOTIONAL HEADLINE */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: '#f97316', margin: '0 0 8px' }}>NEVER BE STUCK AGAIN</p>
        <p style={{ fontSize: 22, fontWeight: 900, color: '#1a1208', letterSpacing: '-0.02em', margin: '0 0 6px', lineHeight: 1.15 }}>
          Every letter.<br />Every reply.<br />We've got you.
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 32, fontWeight: 900, color: '#f97316', letterSpacing: '-0.03em' }}>{geo.label.replace('/month', '')}</span>
          <span style={{ fontSize: 13, color: 'rgba(26,18,8,0.45)' }}>{geo.sub}</span>
        </div>
      </div>

      {/* WHAT THEY GET — emotionally framed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
        {[
          { text: 'Unlimited decodes — paste any letter, any time', bold: 'Unlimited decodes' },
          { text: 'We write your reply — professional, assertive, right tone', bold: 'We write your reply' },
          { text: 'Dispute plans — when things go further', bold: 'Dispute plans' },
          { text: 'Nothing stored, nothing tracked, ever', bold: 'Nothing stored' },
          { text: 'Cancel any time — no contract, no catch', bold: 'Cancel any time' },
        ].map(({ text, bold }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 13, color: 'rgba(26,18,8,0.75)', lineHeight: 1.5 }}>
              <strong style={{ color: '#1a1208', fontWeight: 700 }}>{bold}</strong> — {text.replace(bold + ' — ', '')}
            </span>
          </div>
        ))}
      </div>

      {/* SOCIAL PROOF LINE */}
      <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.4)', margin: '0 0 16px', lineHeight: 1.5, fontStyle: 'italic' }}>
        "Less than a coffee. Worth more than a solicitor's first 5 minutes."
      </p>

      {/* CTA */}
      <motion.button
        onClick={handleCheckout}
        disabled={loading}
        whileTap={!loading ? { scale: 0.97 } : {}}
        style={{
          width: '100%', padding: '18px 0', borderRadius: 14,
          fontSize: 15, fontWeight: 900, letterSpacing: '0.04em',
          cursor: loading ? 'not-allowed' : 'pointer',
          border: 'none',
          background: loading ? 'rgba(249,115,22,0.2)' : '#f97316',
          color: loading ? 'rgba(26,18,8,0.4)' : '#000',
          transition: 'all 0.2s',
        }}
      >
        {loading ? 'REDIRECTING...' : geo.cta}
      </motion.button>

      {error && (
        <p style={{ fontSize: 12, color: '#ef4444', textAlign: 'center', marginTop: 10 }}>{error}</p>
      )}

      <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.35)', textAlign: 'center', marginTop: 12, letterSpacing: '0.03em', lineHeight: 1.5 }}>
        Secure · Apple Pay &amp; Google Pay · Cancel anytime
      </p>
    </motion.div>
  );
}