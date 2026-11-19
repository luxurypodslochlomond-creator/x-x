import React from 'react';
import { Link } from 'react-router-dom';
import NewsKindStamp from '@/components/climate/NewsKindStamp';
import { verificationOf } from '@/components/climate/verification';

export default function NewsRow({ entry }) {
  const to = `/ClimateWireEntry/${entry.id}`;
  return (
    <article className="news-row" data-record-layout="compact">
      {entry.image_url && (
        <Link to={to} className="news-row-thumb" tabIndex={-1} aria-hidden="true">
          <img src={entry.image_url} alt="" loading="lazy" decoding="async" />
        </Link>
      )}
      <div className="news-row-copy">
        <p className="news-row-meta">
          <NewsKindStamp kind={entry.kind} />
          <span className="news-row-when">{entry.when_label || entry.when_date || 'Undated'}</span>
          {entry.where_label && <span>{entry.where_label}</span>}
        </p>
        <h3 className="news-row-heading"><Link to={to}>{entry.headline}</Link></h3>
        <p className="news-row-source">
          {entry.source_name} · {verificationOf(entry).label}
          {entry.correction_note ? ' · Corrected' : ''}
        </p>
      </div>
    </article>
  );
}