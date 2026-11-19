import React from 'react';
import { Link } from 'react-router-dom';
import useRecordImage from './useRecordImage';
import SubjectMark from './SubjectMark';

// ── WHAT THE RECORD IS HOLDING, HELD UP ─────────────────────────────────────────
// This band was three cards of equal size, which is the shape of a product grid. A record
// holding something up for a reader does not give every entry the same weight: one entry
// leads, at the size a front page gives a lead, and the others stand beside it with their
// own small pictures and one line of provenance each.
//
// The photograph is the impact; the credit stays on it, because a picture that has lost its
// source has become decoration.

function RoomLine({ item, tone }) {
  const isSolution = item.entry_type === 'solution';
  return (
    <span className="flex items-center gap-2">
      <span className={`text-[9.5px] font-black uppercase tracking-[0.18em] ${tone === 'bone' ? 'text-record-bone/75' : isSolution ? 'text-record-botanical' : 'text-record-red'}`}>
        {isSolution ? 'Solution' : 'Crisis'}
      </span>
      {item.category && <SubjectMark subject={item.category} size={15} className={tone === 'bone' ? 'text-record-bone' : ''} />}
    </span>
  );
}

function Lead({ item }) {
  const image = useRecordImage(item);
  const photo = !image.borrowed;
  const to = `/ClimateDetail/${item.entry_type}/${item.id}`;

  if (!photo) {
    return (
      <Link to={to} className="group flex h-full flex-col justify-between border-t-2 border-record-ink pt-4">
        <div>
          <RoomLine item={item} tone="ink" />
          <h3 className="record-holding-title mt-2.5 leading-[1.08] text-record-ink group-hover:text-record-red">
            {item.title}
          </h3>
          {item.summary && (
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.7] text-record-ink/75" style={{ fontFamily: 'var(--font-reading)' }}>
              {item.summary}
            </p>
          )}
        </div>
        <div className="mt-6 flex items-end justify-between">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-record-muted">{item.source_name}</p>
          <SubjectMark subject={item.category || 'other'} size={72} />
        </div>
      </Link>
    );
  }

  return (
    <Link to={to} className="group relative block overflow-hidden bg-record-ink">
      <div className="relative aspect-[16/10] w-full">
        <img
          src={image.src}
          alt=""
          loading="lazy"
          decoding="async"
          onError={image.onError}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-record-ink via-record-ink/85 to-transparent px-5 pb-5 pt-28">
        <RoomLine item={item} tone="bone" />
        <h3 className="record-holding-title record-holding-title--over mt-2 leading-[1.08] text-record-bone">
          {item.title}
        </h3>
      </div>
      {image.credit && (
        <span className="absolute right-3 top-3 bg-record-ink/55 px-1.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-record-bone/85">
          {image.credit}
        </span>
      )}
    </Link>
  );
}

function Small({ item }) {
  const image = useRecordImage(item);
  const photo = !image.borrowed;
  return (
    <Link
      to={`/ClimateDetail/${item.entry_type}/${item.id}`}
      className="group flex flex-1 items-stretch gap-4 border-t border-record-ink/25 py-4 first:border-t-0 first:pt-0"
    >
      <div className="relative aspect-square w-[104px] shrink-0 overflow-hidden bg-record-bone">
        {photo ? (
          <img src={image.src} alt="" loading="lazy" decoding="async" onError={image.onError} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <SubjectMark subject={item.category || 'other'} size={40} />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <RoomLine item={item} tone="ink" />
        <h3 className="record-holding-small-title mt-1.5 line-clamp-3 leading-[1.3] text-record-ink transition-colors group-hover:text-record-red">
          {item.title}
        </h3>
        {item.source_name && (
          <p className="mt-1.5 line-clamp-1 font-mono text-[9px] uppercase tracking-[0.12em] text-record-muted">{item.source_name}</p>
        )}
      </div>
    </Link>
  );
}

export default function RecordHolding({ items = [], loading = false }) {
  if (loading) {
    return (
      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <div className="aspect-[16/10] w-full animate-pulse bg-record-ink/10" />
        <div className="flex flex-col gap-4">
          <div className="h-28 animate-pulse bg-record-ink/10" />
          <div className="h-28 animate-pulse bg-record-ink/10" />
        </div>
      </div>
    );
  }

  const [lead, ...rest] = items;
  if (!lead) return null;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-8">
      <Lead item={lead} />
      <div className="flex h-full flex-col justify-between">
        {rest.map((item) => (
          <Small key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}