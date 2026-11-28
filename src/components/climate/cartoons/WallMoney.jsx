import React from 'react';
import { Link } from 'react-router-dom';

export default function WallMoney() {
  return <section className="wall-money" id="wall-money" aria-labelledby="wall-money-title">
    <p className="wall-support-kicker">Artists, people, planet</p>
    <h2 id="wall-money-title" className="comic-section-title">Stand behind the work.</h2>
    <p className="wall-money-lede"><strong>Free to see. Not free to make.</strong> Pay an artist, host a show or bring a skill. No bought influence. No reuse without the rights holder’s permission.</p>
    <p className="wall-money-door"><Link to="/ClimateLedger" className="wall-money-button">Stand behind the work</Link> <Link to="/ClimateLedger#ledger-lines" className="wall-money-quiet">The money, in public</Link> <Link to="/ClimateCartoons/Paid" className="wall-money-quiet">If you draw: what a drawing is worth</Link></p>
  </section>;
}