import React from 'react';
import SourcedNote from '@/components/stoneymollan/SourcedNote';

/* ── THE STRIKE, ANSWERED HONESTLY ─────────────────────────────────────────────
   A friend of the founder's sent him a sentence from the internet: that living near
   a tree struck by lightning is "spiritually viewed as a potent sign of sudden
   transformation, divine intervention, and a wake-up call rather than a negative
   omen". He asked whether it was real.

   So this note does the one thing the record can do that the internet will not: it
   takes the sentence apart. The old half is real and can be named — lightning read as
   a god speaking, the oak at Dodona, the flint "thunderbolt" kept for luck in a
   Scottish field. The new half is modern spiritual writing with no author, no
   tradition and no origin, and saying so is not the same as calling anybody a fool.

   It ends with the plain thing a person standing on this hill actually needs: a struck
   tree is the last place to shelter from thunder. Warmth is not the same as care. */

const SOURCES = [
  { label: 'Met Office — thunder and lightning', href: 'https://www.metoffice.gov.uk' },
  { label: 'Britannica — Dodona', href: 'https://www.britannica.com/topic/Dodona' },
  { label: 'National Museums Scotland', href: 'https://www.nms.ac.uk' },
];

const PARAGRAPHS = [
  'The old part of it is real. Lightning has been read as a god speaking almost everywhere there are storms: the oak at Dodona answered for Zeus, Thor\u2019s hammer was the thunder, and a flint arrowhead turned up in a Scottish field was called a thunderbolt and kept for luck. That is thousands of years of people standing under a sky that was talking to them.',
  'The sentence itself is not old. \u201CA potent sign of sudden transformation, divine intervention and a wake-up call rather than a negative omen\u201D is modern spiritual writing \u2014 it has no author, no tradition behind it and no origin anyone can name. That does not make it unkind. It makes it unsourced.',
  'What this record gives you is in the band above: a tree in that wood took a strike and stands split down its length, and what people make of it is what people make of it. We will print the tree. We will not print a meaning as though it were a measurement.',
  'And one plain thing, because this is a hill you walk on: a struck tree is not shelter. If thunder is close enough to hear, get off the muir and down to a building or a car, and leave the split trunk to itself.',
];

export default function TheStrikeNote() {
  return (
    <SourcedNote
      trigger="Is any of that true?"
      title="What is old, and what is new"
      description="The old tradition of lightning as a sign, the modern sentence with no source, and what to do in thunder."
      paragraphs={PARAGRAPHS}
      footnote="The record's rule: a claim with no nameable origin is printed as what people say, never as what happened."
      sources={SOURCES}
      action={{ label: 'The seals — check the record yourself', href: '/ClimateSeals' }}
    />
  );
}