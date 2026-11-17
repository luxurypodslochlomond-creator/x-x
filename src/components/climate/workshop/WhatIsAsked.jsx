import React from 'react';

// ── WHAT THIS PAGE IS ──────────────────────────────────────────────────────────
// Janine read the page and wrote back asking what was being sought. The honest answer was:
// nothing that needed a decision. The page had listed an hour to the minute and carried an
// eight-minute slot for the record itself, which put somebody else's voice inside her hour.
// That slot is gone. What is left is a note she can read, cut or put down: she hosts, the
// panel present their own cartoons, the room draws, the record keeps the drawings.
const POINTS = [
  {
    n: '1',
    head: 'You are hosting, and that is all that is asked',
    body: 'Open the hour and close it, in your own words. Nothing here asks you to speak for the sixty minutes, and nobody from this record takes the microphone at any point — the panel present their own cartoons and that is the whole of the talking.',
  },
  {
    n: '2',
    head: 'Nothing to decide today',
    body: 'If you already have the hour planned, keep it and put this down. The page describes one way it could run; it is not a plan waiting on your yes.',
  },
  {
    n: '3',
    head: 'Who sits on the panel, and who is invited, is yours',
    body: 'Gillian’s part is hers to agree to. We have not put words in her mouth here, and we will not.',
  },
];

export default function WhatIsAsked() {
  return (
    <section className="mt-5 border-2 border-record-ink/25 bg-record-bone/40">
      <div className="border-b border-record-ink/20 px-4 py-3 lg:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-record-red lg:text-[11px]">
          What this page is · a note, not a script
        </p>
        <h2
          className="mt-1 text-[19px] leading-tight lg:text-[26px]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          You are hosting. Nobody is speaking for your hour.
        </h2>
      </div>

      <ol className="divide-y divide-record-ink/15">
        {POINTS.map(({ n, head, body }) => (
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