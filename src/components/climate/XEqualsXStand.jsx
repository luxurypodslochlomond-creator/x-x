import React from 'react';

// ── THE WORLD WE ARE IN, SAID WITHOUT A LECTURE ────────────────────────────────
// Brian, 27 November: no named individual. He is right — the page does not need a person's
// case to make this argument, and naming one makes a shared problem look like one company's
// fault. So the section points at what everybody already knows, and cites three bodies
// nobody can wave away: the climate scientists, the World Health Organization, and the US
// Surgeon General. Three links, checked, and nothing more — an activist does not need a
// bibliography, they need to know the ground is solid.
const FACTS = [
  {
    title: 'The climate is warming because of us.',
    body: 'The IPCC’s own summary is blunt: human influence has warmed the atmosphere, ocean and land.',
    source: 'IPCC · Climate Change 2021',
    href: 'https://www.ipcc.ch/report/ar6/wg1/resources/spm-headline-statements/',
  },
  {
    title: 'The air alone kills millions a year.',
    body: 'The World Health Organization puts outdoor and household air pollution together at 6.7 million premature deaths a year.',
    source: 'World Health Organization',
    href: 'https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health',
  },
  {
    title: 'The feed is built to hold children.',
    body: 'The US Surgeon General issued an advisory on social media and young people’s mental health, because the evidence warranted one.',
    source: 'US Surgeon General · 2023',
    href: 'https://www.hhs.gov/surgeongeneral/reports-and-publications/youth-mental-health/social-media/index.html',
  },
];

export default function XEqualsXStand() {
  return (
    <section className="covenant-world" aria-labelledby="the-world">
      <p className="covenant-kicker">The world we are in</p>
      <h2 id="the-world">The planet is not short of information.<br />It is short of a record.</h2>
      <ul className="covenant-world-lines">
        <li>
          <strong>Every big platform runs on the same trade.</strong>
          Attention sold to advertisers. The longer you stay, the more it earns — so the feed shows what holds you, not what helps you.
        </li>
        <li>
          <strong>So the work goes missing.</strong>
          A crisis becomes a clip. A working solution is gone by Thursday. The people best placed to act never see what already exists.
        </li>
        <li>
          <strong>Extraction is not only of forests and water.</strong>
          It is of attention, of evidence, and of the time people need to act on either. The planet is not losing for lack of facts. It is losing because the facts do not reach the people with the power to move.
        </li>
      </ul>
      <aside className="covenant-case" aria-label="Three sources you can check yourself">
        <p className="covenant-case-label">Check it yourself</p>
        <dl className="covenant-facts">
          {FACTS.map(({ title, body, source, href }) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{body}</dd>
              <dd className="covenant-facts-source">
                <a href={href} target="_blank" rel="noopener noreferrer">{source} ↗<span className="sr-only"> (opens a new tab)</span></a>
              </dd>
            </div>
          ))}
        </dl>
        <p className="covenant-case-small">Three links, from bodies that cannot be waved away. Check them yourself — that is the only thing that makes a claim worth anything.</p>
      </aside>
    </section>
  );
}