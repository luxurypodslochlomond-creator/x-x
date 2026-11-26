import React from 'react';
import { Plus, LoaderCircle, ArrowDown } from 'lucide-react';
import SignalsWhoAnswers from '@/components/climate/SignalsWhoAnswers';
import NewsIndexTools from '@/components/climate/NewsIndexTools';
import NewsLead from '@/components/climate/NewsLead';
import NewsRow from '@/components/climate/NewsRow';
import NewsTruthKey from '@/components/climate/NewsTruthKey';
import NewsIndexFoot from '@/components/climate/NewsIndexFoot';
import '@/components/climate/news-index.css';
import '@/components/climate/wire-mobile.css';
import '@/components/climate/wire-desktop.css';
import '@/components/climate/wire-phone.css';
export default function NewsIndex({ entries, keptDay, loading, query, onQueryChange, kind, onKindChange, verification, onVerificationChange, onSubmit, hasMore, loadingMore, onMore }) {
  const [lead, ...rest] = entries;
  // A search settling must not empty the page under the reader's thumb: the list stays
  // and one quiet line says it is looking. Only a first load has nothing to keep.
  const firstLoad = loading && !entries.length;
  const searching = loading && entries.length > 0;
  return <section className="news-index" data-record-layout="compact" aria-labelledby="climate-news-title">
    <header className="news-index-heading"><div><span className="news-eyebrow">The record · sourced updates</span><h1 id="climate-news-title">The Wire</h1></div><button type="button" className="news-send" onClick={onSubmit} aria-label="Add to the record" title="Add an entry to the record"><Plus size={22} aria-hidden="true" /><span>Add to the record</span></button></header>
    <p className="news-index-intro">What is happening. Who is doing something about it. Where the evidence leads.</p>
    <NewsIndexTools query={query} onQueryChange={onQueryChange} kind={kind} onKindChange={onKindChange} verification={verification} onVerificationChange={onVerificationChange} />
    {searching && <p className="news-searching" role="status">Searching the Wire…</p>}
    {/* No signal: the copy this phone kept, and the day it kept it. Never presented as live. */}
    {keptDay && <p className="news-searching" role="status">You are reading the copy this phone kept on {new Date(keptDay).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}. The Wire itself could not be reached.</p>}
    {firstLoad ? <p className="news-state" role="status"><LoaderCircle size={21} className="animate-spin" /> Loading the Wire…</p> : !lead ? <p className="news-state" role="status">{query.trim() ? 'No update matches those words. Try a place, a subject or a source.' : 'No update under this heading yet.'}</p> : <>
      <NewsLead entry={lead} />
      <div className="news-rows">{rest.map(entry => <NewsRow key={entry.id} entry={entry} />)}</div>
      {hasMore && <button type="button" className="news-load-more" onClick={onMore} disabled={loadingMore}>{loadingMore ? <LoaderCircle size={18} className="animate-spin" /> : <ArrowDown size={18} />}{loadingMore ? 'Loading…' : 'Load more updates'}</button>}
      <div className="news-context"><NewsTruthKey /><SignalsWhoAnswers /></div>
    </>}
    <NewsIndexFoot query={query} />
  </section>;
}