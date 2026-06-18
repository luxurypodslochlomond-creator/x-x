import React, { useState, useEffect } from 'react';
import { isPatternSharingEnabled, togglePatternSharing } from '@/utils/sortedLearning';

export default function SortedPatternShareToggle({ accentColor = '#f97316' }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Default ON, but respect if user turned it off
    const stored = localStorage.getItem('sorted_pattern_share_enabled');
    setEnabled(stored === null || stored === 'true');
  }, []);

  const handleToggle = () => {
    const newValue = !enabled;
    // Only save if turning OFF (default is ON)
    if (!newValue) {
      togglePatternSharing(false);
    } else {
      localStorage.removeItem('sorted_pattern_share_enabled'); // reset to default
    }
    setEnabled(newValue);
  };

  return (
    <div style={{
      padding: '14px 16px',
      borderRadius: 12,
      border: '1px solid rgba(34,197,94,0.3)',
      background: enabled ? 'rgba(34,197,94,0.06)' : '#fff',
      marginBottom: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 44,
            height: 24,
            borderRadius: 12,
            background: enabled ? accentColor : 'rgba(26,18,8,0.15)',
            position: 'relative',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }} onClick={handleToggle}>
            <div style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              background: '#fff',
              position: 'absolute',
              top: 2,
              left: enabled ? 22 : 2,
              transition: 'left 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }} />
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, color: enabled ? accentColor : 'rgba(26,18,8,0.5)', margin: 0 }}>
              Help protect others
            </p>
            <p style={{ fontSize: 10, fontWeight: 600, color: 'rgba(26,18,8,0.4)', margin: 0 }}>
              Share scam patterns anonymously
            </p>
          </div>
        </div>
      </div>
      {!enabled && (
        <p style={{ fontSize: 9, color: '#ef4444', margin: 0, lineHeight: 1.4, fontWeight: 700 }}>
          ✕ Pattern sharing OFF — you're protected but not helping others
        </p>
      )}
      {enabled && (
        <p style={{ fontSize: 9, color: 'rgba(26,18,8,0.35)', margin: 0, lineHeight: 1.4 }}>
          ✓ Active: Your anonymized patterns protect others. No personal data ever sent — only scam indicators like "fake bailiff threat - 127 reports this week".
        </p>
      )}
    </div>
  );
}