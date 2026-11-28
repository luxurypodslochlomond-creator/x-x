import React from 'react';

// ── THE OTHER HALF OF HER ARGUMENT, WHICH IS THE HALF EVERYBODY SKIPS ──────────
// Her column is not a list of disasters. Half of it is what people are already doing about
// them, named place by place, because she believes — and says — that knowing what works is
// what gives people hope enough to act. So these four are hers: her examples, her places.
// A record that only prints the harm is a record that leaves a reader with nothing to do.
const WORKING = [
  {
    place: 'Burkina Faso',
    title: 'Plastic is money',
    body: 'Women and youth of the NEERE group weave discarded plastic into cloth for clothes and bags.',
  },
  {
    place: 'The Sahara',
    title: 'Six thousand bottles',
    body: 'Tateh Lehbib, a 28-year-old Sahrawi refugee engineer, built his grandmother a shelter from plastic bottles packed with sand, straw, cement and limestone, in heat that reaches 110°F.',
  },
  {
    place: 'Plymouth Sound',
    title: 'Eight hectares',
    body: 'England is restoring seagrass across the Plymouth Sound and Solent Maritime conservation areas — coastline, nursery and carbon store in one.',
  },
  {
    place: 'Uruguay',
    title: 'Ninety-eight per cent',
    body: 'Uruguay makes over 98% of its electricity from wind, hydro, biomass and solar.',
  },
];

export default function FounderSolutions() {
  return (
    <section className="record-founder-sheet record-founder-sheet-bone" aria-labelledby="founder-solutions">
      <p className="record-founder-kicker">The other half of her argument</p>
      <h2 id="founder-solutions" className="record-founder-h2">The answers<br />already exist.</h2>
      <p className="record-founder-lede">They are just scattered, uncredited, and hard to find — which is the problem a record solves and a feed never will.</p>
      <ol className="record-founder-working">
        {WORKING.map(({ place, title, body }) => (
          <li key={place}>
            <span className="record-founder-working-place">{place}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
      <p className="record-founder-plain">And when the whole world was asked to stay home in 2020, emissions fell by more than 5% in weeks, and the Himalayas were visible from 200 kilometres away for the first time in thirty years. That is what a shared instruction can do.</p>
      <p className="record-founder-thread">Her account, after David Attenborough’s <em>The Year the Earth Changed</em>.</p>
    </section>
  );
}