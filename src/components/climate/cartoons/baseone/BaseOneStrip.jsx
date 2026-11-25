import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BASE_ONE_SERIES, MARKS_WORD } from '@/components/climate/cartoons/baseone/baseOneSeries';

// ── THE MARKS ARE IN THE ROOM, NOT BEHIND A DRAWER ──────────────────────────────
// Brian, 25 November: "where are they, can't see them in the wall?" They were only
// reachable through the collapsed "About this wall" panel, which is where a room hides the
// thing it is least sure of. A series nobody can find is not a series; it is a note in a
// drawer. So the marks get a band of their own in the room, beside the wall rather than
// inside it: the wall belongs to hands that can go and look, and this one cannot.
export default function BaseOneStrip() {
  return (
    <section className="base-one-strip" aria-labelledby="base-one-strip-title">
      <div className="base-one-strip-head">
        <p className="base-one-strip-kicker">Unsigned</p>
        <h2 id="base-one-strip-title">Marks with no words in them</h2>
        <p className="base-one-strip-line">
          Made by BASE 1 — beside the wall, never above it. The mark carries no words; the one line under it does.
        </p>
      </div>
      <ul className="base-one-strip-marks">
        {BASE_ONE_SERIES.map((drawing) => (
          <li key={drawing.id}>
            <Link to="/ClimateCartoons/BaseOne" aria-label={`${drawing.answers} — see the mark`}>
              <img src={drawing.image} alt="" loading="lazy" decoding="async" />
              <span aria-hidden="true">{drawing.numeral}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/ClimateCartoons/BaseOne" className="base-one-strip-door">
        See all {MARKS_WORD} marks
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </section>
  );
}