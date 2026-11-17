import React from 'react';

const when = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  } catch (e) {
    return '';
  }
};

// ── ONE PERSON, AND ONLY WHAT IS THEIRS ─────────────────────────────────────
// A name, the few words they wrote themselves, and the work that can be counted from the
// checks table. There is deliberately no portrait, no job title, no follower count and no
// badge: the roll is a list of people who signed, and the moment it starts dressing them
// it stops being a record and becomes a profile page.
export default function PersonOnTheRoll({ person }) {
  return (
    <article className="border-t border-record-ink/15 py-6 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h2 className="text-[19px] leading-tight text-record-ink" style={{ fontFamily: 'var(--font-display)' }}>
          {person.name || 'A witness'}
        </h2>
        <span
          className="font-mono text-[9.5px] uppercase tracking-[0.14em]"
          style={{ color: person.is_keeper ? '#1e3a2b' : '#6b5f4f' }}
        >
          {person.is_keeper ? 'holds the keys' : 'reads the sources'}
        </span>
      </div>

      {person.line && (
        <p className="mt-2 max-w-[46ch] text-[14.5px] leading-[1.65] text-record-ink" style={{ fontFamily: 'var(--font-reading)' }}>
          {person.line}
        </p>
      )}

      <p className="mt-3 font-mono text-[11px] leading-relaxed text-record-muted">
        {person.since ? `on the list since ${when(person.since)}` : 'on the list'}
        {' · '}
        {person.signed_count > 0
          ? `signed ${person.signed_count} ${person.signed_count === 1 ? 'entry' : 'entries'}`
          : 'nothing signed yet'}
      </p>

      {person.signed?.length > 0 && (
        <ul className="mt-1.5 space-y-0.5">
          {person.signed.map((s, i) => (
            <li key={i} className="font-mono text-[11px] leading-relaxed text-record-muted">
              — {s.title || 'an entry'}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}