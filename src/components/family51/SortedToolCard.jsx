import React from 'react';
import { motion } from 'framer-motion';

const ICONS = {
  letter: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18"/>
    </svg>
  ),
  reply: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  ),
  scam: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  contract: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  conflict: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
};

export default function SortedToolCard({ variant = 'primary', icon, title, description, accentColor = '#f5a623', onClick, disabled = false }) {
  const isPrimary = variant === 'primary';
  const iconSvg = ICONS[icon] || ICONS.letter;

  if (isPrimary) {
    return (
      <motion.button
        onClick={onClick}
        disabled={disabled}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        style={{
          width: '100%', padding: '16px 14px', borderRadius: 14, cursor: disabled ? 'not-allowed' : 'pointer',
          border: `1.5px solid ${accentColor}30`,
          background: `linear-gradient(135deg, ${accentColor}10, ${accentColor}05)`,
          opacity: disabled ? 0.5 : 1, textAlign: 'left',
          display: 'flex', flexDirection: 'column', gap: 8,
          transition: 'all 0.15s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
        whileHover={disabled ? {} : { y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.07)' }}
      >
        <div style={{ color: accentColor, opacity: 0.9 }}>{iconSvg}</div>
        <div>
          <span style={{ fontSize: 14, fontWeight: 900, color: '#1a1208', display: 'block', marginBottom: 3, letterSpacing: '-0.01em' }}>{title}</span>
          <span style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)', lineHeight: 1.4, display: 'block' }}>{description}</span>
        </div>
      </motion.button>
    );
  }

  // secondary — compact
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      style={{
        width: '100%', padding: '12px 10px', borderRadius: 10, cursor: disabled ? 'not-allowed' : 'pointer',
        border: '1px solid rgba(26,18,8,0.1)', background: '#fff',
        opacity: disabled ? 0.5 : 1, textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
        transition: 'all 0.12s',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
      }}
      whileHover={disabled ? {} : { y: -1, boxShadow: '0 3px 8px rgba(0,0,0,0.06)' }}
    >
      <div style={{ color: 'rgba(26,18,8,0.45)' }}>{iconSvg}</div>
      <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(26,18,8,0.6)', letterSpacing: '0.04em' }}>{title}</span>
      <span style={{ fontSize: 9, color: 'rgba(26,18,8,0.35)', lineHeight: 1.3 }}>{description}</span>
    </motion.button>
  );
}