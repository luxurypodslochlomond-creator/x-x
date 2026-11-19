import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import NewsIndex from '@/components/climate/NewsIndex';
import NewsSubmitForm from '@/components/climate/NewsSubmitForm';
import useRecordViewState from '@/components/climate/useRecordViewState';

// The wire — the record's front page. What changed, where, who says so, and what can be
// copied from it. Ordered by date, never by attention. Nothing counts here: no likes,
// no views, no ranking. Every entry shows how well it is known.

export default function ClimateWire() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useRecordViewState('verification', 'all');
  const [formOpen, setFormOpen] = useState(false);
  const [reload, setReload] = useState(0);
  // The wire has its own search, because somebody standing on the wire should not have to
  // leave it to find something they remember reading here. It reads every word an entry
  // carries and it runs in the browser, so asking costs the record nothing.
  const [q, setQ] = useState(() => new URLSearchParams(window.location.search).get('q') || '');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const query = filter === 'all' ? { status: 'published' } : { status: 'published', verification: filter };
    base44.entities.ClimateNews.filter(query, { sort: '-when_date', limit: 50 })
      .then(page => { if (!cancelled) setEntries(page.items || []); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [filter, reload]);

  // Every word an entry carries — headline, what changed, what can be copied, the source,
  // the place, the picture credit, the second source, the person who signed it. Every word
  // given must be present, so "seagrass scotland" finds entries holding both.
  const words = q.trim().toLowerCase().split(/\s+/).filter((w) => w.length > 1);
  const holds = (e) =>
    [e.headline, e.what_changed, e.replicable, e.source_name, e.source_author, e.where_label,
      e.country, e.category, e.publisher_type, e.when_label, e.image_credit,
      e.corroborating_source, e.editor]
      .filter(Boolean).join(' ').toLowerCase();
  const shown = words.length
    ? entries.filter((e) => { const h = holds(e); return words.every((w) => h.includes(w)); })
    : entries;

  return (
    <div className="news-page text-record-ink">
      <NewsIndex entries={shown} loading={loading} query={q} onQueryChange={setQ} verification={filter} onVerificationChange={setFilter} onSubmit={() => setFormOpen(true)} />
      {formOpen && <NewsSubmitForm onClose={() => setFormOpen(false)} onSent={() => setReload(r => r + 1)} />}
    </div>
  );
}