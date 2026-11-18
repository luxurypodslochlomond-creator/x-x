import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// ── WHY A CARTOON ROOM ON A CLIMATE RECORD ───────────────────────────────────
// The record's own answer, kept to three lines. Not a mission statement: a reader who has
// just laughed at a bird with a bicycle wheel is owed the reason it is here, and nothing
// more. The share card is set beside it, because this is the one page of the record that a
// teacher, a parent or a workshop host will want to send to somebody in one tap.
export default function CartoonWhy() {
  return (
    <section className="comic-why" aria-labelledby="cartoon-why-title">
      <h2 id="cartoon-why-title" className="comic-section-title">Why cartoons?</h2>
      <ul className="comic-why-list">
        <li>A cartoon can hold a hard idea without frightening the person holding it.</li>
        <li>Anyone can answer one with a pen. A child, a farmer, a grandmother.</li>
        <li>The record keeps the answers. Not the laughs count, not the followers — the drawings.</li>
      </ul>
      {/* The pass-it-on card lives at the top of the room now, beside the line that says what
          the room is — that is where a host decides to send the page to somebody. */}
      {/* The drawings are not a room beside the record: they stand on its map, where they
          were drawn. This is the door between the two, so a visitor from a newsroom or a
          festival can see the record carries the work rather than displaying it. */}
      <div className="comic-why-links">
        <Link to="/ClimateMap" className="comic-why-link">
          Where the drawings stand on the map <ArrowUpRight size={15} />
        </Link>
        <Link to="/ClimateMethod" className="comic-why-link">
          How the record checks things <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}