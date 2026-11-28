import React from 'react';

// The biographical claims below are attributed to Horizon's own published account.
const WORK = [
  { number: 'Conservation', title: 'Evidence taken to CITES.', body: 'Horizon’s biography records that Selendy presented film evidence on the vicuña at CITES on behalf of the Peruvian government, WWF and IUCN, supporting live shearing and protection rather than killing.' },
  { number: '1992', title: 'Before the Rio Earth Summit.', body: 'She brought together and co-chaired a group of 30 experts with Dr. Nay Htun. Horizon’s account says its Harvard–Yale problem-solving programme informed his work on Agenda 21 and the later Solutions Site.' },
  { number: '2002', title: 'Against going to war with Iraq.', body: 'As a Democratic candidate for the US House of Representatives, she spoke against going to war with Iraq and for universal health care, as recorded in her biography.' },
  { number: '2011 · 2019', title: 'Water, disease and prevention.', body: 'She conceived and edited two books with work by 75 international experts, published by Wiley-Blackwell with Horizon International. Dr. Paul Farmer wrote the foreword. Water, sanitation and disease prevention are central to that work.' },
];

export default function FounderWork() {
  return (
    <section className="record-founder-work" aria-labelledby="founder-work">
      <div className="record-founder-work-inner">
        <p className="record-founder-kicker record-founder-kicker-light">Her work · Horizon International’s account</p>
        <h2 id="founder-work" className="record-founder-work-title">A lifetime in defence of life.</h2>
        <ol className="record-founder-register">
          {WORK.map(({ number, title, body }) => (
            <li key={number}>
              <span aria-hidden="true" className="record-founder-register-number">{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <a className="record-founder-work-source" href="https://www.solutions-site.org/node/1089" target="_blank" rel="noopener noreferrer">Read Horizon International’s biography ↗</a>
        <details className="record-founder-more">
          <summary>The rest of the record of her work</summary>
          <p>Under her direction as executive producer, producer and director, Horizon produced 20 television documentaries. Principal investigator on a National Science Foundation planning grant for Horizon’s oceans and coral reefs programme. Lecturer at Harvard, Yale, Johns Hopkins and Tufts, for USAID in Pakistan, and for a Princess Chulabhorn science conference in Thailand. Participant in forums at the World Bank and the UN.</p>
          <p>Fellow National Emeritus of the Explorers Club, 1996. Horizon International endorsed the One Health Initiative.</p>
          <p>The two books, in full: <em>Water and Sanitation-Related Diseases and the Environment</em>, and <em>Water and Sanitation-Related Diseases and the Changing Environment</em> — Challenges, Interventions, and Preventive Measures. Lynn Redgrave, Raso Ouedrago, Johan Forssblad and Sam Waterston were among the hosts and narrators of the films.</p>
          <a href="https://www.solutions-site.org/node/1089" target="_blank" rel="noopener noreferrer">Source: Horizon International’s biography ↗<span className="sr-only"> (opens a new tab)</span></a>
        </details>
      </div>
    </section>
  );
}