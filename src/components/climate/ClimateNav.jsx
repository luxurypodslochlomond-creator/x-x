import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Search as SearchIcon } from 'lucide-react';
import { useRecordCapacity } from '@/components/climate/useKeeper';

// ── THE WAY THROUGH THE RECORD — ONE LINE, FOUR DOORS ──────────────────────────
// This bar had eleven words on it: five places to read, then five quiet words about the
// record itself, then the workroom. On a phone it wrapped to two rows and still moved the
// page down as you read it, and a rail of eleven destinations is what makes a thing read as
// a website rather than as an app — you are being given a map before you are given a page.
//
// So the bar now holds only where a reader goes: Search, the five places, and one door for
// the people who tend the record. Everything about the record — who founded it, how it is
// checked, how it is sealed, how it is corrected, what it costs — lives in the foot of every
// page, which is where a reader looks when they have finished reading rather than before.
//
// The single word for the working room is DESK. It was called the workroom, the keeper room,
// the checking room and the desk in four different places, and a person holding the keys had
// to learn our vocabulary before they could do a day's work. One room, one word.
// Music and Studio used to stand here too, and they were the two words that made the line
// read as a website's menu rather than as a book's own way through. They are not places to
// read: Music is where you listen, Studio is where you make — both are rooms you step into
// after the record has been read, and both carry their own quiet place in the foot of every
// page, with the whole of the record behind them. What is left is the reading itself: five
// doors, one word each, and one control.
// Founder is the fifth door, and it is here rather than only at the foot for one reason:
// the first question a stranger asks of a record that says it can be trusted — a funder, a
// reviewer, a journalist, a sceptic — is who is behind it. A record that answers that only
// in its own footer is hiding its accountability at the exact moment somebody looks for it.
// The foot still carries it, because the foot is the complete index of what the record is
// and a reviewer scans it; the bar carries it because nobody should have to scroll to the
// bottom of a book to find out whose name is on it.
const PLACES = [
  { label: 'Record', page: 'TogetherChangeClimate' },
  { label: 'Wire', page: 'ClimateWire' },
  { label: 'Map', page: 'ClimateMap' },
  { label: 'Impact', page: 'ClimateImpact' },
  { label: 'Founder', page: 'ClimateFounder', aria: 'Who founded the record, and why' },
];

const DESK = { label: 'Shed', page: 'ClimateKeeperRoom', aria: 'The shed — decide what is waiting, or check a source' };

function PlaceLink({ item, active, desk }) {
  // The desk is the one door here that is work rather than reading, so it is drawn a shade
  // firmer: still a word, never a glow. A reader never sees it at all.
  const tone = active
    ? 'text-[#e2602a] border-[#e2602a]'
    : desk
      ? 'text-[#efe7d6] border-[#efe7d6]/45 hover:text-[#e2602a] hover:border-[#e2602a]'
      : 'text-[#efe7d6]/75 border-transparent hover:text-[#efe7d6] hover:border-[#efe7d6]/40';

  return (
    <Link
      to={createPageUrl(item.page)}
      aria-label={item.aria}
      aria-current={active ? 'page' : undefined}
      className={`pb-1 whitespace-nowrap border-b-2 text-[12px] font-black uppercase tracking-[0.1em] transition-colors ${tone}`}
    >
      {item.label}
    </Link>
  );
}

export default function ClimateNav({ currentPage, variant = 'desktop' }) {
  const isActive = (page) => currentPage === page;
  // Either capacity opens the desk: a keeper decides, a checker looks, and one person is
  // often both. A door only one of them could see was a door the other had to remember.
  const capacity = useRecordCapacity();
  const keeper = capacity.isKeeper || capacity.isChecker;
  const searchActive = isActive('ClimateSearch');

  const searchBox = (
    <Link
      to={createPageUrl('ClimateSearch')}
      aria-current={searchActive ? 'page' : undefined}
      aria-label="Search the record"
      /* Search is the one control in this bar, and it wears the same red as x = x — the mark's
         own, not the record's warning red. Two reds on one bar read as one red and one mistake,
         and the record's rule is that a single red carries everything it means by intent: the
         promise at the foot and the way in at the top are the same ink. Where you are is still
         said in the signal orange, so the box can never be mistaken for the current page. */
      className={`flex items-center gap-1.5 border-2 border-record-mark px-3 py-1.5 text-[11px] font-black font-mono uppercase tracking-[0.1em] whitespace-nowrap transition-colors sm:min-h-0 sm:px-2.5 min-h-[44px] ${
        searchActive
          ? 'bg-[#e2602a] border-[#e2602a] text-[#141210]'
          : 'bg-record-mark text-[#f4efe4] hover:bg-[#e2602a] hover:border-[#e2602a] hover:text-[#141210]'
      }`}
    >
      <SearchIcon className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">Search</span>
    </Link>
  );

  // The same six doors on both, on one line, centred. Nothing slides sideways and nothing is
  // hidden behind a swipe: on the narrowest handset the bar wraps to a second line rather than
  // putting a door past the edge of the glass.
  const mobile = variant === 'mobile';

  return (
    <nav
      aria-label="The record"
      className={`flex items-center gap-x-3 gap-y-1 ${
        mobile ? 'flex-wrap justify-center px-2 py-0.5' : 'flex-wrap lg:flex-nowrap lg:justify-end lg:gap-5'
      }`}
    >
      {/* A handset gets Search first, because a thumb should not have to read four words before
          it finds the one control. A desktop gets it last, at the end of the line, so the row
          reads left to right as the record's four ways in and then one thing to press — and so
          the control stops sitting between the masthead and the first door it belongs after. */}
      {mobile && (
        <>
          {searchBox}
          <span aria-hidden="true" className="w-px h-4 bg-[#efe7d6]/20" />
        </>
      )}
      {PLACES.map((item) => (
        <PlaceLink key={item.page} item={item} active={isActive(item.page)} />
      ))}
      {keeper && (
        <>
          <span aria-hidden="true" className="w-px h-4 bg-[#efe7d6]/20" />
          <PlaceLink item={DESK} active={isActive(DESK.page)} desk />
        </>
      )}
      {!mobile && (
        <>
          <span aria-hidden="true" className="h-4 w-px bg-[#efe7d6]/20" />
          {searchBox}
        </>
      )}
    </nav>
  );
}