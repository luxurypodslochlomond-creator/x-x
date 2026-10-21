import React from 'react';

const REFERENCES = [
  {
    title: 'The business incentives',
    text: 'A 2024 FTC staff report found that many major social-media and streaming services’ advertising models incentivised extensive personal-data collection. This concerns consumers broadly, not only children.',
    citation: 'FTC · A Look Behind the Screens · September 2024',
    url: 'https://www.ftc.gov/reports/look-behind-screens-examining-data-practices-social-media-video-streaming-services',
  },
  {
    title: 'Adult wellbeing',
    text: 'In a randomised study, four weeks without Facebook increased participants’ subjective wellbeing, but also reduced factual news knowledge. This is evidence from a specific setting, not proof of the same effects for everyone or every platform.',
    citation: 'Allcott et al. · American Economic Review 110(3), 629–676 · 2020',
    url: 'https://www.aeaweb.org/articles?id=10.1257/aer.20190658',
  },
  {
    title: 'Freedom to choose',
    text: 'Article 25 of the EU Digital Services Act addresses interfaces that deceive, manipulate or impair free and informed decisions. It is not framed only around children; its legal scope and exceptions still matter.',
    citation: 'Regulation (EU) 2022/2065 · Article 25',
    url: 'https://eur-lex.europa.eu/eli/reg/2022/2065/oj/eng',
  },
];

export default function XEqualsXEvidence() {
  return (
    <section aria-labelledby="record-evidence" className="space-y-5 border-t border-record-ink/20 pt-7">
      <h2 id="record-evidence" className="font-display text-3xl font-bold uppercase leading-tight">Grounded in evidence.</h2>
      <div className="space-y-6">
        {REFERENCES.map(({ title, text, citation, url }) => (
          <article key={url} className="space-y-2">
            <h3 className="text-base font-bold">{title}</h3>
            <p className="text-sm leading-relaxed text-record-muted">{text}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-semibold leading-relaxed text-record-red underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{citation}</a>
          </article>
        ))}
      </div>
      <p className="border-t border-record-ink/15 pt-5 text-sm leading-relaxed text-record-muted">Further reading: <a href="https://www.panmacmillan.com/authors/sarah-wynn-williams/careless-people/9781035065967" target="_blank" rel="noopener noreferrer" className="font-semibold text-record-red underline underline-offset-4">Careless People, Sarah Wynn-Williams (2025)</a>. An insider’s account, not a court finding or an endorsement of this record. These sources explain the concern; they do not establish this platform’s effects.</p>
    </section>
  );
}