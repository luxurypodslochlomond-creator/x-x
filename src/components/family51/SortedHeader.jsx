import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSortedUsage } from '@/components/family51/useSortedUsage';
import { SortedGlyph } from './SortedGlyph';

const GOLD = '#c6995c';
const INK = '#1c1c1e';

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
      background: 'rgba(252,250,246,0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(28,28,30,0.05)',
      padding: '14px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    }}>
      <Link
        to="/Sorted"
        style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
      >
        <SortedGlyph height={16} color={INK} />
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.01em', color: INK }}>Sorted</span>
      </Link>

      <div style={{ flex: 1 }} />

      <Link
        to="/Sorted?cases=1"
        style={{
          display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none',
          background: isPaid ? 'rgba(22,163,74,0.06)' : 'rgba(198,153,92,0.06)',
          border: `1px solid ${isPaid ? 'rgba(22,163,74,0.15)' : 'rgba(198,153,92,0.15)'}`,
          borderRadius: 8, padding: '6px 12px',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span style={{
          fontSize: 12, fontWeight: 600,
          color: isPaid ? '#16a34a' : GOLD,
        }}>
          {isPaid ? '∞' : (caseCount > 0 ? `${caseCount} saved` : `${remaining} free`)}
        </span>
      </Link>
    </header>
  );
}