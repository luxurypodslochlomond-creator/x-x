// Detect user's country/jurisdiction based on browser timezone and locale
export function detectGeo() {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = navigator.language || 'en-US';
    
    // Map timezones to countries
    const tzMap = {
      'Europe/London': { country: 'United Kingdom', jurisdiction: 'UK law', code: 'GB' },
      'Europe/Dublin': { country: 'Ireland', jurisdiction: 'Irish law', code: 'IE' },
      'Europe/Paris': { country: 'France', jurisdiction: 'French law', code: 'FR' },
      'Europe/Berlin': { country: 'Germany', jurisdiction: 'German law', code: 'DE' },
      'America/New_York': { country: 'USA (Eastern)', jurisdiction: 'US federal & state law', code: 'US-NY' },
      'America/Chicago': { country: 'USA (Central)', jurisdiction: 'US federal & state law', code: 'US-IL' },
      'America/Denver': { country: 'USA (Mountain)', jurisdiction: 'US federal & state law', code: 'US-CO' },
      'America/Los_Angeles': { country: 'USA (Pacific)', jurisdiction: 'US federal & state law', code: 'US-CA' },
      'Australia/Sydney': { country: 'Australia', jurisdiction: 'Australian law', code: 'AU' },
      'Australia/Melbourne': { country: 'Australia', jurisdiction: 'Australian law', code: 'AU' },
      'Asia/Tokyo': { country: 'Japan', jurisdiction: 'Japanese law', code: 'JP' },
      'Asia/Singapore': { country: 'Singapore', jurisdiction: 'Singapore law', code: 'SG' },
      'Asia/Hong_Kong': { country: 'Hong Kong', jurisdiction: 'Hong Kong law', code: 'HK' },
      'Asia/Dubai': { country: 'UAE', jurisdiction: 'UAE law', code: 'AE' },
      'Europe/Amsterdam': { country: 'Netherlands', jurisdiction: 'Dutch law', code: 'NL' },
      'Europe/Stockholm': { country: 'Sweden', jurisdiction: 'Swedish law', code: 'SE' },
      'Europe/Madrid': { country: 'Spain', jurisdiction: 'Spanish law', code: 'ES' },
      'Europe/Rome': { country: 'Italy', jurisdiction: 'Italian law', code: 'IT' },
      'Europe/Athens': { country: 'Greece', jurisdiction: 'Greek law', code: 'GR' },
      'Europe/Brussels': { country: 'Belgium', jurisdiction: 'Belgian law', code: 'BE' },
      'Europe/Vienna': { country: 'Austria', jurisdiction: 'Austrian law', code: 'AT' },
      'Europe/Prague': { country: 'Czech Republic', jurisdiction: 'Czech law', code: 'CZ' },
      'Europe/Warsaw': { country: 'Poland', jurisdiction: 'Polish law', code: 'PL' },
      'Europe/Zurich': { country: 'Switzerland', jurisdiction: 'Swiss law', code: 'CH' },
      'Canada/Eastern': { country: 'Canada (Eastern)', jurisdiction: 'Canadian law', code: 'CA-ON' },
      'Canada/Mountain': { country: 'Canada (Mountain)', jurisdiction: 'Canadian law', code: 'CA-AB' },
      'Canada/Pacific': { country: 'Canada (Pacific)', jurisdiction: 'Canadian law', code: 'CA-BC' },
      'Pacific/Auckland': { country: 'New Zealand', jurisdiction: 'New Zealand law', code: 'NZ' },
      'Africa/Johannesburg': { country: 'South Africa', jurisdiction: 'South African law', code: 'ZA' },
      'Asia/Kolkata': { country: 'India', jurisdiction: 'Indian law', code: 'IN' },
      'Asia/Bangkok': { country: 'Thailand', jurisdiction: 'Thai law', code: 'TH' },
    };

    return tzMap[timezone] || {
      country: locale.includes('en-GB') ? 'United Kingdom' : 'International',
      jurisdiction: locale.includes('en-GB') ? 'UK law' : 'International law',
      code: locale.split('-')[1] || 'INT'
    };
  } catch (error) {
    return { country: 'International', jurisdiction: 'International law', code: 'INT' };
  }
}

export default detectGeo;