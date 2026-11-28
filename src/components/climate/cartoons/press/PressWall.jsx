import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { SHOW_DRAWING } from '@/components/climate/cartoons/goToDrawing';
import PressSheet from '@/components/climate/cartoons/press/PressSheet';
import CartoonCloseReading from '@/components/climate/cartoons/CartoonCloseReading';
import CartoonsWaiting from '@/components/climate/cartoons/CartoonsWaiting';
import useCartoonWall from '@/components/climate/cartoons/useCartoonWall';
import WallDrawingHead from '@/components/climate/cartoons/WallDrawingHead';

// The wall, unchanged in what it does: the same published drawings, the same order, the
// same close-reading viewer, the same keeper strip, the same "more from the wall". Only
// its dress has gone — the black plates, the numbered caption bars, the alternating tilt.
export default function PressWall({ visible = true }) {
  const wall = useCartoonWall(true);
  const [reading, setReading] = useState(null);
  const [requested, setRequested] = useState(null);

  // A drawing met in the seventeen goals is brought to its own place on the wall — its
  // sheet, its artist, its origin, its line, its credit — rather than opened in a floating
  // full-screen copy. The sheet is marked for a few seconds so the eye knows which one it
  // was sent to; the reader can then tap it to look closer, exactly as on the wall itself.
  const [marked, setMarked] = useState(null);
  useEffect(() => {
    const show = (event) => {
      const id = event.detail?.id;
      if (id) setRequested(id);
    };
    window.addEventListener(SHOW_DRAWING, show);
    return () => window.removeEventListener(SHOW_DRAWING, show);
  }, []);
  useEffect(() => {
    if (!marked) return;
    const timer = setTimeout(() => setMarked(null), 5000);
    return () => clearTimeout(timer);
  }, [marked]);

  // A link from a cartoonist's own page — or one they sent to a gallery — carries the drawing's
  // id in the address, so the wall opens at that drawing rather than at the top of the room.
  const wanted = window.location.hash.startsWith('#drawing-') ? window.location.hash.slice(9) : requested || new URLSearchParams(window.location.search).get('drawing');
  const located = useRef(null);
  useEffect(() => {
    if (!visible || !wanted || located.current === wanted || wall.isPending) return;
    const node = document.getElementById(`drawing-${wanted}`);
    if (!node) {
      if (wall.hasNextPage && !wall.isFetchingNextPage && !wall.isFetchNextPageError) wall.fetchNextPage();
      return;
    }
    located.current = wanted;
    node.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
    setMarked(wanted);
  }, [visible, wanted, wall.cartoons.length, wall.isPending, wall.hasNextPage, wall.isFetchingNextPage, wall.isFetchNextPageError, wall.fetchNextPage]);

  return (
    <section className="press-wall-section" id="press-wall" aria-labelledby="press-wall-title">
      <WallDrawingHead />

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
          <a href="#cartoon-your-turn">Send a drawing</a>
        </div>
      )}

      <div className="press-wall">
        {wall.cartoons.map((cartoon, i) => (
          <PressSheet
            key={cartoon.id}
            cartoon={cartoon}
            index={i + 1}
            lead={i === 0}
            marked={marked === cartoon.id}
            onOpen={() => setReading(i)}
          />
        ))}
      </div>

      {/* ── THE FOOT OF THE CHAPTER, IN ONE PIECE ────────────────────────────────
          On a desk the drawings hang on the painting itself, so this chapter has no sheet
          of its own any more — its head keeps one and so does its foot, and the wall stands
          between them. That needs the foot to be one element rather than five loose ones,
          or each line would have to be given its own paper. The words are untouched. */}
      <div className="press-wall-foot">
        <p className="press-wall-colophon">
          The artists’ own words, kept with their work. Shown with permission. Every new contribution
          waits for a person’s look.
        </p>

        {/* The way off the screen that does not take anything off the record: a show printed
            from the wall, with every artist's name and address already on the paper. */}
        <p className="press-wall-print">
          Take the wall with you: <Link to="/ClimateCartoons/Print">print a show of it</Link>
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
      </div>

      {reading !== null && wall.cartoons[reading] && (
        <CartoonCloseReading cartoons={wall.cartoons} index={reading} onTurn={setReading} onClose={() => setReading(null)} />
      )}
    </section>
  );
}