import React from 'react';
import { Link } from 'react-router-dom';
import useRecordImage from './useRecordImage';
import SubjectMark from './SubjectMark';

// ── AN ENTRY, SET AS A PLATE RATHER THAN A BOX ──────────────────────────────────
// On a desk, a solution and a crisis used to be a card: a photograph in a 4:3 frame, a
// coloured rule, a badge, a headline at fifteen pixels, and a border all the way round.
// Three of those across a page is a grid of boxes, which is what a directory looks like and
// what "old web 2" means when you point at it.
//
// A printed record sets an entry as a plate: the picture large, the words beside it at the
// size a headline is set at, and one hairline between it and the next. Alternating sides is
// not decoration — it is what stops a long list reading as a table.
//
// A borrowed picture is never printed as though it belonged to the entry (see useRecordImage).
// Where there is no photograph of its own, the plate shows the subject's own drawing at size
// on the record's paper and says nothing it cannot support.
export default function RecordEntryRow({ item, index = 0, flip = false }) {
  const isSolution = item.entry_type === 'solution';
  const image = useRecordImage(item);
  const photo = !image.borrowed;

  return (
    <Link
      to={`/ClimateDetail/${item.entry_type}/${item.id}`}
      className="group grid grid-cols-[minmax(0,6fr)_minmax(0,5fr)] items-stretch gap-8 border-t border-record-ink/25 py-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
    >
      <div className={`relative aspect-[16/10] overflow-hidden bg-record-bone ${flip ? 'order-2' : 'order-1'}`}>
        {photo ? (
          <>
            <img
              src={image.src}
              alt=""
              loading="lazy"
              decoding="async"
              onError={image.onError}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {image.credit && (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-record-ink via-record-ink/60 to-transparent px-2 pb-1.5 pt-8 font-mono text-[9px] uppercase leading-[1.4] tracking-[0.12em] text-record-paper/90">
                {image.credit}
              </span>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <SubjectMark subject={item.category || 'other'} size={112} />
          </div>
        )}
      </div>

      <div className={`flex flex-col justify-center ${flip ? 'order-1' : 'order-2'}`}>
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] tabular-nums leading-none text-record-muted">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`text-[10px] font-black uppercase tracking-[0.16em] ${isSolution ? 'text-record-botanical' : 'text-record-red'}`}>
            {isSolution ? 'Solution' : 'Crisis'}
          </span>
          {item.category && <SubjectMark subject={item.category} size={16} />}
        </div>

        <h3 className="record-row-title mt-2.5 leading-[1.1] text-record-ink transition-colors group-hover:text-record-red">
          {item.title}
        </h3>

        {item.summary && (
          <p className="mt-2.5 line-clamp-2 max-w-[46ch] text-[14.5px] leading-[1.65] text-record-ink/75" style={{ fontFamily: 'var(--font-reading)' }}>
            {item.summary}
          </p>
        )}

        {(item.source_name || item.country) && (
          <p className="mt-3 font-mono text-[9.5px] uppercase leading-[1.5] tracking-[0.12em] text-record-muted">
            {[item.source_name, item.country].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </Link>
  );
}