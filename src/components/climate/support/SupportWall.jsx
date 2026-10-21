import React from 'react';

export default function SupportWall({ names, supporters }) {
  return (
    <section className="border-2 border-record-ink/20 bg-record-paper p-4 sm:p-5">
      <h2 className="font-display text-xl font-bold uppercase leading-tight text-record-ink">Kept by</h2>
      <p className="mt-1 text-[11px] leading-relaxed text-record-muted">
        Names stand in the order they arrived — never by size. A £2 gift and a £500 gift read exactly the same here.
        Anonymous gifts are counted, and never named.
      </p>

      {names.length === 0 ? (
        <p className="mt-4 text-[12px] text-record-muted">No names yet. The record is young, and this wall is new.</p>
      ) : (
        <ul className="mt-4 flex flex-wrap gap-2">
          {names.map((name, index) => (
            <li
              key={`${name}-${index}`}
              className="px-2.5 py-1.5 text-[11px] font-black border border-record-ink/25 bg-record-bone text-record-ink"
            >
              {name}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 border-t border-record-ink/15 pt-3 text-[11px] text-record-muted">
        {supporters === 0
          ? 'Nobody has given yet.'
          : `${supporters} ${supporters === 1 ? 'person keeps' : 'people keep'} this record.`}
      </p>
    </section>
  );
}