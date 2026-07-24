import React from 'react';
import { motion } from 'framer-motion';
import { COLOR, FONT } from '@/components/family51/sortedDesignSystem';

const { gold: GOLD, ink: INK } = COLOR;

/**
 * SOSBeacon — original mark: concentric signal rings + solid core.
 * A distress signal radiating out. Reads as a confident app icon at 28px.
 */
export function SOSBeacon({ size = 28, animate = true }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* Outer ring — slow pulse only if animate */}
      <motion.circle
        cx="16" cy="16" r="13"
        stroke={GOLD}
        strokeWidth="1.5"
        opacity={0.35}
        animate={animate ? { opacity: [0.1, 0.35, 0.1], scale: [0.92, 1, 0.92] } : {}}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'center' }}
      />
      {/* Middle ring */}
      <circle cx="16" cy="16" r="8.5" stroke={GOLD} strokeWidth="1.6" opacity={0.55} />
      {/* Core — solid */}
      <circle cx="16" cy="16" r="4.6" fill={GOLD} />
      {/* Tiny SOS dot notch — the "received" tick */}
      <circle cx="24.5" cy="9.5" r="2" fill={INK} />
    </motion.svg>
  );
}

/**
 * SortedBrandBar — compact, centred, native-app header.
 * [beacon] SORTED · sos
 * Kills the dead top space; reads as an app identity, not a web tagline.
 */
export default function SortedBrandBar() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      paddingTop: 14,
      paddingBottom: 4,
      userSelect: 'none',
    }}>
      <SOSBeacon size={28} />
      <span style={{
        fontFamily: FONT.family,
        fontWeight: 800,
        fontSize: 17,
        letterSpacing: '0.04em',
        color: INK,
        lineHeight: 1,
      }}>
        SORTED
        <span style={{ color: GOLD, fontWeight: 800, letterSpacing: '0.02em' }}>·sos</span>
      </span>
    </div>
  );
}