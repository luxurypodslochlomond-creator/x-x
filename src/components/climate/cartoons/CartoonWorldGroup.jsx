import React from 'react';
import CartoonWorldList from '@/components/climate/cartoons/CartoonWorldList';

export default function CartoonWorldGroup({ group, children }) {
  return (
    <section className="cartoon-lineage-group" id={group.id} aria-labelledby={`${group.id}-title`}>
      <header className="cartoon-lineage-group-head">
        <span className="cartoon-lineage-number" aria-hidden="true">{group.number}</span>
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