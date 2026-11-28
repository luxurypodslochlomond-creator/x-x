import React from 'react';
import { Link } from 'react-router-dom';

// ── 08 · WHAT IS NOT FINISHED · 09 · WHERE YOU COULD HELP ─────────────────────
// The ask is deliberately small and deliberately not money. Three things, all of which are
// introductions or a room rather than a cheque, because a record that starts by asking for
// money has told you what it is.
export default function WorkClose() {
  return (
    <>
      <section className="work-band">
        <p className="work-band-head"><span>08</span>What is not finished, said plainly</p>
        <p>
          Two of the tools on this record are still being built and say so on their own doors.
          The wall of drawings is open and waiting for the room on the twenty-ninth. The music
          room has tracks in it that are not published yet, so a reader who goes in finds it
          quiet. The record itself is in its first weeks of being read by people who are not us,
          which is the only test that matters and the one we cannot run ourselves.
        </p>
        <p>
          And there is a hill above Loch Lomond with an old coffin road running over it and a page
          for it, because a record of a place belongs in a record of a planet, and because the
          person who built this lives on it.
        </p>
      </section>

      <section className="work-band work-band--close">
        <p className="work-band-head"><span>09</span>Where you could help</p>
        <p className="work-band-note">Three things. None of them is money.</p>
        <ol className="work-ask">
          <li>
            <b>A room, on the twenty-ninth.</b> The wall of drawings is ready to be shown and the
            hour is written. A host who will put it in front of people is the whole ask for that day.
          </li>
          <li>
            <b>One introduction to one institution that publishes.</b> Not a funder. A body with a
            citation problem, who would test whether a sourced answer holds up at their scale. One
            introduction is worth more than a hundred conversations about what we might do.
          </li>
          <li>
            <b>One artist paid, once, in the open.</b> The first line on an empty ledger is the
            expensive one. It changes what every cartoonist after it can ask for, and it is printed
            the moment it happens.
          </li>
        </ol>
        <p>
          If none of that is useful, the honest answer is still useful, and the record has a place
          for it: open any page and say where it is wrong.
        </p>
        <p className="work-close-line">
          <Link to="/TogetherChangeClimate">Open the record</Link>
        </p>
      </section>

      <p className="work-mark">x = x</p>
    </>
  );
}