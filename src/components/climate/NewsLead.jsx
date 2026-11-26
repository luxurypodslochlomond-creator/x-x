import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import ArtworkShareButton from '@/components/climate/ArtworkShareButton';
import NewsKindStamp from '@/components/climate/NewsKindStamp';
import NewsEntryStanding from '@/components/climate/NewsEntryStanding';
import { recordAddress } from '@/components/climate/recordAddress';
export default function NewsLead({ entry }) {
  const to = `/ClimateWireEntry/${entry.id}`;
  return <article className="news-lead" data-kind={entry.kind} data-has-image={!!entry.image_url} data-record-layout="compact">
    <div className="news-lead-kicker"><NewsKindStamp kind={entry.kind} /><span className="news-lead-when">{entry.when_label || entry.when_date || 'Date not recorded'}</span></div>
    {entry.image_url && <figure><Link to={to} className="news-lead-plate" aria-label={`Read ${entry.headline}`}><img src={entry.image_url} alt={entry.headline} loading="eager" decoding="async" /></Link>{entry.image_credit && <figcaption className="news-credit">{entry.image_credit}</figcaption>}</figure>}
    <div className="news-lead-copy">
      <h2 className="news-lead-heading"><Link to={to}>{entry.headline}</Link></h2>
      <p className="news-lead-standfirst">{entry.what_changed}</p>
      {entry.replicable && <div className="news-lead-use"><h3>What others can use</h3><p>{entry.replicable}</p></div>}
      <NewsEntryStanding entry={entry} className="news-lead-meta" />
      {!entry.image_url && entry.image_credit && <p className="news-credit">Picture credited, not held here · {entry.image_credit}</p>}
      <div className="news-lead-actions"><Link to={to} className="news-read">Full account <ArrowUpRight size={17} /></Link><ShareCardButton entry={entry} compact previewFirst />{entry.image_url && <ArtworkShareButton id={entry.id} imageUrl={entry.image_url} title={entry.headline} credit={entry.image_credit} link={recordAddress(to)} />}</div>
    </div>
  </article>;
}