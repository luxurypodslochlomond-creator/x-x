// ── A TONGUE HAS TWO NAMES, AND BOTH ARE SHOWN ──
// The record names each tongue in its own words — Cymraeg, Yorùbá, Nāhuatl — because that is
// the tongue's own name for itself, and it is never translated on the page.
//
// Brian, 20 November: "some of the languages are coolasfuck but don't know the name in English
// might be a way to help educate bro". He was right, and the list was doing something worse than
// not teaching: thirty-one tongues had no English name behind them at all. A reader met "Diné
// bizaad" or "Nāhuatl" or "Gaelg" and had no way to learn that those are Navajo, Nahuatl and
// Manx — and no way to search for them either, because the English word was not in the file.
//
// So every tongue on the list now carries its English name, and the list prints it under the
// tongue's own name in small caps. The native name stays first and stays untranslated: it is
// the name the tongue has for itself, and it does not get second billing on its own record.
// The English is there to teach, and to be searched.
//
// Matching ignores accents too. "Francais", "Yoruba", "Maori" are how most people type, and a
// missing accent is not a wrong answer — it is a finger on a phone keyboard. Nothing here is a
// network call: it is a few dozen words in the bundle, which is why it costs the page nothing.

export const TONGUE_EN = {
  en: 'English',
  // The islands this record is written on
  ga: 'Irish',
  gd: 'Scottish Gaelic',
  cy: 'Welsh',
  sco: 'Scots',
  kw: 'Cornish',
  gv: 'Manx',
  br: 'Breton',
  // Europe, and the nations inside it
  es: 'Spanish',
  'es-CO': 'Spanish (Colombia)',
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
  fy: 'West Frisian',
  nds: 'Low German',
  lb: 'Luxembourgish',
  hsb: 'Upper Sorbian',
  dsb: 'Lower Sorbian',
  rm: 'Romansh',
  se: 'Northern Sami',
  fo: 'Faroese',
  kl: 'Greenlandic',
  eu: 'Basque',
  ca: 'Catalan',
  gl: 'Galician',
  oc: 'Occitan',
  sc: 'Sardinian',
  scn: 'Sicilian',
  co: 'Corsican',
  ast: 'Asturian',
  an: 'Aragonese',
  csb: 'Kashubian',
  szl: 'Silesian',
  rue: 'Rusyn',
  ro: 'Romanian',
  hu: 'Hungarian',
  bg: 'Bulgarian',
  sq: 'Albanian',
  sr: 'Serbian',
  hr: 'Croatian',
  bs: 'Bosnian',
  sl: 'Slovenian',
  mk: 'Macedonian',
  be: 'Belarusian',
  lt: 'Lithuanian',
  lv: 'Latvian',
  et: 'Estonian',
  mt: 'Maltese',
  eo: 'Esperanto',
  // The nations inside Russia
  tt: 'Tatar',
  ce: 'Chechen',
  ba: 'Bashkir',
  cv: 'Chuvash',
  sah: 'Sakha (Yakut)',
  os: 'Ossetian',
  av: 'Avar',
  la: 'Latin',
  grc: 'Ancient Greek',
  // West Asia and the Caucasus
  ar: 'Arabic',
  he: 'Hebrew',
  yi: 'Yiddish',
  fa: 'Persian (Farsi)',
  hy: 'Armenian',
  ka: 'Georgian',
  az: 'Azerbaijani',
  ku: 'Kurdish',
  ps: 'Pashto',
  ug: 'Uyghur',
  // Central Asia
  kk: 'Kazakh',
  uz: 'Uzbek',
  ky: 'Kyrgyz',
  tg: 'Tajik',
  tk: 'Turkmen',
  // South Asia
  hi: 'Hindi',
  bn: 'Bengali',
  ta: 'Tamil',
  te: 'Telugu',
  mr: 'Marathi',
  pa: 'Punjabi',
  ur: 'Urdu',
  ne: 'Nepali',
  si: 'Sinhala',
  ml: 'Malayalam',
  kn: 'Kannada',
  gu: 'Gujarati',
  sd: 'Sindhi',
  ks: 'Kashmiri',
  as: 'Assamese',
  or: 'Odia',
  bho: 'Bhojpuri',
  mai: 'Maithili',
  dv: 'Dhivehi',
  // East and South-East Asia
  zh: 'Chinese (Mandarin)',
  'zh-TW': 'Chinese (Traditional)',
  yue: 'Cantonese',
  nan: 'Hokkien',
  ja: 'Japanese',
  ko: 'Korean',
  my: 'Burmese',
  km: 'Khmer',
  lo: 'Lao',
  th: 'Thai',
  vi: 'Vietnamese',
  id: 'Indonesian',
  ms: 'Malay',
  // The label already says Tagalog, so the English name matches it rather than sending a reader
  // who is looking for Tagalog down to the F's. The alphabet has to agree with the row.
  tl: 'Tagalog (Filipino)',
  mn: 'Mongolian',
  bo: 'Tibetan',
  jv: 'Javanese',
  su: 'Sundanese',
  ceb: 'Cebuano',
  hmn: 'Hmong',
  // Africa
  sw: 'Swahili',
  yo: 'Yoruba',
  ig: 'Igbo',
  zu: 'Zulu',
  xh: 'Xhosa',
  sn: 'Shona',
  so: 'Somali',
  am: 'Amharic',
  ha: 'Hausa',
  wo: 'Wolof',
  af: 'Afrikaans',
  om: 'Oromo',
  ti: 'Tigrinya',
  rw: 'Kinyarwanda',
  ln: 'Lingala',
  mg: 'Malagasy',
  bm: 'Bambara',
  ak: 'Akan (Twi)',
  ee: 'Ewe',
  st: 'Sesotho',
  tn: 'Tswana',
  ny: 'Chichewa',
  zgh: 'Tamazight (Berber)',
  // Nigeria beyond the three everybody lists — so a reader who types "Bini" or "Ijaw"
  // finds the tongue it means.
  bin: 'Edo (Bini)',
  urh: 'Urhobo',
  ish: 'Esan (Ishan)',
  efi: 'Efik',
  ibb: 'Ibibio',
  anw: 'Anaang',
  tiv: 'Tiv',
  ijc: 'Ijaw (Izon)',
  kau: 'Kanuri',
  fuv: 'Fula (Fulfulde)',
  nup: 'Nupe',
  igl: 'Igala',
  idu: 'Idoma',
  bom: 'Berom',
  // The Pacific
  haw: 'Hawaiian',
  mi: 'Māori',
  sm: 'Samoan',
  fj: 'Fijian',
  to: 'Tongan',
  tpi: 'Tok Pisin',
  // The Americas
  qu: 'Quechua',
  gn: 'Guarani',
  ay: 'Aymara',
  nah: 'Nahuatl',
  yua: 'Maya (Yucatec)',
  ht: 'Haitian Creole',
  nv: 'Navajo',
  lkt: 'Lakota',
  ojb: 'Ojibwe',
  iu: 'Inuktitut',
  cr: 'Cree',
  moh: 'Mohawk',
  hop: 'Hopi',
  apw: 'Apache',
  chr: 'Cherokee',
  // The ancient world
  egy: 'Ancient Egyptian',
  sux: 'Sumerian',
  akk: 'Akkadian',
  annunaki: 'Annunaki (Sumerian)',
  rongorongo: 'Rongorongo',
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

// ── THE ENGLISH NAME, UNLESS THE TONGUE'S OWN NAME ALREADY SAYS IT ─────────────
// Some tongues carry the English inside their own line — "Ẹdo (Bini)", "Euskara (Basque)" —
// because that is how they were written when the list was smaller. Printing "BASQUE" under
// "Euskara (Basque)" would be the same word twice, so in that case there is no second line.
// Everything else gets one, which is the whole point: a reader who does not know that Gaelg
// is Manx learns it from the list rather than from somewhere else.
export function englishBeside(language) {
  const en = TONGUE_EN[language.code] || '';
  if (!en) return '';
  const head = foldTongue(en.replace(/\(.*?\)/g, ' ').split(/\s+/)[0]);
  return head && foldTongue(language.label).includes(head) ? '' : en;
}