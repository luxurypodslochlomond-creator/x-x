import React from 'react';

// One section of the plain sheet: a heading, its paragraphs, and — where a claim is being
// listed rather than said — the list that carries it. Kept as one small piece so the page
// itself stays a table of contents rather than a wall of markup.
export default function PlainSection({ head, paras = [], list = [], after }) {
  return (
    <section className="plain-section">
      <h2 className="plain-head">{head}</h2>
      {paras.map((line) => (
        <p key={line} className="plain-p">{line}</p>
      ))}
      {list.length > 0 && (
        <ul className="plain-list">
          {list.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
      {after && <p className="plain-p plain-after">{after}</p>}
    </section>
  );
}