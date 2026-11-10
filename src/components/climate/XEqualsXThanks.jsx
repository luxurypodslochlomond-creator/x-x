import React from 'react';

const BOOK = 'https://www.panmacmillan.com/authors/sarah-wynn-williams/careless-people/9781035065929';

export default function XEqualsXThanks() {
  return (
    <section id="further-reading" aria-label="Further reading" className="covenant-reading">
      <p className="covenant-caption covenant-reading-label">Further reading</p>
      <a className="covenant-book-link" href={BOOK} target="_blank" rel="noopener noreferrer">
        <span><strong>Careless People</strong><span className="covenant-book-author">Sarah Wynn-Williams · Macmillan, 2025</span></span>
        <span className="covenant-book-arrow" aria-hidden="true">↗</span>
        <span className="sr-only">Publisher’s page, opens a new tab</span>
      </a>
      <p className="covenant-caption covenant-reading-note">Context, not proof or endorsement.</p>
    </section>
  );
}