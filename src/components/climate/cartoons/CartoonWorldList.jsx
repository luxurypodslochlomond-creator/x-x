import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CartoonWorldList({ people }) {
  return (
    <ul className="cartoon-lineage-list">
      {people.map((person) => (
        <li className="cartoon-lineage-person" key={person.name}>
          <p className="cartoon-lineage-place">{person.where}</p>
          <h4>{person.name}</h4>
          {person.work && <p className="cartoon-lineage-work">{person.work}</p>}
          <p className="cartoon-lineage-context">{person.line}</p>
          <a href={person.source_url} target="_blank" rel="noopener noreferrer" aria-label={`Read about ${person.name} at ${person.source}`}>
            {person.source}<ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}