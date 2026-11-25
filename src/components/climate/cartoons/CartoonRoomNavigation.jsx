import React from 'react';
import { Link } from 'react-router-dom';
import {
  HungWall,
  HandPencil,
  BookRibbon,
  BurstMark,
  TinyCrowd,
  PinnedNote,
  InkPot,
  PaperPhoto,
} from '@/components/climate/cartoons/CartoonInkIcons';
import '@/components/climate/cartoons/wall-navigation.css';

// ── THE ROOM'S SET LIST ───────────────────────────────────────────────────────
// It was a row of three doors over a drawer called "About this wall", and the drawer was
// the fault: five of the eight ways through this room were behind a word that sounds like
// a legal notice, so a reader had to guess there was more before they could find it.
//
// Brian, 25 November: "could be what's contents coolasfuck or better name than contents and
// all clickable." So there is no drawer and nothing to open: eight numbered lines, every one
// of them live, in the order the room is actually set — the wall, the desk, the book, the
// argument, the hands, the goals, the machine's six marks, and what a contributor's rights
// are. A contents list that disagrees with the page it belongs to is the first place a
// reader learns not to trust the rest of it.
//
// "Set list" rather than "Contents" because this room was opened for a festival: a set list
// is what you read to know what is coming and in what order, and it is the trade's own word
// rather than a filing word. The numbers are the record's red, because a count on this
// record is always the machine's and always in the margin.
const SET = [
  { n: '01', href: '#press-wall', label: 'Drawings', Mark: HungWall },
  { n: '02', href: '#cartoon-your-turn', label: 'Take part', Mark: HandPencil },
  { n: '03', href: '#press-book', label: 'The book', Mark: BookRibbon },
  { n: '04', href: '#cartoon-why-title', label: 'Why cartoons', Mark: BurstMark },
  { n: '05', href: '#press-world', label: 'Cartoonists around the world', Mark: TinyCrowd },
  { n: '06', href: '#cartoon-goals', label: 'The seventeen goals', Mark: PinnedNote },
  { n: '07', href: '/ClimateCartoons/BaseOne', label: 'Unsigned · six wordless marks', Mark: InkPot, page: true },
  { n: '08', href: '/ClimateCartoons/WhatThisIs', label: 'What this is · your work and rights', Mark: PaperPhoto, page: true },
];

export default function CartoonRoomNavigation() {
  return (
    <div className="wall-wayfinding">
      <nav className="wall-setlist" aria-label="The Wall, in the order it is set">
        <div className="wall-setlist-head">
          <p className="wall-setlist-title">Set list</p>
          <span>Eight ways in</span>
        </div>
        <ol>
          {SET.map(({ n, href, label, Mark, page }) => (
            <li key={href}>
              {page ? (
                <Link to={href}>
                  <span className="wall-setlist-n">{n}</span>
                  <span className="wall-setlist-label">{label}</span>
                  <Mark size={22} />
                </Link>
              ) : (
                <a href={href}>
                  <span className="wall-setlist-n">{n}</span>
                  <span className="wall-setlist-label">{label}</span>
                  <Mark size={22} />
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}