import React from 'react';
import { Link } from 'react-router-dom';

// ── TWO THINGS WITH ONE NAME ──────────────────────────────────────────────────
// A short address is made from a thing's own name, so two things can honestly share one.
// When they do, the record does not pick for the reader: it shows what it has and says so.
// Opening the wrong drawing under the right name would be the one mistake this record must
// never make — and silently choosing the oldest is that same mistake wearing a shrug.
export default function ShortDoorChooser({ slug, items }) {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-16 text-record-ink" style={{ fontFamily: 'var(--font-body)' }}>
      <p className="record-meta uppercase tracking-[0.18em] text-record-muted">More than one entry has this name</p>
      <h1 className="mt-3 text-2xl font-bold break-words">/{slug}</h1>
      <p className="mt-4 text-[14px] leading-relaxed text-record-muted">
        Two things on the record are called this. Nothing is hidden and nothing is guessed at — choose the one you meant.
      </p>
      <ul className="mt-7">
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="flex items-baseline justify-between gap-4 border-b border-record-ink/15 py-4 hover:border-record-ink"
            >
              <span className="text-[15px] font-bold leading-snug">{item.label}</span>
              {item.note && <span className="record-meta shrink-0 text-record-muted">{item.note}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}