import React from 'react';
import { Link } from 'react-router-dom';
import { readingsFor, goalByNumber } from '@/components/climate/cartoons/cartoonGoals';
import { recordSlug } from '@/components/climate/recordSlug';
import '@/components/climate/cartoons/drawing-connections.css';

export default function DrawingConnections({ cartoon, onNavigate }) {
  const offered = cartoon.goal ? goalByNumber(Number(cartoon.goal)) : null;
  const readings = readingsFor(cartoon.title).filter(goal => goal.n !== offered?.n);
  const named = cartoon.artist_name && !/not yet named/i.test(cartoon.artist_name);
  // ── ONE LINE, NOT FOUR ────────────────────────────────────────────────────────
  // This used to hand out /ClimateLedger?artist=…&work=…#offer-help, which arrived in an
  // inbox as four broken lines and could not be said out loud or typed from a printout.
  // The offer has a short door: /help/<the hand>, with the drawing after it when there is
  // one, and it opens exactly the same offer with the same two facts.
  const helpAddress = `/help/${recordSlug(cartoon.artist_name, 34)}${cartoon.title ? `/${recordSlug(cartoon.title, 34)}` : ''}`;
  return <nav className="drawing-connections" aria-label={`Follow the connections for ${cartoon.title || 'this drawing'}`}>
    {offered && <a className="drawing-goal-connection" href={`/ClimateCartoons#goal-button-${offered.n}`} onClick={onNavigate}><span className="drawing-goal-number"><small>GOAL</small>{String(offered.n).padStart(2, '0')}</span><span>{offered.name}<small>Sender’s choice</small></span></a>}
    {readings.map(goal => <a key={goal.n} className="drawing-goal-connection" href={`/ClimateCartoons#goal-button-${goal.n}`} onClick={onNavigate}><span className="drawing-goal-number"><small>GOAL</small>{String(goal.n).padStart(2, '0')}</span><span>{goal.name}<small>The record’s reading</small></span></a>)}
    {named && <Link className="drawing-support-connection" to={helpAddress} onClick={onNavigate}>Support this artist’s work · terms &amp; ledger</Link>}
  </nav>;
}