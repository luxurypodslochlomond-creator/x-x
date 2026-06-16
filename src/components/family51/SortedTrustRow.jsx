import React from 'react';
import { PinIcon, LockIcon } from './SortedIcons';

export default function SortedTrustRow({ selectedLocation, geoPrice, onShowLocationPicker }) {

  return (
    <>
      <div style={{ marginBottom: 10, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 8 }}>
        <button
          onClick={() => onShowLocationPicker(true)}
          style={{
            padding: '6px 10px', borderRadius: 8, background: 'rgba(245,166,35,0.06)',
            border: '1px solid rgba(245,166,35,0.2)', display: 'flex', alignItems: 'center',
            gap: 5, cursor: 'pointer', fontSize: 10, color: 'rgba(26,18,8,0.5)', fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          <PinIcon color="#f5a623" size={10} />
          {selectedLocation?.jurisdiction?.split('·')[0]?.trim() || 'UK law'}
        </button>
        <div style={{
          padding: '6px 10px', borderRadius: 8, background: 'rgba(245,166,35,0.04)',
          border: '1px solid rgba(245,166,35,0.12)', display: 'flex', alignItems: 'center',
          gap: 5, minWidth: 0,
        }}>
          <LockIcon color="rgba(26,18,8,0.3)" size={10} />
          <span style={{ fontSize: 10, color: 'rgba(26,18,8,0.4)', letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Nothing stored. No account. No trace.
          </span>
        </div>
      </div>
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <span style={{ fontSize: 10, color: 'rgba(26,18,8,0.35)', letterSpacing: '0.03em' }}>
          {geoPrice.inline} when you're ready for unlimited.
        </span>
      </div>
    </>
  );
}