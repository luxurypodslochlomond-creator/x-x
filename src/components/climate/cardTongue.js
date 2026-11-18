import { base44 } from '@/api/base44Client';

// ── THE CARD SPEAKS THE READER'S TONGUE ───────────────────────────────────────
// A card is the part of the record that travels furthest from it: it lands in a chat in a
// language nobody chose for it. So the words drawn into the picture are read in the tongue
// the reader has already picked on the record — the same dictionary the page itself uses,
// so a tongue already made on the page is there the moment the card is drawn, and the card
// only ever adds the few words the page never showed.
//
// What is asked for is the record's own fixed copy, never anything a reader typed, so
// nothing of theirs leaves their device to make a card. A tongue that cannot be made
// leaves the record's own words in place: a card in English is better than no card.

const LANG_KEY = 'climate51_lang';
const RTL = new Set(['ar', 'he', 'fa', 'ur']);

export function cardTongue() {
  let chosen = 'auto';
  try { chosen = localStorage.getItem(LANG_KEY) || 'auto'; } catch { /* private browsing */ }
  if (chosen && chosen !== 'auto') return chosen;
  try {
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    return (nav || 'en').split('-')[0].toLowerCase() || 'en';
  } catch { return 'en'; }
}

export function cardTongueIsRightToLeft() {
  return RTL.has(cardTongue());
}

// Every line a card draws, in the reader's tongue where the tongue has it.
export async function cardWords(lines = []) {
  const lang = cardTongue();
  const list = [...new Set(lines.filter((line) => typeof line === 'string' && line.trim()))];
  const words = Object.fromEntries(list.map((line) => [line, line]));
  if (!lang || lang === 'en' || !list.length) return words;

  const key = 'climate51_t_' + lang;
  let dict = {};
  try { dict = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch { dict = {}; }

  const need = list.filter((line) => !dict[line]);
  if (need.length) {
    try {
      const strings = Object.fromEntries(need.map((line, index) => ['s' + index, line]));
      const response = await base44.functions.invoke('translateClimate', { lang, strings });
      const out = response?.data?.translations || response?.translations || {};
      need.forEach((line, index) => {
        const value = out['s' + index];
        if (typeof value === 'string' && value.trim()) dict[line] = value.trim();
      });
      try { localStorage.setItem(key, JSON.stringify(dict)); } catch { /* storage full */ }
    } catch { /* the record's own words stand */ }
  }

  for (const line of list) if (dict[line]) words[line] = dict[line];
  return words;
}

export const RECORD_CARD_WORDS = [
  'THIS IS THE TIME. AND THIS IS THE RECORD OF THE TIME.',
  'THE RECORD',
  'EVERY LANGUAGE',
  'TOGETHER WE CAN',
  'CHANGE CLIMATE',
  'VERIFIED SOLUTIONS · NO NOISE · NOBODY LEFT BEHIND',
  'EVERY SYMBOL · EVERY NUMBER · EVERY TONGUE',
  'THE NOISE IS LOUD · THE RECORD IS LOUDER',
  'RECORD OF THE TIME',
];