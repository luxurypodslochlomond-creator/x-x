/**
 * ContractInstantScan — shows instant contract detection BEFORE the AI runs.
 *
 * Mirrors the LetterInstantScan and ScamInstantScan patterns.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { detectContractPatterns, getContractWarnings } from '@/utils/contractPatternDetector';

const LEVEL_STYLE = {
  danger:  { bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.3)', color: '#ef4444', icon: '!' },
  warning: { bg: 'rgba(234,179,8,0.06)', border: 'rgba(234,179,8,0.3)', color: '#eab308', icon: '?' },
  info:    { bg: 'rgba(124,58,237,0.04)', border: 'rgba(124,58,237,0.2)', color: '#7c3aed', icon: 'i' },
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
        <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.75)', margin: '2px 0 0', lineHeight: 1.4 }}>{value}</p>
      </div>
    </div>
  );
}

export default function ContractInstantScan({ text, accentColor = '#7c3aed' }) {
  const findings = detectContractPatterns(text);
  const warnings = getContractWarnings(findings);

  if (!findings || !findings.hasFindings) return null;

  const hasRisk = findings.riskyClauses.length > 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        style={{
          borderRadius: 12, overflow: 'hidden',
          border: `1px solid ${hasRisk ? 'rgba(239,68,68,0.25)' : 'rgba(124,58,237,0.15)'}`,
          background: hasRisk ? 'rgba(239,68,68,0.02)' : 'rgba(124,58,237,0.02)',
        }}
      >
        <div style={{ padding: '12px 14px 10px', borderBottom: hasRisk ? '1px solid rgba(239,68,68,0.1)' : '1px solid rgba(124,58,237,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: hasRisk ? 'rgba(239,68,68,0.7)' : 'rgba(124,58,237,0.5)' }}>
              INSTANT SCAN
            </span>
            <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(26,18,8,0.35)', letterSpacing: '0.05em' }}>
              spotted before AI
            </span>
          </div>
        </div>

        <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* CONTRACT TYPE */}
          {findings.contractTypes.length > 0 && findings.contractTypes.map((ct, i) => (
            <div key={`ct-${i}`} style={{
              padding: '10px 12px', borderRadius: 8,
              background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.3)',
            }}>
              <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', color: '#7c3aed', margin: '0 0 4px', textTransform: 'uppercase' }}>
                This looks like: {ct.label}
              </p>
              <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.65)', margin: 0, lineHeight: 1.45 }}>
                Full AI analysis coming up — checking every clause for risks.
              </p>
            </div>
          ))}

          {/* RISKY CLAUSES */}
          {findings.riskyClauses.map((clause, i) => (
            <div key={`rc-${i}`} style={{
              padding: '10px 12px', borderRadius: 8,
              background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.3)',
            }}>
              <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', color: '#ef4444', margin: '0 0 4px', textTransform: 'uppercase' }}>
                {clause.label} detected
              </p>
              <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.75)', margin: 0, lineHeight: 1.45 }}>{clause.description}</p>
            </div>
          ))}

          {/* MISSING CLAUSES */}
          {findings.missingClauses.length > 0 && (
            <div style={{
              padding: '10px 12px', borderRadius: 8,
              background: 'rgba(234,179,8,0.06)', border: '1px solid rgba(234,179,8,0.3)',
            }}>
              <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', color: '#eab308', margin: '0 0 4px', textTransform: 'uppercase' }}>
                Not found: {findings.missingClauses.map(m => m.label).join(', ')}
              </p>
              <p style={{ fontSize: 12, color: 'rgba(26,18,8,0.7)', margin: 0, lineHeight: 1.45 }}>
                Missing standard protections can be just as important as the clauses that are there.
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
}