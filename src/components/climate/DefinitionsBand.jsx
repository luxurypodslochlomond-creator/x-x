import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DEFINITIONS } from '@/components/climate/climateDefinitions';
import { RECORD_KINDS } from '@/components/climate/recordKindWords';
import RecordSectionHeading from '@/components/climate/RecordSectionHeading';

// ── DEFINITIONS ──
// Every term stands on its own card, and every card ends with the body that defined it —
// and the way to that body. A definition nobody can trace is just an opinion.
//
// ── AND THE THREE THAT WERE NEVER DEFINED AT ALL ──────────────────────────────
// Brian, 26 November: "what [difference] between action and solution — look [the] same
// to me in places." They looked the same because nothing on the record had ever said
// what separated them: this band quoted Geodesign and Blue Carbon while leaving its own
// three working words unexplained. They come first now, and the band says plainly that
// they are the record's own rather than somebody's, because that is the one promise
// this section makes and it should not be broken quietly.

export default function DefinitionsBand({ heading }) {
  return (
    <section className="px-4 lg:px-10 pt-9 pb-7 lg:pt-12 lg:pb-11">
      <RecordSectionHeading title={heading} count={DEFINITIONS.length + RECORD_KINDS.length} tone="text-[#1e3a2b]" />

      <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-3">
        The three words the record uses for everything on it. These are its own — not quoted from anybody, because
        nobody else uses them this way.
      </p>

      <div className="space-y-2.5 md:grid md:grid-cols-3 md:gap-3 lg:gap-4 md:space-y-0">
        {RECORD_KINDS.map((k) => (
          <div
            key={k.word}
            className={`flex flex-col border border-record-ink/30 border-t-4 bg-record-paper p-4 ${k.rule}`}
          >
            <h3 className={`mb-2 font-display text-lg font-bold uppercase leading-tight ${k.tone}`}>{k.word}</h3>
            <p className="record-meta record-definition-copy font-body text-record-ink">{k.text}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-[11px] font-mono text-[#5a5246] leading-relaxed mb-3">
        Below: terms in the words of the body that defined them. Follow the source and read it there.
      </p>

      <div className="space-y-2.5 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3 lg:gap-4 md:space-y-0">
        {DEFINITIONS.map(d => (
          <div
            key={d.term}
            className={`flex flex-col border border-record-ink/30 border-t-4 bg-record-paper p-4 ${d.tone === 'green' ? 'border-t-record-signal' : 'border-t-record-red'}`}
          >
            <h3 className="mb-2 font-display text-lg font-bold uppercase leading-tight text-record-ink">{d.term}</h3>
            <p className="record-meta record-definition-copy font-body text-record-ink">{d.text}</p>
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-start gap-1.5 pt-4 font-body text-xs leading-relaxed text-record-muted transition-colors hover:text-record-red"
            >
              <span className="underline decoration-dotted underline-offset-2">Source: {d.source}</span>
              <ArrowUpRight className="w-3 h-3 flex-shrink-0 mt-[1px]" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}