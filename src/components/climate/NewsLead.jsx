import React from 'react';
import { Link } from 'react-router-dom';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { verificationOf, verificationNoteOf } from '@/components/climate/verification';

const KINDS = { emergency: 'Emergency', milestone: 'Milestone', initiative: 'Initiative' };

export default function NewsLead({ entry }) {
  const to = `/ClimateWireEntry/${entry.id}`;
  return (
    <article className="news-lead" data-record-layout="compact">
      <p className="news-lead-kicker">
        <span className="news-lead-kind"><i className={`news-kind news-kind-${entry.kind || 'initiative'}`} aria-hidden="true" />{KINDS[entry.kind] || 'News'}</span>
        <span>{entry.when_label || entry.when_date || 'Date not recorded'}</span>
      </p>

      {entry.image_url && (
        <Link to={to} className="news-lead-plate" tabIndex={-1} aria-hidden="true">
          <img src={entry.image_url} alt="" loading="eager" decoding="async" />
        </Link>
      )}

      <h2 className="news-lead-heading"><Link to={to}>{entry.headline}</Link></h2>
      <p className="news-lead-standfirst">{entry.what_changed}</p>

      <p className="news-lead-meta">
        {entry.where_label && <span>{entry.where_label}</span>}
        <span>Source · {entry.source_name}</span>
        <span title={verificationNoteOf(entry)}>{verificationOf(entry).label}</span>
        {entry.correction_note && <span className="news-emergency">Corrected</span>}
      </p>

      {entry.image_credit && <p className="news-credit">{entry.image_credit}</p>}

      <div className="news-lead-actions">
        <Link to={to} className="news-read">Read the full account →</Link>
        <div className="news-share"><ShareCardButton entry={entry} compact /></div>
      </div>
    </article>
  );
}