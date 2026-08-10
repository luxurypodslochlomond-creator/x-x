import React from 'react';

// Native <select> — instant on mobile, zero custom UI, accessible by default.
// Replaces the old dark custom dropdown which was clunky and slow to tap through.
const GEO_OPTIONS = [
  { country: 'England & Wales', jurisdiction: 'UK law (England & Wales)', code: 'GB' },
  { country: 'Scotland', jurisdiction: 'Scots law', code: 'SCOTLAND' },
  { country: 'Northern Ireland', jurisdiction: 'NI law', code: 'NI' },
  { country: 'USA', jurisdiction: 'US federal & state law', code: 'US' },
  { country: 'Australia', jurisdiction: 'Australian law', code: 'AU' },
  { country: 'Canada', jurisdiction: 'Canadian law', code: 'CA' },
  { country: 'Ireland', jurisdiction: 'Irish law', code: 'IE' },
  { country: 'France', jurisdiction: 'French law', code: 'FR' },
  { country: 'Germany', jurisdiction: 'German law', code: 'DE' },
  { country: 'Netherlands', jurisdiction: 'Dutch law', code: 'NL' },
  { country: 'Spain', jurisdiction: 'Spanish law', code: 'ES' },
  { country: 'Italy', jurisdiction: 'Italian law', code: 'IT' },
  { country: 'Switzerland', jurisdiction: 'Swiss law', code: 'CH' },
  { country: 'Belgium', jurisdiction: 'Belgian law', code: 'BE' },
  { country: 'Austria', jurisdiction: 'Austrian law', code: 'AT' },
  { country: 'Poland', jurisdiction: 'Polish law', code: 'PL' },
  { country: 'Sweden', jurisdiction: 'Swedish law', code: 'SE' },
  { country: 'Portugal', jurisdiction: 'Portuguese law', code: 'PT' },
  { country: 'Greece', jurisdiction: 'Greek law', code: 'GR' },
  { country: 'Turkey', jurisdiction: 'Turkish law', code: 'TR' },
  { country: 'Russia', jurisdiction: 'Russian law', code: 'RU' },
  { country: 'New Zealand', jurisdiction: 'New Zealand law', code: 'NZ' },
  { country: 'Singapore', jurisdiction: 'Singapore law', code: 'SG' },
  { country: 'India', jurisdiction: 'Indian law', code: 'IN' },
  { country: 'South Africa', jurisdiction: 'South African law', code: 'ZA' },
  { country: 'Nigeria', jurisdiction: 'Nigerian law', code: 'NG' },
  { country: 'Kenya', jurisdiction: 'Kenyan law', code: 'KE' },
  { country: 'Japan', jurisdiction: 'Japanese law', code: 'JP' },
  { country: 'South Korea', jurisdiction: 'South Korean law', code: 'KR' },
  { country: 'Hong Kong', jurisdiction: 'Hong Kong law', code: 'HK' },
  { country: 'UAE', jurisdiction: 'UAE law', code: 'AE' },
  { country: 'Philippines', jurisdiction: 'Philippine law', code: 'PH' },
  { country: 'Indonesia', jurisdiction: 'Indonesian law', code: 'ID' },
  { country: 'Malaysia', jurisdiction: 'Malaysian law', code: 'MY' },
  { country: 'Thailand', jurisdiction: 'Thai law', code: 'TH' },
  { country: 'Vietnam', jurisdiction: 'Vietnamese law', code: 'VN' },
  { country: 'Brazil', jurisdiction: 'Brazilian law', code: 'BR' },
  { country: 'Mexico', jurisdiction: 'Mexican law', code: 'MX' },
  { country: 'Argentina', jurisdiction: 'Argentine law', code: 'AR' },
  { country: 'International', jurisdiction: 'General international principles', code: 'INT' },
];

export default function GeoSelector({ geo, onChange, accentColor = '#06b6d4' }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>
      <select
        value={geo.code}
        onChange={(e) => {
          const selected = GEO_OPTIONS.find(o => o.code === e.target.value);
          if (selected) onChange(selected);
        }}
        aria-label="Change your location"
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          background: 'transparent',
          border: 'none',
          color: accentColor,
          fontSize: 11,
          fontWeight: 700,
          cursor: 'pointer',
          padding: '2px 12px 2px 0',
          outline: 'none',
          letterSpacing: '0.03em',
          textDecoration: 'underline',
          textDecorationStyle: 'dotted',
          textUnderlineOffset: 3,
          opacity: 0.8,
          fontFamily: 'inherit',
        }}
      >
        {GEO_OPTIONS.map(o => (
          <option key={o.code} value={o.code}>{o.country}</option>
        ))}
      </select>
      <span style={{ fontSize: 8, color: accentColor, opacity: 0.5, marginLeft: -8, pointerEvents: 'none' }}>▼</span>
    </label>
  );
}