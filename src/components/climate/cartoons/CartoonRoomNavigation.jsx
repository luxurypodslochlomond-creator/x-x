import React from 'react';
import { Link } from 'react-router-dom';
import {
  MarkDrawings,
  MarkTakePart,
  MarkBook,
  MarkArgument,
  MarkRing,
  MarkCounted,
  MarkUnsigned,
  MarkContactSheet,
  MarkInOrder,
  MarkOneHand,
  MarkTwoEdges,
  MarkRoom,
} from '@/components/climate/cartoons/SetListMarks';
import { MARKS_WORD } from '@/components/climate/cartoons/baseone/baseOneSeries';
import '@/components/climate/cartoons/wall-navigation.css';

// ── THE ROOM'S SET LIST ───────────────────────────────────────────────────────
// It was a row of three doors over a drawer called "About this wall", and the drawer was
// the fault: five of the ways through this room were behind a word that sounds like a
// legal notice, so a reader had to guess there was more before they could find it.
//
// Brian, 25 November: "could be what's contents coolasfuck or better name than contents and
// all clickable." So there is no drawer and nothing to open: every line is live, in the
// order the room is actually set — the wall, the desk, the book, the argument, the hands,
// the goals, the machine's own marks, the print room, the thread, one hand's own page, the
// line with CAIB, and what a contributor's rights are. A contents list that disagrees with
// the page it belongs to is the first place a reader learns not to trust the rest of it.
//
// "Set list" rather than "Contents" because this room was opened for a festival: a set list
// is what you read to know what is coming and in what order, and it is the trade's own word
// rather than a filing word. The numbers are the record's red, because a count on this
// record is always the machine's and always in the margin.
const SET = [
  { n: '01', href: '#press-wall', label: 'Drawings', Mark: MarkDrawings },
  { n: '02', href: '#cartoon-your-turn', label: 'Take part', Mark: MarkTakePart },
  { n: '03', href: '#press-book', label: 'The book', Mark: MarkBook },
  { n: '04', href: '#cartoon-why-title', label: 'Why cartoons', Mark: MarkArgument },
  { n: '05', href: '#press-world', label: 'Cartoonists around the world', Mark: MarkRing },
  { n: '06', href: '#cartoon-goals', label: 'The seventeen goals', Mark: MarkCounted },
  { n: '07', href: '/ClimateCartoons/BaseOne', label: `Signed · ${MARKS_WORD} wordless marks`, Mark: MarkUnsigned, page: true },
  { n: '08', href: '/ClimateCartoons/Print', label: 'Print a show', Mark: MarkContactSheet, page: true },
  { n: '09', href: '/ClimateCartoons/Thread', label: 'Read them in order', Mark: MarkInOrder, page: true },
  { n: '10', href: '/ClimateCartoons/Francis', label: 'One hand’s own page', Mark: MarkOneHand, page: true },
  { n: '11', href: '/ClimateCartoons/CAIB', label: 'Where this stands', Mark: MarkTwoEdges, page: true },
  { n: '12', href: '/ClimateCartoons/WhatThisIs', label: 'What this is · your work and rights', Mark: MarkRoom, page: true },
];

export default function CartoonRoomNavigation() {
  return (
    <div className="wall-wayfinding">
      <nav className="wall-setlist" aria-label="The Wall, in the order it is set">
        <div className="wall-setlist-head">
          <p className="wall-setlist-title">Set list</p>
          <span>Twelve ways in</span>
        </div>
        <ol>
          {SET.map(({ n, href, label, Mark: MarkIcon, page }) => (
            <li key={href}>
              {page ? (
                <Link to={href}>
                  <span className="wall-setlist-n">{n}</span>
                  <span className="wall-setlist-label">{label}</span>
                  <MarkIcon />
                </Link>
              ) : (
                <a href={href}>
                  <span className="wall-setlist-n">{n}</span>
                  <span className="wall-setlist-label">{label}</span>
                  <MarkIcon />
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}