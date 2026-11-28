import React from 'react';
import { Link } from 'react-router-dom';

export default function WallMoney() {
  return <section className="wall-money" id="wall-money" aria-labelledby="wall-money-title">
    <p className="wall-support-kicker">Artists, people, planet</p>
    <h2 id="wall-money-title" className="comic-section-title">Stand behind the work.</h2>
    <p className="wall-money-lede"><strong>Free to see. Not free to make.</strong> Pay an artist, host a show or bring a skill. No bought influence. No reuse without the rights holder’s permission.</p>
    {/* Francis, 28 November: cartoonists kept asking what a drawing is worth here and could
        not find the answer, because it sat behind a quiet link at the foot of sixteen
        drawings. The question a cartoonist arrives with is the first door now. */}
    <p className="wall-money-door"><Link to="/ClimateCartoons/Paid" className="wall-money-button">If you draw: what a drawing is worth</Link> <Link to="/ClimateLedger" className="wall-money-button">Stand behind the work</Link> <Link to="/ClimateLedger#ledger-lines" className="wall-money-quiet">The money, in public</Link> <Link to="/ClimateCartoons/Answered" className="wall-money-quiet">Whose the idea is, whose the drawing</Link></p>
  </section>;
}