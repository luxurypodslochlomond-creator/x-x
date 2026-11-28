import React from 'react';

export default function FounderEvidenceRow({ item }) {
  return (
    <div className="record-founder-evidence-row">
      <dt>
        <strong>{item.value}</strong>
        <span>{item.unit}</span>
      </dt>
      <dd>
        <h3>{item.title}</h3>
        <p>{item.claim}</p>
        <p className="record-founder-evidence-scope">{item.scope}</p>
        <a className="record-founder-evidence-source" href={item.href} target="_blank" rel="noopener noreferrer">
          {item.source} ↗<span className="sr-only"> (opens a new tab)</span>
        </a>
      </dd>
    </div>
  );
}