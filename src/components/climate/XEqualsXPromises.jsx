import React from 'react';

// ── WHAT THE RECORD PROMISES ────────────────────────────────────────────────────
// "Owe" was wrong, and it was wrong in a way worth writing down: a debt is something a
// creditor collects, and this page is not a bill. What sits here is a promise — five
// things the record says it will do, each with the part that makes it more than a
// sentence on a website printed underneath it.
//
// The type is the foot's type now. The foot got this right: the mark huge in the reading
// face, the borrowed sentence in the machine's mono caps on a yellow chip, the names at a
// size a person can actually read. This band was doing the opposite — thirteen-pixel
// uppercase for everything, which is a memo, not a record. Labels are mono caps, sentences
// are sentences, and the only colour on the band is the record's own red and yellow.

const PROMISES = [
  {
    n: '1',
    promise: 'Nothing goes up without its source.',
    kept: 'Every entry names where it came from, so a reader can follow it. One with no traceable origin waits for a person to find one — or is left out.',
  },
  {
    n: '2',
    promise: 'Dates are said the way they are known.',
    kept: 'Exact where it is exact, rough where it is rough, and never sharpened up to look more certain than it is.',
  },
  {
    n: '3',
    promise: 'Corrections are made in daylight.',
    kept: 'When something is wrong it is corrected on the entry, with the date it changed. Nothing is quietly rewritten, and no entry is taken down to hide it.',
  },
  {
    n: '4',
    promise: 'One standard, whoever sent it.',
    kept: 'Nothing ranked, nothing paid to the front, no entry treated as truer because of the name behind it.',
  },
  {
    n: '5',
    promise: 'You can check us without trusting us.',
    kept: 'Each entry is fingerprinted when it goes up, and a reader can recompute that fingerprint in their own browser — so a silent edit shows.',
  },
];

export default function XEqualsXPromises() {
  return (
    <section id="what-is-promised" aria-labelledby="promised-heading">
      <p className="covenant-kicker">The promise</p>
      <h2 id="promised-heading">What this record promises you</h2>
      <p className="covenant-promises-open">
        Not to its founder, and not to us. To whoever reads it — and to whoever is quoted in it
        without ever having met us.
      </p>

      <ol className="covenant-promises">
        {PROMISES.map(({ n, promise, kept }) => (
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