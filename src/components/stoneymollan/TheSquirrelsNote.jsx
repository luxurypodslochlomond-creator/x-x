import React from 'react';
import SourcedNote from '@/components/stoneymollan/SourcedNote';

/* ── THE SQUIRRELS, AND THE FIFTY YEARS ────────────────────────────────────────
   "Back in Balloch park after more than fifty years away" is the best line on the
   wildlife band and the one a reader is most likely to repeat to somebody else. It is
   also a remembered figure rather than a published one, so the note says that out loud
   instead of letting a number borrow the authority of the two bodies named below.

   What is published: reds were lost from most of lowland Scotland, Loch Lomond's woods
   are one of the strongholds left, and the national count has held where greys have
   not reached. That is enough to carry the line. The fifty years stays, marked as
   local memory, because the people who watched the wood empty are the reason it is
   worth saying at all. */

const SOURCES = [
  { label: 'Saving Scotland\u2019s Red Squirrels', href: 'https://scottishsquirrels.org.uk' },
  { label: 'Loch Lomond & Trossachs National Park', href: 'https://www.lochlomond-trossachs.org' },
  { label: 'NatureScot', href: 'https://www.nature.scot' },
];

const PARAGRAPHS = [
  'Red squirrels were lost from most of lowland Scotland inside a century: the grey took the woods and the disease travelled with it. What is left is a scatter of strongholds, and Loch Lomond\u2019s woods are one of them.',
  'The fifty years is local memory \u2014 the gap the people around the park describe \u2014 and it is fairer to say that plainly than to let it borrow the weight of the names below. What is published is that reds are recorded in these woods, and that the national count has held in the places the greys have not reached.',
  'So read the line above as: they are here, they are counted, and the fifty years is the park speaking from memory rather than from a file.',
];

export default function TheSquirrelsNote() {
  return (
    <SourcedNote
      trigger="How sure is that?"
      title="The squirrels, and the fifty years"
      description="What is published about red squirrels in Loch Lomond, and which part of the line above is local memory."
      paragraphs={PARAGRAPHS}
      footnote="A remembered number, marked as remembered — the same rule the history bands keep."
      sources={SOURCES}
    />
  );
}