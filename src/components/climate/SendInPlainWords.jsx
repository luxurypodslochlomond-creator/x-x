import React from 'react';

// ── THE SAME FOUR FACTS IN LAGOS, MOSCOW AND SEOUL ────────────────────────────
// Brian, 26 November: "why custodians? what about people from North Korea, Nigeria…
// zero barriers". He is right about the barrier, and it was a word doing the blocking:
// every public door asked a reader to know what a custodian is before they could send
// anything. The role keeps its name inside the room where the work happens; the doors
// say "a person" and nothing else.
//
// The rest is the honest part, and it is written short on purpose. No account, any
// country, any tongue. A name and an email so the record can answer — the email is
// never printed. And one line that matters more than the other three: if giving your
// name could put you in danger, write "no name", and a person still reads it. That is
// true of the code — nothing checks the name — so it is safe to say, and it is the only
// promise this record can keep to somebody whose government is watching.
//
// Nothing here promises protection. A record that cannot hide a sender must not imply
// it can, so it says plainly what it does: it screens, a person reads, and it answers.
export default function SendInPlainWords() {
  return (
    <div className="mt-4 border-l-4 border-record-ink/40 pl-3">
      <p className="text-[12.5px] leading-[1.6] text-[#141210]">
        Anyone can send this, from any country, in any language. No account, no charge.
      </p>
      <p className="mt-1.5 text-[12px] leading-[1.6] text-[#5a5246]">
        A name and an email are asked for so the record can reply. Your email is never printed and never handed to a reader.
        If giving your name would put you at risk, write “no name” — a person still checks it.
      </p>
      <p className="mt-1.5 text-[11px] leading-[1.6] text-[#5a5246]">
        Sending something does not protect the sender. Send only what is safe for you to say.
      </p>
    </div>
  );
}