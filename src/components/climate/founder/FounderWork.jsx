import React from 'react';

// ── WHAT SHE BUILT, ON ONE PAINTED REGISTER ─────────────────────────────────────
// These four were four separate dark slabs with a copy of the same painting in each, so the
// page read as the same rectangle printed four times and her work read as four cards. They
// are one register now, printed on the painting: a number, the thing, and what it actually
// was. The facts are hers and are unchanged — the only thing that changed is that they are
// set as a record rather than as a portfolio.
const WORK = [
  {
    number: '01',
    title: 'Horizon International',
    body: 'Founder of Horizon International, at Yale University and formerly a Guest of Harvard University. For forty years it worked to find and advance solutions to the interrelated concerns of global health, environment, and poverty.',
  },
  {
    number: '02',
    title: 'Two books · 75 experts',
    body: 'She conceived and was Editor of two books, with original chapters written by 75 experts, published by Wiley-Blackwell with Horizon International: Water and Sanitation-Related Diseases and the Environment — Challenges, Interventions, and Preventive Measures, and Water and Sanitation-Related Diseases and the Changing Environment — Challenges, Interventions, and Preventive Measures. The Late Dr. Paul Farmer, University Professor at Harvard and Co-Founder of Partners In Health, wrote the Foreword.',
  },
  {
    number: '03',
    title: 'Twenty documentaries',
    body: 'Under her direction as Executive Producer, Producer, and Director, Horizon International produced 20 television documentaries — many addressing climate change, from the loss of coral reefs to sustainable energy. Swedish, German, Chinese, and Mexican TV stations were among the co-producers. Lynn Redgrave, Raso Ouedraogo, Johan Forssblad, and Sam Waterston were among the hosts and narrators.',
  },
  {
    number: '04',
    title: 'What others credit her with',
    body: 'National Science Foundation PI for a grant on oceans. Collaborator with several UN entities. Lecturer at Harvard, Yale, Tufts, and Johns Hopkins. Speaker at the World Bank, for the Government of Pakistan, and for the Princess Chulabhorn conference in Thailand. Cancer research at Tufts New-England Medical Center. The UN attributed her and her Horizon team with advancing shea butter production and use by women and children. IUCN, WWF, and the government of Peru attributed her with helping save the vicuña. Horizon International endorsed the One Health Initiative in 2013 — medicine, veterinary science and the environment working as one — joining more than 700 scientists and physicians worldwide. Fellow Emeritus of the Explorers Club, 1996.',
  },
];

export default function FounderWork() {
  return (
    <section className="record-founder-work" aria-labelledby="founder-work">
      <div className="record-founder-work-inner">
        <p className="record-founder-kicker record-founder-kicker-light">The work · forty years of it</p>
        <h2 id="founder-work" className="record-founder-work-title">She did not write about it.<br />She did it.</h2>
        <ol className="record-founder-register">
          {WORK.map(({ number, title, body }) => (
            <li key={number}>
              <span aria-hidden="true" className="record-founder-register-number">{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}