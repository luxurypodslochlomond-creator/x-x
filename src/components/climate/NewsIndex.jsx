import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ChevronDown } from 'lucide-react';
import { MarkSignal } from '@/components/climate/RecordFootMarks';
import NewsIndexTools from '@/components/climate/NewsIndexTools';
import NewsEntryCard from '@/components/climate/NewsEntryCard';
import '@/components/climate/news-index.css';

export default function NewsIndex({ entries, loading, query, onQueryChange, verification, onVerificationChange, onSubmit }) {
  return (
    <section className="news-index" data-record-layout="compact" aria-labelledby="climate-news-title">
      <header className="news-index-heading">
        <div className="news-index-name"><MarkSignal size={24} /><h1 id="climate-news-title">Climate news</h1></div>
        <button type="button" className="news-text-action" onClick={onSubmit}><Plus size={15} aria-hidden="true" /> Send news</button>
      </header>
      <p className="news-index-intro">What happened, where, and who says so.</p>
      <NewsIndexTools query={query} onQueryChange={onQueryChange} verification={verification} onVerificationChange={onVerificationChange} />
      {loading ? <p className="news-state" role="status">Loading news…</p> : entries.length ? (
        <div className="news-list">{entries.map((entry) => <NewsEntryCard key={entry.id} entry={entry} />)}</div>
      ) : (
        <div className="news-state" role="status">
          <p>{query.trim() ? 'No news matches those words. Try a place, a subject or a source.' : 'No news under this heading yet.'}</p>
        </div>
      )}
      {query.trim() && <Link className="news-text-action news-search-record" to={`/ClimateSearch?q=${encodeURIComponent(query.trim())}`}>Search the whole record →</Link>}
      <details className="news-about">
        <summary>Sources, not popularity <ChevronDown size={14} aria-hidden="true" /></summary>
        <p>These are dated accounts of climate events and work people can learn from. Each names its source and how well it is known. Open a headline for the full account, pictures, credits and anything others can copy.</p>
        <p>Most recent dates first. No likes, rankings or paid places. Sharing does not add to a counter.</p>
      </details>
      <footer className="news-index-foot">
        <Link to="/TogetherChangeClimate" className="news-text-action">← The record</Link>
        <Link to="/ClimateMethod" className="news-text-action">Checks & corrections →</Link>
      </footer>
    </section>
  );
}