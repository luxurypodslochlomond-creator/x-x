import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { markFor } from '@/components/climate/pageMarks';
// The same drawn marks the masthead uses, so a door looks like itself wherever a reader
// meets it — on the rail, in the index, and here at the foot of the wire.
const DOORS = [
  { to: '/TogetherChangeClimate', label: 'The record', line: 'Solutions, crises and action' },
  { to: '/ClimateCartoons', label: 'The Wall', line: 'Climate cartoons, signed — and Janine Selendy’s hour on them, Sunday 3pm West Africa / 2pm UK' },
  { to: '/ClimateMethod', label: 'Checks & corrections', line: 'Trace a claim to its source' },
];
export default function NewsIndexFoot({ query }) {
  return <>
    {query.trim() && <Link className="news-text-action news-search-record" to={`/ClimateSearch?q=${encodeURIComponent(query.trim())}`}>Search the whole record <ArrowUpRight size={16} /></Link>}
    <details className="news-about">
      <summary>Why there are no likes or rankings <ChevronDown size={18} aria-hidden="true" /></summary>
      <p>No likes, counters or most-read. These are dated accounts, most recent first, each carrying its source and how well it is known. Sharing adds to no counter.</p>
      <p>Every account has its own address so it can be cited directly. Corrections stay on the account, dated, in the open.</p>
    </details>
    <nav className="news-index-foot" aria-label="Continue through the record">
      {DOORS.map(({ to, label, line }) => {
        const Icon = markFor(to);
        return <Link key={to} to={to} className="news-room-door"><Icon size={26} aria-hidden="true" /><span><strong>{label}</strong><small>{line}</small></span><ArrowUpRight size={17} aria-hidden="true" /></Link>;
      })}
    </nav>
  </>;
}