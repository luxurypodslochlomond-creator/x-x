import React from 'react';
import { PinIcon, LockIcon } from './SortedIcons';

export default function SortedTrustRow({ selectedLocation, geoPrice, onShowLocationPicker }) {

  return (
    <>
      <div style={{ marginBottom: 10, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 8 }}>
        <button
          onClick={() => onShowLocationPicker(true)}
          style={{
            padding: '7px 12px', borderRadius: 10, background: 'rgba(245,166,35,0.06)',
            border: '1px solid rgba(245,166,35,0.2)', display: 'flex', alignItems: 'center',
            gap: 5, cursor: 'pointer', fontSize: 10, color: 'rgba(26,18,8,0.5)', fontWeight: 600,
            letterSpacing: '0.02em', transition: 'all 0.15s',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
          }}
        >
          <PinIcon color="#f5a623" size={10} />
          {selectedLocation?.jurisdiction?.split('·')[0]?.trim() || 'UK law'}
        </button>
        <div style={{
          padding: '7px 12px', borderRadius: 10, background: 'rgba(245,166,35,0.04)',
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
          10 free uses. Then {geoPrice.inline} for unlimited.
        </span>
      </div>
    </>
  );
}