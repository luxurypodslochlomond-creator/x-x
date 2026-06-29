import React, { useState, useRef } from 'react';
import SortedPrivacyStrip from './SortedPrivacyStrip';

export default function SortedFileUploadButton({ onFileSelected, onDecoded, disabled = false, compact = false, showPrivacy = true }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (uploading || disabled) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await import('@/api/base44Client').then(m => m.base44.integrations.Core.UploadFile({ file }));
      onFileSelected?.(result.file_url);
      onDecoded?.(result.file_url);
    } catch (err) {
      console.error('File upload failed:', err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <>
      <input ref={fileInputRef} type="file" accept="image/*,application/pdf,.doc,.docx" onChange={handleFileChange} style={{ display: 'none' }} />
      <div
        onClick={handleClick}
        style={{
          ...(compact ? { flex: 1 } : { width: '100%' }), padding: '11px 8px', borderRadius: 10,
          border: '1px solid rgba(37,99,235,0.3)', background: 'rgba(37,99,235,0.06)',
          color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 5, fontSize: 11, fontWeight: 700, cursor: uploading ? 'not-allowed' : 'pointer',
          opacity: uploading ? 0.5 : 1, textAlign: 'center',
          transition: 'all 0.12s',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}
        onMouseEnter={e => { if (!uploading) { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 3px 8px rgba(0,0,0,0.06)'; }}}
        onMouseLeave={e => { if (!uploading) { e.target.style.transform = ''; e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)'; }}}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
          <polyline points="13 2 13 9 20 9"/>
        </svg>
        {uploading ? '...' : 'UPLOAD FILE'}
      </div>
      {showPrivacy && !compact && <SortedPrivacyStrip />}
    </>
  );
}