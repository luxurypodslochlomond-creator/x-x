import React from 'react';
import SubjectMark from '@/components/climate/SubjectMark';

// ── WHEN THE RECORD HAS NO PICTURE OF ITS OWN, IT DRAWS ONE ─────────────────────
// Brian, 18 November: "on mobile images look fake bri, not sure why."
//
// He was right, and the reason was not the crop or the frame. It was that most entries had
// no photograph of their own and were being given a stock one: a generic ocean for a named
// coastal defence, a generic field for a named farm. The card then printed "Illustrative
// photograph" underneath, so the record was announcing the stand-in in small grey type —
// honest, and still a photograph pretending to be a place it had never been. A record that
// exists to refuse invention cannot open with a borrowed picture of somewhere else.
//
// So a stock photograph is never printed on an entry again. Where the record holds no
// photograph of the place itself, the entry is drawn instead, from what it does know: the
// subject's own mark, the place, how well the claim is known. Nothing is invented and
// nothing is borrowed — and the reader can tell at a glance which entries carry a real
// photograph and which carry the record's own drawing of the facts.
const VERIFICATION = {
  single_source: 'Single source',
  corroborated: 'Corroborated',
  official_record: 'Official record',
};

export default function RecordDrawnPlate({ entry }) {
  const subject = entry?.category || 'other';
  const place = entry?.region_rough || entry?.country || '';
  const verification = VERIFICATION[entry?.verification] || 'Single source';

  return (
    <span className="record-drawn-plate relative block aspect-[4/3] w-full shrink-0 overflow-hidden bg-record-bone">
      {/* The subject, drawn twice: once big and pale as the plate's own ground, once at
          reading size so the mark is legible as a mark rather than as texture. */}
      <SubjectMark
        subject={subject}
        size={156}
        className="pointer-events-none absolute -right-8 -top-9 text-record-ink opacity-[0.08]"
      />
      <span className="absolute inset-0 flex flex-col justify-between p-3.5">
        <span className="flex items-start justify-between gap-2">
          <SubjectMark subject={subject} size={40} />
          <span className="font-mono text-[9px] uppercase leading-[1.5] tracking-[0.14em] text-record-muted">
            {verification}
          </span>
        </span>
        <span className="block">
          {place && (
            <span className="block font-mono text-[10px] uppercase leading-[1.4] tracking-[0.16em] text-record-red">
              {place}
            </span>
          )}
          <span className="mt-1 block font-mono text-[9px] uppercase leading-[1.5] tracking-[0.1em] text-record-muted">
            No photograph given · drawn from the entry
          </span>
        </span>
      </span>
    </span>
  );
}