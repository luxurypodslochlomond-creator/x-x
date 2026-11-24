import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import NewsKindStamp from '@/components/climate/NewsKindStamp';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { verificationOf } from '@/components/climate/verification';
export default function NewsRow({ entry }) {
  const to = `/ClimateWireEntry/${entry.id}`;
  return <article className="news-row" data-kind={entry.kind} data-record-layout="compact">
    {entry.image_url && <figure><Link to={to} className="news-row-thumb" aria-label={`Read ${entry.headline}`}><img src={entry.image_url} alt={entry.headline} loading="lazy" decoding="async" /></Link>{entry.image_credit && <figcaption className="news-credit">{entry.image_credit}</figcaption>}</figure>}
    <div className="news-row-copy">
      <div className="news-row-meta"><NewsKindStamp kind={entry.kind} /><span className="news-row-when">{entry.when_label || entry.when_date || 'Undated'}</span></div>
      <h3 className="news-row-heading"><Link to={to}>{entry.headline}</Link></h3>
      <p className="news-row-excerpt">{entry.what_changed}</p>
      <p className="news-row-source">{[entry.where_label, entry.source_name, verificationOf(entry).label, entry.correction_note ? 'Corrected' : ''].filter(Boolean).join(' · ')}</p>
    </div>
    <div className="news-row-actions"><Link to={to} className="news-read">Read <ArrowUpRight size={16} /></Link><ShareCardButton entry={entry} compact previewFirst /></div>
  </article>;
}