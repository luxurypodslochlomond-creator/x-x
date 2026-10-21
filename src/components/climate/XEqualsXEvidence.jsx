import React from 'react';
import RecordSectionHeading from '@/components/climate/RecordSectionHeading';

const REFERENCES = [
  {
    title: 'The way they earn',
    text: 'A 2024 FTC staff report found that the advertising business of many large social-media and streaming services pushed them to collect a great deal of personal data. This is about all of us, not only children.',
    citation: 'FTC · A Look Behind the Screens · September 2024',
    url: 'https://www.ftc.gov/reports/look-behind-screens-examining-data-practices-social-media-video-streaming-services',
  },
  {
    title: 'Adult wellbeing',
    text: 'In a randomised experiment, people who stepped away from a large social media platform for four weeks reported feeling better, though they also knew less about the news. It is one study, in one setting, and it is not proof that the same would happen to everyone.',
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
    <section aria-labelledby="record-evidence">
      <RecordSectionHeading eyebrow="Read it for yourself" title="Where this comes from." />
      <div className="space-y-3">
        {REFERENCES.map(({ title, text, citation, url }) => (
          <article key={url} className="bg-[#f7f1e5] border-2 border-[#141210] p-4">
            <h3 className="text-[12px] font-black font-mono uppercase text-[#141210] leading-tight">{title}</h3>
            <p className="text-[12px] font-mono text-[#141210] leading-relaxed mt-2">{text}</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2.5 text-[10px] font-black font-mono uppercase tracking-wide text-[#e2602a] underline underline-offset-2"
            >
              {citation} ↗
            </a>
          </article>
        ))}
      </div>
      <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mt-4">
        Further reading:{' '}
        <a
          href="https://www.panmacmillan.com/authors/sarah-wynn-williams/careless-people/9781035065967"
          target="_blank"
          rel="noopener noreferrer"
          className="font-black text-[#b3261e] underline underline-offset-2"
        >
          Careless People, Sarah Wynn-Williams (2025)
        </a>
        . An insider’s account, not a court finding or an endorsement of this record. These sources explain the concern; they do not establish this platform’s effects.
      </p>
    </section>
  );
}