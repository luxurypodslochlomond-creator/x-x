import React from 'react';

// ── FORTY YEARS, ONE LINE EACH ─────────────────────────────────────────────────
// The old page printed four long paragraphs of credits, which is why it read as a CV and
// scrolled like one. What matters to a reader meeting her for the first time is the shape of
// the work, so each entry is one line, and the full list is still here — folded into the
// details at the foot for anyone who wants it. Nothing has been dropped; it has been put
// where a reader can choose it.
const WORK = [
  {
    number: '01',
    title: 'Horizon International',
    body: 'Founded at Yale University, formerly a Guest of Harvard: forty years finding and advancing solutions where global health, the environment and poverty meet.',
  },
  {
    number: '02',
    title: 'Two books · 75 experts',
    body: 'Conceived and edited by her, with original chapters by 75 experts, published by Wiley-Blackwell. Paul Farmer wrote the foreword.',
  },
  {
    number: '03',
    title: 'Twenty documentaries',
    body: 'Executive Producer, Producer and Director — from the loss of coral reefs to sustainable energy, co-produced with Swedish, German, Chinese and Mexican television.',
  },
  {
    number: '04',
    title: 'What others credit her with',
    body: 'The UN credited her and her Horizon team with advancing shea butter production and use by women and children. IUCN, WWF and the Government of Peru credited her with helping save the vicuña.',
  },
];

export default function FounderWork() {
  return (
    <section className="record-founder-work" aria-labelledby="founder-work">
      <div className="record-founder-work-inner">
        <p className="record-founder-kicker record-founder-kicker-light">Forty years · the work</p>
        <h2 id="founder-work" className="record-founder-work-title">She did not write<br />about it. She did it.</h2>
        <ol className="record-founder-register">
          {WORK.map(({ number, title, body }) => (
            <li key={number}>
              <span aria-hidden="true" className="record-founder-register-number">{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <details className="record-founder-more">
          <summary>The rest of the record of her work</summary>
          <p>National Science Foundation PI for a grant on oceans. Collaborator with several UN entities. Lecturer at Harvard, Yale, Tufts and Johns Hopkins. Speaker at the World Bank, for the Government of Pakistan, and for the Princess Chulabhorn conference in Thailand. Cancer research at Tufts New-England Medical Center.</p>
          <p>Horizon International endorsed the One Health Initiative in 2013 — medicine, veterinary science and the environment working as one — joining more than 700 scientists and physicians worldwide. Fellow Emeritus of the Explorers Club, 1996.</p>
          <p>The two books, in full: <em>Water and Sanitation-Related Diseases and the Environment</em>, and <em>Water and Sanitation-Related Diseases and the Changing Environment</em> — Challenges, Interventions, and Preventive Measures. Lynn Redgrave, Raso Ouedraogo, Johan Forssblad and Sam Waterston were among the hosts and narrators of the films.</p>
          <a href="https://www.solutions-site.org" target="_blank" rel="noopener noreferrer">Her work in full, on her own site ↗<span className="sr-only"> (opens a new tab)</span></a>
        </details>
      </div>
    </section>
  );
}