import React from 'react';

const PRINCIPLES = [
  { number: '01', title: 'Human worth, not audience size.', text: 'A person’s worth, and a place’s need, cannot be measured by popularity. x = x is a commitment to equal dignity. It does not mean every claim is equally true.' },
  { number: '02', title: 'Evidence, not applause.', text: 'Explore solutions, crises and actions by topic and place. Follow source links and judge the evidence. Reader numbers do not establish truth; featured entries are selections, not measures of human importance.' },
  { number: '03', title: 'Usefulness, not capture.', text: 'Read without an account. No advertisements, public like counts or follower counts on this record. The purpose is to find something useful, share what can help, and act beyond the screen.' },
];

export default function XEqualsXPrinciples() {
  return (
    <section aria-labelledby="record-principles" className="space-y-5">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-record-red">What that means here</p>
      <h2 id="record-principles" className="font-display text-3xl font-bold uppercase leading-tight">A record. Not a contest.</h2>
      <ol className="divide-y divide-record-ink/20 border-y border-record-ink/20">
        {PRINCIPLES.map(({ number, title, text }) => (
          <li key={number} className="grid grid-cols-[2rem_1fr] gap-3 py-5">
            <span aria-hidden="true" className="pt-1 font-mono text-xs font-bold text-record-red">{number}</span>
            <div className="space-y-2">
              <h3 className="text-lg font-bold leading-snug">{title}</h3>
              <p className="text-base leading-relaxed text-record-muted">{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}