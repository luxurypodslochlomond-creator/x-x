import React from 'react';

// ── WHAT THE RECORD OWES ────────────────────────────────────────────────────────
// This band used to be her: her name at display size, her four decades, her quotation,
// her source underneath. All of that is on her own page, where it belongs and where a
// reader who wants it can find it — and printing it again here made a page about a
// principle open by paying tribute to a person. A reader arriving at x = x wanted to know
// what the record owes them, not who asked for it.
//
// So the band answers the question the page is actually asking. Five debts, each one a
// single plain promise with the thing that makes it true beside it. Nothing is decorated:
// a debt that has to be sold is a debt nobody intends to pay.

const OWED = [
  {
    n: '1',
    promise: 'The source, or the entry does not go up.',
    kept: 'Every entry named with where it came from, so a reader can follow it. One with no traceable origin waits for a person to find one — or is left out.',
  },
  {
    n: '2',
    promise: 'The date, said the way it is actually known.',
    kept: 'Exact where it is exact, rough where it is rough, and never sharpened up to look more certain than it is.',
  },
  {
    n: '3',
    promise: 'A correction in daylight.',
    kept: 'When something is wrong it is corrected on the entry, with the date it was changed. Nothing is quietly rewritten and no entry is taken down to hide it.',
  },
  {
    n: '4',
    promise: 'One standard, whoever sent it.',
    kept: 'Nothing ranked, nothing paid to the front, no entry treated as more true because of the name behind it.',
  },
  {
    n: '5',
    promise: 'A way to check us without trusting us.',
    kept: 'Each entry is fingerprinted when it goes up, and a reader can recompute that fingerprint in their own browser — so a silent edit shows.',
  },
];

export default function XEqualsXOwed() {
  return (
    <section id="what-is-owed" aria-labelledby="owed-heading">
      <p className="covenant-kicker">The debt</p>
      <h2 id="owed-heading">What this record owes you</h2>
      <p className="covenant-founder-words covenant-owed-open">
        Not to its founder, and not to us. To whoever reads it — and to whoever is quoted in it
        without ever having met us.
      </p>

      <ol className="covenant-owes">
        {OWED.map(({ n, promise, kept }) => (
          <li key={n} data-n={n}>
            <div>
              <strong>{promise}</strong>
              <span>{kept}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}