import React from 'react';

/**
 * SortedPrivacyStrip — honest reassurance shown next to file/photo upload buttons.
 *
 * Per SORTED standards: no false "stays on device" claims.
 * Accurately describes what happens to an uploaded file:
 * uploaded securely for AI analysis, saved to case vault, never shared.
 */
export default function SortedPrivacyStrip() {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 6,
      padding: '8px 10px', borderRadius: 8,
      background: 'rgba(26,18,8,0.03)', border: '1px solid rgba(26,18,8,0.06)',
      marginTop: 6,
    }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <p style={{ fontSize: 10.5, color: 'rgba(26,18,8,0.55)', margin: 0, lineHeight: 1.4 }}>
        Your file is uploaded securely for AI analysis and saved to your private case vault.
        We never share it with anyone — only you can see your cases.
      </p>
    </div>
  );
}