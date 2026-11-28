import React from 'react';
import { Link } from 'react-router-dom';
import { PARTNERS } from '@/components/climate/cartoons/plain/caibLines';
import '@/components/climate/cartoons/plain/caib-lockup.css';

// ── THE BIENNIAL'S OWN MARK, AND THE LINE ITS CHAIR ASKED FOR ──────────────────
// Francis sent the hi-res mark on 28 November, at 19:14, with one instruction in the same
// breath: don't forget to say CAIB is jointly powered by African Press Cartoon in
// association with two other founding/implementing partners.
//
// That instruction is a condition of the work being here, so it is printed with the mark
// and not buried in a footnote. The two partners are NOT named: Francis has not yet said
// who they are, and this record will not put a name on another body's programme from a
// guess. The gap is left open and said out loud, which is the only honest way to hold it.
//
// The mark is a programme's mark, not a drawing, so it does not hang on the wall among the
// hands. It sits at the head of the page that draws the CAIB line, and at the foot of the
// wall's credits — where a reader is told who the room stands on.
export default function CaibLockup({ showDoor = false }) {
  return (
    <figure className="caib-lockup">
      <img
        className="caib-lockup-mark"
        src={PARTNERS.logo}
        alt="CartoonAFRICA International Biennial, Nigeria: a globe with the map of Africa and a lit candle held in a hand."
        width="150"
        height="180"
        loading="lazy"
        decoding="async"
      />
      <figcaption className="caib-lockup-words">
        <p className="caib-lockup-head">{PARTNERS.head}</p>
        <p className="caib-lockup-line">{PARTNERS.line}</p>
        <p className="caib-lockup-note">{PARTNERS.note}</p>
        {showDoor && (
          <Link to="/ClimateCartoons/CAIB" className="caib-lockup-door">
            Where CAIB ends and this record begins
          </Link>
        )}
      </figcaption>
    </figure>
  );
}