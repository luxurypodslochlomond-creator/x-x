import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { recordSlug } from '@/components/climate/recordSlug';
import ClimateWireEntry from '@/pages/ClimateWireEntry';
import '@/components/climate/news-index.css';

// ── THE SHORT DOOR TO ONE WIRE ENTRY ──────────────────────────────────────────
// /wire/antarctic-ozone-hole-closes — an entry's own address, short enough to say out
// loud, type into a phone, or read off a card. It was an id before, and an id is not a
// name: nobody sends one to a friend, and nobody reads one down a telephone.
//
// The name is the entry's own headline, so the address says what it opens. It resolves
// against the record as it actually stands — every published entry is read, and the one
// whose name matches opens. The entry page itself is the same page the long address
// opens, so there is one account and not two copies of one.
export default function ClimateWireShort() {
  const { slug } = useParams();
  const [state, setState] = useState('loading');
  const [entry, setEntry] = useState(null);

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
      const found = all.find((e) => recordSlug(e.headline, 44) === slug);
      setEntry(found || null);
      setState(found ? 'ready' : 'missing');
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

  if (state === 'missing' || !entry) {
    return (
      <div className="news-state">
        <p>No account at this address on the public record.</p>
        <Link to="/ClimateWire" className="news-text-action">← Back to the Wire</Link>
      </div>
    );
  }

  return <ClimateWireEntry id={entry.id} />;
}