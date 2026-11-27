import React from 'react';
import { MARKS_IN_ORDER } from '@/components/climate/marks/marksOrder';

export default function MarkGrid({ openIndex, onSelect, fitted }) {
  return (
    <div role="group" aria-label="Every mark of the record" className="marks-plate-grid">
      {MARKS_IN_ORDER.map(({ name, Mark, means }, i) => {
        const selected = openIndex === i;
        return (
          <button
            key={name}
            type="button"
            onClick={() => onSelect(selected ? null : i)}
            aria-pressed={selected}
            aria-label={`${name}. ${means}`}
            aria-controls="record-mark-caption"
            className={`marks-plate-cell ${selected ? 'bg-record-ink text-record-paper' : 'text-record-ink'}`}
          >
            <span aria-hidden="true" className="marks-plate-art"><Mark size={40} /></span>
            {/* The name is always printed. It used to appear on a phone only, so a desk got a
                plate of drawings with nothing written under them and no way to know what any
                of them was without pressing it. A door says its own name. */}
            <span className="marks-plate-name">{name}</span>
          </button>
        );
      })}
    </div>
  );
}