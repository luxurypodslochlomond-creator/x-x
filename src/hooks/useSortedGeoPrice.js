// Localised pricing copy for SORTED — pay once, sorted forever.
// One-off payment. No subscription, no extraction.
// Stripe handles actual currency conversion; this is just the display copy.

const GEO_PRICES = {
  GB: { symbol: '£', amount: '9.99',  currency: 'GBP', label: '£9.99',          cta: 'GET SORTED — £9.99',          sub: 'once · yours forever', inline: '£9.99' },
  IE: { symbol: '€', amount: '9.99',  currency: 'EUR', label: '€9.99',          cta: 'GET SORTED — €9.99',          sub: 'once · yours forever', inline: '€9.99' },
  US: { symbol: '$', amount: '9.99',  currency: 'USD', label: '$9.99',          cta: 'GET SORTED — $9.99',          sub: 'once · yours forever', inline: '$9.99' },
  CA: { symbol: '$', amount: '13.99', currency: 'CAD', label: 'CA$13.99',       cta: 'GET SORTED — CA$13.99',       sub: 'once · yours forever', inline: 'CA$13.99' },
  AU: { symbol: '$', amount: '15.99', currency: 'AUD', label: 'AU$15.99',       cta: 'GET SORTED — AU$15.99',       sub: 'once · yours forever', inline: 'AU$15.99' },
  NZ: { symbol: '$', amount: '17.99', currency: 'NZD', label: 'NZ$17.99',       cta: 'GET SORTED — NZ$17.99',       sub: 'once · yours forever', inline: 'NZ$17.99' },
  ZA: { symbol: 'R', amount: '189',   currency: 'ZAR', label: 'R189',           cta: 'GET SORTED — R189',           sub: 'once · yours forever', inline: 'R189' },
  FR: { symbol: '€', amount: '9.99',  currency: 'EUR', label: '€9.99',          cta: 'GET SORTED — €9.99',          sub: 'once · yours forever', inline: '€9.99' },
  DE: { symbol: '€', amount: '9.99',  currency: 'EUR', label: '€9.99',          cta: 'GET SORTED — €9.99',          sub: 'once · yours forever', inline: '€9.99' },
  ES: { symbol: '€', amount: '9.99',  currency: 'EUR', label: '€9.99',          cta: 'GET SORTED — €9.99',          sub: 'once · yours forever', inline: '€9.99' },
  IT: { symbol: '€', amount: '9.99',  currency: 'EUR', label: '€9.99',          cta: 'GET SORTED — €9.99',          sub: 'once · yours forever', inline: '€9.99' },
  NL: { symbol: '€', amount: '9.99',  currency: 'EUR', label: '€9.99',          cta: 'GET SORTED — €9.99',          sub: 'once · yours forever', inline: '€9.99' },
  AE: { symbol: '$', amount: '9.99',  currency: 'USD', label: '$9.99',          cta: 'GET SORTED — $9.99',          sub: 'once · yours forever', inline: '$9.99' },
  IN: { symbol: '₹', amount: '849',   currency: 'INR', label: '₹849',           cta: 'GET SORTED — ₹849',           sub: 'once · yours forever', inline: '₹849' },
  SG: { symbol: '$', amount: '13.99', currency: 'SGD', label: 'SG$13.99',       cta: 'GET SORTED — SG$13.99',       sub: 'once · yours forever', inline: 'SG$13.99' },
  PH: { symbol: '₱', amount: '579',   currency: 'PHP', label: '₱579',           cta: 'GET SORTED — ₱579',           sub: 'once · yours forever', inline: '₱579' },
  MY: { symbol: 'RM', amount: '44.99', currency: 'MYR', label: 'RM44.99',       cta: 'GET SORTED — RM44.99',       sub: 'once · yours forever', inline: 'RM44.99' },
  TH: { symbol: '฿', amount: '349',   currency: 'THB', label: '฿349',           cta: 'GET SORTED — ฿349',           sub: 'once · yours forever', inline: '฿349' },
  ID: { symbol: 'Rp', amount: '159000', currency: 'IDR', label: 'Rp159,000',   cta: 'GET SORTED — Rp159,000',     sub: 'once · yours forever', inline: 'Rp159,000' },
};

const DEFAULT = GEO_PRICES.GB;

// Detect country from timezone
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