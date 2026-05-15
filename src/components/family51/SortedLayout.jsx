import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Eye, Scale, Mail, Trash2 } from 'lucide-react';
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

const menuItems = [
  { label: 'SORTED — Home',     path: '/Sorted', icon: <Mail className="w-3.5 h-3.5" /> },
  { label: 'FAQ & How It Works',path: '/SortedFAQ', icon: <Mail className="w-3.5 h-3.5" /> },
  { label: 'Terms',             path: '/SortedTerms',   icon: <Scale className="w-3.5 h-3.5" /> },
  { label: 'Privacy',           path: '/SortedPrivacy', icon: <Eye   className="w-3.5 h-3.5" /> },
  { label: 'Contact',           path: 'mailto:family@uf51.love', icon: <Mail className="w-3.5 h-3.5" />, isEmail: true },
];

export default function SortedLayout({ children, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { remaining, isLocked, isPaid } = useSortedUsage();
  const [caseCount, setCaseCount] = useState(0);

  useEffect(() => {
    try {
      const cases = JSON.parse(localStorage.getItem('sorted_case_history_v1') || '[]');
      setCaseCount(cases.length);
    } catch {}
  }, [location.pathname]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', color: '#1a1208', position: 'relative' }}>
      <style>{`
        .sorted-menu-enter {
          animation: menuSlideIn 0.12s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes menuSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .menu-item {
          transition: padding-left 0.12s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .menu-item:hover {
          padding-left: 6px !important;
        }
      `}</style>

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
          onClick={() => handleNavClick('/Sorted')}
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}
        >
          <SortedMark />
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.08em', color: '#1a1208' }}>SORTED</div>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.24em', color: '#d97706' }}>WE'VE GOT YOU</div>
          </div>
        </Link>

        <div style={{ flex: 1 }} />

        {/* FREE USES COUNTER — show remaining if not paid, show ∞ if paid */}
        {!isLocked && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: isPaid ? 'rgba(5,150,105,0.08)' : 'rgba(245,166,35,0.1)',
            border: `1.5px solid ${isPaid ? 'rgba(5,150,105,0.3)' : 'rgba(245,166,35,0.3)'}`,
            borderRadius: 8, padding: '5px 10px', marginRight: 8,
          }}>
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
            <span style={{ fontSize: 11, fontWeight: 800, color: isPaid ? '#059669' : '#f5a623', fontFamily: 'monospace' }}>
              {isPaid ? '∞ SORTED' : `${remaining} left`}
            </span>
          </div>
        )}

        {/* CASES BRIEFCASE — always show with count if cases exist */}
        {caseCount > 0 && (
          <div
            onClick={() => {
              setMenuOpen(false);
              window.location.hash = '#case-history';
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer',
              background: 'rgba(245,166,35,0.06)', border: '1.5px solid rgba(245,166,35,0.2)',
              borderRadius: 8, padding: '5px 10px', marginRight: 8,
            }}
            title={`${caseCount} saved case${caseCount > 1 ? 's' : ''}`}
          >
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
              <rect x="2" y="4" width="11" height="9" rx="1.2" stroke="#f5a623" strokeWidth="1.2" fill="none" />
              <path d="M5 4V3a2.5 2.5 0 015 0v1" stroke="#f5a623" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M4.5 8h6M4.5 10.5h4" stroke="#f5a623" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
            </svg>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#f5a623', fontFamily: 'monospace' }}>{caseCount}</span>
          </div>
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: menuOpen ? 'rgba(245,166,35,0.12)' : 'rgba(245,166,35,0.04)',
            border: `1.5px solid ${menuOpen ? 'rgba(245,166,35,0.6)' : 'rgba(245,166,35,0.25)'}`,
            borderRadius: 10, cursor: 'pointer', padding: '7px 10px',
            color: '#f5a623', display: 'flex', alignItems: 'center', gap: 7,
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {menuOpen ? <X className="w-4 h-4" /> : (
            <>
              <Menu className="w-4 h-4" />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', fontFamily: 'monospace' }}>MENU</span>
            </>
          )}
        </button>
      </header>

      {/* Menu Overlay */}
      {menuOpen && (
        <div className="sorted-menu-enter" style={{
          position: 'fixed', top: 54, left: 0, right: 0, zIndex: 49,
          background: 'rgba(250,248,245,0.99)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1.5px solid rgba(245,166,35,0.2)',
          padding: '0 20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
        }}>
          <div style={{
            padding: '10px 0 8px',
            borderBottom: '1px solid rgba(245,166,35,0.15)',
            fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.2em',
            color: 'rgba(26,18,8,0.4)',
          }}>
            NAVIGATION
          </div>

          <div style={{ maxWidth: 520, margin: '0 auto' }}>
            {menuItems.map((item, idx) => (
              item.isEmail ? (
                <a
                  key={idx}
                  href={item.path}
                  onClick={() => handleNavClick()}
                  className="menu-item"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(245,166,35,0.15)',
                    textDecoration: 'none', color: '#1a1208',
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(26,18,8,0.4)', minWidth: 24 }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {item.icon && <span style={{ color: 'rgba(26,18,8,0.4)' }}>{item.icon}</span>}
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1a1208', letterSpacing: '0.03em' }}>{item.label}</span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 9, color: 'rgba(245,166,35,0.25)' }}>→</span>
                </a>
              ) : (
                <Link
                  key={idx}
                  to={item.path}
                  onClick={handleNavClick}
                  className="menu-item"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(245,166,35,0.15)',
                    textDecoration: 'none', color: '#1a1208',
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(245,166,35,0.4)', minWidth: 24 }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {item.icon && <span style={{ color: 'rgba(245,166,35,0.4)' }}>{item.icon}</span>}
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1a1208', letterSpacing: '0.03em' }}>{item.label}</span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 9, color: 'rgba(245,166,35,0.25)' }}>→</span>
                </Link>
              )
            ))}

            <button
              onClick={() => {
                try { localStorage.clear(); } catch {}
                setMenuOpen(false);
                window.location.reload();
              }}
              className="menu-item"
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 0 14px',
                fontSize: 13, fontWeight: 700,
                color: 'rgba(26,18,8,0.35)',
                background: 'none', border: 'none', cursor: 'pointer',
                width: '100%', textAlign: 'left', letterSpacing: '0.03em',
              }}
            >
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(26,18,8,0.2)', minWidth: 24 }}>
                {String(menuItems.length + 1).padStart(2, '0')}
              </span>
              <Trash2 className="w-3.5 h-3.5" />
              Clear all my data
            </button>
          </div>
        </div>
      )}

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