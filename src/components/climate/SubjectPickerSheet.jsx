import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { MarkClose } from '@/components/climate/RecordFootMarks';
import SubjectMark from '@/components/climate/SubjectMark';
import subjectMarkReasons from '@/components/climate/subjectMarkReasons';
import '@/components/climate/subject-picker.css';

// ── THE THEMES, DRAWN AS A PLATE ────────────────────────────────────────────────
// This was the device's own picker: a plain list of words, and no mark anywhere in it. A
// reader choosing a theme was the one place on the record where the printed hand was
// missing, so "Seagrasses", "Mangroves" and "Drought" were three identical grey lines.
//
// It is the record's plate now, the same one the index uses: every theme's mark on one
// screen, four or five across, nothing to scroll to see what is there. Pressing a mark
// does not choose it — it says what the drawing is made of and which part of it is red,
// because a mark that cannot say why it looks like that is decoration. The red line under
// the caption is the way through: it reads that theme's entries.
//
// The faults that made the first in-page list clunky are answered rather than avoided: the
// page behind is held still by the record's own position-fixed lock (the one the contents
// sheet and the photograph viewer use), the sheet's height is stated outright, and only
// the plate scrolls — and only when a record carries more themes than one screen holds.
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

  // Opening the sheet stands the caption on the theme the reader is already reading.
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

  if (!showing) return null;

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
            <p id="record-theme-sheet-title" className="record-header-type text-[19px] leading-none text-record-mark">Explore by theme</p>
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

          <figure className="subject-plate">
            <div
              role="group"
              aria-label="Every theme, with its mark"
              className="subject-plate-grid"
              style={{ gridTemplateColumns: `repeat(${items.length > 24 ? 5 : 4}, minmax(0, 1fr))` }}
            >
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => press(item.id)}
                  aria-pressed={item.id === chosenId}
                  aria-label={`${item.label}. ${reasonFor(item.id)}`}
                  aria-controls="record-theme-caption"
                  className="subject-plate-cell text-record-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
                >
                  <span aria-hidden="true" className="flex min-h-0 w-[76%] max-w-[52px] flex-1 items-center justify-center">
                    <SubjectMark subject={item.id} size={40} className="h-full w-full" />
                  </span>
                  <span className="block w-full text-center text-[9.5px] leading-[1.1] [overflow-wrap:anywhere]">{item.label}</span>
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
                  <p className="mt-1 text-pretty text-[12.5px] leading-[1.45] text-record-muted" style={{ fontFamily: 'var(--font-reading)' }}>{reason}</p>
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

          <p className="shrink-0 border-t border-record-ink/20 pt-2 text-[11px] leading-snug text-record-muted">
            {items.length} themes · press a mark to read why it is drawn that way
          </p>
        </div>
      </div>
    </dialog>, document.body,
  );
}