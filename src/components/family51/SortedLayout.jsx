import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Eye, Scale, Mail, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Shannon transmission animation — zero loss signal through noise
function ShannonTransmission({ active }) {
  if (!active) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: '#080a0f',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 20,
      }}
    >
      {/* Shannon noise → signal bars */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 40 }}>
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            style={{ width: 4, borderRadius: 2, background: '#f97316' }}
            animate={{ height: [4, Math.random() * 36 + 4, 36, 4] }}
            transition={{ duration: 0.6, delay: i * 0.03, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.25em', color: 'rgba(249,115,22,0.6)' }}>
        TRANSMITTING — ZERO LOSS
      </div>
    </motion.div>
  );
}

// Shannon-coded bit stream — decorative header element
function BitStream() {
  const bits = '01001000 01010101 01000111 01001000 01000101 01010011';
  return (
    <div style={{
      fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.1em',
      color: 'rgba(249,115,22,0.18)', overflow: 'hidden', whiteSpace: 'nowrap',
      maxWidth: 200, userSelect: 'none'
    }}>
      {bits}
    </div>
  );
}

function SortedMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
      <rect x="3" y="11" width="24" height="16" rx="3" stroke="#00d4ff" strokeWidth="1.8" fill="rgba(0,212,255,0.08)" />
      <path d="M11 11V8a4 4 0 018 0v3" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <rect x="12" y="16.5" width="6" height="5" rx="1.2" stroke="#00d4ff" strokeWidth="1.4" fill="rgba(0,212,255,0.2)" />
      <circle cx="15" cy="19" r="0.8" fill="#00d4ff" />
    </svg>
  );
}

const menuItems = [
  { label: 'SORTED Home',       path: '/Sorted' },
  { label: 'For Organisations', path: '/SortedForOrgs' },
  { label: 'Partner Kit',       path: '/SortedPartnerKit' },
  { label: 'Press Release',     path: '/SortedPressRelease' },
  { label: 'Investor Brief',    path: '/SortedInvestorPress' },
  { label: 'Terms',             path: '/SortedTerms',   icon: <Scale className="w-3.5 h-3.5" /> },
  { label: 'Privacy',           path: '/SortedPrivacy', icon: <Eye   className="w-3.5 h-3.5" /> },
  { label: 'Contact',           path: 'mailto:family@uf51.love', icon: <Mail className="w-3.5 h-3.5" />, isEmail: true },
];

export default function SortedLayout({ children, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [transmitting, setTransmitting] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);
  const location = useLocation();

  // When location changes, briefly show transmission then clear
  useEffect(() => {
    setTransmitting(true);
    const t = setTimeout(() => setTransmitting(false), 520);
    return () => clearTimeout(t);
  }, [location.pathname]);

  const handleNavClick = (path, isEmail) => {
    setMenuOpen(false);
    if (!isEmail) {
      setTransmitting(true);
      setTimeout(() => setTransmitting(false), 520);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.98)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(249,115,22,0.2)',
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link
          to="/Sorted"
          onClick={() => handleNavClick('/Sorted')}
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit', transition: 'opacity 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <SortedMark />
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.08em', color: '#fff' }}>SORTED</div>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.24em', color: '#00d4ff' }}>WE'VE GOT YOU</div>
          </div>
        </Link>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.92 }}
          style={{
            background: menuOpen ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.04)',
            border: `1.5px solid ${menuOpen ? 'rgba(0,212,255,0.6)' : 'rgba(0,212,255,0.2)'}`,
            borderRadius: 10, cursor: 'pointer', padding: '7px 10px',
            color: '#00d4ff', display: 'flex', alignItems: 'center', gap: 7,
            transition: 'all 0.18s',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {menuOpen
            ? <X className="w-4 h-4" />
            : <>
                <Menu className="w-4 h-4" />
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', fontFamily: 'monospace' }}>MENU</span>
              </>
          }
        </motion.button>
      </header>

      {/* Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.12 }}
            style={{
              position: 'sticky', top: 54, zIndex: 49,
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1.5px solid rgba(0,212,255,0.15)',
              padding: '0 20px',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '10px 0 8px',
              borderBottom: '1px solid rgba(0,212,255,0.08)',
              fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.2em',
              color: 'rgba(0,212,255,0.3)',
            }}>
              NAVIGATION
            </div>

            <div style={{ maxWidth: 520, margin: '0 auto' }}>
              {menuItems.map((item, idx) => (
                item.isEmail ? (
                  <a
                    key={idx}
                    href={item.path}
                    onClick={() => handleNavClick(item.path, true)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(0,212,255,0.06)',
                      textDecoration: 'none', transition: 'all 0.12s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.paddingLeft = '6px'}
                    onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
                  >
                    <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(0,212,255,0.35)', minWidth: 24 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {item.icon && <span style={{ color: 'rgba(0,212,255,0.4)' }}>{item.icon}</span>}
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.03em' }}>{item.label}</span>
                    <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 9, color: 'rgba(0,212,255,0.2)' }}>→</span>
                  </a>
                ) : (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => handleNavClick(item.path)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(0,212,255,0.06)',
                      textDecoration: 'none', transition: 'all 0.12s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.paddingLeft = '6px'}
                    onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
                  >
                    <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(0,212,255,0.35)', minWidth: 24 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {item.icon && <span style={{ color: 'rgba(0,212,255,0.4)' }}>{item.icon}</span>}
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.03em' }}>{item.label}</span>
                    <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 9, color: 'rgba(0,212,255,0.2)' }}>→</span>
                  </Link>
                )
              ))}

              {/* Clear data */}
              <button
                onClick={() => {
                  try { localStorage.clear(); } catch {}
                  setMenuOpen(false);
                  window.location.reload();
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 0 14px',
                  fontSize: 13, fontWeight: 700,
                  color: 'rgba(255,255,255,0.35)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  width: '100%', textAlign: 'left', letterSpacing: '0.03em',
                  transition: 'all 0.12s',
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.15)', minWidth: 24 }}>
                  {String(menuItems.length + 1).padStart(2, '0')}
                </span>
                <Trash2 className="w-3.5 h-3.5" />
                Clear all my data
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <main style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <div style={{
        padding: '14px 20px',
        borderTop: '1px solid rgba(0,212,255,0.08)',
        display: 'flex', justifyContent: 'center',
        fontFamily: 'monospace', fontSize: 9,
        color: 'rgba(0,212,255,0.15)', letterSpacing: '0.14em',
      }}>
        ZERO LOSS — ZERO BULLSHIT
      </div>
    </div>
  );
}