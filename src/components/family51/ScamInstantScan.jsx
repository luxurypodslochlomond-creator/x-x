/**
 * ScamInstantScan — shows instant pattern detection results BEFORE the AI runs.
 *
 * Runs pure logic on the user's text the moment they paste/type.
 * Shows what we've already spotted: phone numbers, links, urgency language,
 * payment requests, crypto addresses — all things detectable without AI.
 *
 * This makes the tool useful in <1 second, not 10+ seconds.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { detectScamPatterns, getPatternWarnings } from '@/utils/scamPatternDetector';

const WARNING_STYLE = {
  danger:  { bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.3)', color: '#ef4444', icon: '!' },
  warning: { bg: 'rgba(234,179,8,0.06)', border: 'rgba(234,179,8,0.3)', color: '#eab308', icon: '?' },
  info:    { bg: 'rgba(6,182,212,0.04)', border: 'rgba(6,182,212,0.2)', color: '#06b6d4', icon: 'i' },
};

function FindingRow({ label, value, level = 'info' }) {
  const s = WARNING_STYLE[level];
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

export default function ScamInstantScan({ text, accentColor = '#ef4444' }) {
  const findings = detectScamPatterns(text);
  const warnings = getPatternWarnings(findings);

  if (!findings || !findings.hasFindings) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        style={{
          borderRadius: 12, overflow: 'hidden',
          border: `1px solid ${warnings.length > 0 ? 'rgba(239,68,68,0.25)' : 'rgba(26,18,8,0.08)'}`,
          background: warnings.length > 0 ? 'rgba(239,68,68,0.02)' : 'rgba(26,18,8,0.02)',
        }}
      >
        <div style={{ padding: '12px 14px 10px', borderBottom: warnings.length > 0 ? '1px solid rgba(239,68,68,0.1)' : '1px solid rgba(26,18,8,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: warnings.length > 0 ? 'rgba(239,68,68,0.7)' : 'rgba(26,18,8,0.4)' }}>
              INSTANT SCAN
            </span>
            <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(26,18,8,0.35)', letterSpacing: '0.05em' }}>
              spotted before AI
            </span>
          </div>
        </div>

        <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Warnings */}
          {warnings.map((w, i) => {
            const s = WARNING_STYLE[w.level];
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

          {/* Phone numbers */}
          {findings.phones.length > 0 && findings.phones.map((phone, i) => (
            <FindingRow key={`p-${i}`} label="Phone number found" value={phone} level="info" />
          ))}

          {/* Suspicious URLs */}
          {findings.suspiciousUrls.length > 0 && findings.suspiciousUrls.map((url, i) => (
            <FindingRow key={`u-${i}`} label="Link doesn't match official domain" value={url} level="warning" />
          ))}

          {/* Legit URLs (show without warning but still detected) */}
          {findings.urls.filter(u => !findings.suspiciousUrls.includes(u)).map((url, i) => (
            <FindingRow key={`lu-${i}`} label="Link found" value={url} level="info" />
          ))}

          {/* Emails */}
          {findings.emails.length > 0 && findings.emails.map((email, i) => (
            <FindingRow key={`e-${i}`} label="Email address found" value={email} level="info" />
          ))}

          {/* Crypto */}
          {findings.crypto.length > 0 && findings.crypto.map((c, i) => (
            <FindingRow key={`c-${i}`} label={`${c.type} wallet found`} value={c.address.substring(0, 20) + '...'} level="danger" />
          ))}

          {/* Urgency keywords */}
          {findings.urgencyHits.length > 0 && (
            <FindingRow label="Urgency language detected" value={findings.urgencyHits.join(' · ')} level="warning" />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}