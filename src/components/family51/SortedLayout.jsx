import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SortedHeader from './SortedHeader';

export default function SortedLayout({ children, currentPage }) {
  const navigate = useNavigate();
  
  return (
    <div style={{ minHeight: '100dvh',       background: '#fcfaf6', color: '#1c1c1e', position: 'relative', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif' }}>
      
      {/* Subtle paper warmth — barely perceptible gradient, no jiggle */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 90% 50% at 50% 0%, rgba(198,153,92,0.04) 0%, transparent 60%)' }} />
      
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
              color: '#c6995c',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={16} />
            <span>BACK</span>
          </button>
        </div>
      )}

      {/* Content */}
      <main style={{ maxWidth: '100vw', overflowX: 'hidden', paddingTop: '20px', position: 'relative', zIndex: 1 }}>
        {children}
      </main>
      
    </div>
  );
}