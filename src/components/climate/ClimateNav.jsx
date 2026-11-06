import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Search as SearchIcon } from 'lucide-react';
import COOLASFUCKTuningFork from '@/components/shared/COOLASFUCKTuningFork';
import { useRecordCapacity } from '@/components/climate/useKeeper';

// ── THE KEEPER'S DOOR ──
// The desk used to sit in the app's own admin list, which put the record's working page in a
// room belonging to something else. If the record is going to stand on its own one day, it has
// to carry the things needed to tend it. So the door is here, in the record's own bar, and only
// a keeper sees it: to a reader the record looks exactly as it did.
const KEEPER_WORD = { label: 'Workroom', page: 'ClimateKeeperRoom', aria: 'The workroom for invited keepers and checkers' };

// ── THE WAY THROUGH THE RECORD ───────────────────────────────────────────────────
// Two different kinds of thing live in this bar, and they are drawn differently on
// purpose. Places you can read — Record, Wire, Map, Impact — and the quiet words about
// the record itself. Then one action: Search, which wears a box and an icon so it can
// never read as one more word in a list. Nothing is removed from the record; the door
// that matters most just looks like a door.
//
// The music stood here once as the one lit mark in the bar, and that was wrong. It asked
// to be heard before a single entry had been read, and the record is for crises and
// solutions first. Janine said it plainly: do not invite the music. So it has gone to
// the quiet words, last of them, and it is a word like the rest — found on purpose by a
// reader who wants it, never worn as a glow on the way to an entry.

// Music stands with the places you read. It was moved down into the quiet words, last of
// them, and that buried it: a reader who came for the music could not find it at all. The
// objection was to a glow — the music asking to be heard before a single entry had been
// read — and that stands. So it is a plain word here, no lit mark, no icon, no pull. Found
// on purpose, exactly like Record or Wire, and never wearing a light on the way to an entry.
const PLACES = [
  { label: 'Record', page: 'TogetherChangeClimate' },
  { label: 'Wire', page: 'ClimateWire' },
  { label: 'Map', page: 'ClimateMap' },
  { label: 'Impact', page: 'ClimateImpact' },
  { label: 'Music', page: 'ClimateMusic' },
];

const ABOUT = [
  { label: 'Founder', page: 'ClimateFounder' },
  { label: 'Support', page: 'ClimateSupport' },
  { label: 'Method', page: 'ClimateMethod' },
  { label: 'Seal', page: 'ClimateSeals' },
  { label: 'Corrections', page: 'ClimateCorrections' },
];

// Every door in this bar is a word, music included. A lit mark was tried here and taken
// off: a glow among the places you read is an invitation, and this record does not
// invite anyone away from an entry.
function PlaceLink({ item, active }) {
  const tone = item.glyph
    ? 'flex items-center text-[#e2602a] drop-shadow-[0_0_7px_rgba(226,96,42,0.75)] hover:text-[#ffb27a] hover:drop-shadow-[0_0_14px_rgba(226,96,42,1)] hover:scale-110 transition-transform'
    : `text-[11px] font-black uppercase tracking-wider ${
        active
          ? 'text-[#e2602a] border-[#e2602a]'
          : 'text-[#efe7d6]/75 border-transparent hover:text-[#efe7d6] hover:border-[#efe7d6]/40'
      }`;

  return (
    <Link
      to={createPageUrl(item.page)}
      aria-label={item.aria}
      aria-current={active ? 'page' : undefined}
      className={`pb-1 whitespace-nowrap border-b-2 transition-colors ${tone}`}
    >
      {item.glyph ? <COOLASFUCKTuningFork size={19} tone="signal" /> : item.label}
    </Link>
  );
}

// The mobile door. The same words as the desk bar, sized for a thumb and never cut off:
// the page you are on is marked with a rule as well as a colour, and the record's own
// three sit one shade quieter so the places you read still lead.
function MobileLink({ item, active, quiet }) {
  return (
    <Link
      to={createPageUrl(item.page)}
      aria-label={item.aria}
      aria-current={active ? 'page' : undefined}
      className={`min-h-[42px] flex items-center px-1.5 transition-colors active:text-[#e2602a] ${
        quiet ? 'text-[#efe7d6]/70' : 'text-[#efe7d6]/80'
      }`}
    >
      <span
        className={`pb-0.5 border-b-2 ${
          item.glyph
            ? 'flex items-center text-[#e2602a] drop-shadow-[0_0_8px_rgba(226,96,42,0.8)]'
            : `text-[10px] font-black uppercase whitespace-nowrap ${active ? 'text-[#e2602a] border-[#e2602a]' : 'border-transparent'}`
        }`}
      >
        {item.glyph ? <COOLASFUCKTuningFork size={21} tone="signal" /> : item.label}
      </span>
    </Link>
  );
}

