import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import NewsEntryReferences from '@/components/climate/NewsEntryReferences';
import '@/components/climate/news-index.css';
import '@/components/climate/wire-mobile.css';
import RecordBackBar from '@/components/climate/RecordBackBar';
import NewsEntryBody from '@/components/climate/NewsEntryBody';
import { recordAddress } from '@/components/climate/recordAddress';
import ShareCardButton from '@/components/climate/ShareCardButton';
import TapToPlayFilm from '@/components/climate/TapToPlayFilm';
import recordKindOf from '@/components/climate/recordKinds';

// One entry on its own permanent address. A researcher cites this page, not the front
// page, so the entry, its source and how well it is known all travel together in the link.

export default function ClimateWireEntry() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    base44.entities.ClimateNews.get(id)
      .then(record => { if (!cancelled) setEntry(record); })
      .catch(() => { if (!cancelled) setEntry(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  // ── THE DOOR OPENS ON THE THING IT NAMES ──────────────────────────────────────
  // "Corrected" and "Single source" on a Wire entry now point at the correction and at the
  // source block on this page. React Router does not scroll to a hash, and the shell sends
  // every route change to the top — so without this the link would land a reader at the top
  // of the account and leave them hunting for the sentence they clicked, which is exactly
  // the fault Brian named. Once the entry is on the page, its anchor is scrolled to.
  useEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (!entry || !id) return;
    document.getElementById(id)?.scrollIntoView({ block: 'start' });
  }, [entry]);

  const citation = entry
    ? `${entry.source_name}. "${entry.headline}" Together We Can Change Climate — an entry on the record, ${entry.when_label}. ${recordAddress()}`
    : '';

  return (
    <div className="news-detail text-record-ink" data-record-kind={recordKindOf(entry?.kind)} data-record-layout="compact">
      <RecordBackBar eyebrow="The Wire · full account" fallback="/ClimateWire" right={entry ? <div className="news-share"><ShareCardButton entry={entry} compact instant /></div> : null} />
      <div className="news-detail-column">
        {loading && <p className="news-state" role="status">Loading the account…</p>}
        {!loading && !entry && <div className="news-state"><p>This account is not available on the public record.</p><Link to="/ClimateWire" className="news-text-action">← Back to the Wire</Link></div>}
        {entry && <>
          <NewsEntryBody entry={entry} />
          <TapToPlayFilm url={entry.source_url} title={entry.headline} credit={entry.image_credit ? `Film · ${entry.image_credit}` : entry.source_name ? `Film · ${entry.source_name}` : null} />
          <NewsEntryReferences entry={entry} citation={citation} />
          <p className="news-detail-note">Something wrong? <Link to="/ClimateMethod#say">Report it</Link>. Corrections stay with the account, dated and visible.</p>
          <Link to="/ClimateWire" className="news-text-action">← The Wire</Link>
        </>}
      </div>
    </div>
  );
}