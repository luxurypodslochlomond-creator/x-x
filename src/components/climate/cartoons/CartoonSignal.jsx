import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

// ── THE MACHINE, SAYING SOMETHING TRUE ──────────────────────────────────────────
// The room used to carry a drawn cosmos to feel technological, which was decoration
// pretending to be machinery. This is the machinery: one line, in the machine's own
// type, carrying a number that is actually counted from the wall. It is the only
// thing in the room that changes without anybody drawing anything, and that is the
// point — the record is a living instrument, not a printed poster.
//
// A failed count is not a zero. If the number cannot be read, the line still stands
// and says what the wall is, rather than inventing a nought to fill the space.
export default function CartoonSignal() {
  const { data } = useQuery({
    queryKey: ['cartoon-wall-count'],
    queryFn: () => base44.entities.ClimateCartoon.count({ status: 'published' }),
    staleTime: 30 * 60 * 1000,
  });

  const drawings = typeof data === 'number' ? data : null;

  return (
    <p className="cartoon-signal record-meta" role="status">
      <span className="cartoon-signal-fact">
        {drawings === null
          ? 'Drawings on the wall'
          : `${drawings} ${drawings === 1 ? 'drawing' : 'drawings'} on the wall`}
      </span>
      <span aria-hidden="true" className="cartoon-signal-dot" />
      <span>Credits kept with the work</span>
      <span aria-hidden="true" className="cartoon-signal-dot" />
      <span>Open to any hand</span>
    </p>
  );
}