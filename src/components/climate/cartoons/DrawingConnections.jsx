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
    {offered && <a href={`/ClimateCartoons#goal-button-${offered.n}`} onClick={onNavigate}>Submitted for Goal {offered.n} · {offered.name}</a>}
    {readings.map(goal => <a key={goal.n} href={`/ClimateCartoons#goal-button-${goal.n}`} onClick={onNavigate}>The record’s reading: Goal {goal.n} · {goal.name}</a>)}
    {named && <Link to={`/ClimateLedger?${proposal}#offer-help`} onClick={onNavigate}>Offer paid support for {cartoon.artist_name}</Link>}
  </nav>;
}