import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SEVERITY_CONFIG = {
  'NOT URGENT':      { color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.25)',  emoji: '✓' },
  'NEEDS ATTENTION': { color: '#eab308', bg: 'rgba(234,179,8,0.08)',   border: 'rgba(234,179,8,0.25)',  emoji: '!' },
  'URGENT':          { color: '#f97316', bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.25)', emoji: '!!' },
  'VERY URGENT':     { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.25)',  emoji: '⚠' },
};

export default function SortedStreamingResult({ result, accentColor = '#f97316', onHandoff, onReset, caseId }) {
  const [showMore, setShowMore] = useState(false);
  const [saved, setSaved] = useState(false);
  const sev = result?.severity ? (SEVERITY_CONFIG[result.severity] || SEVERITY_CONFIG['NEEDS ATTENTION']) : null;

  const buildText = () =>
    `SORTED — Your Letter Breakdown\n\n` +
    (result.we_hear_you ? result.we_hear_you + '\n\n' : '') +
    `WHAT THIS MEANS:\n${result.what_this_means}\n\n` +
    `URGENCY: ${result.severity}\n` +
    (result.key_deadline && result.key_deadline !== 'No deadline mentioned' ? `DEADLINE: ${result.key_deadline}\n\n` : '\n') +
    (result.financial_impact && result.financial_impact !== 'No specific financial amount mentioned.' ? `AMOUNT: ${result.financial_impact}\n\n` : '') +
    `WHAT TO DO:\n${result.action_steps?.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n` +
    (result.free_help?.length > 0 ? `FREE HELP:\n${result.free_help.join('\n')}\n\n` : '') +
    `Via SORTED — uf51.love/Sorted\nGuidance only, not legal advice.`;

  const handleSave = async () => {
    const text = buildText();

    // Try native share first (iOS share sheet — allows Save to Files, AirDrop, WhatsApp etc)
    if (navigator.share) {
      try {
        // Share as a text file so iOS "Save to Files" works properly
        const file = new File([text], 'sorted-letter-breakdown.txt', { type: 'text/plain' });
        const canShareFile = navigator.canShare && navigator.canShare({ files: [file] });
        if (canShareFile) {
          await navigator.share({ title: 'SORTED — Letter Breakdown', files: [file] });
        } else {
          await navigator.share({ title: 'SORTED — Letter Breakdown', text });
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        return;
      } catch (err) {
        // User cancelled share — don't fall through to clipboard, just return
        if (err?.name === 'AbortError') return;
        // Any other error — fall through to clipboard/download
      }
    }

    // Fallback 1: clipboard
    try {
      await navigator.clipboard.writeText(text);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      return;
    } catch (_) {}

    // Fallback 2: download as .txt file
    try {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sorted-letter-breakdown.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (_) {}
  };

  if (!result || !sev) return null;

  const hasDeadline = result.key_deadline && result.key_deadline !== 'No deadline mentioned';
  const hasMoney = result.financial_impact && result.financial_impact !== 'No specific financial amount mentioned.';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* ── 1. THE VERDICT — one big clear card ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          borderRadius: 16, padding: '22px 20px',
          background: sev.bg, border: `1.5px solid ${sev.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: 3, ease: 'easeInOut' }}
            style={{ width: 10, height: 10, borderRadius: '50%', background: sev.color, boxShadow: `0 0 10px ${sev.color}`, flexShrink: 0 }}
          />
          <span style={{ fontSize: 11, fontWeight: 900, color: sev.color, letterSpacing: '0.16em' }}>{result.severity}</span>
          {result.sender && result.sender !== 'Unknown' && (
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginLeft: 'auto' }}>from {result.sender}</span>
          )}
        </div>

        <p style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: '0 0 10px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          {result.letter_summary || 'Official letter'}
        </p>

        {result.dont_panic && (
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.6 }}>
            {result.dont_panic}
          </p>
        )}

        {/* DEADLINE + MONEY pills */}
        {(hasDeadline || hasMoney) && (
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            {hasDeadline && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: `${sev.color}15`, border: `1px solid ${sev.color}40` }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: sev.color }}>⏰ Respond by: {result.key_deadline}</span>
              </div>
            )}
            {hasMoney && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>£ {result.financial_impact}</span>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* ── 2. WHAT IT MEANS — plain English, no label needed ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{ padding: '18px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)', margin: '0 0 10px' }}>IN PLAIN ENGLISH</p>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.88)', lineHeight: 1.75, margin: 0 }}>
          {result.what_this_means}
        </p>
      </motion.div>

      {/* ── 3. WHAT TO DO — the most important bit ── */}
      {result.action_steps?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{ padding: '18px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)', margin: '0 0 14px' }}>WHAT TO DO</p>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {result.action_steps.slice(0, showMore ? undefined : 3).map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.25 }}
                style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}
              >
                <span style={{
                  fontSize: 10, fontWeight: 900, color: '#000', background: accentColor,
                  minWidth: 20, height: 20, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 2,
                }}>{i + 1}</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.88)', lineHeight: 1.65 }}>{step}</span>
              </motion.li>
            ))}
          </ol>

          {/* Show more steps */}
          {!showMore && result.action_steps.length > 3 && (
            <button
              onClick={() => setShowMore(true)}
              style={{
                marginTop: 14, fontSize: 12, fontWeight: 800, color: accentColor,
                background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0',
                letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              + {result.action_steps.length - 3} more steps ↓
            </button>
          )}
        </motion.div>
      )}

      {/* ── CTA: WRITE REPLY ── */}
      {onHandoff && (
        <motion.button
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          onClick={() => onHandoff({ summary: result.letter_summary, sender: result.sender, deadline: result.key_deadline, what_this_means: result.what_this_means, suggestedTone: result.suggested_tone, related_case_id: caseId })}
          whileTap={{ opacity: 0.7 }}
          style={{
            width: '100%', padding: '18px 0', borderRadius: 14, fontSize: 14,
            fontWeight: 900, letterSpacing: '0.08em', cursor: 'pointer',
            border: `2px solid ${accentColor}`,
            background: accentColor, color: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
          }}
        >
          WRITE MY REPLY NOW →
        </motion.button>
      )}

      {/* ── EXTRA INFO — collapsed behind "See more" ── */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}
          >
            {/* GOOD TO KNOW */}
            {result.if_you_ignore_this && (
              <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(234,179,8,0.04)', border: '1px solid rgba(234,179,8,0.12)' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(234,179,8,0.6)', margin: '0 0 8px' }}>IF YOU DON'T ACT</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, margin: 0 }}>{result.if_you_ignore_this}</p>
              </div>
            )}

            {/* FREE HELP */}
            {result.free_help?.length > 0 && (
              <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(34,197,94,0.5)', margin: '0 0 10px' }}>FREE HELP AVAILABLE</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {result.free_help.map((help, i) => (
                    <p key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, margin: 0, paddingLeft: 12, borderLeft: `2px solid rgba(34,197,94,0.3)` }}>{help}</p>
                  ))}
                </div>
              </div>
            )}

            {/* FREE PEOPLE */}
            <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.12)' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(249,115,22,0.6)', margin: '0 0 10px' }}>TALK TO A REAL PERSON</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { name: 'Citizens Advice', desc: 'free debt & legal help', url: 'https://www.citizensadvice.org.uk' },
                  { name: 'National Debtline', desc: '0808 808 4000', url: 'https://www.nationaldebtline.org' },
                  { name: 'Debt Camel', desc: 'plain English guides', url: 'https://debtcamel.co.uk' },
                ].map(({ name, desc, url }) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f97316', flexShrink: 0 }} />
                    <span><strong style={{ color: '#fff' }}>{name}</strong> — {desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SEE MORE / HIDE TOGGLE ── */}
      <button
        onClick={() => setShowMore(v => !v)}
        style={{
          fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
          background: 'none', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 10, padding: '11px 0', cursor: 'pointer',
          letterSpacing: '0.08em', width: '100%',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {showMore ? '↑ SHOW LESS' : '↓ SEE MORE DETAIL'}
      </button>

      {/* ── BOTTOM ACTIONS ── */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={handleSave}
          style={{
            flex: 1, padding: '13px 0', borderRadius: 10, fontSize: 12, fontWeight: 800,
            letterSpacing: '0.08em', cursor: 'pointer',
            border: '1px solid rgba(34,197,94,0.4)',
            background: saved ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.07)',
            color: '#22c55e',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
            transition: 'all 0.2s',
          }}
        >
          {saved ? '✓ SAVED' : 'SHARE / SAVE AS FILE'}
        </button>
        <button
          onClick={onReset}
          style={{
            flex: 1, padding: '13px 0', borderRadius: 10, fontSize: 12, fontWeight: 800,
            letterSpacing: '0.08em', cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'transparent', color: 'rgba(255,255,255,0.5)',
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
          }}
        >
          NEW LETTER
        </button>
      </div>

      {/* HUMAN + AI LINE */}
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
        Built by a human who needed this too. Powered by AI — but the care is real.
      </p>

      {/* DISCLAIMER */}
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
        General guidance only — not legal advice. Always verify with{' '}
        <a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'underline' }}>Citizens Advice</a>.
      </p>

    </div>
  );
}