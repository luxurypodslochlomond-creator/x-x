import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// One drawing, on the sheet, at its own proportions. Nothing is written on it and nothing
// is laid over it: the words sit underneath, in the record's voice, and they only say what
// the mark is looking at and where to check it.
export default function BaseOnePlate({ drawing }) {
  return (
    <figure className="base-one-plate" id={`base-one-${drawing.id}`}>
      <div className="base-one-sheet">
        <img src={drawing.image} alt={drawing.alt} loading="lazy" decoding="async" />
      </div>
      <figcaption className="base-one-caption">
        <p className="base-one-numeral" aria-hidden="true">{drawing.numeral}</p>
        <div>
          <p className="base-one-answers">{drawing.answers}</p>
          <p className="base-one-line">{drawing.line}</p>
          <Link to={drawing.to} className="base-one-door">
            {drawing.door}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </figcaption>
    </figure>
  );
}