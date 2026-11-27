// ── A NAME, AS AN ADDRESS ─────────────────────────────────────────────────────
// Brian, 27 November: "you sure links for cartoons not too long and crazy... thinking of
// future and sending links", then "is it the same for the wire etc?" It is. The rooms were
// always sayable — /wire, /method, /wall, /music — but the things a person actually sends
// were addressed by the record's own id: /ClimateWireEntry/6afde227b4e9502ba607dff8.
//
// So a thing on the record is also addressed by its own name, taken from its own headline
// or title and never invented: /wire/antarctic-ozone-hole-closes, /w/rain-check. The id
// addresses keep working, because they are printed on cards and sit in bookmarks, and a
// link that stops working is a worse fault than a link with a long number in it.
const CUT_AT = 34;
const WIRE_CUT_AT = 44;

// A long headline always ends its cut somewhere, and a name that trails off on "in", "its"
// or "of" reads like a mistake rather than a name. So the last word is dropped while it is
// only glue — the address keeps the words that carry the meaning. A name is also capped at
// seven words, because past that it stops reading like a name and starts reading like a
// sentence somebody interrupted.
const GLUE = new Set(['a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'from', 'in', 'into', 'is', 'it', 'its', 'of', 'on', 'or', 'that', 'the', 'their', 'this', 'to', 'was', 'with']);
const MAX_WORDS = 7;

export function recordSlug(text, max = CUT_AT) {
  const words = String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
  const kept = [];
  let length = 0;
  for (const word of words) {
    if (kept.length >= MAX_WORDS) break;
    if (length + word.length + 1 > max) break;
    kept.push(word);
    length += word.length + 1;
  }
  const named = [...kept];
  while (named.length > 1 && GLUE.has(named[named.length - 1])) named.pop();
  return (named.length ? named : kept).join('-') || 'entry';
}

// One place decides how the wire's own address is shaped, so the page, the card, the
// picture and the citation can never drift apart and point at different things.
export function wireAddress(entry) {
  return `/wire/${recordSlug(entry?.headline, WIRE_CUT_AT)}`;
}

// A solution, a crisis or an action: the three things a reader most often sends to
// somebody else. Same rule — the entry's own title, and /e/ for entry.
export function entryAddress(record) {
  return `/e/${recordSlug(record?.title, WIRE_CUT_AT)}`;
}

// ── TWO THINGS WITH ONE NAME ─────────────────────────────────────────────────
// A name is taken from the thing itself, so two things can honestly end up with the same
// one: two drawings called Rain Check, a solution and an action that share a headline.
//
// The rule is that nothing is guessed and nothing is silently picked. If one thing answers
// to a name, that is what opens. If more than one does, the address opens a short list of
// them and the reader chooses — because opening the wrong drawing under the right name is
// the one mistake this record must never make, and an address that quietly picks the oldest
// is exactly that mistake, dressed as convenience.
export function findBySlug(records, slug, nameOf, max = WIRE_CUT_AT) {
  return (records || []).filter((record) => recordSlug(nameOf(record), max) === slug);
}