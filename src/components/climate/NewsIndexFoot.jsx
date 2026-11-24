import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Images, ShieldCheck, ChevronDown, ArrowUpRight } from 'lucide-react';
const DOORS = [
  { to: '/TogetherChangeClimate', label: 'The record', line: 'Solutions, crises and action', Icon: BookOpen },
  { to: '/ClimateCartoons', label: 'The cartoon room', line: 'See the drawings and their artists', Icon: Images },
  { to: '/ClimateMethod', label: 'Checks & corrections', line: 'Trace a claim to its source', Icon: ShieldCheck },
];
export default function NewsIndexFoot({ query }) {
  return <>
    {query.trim() && <Link className="news-text-action news-search-record" to={`/ClimateSearch?q=${encodeURIComponent(query.trim())}`}>Search the whole record <ArrowUpRight size={16} /></Link>}
    <details className="news-about">
      <summary>Why there are no likes or rankings <ChevronDown size={18} aria-hidden="true" /></summary>
      <p>No likes, counters or most-read. These are dated accounts, most recent first, each carrying its source and how well it is known. Sharing adds to no counter.</p>
      <p>Every account has a permanent address of its own, so a citation never rots. Corrections stay on the account, dated, in the open.</p>
    </details>
    <nav className="news-index-foot" aria-label="Continue through the record">
      {DOORS.map(({ to, label, line, Icon }) => <Link key={to} to={to} className="news-room-door"><Icon size={26} aria-hidden="true" /><span><strong>{label}</strong><small>{line}</small></span><ArrowUpRight size={17} aria-hidden="true" /></Link>)}
    </nav>
  </>;
}