import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import RecordIndexPlate from '@/components/climate/RecordIndexPlate';
import { markFor } from '@/components/climate/pageMarks';

// The guide's own mark, fetched once from the same map the doors read, so the foot can
// never be drawn in a different hand to the sheet above it.
const GuideMark = markFor('/ClimateGuide');

// ── THE INDEX, ON ONE SCREEN ───────────────────────────────────────────────────
// This sheet was a page of drawn doors that ran past the top and bottom of a phone: a
// reader who opened the index to find their way had to scroll the index itself, which is
// the one thing an index may never ask. It is drawn doors still — but three across on a
// handset and four on a wide sheet, at a size a thumb can see, in three parts, so every
// door of the record is in front of the eye at once without a scroll.
//
// The sheet is a fixed column, not a long page: rule, name, index, close. The body may
// scroll only if a device is smaller than anything a phone has been since the index was
// written, so nothing is ever clipped and nothing has to be guessed at.
export default function RecordPagesPanel({ open, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const dialog = dialogRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
    };
  }, [open]);
  if (!open) return null;
  return createPortal(
    <dialog ref={dialogRef} id="record-contents" aria-labelledby="record-contents-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      className="climate-record fixed inset-0 m-0 flex h-[100dvh] max-h-none w-full max-w-none flex-col overflow-hidden border-0 bg-record-paper p-0 font-body text-record-ink backdrop:bg-record-paper">
      <div aria-hidden="true" className="h-[3px] w-full shrink-0 bg-record-mark" />
      <div className="mx-auto flex min-h-0 w-full max-w-[760px] flex-1 flex-col px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 sm:pt-6">
        {/* ── THE SHEET HAS A MASTHEAD, LIKE EVERY OTHER PAGE OF THE RECORD ──────
            "Index" was set the same size as a section heading with a line of small type
            under it, so the sheet opened without ever saying it had opened. It now opens
            the way a printed contents page does: a word above, the title at full size,
            and a rule drawn under it — a plate, not a panel. */}
        <div className="mb-3 flex shrink-0 items-start justify-between gap-4 border-b border-record-ink pb-2.5">
          <div>
            {/* ── THE PLAIN WORD ABOVE THE TRUE ONE ────────────────────────────────
                "Every open door" is the honest title and it is the record's own word —
                but a host or a checker opening this for the first time should never have
                to work out what they are looking at. So the small line above it says
                "Contents", the word every book on earth uses. The metaphor is the title;
                the plain word is the frame around it. Neither is left to be guessed. */}
            <p className="font-mono text-[8.5px] uppercase leading-none tracking-[0.3em] text-record-mark">Contents</p>
            {/* It has been called Contents, then Index, then Every door — and "every door" was
                the one word on this sheet that was not true. The music and the support page
                came off the record's doors at the founder's request on 9 November, and the
                handover sheet is behind a key, so three doors exist that this sheet does not
                draw. A keeper can see the gap; a sceptic would find it first.

                "Every open door" is true and is the same promise said honestly: everything
                drawn here opens to anybody who taps it, nothing is behind a guess, and nothing
                is past the edge of the glass. What is not open is not claimed. */}
            <h1 id="record-contents-title" className="mt-1 font-display text-[34px] leading-[0.85] tracking-[-0.015em] sm:text-[42px]">Every open door</h1>
          </div>
          <button type="button" autoFocus onClick={onClose}           aria-label="Close the doors" className="rec-art-door">
            <span className="rec-art-drawing" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M7.1 6.4c5.8 5.7 11.7 12.8 18.1 19M25.4 6.9C19.2 13 12.6 20 6.8 25.3" />
              </svg>
            </span>
            <span className="rec-art-caption">Close</span>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <RecordIndexPlate onNavigate={onClose} />
        </div>

        <div className="mt-3 shrink-0 border-t border-record-ink pt-2.5">
          {/* ── ONE FOOT, AND IT IS DRAWN LIKE EVERYTHING ABOVE IT ───────────────────
              Two lines stood here: the written guide with an arrow, and beneath a second
              rule, the tongue. The tongue was the leftover in that pair — it was parked
              here when it had no home anywhere, and then took its own place on the
              masthead's name line, so this foot had quietly become a second front door to
              one setting. It has gone from here and is still exactly where a reader changes
              it, at the top of every page.
              The guide keeps the foot. It carries its own mark now, fetched from the same
              map the doors read, because a bare line of text under sixteen drawn doors was
              the one thing on the sheet that did not belong to the sheet. */}
          <Link
            to="/ClimateGuide"
            onClick={onClose}
            className="group flex items-center justify-between gap-3"
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
    </dialog>, document.body
  );
}