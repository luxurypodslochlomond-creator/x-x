import React from 'react';

// ── THE CLOCK, DONE ONCE AND DONE RIGHT ─────────────────────────────────────────
// Two things kept getting this wrong. The hour was printed as fact when nobody had
// confirmed it, and the times were printed in one city's clock as though the whole record
// were sitting in that city.
//
// So: the venue's own clock is always printed, and the reader's is worked out on their
// device, from the instant — never from a typed offset, which is how a page ends up an
// hour wrong for half the world in the week the clocks change.
//
// Benin City keeps West Africa Time all year: UTC+1, no daylight saving, ever. That is why
// the festival's times are stable and only the reader's side moves. Nothing about a
// reader's clock is stored, sent or counted: it is read, used to do one sum, and dropped.

const VENUE = 'Benin City · WAT, UTC+1 all year (no daylight saving)';

const TIMES = [
  {
    label: 'Formal opening, in person',
    venue: 'Saturday 28 November, 9:00am',
    instant: '2026-11-28T08:00:00Z',
  },
  {
    label: 'Online sessions open',
    venue: '10:00am, on the festival’s days',
    // The flyer gives the time of day, not which day, so this is converted against
    // 29 November — and the note below says the sum holds for all three days, because no
    // clock in the northern hemisphere changes in that week.
    instant: '2026-11-29T09:00:00Z',
  },
];

function readerClock() {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!zone) return null;
    return { zone, format: new Intl.DateTimeFormat(undefined, { timeZone: zone, weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) };
  } catch {
    return null;
  }
}

export default function WorkshopClocks() {
  const clock = readerClock();

  return (
    <div className="mt-5 border border-record-ink/20 bg-record-bone/50 px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-record-red">The times, in your clock</p>

      <dl className="mt-2.5 space-y-2">
        {TIMES.map(({ label, venue, instant }) => (
          <div key={label} className="border-t border-record-ink/15 pt-2">
            <dt className="font-mono text-[10.5px] font-black uppercase tracking-wide">{label}</dt>
            <dd className="mt-0.5 text-[12.5px] leading-relaxed text-record-ink/85">
              {venue} venue time
              {clock ? (
                <>
                  {' · '}
                  <strong>{clock.format.format(new Date(instant))}</strong> where you are
                </>
              ) : (
                ' · your device will not say which clock it keeps, so the venue time is all this can honestly give you'
              )}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-2.5 font-mono text-[10px] leading-relaxed text-record-muted">
        {clock ? `Your clock says ${clock.zone}. ` : ''}The record reads it to do that one sum and keeps nothing of it.
        The venue time is the certain one; the sum holds for all three festival days, because no clock in the north
        changes that week.
      </p>
      <p className="mt-1.5 text-[12.5px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
        Two clocks, one room — and nobody in Benin City is getting up at three in the morning for us.
      </p>
    </div>
  );
}