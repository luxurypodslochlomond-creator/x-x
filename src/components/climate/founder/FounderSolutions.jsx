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
    source: 'https://www.unep.org/youngchampions/news/story/weaving-brighter-future-plastic-burkina-faso',
  },
  {
    place: 'The Sahara',
    title: 'Six thousand bottles',
    body: 'Tateh Lehbib built his grandmother a shelter using 6,000 discarded bottles in a Sahrawi refugee camp.',
    source: 'https://www.globalcitizen.org/en/content/plastic-bottle-houses-sahrawi-refugees-algeria/',
  },
  {
    place: 'Plymouth & the Solent',
    title: 'Eight hectares',
    body: 'Seagrass restoration work across eight hectares, reported by the Ocean Conservation Trust in November 2024. An area worked on, not a claim that every plant survived.',
    source: 'https://oceanconservationtrust.org/success-for-englands-largest-seagrass-restoration-project/',
  },
  {
    place: 'Uruguay',
    title: 'Renewable electricity',
    body: 'Uruguay’s wind, hydro, biomass and solar generation, highlighted in her column. The electricity share varies by year.',
    source: 'https://www.solutions-site.org/node/1648',
  },
];

export default function FounderSolutions() {
  return (
    <section className="record-founder-sheet record-founder-sheet-bone" aria-labelledby="founder-solutions">
      <p className="record-founder-kicker">The response · her examples</p>
      <h2 id="founder-solutions" className="record-founder-h2">Work already underway.</h2>
      <p className="record-founder-lede">The other half of her column: people doing something about it, place by place.</p>
      <ol className="record-founder-working">
        {WORKING.map(({ place, title, body, source }) => (
          <li key={place}>
            <span className="record-founder-working-place">{place}</span>
            <h3><a href={source} target="_blank" rel="noopener noreferrer">{title} ↗</a></h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
      <p className="record-founder-thread">Examples from <a href="https://www.solutions-site.org/node/1648" target="_blank" rel="noopener noreferrer">her full column ↗</a>. Each heading opens the account behind it.</p>
    </section>
  );
}