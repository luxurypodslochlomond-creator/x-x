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
      'America/Toronto': { country: 'Canada (Eastern)', jurisdiction: 'Canadian law', code: 'CA-ON' },
      'America/Vancouver': { country: 'Canada (Pacific)', jurisdiction: 'Canadian law', code: 'CA-BC' },
      'America/Edmonton': { country: 'Canada (Mountain)', jurisdiction: 'Canadian law', code: 'CA-AB' },
      'America/Winnipeg': { country: 'Canada (Central)', jurisdiction: 'Canadian law', code: 'CA-MB' },
      'America/Halifax': { country: 'Canada (Atlantic)', jurisdiction: 'Canadian law', code: 'CA-NS' },
      'Europe/Moscow': { country: 'Russia', jurisdiction: 'Russian law', code: 'RU' },
      'Asia/Yekaterinburg': { country: 'Russia', jurisdiction: 'Russian law', code: 'RU' },
      'Pacific/Auckland': { country: 'New Zealand', jurisdiction: 'New Zealand law', code: 'NZ' },
      'Africa/Johannesburg': { country: 'South Africa', jurisdiction: 'South African law', code: 'ZA' },
      'Asia/Kolkata': { country: 'India', jurisdiction: 'Indian law', code: 'IN' },
      'Asia/Bangkok': { country: 'Thailand', jurisdiction: 'Thai law', code: 'TH' },
      'Asia/Manila': { country: 'Philippines', jurisdiction: 'Philippine law', code: 'PH' },
      'Asia/Makassar': { country: 'Indonesia', jurisdiction: 'Indonesian law', code: 'ID' },
      'Asia/Jakarta': { country: 'Indonesia', jurisdiction: 'Indonesian law', code: 'ID' },
      'Asia/Kuala_Lumpur': { country: 'Malaysia', jurisdiction: 'Malaysian law', code: 'MY' },
      'Asia/Ho_Chi_Minh': { country: 'Vietnam', jurisdiction: 'Vietnamese law', code: 'VN' },
      'Asia/Seoul': { country: 'South Korea', jurisdiction: 'South Korean law', code: 'KR' },
      'Asia/Shanghai': { country: 'China', jurisdiction: 'Chinese law', code: 'CN' },
      'America/Sao_Paulo': { country: 'Brazil', jurisdiction: 'Brazilian law', code: 'BR' },
      'America/Mexico_City': { country: 'Mexico', jurisdiction: 'Mexican law', code: 'MX' },
      'America/Buenos_Aires': { country: 'Argentina', jurisdiction: 'Argentine law', code: 'AR' },
      'America/Bogota': { country: 'Colombia', jurisdiction: 'Colombian law', code: 'CO' },
      'Europe/Istanbul': { country: 'Turkey', jurisdiction: 'Turkish law', code: 'TR' },
      'Africa/Lagos': { country: 'Nigeria', jurisdiction: 'Nigerian law', code: 'NG' },
      'Africa/Nairobi': { country: 'Kenya', jurisdiction: 'Kenyan law', code: 'KE' },
    };

    // Also try locale-based detection as fallback
    const localeFallbacks = {
      'en-PH': { country: 'Philippines', jurisdiction: 'Philippine law', code: 'PH' },
      'en-GB': { country: 'United Kingdom', jurisdiction: 'UK law', code: 'GB' },
      'en-AU': { country: 'Australia', jurisdiction: 'Australian law', code: 'AU' },
      'en-CA': { country: 'Canada', jurisdiction: 'Canadian law', code: 'CA' },
      'en-NZ': { country: 'New Zealand', jurisdiction: 'New Zealand law', code: 'NZ' },
      'en-IN': { country: 'India', jurisdiction: 'Indian law', code: 'IN' },
      'en-SG': { country: 'Singapore', jurisdiction: 'Singapore law', code: 'SG' },
    };

    return tzMap[timezone] || localeFallbacks[locale] || {
      country: 'International',
      jurisdiction: 'General international principles',
      code: 'INT'
    };
  } catch (error) {
    return { country: 'International', jurisdiction: 'International law', code: 'INT' };
  }
}

export default detectGeo;