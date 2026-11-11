import React from 'react';
import SourcedNote from '@/components/stoneymollan/SourcedNote';

/* ── THE CAIRNS, AND WHO HAS LOOKED AT THEM ────────────────────────────────────
   The heaviest band on the sheet: dimensions, an excavation about 1800, twenty to
   twenty-five graves, arrowheads, bone, a cup-marked boulder. All of it checkable, and
   none of it worth a reader's trust until they can see who recorded it.

   So the tap opens the inventory itself. Canmore is Historic Environment Scotland's
   national record; the New Statistical Account of 1845 is the parish ministers' own
   survey, which is where the finds were written down. The band already names them —
   this makes the names openable. */

const SOURCES = [
  { label: 'Canmore — Historic Environment Scotland', href: 'https://canmore.org.uk' },
  { label: 'Historic Environment Scotland', href: 'https://www.historicenvironment.scot' },
  { label: 'The Megalithic Portal', href: 'https://www.megalithic.co.uk' },
];

const PARAGRAPHS = [
  'Both cairns are on the national record and not only in the memory of the parish: Canmore, Historic Environment Scotland\u2019s inventory, carries them, with the measurements this page gives.',
  'The arrowheads, the bone and the twenty to twenty-five graves come from the opening of the chamber about 1800 and from the New Statistical Account of 1845 \u2014 the parish ministers\u2019 own survey. That is why this page can say how many and not merely that there were some.',
  'What nobody has is a use for it. Most of the long cairn was taken for stone long before anybody thought to stop it, and the forestry is planted over what is left. That is a fact about this parish, kept here as a fact rather than a complaint.',
];

export default function TheCairnsNote() {
  return (
    <SourcedNote
      trigger="Who recorded them?"
      title="Two cairns on the national record"
      description="Where the cairns, their measurements and the finds are written down, and by whom."
      paragraphs={PARAGRAPHS}
      footnote="Named, openable, and open to being checked against the page above."
      sources={SOURCES}
    />
  );
}