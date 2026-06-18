import React from 'react';
import { motion } from 'framer-motion';

const ICONS = {
  letter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18"/>
    </svg>
  ),
  reply: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  ),
  scam: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  contract: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  conflict: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
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
          width: '100%', padding: '20px 16px', borderRadius: 16, cursor: disabled ? 'not-allowed' : 'pointer',
          border: 'none',
          background: `linear-gradient(145deg, #fff 0%, ${accentColor}08 100%)`,
          opacity: disabled ? 0.5 : 1, textAlign: 'left',
          display: 'flex', flexDirection: 'column', gap: 10,
          transition: 'all 0.2s',
          boxShadow: `0 2px 8px rgba(0,0,0,0.04), 0 0 0 1.5px ${accentColor}18`,
        }}
        whileHover={disabled ? {} : {
          y: -3,
          boxShadow: `0 6px 20px rgba(0,0,0,0.08), 0 0 0 1.5px ${accentColor}30`,
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: `${accentColor}12`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accentColor,
        }}>
          {iconSvg}
        </div>
        <div>
          <span style={{ fontSize: 15, fontWeight: 900, color: '#1a1208', display: 'block', marginBottom: 4, letterSpacing: '-0.01em' }}>
            {title}
          </span>
          <span style={{ fontSize: 12, color: 'rgba(26,18,8,0.5)', lineHeight: 1.45, display: 'block' }}>
            {description}
          </span>
        </div>
      </motion.button>
    );
  }

  // secondary — clean, minimal
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      style={{
        width: '100%', padding: '14px 10px', borderRadius: 14, cursor: disabled ? 'not-allowed' : 'pointer',
        border: '1.5px solid rgba(26,18,8,0.08)', background: '#fff',
        opacity: disabled ? 0.5 : 1, textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        transition: 'all 0.15s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      }}
      whileHover={disabled ? {} : {
        y: -2,
        boxShadow: '0 4px 14px rgba(0,0,0,0.07)',
        border: '1.5px solid rgba(26,18,8,0.15)',
      }}
    >
      <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(26,18,8,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(26,18,8,0.45)' }}>
        {iconSvg}
      </div>
      <span style={{ fontSize: 12, fontWeight: 800, color: 'rgba(26,18,8,0.6)', letterSpacing: '0.04em' }}>{title}</span>
      <span style={{ fontSize: 10, color: 'rgba(26,18,8,0.35)', lineHeight: 1.3 }}>{description}</span>
    </motion.button>
  );
}