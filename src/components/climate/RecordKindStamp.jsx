import React from 'react';

// ── ONE WORD, ONE SHAPE, IN ALL THREE ROOMS ───────────────────────────────────
// Brian, 26 November: "now have colours bro need to put them on solutions etc on record page
// … looks all disjointed". He was looking at three different ways of saying the same thing:
// a solid green block on a solution, a solid red block on a crisis, and a small brown label
// on an action. Three shapes for one vocabulary reads as three vocabularies, and a reader
// has to learn the page instead of the record.
//
// So the record has one stamp, drawn once here and used everywhere a kind is named: the word
// in the kind's own ink, in the record's face, bold, upper case, tracked, underscored. The
// colour mass stays in the card's rule and the entry's bar, where it does structural work.
// Same grammar as the Wire, so a crisis looks like a crisis in every room it appears in.
const KINDS = {
  crisis: { word: 'Crisis', tone: 'text-record-red' },
  solution: { word: 'Solution', tone: 'text-record-botanical' },
  action: { word: 'Action', tone: 'text-record-action' },
};

export default function RecordKindStamp({ kind, className = '' }) {
  const { word, tone } = KINDS[kind] || KINDS.action;
  return (
    <span
      className={`inline-block border-b-2 border-current pb-0.5 font-heading text-[11px] font-extrabold uppercase leading-none tracking-[0.16em] ${tone} ${className}`.trim()}
    >
      {word}
    </span>
  );
}