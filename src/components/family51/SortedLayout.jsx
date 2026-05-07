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
      <rect x="3" y="11" width="24" height="16" rx="3" stroke="#f97316" strokeWidth="1.8" fill="rgba(249,115,22,0.06)" />
      <path d="M11 11V8a4 4 0 018 0v3" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <rect x="12" y="16.5" width="6" height="5" rx="1.2" stroke="#f97316" strokeWidth="1.4" fill="rgba(249,115,22,0.25)" />
      <circle cx="15" cy="19" r="0.8" fill="#f97316" />
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
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#fff' }}>

      {/* Shannon transmission overlay */}
      <AnimatePresence>
        {transmitting && <ShannonTransmission active={transmitting} />}
      </AnimatePresence>

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(8,10,15,0.97)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(249,115,22,0.12)',
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link
          to="/Sorted"
          onClick={() => handleNavClick('/Sorted')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}
        >
          <SortedMark />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: '0.06em', color: '#fff' }}>SORTED</div>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', color: '#f97316' }}>WE'VE GOT YOU</div>
          </div>
        </Link>

        {/* Shannon bit stream — centre decoration */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <BitStream />
        </div>

        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          style={{
            background: menuOpen ? 'rgba(249,115,22,0.1)' : 'none',
            border: `1px solid ${menuOpen ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 8, cursor: 'pointer', padding: '6px 8px',
            color: '#f97316', display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all 0.15s',
          }}
        >
          {menuOpen
            ? <X className="w-4 h-4" />
            : <>
                <Menu className="w-4 h-4" />
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', fontFamily: 'monospace' }}>MENU</span>
              </>
          }
        </motion.button>
      </header>

      {/* Menu — Shannon terminal style */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'sticky', top: 53, zIndex: 49,
              background: 'rgba(6,8,12,0.99)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(249,115,22,0.15)',
              padding: '0 20px',
            }}
          >
            {/* Shannon header */}
            <div style={{
              padding: '12px 0 8px',
              borderBottom: '1px solid rgba(249,115,22,0.1)',
              fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.2em',
              color: 'rgba(249,115,22,0.4)',
            }}>
              C.E. SHANNON — A MATHEMATICAL THEORY OF COMMUNICATION — 1948 — ZERO LOSS
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
                      padding: '13px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      textDecoration: 'none', transition: 'all 0.1s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.paddingLeft = '6px'}
                    onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
                  >
                    <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(249,115,22,0.4)', minWidth: 24 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {item.icon && <span style={{ color: 'rgba(249,115,22,0.5)' }}>{item.icon}</span>}
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em' }}>{item.label}</span>
                    <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 8, color: 'rgba(249,115,22,0.25)' }}>→</span>
                  </a>
                ) : (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => handleNavClick(item.path)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '13px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      textDecoration: 'none', transition: 'all 0.1s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.paddingLeft = '6px'}
                    onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
                  >
                    <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(249,115,22,0.4)', minWidth: 24 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {item.icon && <span style={{ color: 'rgba(249,115,22,0.5)' }}>{item.icon}</span>}
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em' }}>{item.label}</span>
                    <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 8, color: 'rgba(249,115,22,0.25)' }}>→</span>
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
                  padding: '13px 0 16px',
                  fontSize: 12, fontWeight: 600,
                  color: 'rgba(255,255,255,0.25)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  width: '100%', textAlign: 'left', letterSpacing: '0.04em',
                  transition: 'all 0.1s',
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.15)', minWidth: 24 }}>
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

      {/* Shannon footer signal */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid rgba(249,115,22,0.06)',
        display: 'flex', justifyContent: 'center',
        fontFamily: 'monospace', fontSize: 8,
        color: 'rgba(249,115,22,0.15)', letterSpacing: '0.15em',
      }}>
        H = −Σ p(x) log p(x) — SHANNON ENTROPY — ZERO LOSS TRANSMISSION
      </div>
    </div>
  );
}