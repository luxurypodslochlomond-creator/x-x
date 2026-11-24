import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
// The record's own drawings, from the one map the masthead, the index and the foot all
// read. A connected page used to be given a generic lucide shape here while the same page
// wore a drawn mark on the rail — two pictures for one door.
import { markFor } from '@/components/climate/pageMarks';
export default function RecordLinkCards({ links, label = 'Connected pages' }) {
  return <nav className="record-link-cards" aria-label={label}>{links.map(({ to, label: title, note, what }) => {
    const Icon = markFor(to);
    return <Link key={to} to={to}><Icon size={25} aria-hidden="true" /><span><strong>{title}</strong>{(note || what) && <small>{note || what}</small>}</span><ArrowUpRight size={17} aria-hidden="true" /></Link>;
  })}</nav>;
}