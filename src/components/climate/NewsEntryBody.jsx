import React from 'react';
import { Link } from 'react-router-dom';
import NewsEntryImage from '@/components/climate/NewsEntryImage';
import SignedBy from '@/components/climate/SignedBy';
import NewsRegister from '@/components/climate/NewsRegister';
import { verificationOf, verificationNoteOf } from '@/components/climate/verification';

export default function NewsEntryBody({ entry }) {
  return (
    <article className="news-full-account" data-record-layout="compact">
      {/* The entry opens with its own register line: kind, record id, when it was filed,
          who says so, how it stands, and whether it has ever been corrected. */}
      <NewsRegister entry={entry} />
      <h1 className="news-account-heading">{entry.headline}</h1>
      <p className="news-account-text">{entry.what_changed}</p>
      <NewsEntryImage entry={entry} />
      {entry.replicable && <section className="news-account-note"><h2>What others can use</h2><p>{entry.replicable}</p></section>}
      {entry.correction_note && <section id="corrections" className="news-account-note"><h2 className="text-record-red">Correction</h2><p>{entry.correction_note}</p><Link to="/ClimateMethod#corrections" className="news-text-action text-record-red">All corrections →</Link></section>}
      <div className="news-account-attribution">
        <p className="news-entry-source">Source · {entry.source_url ? <a href={entry.source_url} target="_blank" rel="noopener noreferrer">{entry.source_name} ↗</a> : entry.source_name}</p>
        {entry.corroborating_source && <p className="news-entry-source">Second source · {entry.corroborating_source}</p>}
        <p className="news-entry-source" title={verificationNoteOf(entry)}>{verificationOf(entry).label}</p>
        <SignedBy name={entry.editor} date={entry.reviewed_date} compact />
      </div>
    </article>
  );
}