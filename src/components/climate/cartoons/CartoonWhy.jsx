import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCartoonShareCard, CARTOON_CARD } from '@/components/climate/cartoons/cartoonCard';

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
      <p className="record-meta comic-why-note">
        Drawn in the record’s own voice, and nothing here is sold, ranked or sponsored.
      </p>
      <div className="comic-share">
        <ShareCardButton
          entry={CARTOON_CARD}
          build={buildCartoonShareCard}
          label="Pass the cartoons on"
        />
        <p className="record-meta comic-share-note">
          One card: the cartoon, the reason, and the address. No tracking on it.
        </p>
      </div>
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