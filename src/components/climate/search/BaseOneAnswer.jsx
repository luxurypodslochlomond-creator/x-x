import React from 'react';
import { Volume2, Square } from 'lucide-react';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';
import useSpeak from '@/components/climate/search/useSpeak';
import BaseOneSources from '@/components/climate/search/BaseOneSources';

// ── WHAT THE RECORD HOLDS, SAID ONCE ────────────────────────────────────────────
// A plate, not a chat bubble: the answer is printed on the sheet in the record's reading
// voice, its origin is cited underneath, and the thing it does NOT cover is said in the
// open at the same size — because "we don't hold that yet" is information, and the only
// dishonest answer is a confident one. The band at the foot reads it aloud if asked.
const CONFIDENCE = {
  high: { label: 'Official record', tone: 'text-[#1e3a2b]' },
  medium: { label: 'Corroborated', tone: 'text-record-ink' },
  low: { label: 'One source, or none named', tone: 'text-record-red' },
};

export default function BaseOneAnswer({ answer }) {
  const { chosen } = useSiteLanguage();
  const { speak, speaking, supported } = useSpeak(
    `${answer.summary} ${answer.gaps || ''}`.trim(),
    chosen || 'en',
  );
  const confidence = CONFIDENCE[answer.confidence_overall] || CONFIDENCE.low;

  return (
    <section aria-label="What the record holds" className="border-2 border-record-ink bg-record-paper">
      <div className="flex items-center justify-between gap-2 border-b-2 border-record-ink bg-cartoon-sun px-3 py-1.5">
        <span className="font-mono text-[8.5px] uppercase leading-tight tracking-[0.18em] text-record-ink">
          BASE 1 · what the record holds
        </span>
        <span className={`shrink-0 font-mono text-[8.5px] uppercase leading-tight tracking-[0.12em] ${confidence.tone}`}>
          {confidence.label}
        </span>
      </div>

      <p className="px-3.5 pt-3 text-[17px] leading-[1.45] text-record-ink" dir="auto" style={{ fontFamily: 'var(--font-reading)' }}>
        {answer.summary}
      </p>

      <BaseOneSources claims={answer.claims} />

      {answer.gaps && (
        <div className="border-t border-record-ink/20 bg-record-bone px-3.5 py-2.5">
          <p className="mb-1 font-mono text-[8.5px] uppercase tracking-[0.18em] text-record-red">
            What it does not cover
          </p>
          <p className="text-[12.5px] leading-relaxed text-record-ink/85" dir="auto">{answer.gaps}</p>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 border-t-2 border-record-ink bg-record-ink px-3 py-1.5">
        {supported ? (
          <button
            type="button"
            onClick={speak}
            className="inline-flex items-center gap-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-record-paper active:text-cartoon-sun"
          >
            {speaking ? <Square className="h-3 w-3" /> : <Volume2 className="h-3.5 w-3.5" />}
            {speaking ? 'Stop' : 'Hear it'}
          </button>
        ) : <span />}
        <span className="text-right font-mono text-[8px] uppercase leading-tight tracking-[0.12em] text-record-paper/60">
          Nothing added · nothing ranked
        </span>
      </div>
    </section>
  );
}