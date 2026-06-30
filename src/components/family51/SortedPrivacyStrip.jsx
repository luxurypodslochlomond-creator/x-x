import React from 'react';

// ONE HONEST PRIVACY MESSAGE — used under every upload/photo button across all SORTED tools.
// Replaces contradictory "Nothing stored" / "saved to your case vault" messaging with one truth.
export default function SortedPrivacyStrip({ accentColor = '#d97706', style }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      padding: '10px 14px',
      borderRadius: 10,
      background: 'rgba(26,18,8,0.03)',
      border: '1px solid rgba(26,18,8,0.08)',
      ...style,
    }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
        <path d="M12 2L4 6v6c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V6l-8-4z" stroke={accentColor} strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <p style={{ fontSize: 10.5, color: 'rgba(26,18,8,0.5)', margin: 0, lineHeight: 1.5 }}>
        Your file is uploaded securely for AI analysis. Your results are saved to your private case vault on this device.
      </p>
    </div>
  );
}