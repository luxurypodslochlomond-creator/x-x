import React from 'react';
import { Link } from 'react-router-dom';
import {
  MarkDrawings,
  MarkTakePart,
  MarkBook,
  MarkArgument,
  MarkRing,
  MarkCounted,
  MarkContactSheet,
  MarkInOrder,
  MarkOneHand,
  MarkTwoEdges,
  MarkRoom,
  MarkWhere,
} from '@/components/climate/cartoons/SetListMarks';
import '@/components/climate/cartoons/wall-navigation.css';

// ── THE ROOM'S SET LIST, AND WHY IT READ AS DEAD ──────────────────────────────
// Brian, 28 November: "set list feels dead and not connected."

// He was reading it right. It was eleven lines of label and a drawn mark — a filing list
// wearing a festival's name. A set list tells you what a thing is and what you are about to
// walk into; this one told you a word and left you to guess, and it mixed the six chapters
// of the room you had just walked with five doors that leave the room entirely, so nothing
// on it was connected to anything else on it.
//
// Two changes, both of them the list being honest about what it is. Every line now says
// what is behind it, in the room's own words rather than in a label. And the list is split
// where the room is actually split: what is on this page, in the order it is set, and the
// doors that take you out of it. The numbers still run straight down, because the order of
// the evening is one order.
const IN_ROOM = [
  { n: '01', href: '#press-wall', label: 'Drawings', line: 'Everything on the wall, whole and signed', Mark: MarkDrawings },
  { n: '02', href: '#cartoon-why-title', label: 'Why a cartoon', line: 'The case for a pen over a graph', Mark: MarkArgument },
  // The case for the joke, which is the argument under the three lines above: the record's
  // own figures, and why a drawing gets a person through a door a figure cannot open.
  { n: '03', href: '#cartoon-humour', label: 'The missing piece is a laugh', line: 'What the movement keeps leaving out', Mark: MarkArgument },
  { n: '04', href: '#cartoon-your-turn', label: 'Take part', line: 'Send one — it goes up under your name', Mark: MarkTakePart },
  { n: '05', href: '#cartoon-goals', label: 'Seventeen goals', line: 'The wall counted against them, the blanks printed', Mark: MarkCounted },
  { n: '06', href: '#press-book', label: 'The book', line: 'The biennial, its editors, the three days', Mark: MarkBook },
  { n: '07', href: '#press-world', label: 'Cartoonists before these', line: 'Who drew power first, and where', Mark: MarkRing },
];

const OUT_OF_ROOM = [
  { n: '08', href: '/ClimateCartoons/Print', label: 'Print a show', line: 'Choose drawings, print them, hang them', Mark: MarkContactSheet, page: true },
  { n: '09', href: '/ClimateCartoons/Thread', label: 'Read them in order', line: 'The whole wall, one drawing after another', Mark: MarkInOrder, page: true },
  { n: '10', href: '/ClimateCartoons/Francis', label: 'One hand’s own page', line: 'Francis, and every hand’s own address', Mark: MarkOneHand, page: true },
  { n: '11', href: '/ClimateCartoons/CAIB', label: 'Where this stands', line: 'The line between CAIB and this record', Mark: MarkTwoEdges, page: true },
  { n: '12', href: '/ClimateCartoons/WhatThisIs', label: 'What this is', line: 'Your work and your rights, in plain words', Mark: MarkRoom, page: true },
  // ── THE DOOR THE ROOM WAS MISSING ────────────────────────────────────────────
  // The map has carried every drawing since it was built — a layer of its own, each one
  // standing at the country that gave it, and each one opening back onto the wall — and the
  // wall had no way of saying so. So a reader who wanted to see where these came from had to
  // already know the map existed. It is a door out of the room now, on the list, where a
  // reader looks for the ways out.
  { n: '13', href: '/ClimateMap', label: 'Where they were drawn', line: 'Every drawing, standing at the country that gave it', Mark: MarkWhere, page: true },
];

const WAYS_IN = IN_ROOM.length + OUT_OF_ROOM.length;

function SetLine({ n, href, label, line, Mark: MarkIcon, page }) {
  const body = (
    <>
      <span className="wall-setlist-n">{n}</span>
      <span className="wall-setlist-label">
        {label}
        <span className="wall-setlist-line">{line}</span>
      </span>
      <MarkIcon />
    </>
  );
  return (
    <li>
      {page ? <Link to={href}>{body}</Link> : <a href={href}>{body}</a>}
    </li>
  );
}

function SetGroup({ head, items }) {
  return (
    <div className="wall-setlist-group-block">
      <p className="wall-setlist-group">{head}</p>
      <ol>
        {items.map((item) => <SetLine key={item.href} {...item} />)}
      </ol>
    </div>
  );
}

export default function CartoonRoomNavigation() {
  return (
    <div className="wall-wayfinding">
      <nav className="wall-setlist" aria-label="The Wall, in the order it is set">
        <div className="wall-setlist-head">
          <p className="wall-setlist-title">Set list</p>
          {/* Counted from the lists themselves. It once said "Twelve ways in" over eleven
              doors, which is the one kind of fault this record cannot carry: a count that
              disagrees with the thing it counts. */}
          <span>{WAYS_IN} ways in</span>
        </div>
        <SetGroup head="In this room" items={IN_ROOM} />
        <SetGroup head="Out of the room" items={OUT_OF_ROOM} />
      </nav>
    </div>
  );
}