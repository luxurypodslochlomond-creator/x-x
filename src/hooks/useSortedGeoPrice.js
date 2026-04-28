// Localised pricing copy for SORTED — based on timezone geo detection
// Stripe handles actual currency conversion; this is just the display copy

const GEO_PRICES = {
  GB: { symbol: '£', amount: '9.99', currency: 'GBP', label: '£9.99/month', cta: 'GET SORTED — £9.99/MONTH', sub: '/ month · cancel anytime', inline: '£9.99/month' },
  IE: { symbol: '€', amount: '9.99', currency: 'EUR', label: '€9.99/month', cta: 'GET SORTED — €9.99/MONTH', sub: '/ month · cancel anytime', inline: '€9.99/month' },
  US: { symbol: '$', amount: '9.99', currency: 'USD', label: '$9.99/month', cta: 'GET SORTED — $9.99/MONTH', sub: '/ month · cancel anytime', inline: '$9.99/month' },
  CA: { symbol: '$', amount: '13.99', currency: 'CAD', label: 'CA$13.99/month', cta: 'GET SORTED — CA$13.99/MONTH', sub: '/ month · cancel anytime', inline: 'CA$13.99/month' },
  AU: { symbol: '$', amount: '15.99', currency: 'AUD', label: 'AU$15.99/month', cta: 'GET SORTED — AU$15.99/MONTH', sub: '/ month · cancel anytime', inline: 'AU$15.99/month' },
  NZ: { symbol: '$', amount: '17.99', currency: 'NZD', label: 'NZ$17.99/month', cta: 'GET SORTED — NZ$17.99/MONTH', sub: '/ month · cancel anytime', inline: 'NZ$17.99/month' },
  ZA: { symbol: 'R', amount: '189', currency: 'ZAR', label: 'R189/month', cta: 'GET SORTED — R189/MONTH', sub: '/ month · cancel anytime', inline: 'R189/month' },
  FR: { symbol: '€', amount: '9.99', currency: 'EUR', label: '€9.99/month', cta: 'GET SORTED — €9.99/MONTH', sub: '/ month · cancel anytime', inline: '€9.99/month' },
  DE: { symbol: '€', amount: '9.99', currency: 'EUR', label: '€9.99/month', cta: 'GET SORTED — €9.99/MONTH', sub: '/ month · cancel anytime', inline: '€9.99/month' },
  ES: { symbol: '€', amount: '9.99', currency: 'EUR', label: '€9.99/month', cta: 'GET SORTED — €9.99/MONTH', sub: '/ month · cancel anytime', inline: '€9.99/month' },
  IT: { symbol: '€', amount: '9.99', currency: 'EUR', label: '€9.99/month', cta: 'GET SORTED — €9.99/MONTH', sub: '/ month · cancel anytime', inline: '€9.99/month' },
  NL: { symbol: '€', amount: '9.99', currency: 'EUR', label: '€9.99/month', cta: 'GET SORTED — €9.99/MONTH', sub: '/ month · cancel anytime', inline: '€9.99/month' },
  AE: { symbol: '$', amount: '9.99', currency: 'USD', label: '$9.99/month', cta: 'GET SORTED — $9.99/MONTH', sub: '/ month · cancel anytime', inline: '$9.99/month' },
  IN: { symbol: '₹', amount: '849', currency: 'INR', label: '₹849/month', cta: 'GET SORTED — ₹849/MONTH', sub: '/ month · cancel anytime', inline: '₹849/month' },
  SG: { symbol: '$', amount: '13.99', currency: 'SGD', label: 'SG$13.99/month', cta: 'GET SORTED — SG$13.99/MONTH', sub: '/ month · cancel anytime', inline: 'SG$13.99/month' },
  PH: { symbol: '₱', amount: '579', currency: 'PHP', label: '₱579/month', cta: 'GET SORTED — ₱579/MONTH', sub: '/ month · cancel anytime', inline: '₱579/month' },
  MY: { symbol: 'RM', amount: '44.99', currency: 'MYR', label: 'RM44.99/month', cta: 'GET SORTED — RM44.99/MONTH', sub: '/ month · cancel anytime', inline: 'RM44.99/month' },
  TH: { symbol: '฿', amount: '349', currency: 'THB', label: '฿349/month', cta: 'GET SORTED — ฿349/MONTH', sub: '/ month · cancel anytime', inline: '฿349/month' },
  ID: { symbol: 'Rp', amount: '159000', currency: 'IDR', label: 'Rp159,000/month', cta: 'GET SORTED — Rp159,000/MONTH', sub: '/ month · cancel anytime', inline: 'Rp159,000/month' },
};

const DEFAULT = GEO_PRICES.GB;

// Detect country from timezone (same logic as Family51.jsx)
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
      'Europe/Paris': 'FR',
      'Europe/Berlin': 'DE',
      'Europe/Madrid': 'ES',
      'Europe/Rome': 'IT',
      'Europe/Amsterdam': 'NL',
      'Asia/Dubai': 'AE',
      'Asia/Kolkata': 'IN',
      'Asia/Singapore': 'SG',
      'Asia/Manila': 'PH',
      'Asia/Kuala_Lumpur': 'MY',
      'Asia/Bangkok': 'TH',
      'Asia/Jakarta': 'ID',
      'Asia/Makassar': 'ID',
      'Asia/Jayapura': 'ID',
      'Africa/Johannesburg': 'ZA',
    };
    return tzMap[tz] || 'GB';
  } catch {
    return 'GB';
  }
}

export function useSortedGeoPrice() {
  const code = detectCountryCode();
  return GEO_PRICES[code] || DEFAULT;
}