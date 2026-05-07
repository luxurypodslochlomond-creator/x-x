import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SortedShareMoment({ onDismiss }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = 'https://uf51.love/Sorted';
  const shareText = "Just used SORTED — it decoded a scary letter into plain English in seconds. Free to try. No signup needed. sorted.uf51.love";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'SORTED — We\'ve Got You', text: shareText, url: shareUrl });
    } else {
      handleCopy();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 10 }}
      transition={{ duration: 0.22 }}
      style={{
        background: 'rgba(34,197,94,0.06)',
        border: '1px solid rgba(34,197,94,0.25)',
        borderRadius: 16,
        padding: '20px 20px 16px',
        marginTop: 24,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(34,197,94,0.7)', marginBottom: 4 }}>
            SORTED ✓
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.4 }}>
            Know someone who needs this?
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: '4px 0 0', lineHeight: 1.5 }}>
            SORTED is free to try. No signup. Share it in one tap.
          </p>
        </div>
        <button onClick={onDismiss} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.25)', fontSize: 18, lineHeight: 1, padding: '0 0 0 8px' }}>×</button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleShare}
          style={{
            flex: 1, padding: '12px 0', borderRadius: 10, cursor: 'pointer',
            background: '#22c55e', border: 'none', color: '#000',
            fontSize: 13, fontWeight: 800, letterSpacing: '0.04em',
          }}
        >
          {copied ? '✓ Link copied' : 'Share SORTED'}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            const wa = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
            window.open(wa, '_blank');
          }}
          style={{
            padding: '12px 16px', borderRadius: 10, cursor: 'pointer',
            background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)',
            color: '#25d366', fontSize: 13, fontWeight: 800,
          }}
        >
          WhatsApp
        </motion.button>
      </div>
    </motion.div>
  );
}