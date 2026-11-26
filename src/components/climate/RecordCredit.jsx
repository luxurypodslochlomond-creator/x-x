import React from 'react';
import { Link } from 'react-router-dom';

// ── THREE NAMES, SET QUIETLY ──────────────────────────────────────────────────
// This plate has been wrong twice, and both times for the same reason: it was trying
// to be important.
//
// The first version read "Platform built by" over three names, which folded three
// different jobs into one verb. The second gave each job its own tracked uppercase
// label over a name set at headline size, with a red rule above and the word COLOPHON
// between them, and a line explaining what the AI was. Every part of that was true and
// the whole of it shouted: a printer's colophon is the quietest block on a sheet, and
// this one had become the loudest thing on the page. Brian said "shouty and weird", and
// he was right — a record that ranks its own makers is doing exactly the thing it
// exists to refuse.
//
// So: three names, one line, no ladder. Nobody is "created by" above anybody else, and
// the machine is not given a sentence to explain itself with. Brian, 21 November: "you
// first me last" — so the tool comes first, Barbara in the middle, Brian last. Then the
// company, small. That is the whole plate.
const THREE = ['BRO51', 'Barbara', 'Brian Hughes'];

export default function RecordCredit({ className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-xl px-5 ${className}`}>
      <p
        className="text-center text-[13.5px] leading-[1.75] text-record-ink/85"
        style={{ fontFamily: 'var(--record-display)' }}
      >
        {THREE.map((name, i) => (
          <React.Fragment key={name}>
            {i > 0 && (
              <span aria-hidden="true" className="mx-2 text-record-muted/50">
                ·
              </span>
            )}
            {name}
          </React.Fragment>
        ))}
      </p>

      {/* The only address the record prints for itself.
          "· Scotland" used to sit after it, and the foot already says Scotland four lines
          above ("made in Scotland from photons"), so the sheet was printing the country
          twice in one colophon — which reads as a template rather than as an imprint. The
          company's name is the last thing said, and the country is said once, where it
          means something. */}
      <p className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-record-muted">
        <Link
          to="/"
          className="underline decoration-dotted underline-offset-2 transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red"
        >
          UF51 CIC
        </Link>
      </p>
    </div>
  );
}