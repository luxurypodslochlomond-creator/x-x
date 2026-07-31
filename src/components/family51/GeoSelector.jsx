import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GeoSelector({ geo, onChange, accentColor = '#06b6d4' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const geoOptions = [
    { country: 'England & Wales', jurisdiction: 'UK law (England & Wales)', code: 'GB' },
    { country: 'Scotland', jurisdiction: 'Scots law', code: 'SCOTLAND' },
    { country: 'Northern Ireland', jurisdiction: 'NI law', code: 'NI' },
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
    { country: 'Russia', jurisdiction: 'Russian law', code: 'RU' },
    { country: 'South Africa', jurisdiction: 'South African law', code: 'ZA' },
    { country: 'Japan', jurisdiction: 'Japanese law', code: 'JP' },
    { country: 'UAE', jurisdiction: 'UAE law', code: 'AE' },
    { country: 'Philippines', jurisdiction: 'Philippine law', code: 'PH' },
    { country: 'Indonesia', jurisdiction: 'Indonesian law', code: 'ID' },
    { country: 'Malaysia', jurisdiction: 'Malaysian law', code: 'MY' },
    { country: 'Thailand', jurisdiction: 'Thai law', code: 'TH' },
    { country: 'Vietnam', jurisdiction: 'Vietnamese law', code: 'VN' },
    { country: 'South Korea', jurisdiction: 'South Korean law', code: 'KR' },
    { country: 'Brazil', jurisdiction: 'Brazilian law', code: 'BR' },
    { country: 'Mexico', jurisdiction: 'Mexican law', code: 'MX' },
    { country: 'Nigeria', jurisdiction: 'Nigerian law', code: 'NG' },
    { country: 'Kenya', jurisdiction: 'Kenyan law', code: 'KE' },
    { country: 'Turkey', jurisdiction: 'Turkish law', code: 'TR' },
    { country: 'International', jurisdiction: 'General international principles', code: 'INT' },
  ];

  const filteredOptions = geoOptions.filter(o =>
    o.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentGeo = geoOptions.find(o => o.code === geo.code) || geoOptions[0];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <motion.button
        onClick={() => { setIsOpen(!isOpen); setSearchTerm(''); }}
        whileTap={{ scale: 0.96 }}
        style={{
          background: 'transparent',
          border: 'none',
          color: accentColor,
          padding: '2px 0',
          fontSize: 11,
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          letterSpacing: '0.03em',
          textDecoration: 'underline',
          textDecorationStyle: 'dotted',
          textUnderlineOffset: 3,
          opacity: 0.8,
        }}
      >
        {geo.country}
        <motion.span style={{ fontSize: 9, opacity: 0.6 }} animate={{ rotate: isOpen ? 180 : 0 }}>▼</motion.span>
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
              padding: 10,
              maxHeight: 340,
              overflowY: 'auto',
              zIndex: 50,
              minWidth: 260,
              boxShadow: `0 16px 40px rgba(0,0,0,0.6)`,
              backdropFilter: 'blur(12px)'
            }}
          >
            {/* SEARCH BOX */}
            <div style={{ marginBottom: 10, paddingBottom: 10, borderBottom: `1px solid ${accentColor}20` }}>
              <input
                type="text"
                placeholder="Search location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${accentColor}25`,
                  borderRadius: 6,
                  color: '#fff',
                  fontSize: 12,
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s'
                }}
                onFocus={(e) => e.target.style.borderColor = accentColor + '50'}
                onBlur={(e) => e.target.style.borderColor = accentColor + '25'}
              />
            </div>

            {/* OPTIONS */}
            {filteredOptions.length > 0 ? filteredOptions.map((option) => (
              <motion.button
                key={option.code}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                whileHover={{ background: `${accentColor}12` }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                  padding: '10px 10px',
                  textAlign: 'left',
                  background: geo.code === option.code ? `${accentColor}18` : 'transparent',
                  border: 'none',
                  color: geo.code === option.code ? accentColor : '#ccc',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: geo.code === option.code ? 700 : 500,
                  borderRadius: 8,
                  transition: 'all 0.15s',
                  marginBottom: 4
                }}
              >
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: geo.code === option.code ? accentColor + '30' : 'rgba(255,255,255,0.06)',
                  border: `1.5px solid ${geo.code === option.code ? accentColor + '60' : accentColor + '20'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 9,
                  fontWeight: 900,
                  color: geo.code === option.code ? accentColor : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.15s'
                }}>
                  {option.code}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{option.country}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{option.jurisdiction}</div>
                </div>
                {geo.code === option.code && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: 12, color: accentColor, fontWeight: 700 }}>✓</motion.span>
                )}
              </motion.button>
            )) : (
              <div style={{ padding: '16px 10px', textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
                No locations found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}