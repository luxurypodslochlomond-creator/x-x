import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Eye, Scale, Mail, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SortedLoader from './SortedLoader';

function F51Mark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect x="3" y="11" width="24" height="16" rx="3" stroke="#f97316" strokeWidth="1.8" fill="rgba(249,115,22,0.06)" />
      <path d="M11 11V8a4 4 0 018 0v3" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <rect x="12" y="16.5" width="6" height="5" rx="1.2" stroke="#f97316" strokeWidth="1.4" fill="rgba(249,115,22,0.25)" />
      <circle cx="15" cy="19" r="0.8" fill="#f97316" />
    </svg>
  );
}

export default function SortedLayout({ children, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);



  const menuItems = [
    { label: 'SORTED Home', path: '/Family51', icon: null },
    { label: '📰 Press Release', path: '/SortedPressRelease', icon: null },
    { label: '📄 Investor Brief', path: '/SortedInvestorPress', icon: null },
    { label: 'Terms', path: '/SortedTerms', icon: <Scale className="w-4 h-4" /> },
    { label: 'Privacy', path: '/SortedPrivacy', icon: <Eye className="w-4 h-4" /> },
    { label: 'Contact', path: 'mailto:family@uf51.love', icon: <Mail className="w-4 h-4" />, isEmail: true },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#fff' }}>

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(8,10,15,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/Family51" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'none', color: 'inherit' }}>
          <F51Mark />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '-0.01em', color: '#fff' }}>SORTED</div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: '#f97316' }}>WE'VE GOT YOU</div>
          </div>
        </Link>

        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.95 }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#f97316' }}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </header>

      {/* Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'sticky',
              top: 52,
              zIndex: 49,
              background: 'rgba(8,10,15,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '16px 20px'
            }}
          >
            <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {menuItems.map((item, idx) => (
                item.isEmail ? (
                  <a
                    key={idx}
                    href={item.path}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '12px 0',
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.85)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {item.icon && <span style={{ color: 'rgba(255,255,255,0.4)' }}>{item.icon}</span>}
                    {item.label}
                  </a>
                ) : (
                   <Link
                     key={idx}
                     to={item.path}
                     onClick={closeMenu}
                     style={{
                       display: 'flex',
                       alignItems: 'center',
                       gap: 10,
                       padding: '12px 0',
                       fontSize: 13,
                       fontWeight: 600,
                       color: 'rgba(255,255,255,0.85)',
                       textDecoration: 'none',
                       borderBottom: '1px solid rgba(255,255,255,0.07)',
                       letterSpacing: '0.01em'
                     }}
                   >
                     {item.icon && <span style={{ color: 'rgba(255,255,255,0.4)' }}>{item.icon}</span>}
                     {item.label}
                   </Link>
                 )
              ))}
              <button
                onClick={() => {
                  try { localStorage.clear(); } catch {}
                  setMenuOpen(false);
                  window.location.reload();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 0',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.4)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  letterSpacing: '0.01em'
                }}
              >
                <Trash2 className="w-4 h-4" />
                Clear all my data
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
       <main style={{ maxWidth: '100vw', overflowX: 'hidden', position: 'relative' }}>
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.05 }}
           key={currentPage}
         >
           {children}
         </motion.div>
       </main>
    </div>
  );
}