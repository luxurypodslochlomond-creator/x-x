import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check } from 'lucide-react';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { MarkClose } from '@/components/climate/RecordFootMarks';
import SubjectMark from '@/components/climate/SubjectMark';
import SubjectIndexItem from '@/components/climate/SubjectIndexItem';
import '@/components/climate/subject-picker.css';

// ── THE THEMES, ON A PHONE, WITH THEIR MARKS ────────────────────────────────────
// This was the device's own picker — a plain list of words handed to the operating
// system. It was chosen because an in-page sheet had been clunky, but the price was
// that a phone showed no marks at all: the one place a reader chooses a theme was the
// one place the record's printed hand was missing, so "Seagrasses" and "Mangroves" and
// "Drought" were three lines of identical grey type.
//
// So the record draws its own list again, and the faults that made the first attempt
// clunky are answered one by one rather than by handing the job away:
//   1. Two things moving under one finger was the fault, not the list. The page behind
//      is held still by the record's own position-fixed lock, the same one the contents
//      sheet and the photograph viewer use, and the reader is handed back their line.
//   2. The list scrolls; the sheet does not. One scroll container, inside a sheet pinned
//      to the glass, so a thumb drags the themes and nothing else.
//   3. The rows are the record's rows — mark, name, count — at a size a thumb can read
//      and a mark can be told apart from another mark, which is the whole point of
//      drawing them.
// It is a phone sheet only: a wide screen keeps the written index that is already there.
export default function SubjectPickerSheet({ open, onClose, subjects = [], totalEntries = 0, selected, allLabel = 'Every theme', onSelect }) {
  const dialogRef = useRef(null);
  const [isPhone, setIsPhone] = useState(() => !window.matchMedia('(min-width: 1024px)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsPhone(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

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

  const choose = (id) => {
    onSelect(id);
    onClose();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      id="record-theme-sheet"
      aria-labelledby="record-theme-sheet-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}
      /* The height is stated outright for the same reason the contents sheet states it:
         a dialog arrives with fit-content, which beats an inset of zero, so a sheet left
         to stretch comes out the size of its contents instead of the size of the glass. */
      className="subject-picker climate-record fixed inset-0 m-0 flex h-[100dvh] max-h-none w-full max-w-none items-stretch justify-center overflow-hidden border-0 bg-transparent p-0 font-body text-record-ink backdrop:bg-record-ink/35"
    >
      <div className="flex h-full w-full flex-col border-t-2 border-record-mark/70 bg-record-bone">
        <div className="mx-auto flex min-h-0 w-full max-w-[560px] flex-1 flex-col px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))]">

          <div className="mb-1 flex shrink-0 items-center justify-between gap-4 border-b border-record-mark/30 pb-2">
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

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <button
              type="button"
              onClick={() => choose('all')}
              aria-pressed={selected === 'all'}
              className={`flex min-h-14 w-full items-center gap-3 border-b border-record-ink/20 py-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark ${selected === 'all' ? 'bg-cartoon-sun text-record-ink' : 'text-record-ink'}`}
            >
              <SubjectMark subject="all" size={34} className="shrink-0" />
              <span className="min-w-0 flex-1 text-base font-bold leading-snug">{allLabel}</span>
              <span className="shrink-0 text-xs tabular-nums text-record-muted">{totalEntries} {totalEntries === 1 ? 'entry' : 'entries'}</span>
              {selected === 'all' && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-record-mark" />}
            </button>

            <div className="divide-y divide-record-ink/10">
              {subjects.map((subject) => (
                <SubjectIndexItem
                  key={subject.id}
                  subject={subject}
                  selected={selected === subject.id}
                  empty={!subject.count}
                  onClick={() => choose(subject.id)}
                />
              ))}
            </div>
          </div>

          <p className="shrink-0 border-t border-record-ink/20 pt-2 text-[11px] leading-snug text-record-muted">
            {subjects.length} themes · choose one to read the entries
          </p>
        </div>
      </div>
    </dialog>, document.body,
  );
}