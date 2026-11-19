import React from 'react';
import { Link } from 'react-router-dom';
import ShareCardButton from '@/components/climate/ShareCardButton';
import NewsEntryBody from '@/components/climate/NewsEntryBody';
import NewsEntryImage from '@/components/climate/NewsEntryImage';
import { verificationOf, verificationNoteOf } from '@/components/climate/verification';
import '@/components/climate/wire-register.css';

const KINDS = { emergency: 'Emergency', milestone: 'Milestone', initiative: 'Initiative' };

export default function NewsEntryCard({ entry, linked = true, n }) {
  if (!linked) return <NewsEntryBody entry={entry} />;
  const to = `/ClimateWireEntry/${entry.id}`;
  return (
    <article className="news-entry" data-record-layout="compact">
      <p className="news-entry-meta">
        <span>{n ? `${n} · ` : ''}{entry.when_label || entry.when_date || 'Date not recorded'}</span>
        <span className={entry.kind === 'emergency' ? 'text-record-red' : ''}>{KINDS[entry.kind] || 'News'}{(entry.where_label || entry.country) && ` · ${entry.where_label || entry.country}`}</span>
      </p>
      <h2 className="news-entry-heading"><Link to={to}>{entry.headline}</Link></h2>
      <p className="news-entry-excerpt">{entry.what_changed}</p>
      {entry.image_url && <NewsEntryImage entry={entry} preview />}
      <p className="news-entry-source">
        Source · {entry.source_url ? <a href={entry.source_url} target="_blank" rel="noopener noreferrer">{entry.source_name} ↗</a> : entry.source_name}
        <span className="news-source-check" title={verificationNoteOf(entry)}>{verificationOf(entry).label}{entry.correction_note && ' · Correction recorded'}</span>
      </p>
      <div className="news-row-actions">
        <Link to={to} className="news-text-action" aria-label={`Read the full account: ${entry.headline}`}>Read more →</Link>
        <span className={`news-signer${entry.editor ? '' : ' news-signer-unsigned'}`}>{entry.editor ? `Recorded by ${entry.editor}` : 'Unsigned'}</span>
        <div className="news-share"><ShareCardButton entry={entry} compact /></div>
      </div>
    </article>
  );
}