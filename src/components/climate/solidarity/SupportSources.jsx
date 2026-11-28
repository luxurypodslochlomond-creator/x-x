import React from 'react';

export default function SupportSources() {
  return <section id="ledger-why" className="my-12 border-t border-record-ink/30 pt-6" aria-labelledby="support-sources-title">
    <p className="stand-kicker">A position, with its sources</p><h2 className="stand-section-title mt-2" id="support-sources-title">For a fairer planet.</h2>
    <p className="mt-4 text-lg leading-relaxed max-w-prose">Our position: resources should sustain the people doing the work, not buy control of their work. Open access and fair pay belong together.</p>
    <details className="mt-5 border-y border-record-ink/25 py-3">
      <summary className="min-h-11 content-center cursor-pointer font-semibold">Read the sources behind that position</summary>
      <ol className="mt-4 space-y-5 text-base leading-relaxed">
        <li><a className="underline text-record-red font-semibold" href="https://www.un.org/sustainabledevelopment/development-goals/" target="_blank" rel="noopener noreferrer">United Nations · Sustainable Development Goals, financing FAQ</a><p className="mt-1">The UN says financing is available, but is not being channelled towards sustainable development at the necessary scale and speed. Available financial assets are not a fund this record can draw on.</p></li>
        <li><a className="underline text-record-red font-semibold" href="https://www.unesco.org/creativity/en/1980-recommendation-concerning-status-artist" target="_blank" rel="noopener noreferrer">UNESCO · 1980 Recommendation concerning the Status of the Artist</a><p className="mt-1">Calls for improved professional, social and economic conditions for artists, including employment, income and freedom of expression.</p></li>
      </ol>
      <p className="mt-4 text-sm text-record-muted">Sources consulted 28 November 2026. These bodies do not endorse this platform or its payment rule.</p>
    </details>
  </section>;
}