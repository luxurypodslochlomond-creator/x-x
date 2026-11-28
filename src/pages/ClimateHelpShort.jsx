import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { recordSlug } from '@/components/climate/recordSlug';

// ── A SHORT DOOR TO "I WANT TO HELP THIS ONE" ──────────────────────────────────
// The link that reached Janine's inbox was:
//   /ClimateLedger?artist=Francis+Umendu+Odupute+%28FRANCODUS%29&work=Plant+a+Tree+%21#offer-help
// Four broken lines on a phone, and impossible to say out loud, type from a printout or read
// to somebody over a call. The mechanism was right; the address was a machine's.
//
// So the offer has a short door: /help/francis-umendu-odupte — one line, sayable, printable,
// and it still opens the same offer with the same two facts. The hand is resolved against the
// wall itself rather than trusted from the address, so a link that names somebody who is not
// on the wall opens the open offer instead of pretending.
export default function ClimateHelpShort() {
  const { artist, work } = useParams();
  const [target, setTarget] = useState(null);

  useEffect(() => {
    let cancelled = false;
    base44.entities.ClimateCartoon.filter({ status: 'published' }, { limit: 200 })
      .then((page) => {
        if (cancelled) return;
        const drawings = page?.items || [];
        const hand = drawings.find(drawing => recordSlug(drawing.artist_name || '', 34) === artist);
        const piece = work
          ? drawings.find(drawing => recordSlug(drawing.title || drawing.artist_name || '', 34) === work
              && (!hand || drawing.artist_name === hand.artist_name))
          : null;
        const params = new URLSearchParams();
        if (hand?.artist_name) params.set('artist', hand.artist_name);
        if (piece?.title) params.set('work', piece.title);
        setTarget(`/ClimateLedger${params.toString() ? `?${params.toString()}` : ''}#offer-help`);
      })
      .catch(() => { if (!cancelled) setTarget('/ClimateLedger#offer-help'); });
    return () => { cancelled = true; };
  }, [artist, work]);

  if (!target) {
    return <p style={{ padding: '2rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#1a1612', background: '#f4efe4', minHeight: '100vh' }}>
      Opening the offer…
    </p>;
  }
  return <Navigate to={target} replace />;
}