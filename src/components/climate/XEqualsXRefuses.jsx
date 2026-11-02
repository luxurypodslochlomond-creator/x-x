import React from 'react';
import RecordSectionHeading from '@/components/climate/RecordSectionHeading';

// What the record refuses, stated as three plain facts about how the site behaves.
// Each of these is true of the built thing, not an aspiration: there is no sign-up wall,
// no advertising code, and no public count anywhere on the record.

const REFUSALS = [
  {
    n: '01',
    title: 'No sign-up wall',
    text: 'Every entry can be read without an account, an email address or a password. Nothing on the record asks who you are before it will tell you something.',
  },
  {
    n: '02',
    title: 'No advertising',
    text: 'No adverts, no sponsored placement, no paid links. Nothing on the record is arranged to keep you here longer than the thing you came to read.',
  },
  {
    n: '03',
    title: 'No ranking by audience',
    text: 'No public like counts, no follower counts, no leaderboard. The order of entries is a person’s choice of order — never a score, and never something an entry can earn.',
  },
];

export default function XEqualsXRefuses() {
  return (
    <section aria-labelledby="refuses" className="py-7 border-b-2 border-[#141210]">
      <RecordSectionHeading eyebrow="Kept, not promised" title="What the record refuses." count="03" />

      <div className="space-y-2.5">
        {REFUSALS.map(({ n, title, text }) => (
          <div key={n} className="bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#141210] p-4">
            <div className="flex items-baseline gap-2">
              <span aria-hidden="true" className="font-mono text-[10px] font-black text-[#e2602a]">{n}</span>
              <h3 className="font-mono text-[12px] font-black uppercase leading-tight text-[#141210]">{title}</h3>
            </div>
            <p className="mt-2 font-mono text-[12px] leading-relaxed text-[#141210]">{text}</p>
          </div>
        ))}
      </div>

      <p className="mt-3 font-mono text-[10.5px] leading-relaxed text-[#6b6258]">
        Three refusals, and they cost the record reach. That is the trade it makes.
      </p>
    </section>
  );
}