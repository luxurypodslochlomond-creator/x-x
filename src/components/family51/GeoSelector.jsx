import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function GeoSelector({ geo, onChange, accentColor = '#06b6d4' }) {
  const [isOpen, setIsOpen] = useState(false);

  const geoOptions = [
    { country: 'United Kingdom', jurisdiction: 'UK law', code: 'GB' },
    { country: 'USA (Eastern)', jurisdiction: 'US federal & state law', code: 'US-NY' },
    { country: 'USA (Pacific)', jurisdiction: 'US federal & state law', code: 'US-CA' },
    { country: 'Australia', jurisdiction: 'Australian law', code: 'AU' },
    { country: 'Canada', jurisdiction: 'Canadian law', code: 'CA' },
    { country: 'Ireland', jurisdiction: 'Irish law', code: 'IE' },
    { country: 'France', jurisdiction: 'French law', code: 'FR' },
    { country: 'Germany', jurisdiction: 'German law', code: 'DE' },
    { country: 'Netherlands', jurisdiction: 'Dutch law', code: 'NL' },
    { country: 'Spain', jurisdiction: 'Spanish law', code: 'ES' },
    { country: 'Italy', jurisdiction: 'Italian law', code: 'IT' },
    { country: 'Switzerland', jurisdiction: 'Swiss law', code: 'CH' },
    { country: 'New Zealand', jurisdiction: 'New Zealand law', code: 'NZ' },
    { country: 'Singapore', jurisdiction: 'Singapore law', code: 'SG' },
    { country: 'India', jurisdiction: 'Indian law', code: 'IN' },
    { country: 'International', jurisdiction: 'International law', code: 'INT' },
  ];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: `1px solid ${accentColor}33`,
          color: '#fff',
          padding: '6px 10px',
          fontSize: 12,
          fontWeight: 600,
          borderRadius: 4,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.borderColor = accentColor + '77'}
        onMouseLeave={(e) => e.target.style.borderColor = accentColor + '33'}
      >
        <span style={{ maxWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {geo.country}
        </span>
        <ChevronDown size={12} style={{ transform: isOpen ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 4,
            background: 'rgba(10, 15, 26, 0.95)',
            border: `1px solid ${accentColor}66`,
            borderRadius: 6,
            padding: 0,
            maxHeight: 300,
            overflowY: 'auto',
            zIndex: 50,
            minWidth: 200,
            boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
            backdropFilter: 'blur(8px)'
          }}
        >
          {geoOptions.map((option) => (
            <button
              key={option.code}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 12px',
                textAlign: 'left',
                background: geo.code === option.code ? accentColor + '22' : 'transparent',
                border: 'none',
                color: geo.code === option.code ? accentColor : '#ccc',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: geo.code === option.code ? 600 : 400,
                borderLeft: geo.code === option.code ? `2px solid ${accentColor}` : '2px solid transparent',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = accentColor + '11';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = geo.code === option.code ? accentColor + '22' : 'transparent';
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{option.country}</div>
              <div style={{ fontSize: 10, color: '#999', marginTop: 2 }}>{option.jurisdiction}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}