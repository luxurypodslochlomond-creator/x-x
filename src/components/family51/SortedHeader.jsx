import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSortedUsage } from '@/components/family51/useSortedUsage';
import { SortedMark } from './SortedIcons';

const GOLD = '#d4a574';
const INK = '#1a1a1a';
const MUTED = 'rgba(26,18,8,0.4)';

export default function SortedHeader() {
  const { remaining, isPaid } = useSortedUsage();
  const [caseCount, setCaseCount] = useState(() => {
    try {
      const cases = JSON.parse(localStorage.getItem('sorted_case_history_v1') || '[]');
      return cases.length;
    } catch { return 0; }
  });

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(248,246,243,0.92)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(26,18,8,0.06)',
      padding: '16px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <Link
        to="/Sorted"
        style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
      >
        <SortedMark size={30} color={GOLD} />
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontSize: 17, fontWeight: 900, letterSpacing: '0.06em', color: INK, fontFamily: "'Fraunces', Georgia, serif" }}>SORTED</div>
          <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.22em', color: GOLD, opacity: 0.8 }}>WE'VE GOT YOU</div>
        </div>
      </Link>

      <div style={{ flex: 1 }} />

      {/* ONE badge — clean, single piece of info */}
      <Link
        to="/Sorted?cases=1"
        style={{
          display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none',
          background: isPaid ? 'rgba(5,150,105,0.06)' : 'rgba(212,165,116,0.06)',
          border: `1px solid ${isPaid ? 'rgba(5,150,105,0.2)' : 'rgba(212,165,116,0.2)'}`,
          borderRadius: 10, padding: '7px 14px',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span style={{
          fontSize: 11, fontWeight: 800, fontFamily: 'monospace', letterSpacing: '0.04em',
          color: isPaid ? '#059669' : GOLD,
        }}>
          {isPaid ? '∞ SORTED' : (caseCount > 0 ? `${caseCount} saved` : `${remaining} free`)}
        </span>
      </Link>
    </header>
  );
}