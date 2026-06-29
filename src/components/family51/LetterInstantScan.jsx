/**
 * LetterInstantScan — shows instant letter detection BEFORE the AI runs.
 *
 * Runs pure logic on the user's text the moment they paste/type.
 * Shows what we've already spotted: letter type, deadline, amount,
 * urgency level — all things detectable without AI.
 *
 * This makes the tool useful in <1 second, not 10+ seconds.
 * Mirrors the ScamInstantScan pattern — calm, factual, reassuring.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { detectLetterPatterns, getLetterWarnings } from '@/utils/letterPatternDetector';

const LEVEL_STYLE = {
  danger:  { bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.3)', color: '#ef4444', icon: '!' },
  warning: { bg: 'rgba(217,119,6,0.06)', border: 'rgba(217,119,6,0.3)', color: '#d97706', icon: '?' },
  info:    { bg: 'rgba(6,182,212,0.04)', border: 'rgba(6,182,212,0.2)', color: '#06b6d4', icon: 'i' },
};

function FindingRow({ label, value, level = 'info' }) {
  const s = LEVEL_STYLE[level];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
      <div style={{
        width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
        background: s.bg, border: `1px solid ${s.border}`, color: s.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 900, marginTop: 1,
      }}>{s.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', color: 'rgba(26,18,8,0.4)', textTransform: 'uppercase' }}>{label}</span>
        <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.75)', margin: '2px 0 0', lineHeight: 1.4, wordBreak: 'break-all' }}>{value}</p>
      </div>
    </div>
  );
}

export default function LetterInstantScan({ text, accentColor = '#f97316' }) {
  const findings = detectLetterPatterns(text);
  const warnings = getLetterWarnings(findings);

  if (!findings || !findings.hasFindings) return null;

  const hasUrgency = findings.urgencyLevel === 'urgent';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        style={{
          borderRadius: 12, overflow: 'hidden',
          border: `1px solid ${hasUrgency ? 'rgba(239,68,68,0.25)' : 'rgba(26,18,8,0.08)'}`,
          background: hasUrgency ? 'rgba(239,68,68,0.02)' : 'rgba(26,18,8,0.02)',
        }}
      >
        <div style={{ padding: '12px 14px 10px', borderBottom: hasUrgency ? '1px solid rgba(239,68,68,0.1)' : '1px solid rgba(26,18,8,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: hasUrgency ? 'rgba(239,68,68,0.7)' : 'rgba(26,18,8,0.4)' }}>
              INSTANT SCAN
            </span>
            <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(26,18,8,0.35)', letterSpacing: '0.05em' }}>
              spotted before AI
            </span>
          </div>
        </div>

        <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* LETTER TYPE — the most useful info: "this looks like a debt collection letter" */}
          {findings.letterTypes && findings.letterTypes.length > 0 && findings.letterTypes.map((lt, i) => (
            <div key={`lt-${i}`} style={{
              padding: '10px 12px', borderRadius: 8,
              background: hasUrgency ? 'rgba(239,68,68,0.06)' : 'rgba(217,119,6,0.06)',
              border: `1px solid ${hasUrgency ? 'rgba(239,68,68,0.3)' : 'rgba(217,119,6,0.3)'}`,
            }}>
              <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', color: hasUrgency ? '#ef4444' : '#d97706', margin: '0 0 4px', textTransform: 'uppercase' }}>
                This looks like: {lt.label}
              </p>
              <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.75)', margin: 0, lineHeight: 1.45 }}>{lt.calmNote}</p>
            </div>
          ))}

          {/* CALM REASSURANCE — for urgent letters, reduce panic immediately */}
          {hasUrgency && findings.letterTypes.length === 0 && (
            <div style={{
              padding: '10px 12px', borderRadius: 8,
              background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.25)',
            }}>
              <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', color: '#06b6d4', margin: '0 0 4px', textTransform: 'uppercase' }}>
                Take a breath
              </p>
              <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.7)', margin: 0, lineHeight: 1.45 }}>
                This letter uses urgent language, but that doesn't mean you're out of time. You have options — the full breakdown is coming.
              </p>
            </div>
          )}

          {/* Warnings */}
          {warnings.map((w, i) => {
            const s = LEVEL_STYLE[w.level];
            return (
              <div key={`w-${i}`} style={{
                padding: '8px 10px', borderRadius: 8,
                background: s.bg, border: `1px solid ${s.border}`,
                display: 'flex', alignItems: 'flex-start', gap: 8,
              }}>
                <span style={{ fontSize: 11, fontWeight: 900, color: s.color, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
                <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.75)', margin: 0, lineHeight: 1.4 }}>{w.text}</p>
              </div>
            );
          })}

          {/* Deadlines */}
          {findings.deadlines.length > 0 && (
            <FindingRow label="Deadline detected" value={findings.deadlines.join(' · ')} level={hasUrgency ? 'danger' : 'warning'} />
          )}

          {/* Amounts */}
          {findings.amounts.length > 0 && (
            <FindingRow label="Amount mentioned" value={findings.amounts.join(' · ')} level="info" />
          )}

          {/* Urgency keywords */}
          {findings.urgencyHits.length > 0 && (
            <FindingRow label="Urgency language" value={findings.urgencyHits.slice(0, 6).join(' · ')} level={hasUrgency ? 'danger' : 'warning'} />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}