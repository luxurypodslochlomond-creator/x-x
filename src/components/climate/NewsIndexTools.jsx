import React from 'react';
import { Search, X } from 'lucide-react';

// What the entries are, first: a warning, a marker, or something already working.
const KINDS = [
  { id: 'all', label: 'All entries' },
  { id: 'emergency', label: 'Emergencies' },
  { id: 'milestone', label: 'Milestones' },
  { id: 'initiative', label: 'Initiatives' },
];

const FILTERS = [
  { id: 'all', label: 'Any source', meaning: 'Every signal' },
  { id: 'official_record', label: 'Official record', meaning: 'Published by the body responsible' },
  { id: 'corroborated', label: 'Two sources', meaning: 'Corroborated by independent sources' },
  { id: 'single_source', label: 'One source', meaning: 'A single source is recorded' },
];

export default function NewsIndexTools({ query, onQueryChange, kind, onKindChange, verification, onVerificationChange }) {
  return (
    <div className="news-tools">
      <div className="news-search">
        <Search size={16} aria-hidden="true" />
        <label className="sr-only" htmlFor="climate-news-search">Search signals</label>
        <input id="climate-news-search" type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search a place, subject or source" />
        {query && <button type="button" onClick={() => onQueryChange('')} aria-label="Clear search"><X size={16} /></button>}
      </div>
      <div className="news-kinds" role="group" aria-label="Show one kind of entry">
        {KINDS.map(({ id, label }) => (
          <button key={id} type="button" aria-pressed={kind === id} onClick={() => onKindChange(id)}>{label}</button>
        ))}
      </div>
      <div className="news-filters" role="group" aria-label="Filter signals by their sources">
        {FILTERS.map(({ id, label, meaning }) => (
          <button key={id} type="button" aria-pressed={verification === id} title={meaning} onClick={() => onVerificationChange(id)}>{label}</button>
        ))}
      </div>
    </div>
  );
}