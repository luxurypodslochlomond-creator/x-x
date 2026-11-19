import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { MarkClose } from '@/components/climate/RecordFootMarks';
import SubjectMark from '@/components/climate/SubjectMark';
import subjectMarkReasons from '@/components/climate/subjectMarkReasons';
import '@/components/climate/subject-picker.css';

// ── THE THEMES, DRAWN AS A PLATE — ON BOTH GLASSES ──────────────────────────────
// This was the device's own picker: a plain list of words, and no mark anywhere in it. A
// reader choosing a theme was the one place on the record where the printed hand was
// missing, so "Seagrasses", "Mangroves" and "Drought" were three identical grey lines.
//
// It is the record's plate now: every theme's mark on one screen, nothing to scroll to see
// what is there. Pressing a mark does not choose it — it says what the drawing is made of,
// because a mark that cannot say why it looks like that is decoration. The red line under
// the caption is the way through: it reads that theme's entries.
//
// ── AND THE DESK WAS STILL BEING HANDED THE OLDER SHEET ────────────────────────
// Brian, 19 November: "how can get desktop working as good as mobile with the explore and
// explore by theme — seems not coolasfuck like mobile on screen." He was right, and the
// fault was the one this record keeps making: a phone got the new thing and a desk kept
// the old one. A desk was still reading a two-column list of names with counts, and the
// reasons — the only part of this that makes a reader care — were behind a "About this
// index" fold.
//
// So it is one plate at both widths, exactly as the explore index already is. A desk gets
// the same marks, the same caption, the same one-line reason, laid eight across on the
// paper instead of four, because a desk has the width and a handset does not. Nothing else
// differs: press a mark, read why it is drawn that way, follow the red line through.
export default function SubjectPickerSheet({ open, onClose, subjects = [], totalEntries = 0, selected, allLabel = 'Every theme', onSelect }) {
  const dialogRef = useRef(null);
  const [isPhone, setIsPhone] = useState(() => !window.matchMedia('(min-width: 1024px)').matches);
  const [chosenId, setChosenId] = useState(selected || 'all');

  const items = useMemo(
    () => [{ id: 'all', label: allLabel, count: totalEntries }, ...subjects],
    [subjects, allLabel, totalEntries],
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsPhone(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Opening the plate stands the caption on the theme the reader is already reading.
  useEffect(() => {
    if (open) setChosenId(selected || 'all');
  }, [open, selected]);

  const showing = open && isPhone;
  useBodyScrollLock(showing);

  useEffect(() => {
    if (!showing) return undefined;
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!dialog.open) {
      try { dialog.showModal(); } catch { /* already open — nothing to do */ }
    }
    return () => { if (dialog.open) dialog.close(); };
  }, [showing]);

  if (!open) return null;

  // A theme added by a keeper may have no drawing of its own yet. It says so, rather than
  // borrowing another theme's reason and quietly meaning something it does not.
  const reasonFor = (id) => subjectMarkReasons[id]
    || 'No drawing of its own yet: this theme wears the record’s general mark until it has one.';

  const chosen = items.find((item) => item.id === chosenId) || items[0];
  const reason = reasonFor(chosen.id);
  const count = chosen.count || 0;
  const action = chosen.id === 'all'
    ? 'Read every entry'
    : count
      ? `Read ${count} ${count === 1 ? 'entry' : 'entries'}`
      : 'Open this theme';

  const go = (id) => { onSelect(id); onClose(); };
  // One press reads the mark; a second press on the same mark goes there.
  const press = (id) => { if (id === chosenId) go(id); else setChosenId(id); };

  const inline = !isPhone;
  // A desk gets six across, not eight: eight in a panel this wide put a mark in a cell
  // barely wider than the mark itself, which is what read as squashed. Six leaves the
  // drawing air on both sides, and the plate is still four rows deep on one screen.
  const columns = inline
    ? (items.length > 30 ? 8 : 6)
    : (items.length > 24 ? 5 : 4);

  const plate = (
    <figure className="subject-plate" data-inline={inline ? 'true' : undefined}>
      <div
        role="group"
        aria-label="Everything the record is about, with its mark"
        className="subject-plate-grid"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => press(item.id)}
            aria-pressed={item.id === chosenId}
            aria-label={`${item.label}. ${reasonFor(item.id)}`}
            aria-controls="record-theme-caption"
            className="subject-plate-cell relative text-record-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
          >
            <span aria-hidden="true" className="flex min-h-0 w-[76%] max-w-[52px] flex-1 items-center justify-center">
              <SubjectMark subject={item.id} size={40} className="h-full w-full" />
            </span>
            {/* ── HOW MUCH IS BEHIND EACH DOOR ────────────────────────────────────────
                A plate of twenty-four drawings with no numbers is a poster. The count,
                set small and in the mark's own red, is what makes it the record's index:
                it says how much of the world is actually behind each drawing, and it
                says nothing about a subject the record has not got yet, which is why an
                empty one carries no number at all. */}
            {item.count > 0 && (
              <span aria-hidden="true" className="absolute right-1 top-0.5 font-mono text-[9px] tabular-nums leading-none text-record-mark/75">{item.count}</span>
            )}
            {/* The name is set in the record's display hand, not in the small body face:
                twenty-four lowercase captions under twenty-four drawings is a tag cloud.
                Uppercase, tracked and bold, it is a printer's specimen sheet. */}
            <span className="record-header-type block w-full text-center text-[10px] uppercase leading-[1.15] tracking-[0.05em] [overflow-wrap:anywhere] lg:text-[11.5px]">{item.label}</span>
          </button>
        ))}
      </div>

      <figcaption id="record-theme-caption" aria-live="polite" aria-atomic="true" className="subject-plate-caption">
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="block h-12 w-12 shrink-0 text-record-ink [&>svg]:h-full [&>svg]:w-full">
            <SubjectMark subject={chosen.id} size={40} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold leading-tight text-record-ink">{chosen.label}</p>
            <p className="record-description record-description--tight mt-1">{reason}</p>
            <button
              type="button"
              onClick={() => go(chosen.id)}
              className="mt-1 inline-flex min-h-11 items-center gap-2 text-[12px] font-bold text-record-mark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
            >
              {action}
              <svg width="7" height="8" viewBox="0 0 7 8" aria-hidden="true"><path d="M0 0l7 4-7 4Z" fill="currentColor" /></svg>
            </button>
          </div>
        </div>
      </figcaption>
    </figure>
  );

  // ── THE DESK: THE SAME PLATE, ON THE PAGE RATHER THAN OVER IT ─────────────────
  // A panel that floats over a desk's page would hide the entries a reader is choosing
  // between. So on a desk the plate opens in the page, under the line that opened it.
  if (inline) {
    return (
      <section
        id="record-subject-index"
        aria-label="What the record is about"
        className="mt-1 hidden border-b border-record-ink/20 pb-2 font-body text-record-ink lg:block"
        onKeyDown={(event) => { if (event.key === 'Escape') onClose(); }}
      >
        <div className="mb-2 flex items-center justify-between gap-4 border-b border-record-mark/30 pb-1">
          <p className="record-header-type text-[15px] leading-none text-record-mark">What the record is about</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Put the sheet down"
            title="Put the sheet down"
            className="flex h-9 w-9 shrink-0 items-center justify-center text-record-ink hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
          >
            <span aria-hidden="true" className="block h-[17px] w-[17px] [&>svg]:h-full [&>svg]:w-full"><MarkClose size={17} /></span>
          </button>
        </div>
        {plate}
        <p className="border-t border-record-ink/20 pt-2 text-[11px] leading-snug text-record-muted">
          {items.length} subjects on the record · press a mark to read why it is drawn that way
        </p>
      </section>
    );
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      id="record-theme-sheet"
      aria-labelledby="record-theme-sheet-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}
      /* The height is stated outright because a dialog arrives with fit-content, which
         beats an inset of zero: a sheet left to stretch comes out the size of its contents
         instead of the size of the glass. */
      className="subject-picker climate-record fixed inset-0 m-0 flex h-[100dvh] max-h-none w-full max-w-none items-stretch justify-center overflow-hidden border-0 bg-transparent p-0 font-body text-record-ink backdrop:bg-record-ink/35"
    >
      <div className="flex h-full w-full flex-col border-t-2 border-record-mark/70 bg-record-bone">
        <div className="mx-auto flex min-h-0 w-full max-w-[560px] flex-1 flex-col px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))]">

          <div className="mb-2 flex shrink-0 items-center justify-between gap-4 border-b border-record-mark/30 pb-2">
            <p id="record-theme-sheet-title" className="record-header-type text-[19px] leading-none text-record-mark">What the record is about</p>
            <button
              type="button"
              autoFocus
              onClick={onClose}
              aria-label="Put the sheet down"
              title="Put the sheet down"
              className="flex h-11 w-11 shrink-0 items-center justify-center text-record-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
            >
              <MarkClose size={24} />
            </button>
          </div>

          {plate}

          <p className="shrink-0 border-t border-record-ink/20 pt-2 text-[11px] leading-snug text-record-muted">
            {items.length} subjects on the record · press a mark to read why it is drawn that way
          </p>
        </div>
      </div>
    </dialog>, document.body,
  );
}