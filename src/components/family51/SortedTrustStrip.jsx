import React from 'react';
import { Link } from 'react-router-dom';

export default function SortedTrustStrip() {
  return (
    <div style={{
      padding: '20px 20px',
      maxWidth: 520,
      margin: '0 auto',
    }}>
      <div style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: 14,
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        {/* Top row — CIC badge + stat */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          {/* Shield icon */}
          <div style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'rgba(217,119,6,0.08)',
            border: '1px solid rgba(217,119,6,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2Z" stroke="#d97706" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M9 12l2 2 4-4" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
              <span style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#d97706',
                background: 'rgba(217,119,6,0.08)',
                border: '1px solid rgba(217,119,6,0.2)',
                borderRadius: 20,
                padding: '2px 8px',
              }}>
                CIC · Scotland
              </span>
            </div>
            <p style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#1a1208',
              margin: '0 0 2px',
              lineHeight: 1.4,
            }}>
              Built by Universal Frequency 51
            </p>
            <p style={{
              fontSize: 12,
              color: 'rgba(26,18,8,0.5)',
              margin: 0,
              lineHeight: 1.5,
            }}>
              A Community Interest Company — not a law firm, not a corporation. We started this because 5.1 billion people have no access to legal help. We're one part of an answer.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(26,18,8,0.06)' }} />

        {/* Bottom row — principles */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Lock icon — Nothing stored */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="rgba(26,18,8,0.4)" strokeWidth="1.8"/>
              <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="rgba(26,18,8,0.4)" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(26,18,8,0.5)' }}>Your vault, your device</span>
          </div>
          {/* Globe icon — Any country */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="rgba(26,18,8,0.4)" strokeWidth="1.8"/>
              <path d="M3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" stroke="rgba(26,18,8,0.4)" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(26,18,8,0.5)' }}>Any country</span>
          </div>
          {/* Translate icon — All languages */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M4 5h10M9 3v2M5 9c0 2 2 4 4 5M9 14s-1-1-2-3" stroke="rgba(26,18,8,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 20l3-7 3 7M15.5 17h3" stroke="rgba(26,18,8,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(26,18,8,0.5)' }}>All languages</span>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Link to="/SortedAbout" style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#d97706',
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}>
              The facts →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}