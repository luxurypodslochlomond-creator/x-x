/**
 * Geo-specific helpline data for SORTED "Need a human" section.
 * Every number carries a source URL and the date it was last checked, so the
 * list is auditable. The AI is hard-constrained to only ever cite numbers from
 * this list (see sortedPrompts.js) — it must never invent one.
 * If a country isn't listed, we show a generic fallback directing to local services.
 */

const VERIFIED_ON = '2026-07-31';

const HELPLINES = {
  GB: {
    label: 'England & Wales',
    services: [
      { name: 'Citizens Advice', desc: 'Debt, housing, benefits', phone: '0800 144 8848', source: 'citizensadvice.org.uk' },
      { name: 'National Debtline', desc: 'Free debt advice', phone: '0808 808 4000', source: 'nationaldebtline.org' },
      { name: 'Shelter (England)', desc: 'Housing, eviction, homelessness', phone: '0808 800 4444', source: 'england.shelter.org.uk' },
      { name: 'StepChange', desc: 'Free debt management plans', phone: '0800 138 1111', source: 'stepchange.org' },
      { name: 'MoneyHelper', desc: 'UK government-backed money guidance', phone: '0800 138 7777', source: 'moneyhelper.org.uk' },
    ],
  },
  SCOTLAND: {
    label: 'Scotland',
    services: [
      { name: 'Citizens Advice Scotland', desc: 'Advice for Scotland', phone: '0800 028 1456', source: 'cas.org.uk' },
      { name: 'National Debtline (Scotland)', desc: 'Free debt advice', phone: '0808 808 4000', source: 'nationaldebtline.org' },
      { name: 'Shelter Scotland', desc: 'Housing & homelessness', phone: '0808 800 4444', source: 'scotland.shelter.org.uk' },
      { name: 'StepChange', desc: 'Free debt management plans', phone: '0800 138 1111', source: 'stepchange.org' },
      { name: 'MoneyHelper', desc: 'UK government-backed money guidance', phone: '0800 138 7777', source: 'moneyhelper.org.uk' },
    ],
  },
  NI: {
    label: 'Northern Ireland',
    services: [
      { name: 'Advice NI', desc: 'Free advice across NI', phone: '0800 028 1881', source: 'adviceni.net' },
      { name: 'Housing Rights', desc: 'Housing & homelessness NI', phone: '028 9024 5640', source: 'housingrights.org.uk' },
      { name: 'National Debtline (NI)', desc: 'Free debt advice', phone: '0808 808 4000', source: 'nationaldebtline.org' },
      { name: 'StepChange', desc: 'Free debt management plans', phone: '0800 138 1111', source: 'stepchange.org' },
    ],
  },
  IE: {
    label: 'Ireland-based',
    services: [
      { name: 'MABS', desc: 'Money advice & budgeting', phone: '0818 07 2000', source: 'mabs.ie' },
      { name: 'Citizens Information', desc: 'Rights & entitlements', phone: '0818 07 4000', source: 'citizensinformation.ie' },
      { name: 'Threshold', desc: 'Housing & tenant rights', phone: '1800 454 454', source: 'threshold.ie' },
      { name: 'Legal Aid Board', desc: 'Free legal advice', phone: '0818 615 200', source: 'legalaidboard.ie' },
    ],
  },
  US: {
    label: 'US-based',
    services: [
      { name: '211', desc: 'Free community & social services', phone: '211', source: '211.org' },
      { name: 'NFCC', desc: 'Credit counselling & debt help', phone: '800 388 2227', source: 'nfcc.org' },
      { name: 'HUD Housing', desc: 'Housing & homelessness', phone: '800 569 4287', source: 'hud.gov' },
    ],
  },
  AU: {
    label: 'Australia-based',
    services: [
      { name: 'National Debt Helpline', desc: 'Free financial counselling', phone: '1800 007 007', source: 'ndh.org.au' },
      { name: 'Lifeline', desc: 'Crisis support', phone: '13 11 14', source: 'lifeline.org.au' },
      { name: '1800 RESPECT', desc: 'Domestic & family violence support', phone: '1800 737 732', source: '1800respect.org.au' },
    ],
  },
  CA: {
    label: 'Canada-based',
    services: [
      { name: '211', desc: 'Free community & social services', phone: '211', source: '211.ca' },
      { name: 'CMHC', desc: 'Housing information', phone: '800 668 2642', source: 'cmhc-schl.gc.ca' },
    ],
  },
  NZ: {
    label: 'New Zealand-based',
    services: [
      { name: 'Citizens Advice Bureau', desc: 'Free advice & support', phone: '0800 367 222', source: 'cab.org.nz' },
      { name: 'MoneyTalks', desc: 'Free budgeting help', phone: '0800 345 123', source: 'moneytalks.org.nz' },
    ],
  },
};

/**
 * Compact verified-helpline context injected into the AI prompt.
 * The AI is told to ONLY cite numbers from this list and never invent one.
 */
export function getVerifiedHelplineContext(code) {
  const entry = HELPLINES[code] || HELPLINES.GB;
  const lines = entry.services.map(s => `  - ${s.name}: ${s.phone} (${s.desc})`).join('\n');
  return `VERIFIED HELPLINES (${entry.label}) — last checked ${VERIFIED_ON} against each organisation's official website. You may ONLY cite phone numbers from this list. NEVER invent, guess, or hallucinate a phone number. If the person needs a service not listed here, say "See the Need a human list below" and give NO number:\n${lines}`;
}

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

export function getHelplines(overrideCode) {
  const code = overrideCode || detectCountryCode();
  if (code && HELPLINES[code]) {
    return { ...HELPLINES[code], country: code, verifiedOn: VERIFIED_ON };
  }
  return {
    country: null,
    label: 'Find your local service',
    services: [],
    isFallback: true,
    verifiedOn: VERIFIED_ON,
  };
}