// ── ANCIENT SCRIPTS ──
// The record carries machine wording into every tongue a reader asks for, ancient scripts
// included: hieroglyphs, cuneiform, Linear B. Nobody alive writes some of these, so a
// machine's wording in them cannot be checked by anyone — and the record never pretends
// otherwise. The note below stands on the page while such a tongue is chosen, so what a
// reader gets is the whole record in their script, marked honestly as a machine's attempt.
//
// A real inscription, quoted with its reading and its source named beside it, is still the
// stronger door, and that door stays open.

const ANCIENT = [
  'hieroglyph', 'hieratic', 'egyptian demotic', 'ancient egyptian', 'middle egyptian', 'old egyptian', 'egy',
  'cuneiform', 'sumerian', 'akkadian', 'hittite', 'elamite', 'sux', 'akk',
  'linear a', 'linear b', 'rongorongo', 'easter island', 'annunaki', 'anunnaki', 'proto-sinaitic', 'ugaritic', 'oracle bone',
  'maya glyph', 'mayan glyph', 'maya hieroglyph', 'mayan hieroglyph', 'maya script', 'mayan script',
];

// Said plainly, wherever such a tongue is read.
export const ANCIENT_SCRIPT_NOTE =
  "Machine wording in an ancient script — nobody alive can check it. Read it as a machine's attempt, not an inscription.";

export function isAncientScript(text) {
  const asked = String(text || '').toLowerCase();
  if (!asked.trim()) return false;
  return ANCIENT.includes(asked) || ANCIENT.some(term => asked.includes(term));
}