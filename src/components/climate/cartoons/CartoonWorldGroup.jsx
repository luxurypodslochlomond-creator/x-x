import React from 'react';
import CartoonWorldList from '@/components/climate/cartoons/CartoonWorldList';

export default function CartoonWorldGroup({ group, children }) {
  return (
    <section className="cartoon-lineage-group" id={group.id} aria-labelledby={`${group.id}-title`}>
      {/* ── NO NUMERALS ON THIS SHELF ────────────────────────────────────────────
          The chapters were stamped 00, 01, 02, 03 in red at the size of a headline, and
          Brian, 20 November, saw exactly what that does: "why are they numbered after 00
          feels like we are giving more kudos to one over the other." A number is a rank,
          whether or not one is meant, and a shelf of cartoonists is not a chart. The kicker
          above each title already names the chapter, so nothing is lost by taking the
          number off. */}
      <header className="cartoon-lineage-group-head">
        <div>
          <p className="cartoon-lineage-kicker">{group.kicker}</p>
          <h3 id={`${group.id}-title`}>{group.title}</h3>
          <p className="cartoon-lineage-intro">{group.introduction}</p>
        </div>
      </header>
      <CartoonWorldList people={group.people} />
      {children}
    </section>
  );
}