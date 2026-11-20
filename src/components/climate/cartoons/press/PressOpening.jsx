import React from 'react';
import { Link } from 'react-router-dom';
import CartoonCatalogueBand from '@/components/climate/cartoons/CartoonCatalogueBand';
import CartoonSignal from '@/components/climate/cartoons/CartoonSignal';

// The masthead, introduction and catalogue form one spread on desktop.
// The original cover and its credit remain together, uncropped and unaltered.
export default function PressOpening() {
  return (
    <section className="press-opening" aria-labelledby="press-room-title">
      <div className="press-opening-words">
        <header className="press-opening-masthead">
          <p className="press-eyebrow">The record · the wall</p>
          {/* "The Big Picture" was a phrase institutes, books and foundations all use — a
              borrowed word on a record whose whole argument is that nothing is borrowed.
              "The Real Picture" replaced it, and it was still the wrong way round: a claim
              laid over the drawings by whoever keeps the room, in the one register a
              political cartoonist is trained to distrust. The sentence above the picture is
              exactly what the picture is arguing with.

              Brian, 19 November: "should be called the wall." It should. The wall is the
              trade's own word — the board in every newsroom, the hang in every salon, the
              thing a drawing goes up on — and it is the word this room already uses in
              every other sentence it says: the wall opens, the wall has room on it, tap a
              drawing on the wall. The masthead was the only thing on the page disagreeing
              with the page.

              And the retired name came off the standfirst the same afternoon. It had been
              kept there on the argument that a dead name makes a good slogan — "the real
              picture, drawn by hand" — but a name is not a slogan. It is a name, and a reader
              who meets it here cannot know it was retired; they only learn that this room
              calls itself two different things, in the first sentence they read. Brian,
              19 November: "still says the old name in the text on the wall." So the line now
              says what the room is and nothing it used to be called. */}
          <h1 id="press-room-title" className="press-title">The Wall</h1>
          <p className="press-standfirst">Cartoons for a changing world. Drawn by hand, hung on the wall.</p>
          <CartoonSignal />
        </header>
        {/* ── THREE PARAGRAPHS BECAME TWO ───────────────────────────────────────
            The opening carried three blocks of prose under the title before a reader met a
            single drawing, and one of them was a sentence split over two paragraphs for no
            reason except that it had been added on a different day. Same facts, same credits,
            one breath. Brian, 20 November: "too much for coolasfuck wall." */}
        <p className="press-scope">
          The climate, drawn. The cartoons chosen for the 29 November workshop, the people who
          made them, and a wall with room on it for yours.
        </p>
        <p className="press-scope">
          The wall opens with drawings by What On Earth!®, the cartoon series at CEEW — the
          Council on Energy, Environment and Water, in India — shown with their permission.
          Gathered for CartoonAFRICA, edited by Francis Umendu Odupute and Janine Selendy,
          catalogue prepared by African Press Cartoon Services.
        </p>
        {/* The contents are in the order the room is actually set: the wall, the goals it is
            read against, the argument for cartoons, the lineage, the book, and the desk. A
            contents list that disagrees with the page it belongs to is the first place a
            reader learns not to trust the rest of it — and the door to the fiction that used
            to sit here was still being offered long after the fiction came off the record. */}
        <nav className="press-contents" aria-label="Find your way through the cartoon room">
          <a href="#press-wall">The wall</a>
          <a href="#cartoon-goals">The goals</a>
          <a href="#cartoon-why-title">Why cartoons</a>
          <a href="#press-world">Across the world</a>
          <a href="#press-book">The book</a>
          <a href="#cartoon-your-turn">Add your drawing</a>
          {/* ── THE QUESTION A CARTOONIST ACTUALLY ARRIVES WITH ──────────────────
              "Hard to find what this is for page" — Brian, 20 November. The answer had a
              page and the page had one quiet line at the very bottom of the room. A person
              deciding whether to hand over his work asks this before he scrolls a wall, so
              it now stands in the room's own contents, at the top, where he is looking. */}
          <Link
            to="/ClimateCartoons/WhatThisIs"
            className="press-contents-what"
            style={{ color: 'rgb(var(--record-red))' }}
          >
            What this is
          </Link>
        </nav>
      </div>
      <div className="press-opening-cover">
        <CartoonCatalogueBand />
      </div>
    </section>
  );
}