import React from 'react';

const BOOK = 'https://www.panmacmillan.com/authors/sarah-wynn-williams/careless-people/9781035065929';
const COVER = 'https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-640/edition/9781035065929.jpg';

export default function XEqualsXThanks() {
  return (
    <section id="further-reading" aria-labelledby="covenant-reading" className="covenant-reading">
      <p className="covenant-label">If you want more</p>
      <h2 id="covenant-reading">Further reading.</h2>
      <div className="covenant-book">
        <a href={BOOK} target="_blank" rel="noopener noreferrer" aria-label="Careless People, publisher’s page (opens a new tab)">
          <img src={COVER} alt="Careless People by Sarah Wynn-Williams, UK hardback cover" width="320" height="500" loading="lazy" />
        </a>
        <div>
          <h3>Careless People</h3>
          <p>Sarah Wynn-Williams</p>
          <p className="covenant-caption text-record-muted">Macmillan · 2025</p>
          <p className="covenant-caption text-record-muted">A former policy director inside Facebook on how the decisions were actually made.</p>
          <a href={BOOK} target="_blank" rel="noopener noreferrer">Publisher’s page ↗<span className="sr-only"> (opens a new tab)</span></a>
        </div>
      </div>
      <p className="covenant-caption mt-5 text-record-muted">
        Context for these questions. Not proof of them, and no endorsement.
      </p>
    </section>
  );
}