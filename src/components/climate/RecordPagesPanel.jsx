import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import RecordDesktopSections from '@/components/climate/RecordDesktopSections';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { MarkClose } from '@/components/climate/RecordFootMarks';

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
  const [isDesk, setIsDesk] = useState(() => window.matchMedia('(min-width: 1024px)').matches);
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
    if (!mounted || isDesk) return undefined;
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!dialog.open) {
      try { dialog.showModal(); } catch { /* already open — nothing to do */ }
    }
    return () => { if (dialog.open) dialog.close(); };
  }, [mounted, isDesk]);

  // The sheet closes when the paper is tapped outside the plate — the gesture a phone has
  // used for every sheet it has ever shown. Only on a wide screen, where there is paper
  // outside the plate to tap.
  const onDialogClick = (event) => {
    if (event.target === dialogRef.current) onClose();
  };

  if (!mounted || isDesk) return null;
  return createPortal(
    <dialog
      ref={dialogRef}
      id="record-contents"
      aria-labelledby="record-contents-title"
      data-state={leaving ? 'out' : 'in'}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={onDialogClick}
      /* ── THE HEIGHT ON THIS LINE IS NOT DECORATION — IT IS WHAT OPENS THE DOORS ─────
         Brian, minutes after I took it away: "Doors don't open on mobile now, bro."

         A <dialog> is a form of the browser's own, and it arrives with its own height
         already set: fit-content. That beats an inset of zero, because a declared height
         always beats a stretch, so the sheet stopped being the size of the glass and became
         the size of its contents — and its contents are a plate with a scrolling body and a
         foot, which measured itself and came out at nothing. So the tap worked, the modal
         opened, and there was a sliver of paper on the glass instead of a page. On a desk it
         still looked nearly right, which is why it only showed up on a phone.

         So the height is stated outright, and it must stay stated. If it is ever changed,
         change it to another real height — never remove it on the reasoning that the sheet
         is pinned to all four edges and should therefore fill them. It should. It does not. */
      className="rec-doors climate-record fixed inset-0 m-0 flex h-[100dvh] max-h-none w-full max-w-none items-stretch justify-center overflow-hidden border-0 bg-transparent p-0 font-body text-record-ink backdrop:bg-record-ink/30 lg:backdrop:bg-transparent"
    >
      <div className="rec-doors-plate flex h-full w-full flex-col border-t-2 border-record-mark/70 bg-record-bone">

        <div className="mx-auto flex min-h-0 w-full max-w-[880px] flex-1 flex-col px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-10 sm:pb-4 sm:pt-5">
          {/* ── IT SAYS WHAT THE DESK SAYS ────────────────────────────────────────
              Brian, 18 November: the desk says EXPLORE THE RECORD, and a phone said
              "open every door" — the same index under two different names, so it did not
              read as the same thing, and the desk's was the better of the two.

              So this sheet wears the desk's masthead exactly: the same red name in the
              same header lettering, the same "Close ×" beside it, the same bone paper
              under it and the same yellow band at the foot. The drawn close door, the
              small mono "Contents" eyebrow and the big display line are gone with it —
              a phone is not a different publication, it is the same page on a smaller
              glass, and now it reads that way. */}
          <div className="mb-2 flex shrink-0 items-center justify-between gap-4 border-b border-record-mark/30 pb-2">
            {/* The name of the sheet is the one line on a phone that has to carry the whole
                thing: it was set at sixteen pixels, which is the size of a caption, so the
                sheet opened looking like a list of links rather than like the record's own
                index. It is a masthead at nineteen now, in the red, and the doors below it
                have room to be read instead of fitted. */}
            <p id="record-contents-title" className="record-header-type text-[19px] leading-none text-record-mark sm:text-lg">Explore the record</p>
            {/* The close is a drawing now, not a word and a borrowed ✕: a page with its
                corner turned down, which is what putting a sheet away actually looks like
                on paper. The word went with the glyph — a symbol does not need a caption,
                and this one has a label for anybody using a reader rather than an eye. */}
            <button
              type="button"
              autoFocus
              onClick={onClose}
              aria-label="Put the sheet down"
              title="Put the sheet down"
              className="flex h-11 w-11 shrink-0 items-center justify-center text-record-ink hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
            >
              <span aria-hidden="true" className="block h-[19px] w-[19px] [&>svg]:h-full [&>svg]:w-full"><MarkClose size={19} /></span>
            </button>
          </div>

          <div className="rec-doors-body min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {/* ── THE SAME EXPLORE THE DESK SHOWS ──────────────────────────────────
                This body was the record's older index: drawn doors in numbered rows,
                three across, each name cut to a word under a small drawing. The desk's
                explore had since been rebuilt — grouped shelves, a red name and a count
                over each, a hairline between them, a drawn mark beside every door — and
                the phone kept the older sheet, which is exactly what Brian reported on
                18 November: coolasfuck on desktop, and mobile did not change.
                It is the same component now, in its phone shape: two across instead of
                three, each door a fingertip tall, names allowed to wrap. One index, one
                hand, whichever glass a reader is holding. */}
            <RecordDesktopSections layout="phone" onNavigate={onClose} />
          </div>

          {/* ── THE TONGUE CAME OFF THIS SHEET, AND THAT IS THE FIX ────────────────────
              Brian, 16 November, with two photographs: "tap language and it overlays weird
              and doesn't work." He was right, and the fault was structural rather than
              cosmetic: the tongue opens its own sheet, and it was being opened from inside
              this one — a dialog inside a dialog, drawn over a plate that is itself pinned
              over the page, so its panel landed wherever the browser could fit it and half
              of it sat outside the thing that had opened it.

              It was also the one line on this sheet written in English for a reader who has
              come here because they cannot read English. The masthead's tongue names itself
              in its own tongue — "English", "ไทย", "Português" — and it stands on the name
              line at every width, above this sheet, before a reader has to open anything.
              So the way to change the record's voice is the tongue that names itself, and
              the index goes back to being only an index.

              That removes the nested overlay entirely, which was the real "weird". */}
          <div className="shrink-0 pt-1.5">
            {/* ── ONE FOOT, AND IT IS THE DESK'S FOOT ─────────────────────────────
                The guide sits on the same yellow band the desk gives it, so the bottom
                of this sheet and the bottom of the panel are the same line at both
                widths. */}
            <Link
              to="/ClimateGuide"
              onClick={onClose}
              className="record-header-type flex min-h-11 items-center justify-between bg-record-signal px-3 text-xs text-record-ink hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
            >
              Every control, written out <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </dialog>, document.body
  );
}