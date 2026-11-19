import React from 'react';
import { Search, X } from 'lucide-react';

const FILTERS = [
  { id: 'all', label: 'All', meaning: 'All news' },
  { id: 'official_record', label: 'Official record', meaning: 'Published by the body responsible' },
  { id: 'corroborated', label: 'Two sources', meaning: 'Corroborated by independent sources' },
  { id: 'single_source', label: 'One source', meaning: 'A single source is recorded' },
];

export default function NewsIndexTools({ query, onQueryChange, verification, onVerificationChange }) {
  return (
    <div className="news-tools">
      <div className="news-search">
        <Search size={16} aria-hidden="true" />
        <label className="sr-only" htmlFor="climate-news-search">Search climate news</label>
        <input id="climate-news-search" type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search a place, subject or source" />
        {query && <button type="button" onClick={() => onQueryChange('')} aria-label="Clear search"><X size={16} /></button>}
      </div>
      <div className="news-filters" role="group" aria-label="Filter news by its sources">
        {FILTERS.map(({ id, label, meaning }) => (
          <button key={id} type="button" aria-pressed={verification === id} title={meaning} onClick={() => onVerificationChange(id)}>{label}</button>
        ))}
      </div>
    </div>
  );
}