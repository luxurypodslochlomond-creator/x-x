import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import CartoonMaker from '@/components/climate/cartoons/CartoonMaker';
import CartoonSendIn from '@/components/climate/cartoons/CartoonSendIn';
import { HandPencil, PaperPhoto } from '@/components/climate/cartoons/CartoonInkIcons';

export default function CartoonRoomActions() {
  return (
    <section className="comic-workshop" aria-labelledby="cartoon-your-turn">
      {/* ── THIS IS A DOOR FOR A CARTOONIST, NOT AN EXERCISE FOR THE ROOM ──────────
          Brian, 25 November: "I don't think we are inviting the audience to make drawings,
          are we bro? what is this all about, I'm lost."

          He had read it correctly and the page was wrong. "Now it's your turn" said to
          everybody in a room, under a wall of working cartoonists' drawings, reads as an
          invitation to the audience to draw — and there is no drawing exercise in Janine's
          agenda for the 29th. The hour is: cartoonists present their own work, CEEW presents
          its cartoons, then questions. Nobody is asked to make anything.

          This section is not that. It is the door a cartoonist uses to put their own drawing
          on the wall — the same door Francis's artists and CEEW's artists came through — and
          it now says whose door it is. The id is kept because links and the room's own set
          list point at it. */}
      {/* "If you draw, there is a place for it here" was a form asking politely. A door to a
          wall of working cartoonists should sound like the wall: draw it, we hang it, your
          name stays on it. Same door, same drawer, no hedging. */}
      <h2 id="cartoon-your-turn" className="comic-section-title">Send it. We hang it. Your name stays on it.</h2>
      <p className="record-meta comic-workshop-note">Anyone who draws. Send it as you made it — nothing cropped, nothing corrected, your name on it, and a person looks before it goes up.</p>
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
      {/* ── THE DOOR FOR A CORRESPONDENT ──────────────────────────────────────────
          CEEW asked six questions in writing before Sunday's hour — how it runs, who is in
          it, how many drawings are on the wall, how many more are coming, what it is for and
          whether it can be shared. Those answers are in writing on their own page, and a
          person who has come in at the wall should reach them in one tap instead of hunting
          the hour's page first. Same block as the other door, because both are the same kind
          of question: what is this, and what happens next. */}
      <p className="record-meta comic-workshop-note" style={{ marginTop: '0.4rem' }}>
        Coming to Sunday’s hour?{' '}
        <Link to="/ClimateWorkshopAnswers" style={{ color: 'rgb(var(--record-red))', textDecoration: 'underline' }}>
          The six questions, answered in writing
        </Link>
      </p>
    </section>
  );
}