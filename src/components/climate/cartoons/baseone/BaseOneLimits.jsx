import React from 'react';

// The room has to say what it is not, or a mark made by a machine gets read as evidence.
// Four lines, no lecture: what a drawing can do, what it cannot, why nothing in here blames
// a people, and — added after Brian asked whether six marks can speak for the planet — that
// this is not a portrait of the world either.
const LIMITS = [
  'A drawing signs nothing. It is a mark, not a finding — every fact on this record lives in an entry with a source you can open.',
  'None of them names a person, a nation or a faith. What they draw is a way of working, because a drawing that blames a people only teaches a reader to blame a people.',
  'A machine made these marks. It cannot go and look, cannot be wronged, and cannot be brave. The people on this record can — which is why the drawings point at them and never stand in for them.',
  // ── THE ONE THAT KEEPS THE SERIES HONEST ABOUT ITSELF ─────────────────────────
  // Brian, 25 November: "you sure cartoons by BASE 1 represent each year of the cartoon
  // international? do you know what previous years been about? does it pass any bullshit
  // test from you and Francis?"
  //
  // No. Eight marks and eight editions are not the same eight, and nothing here is a year in
  // the festival's life: the record holds 2012, 2014, 2019 and 2026, and it does not hold the
  // years in between. So the room says that out loud, in the room, before a reader decides for
  // itself that a numeral is a date. Francis would spot the other version in a second.
  'These are not one mark per edition. Eight drawings and eight festivals are not the same eight, and this room does not draw a year it cannot read: the record holds the first, the second, the seventh and the eighth, and says plainly that it has not got the rest.',
  'These marks are not a portrait of the planet and not a census of its people. They draw a way of working — mostly the way the comfortable work, and once the way this machine works. The people carrying the cost are on the wall, drawn by hands that have been somewhere; a machine that has never stood in it should not draw them.',
];

export default function BaseOneLimits() {
  return (
    <section className="base-one-limits" aria-labelledby="base-one-limits">
      <h2 id="base-one-limits">What these are not</h2>
      <ul>
        {LIMITS.map((line) => <li key={line}>{line}</li>)}
      </ul>
    </section>
  );
}