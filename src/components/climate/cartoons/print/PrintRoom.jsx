import React, { useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import useCartoonWall from '@/components/climate/cartoons/useCartoonWall';
import PrintPlate from '@/components/climate/cartoons/print/PrintPlate';
import PrintBar from '@/components/climate/cartoons/print/PrintBar';

// ── THE PRINT ROOM ─────────────────────────────────────────────────────────────
// The wall is a wall: you look at it, and then you leave. This is the door that lets a
// cartoonist's work leave the screen without being scraped, screenshotted, re-cropped or
// re-posted without a name on it. You choose drawings; the record lays each one on its own
// page — whole, with the hand that made it, the drawer's own line, and the plain-text
// address that brings a reader back to the record — and you print the set and pin it up.
//
// Nothing is uploaded, nothing is stored and nothing is counted. The choice lives in the
// address of the page you print, so a teacher can bookmark it and print the same show next
// term, and the record learns nothing about who printed what.
export default function PrintRoom() {
  const wall = useCartoonWall();
  const [chosen, setChosen] = useState([]);
  const [showName, setShowName] = useState('');

  const toggle = (id) => setChosen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const plateOf = (id) => chosen.indexOf(id) + 1;

  const exhibition = useMemo(() => {
    if (!chosen.length) return null;
    const params = new URLSearchParams({ ids: chosen.join(',') });
    if (showName.trim()) params.set('t', showName.trim());
    return `/ClimateCartoons/Exhibition?${params.toString()}`;
  }, [chosen, showName]);

  return (
    <section className="print-room" id="print-room" aria-labelledby="print-room-title">
      <header className="print-room-head">
        <p className="print-room-eyebrow">The print room · no account, no upload</p>
        <h2 id="print-room-title" className="print-room-title">Hang a show.</h2>
        <p className="print-room-line">
          Choose drawings from the wall. The record lays each one on its own page — the picture whole, the hand that
          made it, the drawer’s own words and the address that brings a reader back — and you print the set and pin it
          up. Nothing leaves the record and nothing is counted. The paper is the screen.
        </p>
      </header>

      {wall.isPending && (
        <p className="print-room-state" role="status"><Loader2 size={17} className="animate-spin" />Opening the wall…</p>
      )}
      {wall.isError && (
        <div className="print-room-state" role="alert">
          <p>The wall could not be opened.</p>
          <button type="button" onClick={() => wall.refetch()}>Try again</button>
        </div>
      )}
      {!wall.isPending && !wall.isError && !wall.cartoons.length && (
        <p className="print-room-state">There is nothing on the wall to print yet.</p>
      )}

      <ul className="print-plates">
        {wall.cartoons.map((cartoon) => (
          <PrintPlate
            key={cartoon.id}
            cartoon={cartoon}
            plate={plateOf(cartoon.id)}
            onToggle={() => toggle(cartoon.id)}
          />
        ))}
      </ul>

      {wall.hasNextPage && (
        <button
          type="button"
          className="print-room-more"
          disabled={wall.isFetchingNextPage}
          onClick={() => wall.fetchNextPage()}
        >
          {wall.isFetchingNextPage ? 'Opening more…' : 'More from the wall'}
        </button>
      )}

      <PrintBar
        chosen={chosen.length}
        showName={showName}
        onShowName={setShowName}
        exhibition={exhibition}
        onAll={() => setChosen(wall.cartoons.map((cartoon) => cartoon.id))}
        onNone={() => setChosen([])}
      />
    </section>
  );
}