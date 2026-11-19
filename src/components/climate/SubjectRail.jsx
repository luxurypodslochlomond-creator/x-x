import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import SubjectMark from '@/components/climate/SubjectMark';

// The compact line reveals an in-page atlas. Its preview disappears while open.
export default function SubjectRail({ strip = [], current = null, totalEntries, allLabel, selected, expanded, onOpenIndex, onSelect }) {
  const toggleRef = useRef(null);
  useEffect(() => {
    if (!expanded) return;
    const toggle = toggleRef.current;
    const header = toggle?.closest('.climate-record')?.querySelector('header');
    if (toggle) window.scrollBy({ top: toggle.getBoundingClientRect().top - (header?.getBoundingClientRect().bottom || 0) - 8, behavior: 'instant' });
  }, [expanded]);
  return (
    <div className="font-body text-record-ink">
      <button
        id="record-subject-toggle"
        ref={toggleRef}
        type="button"
        onClick={onOpenIndex}
        aria-expanded={expanded}
        aria-controls="record-subject-index"
        className="flex min-h-11 w-full items-center gap-2 border-y border-record-ink/35 py-1 text-left active:bg-record-paper focus-visible:outline-record-mark"
      >
        <SubjectMark subject={current?.id || selected} size={26} active={!!current} className="shrink-0" />
        <span className="min-w-0 flex-1 text-[14px] leading-snug">{expanded ? 'Subjects' : (current?.label || allLabel)}</span>
        <span className="shrink-0 text-[11px] text-record-muted"><span className="font-mono tabular-nums">{current?.count ?? totalEntries}</span> entries</span>
        <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-record-mark ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {/* The preview strip is a phone's affordance: a swipe rail of the subjects carrying
          something, so a thumb can see what is there without opening the index. A desk has
          the room to open the index itself and no thumb doing the swiping, so it gets the
          same line and the same sheet without a rail to drag. */}
      {!expanded && strip.length > 0 && (
        <div
          className="climate-nav-rail grid auto-cols-[33%] grid-flow-col border-b border-record-ink/20 overflow-x-auto lg:hidden"
          style={{ scrollSnapType: 'x proximity' }}
          aria-label="Subjects on the record"
        >
          {strip.map(subject => (
            <button
              key={subject.id}
              type="button"
              onClick={() => onSelect(subject.id)}
              aria-pressed={selected === subject.id}
              className={`snap-start flex min-h-[92px] min-w-0 flex-col items-center gap-1.5 border-b-2 px-1 pb-2 pt-2.5 text-center active:bg-record-paper ${selected === subject.id ? 'border-record-mark bg-cartoon-sun text-record-ink' : 'border-transparent text-record-ink'}`}
            >
              {/* A chosen subject wears the record's red rule under it as well as the sun
                  fill, so "here" is said the same way the masthead says it on the door you
                  are standing in — and the label is set at twelve rather than eleven, which
                  is the size at which a thumb-scrolled name stops being a caption. */}
              <SubjectMark subject={subject.id} size={34} active={selected === subject.id} />
              <span className="line-clamp-2 text-[12px] leading-[1.25]">{subject.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}