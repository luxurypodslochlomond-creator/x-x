import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSortedUsage } from '@/components/family51/useSortedUsage';

function SortedMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
      <rect x="3" y="11" width="24" height="16" rx="3" stroke="#f97316" strokeWidth="1.8" fill="rgba(249,115,22,0.08)" />
      <path d="M11 11V8a4 4 0 018 0v3" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <rect x="12" y="16.5" width="6" height="5" rx="1.2" stroke="#f97316" strokeWidth="1.4" fill="rgba(249,115,22,0.2)" />
      <circle cx="15" cy="19" r="0.8" fill="#f97316" />
    </svg>
  );
}

export default function SortedLayout({ children, currentPage }) {
  const location = useLocation();
  const { remaining, isPaid } = useSortedUsage();
  const [caseCount, setCaseCount] = useState(0);

  const refreshCaseCount = () => {
    try {
      const cases = JSON.parse(localStorage.getItem('sorted_case_history_v1') || '[]');
      setCaseCount(cases.length);
    } catch {}
  };

  useEffect(() => {
    refreshCaseCount();
    // Also refresh on storage changes (e.g. when a case is saved or deleted)
    window.addEventListener('storage', refreshCaseCount);
    // Poll every 2s so header stays in sync when cases are modified in-page
    const interval = setInterval(refreshCaseCount, 2000);
    return () => {
      window.removeEventListener('storage', refreshCaseCount);
      clearInterval(interval);
    };
  }, [location.pathname]);

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', color: '#1a1208', position: 'relative' }}>


      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(250,248,245,0.98)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(245,166,35,0.3)',
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link
          to="/Sorted"
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}
        >
          <SortedMark />
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.08em', color: '#1a1208' }}>SORTED</div>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.24em', color: '#d97706' }}>WE'VE GOT YOU</div>
          </div>
        </Link>

        <div style={{ flex: 1 }} />

        {/* FREE USES COUNTER — tappable, links to upgrade */}
        <Link
          to="/Sorted?upgrade=1"
          style={{
            display: 'flex', alignItems: 'center', gap: 5, textDecoration: 'none',
            background: isPaid ? 'rgba(5,150,105,0.08)' : 'rgba(245,166,35,0.1)',
            border: `1.5px solid ${isPaid ? 'rgba(5,150,105,0.3)' : 'rgba(245,166,35,0.3)'}`,
            borderRadius: 8, padding: '5px 10px', marginRight: 8,
            WebkitTapHighlightColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          {isPaid ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#059669" strokeWidth="1.2" />
              <path d="M3.5 6l1.8 1.8 3.2-3.2" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#f5a623" strokeWidth="1.2" />
              <path d="M6 3.5v3l1.5 1.5" stroke="#f5a623" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span style={{ fontSize: 11, fontWeight: 800, color: isPaid ? '#059669' : '#f5a623', fontFamily: 'monospace', letterSpacing: '0.04em' }}>
            {isPaid ? '∞ SORTED' : `${remaining} FREE`}
          </span>
        </Link>

        {/* CASES BRIEFCASE — taps to /Sorted?cases=1 */}
        <Link
          to="/Sorted?cases=1"
          onClick={() => { if ('vibrate' in navigator) navigator.vibrate(8); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer',
            background: caseCount > 0 ? 'rgba(245,166,35,0.08)' : 'rgba(245,166,35,0.02)',
            border: `1.5px solid ${caseCount > 0 ? 'rgba(245,166,35,0.3)' : 'rgba(245,166,35,0.08)'}`,
            borderRadius: 8, padding: '5px 10px', marginRight: 8,
            opacity: caseCount > 0 ? 1 : 0.4,
            transition: 'all 0.2s',
            WebkitTapHighlightColor: 'transparent',
            textDecoration: 'none',
          }}
          title={caseCount > 0 ? `${caseCount} saved case${caseCount > 1 ? 's' : ''}` : 'No cases yet'}
        >
          <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
            <rect x="2" y="4" width="11" height="9" rx="1.2" stroke="#f5a623" strokeWidth="1.2" fill="none" />
            <path d="M5 4V3a2.5 2.5 0 015 0v1" stroke="#f5a623" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <path d="M4.5 8h6M4.5 10.5h4" stroke="#f5a623" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
          </svg>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#f5a623', fontFamily: 'monospace', letterSpacing: '0.04em' }}>{caseCount}</span>
        </Link>

      </header>

      {/* Content */}
      <main style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
        {children}
      </main>

      {/* Footer */}
      <div style={{
        padding: '14px 20px',
        borderTop: '1px solid rgba(245,166,35,0.2)',
        display: 'flex', justifyContent: 'center',
        fontFamily: 'monospace', fontSize: 9,
        color: 'rgba(26,18,8,0.35)', letterSpacing: '0.14em',
      }}>
        ZERO LOSS — ZERO BULLSHIT
      </div>
    </div>
  );
}