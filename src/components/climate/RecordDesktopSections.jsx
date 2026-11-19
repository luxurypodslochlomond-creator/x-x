import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTENT_GROUPS, DESK_NAV, PHONE_NAV_ROWS } from '@/components/climate/recordFooterLinks';
import { markFor } from '@/components/climate/pageMarks';
import { MarkContents } from '@/components/climate/RecordFootMarks';
import { MARKS_IN_ORDER } from '@/components/climate/marks/marksOrder';
import MarksPlate from '@/components/climate/marks/MarksPlate';
import { useRecordCapacity } from '@/components/climate/useKeeper';

export default function RecordDesktopSections({ onNavigate, layout = 'desk' }) {
  // ── ONE INDEX, TWO GLASSES ────────────────────────────────────────────────────
  // The sheet a thumb opens and the panel a mouse opens were two different indexes: this
  // one, grouped, ruled and named in red with a count beside each name, and on a phone a
  // plate of drawn doors in numbered rows. Brian, 18 November: the explore is coolasfuck
  // on desktop and did not change on mobile. He is right, and the fault was that a phone
  // was still being shown the older sheet.
  //
  // So it is the same index at both widths — the same groups, the same order, the same
  // red name and count, the same hairline before each shelf, the same mark beside each
  // door — and only the shape changes: three across on a desk's width, two on a handset,
  // where the name sits beside its mark at the size the record sets a name at.
  //
  // ── ONE SCREEN, WITHOUT SQUASHING THE NAMES ───────────────────────────────────
  // Brian, 18 November: "get all in one screen on mobile without squashing" — and then,
  // seeing three across, "it's a bot squashed on mine and looks out of balance."
  //
  // He was right twice. Three across did bring every door onto one screen, but it did it by
  // shrinking the names to ten pixels in a hundred-and-ten-pixel column, where half of them
  // broke across two lines and the shelves stopped looking like the desk. That is squashed,
  // and it is out of balance, because the thing that made the desk cool was the name being
  // readable beside its mark.
  //
  // So: two across, the desk's shape and the desk's type — a door is a hundred and seventy
  // pixels wide and a whole fingertip tall, a name that needs a second line gets one, and the
  // height is bought back from the shelves' names and the plate's margins instead of from the
  // reader's eyes. Same marks as the desk, exactly the same files: they are the record's own
  // drawings, drawn once and placed by the same map at both widths.
  const phone = layout === 'phone';
  const { pathname } = useLocation();
  const { isKeeper, isChecker } = useRecordCapacity();
  const [showPlate, setShowPlate] = useState(false);

  // ── THE SHEET IS THE REST OF THE BOOK, NOT A SECOND COPY OF THE HEAD ──────────
  // Brian, 19 November: "explore, when you go in, is all over the place — you sure you've
  // not got duplicates?" He had, and this was it: the masthead now carries nine doors on a
  // phone and eleven on a desk, and the sheet went on printing every one of them again
  // underneath. So a reader opened the index to find something and was handed the row they
  // had just used, mixed in with the four doors they had not. Eighteen entries where nine
  // were new is what "all over the place" looks like.
  //
  // So a door already standing on the masthead is not printed on the sheet, and the check is
  // made against the masthead of the glass in the reader's hand — a phone's ten, a desk's
  // eleven — because those are not the same list. That matters for exactly two doors: the
  // music room and the roll stand on a desk's second row and nowhere on a phone, so dropping
  // them outright would leave them unreachable in a hand and printed twice on a desk. Nothing is lost at either width: every door of the record is on the masthead or in
  // this sheet, and no door is in both.
  //
  // A shelf left with nothing on it goes with its doors, so the sheet never opens on a
  // heading with an empty count under it.
  const onMasthead = new Set((phone ? PHONE_NAV_ROWS.flat() : DESK_NAV).map(({ to }) => to));
  const rest = CONTENT_GROUPS
    .map(({ title, doors }) => ({ title, doors: doors.filter((door) => door && !onMasthead.has(door.to)) }))
    .filter(({ doors }) => doors.length > 0);
  const groups = isKeeper || isChecker
    ? [...rest, { title: 'Yours', doors: [{ label: isKeeper ? 'Custodians’ room' : 'Witnesses’ room', to: '/ClimateKeeperRoom' }] }]
    : rest;

  // ── ONE BUTTON, AND THE LIST BECOMES A PICTURE ────────────────────────────────
  // The index is a list of doors, and a list of doors can never say the thing the drawings
  // say when they are laid together. So the first thing on the sheet is the press: it does
  // not open another panel or a second index, it puts the whole drawer on the glass as one
  // plate, and the way back to the list is stated on the plate itself.
  if (showPlate) return <MarksPlate onClose={() => setShowPlate(false)} onNavigate={onNavigate} />;

  return (
    <div className="flex flex-col font-body">
      {/* ── THE SHEET OPENS BY SAYING WHAT IT IS, NOT BY LISTING DOORS ─────────────
          Brian, 19 November: "when going to explore the record why does it feel complex…
          this is our coolasfuck chance to tell people a story… get them trusting for the
          right reason and reading and helping the planet." He is not wrong and it is not
          him: a sheet of nineteen names is a filing cabinet, and a filing cabinet has
          never made anybody care.

          So the first thing on the sheet is the reason the record can be trusted at all,
          said plainly and in two sentences — every entry names who said so, and the reader
          is given the one instruction that matters, which is small enough to follow: read
          one thing, then do one thing. It is the only paragraph in the index, and it is
          set in the record's reading voice so it reads as a person talking rather than as
          furniture. Everything below it is the same doors it always was. */}
      <p className="mb-3 text-[13px] leading-[1.6] text-record-ink/85" style={{ fontFamily: 'var(--font-reading)' }}>
        Every entry names who said so. Read one thing, then do one thing.
      </p>
      {groups.map(({ title, line, doors }) => (
          <section key={title} aria-label={title} className={phone ? 'border-t border-record-mark/30' : 'grid grid-cols-[9rem_minmax(0,1fr)] items-start gap-x-5 border-t border-record-mark/30 py-2'}>
            {/* ── ON A PHONE THE SHELF'S NAME STAYS PUT ────────────────────────────────
                Brian, 19 November: the explore on a phone when it opens is "not coolasfuck".
                The desk's panel holds nineteen doors in one glance because its shelf names
                stand in a column of their own; a phone cannot do that, so it scrolled — and
                a scroll of doors with nothing fixed above it is a list of words that has
                stopped saying which part of the record you are standing in.
                The shelf's own name now pins under the sheet's masthead while its doors pass
                beneath it, and the next shelf's name takes its place: the same grouping the
                desk shows in its left column, said the only way a narrow glass can say it.
                The count wears the record's red plate rather than a bare number, because a
                figure with no mark on it is the one thing this index never had on a desk. */}
            <h2 className={`record-header-type flex flex-wrap gap-2 leading-none text-record-mark ${phone ? 'sticky top-0 z-[1] items-center bg-record-bone pb-2 pt-2.5 text-[11px] tracking-[0.16em]' : 'items-baseline pt-3 text-[11px] leading-relaxed'}`}>
              <span>{title}</span>
              <span aria-hidden="true" className={phone ? 'bg-record-mark px-1 py-[2px] font-mono text-[9px] leading-none tracking-normal text-record-bone' : 'text-[10px]'}>{doors.length}</span>
              {/* The rule that finishes the shelf's name. A name and a figure alone on a
                  phone's glass float; a name, a figure and a hairline running out to the
                  edge of the page are a printed shelf label, which is what this is. */}
              {phone && <span aria-hidden="true" className="ml-1 h-px flex-1 self-center bg-record-ink/20" />}
              {/* On a desk the line sits under the shelf's name, inside its own column,
                  because that column is the one place on the panel where a shelf is
                  allowed to explain itself. */}
              {!phone && line && (
                <span className="basis-full pt-1 text-record-muted" style={{ fontFamily: 'var(--font-reading)', fontSize: 11.5, lineHeight: 1.45, letterSpacing: 0, textTransform: 'none' }}>{line}</span>
              )}
            </h2>
            {/* On a phone the line cannot live in the pinned name, or the name would eat
                the glass. It sits just under it and scrolls away with its own shelf. */}
            {phone && line && (
              <p className="pb-1.5 text-[12.5px] leading-[1.5] text-record-muted" style={{ fontFamily: 'var(--font-reading)' }}>{line}</p>
            )}
            {/* ── TWO ACROSS, BECAUSE THE MARK NO LONGER EATS THE NAME ───────────────────
                Two across failed on this phone once, on 19 November, and the reason was never
                the count of columns: the mark sat beside the name, so each column had a
                picture and about nine characters to set a door in, and "Custodians' room"
                came out as a stack of broken words. Where the mark stands was the fault.
                It now stands above its name inside a ruled cell, so the name owns the whole
                width of that cell and two columns cannot squash anything. Brian asked for it
                this way twice on the same afternoon — "so have coolasfuck screen" — and when
                the sheet went back to one across he said so plainly: "made a mistake, it was
                getting there". So this is the version the glass keeps: two ruled columns, the
                marks in a true grid, the shelf's name finished with a rule and its count. */}
            <ul className={`grid ${phone ? 'grid-cols-2' : 'grid-cols-3 gap-x-4'}`}>
              {doors.map(({ label, to, what }) => {
                const Mark = markFor(to);
                const here = pathname === to;
                // ── NO RULES BETWEEN THE DOORS, AND THAT IS THE FIX ──────────────────
                // Brian, 19 November: "it looks broken in places." It did, and this is
                // where: every cell carried a rule under it and the left column carried one
                // down its side, so a shelf with an odd number of doors ended with a
                // hairline stopping halfway across the glass and a rule with nothing beside
                // it. That is not a design, it is a table that ran out of data. The doors
                // are now held apart by air and by the shelf's own rule, which runs the
                // full width and is the only line the eye has to follow.
                return (
                  <li key={to} className={phone ? 'min-w-0' : ''}>
                    <Link
                      to={to}
                      onClick={onNavigate}
                      title={what}
                      aria-current={here ? 'page' : undefined}
                      className={`flex outline-offset-2 hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark ${phone ? 'min-h-[76px] w-full flex-col items-start justify-center gap-1.5 px-1 py-3 text-[12px] uppercase leading-[1.15] tracking-[0.05em]' : 'min-h-10 items-center gap-2 py-1 text-[13px] uppercase leading-relaxed tracking-[0.08em]'} ${here ? 'text-record-mark underline underline-offset-4' : 'text-record-ink'}`}
                    >
                      {/* ── THE SIZE THE MARKS WERE DRAWN AT ────────────────────────────
                          Every mark on this record is cut for twenty-four or nineteen
                          pixels and the comment on the drawings says so. The sheet was
                          showing them at twenty-two, which is neither: a mark set between
                          the sizes it was drawn for loses exactly the thing that makes it
                          a mark — the weight of its stroke — and reads as a small grey
                          diagram. Twenty-four is the size the index was drawn for. */}
                      <span className={phone ? 'shrink-0' : 'flex w-6 shrink-0 justify-center'} aria-hidden="true"><Mark size={24} /></span>
                      <span>{label}</span>
                      {/* ── THE DOOR SAYS WHAT IS BEHIND IT, ON THE GLASS ─────────────────
                          The one plain sentence about each door was living in the link's
                          title, which a finger never sees: on a phone the door was a mark
                          and a word, and a reader had to already know what "Method" or
                          "Seals" meant to choose it. So the sentence is printed under the
                          name, in the record's reading voice and at caption size, because
                          a mark that makes sense and a door that has to be guessed at are
                          the same failure from opposite ends. */}
                      {phone && what && (
                        <span className="mt-0.5 block text-[11px] font-normal normal-case leading-[1.35] tracking-normal text-record-muted">{what}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
      ))}
      {/* ── THE DRAWING GOES AT THE FOOT, NOT IN FRONT OF THE DOORS ────────────────
          Brian, 19 November, opening this sheet on a phone: "it's clunky on mobile bro
          quite confusing and not coolasfuck balanced." It was not the doors. It was that
          the first glass of the sheet held a masthead, three lines of prose and a button
          for a picture, and not one door of the record — so a reader who opened the index
          to find their way was shown everything except the way.

          The story stays (it is two sentences now, and it earns the trust the rest of the
          sheet relies on), and the plate moves to the foot, where a picture belongs: you
          walk the doors, and at the end of the walk is the whole drawer drawn at once. */}
      <button
        type="button"
        onClick={() => setShowPlate(true)}
        className="mt-2 flex min-h-12 w-full items-center gap-2 border-t border-record-mark/30 pt-2 text-left text-record-ink hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
      >
        <span aria-hidden="true" className="flex w-6 shrink-0 justify-center"><MarkContents size={24} /></span>
        <span className="flex-1 text-[12px] uppercase leading-tight tracking-[0.08em]">Every door, drawn</span>
        <span aria-hidden="true" className="font-mono text-[10px] text-record-muted">{MARKS_IN_ORDER.length}</span>
      </button>
    </div>
  );
}