import React from 'react';

// ── THE SHORT ANSWER, IN THE RECORD'S OWN RED ──────────────────────────────────
// Janine read the whole page and wrote back that she could not tell what was being asked of
// her. Her sentence is not repeated here: it was written to one person and it belongs to her,
// and a record that keeps somebody's private email in its source is doing the thing this page
// had to be corrected for. What matters is that it was not a reader's failure — it was the
// page's. An hour proposed to the person hosting it, in eight timed rows, reads as a script
// handed to her, and the ask was buried under it.
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
  // ── THIS BAND USED TO TALK TO HER IN THE SECOND PERSON ──────────────────────
  // "You host, and the hour is yours to run" is a fair thing to say to Janine in a letter
  // and a strange thing to print on a page she may forward to CEEW, where "you" is suddenly
  // whoever opened the link. Brian, 25 November: "says 'your draft' when talking about Janine
  // in many places." It now speaks about her, in her name, so the page reads the same to her
  // and to the person she sends it to. The ask is unchanged; only the voice is.
  [
    'She hosts, and the hour is hers to run.',
    'She opens it, she closes it, and she takes the room for questions at the end. That is the whole of the ask, and it is her sentence, not ours.',
  ],
  // This said "nobody from this record takes the microphone", and it was wrong from the
  // moment her draft agenda arrived: she had already written Brian into the hour, for two
  // minutes, by name. Denying a slot the host has given you is the one error that gets found
  // out live, in front of the room. So it now says what her agenda says.
  [
    'Two minutes, then back to Francis.',
    'Her draft gives Brian two minutes on what the platform does and where anyone can add a crisis or a solution. That is the whole of the record’s speaking time in her hour — and it is her gift, not our assumption.',
  ],
  // The practice-room item came off on 25 November. It offered the host half an hour to try
  // "the drawing" once so it worked on the day — a rehearsal for an exercise her hour does not
  // contain, offered to the person running it. There is nothing to rehearse, so there was
  // nothing to offer, and a page that offers help nobody asked for is a page calling somebody
  // less capable than they are.
  // The blank panel was ours — a nineteen-minute drawing exercise inside an hour that her
  // agenda does not contain. Offering somebody's hour back to them with an activity added is
  // not a small liberty. What survives is the promise about afterwards, which is the part the
  // record can actually keep.
  [
    'A cartoonist’s drawing has somewhere to go.',
    'If one is sent in, it goes on the wall with the maker’s name and their own line about it, and their email is never shown. That is after the hour, and it takes nothing from it.',
  ],
];

export default function TheShortAnswer() {
  return (
    <section className="mt-5 border-y-4 border-cartoon-sun bg-record-red text-record-paper">
      <div className="px-4 py-5 lg:px-6 lg:py-6">
        <span className="inline-block bg-cartoon-sun px-2.5 py-1 font-mono text-[9.5px] font-black uppercase tracking-[0.18em] text-record-ink lg:text-[10.5px]">
          The short answer · what this asks of the host
        </span>

        <h2
          className="mt-3 text-[26px] leading-[1.02] text-cartoon-sun lg:text-[40px]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          The hour stays hers.
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