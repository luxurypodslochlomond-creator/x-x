import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Reply, ShieldAlert, FileCheck, Scale } from 'lucide-react';

const ICONS = {
  letter: FileText,
  reply: Reply,
  scam: ShieldAlert,
  contract: FileCheck,
  conflict: Scale,
};

const ICON_SIZE = { primary: 20, secondary: 18 };

export default function SortedToolCard({ variant = 'primary', icon, title, description, accentColor = '#f5a623', onClick, disabled = false }) {
  const isPrimary = variant === 'primary';
  const Icon = ICONS[icon] || FileText;
  const sz = ICON_SIZE[variant];

  if (isPrimary) {
    return (
      <motion.button
        onClick={onClick}
        disabled={disabled}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        style={{
          width: '100%', padding: '18px 16px', borderRadius: 16, cursor: disabled ? 'not-allowed' : 'pointer',
          border: `2px solid ${accentColor}`,
          background: '#fff',
          opacity: disabled ? 0.5 : 1, textAlign: 'center',
          display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center',
          transition: 'all 0.2s',
          boxShadow: `0 2px 10px ${accentColor}30`,
        }}
        whileHover={disabled ? {} : {
          y: -3,
          boxShadow: `0 6px 20px ${accentColor}40`,
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: `${accentColor}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          alignSelf: 'center',
          color: accentColor,
        }}>
          <Icon size={sz} strokeWidth={2} />
        </div>
        <div>
          <span style={{ fontSize: 15, fontWeight: 800, color: accentColor, display: 'block', marginBottom: 4, letterSpacing: '-0.01em', textAlign: 'center' }}>
            {title}
          </span>
          <span style={{ fontSize: 13, color: 'rgba(28,28,30,0.6)', fontWeight: 500, lineHeight: 1.45, display: 'block', textAlign: 'center' }}>
            {description}
          </span>
        </div>
      </motion.button>
    );
  }

  // secondary — same icon weight, same scale, just tighter
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      style={{
        width: '100%', padding: '16px 12px', borderRadius: 16, cursor: disabled ? 'not-allowed' : 'pointer',
        border: `2px solid ${accentColor}`, background: '#fff',
        opacity: disabled ? 0.5 : 1, textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        transition: 'all 0.15s',
        boxShadow: `0 2px 8px ${accentColor}30`,
      }}
      whileHover={disabled ? {} : {
        y: -2,
        boxShadow: `0 6px 18px ${accentColor}40`,
      }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 10, background: `${accentColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor }}>
        <Icon size={sz} strokeWidth={2} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 800, color: accentColor, letterSpacing: '-0.01em' }}>{title}</span>
      <span style={{ fontSize: 12, color: 'rgba(28,28,30,0.55)', fontWeight: 500, lineHeight: 1.35 }}>{description}</span>
    </motion.button>
  );
}