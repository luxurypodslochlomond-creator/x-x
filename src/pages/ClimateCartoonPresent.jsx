import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import useCartoonWall from '@/components/climate/cartoons/useCartoonWall';
import CartoonCloseReading from '@/components/climate/cartoons/CartoonCloseReading';
import PresentSections from '@/components/climate/cartoons/present/PresentSections';
import { presentOrder, flatPresent } from '@/components/climate/cartoons/present/presentOrder';

// ── THE PRESENTER'S SHEET ────────────────────────────────────────────────────────
// For the person sharing a window on the 29th. It is not the wall and it is not a second
// copy of anything: it is the same drawings, in the order Janine's agenda runs them, with
// the maker's name under each one.
//
// Her words decide the shape of this page: "Brian will present the cartoons when their
// artist talks, LEAVING THE ARTIST ON THE ZOOM SCREEN for part of the presentation." So
// this is built to be shared as one window, beside Zoom — never as a full-screen share,
// which would take the artist off the screen at the exact moment their drawing goes up.
// The reader opens full size inside this window, and the arrows move through the hour.
//
// Nothing here is public business: it reads the same published drawings the wall shows,
// and a reader who finds it sees exactly what the wall shows, in a different order.
export default function ClimateCartoonPresent() {
  const wall = useCartoonWall(false);
  const sections = useMemo(() => presentOrder(wall.cartoons || []), [wall.cartoons]);
  const running = useMemo(() => flatPresent(sections), [sections]);
  const filled = sections.filter((section) => section.cartoons.length).length;
  const waiting = sections.length - filled;
  const [openId, setOpenId] = useState(null);
  const [index, setIndex] = useState(0);

  const open = (id) => {
    const at = running.findIndex((cartoon) => cartoon.id === id);
    if (at < 0) return;
    setIndex(at);
    setOpenId(id);
  };

  return (
    <ClimateRecordShell
      eyebrow="The cartoon room · for the presenter"
      marker="Sunday 29 November · share this window, not the whole screen"
      title="The drawings, in the order of the hour"
      statement="The same drawings as the wall, grouped the way Janine's agenda runs them. Press one to open it full size, then use the arrows to walk straight through. Share only this window, so the artist stays on the Zoom screen while their drawing is up."
      returnTo="/ClimateCartoons"
      returnLabel="The wall"
      footer="A working sheet, not a page of the record. Nothing here is ranked, and no drawing is cropped."
      mobileCompact
      wide
    >
      {wall.isPending && (
        <p className="record-meta flex items-center gap-2 py-10" role="status">
          <Loader2 size={18} className="animate-spin" />Fetching the drawings…
        </p>
      )}

      {!wall.isPending && !running.length && (
        <p className="record-meta py-10">
          No drawings are up yet. <Link to="/ClimateCartoons" className="underline">The wall ↗</Link>
        </p>
      )}

      {!!running.length && (
        <>
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-record-ink/15 pb-3">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-record-muted">
              {running.length} {running.length === 1 ? 'drawing' : 'drawings'} · {filled} {filled === 1 ? 'group' : 'groups'}
              {waiting ? ` · ${waiting} still to come` : ''}
            </p>
            <button
              type="button"
              onClick={() => open(running[0].id)}
              className="min-h-[44px] border-2 border-record-ink px-4 font-mono text-[11px] font-black uppercase"
            >
              Open the first drawing
            </button>
          </div>

          <PresentSections sections={sections} onOpen={open} />

          <p className="mt-6 border-l-2 border-record-red pl-3 font-mono text-[10.5px] leading-relaxed text-record-muted">
            On the day: share this window on its own. If the whole screen is shared the artist disappears behind their own drawing,
            and Janine’s agenda asks for the artist to stay on screen for part of it. Arrow keys move between drawings.
          </p>
        </>
      )}

      {openId && (
        <CartoonCloseReading
          cartoons={running}
          index={Math.min(index, running.length - 1)}
          onTurn={setIndex}
          onClose={() => setOpenId(null)}
        />
      )}
    </ClimateRecordShell>
  );
}