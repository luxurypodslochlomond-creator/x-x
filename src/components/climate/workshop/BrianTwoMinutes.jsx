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

const SCRIPT = [
  'Thank you, Janine — and thank you, Francis.',
  'This is a public record of climate solutions and climate crises. Two kinds of entry, and nothing else: something that is working and can be copied, or something happening now that the world needs to see.',
  'Every entry names who says so and links to where it started. Nothing goes on without a source. There is no advertising and no sponsorship, so nobody can buy a place on it. And every entry is fingerprinted, so a quiet edit shows up in public.',
  'But the thing I actually want you to leave with is where the button is.',
  'Go to the record — the address is on the screen now. Press “Add” and you get one form with two doors: a solution, or a crisis. No account, no password. Paste the link you got it from, say what happened in your own words, and send it. If the source opens, it goes on the record straight away. If it does not, it waits for a person to look at it — which is the only reason anything is ever held back.',
  'That is the whole ask. If you know something that is working, or something that is happening, put it on. One link and a paragraph is enough.',
  'And now — the cartoons, which is what we are really here for.',
];

const JOBS = [
  ['Two minutes, on the platform', 'The script above. Where to add a crisis and where to add a solution — then stop and hand back to Francis.'],
  ['Posting CEEW’s cartoons as Alina speaks', 'Have the drawings open and ready before she starts, and post each one as she names it, not after.'],
  ['Screen shared for the questions', 'Francis, Janine and Brian share the screen while Janine takes the room.'],
  ['Closing remarks, if called on', 'She invites Francis and Brian to add a few words at the end. Short.'],
];

const DOOR = '/TogetherChangeClimate?submit=1';

export default function BrianTwoMinutes() {
  return (
    <section className="mt-8 border-2 border-record-ink">
      <div className="bg-record-ink px-4 py-3">
        <p className="font-mono text-[9.5px] font-black uppercase tracking-[0.2em] text-cartoon-sun">
          03 · Brian’s two minutes · as she set it
        </p>
        <h2 className="mt-1 text-[20px] leading-tight text-record-paper lg:text-[26px]" style={{ fontFamily: 'var(--font-display)' }}>
          Two minutes, and the address
        </h2>
      </div>

      <div className="px-4 py-4">
        <p className="text-[12.5px] leading-relaxed text-record-ink/85 lg:text-[13.5px]">
          Her agenda asks for two minutes on what the platform does — <em>specifically where people can add examples
          of crises and solutions</em> — and then on to the cartoons. Written out below, so it is two minutes and not
          four, and so the one line that matters cannot be lost on the day.
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
          About 260 words · roughly two minutes at a calm pace
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