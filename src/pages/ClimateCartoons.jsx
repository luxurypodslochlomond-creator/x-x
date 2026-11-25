import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import PressOpening from '@/components/climate/cartoons/press/PressOpening';
import PressWall from '@/components/climate/cartoons/press/PressWall';
import CartoonSessionBand from '@/components/climate/cartoons/CartoonSessionBand';
import CartoonProgramme from '@/components/climate/cartoons/CartoonProgramme';
import CartoonAnthology from '@/components/climate/cartoons/CartoonAnthology';
import CartoonWhy from '@/components/climate/cartoons/CartoonWhy';
import CartoonGoals from '@/components/climate/cartoons/CartoonGoals';
import CartoonWorld from '@/components/climate/cartoons/CartoonWorld';
import BaseOneStrip from '@/components/climate/cartoons/baseone/BaseOneStrip';
import CartoonRoomActions from '@/components/climate/cartoons/CartoonRoomActions';
import CartoonRoomNew from '@/components/climate/cartoons/CartoonRoomNew';
import CartoonSources from '@/components/climate/cartoons/CartoonSources';
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
      compact
      className="cartoon-room press-room"
      eyebrow="The record · the cartoon room"
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
        {/* 2 · THE MACHINE'S HAND, beside the wall and never above it: eight wordless marks,
            unsigned on purpose, so nobody mistakes them for a person's. */}
        <BaseOneStrip />
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

        {/* 5 · THE READING. The count first, because a cartoonist reads the count before the
            essay; the argument next; the lineage last, because it is the longest look away
            from the wall and the wall is why anyone came. Human work throughout — no
            machine-drawn fiction in this room, because a wall of real hands does not need
            pictures nobody drew. */}
        <CartoonGoals />
        <CartoonWhy />
        <CartoonWorld />

        {/* 6 · WHOSE WORK THIS IS. */}
        <CartoonSources />
      </div>
    </ClimateRecordShell>
  );
}