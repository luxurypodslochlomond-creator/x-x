import React from 'react';
import RecordSectionHeading from '@/components/climate/RecordSectionHeading';

// How an entry gets on the record — the five rules, in the order they happen.
// These are the actual fields a reader finds on an entry: a source, a review, a level of
// certainty, a signature, and a place for a correction to stand beside the original.

const RULES = [
  {
    n: '01',
    title: 'It carries its origin',
    text: 'Who says so, and a link to where they said it. An entry with no link to its origin waits for a person to find one — or is left out.',
  },
  {
    n: '02',
    title: 'A person reads it before it goes up',
    text: 'Everything sent in arrives as a draft. A keeper reads it, and publishes or leaves it out. Nothing reaches the record because a machine liked it.',
  },
  {
    n: '03',
    title: 'How well it is known is written on it',
    text: 'One source, corroborated, or official record. It stays at one source until a second, independent origin is actually named — because that is the honest answer.',
  },
  {
    n: '04',
    title: 'It shows who signed it',
    text: 'The name of the person who put it on the record, in the open, so a reader can hold someone to it. If no one has, the entry says unsigned — a machine has no name to sign with.',
  },
  {
    n: '05',
    title: 'It can be corrected in daylight',
    text: 'A correction stands beside the original with the date it was made. Nothing is quietly fixed, and nothing is deleted to make the record look better.',
  },
];

export default function XEqualsXRule() {
  return (
    <section aria-labelledby="the-rules" className="py-7 border-b-2 border-[#141210]">
      <RecordSectionHeading eyebrow="Every entry, every time" title="How an entry gets on the record." count="05" />

      <div className="mt-1">
        {RULES.map(({ n, title, text }) => (
          <div key={n} className="grid grid-cols-[26px_1fr] gap-x-1 border-t border-[#141210]/25 pt-3 pb-4">
            <p className="font-mono text-[11px] font-black text-[#e2602a]">{n}</p>
            <div>
              <p className="font-mono text-[9.5px] font-black uppercase tracking-[0.18em] text-[#141210]">{title}</p>
              <p className="mt-1.5 font-mono text-[11.5px] leading-relaxed text-[#141210]">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2 border-t-2 border-[#141210] pt-4 font-mono text-[11.5px] leading-relaxed text-[#141210]">
        And the person who sent something in stays theirs: an address given to the record is kept
        so the record can answer them, and is never published, never sold, and never handed to
        another reader.
      </p>
    </section>
  );
}