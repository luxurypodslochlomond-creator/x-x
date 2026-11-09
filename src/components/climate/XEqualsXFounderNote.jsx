import React from 'react';
import { Link } from 'react-router-dom';
import RecordBand from './RecordBand';
import { MarkPortrait } from './RecordFootMarks';

// ── WHOSE RECORD THIS IS ──────────────────────────────────────────────────────
// One mark, one name, three lines, one door. Not a biography — the founder page is the
// biography, and it already exists. This is the handshake.
export default function XEqualsXFounderNote() {
  return (
    <RecordBand id="whose-record" label="Whose record this is" title="Janine M. H. Selendy" icon={MarkPortrait}>
      <p className="max-w-[46ch] text-[15.5px] leading-[1.6] text-record-ink">
        Forty years on water, oceans and public health, and a library of what actually works
        gathered along the way. This record is that library, opened to everyone.
      </p>

      <Link
        to="/ClimateFounder"
        className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[14px] text-record-red underline decoration-record-mark/40 underline-offset-4 transition-colors hover:text-record-ink"
      >
        Read the founder <span aria-hidden="true">→</span>
      </Link>
    </RecordBand>
  );
}