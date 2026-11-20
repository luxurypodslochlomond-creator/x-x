// ── A TONGUE HAS TWO NAMES, AND BOTH OPEN IT ──
// The record names each tongue in its own words — Français, Yorùbá, Cymraeg — because that is
// the tongue's own name for itself, and it is never translated on the page. But a reader who
// knows it as "French" is not asking for something different: they are asking for the same
// tongue in the word they have. So the English name is carried beside it, for the search only.
// The list still shows Français; typing either one finds it.
//
// Matching ignores accents too. "Francais", "Yoruba", "Maori" are how most people type, and a
// missing accent is not a wrong answer — it is a finger on a phone keyboard. Nothing here is a
// network call: it is a few dozen words in the bundle, which is why it costs the page nothing.

export const TONGUE_EN = {
  en: 'English',
  ga: 'Irish',
  gd: 'Scottish Gaelic',
  cy: 'Welsh',
  sco: 'Scots',
  br: 'Breton',
  kw: 'Cornish',
  es: 'Spanish',
  'es-CO': 'Spanish Colombia',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese',
  it: 'Italian',
  nl: 'Dutch',
  sv: 'Swedish',
  no: 'Norwegian',
  da: 'Danish',
  fi: 'Finnish',
  is: 'Icelandic',
  pl: 'Polish',
  cs: 'Czech',
  sk: 'Slovak',
  uk: 'Ukrainian',
  ru: 'Russian',
  el: 'Greek',
  tr: 'Turkish',
  ar: 'Arabic',
  he: 'Hebrew',
  fa: 'Persian Farsi',
  hi: 'Hindi',
  bn: 'Bengali',
  ta: 'Tamil',
  te: 'Telugu',
  mr: 'Marathi',
  pa: 'Punjabi',
  ur: 'Urdu',
  th: 'Thai',
  vi: 'Vietnamese',
  id: 'Indonesian',
  ms: 'Malay',
  tl: 'Filipino Tagalog',
  zh: 'Chinese simplified Mandarin',
  'zh-TW': 'Chinese traditional',
  ja: 'Japanese',
  ko: 'Korean',
  sw: 'Swahili',
  yo: 'Yoruba',
  ig: 'Igbo',
  tt: 'Tatar',
  ce: 'Chechen',
  ba: 'Bashkir',
  cv: 'Chuvash',
  sah: 'Sakha',
  os: 'Ossetian',
  av: 'Avar',
  kk: 'Kazakh',
  uz: 'Uzbek',
  az: 'Azerbaijani',
  ky: 'Kyrgyz',
  tg: 'Tajik',
  tk: 'Turkmen',
  yi: 'Yiddish',
  yue: 'Cantonese',
  nan: 'Hokkien',
  // Nigeria beyond the three everybody lists — the English names are here for the search only,
  // so a reader who types "Bini" or "Ijaw" finds the tongue it means.
  bin: 'Edo Bini Benin',
  urh: 'Urhobo',
  ish: 'Esan Ishan',
  efi: 'Efik',
  ibb: 'Ibibio',
  anw: 'Anaang Annang',
  tiv: 'Tiv',
  ijc: 'Ijaw Izon',
  kau: 'Kanuri',
  fuv: 'Fulfulde Fula',
  nup: 'Nupe',
  igl: 'Igala',
  idu: 'Idoma',
  bom: 'Berom Birom',
  zu: 'Zulu',
  am: 'Amharic',
  ha: 'Hausa',
  qu: 'Quechua',
  gn: 'Guarani',
  haw: 'Hawaiian',
  mi: 'Maori',
  sm: 'Samoan',
  fj: 'Fijian',
  chr: 'Cherokee Tsalagi',
  la: 'Latin',
  grc: 'Ancient Greek',
  egy: 'Ancient Egyptian hieroglyphs',
  sux: 'Sumerian cuneiform',
  akk: 'Akkadian cuneiform',
  annunaki: 'Annunaki Sumerian',
  rongorongo: 'Rongorongo Easter Island',
};

// Accents off, case off — so a phone keyboard without é still finds Français.
export function foldTongue(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// Does this tongue answer to what the reader typed? Either of its names, in any accent.
export function tongueMatches(language, typed) {
  const q = foldTongue(typed);
  if (!q) return true;
  return (
    foldTongue(language.label).includes(q) ||
    foldTongue(language.code).includes(q) ||
    // `|| ''` matters: a tongue with no English name beside it would otherwise be compared
    // against the string "undefined", so typing a single "u" found half the forgotten list.
    foldTongue(TONGUE_EN[language.code] || '').includes(q)
  );
}

// Anything typed that is already a tongue on the list — by either name — is taken as that
// tongue, so "french" chosen from the free-typing box lands on the kept list, not a new tongue.
export function languageFromTyped(text, languages) {
  const q = foldTongue(text);
  if (!q) return null;
  const exact = languages.find(
    (l) => foldTongue(l.label) === q || foldTongue(l.code) === q || foldTongue(TONGUE_EN[l.code] || '') === q
  );
  if (exact) return exact.code;
  const loose = languages.find((l) => tongueMatches(l, q));
  return loose ? loose.code : null;
}