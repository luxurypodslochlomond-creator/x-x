import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import PressOpening from '@/components/climate/cartoons/press/PressOpening';
import PressWall from '@/components/climate/cartoons/press/PressWall';
import CartoonSessionBand from '@/components/climate/cartoons/CartoonSessionBand';
import CartoonProgramme from '@/components/climate/cartoons/CartoonProgramme';
import CartoonAnthology from '@/components/climate/cartoons/CartoonAnthology';
import CartoonWhy from '@/components/climate/cartoons/CartoonWhy';
import CartoonLongRead from '@/components/climate/cartoons/CartoonLongRead';
import CartoonRoomActions from '@/components/climate/cartoons/CartoonRoomActions';
import CartoonRoomNew from '@/components/climate/cartoons/CartoonRoomNew';
import CartoonSources from '@/components/climate/cartoons/CartoonSources';
import CartoonRoomNavigation from '@/components/climate/cartoons/CartoonRoomNavigation';
// Shared ink and phone treatments; the desktop layout is declared once, last.
import '@/components/climate/cartoons/press/press.css';
import '@/components/climate/cartoons/press/press-mobile-ground.css';
import '@/components/climate/cartoons/press/press-ink.css';
import '@/components/climate/cartoons/cartoon-lineage.css';
import '@/components/climate/cartoons/press/press-record-ink.css';
import '@/components/climate/cartoons/press/press-signal.css';
import '@/components/climate/cartoons/press/press-field.css';
import '@/components/climate/cartoons/press/press-phone.css';
import '@/components/climate/cartoons/press/press-workshop.css';
import '@/components/climate/cartoons/baseone/base-one.css';
import '@/components/climate/cartoons/press/press-desktop-ground.css';

export default function ClimateCartoons() {
  return (
    <ClimateRecordShell
      painted
      className="cartoon-room press-room"
      eyebrow="The Wall"
      marker="The record · the cartoon room"
      title="The Wall"
      statement="Drawn by hand. Hung on the wall."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to real-world climate solutions"
      footer="Every contributed cartoon keeps its artist’s name, its origin and the drawer’s own words. A person looks before it goes up."
    >
      {/* ── THE ORDER, SET ONCE, IN THE MARKUP ──────────────────────────────────────
          Until 25 November the phone had its own chapter order written in CSS — `order: 1`
          to `9` in press-workshop.css — while the desk read the markup. Two orders for one
          room is exactly how a room goes out of balance on both: the desk buried "Now it's
          your turn" second from the bottom, after three essays and the book, and the
          machine's strip, which was in neither list, fell to `order: 0` and rose to the top
          of a phone, standing above the cover.

          So there is one order now, and it is this one. It reads the same on a phone and on
          a desk:

            the room's name and the cover   →   the drawings   →   the machine's hand
            →   your turn   →   the book it feeds   →   the count, the argument, the
            lineage   →   whose work this is

          The invitation sits third, immediately after the drawings, because a wall asks you
          to look and then asks you to add. It does not ask you to read three essays first. */}
      <div className="press-room-inner">
        <PressOpening />

        {/* 1 · THE DRAWINGS. Everything after them is about them. */}
        <PressWall />

        {/* ── 2 · WHY THEY ARE HERE, IN THREE LINES ───────────────────────────────────
            This sat four screens down, after the event band, the programme, the book and
            the whole goals ledger — so the reason the room exists was buried under the
            record's apparatus. It is thirty words and it is the answer to the only question
            a visitor has at the end of a wall: why am I looking at drawings on a climate
            record? Straight after the drawings is where that question is actually asked. */}
        <CartoonWhy />
        {/* ── 2 · THE MACHINE'S HAND IS NOT IN THIS ROOM ──────────────────────────
            Brian, 25 November, twice: "you sure the cartoonists and Janine want to see base 1
            cartoons bro?" and then "can take out base 1 drawings okesse". He was right and I
            was wrong to leave it in. Nothing in Janine's hour asks for a machine drawing: every
            item is a person and their work. The mark was honest — unsigned, separate, labelled
            as a hand with no hand and no weather — but it was there for the record's argument,
            not for the cartoonists, in the one room that belongs to them.

            Honest is not the same as needed. The marks keep their own address at
            /ClimateCartoons/BaseOne, where the argument about machines can be made properly
            and nobody has to meet it while looking at a person's drawing. The route, the page
            and the series are untouched; only the door from this room has come off. */}
        {/* 3 · THE INVITATION, placed where a reader actually is — looking at a wall. */}
        <CartoonRoomActions />
        {/* 3b · And what is new for the hand that made a drawing: take it whole, your name
            travels with it, off on your word. It belongs beside the invitation, not with
            the reading. */}
        <CartoonRoomNew />

        {/* 4 · THE BOOK the drawings feed. */}
        <div className="press-facing" id="press-book">
          <CartoonSessionBand />
          {/* The five sessions, in the festival's own order — sent as a printed flyer on
              20 November and copied here rather than summarised, so a reader planning the
              three days sees what the organisers printed, times included and times absent. */}
          <CartoonProgramme />
          <CartoonAnthology />
        </div>

        {/* 5 · WHOSE WORK THIS IS. */}
        <CartoonSources />

        {/* 6 · THE ARGUMENT, one tap away — the goals counted against the wall, and the
            cartoonists who drew power before it. Kept whole; see CartoonLongRead for why
            it is folded rather than deleted, and for the one line that puts it back. */}
        <CartoonLongRead />

        {/* ── 7 · THE SET LIST, WHICH WAS BUILT AND NEVER MOUNTED ─────────────────────
            Brian, 26 November: "at least make coolasfuck easy to get to."

            He was right, and the fault was a strange one: the room's set list was written
            months of work ago — eleven doors, every one of them live, its own CSS, its own
            drawn marks — and nothing rendered it. Not this page, not any page. The comment
            at the top of PressOpening even claims "the twelve doors are the room's own
            navigation", which was true of the file and false of the room.

            So the room had no wayfinding at all: a reader who had walked fourteen drawings
            and wanted the hour, the book, the goals or one hand's own page had to scroll and
            hope. It goes at the foot rather than the head for the reason this room was
            stripped back on the 25th: a numbered contents list above the first drawing is
            what made the doorway read as a funding report. At the foot it is what a set list
            actually is — the order of the evening, read on the way out, with every door live
            for anybody who wants to go back in. */}
        <CartoonRoomNavigation />
      </div>
    </ClimateRecordShell>
  );
}