import React from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const SERIES = [
  { name: 'Stacking Up Resilience', when: '2026', to: 'https://www.ceew.in/what-on-earth' },
  { name: 'The Energy Relay', when: '7 Oct 2026', to: 'https://www.ceew.in/what-on-earth/energy-relay' },
  { name: 'Love At First Light', when: '23 Sep 2026', to: 'https://www.ceew.in/what-on-earth/love-first-light' },
  { name: 'Revolution EV-olution!', when: '9 Sep 2026', to: 'https://www.ceew.in/what-on-earth/revolution-ev-olution' },
  { name: 'Rain Check!', when: '26 Aug 2026', to: 'https://www.ceew.in/what-on-earth/rain-check' },
  { name: 'Heat’s Got Nowhere to Hide!', when: '12 Aug 2026', to: 'https://www.ceew.in/what-on-earth/heats-got-nowhere-hide' },
  { name: 'Hidden in Plain Sight', when: '29 Jul 2026', to: 'https://www.ceew.in/what-on-earth/hidden-plain-sight' },
  { name: 'Making a World of Difference!', when: '6 May 2026', to: 'https://www.ceew.in/what-on-earth/making-world-difference' },
  { name: 'The Way to Live Longer!', when: '25 Mar 2026', to: 'https://www.ceew.in/what-on-earth/way-live-longer' },
  { name: 'A Tale of Two Cities', when: '11 Feb 2026', to: 'https://www.ceew.in/what-on-earth/tale-two-cities' },
];

// ── WHERE THE DRAWINGS CAME FROM, IN ONE SENTENCE AND ONE LIST ─────────────────
// The block used to open on "A nod to the cartoons Janine shared" and then explain itself in
// seven lines of housekeeping. Brian, 28 November: "not sure what it's saying". So it says the
// one thing that matters first — whose the work is — and then gives the list of where each
// drawing was first published, in date order, with the links kept exactly as they were.
export default function CartoonSources() {
  return <section className="wall-sources" aria-labelledby="wall-sources-title">
    <h3 className="wall-sources-title" id="wall-sources-title">Where the drawings come from</h3>
    <p className="wall-sources-lede">
      The climate cartoons from India are CEEW’s, from their series <em>What On Earth!®</em>.
      They stay CEEW’s. They hang here with permission, and every one keeps CEEW’s credit and
      its link to where it was first published.
    </p>
    <a className="wall-sources-door" href="https://www.ceew.in/what-on-earth" target="_blank" rel="noopener noreferrer">
      What On Earth!® at CEEW <ArrowUpRight size={18} aria-hidden="true" />
    </a>
    <details className="wall-sources-list">
      <summary>All ten drawings in the series <ChevronDown size={16} aria-hidden="true" /></summary>
      <ol>
        {SERIES.map((item, index) => <li key={item.name}>
          <a href={item.to} target="_blank" rel="noopener noreferrer">
            <span className="wall-source-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span className="wall-source-name">{item.name}</span>
            <span className="wall-source-when">{item.when}</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </li>)}
      </ol>
    </details>
    <p className="wall-sources-copyright">© Council on Energy, Environment and Water, 2026.</p>
  </section>;
}