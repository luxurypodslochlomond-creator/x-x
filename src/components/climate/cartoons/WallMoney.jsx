import React from 'react';
import { Link } from 'react-router-dom';

export default function WallMoney() {
  return <section className="wall-money" id="wall-money" aria-labelledby="wall-money-title">
    <p className="wall-support-kicker">Artists, people, planet</p>
    <h2 id="wall-money-title" className="comic-section-title">Stand behind the work.</h2>
    <p className="wall-money-lede">Credit is not payment. Pay an artist. Commission work. Host a show. Bring a skill or a place. Support buys no place in the order of this wall, and displaying a drawing gives nobody permission to reuse it.</p>
    <p className="wall-money-door"><Link to="/ClimateLedger">Ways to help, the terms and the open ledger</Link></p>
  </section>;
}