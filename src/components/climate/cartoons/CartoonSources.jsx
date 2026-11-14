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

export default function CartoonSources() {
  return (
    <aside className="comic-sources">
      <p className="record-meta">A nod to the cartoons Janine shared.</p>
      <a className="comic-source-link" href="https://www.ceew.in/what-on-earth" target="_blank" rel="noopener noreferrer">What On Earth!® · CEEW<ArrowUpRight size={18} /></a>
      <p className="record-meta">Their characters, drawings and name stay theirs. These are a different cast, made for this room.</p>
      <details className="mt-3">
        <summary className="comic-source-summary">Explore the series<ChevronDown size={16} /></summary>
        <div className="comic-source-list">{SERIES.map((item) => <a key={item.name} href={item.to} target="_blank" rel="noopener noreferrer"><span>{item.name}</span><span className="record-meta">{item.when}<ArrowUpRight size={14} /></span></a>)}</div>
      </details>
      <p className="record-meta comic-copyright">© Council on Energy, Environment and Water, 2026.</p>
    </aside>
  );
}