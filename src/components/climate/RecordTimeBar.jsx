import React from 'react';
import RecordTongueDoor from '@/components/climate/RecordTongueDoor';

// ── THE YELLOW LINE AT THE TOP OF THE RECORD ────────────────────────────────────
// First cut was set in the reading voice at eleven pixels, italic, next to a red x = x:
// three voices in one thin strip. Second cut fixed the voice — mono, uppercase, tracked,
// the way the foot's yellow chip and every card the record hands out already set this
// line — and then left x = x in the corner, which pushed the sentence into a ragged two
// lines to make room for something the foot already says at seventy pixels.
//
// So x = x comes out of the box. It is not lost: it is the first thing in the foot, and
// it has its own page. What is left is one sentence, broken where a reader would break it
// by hand — "the time" on one line, "the record of the time" on the next — and the tongue,
// which used to sit opposite the record's name and now sits here, because the name has gone
// from the top of the page and the tongue is the one control that must never be buried.
//
// ── AND THE SENTENCE IS CENTRED ON THE GLASS, NOT ON WHAT IS LEFT OF IT ─────────
// Brian, 19 November: "this is the record of the time at very top not centred with x = x
// below, because of the tongue top right." The tongue was standing in the flow of the
// strip, so the sentence was given the width that was left over and centred inside that —
// which put it a tongue's width to the left of the middle of the band, above an x = x that
// was dead centre. Nothing was the wrong size; the line was measuring the wrong box.
//
// The tongue is lifted out of the flow and set against the band's right edge instead. The
// sentence now takes the whole band and centres on the band, and no size, weight or break
// has changed: the same nine pixels on a phone, the same ten on a desk, the same words in
// the same two lines. The tongue sits where it sat before, and the strip is one line
// centred over another.
export default function RecordTimeBar({ className = '' }) {
  return (
    <div className={`relative bg-cartoon-sun text-record-ink ${className}`}>
      <div className="flex items-center px-4 py-[3px] lg:px-10 lg:py-1">
        {/* ── THE SENTENCE IS SET, NOT JUST WRAPPED ────────────────────────────────
            Brian, 17 November: "centre the or justify whatever balance the sentence in the
            yellow bar." The forced break came out and the wrapping is balanced now, so the
            two lines a phone gets are of a length with each other instead of one long line
            and one short one beside a tongue. Centred, because a sentence that is a title
            for the whole record sits in the middle of its own band. */}
        <p
          className="record-header-type w-full text-center text-[9px] uppercase leading-[1.5] lg:text-[10px]"
          style={{ textWrap: 'balance' }}
        >
          This is the time. And this is the record of the time.
        </p>
      </div>

      {/* The tongue, held against the right edge of the band so it costs the sentence
          nothing. It is the seventh way through the record and the only control up here,
          so it stays where a hand goes looking for it — it simply no longer decides where
          the record's own line sits. */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 lg:right-10">
        <RecordTongueDoor size={17} inline />
      </div>
    </div>
  );
}