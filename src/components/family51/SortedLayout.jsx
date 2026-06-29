import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SortedHeader from './SortedHeader';

export default function SortedLayout({ children, currentPage }) {
  const navigate = useNavigate();
  
  return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(180deg, #fdf9f0 0%, #faf8f5 40%)', color: '#1a1208', position: 'relative', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
      
      {/* STICKY HEADER */}
      <SortedHeader />
      
      {/* BACK BUTTON - Only show if not on main Sorted page */}
      {currentPage !== 'Sorted' && (
        <div style={{ padding: '12px 20px 0' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              color: '#d97706',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            <ArrowLeft size={16} />
            <span>BACK</span>
          </button>
        </div>
      )}

      {/* Content */}
      <main style={{ maxWidth: '100vw', overflowX: 'hidden', paddingTop: '20px' }}>
        {children}
      </main>
      
      {/* Footer */}
      <div style={{
        padding: '14px 20px',
        borderTop: '1px solid rgba(217,119,6,0.2)',
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'monospace',
        fontSize: 9,
        color: 'rgba(26,18,8,0.35)',
        letterSpacing: '0.14em',
        marginTop: '40px',
      }}>
        HONEST HELP · YOUR CASES ARE PRIVATE TO YOU
      </div>
    </div>
  );
}