import React, { useState } from 'react';
import firstHandsWorks from '@/components/climate/cartoons/firstHandsWorks';
import HistoricalPrint from '@/components/climate/cartoons/HistoricalPrint';
import HistoricalPrintViewer from '@/components/climate/cartoons/HistoricalPrintViewer';
import HandsWeName from '@/components/climate/cartoons/HandsWeName';
import '@/components/climate/cartoons/historical-prints.css';

export default function CartoonFirstHands() {
  const [open, setOpen] = useState(null);
  return <section className="cartoon-first-hands" id="cartoon-first-hands" aria-labelledby="first-hands-title">
    <header>
      <p className="first-hands-kicker">Different times. Familiar questions.</p>
      <h2 className="first-hands-title" id="first-hands-title">Power, put on paper.</h2>
      <p className="first-hands-standfirst">Who pays? Who profits? Who gets heard? The oldest work here was scratched into a wall nearly two thousand years ago and the newest was made this year — each shown whole, with the maker and the source beside it. A record of drawing against power invented neither the idea nor the cheek of it. These are not all climate drawings, and they do not all take the same side.</p>
      <nav className="first-hands-start" aria-label="Four ways into the drawings">
        <a href="#historical-alexamenos">The oldest · Alexamenos ↓</a>
        <a href="#historical-goya">Reason · Goya ↓</a>
        <a href="#historical-daumier">Power · Daumier ↓</a>
        <a href="#historical-peterloo">Witness · Peterloo ↓</a>
      </nav>
    </header>
    <div className="historical-prints">
      {firstHandsWorks.map((work, index) => <HistoricalPrint key={work.id} work={work} onOpen={() => setOpen(index)} />)}
    </div>
    <HandsWeName />
    <p className="first-hands-note">This is a starting point, not the whole history of dissent. No nine pictures could be. The works run oldest first; each keeps its own context, credit and reproduction terms. The words beside them are the record’s, not quotations from their makers.</p>
    {open !== null && <HistoricalPrintViewer works={firstHandsWorks} index={open} onTurn={setOpen} onClose={() => setOpen(null)} />}
  </section>;
}