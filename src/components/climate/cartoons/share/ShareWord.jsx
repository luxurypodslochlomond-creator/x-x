import React from 'react';
import CopyLine from '@/components/climate/CopyLine';
import ShareTargets from '@/components/climate/cartoons/share/ShareTargets';

// One place's words: where they are going, the words themselves, and one button that takes
// them. The note under the heading is the reason the words are shaped that way, kept short
// so the page does not read as a manual.
export default function ShareWord({ where, note, text, subject }) {
  return (
    <section className="share-word mt-6 border-t border-record-ink/15 pt-4">
      <div className="flex items-start justify-between gap-3">
        <p className="share-word-label font-mono text-[10px] uppercase tracking-[0.22em] text-record-red">{where}</p>
        <CopyLine text={text} label="Copy" />
      </div>
      {note && <p className="share-word-note mt-1.5 text-[11.5px] leading-snug text-record-muted">{note}</p>}
      <p
        className="share-word-copy mt-2 whitespace-pre-line border-l-2 border-record-ink/15 pl-3 text-[13.5px] leading-relaxed text-record-ink/90 lg:text-[15px]"
        style={{ fontFamily: 'var(--font-reading)' }}
      >
        {text}
      </p>
      <ShareTargets text={text} subject={subject} />
    </section>
  );
}