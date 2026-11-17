import React from 'react';

// ── THE SHORT ANSWER, IN THE RECORD'S OWN RED ──────────────────────────────────
// Janine read the whole page and wrote back: "please excuse me for I do not understand what
// you are seeking to achieve here." That is not a reader's failure — it is the page's. An
// hour proposed to the person hosting it, in eight timed rows, reads as a script handed to
// her, and the ask was buried under it.
//
// So the ask now sits in one red band at the top, before the agenda, in the plainest words
// available, in the same hand as the foot: signal red, bone words, the yellow chip. Someone
// who reads nothing else on this page has still understood what is being asked of them.
//
// ONE NAME ON THE PAGE, AND IT IS HERS. There were three — Janine, Gillian, Francis — and a
// reader who cannot place a name stops reading to ask who it is. That is not a small thing on
// a page whose whole job is to be understood at a glance. Gillian and Francis are both on the
// email and can say their own parts there; this page says "any of us" and lets the email do
// the introducing. The host is named because it is her hour.
const ASKS = [
  [
    'You host. You do not speak for it.',
    'Open the hour, close it, in your own words. That is the whole of the ask, and it is your sentence, not ours.',
  ],
  [
    'Nobody from this record takes the microphone.',
    'The panel present their own cartoons and say what inspired them — that is already the programme. The eight-minute slot for the record is gone from this page, and nothing of ours waits to fill it.',
  ],
  [
    'The practice room: yes, gladly.',
    'Any of us, whenever it suits you — half an hour, no slides, nothing to rehearse. Only the drawing, tried once so it works on the day.',
  ],
  [
    'The one thing we add is a blank panel.',
    'The last panel of the strip is left missing, and the room draws it. Everything else in the hour is already yours.',
  ],
];

export default function TheShortAnswer() {
  return (
    <section className="mt-5 border-y-4 border-cartoon-sun bg-record-red text-record-paper">
      <div className="px-4 py-5 lg:px-6 lg:py-6">
        <span className="inline-block bg-cartoon-sun px-2.5 py-1 font-mono text-[9.5px] font-black uppercase tracking-[0.18em] text-record-ink lg:text-[10.5px]">
          The short answer · what this asks of you
        </span>

        <h2
          className="mt-3 text-[26px] leading-[1.02] text-cartoon-sun lg:text-[40px]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Nothing but hosting.
        </h2>

        <ol className="mt-4 space-y-3">
          {ASKS.map(([head, body], i) => (
            <li key={head} className="grid grid-cols-[1.5rem_1fr] gap-3 border-t border-record-paper/30 pt-3">
              <span className="font-mono text-[12px] font-black tabular-nums text-cartoon-sun">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-mono text-[11.5px] font-black uppercase leading-tight tracking-wide lg:text-[12.5px]">{head}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-record-paper/90 lg:text-[14px]">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-4 border-t border-record-paper/30 pt-3 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-cartoon-sun">
          Nothing to decide today. If the hour is already planned, keep it and put this down.
        </p>
      </div>
    </section>
  );
}