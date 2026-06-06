/**
 * SortedNextFiveMinutes
 * Calm, immediate micro-actions — bridges the gap between "I know what's happening"
 * and "I actually do something right now". Emotional scaffolding.
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const IMMEDIATE_ACTIONS = {
  'VERY URGENT': [
    'Take a photo of the letter right now — front and back',
    'Write today\'s date on a piece of paper and put it with the letter',
    'Call Citizens Advice or your local free legal service first thing tomorrow',
  ],
  'URGENT': [
    'Take a photo of the letter and email it to yourself',
    'Write down the deadline somewhere you\'ll see it',
    'Don\'t reply yet — read the full breakdown above first',
  ],
  'NEEDS ATTENTION': [
    'Put the letter somewhere safe — don\'t lose it',
    'Note the sender\'s name and any reference number',
    'Give yourself permission to deal with this tomorrow — you\'re already ahead by being here',
  ],
  'NOT URGENT': [
    'File this letter somewhere you can find it later',
    'You don\'t need to act immediately — but set a reminder for next week',
    'Take a breath. You\'re on top of this.',
  ],
};

export default function SortedNextFiveMinutes({ severity, accentColor = '#f97316' }) {
  const [done, setDone] = useState({});
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const actions = IMMEDIATE_ACTIONS[severity] || IMMEDIATE_ACTIONS['NEEDS ATTENTION'];
  const allDone = actions.every((_, i) => done[i]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      style={{
        padding: '18px 20px', borderRadius: 14,
        background: 'linear-gradient(135deg, rgba(249,115,22,0.06) 0%, rgba(251,191,36,0.04) 100%)',
        border: `1.5px solid ${accentColor}25`,
        position: 'relative',
      }}
    >
      {/* Dismiss */}
      <button
        onClick={() => setDismissed(true)}
        style={{
          position: 'absolute', top: 12, right: 14,
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 16, color: 'rgba(26,18,8,0.25)', lineHeight: 1,
        }}
      >×</button>

      <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.16em', color: accentColor, margin: '0 0 4px' }}>
        ⚡ YOUR NEXT 5 MINUTES
      </p>
      <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.55)', margin: '0 0 14px', lineHeight: 1.5 }}>
        Just these. Nothing else. You've got this.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {actions.map((action, i) => (
          <motion.button
            key={i}
            onClick={() => setDone(d => ({ ...d, [i]: !d[i] }))}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              background: done[i] ? 'rgba(34,197,94,0.08)' : '#fff',
              border: `1px solid ${done[i] ? 'rgba(34,197,94,0.35)' : 'rgba(26,18,8,0.1)'}`,
              borderRadius: 10, padding: '11px 14px', cursor: 'pointer',
              textAlign: 'left', transition: 'all 0.2s',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <span style={{
              width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 1,
              border: `2px solid ${done[i] ? '#22c55e' : 'rgba(26,18,8,0.2)'}`,
              background: done[i] ? '#22c55e' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}>
              {done[i] && <span style={{ color: '#fff', fontSize: 11, lineHeight: 1 }}>✓</span>}
            </span>
            <span style={{
              fontSize: 13, color: done[i] ? 'rgba(26,18,8,0.4)' : 'rgba(26,18,8,0.8)',
              lineHeight: 1.55, textDecoration: done[i] ? 'line-through' : 'none',
              transition: 'all 0.2s',
            }}>
              {action}
            </span>
          </motion.button>
        ))}
      </div>

      {allDone && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 13, fontWeight: 800, color: '#22c55e', textAlign: 'center', margin: '14px 0 0', letterSpacing: '0.04em' }}
        >
          ✓ You did it. Seriously — well done. ❤️
        </motion.p>
      )}
    </motion.div>
  );
}