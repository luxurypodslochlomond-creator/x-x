import React from 'react';
import SourcedNote from '@/components/stoneymollan/SourcedNote';

/* ── THE THREADS UNDER THE HILL ────────────────────────────────────────────────
   The paragraph above already does the honest thing: it says the partnership is
   settled and the "old trees feeding the young ones" story is still being argued. This
   door is for the reader who wants to know who is arguing.

   Both halves matter. Mycorrhiza is not a hopeful metaphor — it is measured, and the
   trade of water and sugar is in textbooks. The forest-wide "wood wide web" is a
   beautiful idea with real critics, and the record prints the argument rather than the
   beauty. That is the sane treatment: keep the wonder, hold the claim. */

const SOURCES = [
  { label: 'NatureScot', href: 'https://www.nature.scot' },
  { label: 'Woodland Trust', href: 'https://www.woodlandtrust.org.uk' },
  { label: 'Britannica — mycorrhiza', href: 'https://www.britannica.com/science/mycorrhiza' },
];

const PARAGRAPHS = [
  'The partnership itself is not in doubt and has not been for a century and a half: a fungus threads into a root, brings water and minerals, and is paid in sugar. Almost every tree on this hill is in one.',
  'What is being argued about is the story built on top of it \u2014 that a whole wood is a network, that the oldest trees deliberately feed the youngest, that damage to one is signalled to the others. Some of that has good evidence behind it and some has been criticised by the people who do the measuring.',
  'So the page says what it says: the threads are real, the family is probably a metaphor. If somebody tells you the wood is talking, ask them for the paper \u2014 and if they have one, read it. That is not cynicism. It is the same courtesy you would give a good song.',
];

export default function TheMyceliumNote() {
  return (
    <SourcedNote
      trigger="What is still argued?"
      title="The threads are real. The family is a metaphor."
      description="What is settled about mycorrhizal networks, and what is still being argued about by the people who study them."
      paragraphs={PARAGRAPHS}
      footnote="Wonder kept. Claim held. The hill does not need us to oversell it."
      sources={SOURCES}
    />
  );
}