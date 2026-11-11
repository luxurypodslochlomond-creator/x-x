import React from 'react';
import SourcedNote from '@/components/stoneymollan/SourcedNote';

/* ── THE WOOD'S BIRDS, AND A SUPERLATIVE ───────────────────────────────────────
   Two claims sit in one paragraph: that these oakwoods hold wood warbler, redstart and
   pied flycatcher, and that Loch Lomond's woods are "among the most important in
   Europe" for mosses and lichens.

   The first is a recording, and the recorders are named. The second is a superlative,
   and a superlative is the easiest thing in the world to print and the hardest to
   defend — so the note says whose words those are and where to read why. Warm, not
   nervous: nothing here is a warning, it is just the difference between counting and
   claiming. */

const SOURCES = [
  { label: 'NatureScot', href: 'https://www.nature.scot' },
  { label: 'RSPB', href: 'https://www.rspb.org.uk' },
  { label: 'Loch Lomond & Trossachs National Park', href: 'https://www.lochlomond-trossachs.org' },
];

const PARAGRAPHS = [
  'The birds are a recording, not an opinion. Wood warbler, redstart and pied flycatcher are the three that the Atlantic oakwoods of this west coast are known for, and they are on the recorders\u2019 lists for these woods.',
  'The phrase \u201Camong the most important in Europe\u201D is a superlative, and it is the national park\u2019s and NatureScot\u2019s to defend rather than ours. We print it because they say it, and because the reason is checkable: this wet, mild, western woodland is what oceanic mosses and lichens need, and there is very little of it left anywhere.',
  'What this record will not do is quietly upgrade that to a number. A wood is either designated and recorded or it is not, and those are things you can go and read.',
];

export default function TheWoodBirdsNote() {
  return (
    <SourcedNote
      trigger="Who counted them?"
      title="The birds, and the superlative"
      description="What is recorded in these oakwoods, and whose words the claim about mosses and lichens belongs to."
      paragraphs={PARAGRAPHS}
      footnote="A count is a count. A superlative is quoted with its author's name on it."
      sources={SOURCES}
    />
  );
}