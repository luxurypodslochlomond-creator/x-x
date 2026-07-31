import React, { useState, useRef } from 'react';
import SortedPrivacyStrip from './SortedPrivacyStrip';

export default function SortedPhotoButton({ onPhotoSelected, onDecoded, disabled = false, compact = false, showPrivacy = true }) {
  const [uploading, setUploading] = useState(false);
  const cameraInputRef = useRef(null);

  const handleClick = () => {
    if (uploading || disabled) return;
    cameraInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await import('@/api/base44Client').then(m => m.base44.integrations.Core.UploadFile({ file }));
      onPhotoSelected?.(result.file_url);
      onDecoded?.(result.file_url);
    } catch (err) {
      console.error('Photo upload failed:', err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <>
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileChange} style={{ display: 'none' }} />
      <div
        onClick={handleClick}
        style={{
          ...(compact ? { flex: 1 } : { width: '100%' }), padding: '11px 8px', borderRadius: 10,
          border: '1px solid rgba(245,166,35,0.3)', background: 'rgba(245,166,35,0.08)',
          color: '#f5a623', display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 5, fontSize: 11, fontWeight: 700, cursor: uploading ? 'not-allowed' : 'pointer',
          opacity: uploading ? 0.5 : 1, textAlign: 'center',
          transition: 'all 0.12s',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}
        onMouseEnter={e => { if (!uploading) { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 3px 8px rgba(0,0,0,0.06)'; }}}
        onMouseLeave={e => { if (!uploading) { e.target.style.transform = ''; e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)'; }}}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
        {uploading ? '...' : 'SNAP PHOTO'}
      </div>
      {showPrivacy && !compact && (
        <div style={{ fontSize: 10, color: '#9a8a6a', textAlign: 'center', marginTop: 6, lineHeight: 1.4, padding: '0 4px' }}>
          For full identity protection, paste the text instead — a photo is read directly by the AI and can\u2019t be redacted on the device first.
        </div>
      )}
      {showPrivacy && !compact && <SortedPrivacyStrip />}
    </>
  );
}