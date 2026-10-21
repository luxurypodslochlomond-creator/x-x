import React from 'react';
import RecordSectionHeading from '@/components/climate/RecordSectionHeading';

const PRINCIPLES = [
  { number: '01', title: 'Human worth, not audience size.', text: 'A person’s worth, and a place’s need, cannot be measured by popularity. x = x is a commitment to equal dignity. It does not mean every claim is equally true.' },
  { number: '02', title: 'Evidence, not applause.', text: 'Explore solutions, crises and actions by topic and place. Follow source links and judge the evidence. Reader numbers do not establish truth; featured entries are selections, not measures of human importance.' },
  { number: '03', title: 'Usefulness, not capture.', text: 'Read without an account. No advertisements, public like counts or follower counts on this record. The purpose is to find something useful, share what can help, and act beyond the screen.' },
];

export default function XEqualsXPrinciples() {
  return (
    <section aria-labelledby="record-principles" className="pb-6 border-b-2 border-[#141210]">
      <RecordSectionHeading eyebrow="What x = x means here" title="A record. Not a contest." />
      <div className="space-y-2.5">
        {PRINCIPLES.map(({ number, title, text }) => (
          <div key={number} className="bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#1e3a2b] p-4">
            <div className="flex items-baseline gap-2">
              <span aria-hidden="true" className="font-mono text-[10px] font-black text-[#e2602a]">{number}</span>
              <h3 className="text-[12px] font-black font-mono uppercase text-[#141210] leading-tight">{title}</h3>
            </div>
            <p className="text-[12px] font-mono text-[#141210] leading-relaxed mt-2">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}