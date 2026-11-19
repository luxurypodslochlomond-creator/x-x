import React from 'react';
import { ChevronDown } from 'lucide-react';

// How well a claim is known, said as a count of marks rather than a paragraph.
// Three filled bars: the body itself published it. Two: independent origins agree.
// One: a single origin says so, and the record says so too.
const LEVELS = [
  { label: 'Official record', filled: 3, body: 'The body responsible published it itself.' },
  { label: 'Two sources', filled: 2, body: 'Two independent origins agree.' },
  { label: 'One source', filled: 1, body: 'One origin says so. Labelled, never hidden.' },
];

export default function NewsTruthKey() {
  return (
    <details className="news-key">
      <summary>
        <span className="news-key-title">How well it is known</span>
        <span className="news-key-marks" aria-hidden="true">
          <i /><i /><i />
        </span>
        <ChevronDown size={15} aria-hidden="true" className="news-key-chevron" />
      </summary>
      <ul>
        {LEVELS.map((level) => (
          <li key={level.label}>
            <span className="news-key-marks" aria-hidden="true">
              {[0, 1, 2].map((i) => <i key={i} className={i < level.filled ? 'news-key-on' : ''} />)}
            </span>
            <span className="news-key-label">{level.label}</span>
            <span className="news-key-body">{level.body}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}