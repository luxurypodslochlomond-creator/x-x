import React from 'react';

// ── FOUR ROOMS, CUT FROM THE WORLD ─────────────────────────────────────────────
// Drawn four times now. Thin lines, then bars, then a broken rock, a stack of steps, a
// lever and three people. Brian, 20 November: "im sure we can do better with crises
// solutions actions and groups icons bro they dont feel quite like us feel a bit like I
// dont know bro."
//
// He put his finger on it. The last set were DIAGRAMS of ideas: a bar chart for solutions,
// a lever for action, three generic figures for groups. A diagram is what a machine draws
// to explain a word. It is why they felt like a slide deck's icon row and not like us.
//
// So these are four THINGS, not four ideas. A cut in the ground. A shoot in the ground. A
// flag in the ground. A ring of people standing round. And the first two share their ground
// on purpose, because crises and solutions are the same ground with two different outcomes,
// and a record should show that rather than hide it behind two unrelated pictures.
//
// The rule of the record holds in every one: solid masses, nothing thinner than the mass,
// no right angles and no equal spacing, and exactly one part in the record's red — the part
// that is the point. No second colour anywhere. The rooms are told apart by what they show,
// which is how a printed contents sheet has always done it.
const FRAME = { viewBox: '0 0 40 40', fill: 'none', 'aria-hidden': 'true' };
const MASS = { fill: 'currentColor', stroke: 'none' };
const RED = { fill: 'rgb(var(--record-mark))', stroke: 'none' };

// Crises — the ground itself, broken, the red showing in the gash. What is at risk.
export function RoomMarkCrisis({ size = 40, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...MASS} d="M2 21.6 16.2 20 15.2 27.4 16.4 37 2.2 37.2Z" />
      <path {...MASS} d="M23.8 19.6 37.8 21.4 37.6 37.2 23.6 37Z" />
      <path {...RED} d="M16.6 19.8 23.4 19.4 24.8 37.2 15.2 37.4 15.4 27.4Z" />
    </svg>
  );
}

// Solutions — the same ground, whole, with something growing out of it. The way that works.
export function RoomMarkSolution({ size = 40, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...MASS} d="M2 30.6 37.8 29.8 37.6 37.2 2.2 37.4Z" />
      <path {...RED} d="M18.8 13.6 21.4 13.2 22 31.6 18.2 31.8Z" />
      <path {...RED} d="M18.4 17.8 11.4 14.6 10.2 18 17.8 21.2Z" />
      <path {...RED} d="M21.8 11.6 29.4 8.6 30.4 12 22.2 15Z" />
    </svg>
  );
}

// Actions — a flag planted. A thing happening, in a place, that others can see and join.
export function RoomMarkAction({ size = 40, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...MASS} d="M6.4 4 9.6 3.6 10.2 36.6 6.8 36.8Z" />
      <path {...RED} d="M9.8 5.2 31.4 8.8 28.6 15.4 10 12.2Z" />
    </svg>
  );
}

// Groups — people standing in a ring, seen from above. One of them is the one who joins.
export function RoomMarkGroups({ size = 40, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path {...RED} d="M16.8 5.4 22.6 4.8 23.4 10.6 17.4 11.2Z" />
      <path {...MASS} d="M28.4 9.2 34 12.2 31.2 17.2 26.2 14.2Z" />
      <path {...MASS} d="M30.4 25 35 29.2 31.2 33.6 26.8 29.6Z" />
      <path {...MASS} d="M16.6 29.4 22.4 28.8 23 34.6 17.2 35.2Z" />
      <path {...MASS} d="M5 29.4 9.4 25.2 13.6 29.4 9.2 33.8Z" />
      <path {...MASS} d="M5.6 12.6 10.8 9.4 14.4 14 9.6 17.4Z" />
    </svg>
  );
}