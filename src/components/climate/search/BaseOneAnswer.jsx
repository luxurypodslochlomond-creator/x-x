import React from 'react';
import { Volume2, Square } from 'lucide-react';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';
import useSpeak from '@/components/climate/search/useSpeak';
import BaseOneSources from '@/components/climate/search/BaseOneSources';

const CONFIDENCE = {
  high: 'Official record',
  medium: 'Corroborated',
  low: 'One source, or none named',
};

export default function BaseOneAnswer({ answer }) {
  const { chosen } = useSiteLanguage();
  const { speak, speaking, supported } = useSpeak(`${answer.summary} ${answer.gaps || ''}`.trim(), chosen || 'en');
  return (
    <section aria-label="What the record holds" className="border-t-4 border-cartoon-sun py-5 text-record-ink">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="base-one-label font-mono uppercase text-record-mark">BASE 1 · what the record holds</span>
        <span className="base-one-label font-mono uppercase text-record-ink">{CONFIDENCE[answer.confidence_overall] || CONFIDENCE.low}</span>
      </div>
      <p className="base-one-copy mt-5 font-mono" dir="auto">{answer.summary}</p>
      <BaseOneSources claims={answer.claims} />
      {answer.gaps && (
        <div className="mt-5 border-t border-record-ink/20 pt-4">
          <p className="base-one-label font-mono uppercase mb-2 text-record-mark">What it does not cover</p>
          <p className="font-mono text-sm leading-relaxed" dir="auto">{answer.gaps}</p>
        </div>
      )}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-record-ink/20 pt-3">
        {supported ? (
          <button type="button" onClick={speak} className="base-one-label font-mono uppercase inline-flex min-h-11 items-center gap-2 text-record-mark hover:text-record-ink">
            {speaking ? <Square className="h-3 w-3" /> : <Volume2 className="h-3.5 w-3.5" />}
            {speaking ? 'Stop' : 'Hear it'}
          </button>
        ) : <span />}
        <span className="base-one-label font-mono uppercase text-record-muted">Nothing added · nothing ranked</span>
      </div>
    </section>
  );
}