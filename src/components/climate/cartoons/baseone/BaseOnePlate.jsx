import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BASE_ONE_SIGNATURE } from '@/components/climate/cartoons/baseone/baseOneSeries';

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
          {/* The same three words under every mark, for good: the name, and the one thing
              the name cannot do. It never varies, so a reader can check it in ten years. */}
          <p className="base-one-sign">{BASE_ONE_SIGNATURE}</p>
        </div>
      </figcaption>
    </figure>
  );
}