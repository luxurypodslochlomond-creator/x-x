import React from 'react';
import { Link } from 'react-router-dom';

// ── THE QUESTION A CARTOONIST ACTUALLY ASKS ──────────────────────────────────
// Francis, 28 November: the artists are asking him about payment, and he has no money to
// give them. The wrong answers are a donation button with no rule behind it, a promise of
// a fund that does not exist, and a paragraph written for a funder. So this says the whole
// of it in plain words, and then points at the page where the money is printed line by
// line. Nothing here is offered as a wage, and nothing here is dressed up.
const TERMS = [
  ['Your drawing stays yours.', 'Nothing on this wall is sold, licensed, gated or ranked. It is free to look at, for everyone, for good.'],
  ['Paid work is paid to you.', 'If somebody commissions a drawing, they pay the hand that makes it, at the price that hand sets. The drawing still goes up free, like every other one.'],
  ['A gift nobody aimed at anything is split equally.', 'Between the hands that gave work in the last year. No vote, no ranking, no favourites. A share that cannot be paid yet waits, marked owed, rather than going to somebody else.'],
  ['No advertorial. Not now, not later.', 'No sponsor’s drawing, no paid place on the wall, no brand standing beside your work.'],
  ['Every payment is printed.', 'Who paid, how much, what it bought, the fee taken on the way, and the hand it reached. You can total it yourself.'],
];

export default function WallMoney() {
  return <section className="wall-money" id="wall-money" aria-labelledby="wall-money-title">
    <h2 id="wall-money-title" className="comic-section-title">What about money.</h2>
    <p className="wall-money-lede">A drawing is not a wage, and nobody here will pretend it is. But a hand that gives work should not be left guessing what happens next, so here is all of it, plainly.</p>
    <ul className="wall-money-terms">
      {TERMS.map(([lead, body]) => <li key={lead}><strong>{lead}</strong> {body}</li>)}
    </ul>
    <p className="wall-money-ask">If you want something arranged for your own work — a commission, a way for readers to give towards it — ask, and the record will say plainly what it can do and what it cannot, rather than promise you a fund it has not got.</p>
    <p className="wall-money-door"><Link to="/ClimateLedger">The ledger: the rule, and every line that has moved →</Link></p>
  </section>;
}