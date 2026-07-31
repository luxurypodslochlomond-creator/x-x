import React from 'react';
import { getHelplines } from '@/utils/sortedHelplines';

export default function SortedHelplines({ geoCode }) {
  const helplines = getHelplines(geoCode);
  const phoneHref = (num) => 'tel:' + num.replace(/\s+/g, '');

  return (
    <div style={{ background: 'rgba(217,119,6,0.03)', borderRadius: 16, padding: '18px 20px', border: '1px solid rgba(217,119,6,0.12)' }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: '#d97706', letterSpacing: '0.14em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.36 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        NEED A HUMAN RIGHT NOW?
      </div>

      {helplines.isFallback ? (
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.6)', lineHeight: 1.5, margin: '0 0 12px' }}>
            We can't detect your country. Search online for your local citizens advice service or call your local council.
          </p>
          <a href="https://www.google.com/search?q=citizens+advice+near+me" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 800, color: '#d97706', textDecoration: 'none' }}>
            Find help near you →
          </a>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {helplines.services.map((s, i) => (
            <a key={i} href={phoneHref(s.phone)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', background: '#fff', borderRadius: 12, padding: '12px 16px', border: '1px solid rgba(217,119,6,0.1)', transition: 'border-color 0.15s' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#1a1208' }}>{s.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)' }}>{s.desc}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#d97706', fontFamily: 'monospace' }}>{s.phone}</div>
            </a>
          ))}
        </div>
      )}

      <div style={{ fontSize: 10, color: 'rgba(26,18,8,0.35)', marginTop: 12, textAlign: 'center' }}>
        All free. {helplines.label}. Tap to call. Numbers checked {helplines.verifiedOn || 'recently'} against each organisation's official website.
      </div>
    </div>
  );
}