export default function ClimateNav({ currentPage, variant = 'desktop' }) {
  const isActive = (page) => currentPage === page;
  // Either capacity opens the workroom: a keeper decides, a checker looks, and one person is
  // often both. A door only one of them could see was a door the other had to remember.
  const capacity = useRecordCapacity();
  const keeper = capacity.isKeeper || capacity.isChecker;
  const searchActive = isActive('ClimateSearch');

  const searchBox = (
    <Link
      to={createPageUrl('ClimateSearch')}
      aria-current={searchActive ? 'page' : undefined}
      aria-label="Search the record"
      className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-2.5 min-h-[44px] sm:min-h-0 border-2 text-[10px] font-black font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
        searchActive
          ? 'bg-[#e2602a] border-[#e2602a] text-[#141210]'
          : 'border-[#efe7d6]/35 text-[#efe7d6] hover:border-[#e2602a] hover:text-[#e2602a]'
      }`}
    >
      <SearchIcon className="w-3.5 h-3.5" />
      {/* On a phone the box keeps its icon and its spoken name, and gives up the printed
          word — so the five places beside it, music among them, all stand on the screen
          without a swipe. A door you cannot see is not a door. */}
      <span className="hidden sm:inline">Search</span>
    </Link>
  );

  // On a phone: two lines, every door on the screen at once — nothing hidden, nothing to
  // swipe, no fade hinting at something you cannot see. The places you read lead the first
  // line with Search, music standing among them as a word like the rest; the record's own
  // quiet words about itself sit underneath. A door you cannot see is not a door.
  if (variant === 'mobile') {
    return (
      <nav aria-label="The record" className="flex flex-col px-2 py-0.5">
        {/* EVERY DOOR ON THE GLASS ────────────────────────────────────────────────────────
            These two lines used to slide sideways: a door that would not fit was still in the
            bar, but it was past the edge of the phone, and a door past the edge is not a door.
            A reader had to discover, inside a bar stuck to the top of the screen, that it could
            be swiped — and nothing said so.

            So nothing slides now. The words are set a shade smaller and the two lines wrap
            instead: every place the record can be read, and every quiet word about the record
            itself, stands on the screen at once, on the narrowest handset, without a gesture
            and without a hint. In a tongue whose words run longer than English the line takes a
            third row rather than hiding anything — the bar grows by one thumb's height, which
            is a fair price for not losing a door. */}
        <div className="flex flex-wrap items-center justify-center gap-x-0.5">
          {searchBox}
          <span className="w-px h-4 bg-[#efe7d6]/20" />
          {PLACES.map((item) => (
            <MobileLink key={item.page} item={item} active={isActive(item.page)} />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-1.5">
            {ABOUT.map((item) => (
              <MobileLink key={item.page} item={item} active={isActive(item.page)} quiet />
            ))}
            {keeper && (
              <>
                <span className="w-px h-4 bg-[#efe7d6]/20" />
                <MobileLink item={KEEPER_WORD} active={isActive(KEEPER_WORD.page)} quiet />
              </>
            )}
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-4 lg:gap-5 min-w-0 overflow-x-auto climate-nav-rail" aria-label="The record">
      {searchBox}
      <span className="w-px h-4 bg-[#efe7d6]/20" />
      {PLACES.map((item) => (
        <PlaceLink key={item.page} item={item} active={isActive(item.page)} />
      ))}
      <span className="w-px h-4 bg-[#efe7d6]/20" />
      {ABOUT.map((item) => (
        <PlaceLink key={item.page} item={item} active={isActive(item.page)} />
      ))}
      {keeper && (
        <>
          <span className="w-px h-4 bg-[#efe7d6]/20" />
          <PlaceLink item={KEEPER_WORD} active={isActive(KEEPER_WORD.page)} />
        </>
      )}
    </nav>
  );
}