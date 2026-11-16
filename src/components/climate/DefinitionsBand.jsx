import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DEFINITIONS } from './climateDefinitions';
import RecordSectionHeading from './RecordSectionHeading';

// ── DEFINITIONS ──
// Every term stands on its own card, and every card ends with the body that defined it —
// and the way to that body. A definition nobody can trace is just an opinion.

export default function DefinitionsBand({ heading }) {
  return (
    <section className="px-4 lg:px-10 pt-9 pb-7 lg:pt-12 lg:pb-11">
      <RecordSectionHeading title={heading} count={DEFINITIONS.length} tone="text-[#1e3a2b]" />
      <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-3">
        In the words of the body that defined them. Follow the source and read it there.
      </p>

      <div className="space-y-2.5 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3 lg:gap-4 md:space-y-0">
        {DEFINITIONS.map(d => (
          <div
            key={d.term}
            className={`bg-[#f7f1e5] border border-[#141210] p-4 flex flex-col ${
              d.tone === 'green' ? 'border-t-4 border-t-[#1e3a2b]' : 'border-t-4 border-t-[#e2602a]'
            }`}
          >
            <h3 className="text-[12px] font-black font-mono uppercase text-[#141210] mb-1">{d.term}</h3>
            <p className="text-[12px] font-mono text-[#141210] leading-relaxed">{d.text}</p>
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto pt-3 flex items-start gap-1.5 text-[10px] font-mono text-[#5a5246] hover:text-[#b3261e] transition-colors"
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