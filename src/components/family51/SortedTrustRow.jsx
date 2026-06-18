import React from 'react';
import { PinIcon, LockIcon } from './SortedIcons';

export default function SortedTrustRow({ selectedLocation, geoPrice, onShowLocationPicker }) {
  const safeGeoPrice = geoPrice || { inline: '£9.99/month' };

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 8, marginBottom: 8 }}>
        <button
          onClick={() => onShowLocationPicker && onShowLocationPicker(true)}
          style={{
            padding: '8px 14px', borderRadius: 12, background: 'rgba(245,166,35,0.05)',
            border: '1.5px solid rgba(245,166,35,0.18)', display: 'flex', alignItems: 'center',
            gap: 6, cursor: 'pointer', fontSize: 11, color: 'rgba(26,18,8,0.5)', fontWeight: 600,
            letterSpacing: '0.02em', transition: 'all 0.15s',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
          }}
        >
          <PinIcon color="#f5a623" size={10} />
          {selectedLocation?.jurisdiction?.split('·')[0]?.trim() || 'UK law'}
        </button>
        <div style={{
          padding: '8px 14px', borderRadius: 12, background: 'rgba(245,166,35,0.03)',
          border: '1.5px solid rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center',
          gap: 6, minWidth: 0,
        }}>
          <LockIcon color="rgba(26,18,8,0.3)" size={10} />
          <span style={{ fontSize: 11, color: 'rgba(26,18,8,0.4)', letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Nothing stored. No account. No trace.
          </span>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: 11, color: 'rgba(26,18,8,0.38)', letterSpacing: '0.03em' }}>
          10 free uses. Then {safeGeoPrice.inline} for unlimited.
        </span>
      </div>
    </div>
  );
}