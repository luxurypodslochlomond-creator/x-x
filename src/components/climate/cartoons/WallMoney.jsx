import React from 'react';
import { Link } from 'react-router-dom';

export default function WallMoney() {
  return <section className="wall-money" id="wall-money" aria-labelledby="wall-money-title">
    <p className="wall-support-kicker">Artists, people, planet</p>
    <h2 id="wall-money-title" className="comic-section-title">Stand behind the work.</h2>
    <p className="wall-money-lede">Pay an artist. Host a show. Bring a source, a skill or a place. Help can take more than one form; none of it buys the work, the reader or the order of this wall.</p>
    <p className="wall-money-door"><Link to="/ClimateLedger">Ways to help, the terms and the open ledger</Link></p>
  </section>;
}