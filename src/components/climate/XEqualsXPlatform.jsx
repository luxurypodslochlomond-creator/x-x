import React from 'react';
import RecordSectionHeading from '@/components/climate/RecordSectionHeading';

// Why the mark is on the other pages too.
//
// x = x is not the climate record's logo: it is the rule the rest of the platform is held
// to, and each line below is something the built thing actually does. If a line here stops
// being true of a tool, the tool is what is wrong — not the line.

const TOOLS = [
  {
    name: 'SORTED',
    text: 'A threatening letter, read in plain English, with the one next thing to do. No account needed to start, and nothing sold to the person who is frightened.',
  },
  {
    name: 'Learn51',
    text: 'Free, no login, for every child. No advertising in a room built for children, and no account to make a parent buy one.',
  },
  {
    name: 'CB51',
    text: 'The artist’s own name stays on their own work. Nothing here is ranked by how many people are listening.',
  },
  {
    name: 'This record',
    text: 'No likes, no ranking, no adverts. Every entry carries who says so, and every correction is made where you can see it.',
  },
];

export default function XEqualsXPlatform() {
  return (
    <section aria-labelledby="why-here" className="py-7 border-b-2 border-[#141210]">
      <RecordSectionHeading eyebrow="The same rule, everywhere" title="Why it is on every page." />

      <p className="font-mono text-[12.5px] leading-relaxed text-[#141210]">
        x = x sits in the footer of everything we have built, including this record, because it
        is the rule each of those things is held to. Not a badge, and not decoration.
      </p>

      <div className="mt-4 space-y-2.5">
        {TOOLS.map(({ name, text }) => (
          <div key={name} className="bg-[#f7f1e5] border-2 border-[#141210] p-4">
            <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-[#141210]">{name}</h3>
            <p className="mt-1.5 font-mono text-[11.5px] leading-relaxed text-[#141210]">{text}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 font-mono text-[10.5px] leading-relaxed text-[#6b6258]">
        If one of those lines stops being true of one of those tools, the tool is wrong. Say so
        — the corrections page is open to anyone, and it is read.
      </p>
    </section>
  );
}