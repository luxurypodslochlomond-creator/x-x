import React from 'react';
import SortedHeader from '@/components/family51/SortedHeader';

export default function SortedLayout({ children, currentPage }) {
  return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(180deg, #fdf9f0 0%, #faf8f5 40%)', color: '#1a1208', position: 'relative', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>

      {/* STICKY HEADER */}
      <SortedHeader />

      {/* Content */}
      <main style={{ maxWidth: '100vw', overflowX: 'hidden', paddingTop: '20px' }}>
        {children}
      </main>
    </div>
  );
}