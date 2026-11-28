import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

// ── THE WALL, IN THE MIDDLE OF THE REPORT ────────────────────────────────────
// Brian, 28 November: "you sure page doesn't feel flat bro". It did, and he was right:
// ten numbered bands of prose and not one picture of the thing being described. A report
// about drawings that never shows a drawing is asking to be believed rather than checked.
//
// So three drawings from the wall stand here, credited, opening the wall itself. They are
// read from the record when the page opens, so a drawing added tonight appears here without
// anybody editing this file — and if the read fails the inset is simply absent rather than
// leaving three grey boxes where somebody's work should be.
export default function WorkPlates() {
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        // A filter with options comes back as a page, not an array — read its items, or the
        // inset silently never draws.
        const page = await base44.entities.ClimateCartoon.filter(
          { status: 'published' },
          { sort: '-created_date', limit: 12 }
        );
        const items = Array.isArray(page) ? page : page.items || [];
        const withPictures = items.filter((d) => d.image_url && d.artist_name).slice(0, 3);
        if (live) setDrawings(withPictures);
      } catch { /* no drawings, no inset — never three empty frames */ }
    })();
    return () => { live = false; };
  }, []);

  if (!drawings.length) return null;

  return (
    <section className="work-band work-band--plates">
      <p className="work-band-head">The wall, three drawings from it</p>
      <ul className="work-plates">
        {drawings.map((d) => (
          <li key={d.id}>
            <Link to="/ClimateCartoons" className="work-plate">
              <img src={d.image_url} alt={d.title ? `${d.title}, by ${d.artist_name}` : `A drawing by ${d.artist_name}`} loading="lazy" />
              <b>{d.artist_name}</b>
              {d.credit && <span>{d.credit}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <p className="work-band-note">
        Every drawing on the wall carries the hand that made it and the campaign it came from,
        and stays up after the exhibition comes down.
      </p>
    </section>
  );
}