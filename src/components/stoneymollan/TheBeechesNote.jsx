import React from 'react';
import SourcedNote from '@/components/stoneymollan/SourcedNote';

/* ── HOW OLD THE BEECHES ARE ───────────────────────────────────────────────────
   "Reckoned two to three hundred years old" is the shakiest sentence on the sheet and
   the one that sounds the most solid. Nobody cored these trees. What can be said
   honestly is why the guess is a good one: beech is not a native Scot, and an avenue
   planted to line a way is a fashion with a date on it.

   So the note separates the two: the avenue is on the heritage record with the road,
   and the age is an estimate from the look of the trees and the fashion that planted
   them. A reader can then decide how much weight to put on "reckoned" — which is
   exactly what the word was doing there in the first place. */

const SOURCES = [
  { label: 'Woodland Trust', href: 'https://www.woodlandtrust.org.uk' },
  { label: 'Historic Environment Scotland', href: 'https://www.historicenvironment.scot' },
  { label: 'ScotWays — heritage path record', href: 'https://scotways.com/heritage-path/HP62/' },
];

const PARAGRAPHS = [
  'Nobody has counted the rings on these trees. Two to three hundred years is a reckoning from the shape of them, and the sheet says reckoned rather than known because that is what it is.',
  'The reason the reckoning is a fair one: beech is not a native tree in Scotland, and an avenue planted to line a road is a fashion that arrives with designed landscapes in the eighteenth and nineteenth centuries. A long double line of beeches on an old way is nearly always that.',
  'What is on the record rather than estimated is the road itself, and the fact that the trees stand along it. Read the age as an estimate offered in daylight, which is all any estimate should ask for.',
];

export default function TheBeechesNote() {
  return (
    <SourcedNote
      trigger="How old, really?"
      title="Two to three hundred, reckoned"
      description="Why the beeches are dated the way they are, and what is an estimate rather than a record."
      paragraphs={PARAGRAPHS}
      footnote="An estimate that says it is an estimate is worth more than a date that does not."
      sources={SOURCES}
    />
  );
}