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
// ── TWO MARKS FLANKING IT, BECAUSE THE ROW BELOW CANNOT HOLD SIX ───────────────
// Brian, 19 November, on a phone: "not refined coolasfuck header any more… and the tongue
// too, right, can't see it now bro." He was looking at a masthead that had grown to two
// rows of three doors with the tongue lying over the end of the sentence. Two faults, one
// cause: too many marks in too little glass, and a control drawn on top of a sentence
// instead of beside it.
//
// So the band carries the two controls a phone actually reaches for, one at each edge and
// both exactly the same width, which is what keeps the sentence centred on the glass
// between them: the index of everything on the left, the tongue on the right. The five
// ways in stay in the row below, where five is the number a thumb can hold and BASE 1 sits
// in the middle. A desk is untouched: it has the room, so it keeps its own index door and
// the tongue stays pinned to the right edge as it always was.
export default function RecordTimeBar({ onOpenContents, contentsOpen }) {
  return (
    <div className="rec-time-bar relative bg-cartoon-sun text-record-ink">
      <div className="flex items-center gap-1 px-4 py-[3px] lg:px-10 lg:py-1">
        {/* ── THE INDEX, ON A PHONE, WHERE THE ROW BELOW CANNOT HOLD IT ─────────────
            Three rules of ink in the corner the eye already goes to for a menu, at the
            full forty-four pixel target, and the panel behind it is the same one the
            Explore door opens on a desk. Nothing new to learn and nothing hidden: the
            whole contents of the record is one thumb-width from the top of every page. */}
        <button
          type="button"
          onClick={onOpenContents}
          aria-expanded={contentsOpen}
          aria-controls="record-contents"
          aria-label="Everything the record keeps"
          title="Everything the record keeps"
          className="rec-band-index shrink-0 lg:hidden"
        >
          <span aria-hidden="true" className="rec-band-rules"><i /><i /><i /></span>
        </button>

        {/* ── THE SENTENCE IS SET, NOT JUST WRAPPED ────────────────────────────────
            Brian, 17 November: "centre the or justify whatever balance the sentence in
            the yellow bar." The forced break came out and the wrapping is balanced now, so
            the two lines a phone gets are of a length with each other instead of one long
            line and one short one beside a tongue. Centred, because a sentence that is a
            title for the whole record sits in the middle of its own band. */}
        <p
          className="record-header-type min-w-0 flex-1 text-center text-[9px] uppercase leading-[1.5] lg:text-[10px]"
          style={{ textWrap: 'balance' }}
        >
          This is the time. And this is the record of the time.
        </p>

        {/* The tongue, held at the right edge of the band so it costs the sentence
            nothing. It is the way through the record that changes its voice, and the only
            reader-facing control up here, so it stays where a hand goes looking for it.
            On a phone it is the mark alone — the tongue's own name is what used to run
            under the sentence — and a desk keeps the name beside it, exactly as before. */}
        <div className="flex w-11 shrink-0 items-center justify-center sm:w-auto lg:absolute lg:right-10 lg:top-1/2 lg:-translate-y-1/2">
          <RecordTongueDoor size={17} inline />
        </div>
      </div>
    </div>
  );
}