import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  { id: 'letter',   label: 'DECODE',  color: '#f5a623', desc: 'Letter decoded' },
  { id: 'reply',    label: 'REPLY',   color: '#f5a623', desc: 'Write your reply' },
  { id: 'conflict', label: 'DISPUTE', color: '#f5a623', desc: 'Know your rights' },
];

export default function SortedJourneyBar({ completedTools = [], currentTool, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12,
        padding: '12px 16px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 0,
      }}
    >
      {STEPS.map((step, i) => {
        const isDone = completedTools.includes(step.id);
        const isCurrent = currentTool === step.id;
        const isNext = !isDone && !isCurrent && i === STEPS.findIndex(s => !completedTools.includes(s.id) && s.id !== currentTool);

        return (
          <React.Fragment key={step.id}>
            <button
              onClick={() => onNavigate(step.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
                opacity: isDone || isCurrent ? 1 : 0.35,
                transition: 'opacity 0.2s',
              }}
            >
              <div style={{
                width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isDone ? step.color : isCurrent ? `${step.color}25` : 'rgba(255,255,255,0.06)',
                border: `1.5px solid ${isCurrent || isDone ? step.color : 'rgba(255,255,255,0.1)'}`,
                transition: 'all 0.2s',
              }}>
                {isDone ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6l2.5 2.5 4.5-5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: isCurrent ? step.color : 'rgba(255,255,255,0.2)' }} />
                )}
              </div>
              <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.12em', color: isCurrent ? step.color : isDone ? step.color : 'rgba(255,255,255,0.4)' }}>
                {step.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div style={{
                flex: 0, width: 24, height: 1,
                background: completedTools.includes(step.id) ? step.color : 'rgba(255,255,255,0.08)',
                transition: 'background 0.4s',
              }} />
            )}
          </React.Fragment>
        );
      })}
    </motion.div>
  );
}