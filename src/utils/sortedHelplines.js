/**
 * Geo-specific helpline data for SORTED "Need a human" section.
 * Numbers verified against official organisation websites.
 * If a country isn't listed, we show a generic fallback directing to local services.
 */

const HELPLINES = {
  GB: {
    label: 'UK-based',
    services: [
      { name: 'Citizens Advice', desc: 'Debt, housing, benefits', phone: '0800 144 8848' },
      { name: 'National Debtline', desc: 'Free debt advice', phone: '0808 808 4000' },
      { name: 'Shelter', desc: 'Housing, eviction, homelessness', phone: '0808 800 4444' },
      { name: 'StepChange', desc: 'Free debt management plans', phone: '0800 138 1111' },
    ],
  },
  IE: {
    label: 'Ireland-based',
    services: [
      { name: 'MABS', desc: 'Money advice & budgeting', phone: '0818 07 2000' },
      { name: 'Citizens Information', desc: 'Rights & entitlements', phone: '0818 07 4000' },
      { name: 'Threshold', desc: 'Housing & tenant rights', phone: '1800 454 454' },
      { name: 'Legal Aid Board', desc: 'Free legal advice', phone: '0818 615 200' },
    ],
  },
  US: {
    label: 'US-based',
    services: [
      { name: '211', desc: 'Free community & social services', phone: '211' },
      { name: 'NFCC', desc: 'Credit counselling & debt help', phone: '800 388 2227' },
      { name: 'HUD Housing', desc: 'Housing & homelessness', phone: '800 569 4287' },
    ],
  },
  AU: {
    label: 'Australia-based',
    services: [
      { name: 'National Debt Helpline', desc: 'Free financial counselling', phone: '1800 007 007' },
      { name: 'Lifeline', desc: 'Crisis support', phone: '13 11 14' },
      { name: '1800 RESPECT', desc: 'Domestic & family violence support', phone: '1800 737 732' },
    ],
  },
  CA: {
    label: 'Canada-based',
    services: [
      { name: '211', desc: 'Free community & social services', phone: '211' },
      { name: 'CMHC', desc: 'Housing information', phone: '800 668 2642' },
    ],
  },
  NZ: {
    label: 'New Zealand-based',
    services: [
      { name: 'Citizens Advice Bureau', desc: 'Free advice & support', phone: '0800 367 222' },
      { name: 'MoneyTalks', desc: 'Free budgeting help', phone: '0800 345 123' },
    ],
  },
};

// Reuse the same timezone detection as useSortedGeoPrice
function detectCountryCode() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const tzMap = {
      'Europe/London': 'GB',
      'Europe/Dublin': 'IE',
      'America/New_York': 'US',
      'America/Chicago': 'US',
      'America/Denver': 'US',
      'America/Los_Angeles': 'US',
      'America/Phoenix': 'US',
      'America/Anchorage': 'US',
      'Pacific/Honolulu': 'US',
      'America/Toronto': 'CA',
      'America/Vancouver': 'CA',
      'America/Winnipeg': 'CA',
      'America/Halifax': 'CA',
      'Australia/Sydney': 'AU',
      'Australia/Melbourne': 'AU',
      'Australia/Brisbane': 'AU',
      'Australia/Perth': 'AU',
      'Australia/Adelaide': 'AU',
      'Pacific/Auckland': 'NZ',
      'Pacific/Chatham': 'NZ',
    };
    return tzMap[tz] || null;
  } catch {
    return null;
  }
}

export function getHelplines() {
  const code = detectCountryCode();
  if (code && HELPLINES[code]) {
    return { ...HELPLINES[code], country: code };
  }
  return {
    country: null,
    label: 'Find your local service',
    services: [],
    isFallback: true,
  };
}