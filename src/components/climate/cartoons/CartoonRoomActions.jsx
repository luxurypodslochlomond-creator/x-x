import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import CartoonMaker from '@/components/climate/cartoons/CartoonMaker';
import CartoonSendIn from '@/components/climate/cartoons/CartoonSendIn';
import { HandPencil, PaperPhoto } from '@/components/climate/cartoons/CartoonInkIcons';

export default function CartoonRoomActions() {
  return (
    <section className="comic-workshop" aria-labelledby="cartoon-your-turn">
      <h2 id="cartoon-your-turn" className="comic-section-title">Now it’s your turn.</h2>
      <p className="record-meta comic-workshop-note">Your joke. Your drawing. Your way of seeing it.</p>
      {/* ── THE PHOTOGRAPH COMES FIRST, AND THE DRAWING DESK COMES SECOND ──────────
          Brian, 25 November: "on the wall it says now your turn… it's not about a draw
          strip to bring a paper drawing, right? should be easy and coolasfuck to get
          cartoons in there, for all the right reasons."

          He was right, and this was the fault. The room argues for eight years of hands
          that drew with a pencil, and the first door under "Now it's your turn" was a
          browser tool for making a strip on a screen. A cartoonist arriving with a
          drawing on paper — which is every cartoonist on Sunday — found the thing that
          was not for them at the top, and the thing that was for them shut, labelled as
          a drawer, below it.

          So the photograph leads, it opens on arrival rather than waiting for a tap, and
          it says what it wants in the drawer's own words. The drawing desk is kept
          exactly as it was — nobody loses a tool — and sits second, because it is the
          second thing this room is for. */}
      <details className="comic-drawer comic-drawer-paper" open>
        <summary><PaperPhoto size={25} /><span>Photograph a drawing you made</span><ChevronDown size={20} className="comic-chevron" /></summary>
        <div className="comic-drawer-content"><CartoonSendIn /></div>
      </details>
      <details className="comic-drawer" id="cartoon-drawing-desk">
        <summary><HandPencil size={25} /><span>Or draw one here, on the screen</span><ChevronDown size={20} className="comic-chevron" /></summary>
        <div className="comic-drawer-content"><CartoonMaker /></div>
      </details>
      {/* ── THE DOOR FOR SOMEBODY DECIDING ─────────────────────────────────────
          A cartoonist who has been offered a platform before does not want a drawer to draw
          in, he wants to know what happens to his work afterwards. That question has its own
          page, and it belongs here rather than buried in a footer. */}
      <p className="record-meta comic-workshop-note" style={{ marginTop: '1rem' }}>
        Not sure what this room is?{' '}
        <Link to="/ClimateCartoons/WhatThisIs" style={{ color: 'rgb(var(--record-red))', textDecoration: 'underline' }}>
          What this is, in plain words
        </Link>
      </p>
    </section>
  );
}