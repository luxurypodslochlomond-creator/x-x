// ── SCRIPTS THE RECORD WILL NOT PUT A MACHINE'S WORDS INTO ──
// Every other tongue here can be checked by people who actually speak it. These cannot.
// The scripts below have no living community writing them, so a machine's wording in them
// could not be checked by anyone — and a guess printed in the record's own voice is exactly
// the thing the record exists to refuse.
//
// This is not a closed door. A real inscription is welcome as a quoted line: the signs
// themselves, the published reading, and the source named beside it — somebody's actual
// work, carried, never invented.
//
// Matched against the words a reader types, so "Egyptian hieroglyphs", "cuneiform" and
// "Mayan glyphs" are refused — while living languages that merely sound close (Mayan
// languages such as Yucatec or K'iche', Demotic Greek) are left alone.

const REFUSED = [
  'hieroglyph', 'hieratic', 'egyptian demotic', 'ancient egyptian', 'middle egyptian', 'old egyptian',
  'cuneiform', 'sumerian', 'akkadian', 'hittite', 'elamite',
  'linear a', 'linear b', 'rongorongo', 'proto-sinaitic', 'ugaritic', 'oracle bone',
  'maya glyph', 'mayan glyph', 'maya hieroglyph', 'mayan hieroglyph', 'maya script', 'mayan script',
];

// The plain answer a reader gets instead, said once in the same words wherever they type.
export const ANCIENT_SCRIPT_REFUSAL =
  "The record will not machine-translate an ancient script: nobody alive can check a machine's wording in it, so it would be a guess printed as fact. A real inscription, quoted with its source named beside it, is the honest door — and that door is open.";

export function refuseAncientScript(text) {
  const asked = String(text || '').toLowerCase();
  if (!asked.trim()) return null;
  return REFUSED.some(term => asked.includes(term)) ? ANCIENT_SCRIPT_REFUSAL : null;
}