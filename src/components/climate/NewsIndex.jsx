import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ChevronDown, ArrowLeft, PenLine, ShieldCheck } from 'lucide-react';
import SignalsWhoAnswers from '@/components/climate/SignalsWhoAnswers';
import { MarkSignal } from '@/components/climate/RecordFootMarks';
import NewsIndexTools from '@/components/climate/NewsIndexTools';
import NewsLead from '@/components/climate/NewsLead';
import NewsRow from '@/components/climate/NewsRow';
import NewsTruthKey from '@/components/climate/NewsTruthKey';
import '@/components/climate/news-index.css';

const groupOf = (entry) => {
  const raw = entry.when_date || entry.created_date;
  const d = raw ? new Date(raw) : null;
  if (!d || Number.isNaN(d.getTime())) return 'Undated';
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
};

// The lead is the newest account, given the room a picture needs. Everything else
// runs under it as rows, grouped by the month it was recorded in.
function group(entries) {
  const out = [];
  entries.forEach((entry) => {
    const label = groupOf(entry);
    const last = out[out.length - 1];
    if (last && last.label === label) last.items.push(entry);
    else out.push({ label, items: [entry] });
  });
  return out;
}

export default function NewsIndex({ entries, loading, query, onQueryChange, kind, onKindChange, verification, onVerificationChange, onSubmit }) {
  const [lead, ...rest] = entries;
  const groups = group(rest);

  return (
    <section className="news-index" data-record-layout="compact" aria-labelledby="climate-news-title">
      <header className="news-index-heading">
        <div className="news-index-name">
          <MarkSignal size={24} />
          <h1 id="climate-news-title">Signals</h1>
        </div>
        <button type="button" className="news-text-action" onClick={onSubmit}><Plus size={15} aria-hidden="true" /> Send a signal</button>
      </header>
      {/* One line that answers the question the door asks: a signal is a dated change with a
          source, of three kinds — a warning, a marker, or something already working. Nothing
          on this record outside this room is called a signal, because a solution is an answer
          and a drawing is a drawing. */}
      <p className="news-index-intro">A dated change, with its source: a warning, a milestone, or something that works and can be copied. Nothing here is ranked.</p>

      <NewsIndexTools query={query} onQueryChange={onQueryChange} kind={kind} onKindChange={onKindChange} verification={verification} onVerificationChange={onVerificationChange} />

      {loading && <p className="news-state" role="status">Loading signals…</p>}

      {!loading && !lead && (
        <div className="news-state" role="status">
          <p>{query.trim() ? 'No signal matches those words. Try a place, a subject or a source.' : 'No signal under this heading yet.'}</p>
        </div>
      )}

      {!loading && lead && (
        <>
          <NewsLead entry={lead} />
          <NewsTruthKey />
          {/* Who answers for what, said before the list rather than in a footer nobody
              reaches. This is the page that could most easily put words in someone's mouth,
              so the line is drawn at the top of it. */}
          <SignalsWhoAnswers />
          {groups.map(({ label, items }) => (
            <div key={label} className="news-group-block">
              <h2 className="news-group">{label}</h2>
              <div className="news-rows">
                {items.map((entry) => <NewsRow key={entry.id} entry={entry} />)}
              </div>
            </div>
          ))}
        </>
      )}

      {query.trim() && (
        <Link className="news-text-action news-search-record" to={`/ClimateSearch?q=${encodeURIComponent(query.trim())}`}>Search the whole record →</Link>
      )}

      <details className="news-about">
        <summary>Why there is nothing to click <ChevronDown size={14} aria-hidden="true" /></summary>
        <p>No likes, counters or most-read. These are dated accounts, most recent first, each carrying its source and how well it is known. Sharing adds to no counter.</p>
        <p>Every account has a permanent address of its own, so a citation never rots. Corrections stay on the account, dated, in the open.</p>
      </details>

      <footer className="news-index-foot">
        <Link to="/TogetherChangeClimate" className="news-text-action"><ArrowLeft size={15} aria-hidden="true" /> The record</Link>
        {/* ── THE WAY ACROSS TO THE DRAWINGS ──────────────────────────────────────
            The cartoon room could only be reached by going back to the contents sheet, so a
            reader standing on the wire had no idea there were drawings on the same record.
            It goes in the wire's own foot, beside the other two doors, because the foot is
            where the wire already offers to take you somewhere else. */}
        <Link to="/ClimateCartoons" className="news-text-action"><PenLine size={15} aria-hidden="true" /> The cartoon room</Link>
        <Link to="/ClimateMethod" className="news-text-action"><ShieldCheck size={15} aria-hidden="true" /> Checks &amp; corrections</Link>
      </footer>
    </section>
  );
}