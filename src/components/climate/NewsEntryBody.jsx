import React from 'react';
import { Link } from 'react-router-dom';
import NewsEntryImage from '@/components/climate/NewsEntryImage';
import SignedBy from '@/components/climate/SignedBy';
import { verificationOf, verificationNoteOf } from '@/components/climate/verification';

const KINDS = { emergency: 'Emergency', milestone: 'Milestone', initiative: 'Initiative' };

export default function NewsEntryBody({ entry }) {
  return (
    <article className="news-full-account" data-record-layout="compact">
      <p className="news-entry-meta"><span>{entry.when_label || entry.when_date || 'Date not recorded'}</span><span>{KINDS[entry.kind] || 'News'}{(entry.where_label || entry.country) && ` · ${entry.where_label || entry.country}`}</span></p>
      <h1 className="news-account-heading">{entry.headline}</h1>
      <p className="news-account-text">{entry.what_changed}</p>
      <NewsEntryImage entry={entry} />
      {entry.replicable && <section className="news-account-note"><h2>What others can use</h2><p>{entry.replicable}</p></section>}
      {entry.correction_note && <section className="news-account-note"><h2 className="text-record-red">Correction</h2><p>{entry.correction_note}</p><Link to="/ClimateMethod#corrections" className="news-text-action text-record-red">All corrections →</Link></section>}
      <div className="news-account-attribution">
        <p className="news-entry-source">Source · {entry.source_url ? <a href={entry.source_url} target="_blank" rel="noopener noreferrer">{entry.source_name} ↗</a> : entry.source_name}</p>
        {entry.corroborating_source && <p className="news-entry-source">Second source · {entry.corroborating_source}</p>}
        <p className="news-entry-source" title={verificationNoteOf(entry)}>{verificationOf(entry).label}</p>
        <SignedBy name={entry.editor} date={entry.reviewed_date} compact />
      </div>
    </article>
  );
}