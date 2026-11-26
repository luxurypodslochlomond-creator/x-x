import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BaseOneHook from '@/components/climate/cartoons/baseone/BaseOneHook';
import { BASE_ONE_SIGNATURE } from '@/components/climate/cartoons/baseone/baseOneSeries';

// One drawing, on the sheet, at its own proportions. Nothing is written on it and nothing
// is laid over it: the words sit underneath, in the record's voice, and they only say what
// the mark is looking at and where to check it.
export default function BaseOnePlate({ drawing, onOpen }) {
  return (
    <figure className="base-one-plate" id={`base-one-${drawing.id}`}>
      {/* The square is declared, not discovered. Without a width and height the browser only
          learns how tall a mark is once the file has arrived, so on a slow connection the
          sheet sat there as a blank white band and then shoved the rest of the room down the
          page. Declaring 1024×1024 means the paper is the right shape from the first frame —
          an empty print waiting, never a hole. */}
      {/* The sheet is a door as well as a print: a tap opens the mark on the whole screen,
          where it can be looked at properly instead of scrolled past. */}
      <button
        type="button"
        className="base-one-sheet"
        onClick={onOpen}
        aria-label={`Open mark ${drawing.numeral} full size`}
      >
        <img src={drawing.image} alt={drawing.alt} width={1024} height={1024} loading="lazy" decoding="async" />
      </button>
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
              the name cannot do. It never varies, so a reader can check it in ten years —
              and beside it, in the margin where a printer's device sits, the one mark this
              hand owns: an empty hook. The hook is not a logo and never goes in the nav. */}
          <p className="base-one-sign">
            <BaseOneHook size={20} />
            <span>{BASE_ONE_SIGNATURE}</span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}