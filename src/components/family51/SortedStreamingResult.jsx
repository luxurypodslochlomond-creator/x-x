import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SortedHelpLinks from './SortedHelpLinks';
import SortedPushNudge from './SortedPushNudge';

const SEVERITY_CONFIG = {
  'NOT URGENT':      { color: '#22c55e', bg: 'rgba(34,197,94,0.06)',   border: 'rgba(34,197,94,0.2)' },
  'NEEDS ATTENTION': { color: '#d97706', bg: 'rgba(217,119,6,0.06)',   border: 'rgba(217,119,6,0.2)' },
  'URGENT':          { color: '#ea580c', bg: 'rgba(234,88,12,0.06)',   border: 'rgba(234,88,12,0.2)' },
  'VERY URGENT':     { color: '#dc2626', bg: 'rgba(220,38,38,0.06)',   border: 'rgba(220,38,38,0.2)' },
};

export default function SortedStreamingResult({ result, accentColor = '#f97316', onHandoff, onReset, caseId, geo }) {
  const [showMore, setShowMore] = useState(false);
  const [saved, setSaved] = useState(false);
  const sev = result?.severity ? (SEVERITY_CONFIG[result.severity] || SEVERITY_CONFIG['NEEDS ATTENTION']) : null;

  const buildText = () =>
    `SORTED — Letter Breakdown\n\n` +
    `${result.letter_summary}\n` +
    `Severity: ${result.severity}\n\n` +
    (result.one_sentence ? `${result.one_sentence}\n\n` : '') +
    `WHAT TO DO:\n${result.three_steps?.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n` +
    (result.free_help?.length > 0 ? `FREE HELP:\n${result.free_help.join('\n')}\n\n` : '') +
    `Via SORTED — uf51.love/Sorted`;

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

      {/* ── THE VERDICT ── Clean, calm, no emojis */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          borderRadius: 14, padding: '18px 18px',
          background: sev.bg, border: `1px solid ${sev.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: sev.color, flexShrink: 0 }} />
          <span style={{ fontSize: 10, fontWeight: 800, color: sev.color, letterSpacing: '0.12em' }}>{result.severity}</span>
        </div>

        <p style={{ fontSize: 18, fontWeight: 800, color: '#1a1208', margin: '0 0 8px', lineHeight: 1.2 }}>
          {result.letter_summary}
        </p>

        {result.one_sentence && (
          <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.75)', margin: 0, lineHeight: 1.5 }}>
            {result.one_sentence}
          </p>
        )}

        {(hasDeadline || hasMoney) && (
          <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
            {hasDeadline && (
              <div style={{ padding: '5px 10px', borderRadius: 6, background: `${sev.color}10`, border: `1px solid ${sev.color}25` }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: sev.color }}>Respond by {result.key_deadline}</span>
              </div>
            )}
            {hasMoney && (
              <div style={{ padding: '5px 10px', borderRadius: 6, background: 'rgba(26,18,8,0.04)', border: '1px solid rgba(26,18,8,0.1)' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(26,18,8,0.7)' }}>£{result.financial_impact}</span>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* ── WHAT TO DO ── Just 3 steps, numbered circles */}
      {result.three_steps?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          style={{ padding: '18px 18px', borderRadius: 14, background: '#fff', border: '1px solid rgba(26,18,8,0.08)' }}
        >
          <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(26,18,8,0.35)', margin: '0 0 12px' }}>WHAT TO DO</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {result.three_steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  minWidth: 22, height: 22, borderRadius: '50%', background: accentColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: '#fff', flexShrink: 0, marginTop: 1,
                }}>{i + 1}</div>
                <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.8)', lineHeight: 1.6, margin: 0 }}>{step}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Timeline removed - too much clutter */}

      {/* ── FREE HELP — clean, no duplication */}
      {result.free_help?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{ padding: '14px 16px', borderRadius: 12, background: '#fff', border: '1px solid rgba(34,197,94,0.25)' }}
        >
          <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(34,197,94,0.85)', margin: '0 0 10px' }}>FREE EXPERT HELP</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {result.free_help.slice(0, 2).map((help, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(34,197,94,0.6)', flexShrink: 0, marginTop: 5 }} />
                <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.75)', margin: 0, lineHeight: 1.5 }}>{help}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── CTA: WRITE REPLY ── */}
      {onHandoff && (
        <motion.button
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onHandoff({ summary: result.letter_summary, sender: result.sender, deadline: result.key_deadline, one_sentence: result.one_sentence, suggested_tone: result.suggested_tone, related_case_id: caseId, three_steps: result.three_steps, severity: result.severity, financial_impact: result.financial_impact }); }}
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





      {/* ── BOTTOM ACTIONS ── Clean, consistent */}
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <CopyBreakdownButton result={result} sev={sev} />
        <button
          onClick={handleSave}
          style={{
            flex: 1, padding: '12px 0', borderRadius: 10, fontSize: 11, fontWeight: 800,
            letterSpacing: '0.06em', cursor: 'pointer',
            border: '1px solid rgba(34,197,94,0.35)',
            background: saved ? 'rgba(34,197,94,0.1)' : 'rgba(34,197,94,0.05)',
            color: saved ? '#22c55e' : '#16a34a',
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
          }}
        >
          {saved ? 'SAVED' : 'SHARE'}
        </button>
        <button
          onClick={onReset}
          style={{
            flex: 1, padding: '12px 0', borderRadius: 10, fontSize: 11, fontWeight: 800,
            letterSpacing: '0.06em', cursor: 'pointer',
            border: '1px solid rgba(26,18,8,0.15)',
            background: 'rgba(26,18,8,0.03)',
            color: 'rgba(26,18,8,0.5)',
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
          }}
        >
          NEW
        </button>
      </div>

      {/* DISCLAIMER */}
      <p style={{ fontSize: 10, color: 'rgba(26,18,8,0.35)', textAlign: 'center', lineHeight: 1.5, margin: '8px 0 0' }}>
        Guidance only — not legal advice.
      </p>

    </div>
  );
}

// ─── COPY BREAKDOWN BUTTON ──────────────────────────────────────────────────────
// One-tap copy of the full breakdown — paste into email, text, or notes
// ──────────────────────────────────────────────────────────────────────────────

function CopyBreakdownButton({ result, sev }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = 
      `SORTED LETTER BREAKDOWN\n\n` +
      `${result.letter_summary}\n` +
      `Severity: ${result.severity}\n\n` +
      (result.one_sentence ? `${result.one_sentence}\n\n` : '') +
      `WHAT TO DO:\n${result.three_steps?.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n` +
      (result.free_help?.length > 0 ? `FREE HELP:\n${result.free_help.join('\n')}\n\n` : '') +
      `Via SORTED — uf51.love/Sorted`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.96 }}
      style={{
        flex: 1, padding: '13px 0', borderRadius: 10, fontSize: 11, fontWeight: 800,
        letterSpacing: '0.08em', cursor: 'pointer',
        border: copied ? '1px solid rgba(34,197,94,0.6)' : `1px solid ${sev.color}60`,
        background: copied ? 'rgba(34,197,94,0.08)' : sev.bg,
        color: copied ? '#22c55e' : sev.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
        WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
        transition: 'all 0.2s',
      }}
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7L5.5 9.5L11 3.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          COPIED
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="3" y="3" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M2 10V4a1 1 0 0 1 1-1h1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          COPY BREAKDOWN
        </>
      )}
    </motion.button>
  );
}