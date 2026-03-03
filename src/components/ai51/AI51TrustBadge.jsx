import React from 'react';
import { Shield, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function AI51TrustBadge() {
  return (
    <Link
      to={createPageUrl('AI51PrivacyArchitecture')}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all hover:opacity-80"
      style={{
        background: 'rgba(34,211,238,0.06)',
        border: '1px solid rgba(34,211,238,0.2)',
      }}
      title="Zero Extraction — how AI51 protects you"
    >
      <Shield style={{ width: 10, height: 10, color: 'rgba(34,211,238,0.6)' }} />
      <span style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(34,211,238,0.6)', fontFamily: 'monospace' }}>
        ZERO EXTRACTION
      </span>
      <Lock style={{ width: 8, height: 8, color: 'rgba(34,211,238,0.4)' }} />
    </Link>
  );
}