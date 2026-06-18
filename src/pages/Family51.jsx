import React from 'react';
import SortedLiveCounter from '@/components/family51/SortedLiveCounter';

export default function Family51Page() {
  return (
    <div style={{ minHeight: '100vh', background: '#fef8ee', padding: 40, color: '#1a1208' }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 20 }}>LiveCounter Test</h1>
      <SortedLiveCounter />
    </div>
  );
}