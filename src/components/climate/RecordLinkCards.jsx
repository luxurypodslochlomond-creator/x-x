import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import navigationIconFor from '@/components/climate/navigationIcons';
export default function RecordLinkCards({ links, label = 'Connected pages' }) {
  return <nav className="record-link-cards" aria-label={label}>{links.map(({ to, label: title, note, what }) => {
    const Icon = navigationIconFor(to);
    return <Link key={to} to={to}><Icon size={25} aria-hidden="true" /><span><strong>{title}</strong>{(note || what) && <small>{note || what}</small>}</span><ArrowUpRight size={17} aria-hidden="true" /></Link>;
  })}</nav>;
}