import React from 'react';

// ── WHAT IS ACTUALLY BEING ASKED OF HER ────────────────────────────────────────
// Janine read the page and wrote back: "I do not understand what you are seeking to achieve
// here… I am hosting, but certainly not speaking for the hour." She was right to ask, and the
// fault was ours: the page listed an hour to the minute, which reads as a script handed to the
// host, and it never once said in a plain place what was hers to do and what was never ours to
// give. So this sits above the agenda, in three short lines, and it is deliberately small:
// hosting (already hers), one eight-minute block that somebody else speaks, and the guest
// list, which was always hers anyway. A page that needs a reply to explain itself has failed.
const ASKS = [
  {
    n: '1',
    head: 'Host it, as you already are',
    body: 'Open the hour in your own words and close it. You are not speaking for the sixty minutes, and nothing on this page asks you to: Francis and the panelists present their own cartoons, and that is the festival’s programme, not something we are filling in.',
  },
  {
    n: '2',
    head: 'Say yes or no to eight minutes',
    body: 'One block inside the hour you are hosting: what a record is for — one entry, its source, its seal. Somebody else speaks it, so the only thing being asked of you is eight minutes of the hour. Cut it, move it, or take it out entirely and the rest of this page still stands.',
  },
  {
    n: '3',
    head: 'Nothing else, and nothing today',
    body: 'Who sits on the panel, who draws, who is invited — yours. Gillian’s part is hers to agree to; we have not put words in her mouth here, and we will not.',
  },
];

export default function WhatIsAsked() {
  return (
    <section className="mt-5 border-2 border-record-ink/25 bg-record-bone/40">
      <div className="border-b border-record-ink/20 px-4 py-3 lg:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-record-red lg:text-[11px]">
          What we are seeking · three things, and nothing else
        </p>
        <h2
          className="mt-1 text-[19px] leading-tight lg:text-[26px]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          You are hosting. Nobody is asking you to speak for the hour.
        </h2>
      </div>

      <ol className="divide-y divide-record-ink/15">
        {ASKS.map(({ n, head, body }) => (
          <li key={n} className="grid grid-cols-[1.6rem_1fr] gap-3 px-4 py-3 lg:px-6">
            <span className="font-mono text-[13px] font-black leading-none text-record-red">{n}</span>
            <div>
              <h3 className="font-mono text-[11.5px] font-black uppercase leading-tight lg:text-[12.5px]">{head}</h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-record-ink/85 lg:text-[14px]">{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="border-t border-record-ink/20 px-4 py-3 text-[12.5px] leading-relaxed text-record-ink/85 lg:px-6 lg:text-[14px]">
        <span className="font-mono text-[10.5px] font-black uppercase tracking-[0.16em] text-record-red">The practice room · </span>
        half an hour beforehand, as Francis suggested: yes, gladly — send the time and we will be in it. Nothing to rehearse and no slides;
        only the drawing, checked once so it works on the day.
      </p>
    </section>
  );
}