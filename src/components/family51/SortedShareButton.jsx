import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── SORTED SHARE BUTTON ──────────────────────────────────────────────────────
// Shows after a successful decode. Shares the TOOL, never the content.
// The growth loop. Every helped person becomes a referral.
// ─────────────────────────────────────────────────────────────────────────────

const SHARE_URL = 'https://uf51.love/api/functions/ogRedirect?page=Family51';
const SHARE_TEXT = "Got a scary letter? SORTED decodes it in seconds — plain English, free, nothing stored.";

export default function SortedShareButton({ accentColor = '#f97316' }) {
  const [shared, setShared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SORTED — We\'ve Got You',
          text: SHARE_TEXT,
          url: SHARE_URL,
        });
        setShared(true);
      } catch (_) {}
    } else {
      setOpen(true);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${SHARE_TEXT}\n\n${SHARE_URL}`);
    setCopied(true);
    setTimeout(() => { setCopied(false); setOpen(false); setShared(true); }, 1800);
  };

  const whatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + '\n\n' + SHARE_URL)}`, '_blank');
    setShared(true);
  };

  if (shared) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: '14px 18px', background: 'rgba(34,197,94,0.06)', textAlign: 'center' }}
      >
        <p style={{ fontSize: 12, color: '#22c55e', fontWeight: 700, margin: 0 }}>
          ♾️ Shared — you just helped someone else too
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <motion.button
        onClick={handleNativeShare}
        whileTap={{ scale: 0.97 }}
        style={{
          width: '100%', padding: '14px 18px', borderRadius: 12, cursor: 'pointer',
          border: `1px solid ${accentColor}40`, background: `${accentColor}0d`,
          color: '#fff', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 12
        }}
      >
        <ShareIconSVG color={accentColor} />
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.04em', color: '#fff' }}>
            Someone else needs this?
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
            Got a scary letter? SORTED decodes it free.
          </div>
        </div>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: accentColor, border: `1px solid ${accentColor}40`, borderRadius: 4, padding: '3px 7px' }}>
          SHARE
        </span>
      </motion.button>

      {/* Fallback picker if no native share */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ marginTop: 8, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, overflow: 'hidden', background: 'rgba(255,255,255,0.03)' }}
          >
            <button onClick={whatsapp} style={optBtn('#22c55e')}>
              <WhatsAppIcon /> Share on WhatsApp
            </button>
            <button onClick={handleCopy} style={optBtn('rgba(255,255,255,0.7)')}>
              <CopyIcon /> {copied ? '✓ Copied!' : 'Copy link'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const optBtn = (color) => ({
  width: '100%', padding: '12px 16px', background: 'none', border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer',
  color, fontSize: 13, fontWeight: 700, fontFamily: 'inherit',
  display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
});

function ShareIconSVG({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="15" cy="4" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="15" cy="16" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="5" cy="10" r="2" stroke={color} strokeWidth="1.5" />
      <path d="M7 9L13 5M7 11L13 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#22c55e" strokeWidth="1.2" />
      <path d="M5 8.5c1 2 3.5 3 5.5 2l.5 1.5-2 .5c-3 0-6-3-6-6l.5-2 1.5.5c-.5 2 .5 4 0 3.5z" fill="#22c55e" opacity="0.8" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 11V3h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}