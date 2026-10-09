// Country & region centroids — privacy-respecting rough mapping
// Keys are lowercase for fuzzy matching. No precise coordinates stored.

export const COUNTRY_CENTROIDS = {
  // — Major nations —
  'united states': [39.8, -98.5], 'usa': [39.8, -98.5], 'us': [39.8, -98.5], 'america': [39.8, -98.5],
  'united kingdom': [54.6, -3.4], 'uk': [54.6, -3.4], 'britain': [54.6, -3.4], 'england': [52.3, -1.2],
  'scotland': [56.5, -4.0], 'wales': [52.3, -3.6], 'northern ireland': [54.6, -6.7],
  'ireland': [53.1, -7.7], 'france': [46.6, 2.4], 'germany': [51.2, 10.4],
  'spain': [40.5, -3.7], 'portugal': [39.5, -8.2], 'italy': [42.5, 12.6],
  'netherlands': [52.1, 5.3], 'belgium': [50.6, 4.7], 'switzerland': [46.8, 8.2],
  'austria': [47.5, 14.5], 'czech republic': [49, 15.5], 'czechia': [49, 15.5],
  'poland': [51.9, 19.1], 'denmark': [56.3, 9.5], 'norway': [64.5, 11.0],
  'sweden': [62.0, 15.0], 'finland': [61.9, 25.7], 'iceland': [64.9, -19.0],
  'greece': [39.0, 21.8], 'turkey': [38.9, 35.2], 'cyprus': [35.1, 33.4],
  'russia': [61.5, 105.3], 'ukraine': [48.9, 31.1], 'belarus': [53.7, 27.9],
  'lithuania': [55.2, 23.9], 'latvia': [56.8, 24.6], 'estonia': [58.6, 25.0],
  'romania': [45.9, 24.9], 'bulgaria': [42.7, 25.5], 'hungary': [47.2, 19.5],
  'serbia': [44.0, 21.0], 'croatia': [45.1, 15.2], 'slovenia': [46.2, 14.9],
  'slovakia': [48.7, 19.7], 'bosnia': [43.9, 17.7], 'albania': [41.2, 20.2],
  'moldova': [47.4, 28.4], 'macedonia': [41.6, 21.7], 'north macedonia': [41.6, 21.7],
  'montenegro': [42.7, 19.4], 'kosovo': [42.6, 20.9],

  // — Asia —
  'china': [35.0, 104.0], 'japan': [36.2, 138.2], 'south korea': [35.9, 127.8], 'korea': [35.9, 127.8],
  'north korea': [40.3, 127.5], 'india': [22.6, 78.9], 'pakistan': [30.4, 69.3],
  'bangladesh': [23.7, 90.4], 'sri lanka': [7.9, 80.8], 'nepal': [28.4, 84.1],
  'bhutan': [27.5, 90.4], 'myanmar': [21.9, 95.9], 'thailand': [15.9, 100.9],
  'laos': [19.9, 102.5], 'cambodia': [12.6, 104.9], 'vietnam': [14.1, 108.3],
  'malaysia': [4.2, 109.7], 'singapore': [1.35, 103.8], 'indonesia': [-2.5, 118.0],
  'philippines': [12.9, 121.8], 'brunei': [4.5, 114.7], 'timor-leste': [-8.9, 125.7],
  'afghanistan': [33.9, 67.0], 'iran': [32.4, 53.7], 'iraq': [33.2, 43.7],
  'syria': [34.8, 38.9], 'lebanon': [33.9, 35.9], 'jordan': [30.6, 36.2],
  'israel': [31.0, 34.9], 'palestine': [31.9, 35.2], 'saudi arabia': [23.9, 45.1],
  'yemen': [15.6, 48.5], 'oman': [21.5, 55.9], 'uae': [23.4, 53.8], 'united arab emirates': [23.4, 53.8],
  'qatar': [25.4, 51.2], 'bahrain': [26.1, 50.6], 'kuwait': [29.3, 47.5],
  'georgia': [42.3, 43.4], 'armenia': [40.1, 45.0], 'azerbaijan': [40.1, 47.6],
  'kazakhstan': [48.0, 66.9], 'uzbekistan': [41.4, 64.6], 'turkmenistan': [38.97, 59.6],
  'kyrgyzstan': [41.2, 74.8], 'tajikistan': [38.9, 71.3], 'mongolia': [46.9, 103.8],
  'taiwan': [23.7, 121.0], 'hong kong': [22.3, 114.2],

  // — Africa —
  'egypt': [26.8, 30.8], 'libya': [27.0, 17.0], 'tunisia': [33.9, 9.5],
  'algeria': [28.0, 1.7], 'morocco': [31.8, -7.1], 'sudan': [12.9, 30.2],
  'south sudan': [6.9, 31.3], 'ethiopia': [9.1, 40.5], 'eritrea': [15.2, 39.8],
  'djibouti': [11.8, 42.6], 'somalia': [5.2, 46.2], 'kenya': [-0.5, 37.9],
  'uganda': [1.4, 32.3], 'tanzania': [-6.4, 34.9], 'rwanda': [-1.9, 29.9],
  'burundi': [-3.4, 29.9], 'dr congo': [-4.0, 21.8], 'congo': [-0.7, 15.8],
  'central african republic': [6.6, 20.9], 'chad': [15.5, 18.5], 'cameroon': [3.9, 11.5],
  'nigeria': [9.1, 8.7], 'niger': [17.6, 9.4], 'mali': [17.6, -4.0],
  'burkina faso': [12.2, -1.6], 'senegal': [14.5, -14.5], 'gambia': [13.4, -15.3],
  'guinea': [9.9, -9.7], 'guinea-bissau': [12.0, -15.0], 'sierra leone': [8.5, -11.8],
  'liberia': [6.4, -9.4], 'ivory coast': [7.5, -5.5], "côte d'ivoire": [7.5, -5.5],
  'ghana': [7.9, -1.0], 'togo': [8.6, 0.8], 'benin': [9.3, 2.3],
  'mauritania': [21.0, -10.9], 'western sahara': [24.2, -12.9],
  'gabon': [-0.8, 11.6], 'equatorial guinea': [1.7, 10.3], 'sao tome': [0.2, 6.7],
  'angola': [-11.2, 17.9], 'zambia': [-13.1, 27.8], 'zimbabwe': [-19.0, 29.2],
  'malawi': [-13.2, 34.3], 'mozambique': [-18.7, 35.5], 'namibia': [-22.0, 16.9],
  'botswana': [-22.3, 24.7], 'south africa': [-30.6, 22.9], 'lesotho': [-29.6, 28.2],
  'eswatini': [-26.5, 31.5], 'swaziland': [-26.5, 31.5],
  'madagascar': [-18.8, 47.0], 'mauritius': [-20.3, 57.6], 'seychelles': [-4.7, 55.5],
  'comoros': [-11.6, 43.4], 'cape verde': [16.0, -24.0],

  // — Americas —
  'canada': [56.1, -106.3], 'mexico': [23.6, -102.5],
  'guatemala': [15.8, -90.2], 'belize': [17.2, -88.5], 'honduras': [15.2, -86.2],
  'el salvador': [13.7, -88.9], 'nicaragua': [12.9, -85.2], 'costa rica': [9.7, -83.8],
  'panama': [8.5, -80.8], 'cuba': [21.5, -77.8], 'jamaica': [18.1, -77.3],
  'haiti': [18.9, -72.3], 'dominican republic': [18.7, -70.7], 'puerto rico': [18.2, -66.6],
  'bahamas': [25.0, -77.4], 'barbados': [13.2, -59.5], 'trinidad': [10.7, -61.2],
  'trinidad and tobago': [10.7, -61.2], 'grenada': [12.1, -61.7], 'dominica': [15.4, -61.4],
  'saint lucia': [13.9, -61.0], 'saint vincent': [13.2, -61.2], 'antigua': [17.0, -61.8],
  'colombia': [4.6, -74.3], 'venezuela': [6.4, -66.6], 'guyana': [4.9, -58.9],
  'suriname': [3.9, -56.0], 'ecuador': [-1.8, -78.2], 'peru': [-9.2, -75.0],
  'brazil': [-14.2, -51.9], 'bolivia': [-16.3, -63.6], 'paraguay': [-23.4, -58.4],
  'uruguay': [-32.5, -55.8], 'argentina': [-38.4, -63.6], 'chile': [-35.7, -71.5],

  // — Oceania —
  'australia': [-25.3, 133.8], 'new zealand': [-40.9, 174.9], 'fiji': [-16.6, 179.0],
  'papua new guinea': [-6.3, 143.9], 'solomon islands': [-9.4, 160.0],
  'vanuatu': [-16.4, 167.0], 'samoa': [-8.5, 173.0], 'tonga': [-21.2, -175.2],
  'kiribati': [1.8, -157.4], 'tuvalu': [-7.5, 178.0], 'nauru': [-0.5, 166.9],
  'palau': [7.5, 134.6], 'marshall islands': [7.1, 171.2], 'micronesia': [7.4, 150.6],

  // — Antarctica —
  'antarctica': [-82.9, 135.0],

  // — Common aliases —
  'great britain': [54.6, -3.4], 'holland': [52.1, 5.3], 'burkina': [12.2, -1.6],
  'cote d ivoire': [7.5, -5.5],
  'burma': [21.9, 95.9], 'viet nam': [14.1, 108.3],
};

