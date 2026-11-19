import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { OPEN_DRAWING } from '@/components/climate/cartoons/openDrawing';
import PressSheet from '@/components/climate/cartoons/press/PressSheet';
import CartoonCloseReading from '@/components/climate/cartoons/CartoonCloseReading';
import CartoonsWaiting from '@/components/climate/cartoons/CartoonsWaiting';
import useCartoonWall from '@/components/climate/cartoons/useCartoonWall';

// The wall, unchanged in what it does: the same published drawings, the same order, the
// same close-reading viewer, the same keeper strip, the same "more from the wall". Only
// its dress has gone — the black plates, the numbered caption bars, the alternating tilt.
export default function PressWall() {
  const wall = useCartoonWall(true);
  const [reading, setReading] = useState(null);

  // A drawing found in the seventeen-goal ledger opens here, in the wall's own viewer, at
  // the place it actually stands in the wall's order — so Next and Previous walk the wall
  // from that drawing rather than a second list made of thumbnails.
  useEffect(() => {
    const open = (event) => {
      const at = wall.cartoons.findIndex((cartoon) => cartoon.id === event.detail?.id);
      if (at >= 0) setReading(at);
    };
    window.addEventListener(OPEN_DRAWING, open);
    return () => window.removeEventListener(OPEN_DRAWING, open);
  }, [wall.cartoons]);

  return (
    <section className="press-wall-section" id="press-wall" aria-labelledby="press-wall-title">
      <header className="press-wall-head">
        <p className="press-eyebrow">Human hands · different perspectives</p>
        <h2 id="press-wall-title" className="press-wall-title">The people’s pages.</h2>
        <p className="press-wall-line">Read the picture. Stay with the idea. Tap any drawing to look closer.</p>
      </header>

      {wall.isPending && (
        <p className="press-state" role="status"><Loader2 size={17} className="animate-spin" />Opening the original drawings…</p>
      )}
      {wall.isError && (
        <div className="press-state press-state--error" role="alert">
          <p>The wall could not be opened.</p>
          <button type="button" onClick={() => wall.refetch()}>Try again</button>
        </div>
      )}
      {!wall.isPending && !wall.isError && !wall.cartoons.length && (
        <div className="press-state">
          <p>The first page is still blank. A space for a real drawing, with its artist’s name.</p>
          <a href="#cartoon-your-turn">Make it yours ↗</a>
        </div>
      )}

      <div className="press-wall">
        {wall.cartoons.map((cartoon, i) => (
          <PressSheet key={cartoon.id} cartoon={cartoon} index={i + 1} lead={i === 0} onOpen={() => setReading(i)} />
        ))}
      </div>

      <p className="press-wall-colophon">
        The artists’ own words, kept with their work. Shown with permission. Every new contribution
        waits for a person’s look.
      </p>

      {wall.hasNextPage && (
        <button type="button" className="press-more" disabled={wall.isFetchingNextPage} onClick={() => wall.fetchNextPage()}>
          {wall.isFetchingNextPage ? 'Opening more…' : 'More from the wall'}
        </button>
      )}
      {wall.isFetchNextPageError && (
        <p className="press-state press-state--error" role="alert">
          More drawings could not be opened. Use “More from the wall” to try again.
        </p>
      )}

      <CartoonsWaiting />

      {reading !== null && wall.cartoons[reading] && (
        <CartoonCloseReading cartoons={wall.cartoons} index={reading} onTurn={setReading} onClose={() => setReading(null)} />
      )}
    </section>
  );
}