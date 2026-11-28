import React from 'react';
import { Link } from 'react-router-dom';

// ── THE OTHER HALF OF HER ARGUMENT, WHICH IS THE HALF EVERYBODY SKIPS ──────────
// Her column is not a list of disasters. Half of it is what people are already doing about
// them, named place by place, because she believes — and says — that knowing what works is
// what gives people hope enough to act. So these four are hers: her examples, her places.
// A record that only prints the harm is a record that leaves a reader with nothing to do.
//
// ── AND ALL FOUR ARE ALREADY ON THE RECORD ────────────────────────────────────
// Every one of them went out to the outside world from this page — to UNEP, to Global Citizen,
// to the Ocean Conservation Trust — while the record held its own entry for the same work,
// with the paper that carried it named and the origin archived. Brian, 28 November: "why take
// us there bro… I want people to stay here for the right reasons." So the door now opens the
// record's own entry, and the origin is printed underneath as who says so. Provenance is not
// lost: it is the line under the title rather than a departure lounge. The three that had a
// wire entry open the wire; the fourth is a solution the record keeps in its own right.
const WORKING = [
  {
    place: 'Burkina Faso',
    title: 'Women turning waste into livelihoods',
    body: 'Women and youth of the NEERE group weave discarded plastic into cloth for clothes and bags.',
    onRecord: '/ClimateWireEntry/6ad91a4e045e7a35a043fd5a',
    source: 'UNEP Young Champions of the Earth',
  },
  {
    place: 'The Sahara',
    title: 'Shelter in a Sahrawi refugee camp',
    body: 'Tateh Lehbib built his grandmother a shelter using 6,000 discarded bottles in a Sahrawi refugee camp.',
    onRecord: '/ClimateWireEntry/6ad91a4e045e7a35a043fd5b',
    source: 'Global Citizen',
  },
  {
    place: 'Plymouth & the Solent',
    title: 'Restoring seagrass habitat',
    body: 'Seagrass restoration work across eight hectares, reported by the Ocean Conservation Trust in November 2024. An area worked on, not a claim that every plant survived.',
    onRecord: '/ClimateWireEntry/6ad91a4e045e7a35a043fd5c',
    source: 'Ocean Conservation Trust, November 2024',
  },
  {
    place: 'Uruguay',
    title: 'Renewable electricity',
    body: 'Uruguay’s wind, hydro, biomass and solar generation, highlighted in her column. The electricity share varies by year.',
    onRecord: '/ClimateDetail/solution/6abf6cdaaeaa351c56a9f2c8',
    source: 'Kleinman Center for Energy Policy, University of Pennsylvania',
  },
];

const COLUMN = '/ClimateWireEntry/6ad91a4e045e7a35a043fd57';

export default function FounderSolutions() {
  return (
    <section className="record-founder-sheet record-founder-sheet-bone" aria-labelledby="founder-solutions">
      <p className="record-founder-kicker">The response · her examples</p>
      <h2 id="founder-solutions" className="record-founder-h2">The people doing something about it.</h2>
      <p className="record-founder-lede">Examples she chose for her August column. Not a substitute for cutting fossil-fuel dependence, protecting rights or providing essential public services. Work to learn from, with the people and places still attached.</p>
      <ol className="record-founder-working">
        {WORKING.map(({ place, title, body, onRecord, source }) => (
          <li key={place}>
            <span className="record-founder-working-place">{place}</span>
            <h3><Link to={onRecord}>{title} →</Link></h3>
            <p>{body}</p>
            <p className="record-founder-working-source">Source: {source}</p>
          </li>
        ))}
      </ol>
      <p className="record-founder-thread">Read in <Link to={COLUMN}>her full column, on the record →</Link></p>
    </section>
  );
}