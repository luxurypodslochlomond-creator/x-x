import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SortedFAQ from '@/components/family51/SortedFAQ';

export default function SortedFAQPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', color: '#1a1208', padding: '20px' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {/* Back button */}
        <Link
          to="/Sorted"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 12,
            fontWeight: 700,
            color: 'rgba(26,18,8,0.4)',
            letterSpacing: '0.08em',
            textDecoration: 'none',
            marginBottom: 20,
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          BACK
        </Link>

        {/* FAQ Component */}
        <SortedFAQ accentColor="#f5a623" />
      </div>
    </div>
  );
}