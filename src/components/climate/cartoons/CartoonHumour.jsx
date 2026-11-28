import React from 'react';
import { Link } from 'react-router-dom';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { recordOrigin } from '@/components/climate/recordAddress';
import { buildHumourShareCard } from '@/components/climate/cartoons/humourCard';
import { HUMOUR, HUMOUR_CARD, HUMOUR_FIGURES } from '@/components/climate/cartoons/humourFacts';
import { InkArrow } from '@/components/climate/cartoons/CartoonInkIcons';
import '@/components/climate/cartoons/cartoon-humour.css';

// ── THE CASE FOR THE JOKE ────────────────────────────────────────────────────
// Francis sent a research session — DELIAH's "How can humour inspire action?", given at his
// own biennial — and Brian's question was whether this room could make its own version of
// that case rather than point at somebody else's. It can, and it should be the harder one.
//
// Three things this chapter refuses to do, because they are what a page like this usually
// does. It does not claim that research has proved humour works, because the research is
// somebody else's and I have not read their findings — it points at them and credits them.
// It does not print the record's figures without the bodies that gave them. And it does not
// pretend a drawing is evidence: the numbers are the evidence, the drawing is the door.
export default function CartoonHumour() {
  return (
    <section className="cartoon-humour" id="cartoon-humour" aria-labelledby="cartoon-humour-title">
      <p className="cartoon-humour-eyebrow">{HUMOUR.eyebrow}</p>
      <h2 id="cartoon-humour-title" className="comic-section-title">{HUMOUR.headline}</h2>
      <p className="cartoon-humour-standfirst">{HUMOUR.standfirst}</p>
      <p className="cartoon-humour-research">
        {HUMOUR.research.line}{' '}
        <a href={HUMOUR.research.href} target="_blank" rel="noopener noreferrer">
          {HUMOUR.research.label} ↗
        </a>
      </p>

      <p className="cartoon-humour-kicker">{HUMOUR.counted}</p>
      <ol className="cartoon-humour-ledger">
        {HUMOUR_FIGURES.map((figure) => (
          <li key={figure.id}>
            <p className="cartoon-humour-figure">
              <strong>{figure.value}</strong>
              <span>{figure.unit}</span>
            </p>
            <p className="cartoon-humour-figure-title">{figure.title}</p>
            <p className="cartoon-humour-source">
              <a href={figure.href} target="_blank" rel="noopener noreferrer">{figure.source}</a>
            </p>
          </li>
        ))}
      </ol>

      <p className="cartoon-humour-turn">{HUMOUR.turn}</p>
      <p className="cartoon-humour-turn-note">{HUMOUR.turnNote}</p>

      <ol className="cartoon-humour-beats">
        {HUMOUR.beats.map((beat) => (
          <li key={beat.head}>
            <p className="cartoon-humour-beat-head">{beat.head}</p>
            <p className="cartoon-humour-beat-body">{beat.body}</p>
          </li>
        ))}
      </ol>

      <div className="cartoon-humour-edge">
        <p className="cartoon-humour-edge-head">{HUMOUR.edge.head}</p>
        <p className="cartoon-humour-edge-body">{HUMOUR.edge.body}</p>
      </div>

      <div className="cartoon-humour-gift">
        <p className="cartoon-humour-gift-head">{HUMOUR.gift.head}</p>
        <p className="cartoon-humour-gift-body">{HUMOUR.gift.body}</p>
        <p className="cartoon-humour-gift-doors">
          <Link to="/ClimateCartoons/WhatThisIs">Your work and your rights, in plain words</Link>
          <span aria-hidden="true"> · </span>
          <Link to="/ClimateCartoons/CAIB">Where this room stands beside CAIB</Link>
        </p>
      </div>

      {/* The card carries the argument and the five figures, so the case can travel without
          anybody having to carry a page with it. */}
      <div className="cartoon-humour-share">
        <ShareCardButton
          entry={HUMOUR_CARD}
          build={buildHumourShareCard}
          label="Pass the case on"
          link={`${recordOrigin()}/ClimateCartoons`}
          description={HUMOUR.shareLine}
          icon={InkArrow}
          previewFirst
          includeMessage
          windowTitle="Pass the case on"
          alt="The laugh is the door: the record’s five counted figures, printed on the record’s yellow"
        />
      </div>
    </section>
  );
}