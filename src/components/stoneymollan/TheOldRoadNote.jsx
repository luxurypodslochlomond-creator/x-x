import React from 'react';
import SourcedNote from '@/components/stoneymollan/SourcedNote';

/* ── WHY THE ROAD IS STILL HERE ────────────────────────────────────────────────
   Band 06 argues that this path survived because nothing worth improving ever went
   along it, so nobody widened it, metalled it or straightened it. It is a good
   argument and it is an argument — inference from the shape of the ground, not a
   minute of a meeting that decided anything.

   The note says which is which, because the band's whole charm is that nothing was
   ever done here, and a reader deserves to know that this is reasoning rather than a
   document. No scaring, no hedging either: just the difference between what is written
   down and what you can see for yourself. */

const SOURCES = [
  { label: 'ScotWays — heritage path record', href: 'https://scotways.com/heritage-path/HP62/' },
  { label: 'John Muir Way — the route', href: 'https://johnmuirway.org/route' },
  { label: 'Three Lochs Way', href: 'https://threelochsway.co.uk' },
];

const PARAGRAPHS = [
  'What is on the record: this is an old way, carried on the heritage path inventory and now walked by two long-distance routes. Somebody has traced it, and you can read the trace.',
  'What is argument: that it was never widened, metalled or straightened because nothing valuable ever went along it. That is reasoning from the shape of the ground \u2014 a path still a path, ruts the depth of a hollow way, no straightening to be seen.',
  'The record keeps those two apart on purpose. The reasoning is good and we stand behind it. But you are allowed to walk up and check it with your own eyes, which is the better kind of proof and the reason the path is worth walking at all.',
];

export default function TheOldRoadNote() {
  return (
    <SourcedNote
      trigger="Is that written down anywhere?"
      title="What is recorded, and what is reasoned"
      description="The heritage record behind this path, and which part of the argument comes from the shape of the ground."
      paragraphs={PARAGRAPHS}
      footnote="A good argument is still an argument. It says so here, and then it stands."
      sources={SOURCES}
    />
  );
}