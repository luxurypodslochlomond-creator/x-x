import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import cartoonImageSource from '@/components/climate/cartoons/cartoonImageSources';
import ExhibitionTitleSheet from '@/components/climate/cartoons/print/ExhibitionTitleSheet';
import ExhibitionSheet from '@/components/climate/cartoons/print/ExhibitionSheet';
import PassTheShowOn from '@/components/climate/cartoons/print/PassTheShowOn';
import '@/components/climate/cartoons/print/exhibition.css';

// ── THE EXHIBITION ─────────────────────────────────────────────────────────────
// The show itself, at its own address and outside the record's frame on purpose: a school's
// printer has to get the drawings and the credits, not a masthead and a way out. The choice
// arrives in the address (`?ids=`), which is why a teacher can keep the link and print the
// same show again next term — and why the record never has to remember who printed what.
//
// Only drawings a keeper has put on the wall can appear here. An id that is not published
// simply does not print, so a show can never be a back door onto somebody's draft.
const PRINTED_ON = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function ClimateCartoonExhibition() {
  // ── THE SHOW IS READ FROM THE ADDRESS AS IT STANDS, NOT WHEN THE FILE ARRIVED ──
  // This page used to take `?ids=` at the top of the file, the moment the file was read.
  // But the record warms this address in the background while the reader is still in the
  // print room (routePrefetch.js), so the file was read on a page whose address had no
  // ids in it: the list came out empty, and every exhibition said "there is nothing in
  // this exhibition yet". It also meant a second show would have kept the first show's
  // drawings, because the file is only read once. Read inside the component instead, so
  // the show is always whatever the address says now.
  const [params] = useSearchParams();
  const idsKey = (params.get('ids') || '')
    .split(',').map((id) => id.trim()).filter(Boolean).join(',');
  const showName = (params.get('t') || '').trim().slice(0, 90);
  const [cartoons, setCartoons] = useState(null);

  useEffect(() => {
    if (!idsKey) { setCartoons([]); return; }
    let cancelled = false;
    // One read, through the same door the wall uses: only a drawing a keeper has published
    // can be in a show, and the order is the order the reader chose them in.
    base44.entities.ClimateCartoon
      .filter({ id: { $in: idsKey.split(',') }, status: 'published' }, { limit: 200 })
      .then((page) => {
        if (cancelled) return;
        const byId = new Map((page.items || []).map((record) => [record.id, record]));
        setCartoons(
          idsKey.split(',')
            .map((id) => byId.get(id))
            .filter(Boolean)
            .map((record) => ({ ...record, display_image_url: cartoonImageSource(record) })),
        );
      });
    return () => { cancelled = true; };
  }, [idsKey]);

  useEffect(() => {
    document.title = `${showName || 'An exhibition'} · the cartoon room`;
  }, [showName]);

  return (
    <div className="ex-page">
      <div className="ex-tools">
        <span className="ex-tools-left">
          <Link to="/ClimateCartoons/Print">← Choose again</Link>
          {/* Someone who was handed this show has never seen the wall it came from, so the
              show carries one quiet door into the room. Screen only: the paper has its
              address printed on it instead. */}
          <Link to="/ClimateCartoons">The cartoon room</Link>
        </span>
        <span className="ex-tools-right">
          {cartoons && cartoons.length > 0 && (
            <PassTheShowOn showName={showName} count={cartoons.length} />
          )}
          <button type="button" onClick={() => window.print()}>Print the exhibition</button>
        </span>
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
          <ExhibitionTitleSheet showName={showName} printedOn={PRINTED_ON} cartoons={cartoons} />
          {cartoons.map((cartoon, i) => (
            <ExhibitionSheet key={cartoon.id} cartoon={cartoon} plate={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}