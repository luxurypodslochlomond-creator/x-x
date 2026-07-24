import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SortedFAQ from '@/components/family51/SortedFAQ';

export default function SortedFAQPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fcfaf6', color: '#1c1c1e', padding: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {/* FAQ Component */}
        <SortedFAQ accentColor="#c6995c" />
      </div>
    </div>
  );
}