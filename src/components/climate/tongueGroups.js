// ── A HUNDRED AND EIGHTY-NINE TONGUES NEED SOMEWHERE TO STAND ───────────────────
// The list grew past a hundred and twenty on 20 November and was still one flat scroll in the
// order the tongues happened to be added — Celtic, then Europe, then Asia, then a block for
// Nigeria, then the Pacific, then the ancient world. Nobody could find anything in it by eye,
// and the order told a story about the person who typed it rather than about the world.
//
// So the tongues are grouped by where they are spoken, in the plainest words that are true.
// Nothing here decides how many speakers a tongue has or how official it is: a group is a
// place, and every tongue in it stands at the same height as every other. Wales is not below
// France in this list and Oromo is not below Arabic.
//
// The codes below are MEMBERSHIP, not order. Where a tongue stands inside its place is decided
// once, by the alphabet, in TonguePickerList — so nobody has to keep these lists sorted by hand
// and no tongue moves when one is added. The order of the groups themselves is home first, then
// outwards: the islands this record is written on, then the rest of the world. That is a
// courtesy of place, never a rank — no group is above another because of size, wealth or power.
//
// Two rules, and both are kept deliberately:
//   1. Every tongue in LANGS appears exactly once. tongueGroups.test.mjs checks it, so a tongue
//      added later without a home is caught rather than silently dropped from the panel.
//   2. Any tongue the groups have missed still renders, at the end, under "Every other tongue".
//      A reader never loses a tongue because somebody forgot to file it.
//
// The English names are not here. They live in tongueNames.js, printed under each tongue's own
// name, which is where the teaching happens.
export const TONGUE_GROUPS = [
  {
    key: 'own',
    title: 'The record’s own tongue',
    codes: ['en'],
  },
  {
    key: 'islands',
    title: 'The islands this record is written on',
    codes: ['ga', 'gd', 'cy', 'sco', 'kw', 'gv'],
  },
  {
    key: 'europe',
    title: 'Europe, and the nations inside it',
    codes: [
      'fr', 'de', 'es', 'es-CO', 'pt', 'it', 'nl', 'sv', 'no', 'da', 'fi', 'is',
      'pl', 'cs', 'sk', 'hu', 'ro', 'bg', 'el', 'tr', 'br', 'eu', 'ca', 'gl',
      'fy', 'nds', 'lb', 'hsb', 'dsb', 'rm', 'se', 'fo', 'kl',
      'oc', 'sc', 'scn', 'co', 'ast', 'an', 'csb', 'szl', 'rue',
      'sq', 'sr', 'hr', 'bs', 'sl', 'mk', 'be', 'lt', 'lv', 'et', 'mt', 'eo',
      'uk',
    ],
  },
  {
    key: 'russia',
    title: 'The nations inside Russia',
    codes: ['ru', 'tt', 'ce', 'ba', 'cv', 'sah', 'os', 'av'],
  },
  {
    key: 'west-asia',
    title: 'West Asia and the Caucasus',
    codes: ['ar', 'he', 'yi', 'fa', 'hy', 'ka', 'az', 'ku', 'ps', 'ug'],
  },
  {
    key: 'central-asia',
    title: 'Central Asia',
    codes: ['kk', 'uz', 'ky', 'tg', 'tk'],
  },
  {
    key: 'south-asia',
    title: 'South Asia',
    codes: ['hi', 'bn', 'ta', 'te', 'mr', 'pa', 'ur', 'ne', 'si', 'ml', 'kn', 'gu', 'sd', 'ks', 'as', 'or', 'bho', 'mai', 'dv'],
  },
  {
    key: 'east-asia',
    title: 'East and South-East Asia',
    codes: ['zh', 'zh-TW', 'yue', 'nan', 'ja', 'ko', 'my', 'km', 'lo', 'th', 'vi', 'id', 'ms', 'tl', 'mn', 'bo', 'jv', 'su', 'ceb', 'hmn'],
  },
  {
    key: 'africa',
    title: 'Africa',
    codes: [
      'sw', 'yo', 'ig', 'ha', 'zu', 'xh', 'sn', 'so', 'am', 'wo',
      'bin', 'fon', 'urh', 'ish', 'efi', 'ibb', 'anw', 'tiv', 'ijc', 'kau', 'fuv',
      'nup', 'igl', 'idu', 'bom',
      'af', 'om', 'ti', 'rw', 'ln', 'mg', 'bm', 'ak', 'ee', 'st', 'tn', 'ny', 'zgh',
    ],
  },
  {
    key: 'pacific',
    title: 'The Pacific',
    codes: ['haw', 'mi', 'sm', 'fj', 'to', 'tpi'],
  },
  {
    key: 'americas',
    title: 'The Americas',
    codes: ['qu', 'gn', 'ay', 'nah', 'yua', 'ht', 'nv', 'lkt', 'ojb', 'iu', 'cr', 'moh', 'hop', 'apw', 'chr'],
  },
  {
    key: 'ancient',
    title: 'The ancient world',
    codes: ['la', 'grc', 'egy', 'sux', 'akk', 'annunaki', 'rongorongo'],
  },
];