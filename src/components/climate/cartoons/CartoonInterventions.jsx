import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import '@/components/climate/cartoons/cartoon-interventions.css';

// ── THE INTERVENTION ────────────────────────────────────────────────────────────
// The biennial's theme is "collective actions and creative interventions", and a room
// that only displays drawings has answered half of it. So this plate says what this
// record thinks an intervention is, and then proves it with the one thing on the page
// that is not finished: an empty panel.
//
// The empty panel is the whole idea, and it is ours. Every other comic in the world is
// complete before you arrive. This one is printed with a hole in it, the hole is
// numbered, and the hole is the point — the drawing that goes in it comes from the
// room, at the workshop, by hand. Nothing here imitates anybody: the digital layer is
// a printer's proof sheet, because that is what this plate actually is.
export default function CartoonInterventions() {
  return (
    <section className="comic-interventions" aria-labelledby="cartoon-interventions-title">
      <h2 id="cartoon-interventions-title" className="comic-section-title">Creative intervention</h2>

      <div className="comic-intervention-body">
        <div className="comic-intervention-words">
          <p>
            An illustration decorates a page. An intervention changes what the person
            holding it does next. That is the only difference this room cares about.
          </p>
          <p>
            Every drawing here arrived with three things attached: the hand that made it,
            where it came from, and one line in the drawer’s own words. Nothing was
            corrected and nothing was tidied. The proof is part of the artwork, not a
            caption beneath it.
          </p>
          <p>
            So the last panel in this room is deliberately empty. It is printed blank for
            the 29th and filled in by whoever is in the room — pen, crayon, whatever is on
            the table.
          </p>
        </div>

        {/* ── PANEL THIRTEEN ──────────────────────────────────────────────────────
            A proof plate with nothing in it yet: crop marks, registration crosses, a
            dither screen, the panel number. The digital layer is doing a job here
            rather than decorating — it marks a space that is reserved for a hand. */}
        <figure className="comic-blank-panel">
          <span aria-hidden="true" className="comic-blank-crop comic-blank-crop--tl" />
          <span aria-hidden="true" className="comic-blank-crop comic-blank-crop--tr" />
          <span aria-hidden="true" className="comic-blank-crop comic-blank-crop--bl" />
          <span aria-hidden="true" className="comic-blank-crop comic-blank-crop--br" />
          <span aria-hidden="true" className="comic-blank-scan" />
          <figcaption>
            <span className="comic-blank-number">Panel 13</span>
            <span className="comic-blank-line">Reserved · drawn by hand on the 29th</span>
          </figcaption>
        </figure>
      </div>

      <div className="comic-intervention-links">
        <Link to="/ClimateWorkshop" className="comic-why-link">
          The workshop, the hour and the ask <ArrowUpRight size={15} />
        </Link>
        <a href="#cartoon-your-turn" className="comic-why-link">
          Send a drawing now <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}