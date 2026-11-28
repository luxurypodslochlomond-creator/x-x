import React from 'react';
import { Link } from 'react-router-dom';
import { readingsFor, goalByNumber } from '@/components/climate/cartoons/cartoonGoals';
import '@/components/climate/cartoons/drawing-connections.css';

export default function DrawingConnections({ cartoon, onNavigate }) {
  const offered = cartoon.goal ? goalByNumber(Number(cartoon.goal)) : null;
  const readings = readingsFor(cartoon.title).filter(goal => goal.n !== offered?.n);
  const named = cartoon.artist_name && !/not yet named/i.test(cartoon.artist_name);
  const proposal = new URLSearchParams({ artist: cartoon.artist_name || '', work: cartoon.title || '' });
  return <nav className="drawing-connections" aria-label={`Follow the connections for ${cartoon.title || 'this drawing'}`}>
    {offered && <a className="drawing-goal-connection" href={`/ClimateCartoons#goal-button-${offered.n}`} onClick={onNavigate}><span className="drawing-goal-number"><small>GOAL</small>{String(offered.n).padStart(2, '0')}</span><span>{offered.name}<small>Sender’s choice</small></span></a>}
    {readings.map(goal => <a key={goal.n} className="drawing-goal-connection" href={`/ClimateCartoons#goal-button-${goal.n}`} onClick={onNavigate}><span className="drawing-goal-number"><small>GOAL</small>{String(goal.n).padStart(2, '0')}</span><span>{goal.name}<small>The record’s reading</small></span></a>)}
    {named && <Link className="drawing-support-connection" to={`/ClimateLedger?${proposal}#offer-help`} onClick={onNavigate}>Support this artist’s work · terms &amp; ledger</Link>}
  </nav>;
}