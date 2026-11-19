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
      <button
        type="button"
        onClick={() => setShowPlate(true)}
        className="mb-1 flex min-h-12 w-full items-center gap-2 border-b border-record-mark/30 pb-2 text-left text-record-ink hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
      >
        <span aria-hidden="true" className="flex w-6 shrink-0 justify-center"><MarkContents size={24} /></span>
        <span className="flex-1 text-[12px] uppercase leading-tight tracking-[0.08em]">The marks, all at once</span>
        <span aria-hidden="true" className="font-mono text-[10px] text-record-muted">{MARKS_IN_ORDER.length}</span>
      </button>
      {groups.map(({ title, doors }) => (
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
            <h2 className={`record-header-type flex gap-2 leading-none text-record-mark ${phone ? 'sticky top-0 z-[1] items-center bg-record-bone pb-2 pt-2.5 text-[11px] tracking-[0.16em]' : 'items-baseline pt-3 text-[11px] leading-relaxed'}`}>
              <span>{title}</span>
              <span aria-hidden="true" className={phone ? 'bg-record-mark px-1 py-[2px] font-mono text-[9px] leading-none tracking-normal text-record-bone' : 'text-[10px]'}>{doors.length}</span>
              {/* The rule that finishes the shelf's name. A name and a figure alone on a
                  phone's glass float; a name, a figure and a hairline running out to the
                  edge of the page are a printed shelf label, which is what this is. */}
              {phone && <span aria-hidden="true" className="ml-1 h-px flex-1 self-center bg-record-ink/20" />}
            </h2>
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
                return (
                  <li key={to} className={phone ? 'border-b border-record-ink/10 odd:border-r odd:border-record-ink/10' : ''}>
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
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
      ))}
    </div>
  );
}