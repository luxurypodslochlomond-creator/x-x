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
export default function NewsIndex({ entries, loading, query, onQueryChange, kind, onKindChange, verification, onVerificationChange, onSubmit, hasMore, loadingMore, onMore }) {
  const [lead, ...rest] = entries;
  return <section className="news-index" data-record-layout="compact" aria-labelledby="climate-news-title">
    <header className="news-index-heading"><div><span className="news-eyebrow">Signals · Record of the Time</span><h1 id="climate-news-title">The Wire.</h1></div><button type="button" className="news-send" onClick={onSubmit} aria-label="Send a signal" title="Send a signal"><Plus size={22} aria-hidden="true" /><span>Send a signal</span></button></header>
    <p className="news-index-intro">What changed. Who says so. What others can use.</p>
    <NewsIndexTools query={query} onQueryChange={onQueryChange} kind={kind} onKindChange={onKindChange} verification={verification} onVerificationChange={onVerificationChange} />
    {loading ? <p className="news-state" role="status"><LoaderCircle size={21} className="animate-spin" /> Loading signals…</p> : !lead ? <p className="news-state" role="status">{query.trim() ? 'No signal matches those words. Try a place, a subject or a source.' : 'No signal under this heading yet.'}</p> : <>
      <NewsLead entry={lead} />
      <div className="news-context"><NewsTruthKey /><SignalsWhoAnswers /></div>
      <div className="news-rows">{rest.map(entry => <NewsRow key={entry.id} entry={entry} />)}</div>
      {hasMore && <button type="button" className="news-load-more" onClick={onMore} disabled={loadingMore}>{loadingMore ? <LoaderCircle size={18} className="animate-spin" /> : <ArrowDown size={18} />}{loadingMore ? 'Loading…' : 'Load more signals'}</button>}
    </>}
    <NewsIndexFoot query={query} />
  </section>;
}