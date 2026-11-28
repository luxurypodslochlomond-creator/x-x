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
    body: 'Founder, Chair and Publisher of Horizon International, at Yale University, working across global health, environment and poverty.',
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
    body: 'Her biography records UNDP and UNIFEM credit for the team’s work on women’s shea-butter production, and her role in protecting the vicuña.',
  },
];

export default function FounderWork() {
  return (
    <section className="record-founder-work" aria-labelledby="founder-work">
      <div className="record-founder-work-inner">
        <p className="record-founder-kicker record-founder-kicker-light">Her work · forty years</p>
        <h2 id="founder-work" className="record-founder-work-title">Research. Film. Action.</h2>
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
          <p>Principal investigator on a National Science Foundation planning grant for Horizon’s oceans and coral reefs programme. Lecturer at Harvard, Yale, Johns Hopkins and Tufts, for USAID in Pakistan, and for a Princess Chulabhorn science conference in Thailand. Participant in forums at the World Bank and the UN.</p>
          <p>Fellow National Emeritus of the Explorers Club, 1996. Horizon International endorsed the One Health Initiative.</p>
          <p>The two books, in full: <em>Water and Sanitation-Related Diseases and the Environment</em>, and <em>Water and Sanitation-Related Diseases and the Changing Environment</em> — Challenges, Interventions, and Preventive Measures. Lynn Redgrave, Raso Ouedrago, Johan Forssblad and Sam Waterston were among the hosts and narrators of the films.</p>
          <a href="https://www.solutions-site.org/node/1089" target="_blank" rel="noopener noreferrer">Source: Horizon International’s biography ↗<span className="sr-only"> (opens a new tab)</span></a>
        </details>
      </div>
    </section>
  );
}