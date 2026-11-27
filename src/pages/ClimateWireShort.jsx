import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { findBySlug } from '@/components/climate/recordSlug';
import ShortDoorChooser from '@/components/climate/ShortDoorChooser';
import ClimateWireEntry from '@/pages/ClimateWireEntry';
import '@/components/climate/news-index.css';

// ── THE SHORT DOOR TO ONE WIRE ENTRY ──────────────────────────────────────────
// /wire/antarctic-ozone-hole-closes — an entry's own headline as its address, short
// enough to say out loud, type into a phone, or read off a card. It was an id before, and
// an id is not a name: nobody sends one to a friend, and nobody reads one down a telephone.
//
// Two entries that honestly share a headline are shown together and the reader chooses,
// rather than the address quietly opening one of them. The entry page is the same page the
// long address opens: one account, not two.
export default function ClimateWireShort() {
  const { slug } = useParams();
  const [state, setState] = useState('loading');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    let alive = true;
    setState('loading');
    (async () => {
      const all = [];
      let cursor = null;
      do {
        const page = await base44.entities.ClimateNews.filter(
          { status: 'published' },
          { sort: '-created_date', limit: 100, ...(cursor ? { cursor } : {}) },
        );
        all.push(...(page.items || []));
        cursor = page.has_more ? page.next_cursor : null;
      } while (cursor && alive);
      if (!alive) return;
      const found = findBySlug(all, slug, (e) => e.headline, 44);
      setMatches(found);
      setState(found.length ? 'ready' : 'missing');
    })().catch(() => { if (alive) setState('missing'); });
    return () => { alive = false; };
  }, [slug]);

  useEffect(() => {
    if (state !== 'missing') return;
    const meta = document.createElement('meta');
    meta.name = 'prerender-status-code';
    meta.content = '404';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, [state]);

  if (state === 'loading') return <p className="news-state" role="status">Loading the account…</p>;

  if (state === 'missing') {
    return (
      <div className="news-state">
        <p>No account at this address on the public record.</p>
        <Link to="/ClimateWire" className="news-text-action">← Back to the Wire</Link>
      </div>
    );
  }

  if (matches.length > 1) {
    return (
      <ShortDoorChooser
        slug={slug}
        items={matches.map((e) => ({
          label: e.headline,
          note: e.when_label || e.source_name,
          to: `/ClimateWireEntry/${e.id}`,
        }))}
      />
    );
  }

  return <ClimateWireEntry id={matches[0].id} />;
}