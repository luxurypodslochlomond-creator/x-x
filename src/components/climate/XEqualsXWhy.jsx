import React from 'react';
import RecordBand from './RecordBand';

// ── WHY THE RECORD HAS TO EXIST ────────────────────────────────────────────────
// This page explained itself for six sections and never once said what it was for.
// A covenant that only describes its own rules is a terms-and-conditions page with a
// good typeface. So this section carries the argument, in the plainest words available:
// what is lost when nobody writes it down, and what a record does that a feed cannot.
//
// No borrowed physics, no borrowed poetry. Three statements, each one thing, each
// checked against the record's own limits at the foot of this page.

const LOST = [
  {
    title: 'A solution nobody wrote down has to be invented twice.',
    body: 'People are already doing the work. The seagrass, the shelter, the planting, the policy submission. Without its source written beside it, the next person starts from nothing and the funder has nothing to check.',
  },
  {
    title: 'A crisis nobody recorded can be denied later.',
    body: 'A figure lives for a week and then becomes a matter of opinion. Written down with a date and a source, it stays arguable. That is all this record offers a crisis: not outrage, a date.',
  },
  {
    title: 'A promise nobody can check is not a promise.',
    body: 'Anyone can say they are open and honest. A record can be opened by a reader and checked line by line, and it is the only form of the claim that costs anything to make.',
  },
];

export default function XEqualsXWhy() {
  return (
    <RecordBand id="why" label="The argument" title="Why this had to be written down">
      <p className="max-w-[48ch]">
        Most of what is said about the climate this year will not survive the year. The post
        scrolls past, the page is rewritten, the figure is quietly revised, and in twelve months
        nobody can show what it said or who said it. A claim with no record behind it is a rumour
        that happened to last.
      </p>

      <div className="mt-7">
        {LOST.map(({ title, body }) => (
          <div key={title} className="border-t border-[#141210]/20 pt-4 pb-5">
            <p
              className="text-[#141210] max-w-[34ch]"
              style={{ fontFamily: 'var(--font-display)', fontSize: '18px', lineHeight: 1.25 }}
            >
              {title}
            </p>
            <p className="mt-2 max-w-[52ch] text-[#141210]/85">{body}</p>
          </div>
        ))}
      </div>

      <p className="mt-1 border-t border-[#141210]/20 pt-4 max-w-[52ch]">
        None of that is grand. It is the plain reason this platform exists: so that a thing said in
        good faith can still be argued with a year later, by somebody who was not in the room.
      </p>
    </RecordBand>
  );
}