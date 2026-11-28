import React from 'react';
import ShareWord from '@/components/climate/cartoons/share/ShareWord';
import { descriptionLine, eventLines, shareLines, ONE_LINE } from '@/components/climate/cartoons/share/shareLines';

export default function ShareReferenceMessages({ count }) {
  const description = descriptionLine();
  return <section className="invitation-reference" aria-labelledby="invitation-reference-title">
    <h2 id="invitation-reference-title" className="invitation-heading">The words behind it.</h2>
    <details className="invitation-fold">
      <summary>Janine’s description · unchanged</summary>
      <ShareWord where={description.where} text={description.text} />
    </details>
    <details className="invitation-fold">
      <summary>The biennial · 28–30 November, Benin City</summary>
      {eventLines().map(line => <ShareWord key={line.id} {...line} />)}
    </details>
    <details className="invitation-fold">
      <summary>The wall · captions, messages and print</summary>
      <div className="invitation-reference-grid">{shareLines(count).map(line => <ShareWord key={line.id} {...line} />)}</div>
    </details>
    <details className="invitation-fold">
      <summary>One line for anywhere</summary>
      <ShareWord where="One line" text={ONE_LINE} />
    </details>
  </section>;
}