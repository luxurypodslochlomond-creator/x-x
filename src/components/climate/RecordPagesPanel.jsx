import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import RecordIndexPlate from '@/components/climate/RecordIndexPlate';
import RecordTongueDoor from '@/components/climate/RecordTongueDoor';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { markFor } from '@/components/climate/pageMarks';

// The guide's own mark, fetched once from the same map the doors read, so the foot can
// never be drawn in a different hand to the sheet above it.
const GuideMark = markFor('/ClimateGuide');

// ── THE INDEX, ON ONE SCREEN ───────────────────────────────────────────────────
// This sheet was a page of drawn doors that ran past the top and bottom of a phone: a
// reader who opened the index to find their way had to scroll the index itself, which is
// the one thing an index may never ask. It is drawn doors still — but three across on a
// handset and five on a wide sheet, at a size a thumb can see, in three parts, so every
// door of the record is in front of the eye at once without a scroll.
//
// ── AND IT NOW OPENS LIKE SOMETHING MADE THIS DECADE ──────────────────────────
// Brian, 15 November, on a phone: "sometimes sticks, not smooth, feels a bit old… on
// desktop looks squashed and lifeless." Three faults, and none of them was taste.
//
// 1. IT DID NOT OPEN. It appeared. The sheet was mounted and showModal'd in the same
//    frame, with no transition anywhere, so a thumb's tap produced an instant full-screen
//    change of everything on the glass. Nothing on this record moves instantly except a
//    press, and the eye reads an instant change as a missed tap rather than as an answer.
//    It now rises into place on a phone and settles on a wide screen — transform and
//    opacity only, so it costs the compositor nothing — and it leaves the same way it
//    arrived instead of vanishing.
//
// 2. IT COULD HOLD THE PAGE HOSTAGE. The old sheet locked the body on open and unlocked it
//    in an effect that could run after the element had already gone, so a frame could be
//    left with the page behind it unable to scroll — the "sticks" in the report. The lock
//    is now taken and released in one place, against the same element, and nothing else
//    holds the page.
//
// 3. IT WAS A NARROW FULL-HEIGHT COLUMN ON A DESKTOP. Seven hundred and sixty pixels of
//    plate with six hundred of height of small type in it: squashed, and with an acre of
//    empty paper under the last part. On a wide screen it is now a plate with an edge and a
//    margin, wider, five doors across, with the type at the size the record sets type at.
//    A phone still gets the whole glass, because on a phone an index that does not fill the
//    screen is a dialog to be dismissed rather than a page to be read.
export default function RecordPagesPanel({ open, onClose }) {
  const dialogRef = useRef(null);
  // Mounted stays true through the leaving beat, so the sheet can be drawn out of the way
  // rather than torn out of the frame.
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // ── A DESK IS NOT A PHONE, AND THE LOCK IS THE DIFFERENCE ─────────────────────
  // On a handset the sheet covers the glass, so the page behind is held still. On a desk it
  // drops from the top edge with the page still visible under it (see the wide-screen block
  // in record-navigator.css), and a page you can see but cannot scroll is the "sticks" in
  // every report this sheet has ever had. So the lock is the phone's alone: a wide screen
  // scrolls behind the open sheet, exactly as it would behind any open menu.
  const [isDesk, setIsDesk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsDesk(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setLeaving(false);
      return undefined;
    }
    if (!mounted) return undefined;
    setLeaving(true);
    const timer = setTimeout(() => { setMounted(false); setLeaving(false); }, 170);
    return () => clearTimeout(timer);
  }, [open, mounted]);

  // ── THE PAGE BEHIND IS HELD STILL BY THE RECORD'S OWN LOCK ────────────────────
  // It used to set overflow:hidden on the body, and on a phone that is not a lock at all:
  // the page underneath keeps taking the drag, so a thumb scrolling the list dragged the
  // rule and the masthead behind it as well. That is the "looks broken, bit flaky" in the
  // report — two things moving under one finger, and closing the sheet then left the reader
  // somewhere they had not chosen. The same position:fixed lock the tongue sheet and the
  // photograph viewer already use holds it properly, and it hands the reader back their
  // line when the sheet closes.
  useBodyScrollLock(mounted && !isDesk);

  // One place owns the dialog itself: opened here, closed only when the sheet has gone.
  useEffect(() => {
    if (!mounted) return undefined;
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!dialog.open) {
      try { dialog.showModal(); } catch { /* already open — nothing to do */ }
    }
    return () => { if (dialog.open) dialog.close(); };
  }, [mounted]);

  // The sheet closes when the paper is tapped outside the plate — the gesture a phone has
  // used for every sheet it has ever shown. Only on a wide screen, where there is paper
  // outside the plate to tap.
  const onDialogClick = (event) => {
    if (event.target === dialogRef.current) onClose();
  };

  if (!mounted) return null;
  return createPortal(
    <dialog
      ref={dialogRef}
      id="record-contents"
      aria-labelledby="record-contents-title"
      data-state={leaving ? 'out' : 'in'}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={onDialogClick}
      className="rec-doors climate-record fixed inset-0 m-0 flex h-[100dvh] max-h-none w-full max-w-none items-stretch justify-center overflow-hidden border-0 bg-transparent p-0 font-body text-record-ink backdrop:bg-record-ink/30 lg:backdrop:bg-transparent"
    >
      <div className="rec-doors-plate flex h-full w-full flex-col bg-record-paper">
        <div aria-hidden="true" className="h-[3px] w-full shrink-0 bg-record-mark" />

        <div className="mx-auto flex min-h-0 w-full max-w-[880px] flex-1 flex-col px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-4 sm:px-10 sm:pb-4 sm:pt-5">
          {/* ── THE SHEET HAS A MASTHEAD, LIKE EVERY OTHER PAGE OF THE RECORD ────── */}
          <div className="mb-3 flex shrink-0 items-start justify-between gap-4 border-b border-record-ink pb-2.5 sm:mb-4 sm:pb-3">
            <div>
              <p className="font-mono text-[8.5px] uppercase leading-none tracking-[0.3em] text-record-mark">Contents</p>
              {/* It has been called Contents, then Index, then Every door — and "every door"
                  was the one word on this sheet that was not true. The music and the support
                  page came off the record's doors at the founder's request on 9 November, and
                  the handover sheet is behind a key, so three doors exist that this sheet does
                  not draw.

                  "Every open door" is true and is the same promise said honestly: everything
                  drawn here opens to anybody who taps it, nothing is behind a guess, and
                  nothing is past the edge of the glass. What is not open is not claimed. */}
              <h1 id="record-contents-title" className="mt-1 font-display text-[30px] leading-[0.9] tracking-[-0.015em] sm:text-[34px]">
                Every open door
              </h1>
            </div>
            <button type="button" autoFocus onClick={onClose} aria-label="Close the doors" className="rec-art-door">
              <span className="rec-art-drawing" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M7.1 6.4c5.8 5.7 11.7 12.8 18.1 19M25.4 6.9C19.2 13 12.6 20 6.8 25.3" />
                </svg>
              </span>
              <span className="rec-art-caption">Close</span>
            </button>
          </div>

          <div className="rec-doors-body min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <RecordIndexPlate onNavigate={onClose} />
          </div>

          <div className="mt-3 shrink-0 border-t border-record-ink pt-2.5">
            {/* ── THE TONGUE, WHERE THE WAY THROUGH IS ───────────────────────────────
                It stands on the masthead, opposite the record's own name, and that is
                still where it belongs: the record signing on the left, the reader
                answering on the right. But a reader who has opened this sheet has said
                by opening it that they are looking for a way to change something, and
                sending them back out to the masthead for the one control that changes
                the voice of the page is a dead end this record should not have. Same
                list, same component, same promise — the tongue names itself, and there
                is no second copy of it to drift. */}
            <div className="flex items-center justify-between gap-3 px-1">
              <span className="text-[13px] text-record-ink" style={{ fontFamily: 'var(--font-reading)' }}>
                Read it in your own tongue
              </span>
              <RecordTongueDoor size={22} inline />
            </div>

            {/* ── ONE FOOT, AND IT IS DRAWN LIKE EVERYTHING ABOVE IT ─────────────────
                The tongue was the leftover in this pair — it was parked here when it had
                no home anywhere, and then took its own place on the masthead's name line,
                so this foot had quietly become a second front door to one setting. The
                guide keeps the foot, and it carries its own mark now, fetched from the
                same map the doors read. */}
            <Link
              to="/ClimateGuide"
              onClick={onClose}
              className="group flex items-center justify-between gap-3 px-1 py-1 -mx-1 active:bg-record-ink/5"
            >
              <span className="flex items-center gap-2.5">
                <span aria-hidden="true" className="shrink-0 text-record-ink">
                  <GuideMark size={26} />
                </span>
                <span className="text-[13px] text-record-ink" style={{ fontFamily: 'var(--font-reading)' }}>
                  Every control, written out
                </span>
              </span>
              <span aria-hidden="true" className="font-mono text-[13px] text-record-mark transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </div>
    </dialog>, document.body
  );
}