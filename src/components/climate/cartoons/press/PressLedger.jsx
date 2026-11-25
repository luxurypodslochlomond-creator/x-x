import React from 'react';
import CartoonRoomNavigation from '@/components/climate/cartoons/CartoonRoomNavigation';

// ── THE LEDGER UNDER THE WALL ──────────────────────────────────────────────────
// Everything the doorway used to say, kept whole and moved to where it belongs: after the
// drawings. Who drew the first ones, whose permission they are shown with, and the twelve
// ways through the rest of the room.
//
// Nothing was cut and nothing was softened. The permission line matters most of all — a
// drawing by What On Earth!® at CEEW is on this wall because CEEW said yes, and that sentence
// is not decoration to be trimmed for coolness. It simply belongs beside the evidence, in the
// place a reader goes once a drawing has made them want to know where it came from, rather
// than standing in front of the drawings and asking to be read first.
export default function PressLedger() {
  return (
    <section className="press-ledger" aria-labelledby="press-ledger-title">
      <h2 id="press-ledger-title" className="press-ledger-title">
        Whose drawings these are, and whose permission
      </h2>
      <p className="press-scope">
        The climate, drawn. The cartoons chosen for the 29 November workshop, the people who
        made them, and a wall with room on it for yours.
      </p>
      <p className="press-scope">
        The wall opens with drawings by What On Earth!®, the cartoon series at CEEW — the
        Council on Energy, Environment and Water, in India — shown with their permission.
        Gathered for CartoonAFRICA, edited by Francis Umendu Odupute and Janine Selendy,
        catalogue prepared by African Press Cartoon Services.
      </p>
      <CartoonRoomNavigation />
    </section>
  );
}