import React from 'react';
import { Link } from 'react-router-dom';
import CopyLine from '@/components/climate/CopyLine';
import { recordAddress } from '@/components/climate/recordAddress';

// ── THE TWO MINUTES, WRITTEN OUT ───────────────────────────────────────────────
// Janine's draft agenda gives Brian a two-minute introduction to the platform, and names
// exactly what it should cover: "specifically where people can add examples of crises and
// solutions, and then on to the cartoons."
//
// That is a small, precise ask, and it is the only part of the hour that belongs to the
// record. So it is written down here rather than left to be improvised in front of a room
// that includes a research institute: two minutes is about 260 words, and the one thing
// that must survive the two minutes is the address where somebody can put something on.
//
// The door is a real link, not an instruction to go hunting: /TogetherChangeClimate?submit=1
// opens the form straight away — the same deep link that was built so a walkthrough could
// point at the exact place an initiative is added.

// ── IT WAS A TOUR OF A FORM, IN A ROOM OF CARTOONISTS ─────────────────────────
// Brian, 26 November, three days out: "you sure this isn't wrong would be better to have
// cartoons etc up and talk about artist etc and also talk about why world needs x=x? why we
// need product demo and live putting cartoons up isn't waste of time and wee tech fanny boy?"
//
// He is right, and the old script is the evidence. It spent its middle on the mechanics of a
// form — press Add, two doors, paste the link, here is what happens next — which is a
// walkthrough, and a walkthrough in front of a biennial of cartoonists says the software is
// the subject. It is not. The drawings are the subject, and the only thing the record has to
// offer them is that they outlive the wall they are hung on.
//
// So the two minutes are about them and the reason; the address is one line near the end
// rather than the middle; and the form is not described at all. Nobody in that room needs to
// know what the form looks like. They need to know their drawing will still be reachable when
// the exhibition comes down, with their name on it, and that nobody can sell it.
//
// One thing kept honest: a drawing sent in during the hour arrives as a draft and waits for a
// person. So nothing here promises a drawing will appear on screen the second it is sent. If
// somebody is at the desk it clears in a minute; if nobody is, it clears afterwards and the
// room hears how many came in. Never a promise the desk cannot keep.
const SCRIPT = [
  'Thank you, Janine. And thank you, Francis — fourteen years of these drawings, and this room is the proof of it.',
  'I have two minutes, so I will spend them on one thing. A drawing in this room is a true thing said sideways. It goes up on a wall, it is seen by the people who came, and then the exhibition comes down.',
  'That is the whole reason this record exists. x = x is a public record of the climate — solutions, crises and actions, each one dated, sourced and signed by whoever put it there. Nothing sold, nothing ranked. No line of it can be bought, and none of it comes down when the walls do.',
  'And the drawings have their own room in it. Each one carries the hand that drew it, where it came from, and the drawer’s own line on what it is for. Free to see, free to copy, and it stays theirs — the record never sells it and never ranks it.',
  'If you want to put something on — a drawing, or something you know is working where you live — the address is on the screen now. No account, no password. One link and a paragraph is enough, and a person reads it before it goes up.',
  'That is all I have. Francis — the drawings.',
];

const JOBS = [
  ['Two minutes, on the platform', 'The script above. What the record is, what the drawings get from it, and the address — then stop and hand back to Francis. No walkthrough of the form.'],
  ['Drawings sent in during the hour', 'They arrive as drafts and wait for a person. Whoever is at the desk clears them, and the room is told at the end how many came in. Never promise a drawing will appear the moment it is sent.'],
  ['Showing CEEW’s cartoons as Alina speaks', 'Have the drawings open and ready before she starts, and show each one as she names it, not after.'],
  ['Screen shared for the questions', 'Francis, Janine and Brian share the screen while Janine takes the room.'],
  ['Closing remarks, if called on', 'Janine invites Francis and Brian to add a few words at the end. Short.'],
];

const DOOR = '/TogetherChangeClimate?submit=1';

export default function BrianTwoMinutes() {
  return (
    <section className="mt-8 border-2 border-record-ink">
      <div className="bg-record-ink px-4 py-3">
        <p className="font-mono text-[9.5px] font-black uppercase tracking-[0.2em] text-cartoon-sun">
          03 · Brian’s two minutes · a draft answer to her draft
        </p>
        <h2 className="mt-1 text-[20px] leading-tight text-record-paper lg:text-[26px]" style={{ fontFamily: 'var(--font-display)' }}>
          Two minutes, and the address
        </h2>
      </div>

      <div className="px-4 py-4">
        <p className="text-[12.5px] leading-relaxed text-record-ink/85 lg:text-[13.5px]">
          Her <strong>draft</strong> agenda asks for two minutes on the platform — <em>specifically where people can add
          examples of crises and solutions</em> — and then on to the cartoons. Written out below so it is two minutes
          and not four, and so it can be cut the moment she changes her draft.
        </p>

        {/* ── THE ONE JUDGEMENT, SAID RATHER THAN HIDDEN ──────────────────────────
            Her draft asks specifically WHERE people can add. This keeps the address and
            drops the walkthrough of the form, which is a judgement made in her hour and
            therefore hers to overturn. Saying so here is the difference between a draft
            answer and a decision taken on somebody else's behalf. */}
        <p className="mt-2 text-[12.5px] leading-relaxed text-record-ink/85 lg:text-[13.5px]">
          One judgement is flagged rather than hidden: her draft asks <em>where</em> people can add, and this keeps the
          address but drops the walkthrough of the form — on the argument that a room of cartoonists needs the reason
          more than the buttons. If she wants the walkthrough, it is two sentences and it goes straight back in.
        </p>

        <div className="mt-4 border-l-2 border-record-red pl-3">
          {SCRIPT.map((line, i) => (
            <p
              key={i}
              className="mb-2.5 text-[14px] leading-relaxed text-record-ink lg:text-[16px]"
              style={{ fontFamily: 'var(--font-reading)' }}
            >
              {line}
            </p>
          ))}
        </div>

        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-record-muted">
          About 200 words · two minutes at a calm pace, with room to breathe
        </p>

        <div className="mt-4 border border-record-ink/25 bg-record-bone/60 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-record-red">The door, on the screen</p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-record-ink/85">
            Opens the form straight away, on either door — a solution or a crisis. No account needed.
          </p>
          <div className="mt-2 flex items-center gap-2 border border-record-ink/20 bg-record-paper px-2 py-1.5">
            <code className="min-w-0 flex-1 truncate font-mono text-[11px] text-record-ink">{recordAddress(DOOR)}</code>
            <CopyLine text={recordAddress(DOOR)} label="Copy link" />
          </div>
          <Link
            to={DOOR}
            className="mt-2 inline-flex min-h-[40px] items-center justify-center border-2 border-record-ink px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide"
          >
            Open the form, as they will see it
          </Link>
        </div>

        <dl className="mt-4 space-y-2">
          {JOBS.map(([term, line]) => (
            <div key={term} className="border-t border-record-ink/15 pt-2">
              <dt className="font-mono text-[10px] font-black uppercase tracking-wide text-record-ink">{term}</dt>
              <dd className="mt-0.5 text-[12.5px] leading-relaxed text-record-ink/85">{line}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-3 font-mono text-[10px] leading-relaxed text-record-muted">
          If her draft changes, this follows her draft — not the other way round.
        </p>
      </div>
    </section>
  );
}