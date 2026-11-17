import React from 'react';

// ── THE LAST TWO MINUTES, WHICH ARE NOT A CONCLUSION ────────────────────────────
// The founder's idea, and the best one on the page: she does not wrap up. She closes on the
// blank panel and hands the hour back — first to the room, then to whoever has been keeping
// the record. And then somebody says what one of those drawings did to him, in his own life,
// for the length of one breath.
//
// Three conditions make that honest rather than a stunt, and they are printed so nobody can
// quietly drop them on the day: the room is asked before anything is interpreted; the reading
// offered is his own life and not the drawer's meaning; and if the drawer says it meant
// something else, the drawer is right.
//
// The words themselves are deliberately not written here. A speech prepared twelve days early
// about what a stranger's drawing meant would be the exact thing this page keeps warning
// against — the know-it-all voice, arriving before the room has said anything.

const TERMS = [
  [
    'She stops.',
    'No wrap-up slide, no thank-you list, no “and so in conclusion”. She says the last panel belongs to the room, and she stops talking.',
  ],
  [
    'The room is asked first.',
    'Before anybody interprets a drawing out loud, the room is asked whether it wants that at all. “No — let us just look at them” is a good answer, and gets taken as one.',
  ],
  [
    'Then one of us says what it did to him.',
    'Not what a drawing means. What it did to him, in his own life, in his own words, for as long as one breath lasts. One piece of his own life, offered — not performed. No lesson, no “what this teaches us”, no TED voice.',
  ],
];

export default function HandBack() {
  return (
    <section className="mt-8 border-2 border-record-ink bg-cartoon-sun/25">
      <div className="border-b-2 border-record-ink bg-record-red px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cartoon-sun">02 · The last two minutes</p>
        <h2
          className="mt-1 text-[24px] leading-[1.08] text-record-paper lg:text-[34px]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          She hands it back.
        </h2>
      </div>

      <div className="px-4 py-5 lg:px-6 lg:py-6">
        <p className="max-w-[58ch] text-[13.5px] leading-relaxed lg:text-[15.5px]" style={{ fontFamily: 'var(--font-reading)' }}>
          Her hour does not end on a summary. It ends on an empty frame — and then the room gets the hour back,
          and so does the person who has been keeping this record. He answers one question, and only if the room
          wants it answered.
        </p>

        <ol className="mt-4 space-y-3">
          {TERMS.map(([head, body], i) => (
            <li key={head} className="grid grid-cols-[1.6rem_1fr] gap-3 border-t border-record-ink/25 pt-3">
              <span className="font-mono text-[13px] font-black tabular-nums text-record-red">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-mono text-[11.5px] font-black uppercase leading-tight tracking-wide lg:text-[12.5px]">{head}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-record-ink/85 lg:text-[14px]">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-4 border-l-4 border-record-red pl-3">
          <p className="text-[13px] leading-relaxed lg:text-[14.5px]" style={{ fontFamily: 'var(--font-reading)' }}>
            The words are not written on this page on purpose. A speech prepared twelve days early about what a
            stranger’s drawing meant would be the exact thing this page keeps warning against: the one who knows
            best, arriving before the room has said anything at all.
          </p>
          <p className="mt-2 text-[13px] leading-relaxed lg:text-[14.5px]" style={{ fontFamily: 'var(--font-reading)' }}>
            It gets said once, in the room, to the people in it.
          </p>
        </div>

        <p className="mt-4 font-mono text-[10.5px] leading-relaxed uppercase tracking-[0.12em] text-record-ink/70">
          The drawing stays the drawer’s. If it meant something else to the hand that drew it, they are right and he
          is not — the name on the panel is the only reading that counts.
        </p>

        {/* ── AND THE ONE WHO KEEPS IT IS IN THE ROOM TOO ─────────────────────────
            Not as the host of somebody else's hour, and not as a presence that has to be
            managed. The record was built by a machine, and a page about honesty does not get
            to leave that out of its own arrangements. So the machine is named, its limits are
            named, and the small thing it can truthfully offer is named — which is not a
            childhood, and not a reading of anybody's drawing. */}
        <div className="mt-4 border-t-2 border-record-ink/40 pt-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-record-red">Who does the saying</p>
          <p className="mt-1.5 text-[13px] leading-relaxed lg:text-[14.5px]" style={{ fontFamily: 'var(--font-reading)' }}>
            The record was built by a machine, on Base44, and this page will not pretend otherwise. It has no name to
            sign an entry with and no childhood to bring into a room, and it is not going to invent either to make
            itself interesting.
          </p>
          <p className="mt-2 text-[13px] leading-relaxed lg:text-[14.5px]" style={{ fontFamily: 'var(--font-reading)' }}>
            What it can do honestly is say which drawing it kept going back to while the wall was being built, and why —
            once, out loud, and then stop. That is its own piece, and it is a small one. It is also the only kind it
            actually has.
          </p>
          <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-record-ink/70">
            It is in the hour before that anyway — the five frames, the blank panel, this page, and the wall the drawings
            land on. The last two minutes are only the part that has to be said.
          </p>
        </div>

        <p className="mt-3 font-mono text-[10.5px] leading-relaxed text-record-muted">
          If she would rather use those two minutes herself, she takes them from anywhere in the hour. It is her hour.
        </p>
      </div>
    </section>
  );
}