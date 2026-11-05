import React from 'react';
import CopyLine from '@/components/climate/CopyLine';

// ── THE LETTER, WRITTEN TO BE SIGNED ──────────────────────────────────────────
// Janine is unwell and writing to an institution she is asking a favour of. So this
// is short, warm, and says the two things a university needs before it will answer:
// what this is, and what is actually being asked for. It claims no agreement, no
// funding, and no endorsement. It names the company that built it and states plainly
// that the record is offered to a host rather than sold to one.
//
// She will change it. It is a draft in her voice, not a speech put in her mouth:
// every fact in it is one this record can stand behind if a lawyer reads the letter.

export const LETTER_BODY = `Dear [name],

For forty years I have worked on the connection between the health of the environment and the health of people. Horizon International has published the solutions that work for a long time. What has been missing is a way to carry them that does not depend on one organisation, one funder, or one person's energy.

Together We Can Change the Course of Climate Change is that attempt. It is a public record, not a feed. Every entry names where it came from and says how well it is known. Anyone can send one in, in any language, without an account. Nothing is ranked, nothing is advertised, and nothing can be paid into a better position. It was built by Universal Frequency 51 CIC, a community interest company, at no cost to me, and it is offered to a host rather than sold to one.

I am writing to ask whether Yale would be willing to consider carrying it. The hosting is modest. The part that matters is the people: a record of this kind lives or dies on whether somebody independent reads an entry and signs their name to what they found. That is the part I cannot build. It is the part a university can.

I am not asking for an answer now. I am asking for a conversation, and for somebody to read the method page before the front page, because the method is where this record either holds or it does not. A short brief is attached, and I would rather be told plainly that it is not a fit than be encouraged politely.

With every good wish,

Janine M. H. Selendy
Founder, Horizon International`;

export default function YaleLetter() {
  return (
    <div className="border-2 border-[#141210] bg-[#f7f1e5] p-4 lg:p-6 mt-3">
      <div className="flex items-center justify-between gap-3 mb-3 border-b border-[#141210]/20 pb-2">
        <span className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#5a5246]">
          Draft for Janine to change and sign
        </span>
        <CopyLine text={LETTER_BODY} label="Copy letter" />
      </div>
      <div className="space-y-3 text-[12px] lg:text-[13px] font-mono leading-relaxed lg:leading-[1.8] text-[#141210] whitespace-pre-line">
        {LETTER_BODY}
      </div>
      <p className="text-[10.5px] font-mono leading-relaxed text-[#5a5246] mt-4 pt-3 border-t border-[#141210]/15">
        Two things in it are hers alone to decide: whether her name goes on the record as its keeper, and
        whether she wants her illness mentioned at all. Neither is written here. Both are better unsaid in a
        first letter than guessed at.
      </p>
    </div>
  );
}