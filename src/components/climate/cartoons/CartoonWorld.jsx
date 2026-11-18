import React from 'react';
import {
  CARTOONISTS, GALLERY_LINE, GALLERY_URL, ODOI_URL,
} from '@/components/climate/cartoons/cartoonWorld';
import '@/components/climate/cartoons/cartoon-world.css';

// ── THE TRADITION THIS ROOM JOINS ─────────────────────────────────────────────
// Sits after the wall and before the book: here is what has been drawn, and here is
// who was already drawing it, named, long before this record asked anyone for anything.
// Nothing below is a copy of anybody's work. The page points; the drawings stay with
// the people who made them.
export default function CartoonWorld() {
  return (
    <section className="cartoon-world" id="press-world" aria-labelledby="press-world-title">
      <p className="press-eyebrow">Already a world</p>
      <h2 className="cartoon-world-title" id="press-world-title">
        This was not a workshop’s idea.
      </h2>

      <p className="cartoon-world-line">
        Before this room asked anybody for a drawing, cartoonists from Khartoum to Nairobi
        were already doing the hardest part of this work: making people look at a thing they
        would rather not see. These are nine of them, named, with a line each from the
        source below. Their drawings are not reproduced here — the record points at them.
      </p>

      <ul className="cartoon-world-names">
        {CARTOONISTS.map((person) => (
          <li className="cartoon-world-name" key={person.name}>
            <p className="cartoon-world-who">
              {person.name}
              <span className="cartoon-world-where">{person.where}</span>
            </p>
            <p className="cartoon-world-say">{person.line}</p>
          </li>
        ))}
      </ul>

      <div className="cartoon-world-odoi">
        <h3 className="cartoon-world-odoi-title">
          Frank Odoi
          <span>Ghana, then Kenya · died 21 April 2012</span>
        </h3>
        <p>
          Born in the mining town of Tarkwa in western Ghana, he read a copy of the Nairobi
          humour magazine Joe, turned up in Kenya in the late 1970s to join it, and later
          took over from Terry Hirst as editorial cartoonist at the Daily Nation. He drew
          <em> Akokhan</em>, an African superhero whose powers come from where they come
          from, and <em>Golgoti</em>, an explorer story told from the other side. He was
          Cartoonist of the Year in Kenya in 1985, 1986 and 2004, and in Ghana in 2005, and
          he chaired Katuni, the East African association of cartoonists. He was killed in a
          matatu crash in Nairobi.
        </p>
        <p className="cartoon-world-quote">
          “Call it magic, but when you breath life into fantasy, it stops being magic…
          bringing fantasy and African roots-religion together gave me Akokhan.”
        </p>
      </div>

      <p className="cartoon-world-source">
        Read them at the origin:{' '}
        <a href={GALLERY_URL} target="_blank" rel="noopener noreferrer">{GALLERY_LINE}</a>
        {' '}— its pictures are credited to each cartoonist and to Cartoon Movement — and{' '}
        <a href={ODOI_URL} target="_blank" rel="noopener noreferrer">Frank Odoi on Wikipedia</a>,
        whose accounts disagree on the year he was born: the Daily Nation says 1947, he said
        1948. Only Africa is named above, because that is what the source covers; Asia and
        the rest of the world join this list the same way, one source at a time, and never by
        invention.
      </p>
    </section>
  );
}