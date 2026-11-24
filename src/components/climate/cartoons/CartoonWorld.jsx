import React from 'react';
import { CARTOONISTS, GALLERY_URL } from '@/components/climate/cartoons/cartoonWorld';
import { WORLD_LINEAGE } from '@/components/climate/cartoons/cartoonWorldLineage';
import CartoonWorldGroup from '@/components/climate/cartoons/CartoonWorldGroup';
import CartoonWorldList from '@/components/climate/cartoons/CartoonWorldList';
import CartoonOdoiNote from '@/components/climate/cartoons/CartoonOdoiNote';
import CartoonFirstHands from '@/components/climate/cartoons/CartoonFirstHands';
import '@/components/climate/cartoons/cartoon-world.css';

export default function CartoonWorld() {
  const archive = CARTOONISTS.map((person) => ({ ...person, source: 'The Guardian · 8 September 2015', source_url: GALLERY_URL }));
  return (
    <section className="cartoon-world cartoon-lineage" id="press-world" aria-labelledby="press-world-title">
      <header className="cartoon-lineage-heading">
        <p className="cartoon-lineage-kicker">A world of dissent · past &amp; present</p>
        <h2 className="cartoon-lineage-title" id="press-world-title">Draw the line.</h2>
        <p>Cartoonists have been making power visible for generations. Across borders, in newspapers, on walls and through independent presses. This room starts by knowing whose work came before it, and who is drawing now.</p>
        <nav className="cartoon-lineage-jumps" aria-label="Explore cartooning traditions">
          {WORLD_LINEAGE.map((group) => <a key={group.id} href={`#${group.id}`}>{group.kicker} ↓</a>)}
        </nav>
      </header>
      <div className="cartoon-lineage-body">
        {WORLD_LINEAGE.map((group) => (
          <CartoonWorldGroup key={group.id} group={group}>
            {group.id === 'cartoon-present' && (
              <details className="cartoon-lineage-archive">
                <summary>From the African press · nine voices documented in 2015</summary>
                <p className="cartoon-lineage-intro">The Guardian’s 2015 gallery is kept as a dated source, not a current directory of jobs, addresses or political conditions. These voices remain part of this room’s reading list.</p>
                <CartoonWorldList people={archive} />
              </details>
            )}
            {group.id === 'cartoon-inheritance' && <CartoonOdoiNote />}
          </CartoonWorldGroup>
        ))}
        {/* ── THE DEAD MAY BE PRINTED, THE LIVING MUST BE ASKED ────────────────
            Brian, 24 November: "are we allowed visually to have something coolasfuck
            beside each of them?" The answer splits cleanly, and the split is the
            point rather than a legal technicality: five makers above are out of
            copyright and are printed here with their credit and a link to the file
            page; every living hand on the shelf is named and not reproduced. */}
        <CartoonFirstHands />
        <p className="cartoon-lineage-note">An editorial reading list, not a ranking, membership list or endorsement. These are different political traditions, not a claim that every artist is a climate campaigner. Summaries are this record’s; the linked sources let you check them. No artwork by anyone on this reading list is reproduced here: the only pictures printed in this room are out of copyright, and each one says so. Sources checked 20 November 2026. Some external archives contain adult or distressing material.</p>
        {/* ── ONE DOOR, AND IT IS INSIDE THE ROOM ─────────────────────────────
            This nav had three doors: the drawing desk, the map, and the method page. The two
            that left the room came off — Brian, 20 November: "can't have coolasfuck icons to
            other pages." A lineage that ends by pointing at the map has stopped being about
            the lineage. The one door left is the only one a reader of this section actually
            wants, and it was already the first. */}
        <nav className="cartoon-lineage-doors" aria-label="Take the idea into the room">
          <a href="#cartoon-your-turn">Add your drawing →</a>
        </nav>
      </div>
    </section>
  );
}