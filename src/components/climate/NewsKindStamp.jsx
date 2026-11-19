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
const KINDS = {
  emergency: { word: 'Emergency', tone: 'emergency' },
  milestone: { word: 'Milestone', tone: 'milestone' },
  initiative: { word: 'Initiative', tone: 'initiative' },
};

export default function NewsKindStamp({ kind }) {
  const { word, tone } = KINDS[kind] || KINDS.initiative;
  return <span className={`news-stamp news-stamp-${tone}`}>{word}</span>;
}