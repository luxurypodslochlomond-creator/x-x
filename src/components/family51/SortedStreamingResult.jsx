import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SortedHelpLinks from './SortedHelpLinks';
import SortedNextFiveMinutes from './SortedNextFiveMinutes';
import SortedPushNudge from './SortedPushNudge';
import SortedTimeline from './SortedTimeline';

const SEVERITY_CONFIG = {
  'NOT URGENT':      { color: '#22c55e', bg: 'rgba(34,197,94,0.07)',   border: 'rgba(34,197,94,0.25)',  emoji: '✓' },
  'NEEDS ATTENTION': { color: '#d97706', bg: 'rgba(217,119,6,0.07)',   border: 'rgba(217,119,6,0.25)',  emoji: '!' },
  'URGENT':          { color: '#ea580c', bg: 'rgba(234,88,12,0.07)',   border: 'rgba(234,88,12,0.25)',  emoji: '!!' },
  'VERY URGENT':     { color: '#dc2626', bg: 'rgba(220,38,38,0.07)',   border: 'rgba(220,38,38,0.25)',  emoji: '⚠' },
};

export default function SortedStreamingResult({ result, accentColor = '#f97316', onHandoff, onReset, caseId, geo }) {
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
    if (navigator.share) {
      try {
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
        if (err?.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      return;
    } catch (_) {}
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

      {/* ── 1. THE VERDICT ── */}
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
            style={{ width: 10, height: 10, borderRadius: '50%', background: sev.color, boxShadow: `0 0 8px ${sev.color}`, flexShrink: 0 }}
          />
          <span style={{ fontSize: 11, fontWeight: 900, color: sev.color, letterSpacing: '0.16em' }}>{result.severity}</span>
          {result.sender && result.sender !== 'Unknown' && (
            <span style={{ fontSize: 10, color: 'rgba(26,18,8,0.4)', marginLeft: 'auto' }}>from {result.sender}</span>
          )}
        </div>

        <p style={{ fontSize: 20, fontWeight: 900, color: '#1a1208', margin: '0 0 10px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          {result.letter_summary || 'Official letter'}
        </p>

        {result.dont_panic && (
          <p style={{ fontSize: 14, color: 'rgba(26,18,8,0.7)', margin: 0, lineHeight: 1.6 }}>
            {result.dont_panic}
          </p>
        )}

        {(hasDeadline || hasMoney) && (
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            {hasDeadline && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: `${sev.color}12`, border: `1px solid ${sev.color}35` }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: sev.color }}>⏰ Respond by: {result.key_deadline}</span>
              </div>
            )}
            {hasMoney && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'rgba(26,18,8,0.05)', border: '1px solid rgba(26,18,8,0.12)' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(26,18,8,0.7)' }}>£ {result.financial_impact}</span>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* ── 2. PLAIN ENGLISH ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{ padding: '18px 20px', borderRadius: 14, background: '#fff', border: '1px solid rgba(26,18,8,0.08)' }}
      >
        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(26,18,8,0.35)', margin: '0 0 10px' }}>IN PLAIN ENGLISH</p>
        <p style={{ fontSize: 15, color: 'rgba(26,18,8,0.85)', lineHeight: 1.75, margin: 0 }}>
          {result.what_this_means}
        </p>
      </motion.div>

      {/* ── 3. WHAT TO DO ── */}
      {result.action_steps?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{ padding: '18px 20px', borderRadius: 14, background: '#fff', border: '1px solid rgba(26,18,8,0.08)' }}
        >
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(26,18,8,0.35)', margin: '0 0 14px' }}>WHAT TO DO</p>
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
                  fontSize: 10, fontWeight: 900, color: '#fff', background: accentColor,
                  minWidth: 20, height: 20, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 2,
                }}>{i + 1}</span>
                <span style={{ fontSize: 14, color: 'rgba(26,18,8,0.85)', lineHeight: 1.65 }}>{step}</span>
              </motion.li>
            ))}
          </ol>

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

      {/* ── WHAT HAPPENS NEXT — animated timeline ── */}
      <SortedTimeline analysisResult={result} tool="letter" accentColor={accentColor} />

      {/* ── NEXT 5 MINUTES — emotional scaffolding ── */}
      <SortedNextFiveMinutes severity={result.severity} accentColor={accentColor} />

      {/* ── IF YOU DON'T ACT — always visible for urgent letters ── */}
      {result.if_you_ignore_this && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          style={{ padding: '16px 18px', borderRadius: 14, background: 'rgba(217,119,6,0.05)', border: '1px solid rgba(217,119,6,0.2)' }}
        >
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(217,119,6,0.8)', margin: '0 0 8px' }}>⚠ IF YOU DO NOTHING</p>
          <p style={{ fontSize: 14, color: 'rgba(26,18,8,0.78)', lineHeight: 1.65, margin: 0 }}>{result.if_you_ignore_this}</p>
        </motion.div>
      )}

      {/* ── CTA: WRITE REPLY ── */}
      {onHandoff && (
        <motion.button
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onHandoff({ summary: result.letter_summary, sender: result.sender, deadline: result.key_deadline, what_this_means: result.what_this_means, suggestedTone: result.suggested_tone, related_case_id: caseId }); }}
          whileTap={{ opacity: 0.7 }}
          style={{
            width: '100%', padding: '18px 0', borderRadius: 14, fontSize: 14,
            fontWeight: 900, letterSpacing: '0.08em', cursor: 'pointer',
            border: `2px solid ${accentColor}`,
            background: accentColor, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
          }}
        >
          CONTINUE → WRITE MY REPLY
        </motion.button>
      )}

      {/* ── EXTRA INFO — expanded detail ── */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}
          >
            {result.if_you_ignore_this && (
              <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(217,119,6,0.05)', border: '1px solid rgba(217,119,6,0.15)' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(217,119,6,0.7)', margin: '0 0 8px' }}>IF YOU DON'T ACT</p>
                <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.75)', lineHeight: 1.65, margin: 0 }}>{result.if_you_ignore_this}</p>
              </div>
            )}

            {result.free_help?.length > 0 && (
              <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(22,163,74,0.7)', margin: '0 0 10px' }}>FREE HELP AVAILABLE</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {result.free_help.map((help, i) => (
                    <p key={i} style={{ fontSize: 13, color: 'rgba(26,18,8,0.75)', lineHeight: 1.65, margin: 0, paddingLeft: 12, borderLeft: `2px solid rgba(34,197,94,0.4)` }}>{help}</p>
                  ))}
                </div>
              </div>
            )}

            <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.15)' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(234,88,12,0.7)', margin: '0 0 10px' }}>TALK TO A REAL PERSON</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { name: 'Citizens Advice', desc: 'free debt & legal help', url: 'https://www.citizensadvice.org.uk' },
                  { name: 'National Debtline', desc: '0808 808 4000', url: 'https://www.nationaldebtline.org' },
                  { name: 'Debt Camel', desc: 'plain English guides', url: 'https://debtcamel.co.uk' },
                ].map(({ name, desc, url }) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'rgba(26,18,8,0.65)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f97316', flexShrink: 0 }} />
                    <span><strong style={{ color: '#1a1208' }}>{name}</strong> — {desc}</span>
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
          fontSize: 12, fontWeight: 700, color: 'rgba(26,18,8,0.45)',
          background: 'none', border: '1px solid rgba(26,18,8,0.12)',
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
            background: saved ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.06)',
            color: '#16a34a',
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
            border: '1px solid rgba(26,18,8,0.12)',
            background: 'transparent', color: 'rgba(26,18,8,0.45)',
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
          }}
        >
          NEW LETTER
        </button>
      </div>

      {/* ── PUSH NOTIFICATION NUDGE — one-time, gentle, dismissable ── */}
      <SortedPushNudge deadline={result.key_deadline} />

      {/* ── ALWAYS-VISIBLE GEO-AWARE TRUSTED HELP LINKS ── */}
      <SortedHelpLinks geo={geo} accentColor="#22c55e" />

      {/* HUMAN + AI LINE */}
      <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.4)', textAlign: 'center', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
        Built by a human who needed this too. Powered by AI — but the care is real.
      </p>

      {/* DISCLAIMER */}
      <p style={{ fontSize: 11, color: 'rgba(26,18,8,0.35)', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
        General guidance only — not legal advice.
      </p>

    </div>
  );
}