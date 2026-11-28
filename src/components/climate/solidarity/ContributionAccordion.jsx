import React, { useState } from 'react';
import ContributionRow from '@/components/climate/solidarity/ContributionRow';
import { CONTRIBUTIONS } from '@/components/climate/solidarity/contributions';
import '@/components/climate/solidarity/solidarity.css';

export default function ContributionAccordion({ onOffer }) {
  const [open, setOpen] = useState('artists');
  return <section id="ledger-ways" className="solidarity-section" aria-labelledby="stand-contribute">
    <p className="stand-kicker">The contribution is bigger than the payment</p>
    <h2 className="stand-section-title mt-2 mb-6" id="stand-contribute">What can you bring?</h2>
    <div className="solidarity-accordion">{CONTRIBUTIONS.map(item => <ContributionRow key={item.id} item={item} open={open === item.id} onToggle={() => setOpen(current => current === item.id ? null : item.id)} onOffer={onOffer} />)}</div>
  </section>;
}