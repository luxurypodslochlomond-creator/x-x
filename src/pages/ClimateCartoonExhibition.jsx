import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import cartoonImageSource from '@/components/climate/cartoons/cartoonImageSources';
import ExhibitionTitleSheet from '@/components/climate/cartoons/print/ExhibitionTitleSheet';
import ExhibitionSheet from '@/components/climate/cartoons/print/ExhibitionSheet';
import '@/components/climate/cartoons/print/exhibition.css';

// ── THE EXHIBITION ─────────────────────────────────────────────────────────────
// The show itself, at its own address and outside the record's frame on purpose: a school's
// printer has to get the drawings and the credits, not a masthead and a way out. The choice
// arrives in the address (`?ids=`), which is why a teacher can keep the link and print the
// same show again next term — and why the record never has to remember who printed what.
//
// Only drawings a keeper has put on the wall can appear here. An id that is not published
// simply does not print, so a show can never be a back door onto somebody's draft.
const params = new URLSearchParams(window.location.search);
const IDS = (params.get('ids') || '').split(',').map((id) => id.trim()).filter(Boolean);
const SHOW_NAME = (params.get('t') || '').trim().slice(0, 90);
const PRINTED_ON = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function ClimateCartoonExhibition() {
  const [cartoons, setCartoons] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all(IDS.map((id) => base44.entities.ClimateCartoon.get(id).catch(() => null))).then((records) => {
      if (cancelled) return;
      setCartoons(
        records
          .filter((record) => record && record.status === 'published')
          .map((record) => ({ ...record, display_image_url: cartoonImageSource(record) })),
      );
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    document.title = `${SHOW_NAME || 'An exhibition'} · the cartoon room`;
  }, []);

  return (
    <div className="ex-page">
      <div className="ex-tools">
        <Link to="/ClimateCartoons/Print">← Choose again</Link>
        <button type="button" onClick={() => window.print()}>Print the exhibition</button>
      </div>

      {cartoons === null && (
        <p className="ex-state" role="status"><Loader2 size={17} className="animate-spin" />Laying out the show…</p>
      )}

      {cartoons && !cartoons.length && (
        <div className="ex-state">
          <p>There is nothing in this exhibition yet.</p>
          <Link to="/ClimateCartoons/Print">Choose drawings from the wall</Link>
        </div>
      )}

      {cartoons && cartoons.length > 0 && (
        <div className="ex-stack">
          <ExhibitionTitleSheet showName={SHOW_NAME} printedOn={PRINTED_ON} cartoons={cartoons} />
          {cartoons.map((cartoon, i) => (
            <ExhibitionSheet key={cartoon.id} cartoon={cartoon} plate={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}