import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

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
//
// ── ONE LIST, NOT TWO ──────────────────────────────────────────────────────────
// Brian, 26 November: "needs truth and simplicity". The page was carrying the five
// promises here and then a second card called "Recorded commitments" underneath, reading
// six promises back out of the database — two lists doing one job, and the reader left to
// work out which one counted.
//
// They are one list now. Each promise carries the line the record has actually written
// down for it, in the record's own words, held as a record a keeper can correct rather
// than typed into this page — and the line saying what that commitment does NOT establish,
// because the limit is the truth of it and dropping it to save space would be the one
// economy this page cannot make. A promise with no recorded line under it simply stands on
// its own, which is honest: the dates promise has never been written down as a record.
const PROMISES = [
  {
    n: '1',
    promise: 'Nothing goes up without its source.',
    kept: 'Every entry names where it came from, so a reader can follow it. One with no traceable origin waits for a person to find one — or is left out.',
    claims: ['every entry carries its origin'],
  },
  {
    n: '2',
    promise: 'Dates are said the way they are known.',
    kept: 'Exact where it is exact, rough where it is rough, and never sharpened up to look more certain than it is.',
    claims: [],
  },
  {
    n: '3',
    promise: 'Corrections are made in daylight.',
    kept: 'When something is wrong it is corrected on the entry, with the date it changed. Nothing is quietly rewritten, and no entry is taken down to hide it.',
    claims: ['corrections in daylight'],
  },
  {
    n: '4',
    promise: 'One standard, whoever sent it.',
    kept: 'Nothing ranked, nothing paid to the front, no entry treated as truer because of the name behind it.',
    claims: ['x = x', 'equal worth ≠ equal size', 'no ranking', 'no advertising'],
  },
  {
    n: '5',
    promise: 'You can check us without trusting us.',
    // "Each entry is fingerprinted" was one word too wide: the music is not sealed yet, and
    // the seals page says so out loud. A promise with a word of overclaim in it is the one
    // thing this page cannot afford, so the line names what is sealed and says the rest is
    // named there. Checked against the record itself on 25 November.
    kept: 'Every entry that carries a seal can be recomputed in your own browser, so a silent edit shows. What is sealed — and what is not yet, the music among it — is named on the seals page.',
    claims: [],
  },
];

export default function XEqualsXPromises() {
  const [claims, setClaims] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    base44.entities.ClimateClaim
      .filter({ status: 'published' }, { sort: 'sort_order', limit: 50 })
      .then((page) => { if (live) setClaims(page.items); })
      .catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, []);

  const byMark = {};
  (claims || []).forEach((c) => { if (c.mark) byMark[c.mark] = c; });

  return (
    <section id="what-is-promised" aria-labelledby="promised-heading">
      <p className="covenant-kicker">The promise</p>
      <h2 id="promised-heading">What this record promises you</h2>
      <p className="covenant-promises-open">
        Not to its founder, and not to us. To whoever reads it — and to whoever is quoted in it
        without ever having met us.
      </p>

      <ol className="covenant-promises">
        {PROMISES.map(({ n, promise, kept, claims: marks }) => (
          <li key={n} data-n={n}>
            <div>
              <strong>{promise}</strong>
              <span>{kept}</span>
              {marks.map((mark) => {
                const c = byMark[mark];
                if (!c) return null;
                return (
                  <div key={mark} className="covenant-promise-kept">
                    <p className="covenant-promise-mark">{c.mark}</p>
                    <p className="covenant-promise-plain">{c.plain}</p>
                    {c.does_not_establish && (
                      <p className="covenant-promise-limit">
                        <b className="covenant-limit-label">Does not establish. </b>
                        {c.does_not_establish}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      {/* ── WHERE THESE LINES COME FROM, SAID ONCE ────────────────────────────────
          Six sources reading "this record's own rule" under six lines would be noise, so
          the provenance is said once, here, and it says the two things that matter: they
          are held as records a keeper can correct, and none of them is signed. */}
      <p className="covenant-promise-foot">
        {failed
          ? 'The record’s own written commitments could not be read just now, so the lines in its voice are missing from this list.'
          : 'Every line in the record’s own voice is held as a record rather than typed into this page, so a keeper can correct one in daylight. None is signed: a machine cannot sign.'}{' '}
        <Link to="/ClimateMethod">How an entry is made</Link>.
      </p>
    </section>
  );
}