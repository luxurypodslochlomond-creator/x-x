import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { findBySlug } from '@/components/climate/recordSlug';
import ShortDoorChooser from '@/components/climate/ShortDoorChooser';
import ClimateCartoonSheet from '@/pages/ClimateCartoonSheet';
import '@/components/climate/cartoons/sheet/sheet.css';

// ── THE SHORT DOOR TO ONE DRAWING ──────────────────────────────────────────────
// /w/rain-check — a drawing's address that a person can say out loud, type into a
// phone, or copy off a printout without getting it wrong.
//
// It resolves the name against the wall as the record actually stands. If two drawings are
// honestly called the same thing, the address shows both and the reader chooses, because
// opening the wrong drawing under the right name is the one mistake this record must never
// make. The sheet is the same component the long address opens: one drawing, not two.
export default function ClimateCartoonShort() {
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
        const page = await base44.entities.ClimateCartoon.filter(
          { status: 'published' },
          { sort: '-created_date', limit: 100, ...(cursor ? { cursor } : {}) },
        );
        all.push(...(page.items || []));
        cursor = page.has_more ? page.next_cursor : null;
      } while (cursor && alive);
      if (!alive) return;
      const found = findBySlug(all, slug, (c) => c.title || c.artist_name, 34);
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

  if (state === 'loading') {
    return (
      <div className="sheet-page">
        <p className="sheet-state" role="status">Opening the drawing…</p>
      </div>
    );
  }

  if (state === 'missing') {
    return (
      <div className="sheet-page">
        <div className="sheet-state">
          <h1 className="sheet-artist">No drawing at this address.</h1>
          <p className="sheet-line">A drawing has an address here once a custodian has put it on the wall.</p>
          <Link className="sheet-tool" to="/ClimateCartoons">The Wall</Link>
        </div>
      </div>
    );
  }

  if (matches.length > 1) {
    return (
      <ShortDoorChooser
        slug={slug}
        items={matches.map((c) => ({
          label: c.title || `A drawing by ${c.artist_name}`,
          note: c.artist_name,
          to: `/ClimateCartoons/Sheet/${c.id}`,
        }))}
      />
    );
  }

  return <ClimateCartoonSheet id={matches[0].id} />;
}