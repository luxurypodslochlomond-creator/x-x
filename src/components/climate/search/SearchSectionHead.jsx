import React from 'react';

export default function SearchSectionHead({ index, label, count }) {
  return (
    <div className="mb-2 flex items-center gap-3 border-t-4 border-cartoon-sun pb-2 pt-4 text-record-ink">
      <span className="base-one-label font-mono uppercase text-record-mark">{String(index).padStart(2, '0')}</span>
      <h2 className="base-one-label font-mono uppercase">{label}</h2>
      <span className="base-one-label font-mono uppercase ml-auto shrink-0">{count}</span>
    </div>
  );
}