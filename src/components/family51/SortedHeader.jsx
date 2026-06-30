import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSortedUsage } from '@/components/family51/useSortedUsage';

function SortedMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
      <rect x="3" y="11" width="24" height="16" rx="3" stroke="#d97706" strokeWidth="1.8" fill="rgba(217,119,6,0.08)" />
      <path d="M11 11V8a4 4 0 018 0v3" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <rect x="12" y="16.5" width="6" height="5" rx="1.2" stroke="#d97706" strokeWidth="1.4" fill="rgba(217,119,6,0.2)" />
      <circle cx="15" cy="19" r="0.8" fill="#d97706" />
    </svg>
  );
}

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
      background: 'rgba(250,248,245,0.98)',
      backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(217,119,6,0.3)',
      padding: '14px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <Link
        to="/Sorted"
        style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
      >
        <SortedMark />
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.08em', color: '#1a1208' }}>SORTED</div>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.24em', color: '#d97706', opacity: 0.7 }}>WE'VE GOT YOU</div>
        </div>
      </Link>

      <div style={{ flex: 1 }} />

      {/* FREE USES COUNTER — shows your case tally, not the paywall */}
      <Link
        to="/Sorted?cases=1"
        title="Tap to see your free-case tally"
        style={{
          display: 'flex', alignItems: 'center', gap: 5, textDecoration: 'none',
          background: isPaid ? 'rgba(5,150,105,0.08)' : 'rgba(217,119,6,0.1)',
          border: `1.5px solid ${isPaid ? 'rgba(5,150,105,0.3)' : 'rgba(217,119,6,0.3)'}`,
          borderRadius: 8, padding: '6px 12px', marginRight: 10,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {isPaid ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#059669" strokeWidth="1.2" />
            <path d="M3.5 6l1.8 1.8 3.2-3.2" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#d97706" strokeWidth="1.2" />
            <path d="M6 3.5v3l1.5 1.5" stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <span style={{ fontSize: 11, fontWeight: 800, color: isPaid ? '#059669' : '#d97706', fontFamily: 'monospace', letterSpacing: '0.04em' }}>
          {isPaid ? '∞ SORTED' : `${remaining} FREE`}
        </span>
      </Link>

      {/* CASES BRIEFCASE */}
      <Link
        to="/Sorted?cases=1"
        onClick={() => { if ('vibrate' in navigator) navigator.vibrate(8); }}
        style={{
          display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer',
          background: caseCount > 0 ? 'rgba(217,119,6,0.08)' : 'rgba(217,119,6,0.02)',
          border: `1.5px solid ${caseCount > 0 ? 'rgba(217,119,6,0.3)' : 'rgba(217,119,6,0.08)'}`,
          borderRadius: 8, padding: '6px 12px', marginRight: 0,
          opacity: caseCount > 0 ? 1 : 0.4,
          transition: 'all 0.2s',
          WebkitTapHighlightColor: 'transparent',
          textDecoration: 'none',
        }}
        title={caseCount > 0 ? `Vault: ${caseCount} case${caseCount > 1 ? 's' : ''} secured — tap to open` : 'Your vault is empty — decode a letter to start'}
      >
        <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
          <rect x="2" y="3" width="11" height="10" rx="1.5" stroke="#d97706" strokeWidth="1.2" fill="none" />
          <rect x="5" y="5.5" width="5" height="5" rx="0.8" stroke="#d97706" strokeWidth="1.1" fill="none" />
          <circle cx="7.5" cy="8" r="1.3" stroke="#d97706" strokeWidth="1" fill="none" />
          <path d="M7.5 9.3v1.2" stroke="#d97706" strokeWidth="0.9" strokeLinecap="round" />
          <circle cx="4" cy="6" r="0.5" fill="#d97706" opacity="0.5" />
          <circle cx="4" cy="10" r="0.5" fill="#d97706" opacity="0.5" />
        </svg>
        <span style={{ fontSize: 11, fontWeight: 800, color: '#d97706', fontFamily: 'monospace', letterSpacing: '0.04em' }}>{caseCount}</span>
      </Link>
    </header>
  );
}