import React from 'react';

// ── THE KIND OF SIGNAL IS A STAMP, NOT A DOT ────────────────────────────────────
// Brian, 19 November: "when click on signals feels dead bro and lifeless why bro? not
// resonating at all with me." The answer was a six-pixel square: every signal on the page
// announced what kind it was with a dot smaller than a full stop, which at phone size is
// simply not there. A page where nothing is printed cannot resonate — it is a list of
// sentences at one weight.
//
// So the kind is a solid block with the word printed on it, in the three inks the record
// already uses for meaning: red for an emergency, the signal yellow for a milestone, ink
// for work already under way. Same hand as the marks on the rail — solid mass, one colour,
// nothing drawn thin — so a reader can run a thumb down the page and see, before reading a
// word, which of these is a warning and which is something that works.
// ── THE SAME THREE WORDS AS THE RECORD ─────────────────────────────────────────
// Brian, 26 November: "record page and wire mention different words … not making sense to me."
// He was right: the record said Solutions, Crises and Actions, and the Wire stamped the same
// three kinds of thing Emergency, Milestone and Initiative. A reader moving between the two
// rooms had to learn a second vocabulary for one set of facts.
//
// The stored ids stay exactly as they are (emergency, milestone, initiative) because they are
// in the records, the filters and the submitted entries — renaming them is a migration for a
// word nobody sees. Only the word on the stamp changes, and it changes to the record's own:
// a warning is a CRISIS, something that works is a SOLUTION, and work under way is an ACTION.
const KINDS = {
  emergency: { word: 'Crisis', tone: 'emergency' },
  milestone: { word: 'Solution', tone: 'milestone' },
  initiative: { word: 'Action', tone: 'initiative' },
};

export default function NewsKindStamp({ kind }) {
  const { word, tone } = KINDS[kind] || KINDS.initiative;
  return <span className={`news-stamp news-stamp-${tone}`}>{word}</span>;
}