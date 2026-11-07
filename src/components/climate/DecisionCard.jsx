import React from 'react';
import { Check, ExternalLink, Hand } from 'lucide-react';

// One entry, as a keeper meets it: what is claimed, where it came from, and the two answers
// that exist. Nothing else on the card, because her whole job in this room is yes or not yet.
const TONE = {
  Solution: 'bg-[#1e3a2b] text-[#f4efe4]',
  Crisis: 'bg-[#b3261e] text-[#f4efe4]',
  Action: 'bg-[#e2602a] text-[#141210]',
  Wire: 'bg-[#141210] text-[#f4efe4]',
  Gathering: 'bg-[#1e3a2b] text-[#f4efe4]',
  Music: 'bg-[#6b6258] text-[#f4efe4]',
  Comment: 'bg-[#efe7d6] text-[#141210] border border-[#141210]',
};

export default function DecisionCard({ item, onDecide, busy }) {
  return (
    <article className="border border-[#141210]/25 bg-[#f7f1e5] mb-3">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#141210]/20">
        <span
          className={`text-[9px] font-black font-mono uppercase tracking-[0.14em] px-1.5 py-0.5 ${
            TONE[item.label] || 'bg-[#efe7d6] text-[#141210]'
          }`}
        >
          {item.label}
        </span>
      </div>

      <div className="px-3 py-3">
        <h3 className="text-[15px] font-semibold leading-snug text-[#141210]" style={{ fontFamily: 'var(--font-reading)' }}>{item.title}</h3>
        {item.body ? (
          <p className="text-[13.5px] leading-[1.6] text-[#3a342c] mt-1.5" style={{ fontFamily: 'var(--font-reading)' }}>{item.body}</p>
        ) : null}

        {item.source_url ? (
          <a
            href={item.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2.5 text-[11px] font-black font-mono text-[#1e3a2b] underline decoration-2 underline-offset-2"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Open the source
            {item.source_name ? <span className="font-normal text-[#5a5246]">· {item.source_name}</span> : null}
          </a>
        ) : (
          <p className="mt-2.5 text-[11px] font-mono text-[#b3261e]">
            {item.contact ? `Contact line given: ${item.contact}` : 'No link to an origin on this one.'}
          </p>
        )}

        {item.contact && item.source_url ? (
          <p className="mt-1.5 text-[11px] font-mono text-[#5a5246]">Contact line: {item.contact}</p>
        ) : null}

        {item.ai ? (
          <p className="mt-2.5 text-[11px] leading-snug text-[#6b5f4f] border-t border-[#141210]/12 pt-2" style={{ fontFamily: 'var(--font-reading)' }}>
            A note, not a decision: {item.ai}
          </p>
        ) : null}

        {/* What each of the two answers actually does, said beside the buttons rather than in a
            footnote under the whole queue — on a phone that footnote was never read, so a keeper
            was pressing the one irreversible answer without knowing what it did. */}
        <p className="mt-3 text-[10.5px] font-mono leading-snug text-[#5a5246]">
          <span className="font-black text-[#1e3a2b]">On the record</span> — it goes public, and it is sealed.{' '}
          <span className="font-black text-[#141210]">Not yet</span> — it waits. Nothing is lost.
        </p>
      </div>

      <div className="grid grid-cols-2 border-t border-[#141210]/25">
        <button
          onClick={() => onDecide(item, 'hold')}
          disabled={busy}
          className="flex items-center justify-center gap-1.5 min-h-[52px] px-2 py-3 text-[11px] font-black font-mono uppercase tracking-wide text-[#141210] border-r border-[#141210]/25 active:bg-[#141210]/10 disabled:opacity-40 transition-colors"
        >
          <Hand className="w-4 h-4" /> Not yet
        </button>
        <button
          onClick={() => onDecide(item, 'publish')}
          disabled={busy}
          className="flex items-center justify-center gap-1.5 min-h-[52px] px-2 py-3 text-[11px] font-black font-mono uppercase tracking-wide bg-[#1e3a2b] text-[#f4efe4] active:bg-[#141210] disabled:opacity-40 transition-colors"
        >
          <Check className="w-4 h-4" /> On the record
        </button>
      </div>
    </article>
  );
}