import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { cartoonSlug } from '@/components/climate/cartoons/cartoonSlug';
import ClimateCartoonSheet from '@/pages/ClimateCartoonSheet';
import '@/components/climate/cartoons/sheet/sheet.css';

// ── THE SHORT DOOR TO ONE DRAWING ──────────────────────────────────────────────
// /w/rain-check — a drawing's address that a person can say out loud, type into a
// phone, or copy off a printout without getting it wrong.
//
// It resolves the name against the wall as the record actually stands: every published
// drawing is read, and the one whose name matches opens on its own sheet. The sheet is
// the same component the long address opens, so there is one sheet and not two.
//
// A name that matches nothing is a real 404, the same as a sheet that is not there:
// a link into the record should never open a page that pretends to be a drawing.
export default function ClimateCartoonShort() {
  const { slug } = useParams();
  const [state, setState] = useState('loading');
  const [cartoon, setCartoon] = useState(null);

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
      const found = all.find((c) => cartoonSlug(c) === slug);
      setCartoon(found || null);
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

  if (state === 'loading') {
    return (
      <div className="sheet-page">
        <p className="sheet-state" role="status">Opening the drawing…</p>
      </div>
    );
  }

  if (state === 'missing' || !cartoon) {
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

  return <ClimateCartoonSheet id={cartoon.id} />;
}