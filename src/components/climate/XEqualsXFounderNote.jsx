import React from 'react';
import { Link } from 'react-router-dom';
import { MarkPortrait } from './RecordFootMarks';

// ── WHOSE RECORD THIS IS ──────────────────────────────────────────────────────
// The page used to open on what goes wrong without a record — which is true, and which
// is also the least persuasive order to say anything in. Nobody is moved by a warning
// about filing. So the person comes first, and the argument comes later, for anyone who
// wants it.
//
// One mark, one name, three lines, one door. It is not a biography: the founder page is
// the biography, and it already exists. This is the handshake.
export default function XEqualsXFounderNote() {
  return (
    <section aria-labelledby="whose-record" className="my-9 border-y border-record-ink/20 py-6">
      <div className="flex items-center gap-3">
        <MarkPortrait size={26} className="shrink-0 text-record-ink" />
        <span id="whose-record" className="font-mono text-[12px] uppercase tracking-[0.16em] text-record-muted">
          Whose record this is
        </span>
      </div>

      <p
        className="mt-4 text-[26px] leading-[1.2] text-record-ink"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Janine M. H. Selendy
      </p>

      <p className="mt-3 max-w-[46ch]">
        Forty years on water, oceans and public health, and a library of what actually works
        gathered along the way. This record is that library, opened to everyone.
      </p>

      <Link
        to="/ClimateFounder"
        className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[15px] text-record-red underline decoration-record-mark/40 underline-offset-4 transition-colors hover:text-record-ink"
      >
        Read the founder
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}