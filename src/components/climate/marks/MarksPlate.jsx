import React, { useState } from 'react';
import { MARKS_IN_ORDER } from '@/components/climate/marks/marksOrder';
import { MarkExplore } from '@/components/climate/RecordFootMarks';
import { useClimateImpactStats } from '@/hooks/useClimateImpactStats';
import MarkGrid from '@/components/climate/marks/MarkGrid';
import MarkCaption from '@/components/climate/marks/MarkCaption';
import '@/components/climate/marks/marks-plate.css';

export default function MarksPlate({ onClose, onNavigate, fitted = false }) {
  const [openIndex, setOpenIndex] = useState(null);
  const { data } = useClimateImpactStats();
  const counted = data && !data.counts_unavailable ? data : null;
  const chosen = openIndex === null ? null : MARKS_IN_ORDER[openIndex];
  return (
    <figure className={`marks-plate${fitted ? ' marks-plate--fitted' : ' pb-3'}`}>
      {!fitted && (
        <>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-[11px] uppercase tracking-[0.16em] text-record-mark">Every mark, together</p>
            <button type="button" onClick={onClose} aria-label="Back to every door" title="Back to every door" className="flex h-11 w-11 shrink-0 items-center justify-center text-record-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark">
              <MarkExplore size={24} />
            </button>
          </div>
        </>
      )}
      <MarkGrid openIndex={openIndex} onSelect={setOpenIndex} fitted={fitted} />
      <MarkCaption chosen={chosen} onNavigate={onNavigate} />
      {!fitted && !chosen && counted && (
        <p className="mt-2 border-t border-record-ink/15 pt-2 text-[10px] leading-relaxed text-record-muted">
          {counted.published_entries ?? 0} entries on the record · read in {counted.unique_countries ?? 0} places · readings, not people
        </p>
      )}
    </figure>
  );
}