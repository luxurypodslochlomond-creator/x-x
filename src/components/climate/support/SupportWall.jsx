import React from 'react';

export default function SupportWall({ names, supporters, t }) {
  return (
    <section className="mt-4">
      <p className="text-[13px] leading-relaxed text-record-muted">{t.wall_sub}</p>

      {names.length === 0 ? (
        <p className="mt-4 text-[14px] leading-relaxed text-record-muted">{t.wall_empty}</p>
      ) : (
        <ul className="mt-4 flex flex-wrap gap-2">
          {names.map((name, index) => (
            <li
              key={`${name}-${index}`}
              className="px-3 py-2 text-[13px] font-bold border border-record-ink/30 text-record-ink"
            >
              {name}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 border-t border-record-ink/20 pt-3 text-[12px] uppercase tracking-[0.14em] text-record-muted">
        {supporters === 0
          ? t.wall_none
          : `${supporters} ${supporters === 1 ? t.wall_one : t.wall_many}`}
      </p>
    </section>
  );
}