import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Share2, RotateCcw, Mail } from 'lucide-react';
import { CaseActionBar } from './SortedCaseExport';
import SortedFeedback from './SortedFeedback';

// ── DESIGN TOKENS ── One set of values for ALL tools. Native consistency.
const T = {
  cardRadius: 14,
  cardPad: 18,
  gap: 12,
  labelSize: 9,
  labelWeight: 800,
  labelSpacing: '0.12em',
  bodySize: 13,
  bodyLineHeight: 1.6,
  bodyColor: 'rgba(26,18,8,0.75)',
  muted: 'rgba(26,18,8,0.35)',
  ink: '#1a1208',
};

// ── VERDICT HEADER ── Top of every result. Severity dot + label + summary + detail + badges.
function VerdictHeader({ verdict }) {
  if (!verdict) return null;
  const { label, color, summary, detail, badges } = verdict;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        borderRadius: T.cardRadius, padding: T.cardPad,
        background: `${color}0D`, border: `1px solid ${color}33`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: summary ? 10 : 0 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: T.labelWeight, color, letterSpacing: T.labelSpacing }}>{label}</span>
      </div>
      {summary && (
        <p style={{ fontSize: 18, fontWeight: 800, color: T.ink, margin: '0 0 8px', lineHeight: 1.2 }}>{summary}</p>
      )}
      {detail && (
        <p style={{ fontSize: T.bodySize, color: 'rgba(26,18,8,0.75)', margin: 0, lineHeight: T.bodyLineHeight }}>{detail}</p>
      )}
      {badges?.length > 0 && (
        <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
          {badges.map((b, i) => (
            <div key={i} style={{ padding: '5px 10px', borderRadius: 6, background: `${b.color || color}1A`, border: `1px solid ${b.color || color}40` }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: b.color || color }}>{b.text}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── SECTION ── One consistent card for all content blocks. Every tool uses this.
export function SortedResultSection({ label, color = T.ink, delay = 0.1, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      style={{
        padding: T.cardPad, borderRadius: T.cardRadius,
        background: '#fff', border: `1px solid ${color}25`,
      }}
    >
      {label && (
        <p style={{ fontSize: T.labelSize, fontWeight: T.labelWeight, letterSpacing: T.labelSpacing, color: `${color}DD`, margin: '0 0 10px' }}>{label}</p>
      )}
      {children}
    </motion.div>
  );
}

// ── NUMBERED STEPS ── Shared step list. Same circles, same spacing, every tool.
export function SortedSteps({ steps, color, startDelay = 0.1 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{
            minWidth: 22, height: 22, borderRadius: '50%', background: color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 800, color: '#fff', flexShrink: 0, marginTop: 1,
          }}>{i + 1}</div>
          <p style={{ fontSize: T.bodySize, color: 'rgba(26,18,8,0.8)', lineHeight: T.bodyLineHeight, margin: 0 }}>{step}</p>
        </div>
      ))}
    </div>
  );
}

// ── BULLET LIST ── Shared bullet list for "what not to do", "red flags", etc.
export function SortedBullets({ items, color, symbol = '•' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ color, fontSize: 12, fontWeight: 800, flexShrink: 0, marginTop: 2 }}>{symbol}</span>
          <p style={{ fontSize: T.bodySize, color: 'rgba(26,18,8,0.75)', lineHeight: T.bodyLineHeight, margin: 0 }}>{item}</p>
        </div>
      ))}
    </div>
  );
}

// ── THE SHELL ── Wraps every tool's result. Verdict → sections → CTA → action bar → feedback → disclaimer.
export default function SortedResultShell({
  verdict,            // { label, color, summary, detail, badges? } | null
  accentColor = '#f97316',
  tool,
  caseId,
  children,           // tool-specific SortedResultSection components
  onHandoff,          // optional CTA callback
  handoffLabel,       // optional CTA text
  onCopy,
  onShare,
  onReset,
  onEmail,            // optional — Reply tool uses this
  flash,
}) {
  const actions = onEmail
    ? [
        { icon: Copy, label: 'COPY', accent: accentColor, onClick: onCopy },
        { icon: Mail, label: 'EMAIL', accent: '#0891b2', onClick: onEmail },
        { icon: Share2, label: 'SHARE', accent: '#16a34a', onClick: onShare },
        { icon: RotateCcw, label: 'NEW', accent: 'rgba(26,18,8,0.5)', onClick: onReset },
      ]
    : [
        { icon: Copy, label: 'COPY', accent: accentColor, onClick: onCopy },
        { icon: Share2, label: 'SHARE', accent: '#16a34a', onClick: onShare },
        { icon: RotateCcw, label: 'NEW', accent: 'rgba(26,18,8,0.5)', onClick: onReset },
      ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: T.gap }}>
      <VerdictHeader verdict={verdict} />
      {children}

      {onHandoff && handoffLabel && (
        <motion.button
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onHandoff(); }}
          whileTap={{ opacity: 0.7 }}
          style={{
            width: '100%', padding: '18px 0', borderRadius: T.cardRadius, fontSize: 14,
            fontWeight: 900, letterSpacing: '0.08em', cursor: 'pointer',
            border: `2px solid ${accentColor}`,
            background: accentColor, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation',
          }}
        >
          {handoffLabel}
        </motion.button>
      )}

      <CaseActionBar actions={actions} />

      {flash && (
        <motion.p
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(26,18,8,0.45)', textAlign: 'center', margin: 0 }}
        >
          {flash}
        </motion.p>
      )}

      <SortedFeedback tool={tool} caseId={caseId} accentColor={accentColor} />
      <p style={{ fontSize: 10, color: T.muted, textAlign: 'center', lineHeight: 1.5, margin: '8px 0 0' }}>
        Guidance only — not legal advice.
      </p>
    </div>
  );
}