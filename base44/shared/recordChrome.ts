// ── THE RECORD'S OWN FRAME ──────────────────────────────────────────────────────
//
// The nav, the footer and the masthead are not a page's copy. They are the record's frame:
// the same few words in front of every reader, on every page of the record, in every tongue.
// Because they are short and they stand alone, a machine left to guess at them reads them as
// isolated words — a news wire came back as an electrical cable, a place to read came back as
// a verb. So each one is declared here with the thing it actually is, and that meaning travels
// with the word when the tongue is made.
//
// The frame's own wording is kept apart from the body's words (see chromeKey) so it can be
// replaced by a better one without touching a single word of the record itself. The reader
// never sees the difference: serveClimateTongue hands the frame over as the plain word it
// stands for.
//
// One list, in one place, used by both functions that keep a tongue. The words here are the
// ones actually rendered by ClimateNav and ClimateLayout — if a nav item or a footer link is
// ever added, it is added here too, and every tongue gains it on the next read.

export const CHROME_PREFIX = '␟frame:';

export const RECORD_CHROME: Record<string, string> = {
  'Record': 'the record\u2019s own front page \u2014 the register itself, a place you read (never the verb "record")',
  'Wire': 'the record\u2019s news wire \u2014 a running list of dated, sourced dispatches (never an electrical cable, never a metal wire)',
  'Map': 'a map of the world showing where the record\u2019s entries come from',
  'Impact': 'how far the record reaches \u2014 how many reads, and where in the world they came from',
  'Founder': 'the person who began the record',
  'Support': 'giving money to keep the record running',
  'Method': 'how the record works \u2014 where its words come from and how they are checked',
  'Search': 'the box you type into to find an entry',
  'The Buttons': 'one page that lists every button on the record, and what each one does',
  'Terms': 'the terms of use \u2014 the ground rules for using the record',
  'Privacy': 'the privacy notice \u2014 what the record keeps, and what it never keeps',
  'Record of the Time': 'the record\u2019s own name, printed on its masthead',

  // The picker is part of the frame too: every reader meets it, on every page, and its words stand
  // alone in a list with no sentence around them.
  'Every tongue on Earth': 'the record\u2019s own name for its language picker \u2014 every language anyone speaks, anywhere',
  'on the list': 'standing after a number, in the picker: how many tongues the picker holds',
  'Any other language on Earth': 'the last row of the picker \u2014 for a tongue that is not listed, typed in by hand',
  'device': 'standing beside a language name, in the picker: the tongue this device is already set to',
  'Go': 'the button in the picker that accepts a language typed in by hand',
};

export const chromeKey = (word: string) => CHROME_PREFIX + word;
export const isChromeKey = (key: string) => key.startsWith(CHROME_PREFIX);
export const plainOfChromeKey = (key: string) => key.slice(CHROME_PREFIX.length);