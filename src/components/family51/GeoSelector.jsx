import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GeoSelector({ geo, onChange, accentColor = '#06b6d4' }) {
  const [isOpen, setIsOpen] = useState(false);

  const geoOptions = [
    { country: 'United Kingdom', jurisdiction: 'UK law', code: 'GB', flag: '🇬🇧' },
    { country: 'USA (Eastern)', jurisdiction: 'US federal & state law', code: 'US-NY', flag: '🇺🇸' },
    { country: 'USA (Pacific)', jurisdiction: 'US federal & state law', code: 'US-CA', flag: '🇺🇸' },
    { country: 'Australia', jurisdiction: 'Australian law', code: 'AU', flag: '🇦🇺' },
    { country: 'Canada', jurisdiction: 'Canadian law', code: 'CA', flag: '🇨🇦' },
    { country: 'Ireland', jurisdiction: 'Irish law', code: 'IE', flag: '🇮🇪' },
    { country: 'France', jurisdiction: 'French law', code: 'FR', flag: '🇫🇷' },
    { country: 'Germany', jurisdiction: 'German law', code: 'DE', flag: '🇩🇪' },
    { country: 'Netherlands', jurisdiction: 'Dutch law', code: 'NL', flag: '🇳🇱' },
    { country: 'Spain', jurisdiction: 'Spanish law', code: 'ES', flag: '🇪🇸' },
    { country: 'Italy', jurisdiction: 'Italian law', code: 'IT', flag: '🇮🇹' },
    { country: 'Switzerland', jurisdiction: 'Swiss law', code: 'CH', flag: '🇨🇭' },
    { country: 'New Zealand', jurisdiction: 'New Zealand law', code: 'NZ', flag: '🇳🇿' },
    { country: 'Singapore', jurisdiction: 'Singapore law', code: 'SG', flag: '🇸🇬' },
    { country: 'India', jurisdiction: 'Indian law', code: 'IN', flag: '🇮🇳' },
    { country: 'International', jurisdiction: 'International law', code: 'INT', flag: '🌍' },
  ];

  const currentGeo = geoOptions.find(o => o.code === geo.code) || geoOptions[0];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.96 }}
        style={{
          background: isOpen ? `${accentColor}15` : 'rgba(255,255,255,0.06)',
          border: `1px solid ${isOpen ? accentColor + '60' : accentColor + '25'}`,
          color: '#fff',
          padding: '8px 12px',
          fontSize: 12,
          fontWeight: 700,
          borderRadius: 8,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          transition: 'all 0.2s',
          letterSpacing: '0.03em',
          boxShadow: isOpen ? `0 0 20px ${accentColor}25` : 'none'
        }}
      >
        <span style={{ fontSize: 16 }}>{currentGeo.flag}</span>
        <span style={{ maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {geo.country}
        </span>
        <motion.span style={{ display: 'flex', alignItems: 'center', fontSize: 10 }} animate={{ rotate: isOpen ? 180 : 0 }}>
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: 8,
              background: 'rgba(10, 15, 26, 0.98)',
              border: `1px solid ${accentColor}40`,
              borderRadius: 12,
              padding: 6,
              maxHeight: 320,
              overflowY: 'auto',
              zIndex: 50,
              minWidth: 220,
              boxShadow: `0 16px 40px rgba(0,0,0,0.6)`,
              backdropFilter: 'blur(12px)'
            }}
          >
            {geoOptions.map((option) => (
              <motion.button
                key={option.code}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                whileHover={{ background: `${accentColor}15` }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '10px 12px',
                  textAlign: 'left',
                  background: geo.code === option.code ? `${accentColor}20` : 'transparent',
                  border: 'none',
                  color: geo.code === option.code ? accentColor : '#ccc',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: geo.code === option.code ? 700 : 500,
                  borderRadius: 8,
                  transition: 'all 0.15s',
                  marginBottom: 2
                }}
              >
                <span style={{ fontSize: 18, minWidth: 24 }}>{option.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{option.country}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>{option.jurisdiction}</div>
                </div>
                {geo.code === option.code && (
                  <span style={{ fontSize: 11, color: accentColor, fontWeight: 700 }}>✓</span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}