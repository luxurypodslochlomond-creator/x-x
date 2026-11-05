import React from 'react';
import CopyLine from '@/components/climate/CopyLine';

// ── THE LETTER, WRITTEN IN THE SHAPE A UNIVERSITY EXPECTS ────────────────────
// A letter to a place like Yale has a known anatomy: who it is from and their company
// number, a date, a named recipient, a Re: line that says what it is and what is being
// asked in one breath, then body, then a numbered ask, then enclosures, then a signature
// block. Every one of those parts is here.
//
// Two things in it are deliberately general, and Janine must make them specific before
// it is sent: the recipient's name, and her own account of her life's work. Her actual
// record — what she published, where, and when — is hers and is not invented here.

export const LETTER_HEAD = `UNIVERSAL FREQUENCY 51 CIC
Together We Can Change the Course of Climate Change
Community Interest Company, registered in Scotland, SC870603

[date]

[recipient name]
[department]
Yale University`;

export const LETTER_SUBJECT =
  'Re: A public record of the climate solutions that work, offered to a host, and a request for the people to check it';

export const LETTER_BODY = `Dear [name],

I founded Horizon International to publish what is working on this planet and what is being lost, without flattery. That work has always depended on the energy of a small number of people, and on being believed because of who was saying it rather than because anyone could check it.

That is the problem I have spent the last while trying to solve, and I would like to put the result in front of you.

Together We Can Change the Course of Climate Change is a public record, not a feed. Every entry names where it came from and states how well it is known. Nothing is ranked, nothing is advertised, and nothing can be paid into a better position. It needs no account to read, in any language, on any phone. It was built by a community interest company, at no cost to me, and it is offered to a host rather than sold to one.

Three things about it are unusual enough to be worth your time.

The first is that every published entry carries a fingerprint of its own words. Anyone can recompute it in their own browser and see whether the text has moved since it was sealed. If an entry is changed quietly, the record says so about itself, in public. A correction is a new link in a chain, never an overwrite.

The second is that it says how well each entry is known, on the face of it and before the headline: one origin, two independent origins, or an official record. It will not print the middle one without a second origin actually named, which is why most of the record currently reads single source. That is the honest answer rather than a shortfall in the code.

The third is what it does not have. It has no independent checking yet. The office exists, the method is written, and nobody has yet signed a verdict in it. Nineteen published entries are a demonstration of a method, not a body of evidence.

That is the whole reason I am writing. The machinery is built. What it needs is people: someone independent who reads an entry, follows its source, and puts their name to what they found. I cannot build that. A university can.

So I am asking three things of Yale, in the order that matters to me.

First, a named academic sponsor who will read the method and say in public whether it holds. Not an endorsement of anything on the record: a verdict on how it is made. If it does not hold, that verdict should be published too.

Second, a checker corps with one named lead: students, perhaps, in a department that already teaches this.

Third, consideration of carrying it: the hosting, which is modest at one thousand pounds a year at its present size, the technology that will need building and maintaining, and a fair living for the two people in Scotland who build it and would go on building it. A record nobody can afford to tend is not a record that lasts.

I am not asking for an answer now. I am asking for a conversation, and for somebody to read the method page before the front page, because the method is where this either stands or it does not.

The record is enclosed in outline, with the figures counted from it this week and a plain list of what is still missing before it could be launched properly. I would rather be told plainly that it is not a fit than be encouraged politely.

With every good wish,

Janine M. H. Selendy
Founder, Horizon International

Encl. — the record in outline; the method page; the address of every page named`;

export const LETTER_FULL = `${LETTER_HEAD}\n\n${LETTER_SUBJECT}\n\n${LETTER_BODY}`;

export default function YaleLetter() {
  return (
    <div className="border-2 border-[#141210] bg-[#f7f1e5] mt-3">
      <div className="flex items-center justify-between gap-3 px-4 lg:px-5 py-2.5 border-b border-[#141210]/20">
        <span className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#5a5246]">
          Draft for Janine to change and sign
        </span>
        <CopyLine text={LETTER_FULL} label="Copy whole letter" />
      </div>

      <div className="px-4 lg:px-6 py-4 lg:py-6">
        <p className="text-[9.5px] font-mono uppercase tracking-[0.14em] leading-relaxed text-[#5a5246] whitespace-pre-line mb-4">
          {LETTER_HEAD}
        </p>

        <p className="text-[11px] lg:text-[12px] font-mono font-bold text-[#141210] leading-snug mb-4 pb-3 border-b border-[#141210]/20">
          {LETTER_SUBJECT}
        </p>

        <div className="space-y-3 text-[12px] lg:text-[13px] font-mono leading-relaxed lg:leading-[1.8] text-[#141210] whitespace-pre-line">
          {LETTER_BODY}
        </div>
      </div>

      <div className="px-4 lg:px-6 py-3 border-t border-[#141210]/20">
        <p className="text-[10.5px] font-mono leading-relaxed text-[#5a5246]">
          Two things are hers alone to fill: the recipient's name, and her own account of her work. Nothing
          biographical has been invented here — the record does not know what she published, where, or when, and
          a letter that guessed at a life's work would be the first thing Yale checked.
        </p>
      </div>
    </div>
  );
}