import React from 'react';

// ── HER AGENDA, IN HER ORDER ───────────────────────────────────────────────────
// Janine sent a first draft on 23 November 2026 at 4:48pm, headed "Agenda draft for Zoom
// of November 29th"; Francis replied with his comments the next morning, and the corrected
// agenda came back on 24 November. This page had
// been carrying a 52-minute running order of our own invention, written on 16 November
// when nobody had seen hers. Two of the things it said are now flatly wrong:
//
//   "Nobody from this record takes the microphone." — She had already given Brian the
//   floor: two minutes to introduce the platform, and a place in the closing remarks.
//
//   "No slot, no slides, no eight minutes." — There is a slot. She wrote it.
//
// A page that tells the world one thing while the host has written another is the worst
// kind of error on a record about honesty, because it is only discovered by the person
// standing at the microphone. So the invented order is gone, and hers is here: her items,
// her order, marked where the item is somebody's job so nobody has to work it out live.
//
// ONE CORRECTION TO THIS FILE'S OWN CLAIM. It said her words were "quoted rather than
// paraphrased". They were not: her typos were tidied and her grammar set right, which is
// kind but is not a quotation, and a page that claims a quotation it has not made is
// exactly the fault this record exists to catch. The visible line above the list now says
// what is actually true — her order and her meaning, set for reading — and the claim of a
// word-for-word quotation is gone.
//
// It is a DRAFT, circulated for comment, and this page says so. She may cut it, reorder it
// or replace it, and if she does, hers wins and this page is corrected in the open.

const AGENDA = [
  {
    n: '01',
    head: 'Francis introduces Janine as host.',
    who: 'Francis',
    mine: false,
  },
  {
    n: '02',
    head: 'Janine thanks Francis, and tells how they met in Sweden.',
    body: 'Then her opening remarks: the conditions of climate change, leading into “Together we can change the course of climate change” — the importance of everyone becoming involved, with 5.8 billion smartphones, social media, and use of the web platform now in its testing stage.',
    who: 'Janine',
    mine: false,
  },
  {
    n: '03',
    head: 'Janine introduces Brian Hughes, who built the platform.',
    body: 'Brian gives a two-minute introduction to what the platform does — specifically where people can add examples of crises and solutions — and then on to the cartoons.',
    who: 'Janine → Brian · two minutes',
    mine: true,
  },
  {
    n: '04',
    head: 'Janine calls on Francis to introduce the cartoon artists.',
    body: 'Francis begins with one of his own, then cartoonists from Africa. Each speaks for a couple of minutes about their cartoon, what inspired it, and where it is exhibited. Brian presents each cartoon as its maker speaks, and the artist stays on the Zoom screen for part of the presentation.',
    who: 'Francis + the cartoonists · Brian presenting',
    mine: true,
  },
  {
    n: '05',
    head: 'Francis introduces Alina Sen of CEEW India.',
    body: 'Alina has five to seven minutes, the cartoons included, on CEEW and its cartoons. Brian posts each one as she talks about them.',
    who: 'Francis → Alina · five to seven minutes · Brian posting',
    mine: true,
  },
  {
    n: '06',
    head: 'Questions and comments from the audience.',
    body: 'At the end of the presentations, not after each speaker — that is her answer to the question CEEW asked. Francis, Brian and Janine share the screen as Janine takes the room.',
    who: 'all three, screen shared',
    mine: true,
  },
  {
    n: '07',
    head: 'Janine closes.',
    body: 'Remarks encouraging climate action and use of the platform — and she invites Francis and Brian to add any closing remarks.',
    who: 'Janine → Francis & Brian',
    mine: true,
  },
];

export default function JanineAgenda() {
  return (
    <section className="mt-8">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-record-red lg:text-[11px]">
        01 · The hour · her agenda
      </p>
      <h2 className="mt-1 text-[19px] leading-tight lg:text-[27px]" style={{ fontFamily: 'var(--font-display)' }}>
        Janine’s draft, in her order
      </h2>

      <p className="mt-2 max-w-[54ch] text-[13px] leading-relaxed text-record-ink/85 lg:text-[14.5px]" style={{ fontFamily: 'var(--font-reading)' }}>
        A first draft went to Francis on 23 November at 4:48pm, headed “Agenda draft for Zoom of November 29th”. He
        replied the next morning with his comments, and the corrected agenda followed on 24 November. Her items are
        printed here in her sequence, in her order and her meaning — set for reading rather than copied keystroke for
        keystroke, because a typo tidied is not a word changed. Where an item is somebody’s job, it says whose.
      </p>

      <ol className="mt-4 divide-y divide-record-ink/15 border-y border-record-ink/15">
        {AGENDA.map((item) => (
          <li
            key={item.n}
            className={`grid grid-cols-[2.2rem_1fr] gap-3 py-3 lg:grid-cols-[3rem_1fr] lg:py-4 ${item.mine ? 'bg-cartoon-sun/20 px-2' : ''}`}
          >
            <span className="font-mono text-[11px] font-bold tabular-nums text-record-red lg:text-[13px]">{item.n}</span>
            <div>
              <h3 className="text-[13.5px] font-black leading-snug lg:text-[15px]">{item.head}</h3>
              {item.body && (
                <p className="mt-1 text-[12.5px] leading-relaxed text-record-ink/85 lg:text-[14px]">{item.body}</p>
              )}
              <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-record-muted lg:text-[10.5px]">
                {item.who}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* ── THE TWO LINES AT THE TOP OF HER EMAIL THAT NOBODY READS ─────────────
          "Duration of the recorded Zoom meeting: 1 hour." Both halves matter. The hour is
          the budget every speaker is working to. And a recorded session is a fact about
          everyone whose face, voice or drawing is in it — most of all the artists who lent
          work to a room they were told was an online workshop. Said here rather than left
          to be discovered afterwards, which is the one thing a record about consent cannot do. */}
      <p className="mt-3 font-mono text-[10.5px] leading-relaxed text-record-muted">
        Two lines at the top of her email that are easy to miss and matter to everyone taking part: the session is
        recorded, and it runs one hour.
      </p>
      <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-record-muted">
        Her draft, not a settled order. If she cuts, moves or rewrites any of it, hers is the agenda and this page is
        corrected in the open rather than quietly brought into line.
      </p>
    </section>
  );
}