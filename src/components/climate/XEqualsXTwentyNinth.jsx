import React from 'react';
import { Link } from 'react-router-dom';
import { CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';

// ── THE ONE DATE THIS PAGE HAS TO CARRY ────────────────────────────────────────
// Brian, 27 November: "if you were me, with the 29th approaching, what would you want to
// see us saying and doing?" The answer is not a countdown and not a poster. It is the date,
// what actually happens on it, and the one thing a reader can do before it arrives: send a
// drawing. A workshop page that says "join us" and nothing else asks a stranger to turn up
// to an hour they know nothing about.
//
// The facts come from the room's own file, never typed twice, so this band and the wall can
// never disagree about the hour.
export default function XEqualsXTwentyNinth() {
  return (
    <section className="covenant-ninth" aria-labelledby="the-twenty-ninth">
      <div className="covenant-ninth-inner">
        <p className="covenant-kicker">Sunday 29 November</p>
        <h2 id="the-twenty-ninth">The room opens on Sunday.</h2>
        <p>{CARTOON_EVENT.workshop} · one hour, online. The wall is already open, and every drawing on it carries the name of the hand that made it.</p>
        <p className="covenant-ninth-ask"><strong>A drawing sent before Sunday goes up with the artist’s name on it.</strong> A workshop is better with work on the wall that nobody in the room has seen yet.</p>
        <div className="covenant-ninth-links">
          <Link to="/ClimateCartoons">The wall →</Link>
          <Link to="/ClimateWorkshop">The hour, written down →</Link>
        </div>
      </div>
    </section>
  );
}