export const REGION_CENTROIDS = {
  'europe': [50.0, 10.0], 'western europe': [47.0, 2.0],
  'eastern europe': [50.0, 30.0], 'northern europe': [60.0, 15.0],
  'southern europe': [42.0, 12.0],
  'africa': [0.0, 20.0], 'west africa': [8.0, -5.0], 'east africa': [-2.0, 35.0],
  'north africa': [25.0, 10.0], 'southern africa': [-20.0, 25.0],
  'sub-saharan africa': [5.0, 20.0],
  'asia': [40.0, 100.0], 'south asia': [22.0, 78.0], 'east asia': [35.0, 115.0],
  'southeast asia': [5.0, 110.0], 'central asia': [45.0, 70.0],
  'middle east': [29.0, 45.0], 'gulf': [25.0, 50.0],
  'north america': [45.0, -100.0], 'south america': [-15.0, -60.0],
  'central america': [15.0, -87.0], 'caribbean': [18.0, -75.0],
  'latin america': [-10.0, -65.0],
  'oceania': [-25.0, 140.0], 'pacific': [-10.0, 160.0],
  'arctic': [78.0, 15.0], 'amazon': [-5.0, -60.0],
  'sahel': [15.0, 5.0], 'horn of africa': [8.0, 42.0],
  'scandinavia': [63.0, 15.0], 'balkans': [42.0, 21.0],
  'caucasus': [42.0, 44.0], 'baltic': [57.0, 24.0],
};

export function resolveCoords(country, region) {
  const norm = (s) => (s || '').toString().trim().toLowerCase();
  const c = norm(country);
  const r = norm(region);

  if (c && COUNTRY_CENTROIDS[c]) return COUNTRY_CENTROIDS[c];
  if (r && COUNTRY_CENTROIDS[r]) return COUNTRY_CENTROIDS[r];
  if (r && REGION_CENTROIDS[r]) return REGION_CENTROIDS[r];
  if (c && REGION_CENTROIDS[c]) return REGION_CENTROIDS[c];

  // Partial country match
  if (c) {
    for (const key of Object.keys(COUNTRY_CENTROIDS)) {
      if (key.includes(c) || c.includes(key)) return COUNTRY_CENTROIDS[key];
    }
  }
  return null;
}