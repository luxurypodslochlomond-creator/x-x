import React from 'react';

// The room has to say what it is not, or a mark made by a machine gets read as evidence.
// Four lines, no lecture: what a drawing can do, what it cannot, and why nothing in here
// blames a people.
const LIMITS = [
  'A drawing signs nothing. It is a mark, not a finding — every fact on this record lives in an entry with a source you can open.',
  'No words are drawn into any of them, so there is nothing to translate: the same mark is read in every tongue at once.',
  'None of them names a person, a nation or a faith. What they draw is a way of working, because a drawing that blames a people only teaches a reader to blame a people.',
  'A machine made these marks. It cannot go and look, cannot be wronged, and cannot be brave. The people on this record can — which is why the drawings point at them and never stand in for them.',
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