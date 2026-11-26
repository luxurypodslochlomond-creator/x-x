import React from 'react';
import { Search, X, SlidersHorizontal, ChevronDown, LayoutGrid, Check } from 'lucide-react';
import NewsKindIcon from '@/components/climate/NewsKindIcon';
const KINDS = [{ id: 'all', label: 'All entries' }, { id: 'emergency', label: 'Crises' }, { id: 'milestone', label: 'Solutions' }, { id: 'initiative', label: 'Actions' }];
const FILTERS = [{ id: 'all', label: 'Any source' }, { id: 'official_record', label: 'Official record' }, { id: 'corroborated', label: 'Two sources' }, { id: 'single_source', label: 'One source' }];
export default function NewsIndexTools({ query, onQueryChange, kind, onKindChange, verification, onVerificationChange }) {
  return <div className="news-tools">
    <div className="news-search-row">
      <div className="news-search"><Search size={18} aria-hidden="true" /><label className="sr-only" htmlFor="climate-news-search">Search the Wire</label><input id="climate-news-search" type="search" value={query} onChange={event => onQueryChange(event.target.value)} placeholder="Place, subject or source" />{query && <button type="button" onClick={() => onQueryChange('')} aria-label="Clear search"><X size={17} /></button>}</div>
      <details className="news-source-menu"><summary aria-label={`Filter sources: ${FILTERS.find(item => item.id === verification)?.label || 'Any source'}`}><SlidersHorizontal size={18} /><span>Sources</span><ChevronDown size={15} /></summary><div role="group" aria-label="Filter updates by their sources">{FILTERS.map(({ id, label }) => <button key={id} type="button" aria-pressed={verification === id} onClick={event => { onVerificationChange(id); event.currentTarget.closest('details').open = false; }}><span>{label}</span>{verification === id && <Check size={17} />}</button>)}</div></details>
    </div>
    <div className="news-kinds" role="group" aria-label="Show one kind of entry">{KINDS.map(({ id, label }) => <button key={id} type="button" aria-pressed={kind === id} onClick={() => onKindChange(id)}>{id === 'all' ? <LayoutGrid size={18} /> : <NewsKindIcon kind={id} size={18} />}<span>{label}</span></button>)}</div>
    {verification !== 'all' && <p className="news-filter-current">Showing: {FILTERS.find(item => item.id === verification)?.label}<button type="button" onClick={() => onVerificationChange('all')}>Clear <X size={13} /></button></p>}
  </div>;
}