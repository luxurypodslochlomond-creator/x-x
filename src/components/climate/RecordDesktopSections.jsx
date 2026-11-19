import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTENT_GROUPS, DESK_NAV, PHONE_NAV_ROWS } from '@/components/climate/recordFooterLinks';
import { markFor } from '@/components/climate/pageMarks';
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

  // ── THE SHEET IS THE REST OF THE BOOK, NOT A SECOND COPY OF THE HEAD ──────────
  // Brian, 19 November: "explore, when you go in, is all over the place — you sure you've
  // not got duplicates?" He had, and this was it: the masthead now carries nine doors on a
  // phone and eleven on a desk, and the sheet went on printing every one of them again
  // underneath. So a reader opened the index to find something and was handed the row they
  // had just used, mixed in with the four doors they had not. Eighteen entries where nine
  // were new is what "all over the place" looks like.
  //
  // So a door already standing on the masthead is not printed on the sheet, and the check is
  // made against the masthead of the glass in the reader's hand — a phone's nine, a desk's
  // eleven — because those are not the same list. That matters for exactly three doors: the
  // music room, the roll and the seals stand on a desk's second row and nowhere on a phone,
  // so dropping them outright would leave them unreachable in a hand and printed twice on a
  // desk. Nothing is lost at either width: every door of the record is on the masthead or in
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
  return (
    <div className="flex flex-col font-body">
      {groups.map(({ title, doors }) => (
          <section key={title} aria-label={title} className={phone ? 'grid grid-cols-1 border-t border-record-mark/30 pb-1' : 'grid grid-cols-[9rem_minmax(0,1fr)] items-start gap-x-5 border-t border-record-mark/30 py-2'}>
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
            <h2 className={`record-header-type flex items-baseline gap-2 leading-none text-record-mark ${phone ? 'sticky top-0 z-[1] bg-record-bone pb-1.5 pt-2 text-[11px] tracking-[0.16em]' : 'pt-3 text-[11px] leading-relaxed'}`}>
              <span>{title}</span>
              <span aria-hidden="true" className={phone ? 'bg-record-mark px-1 py-[2px] font-mono text-[9px] leading-none tracking-normal text-record-bone' : 'text-[10px]'}>{doors.length}</span>
            </h2>
            <ul className={`grid ${phone ? 'grid-cols-2 gap-x-3' : 'grid-cols-3 gap-x-4'}`}>
              {doors.map(({ label, to, what }) => {
                const Mark = markFor(to);
                const here = pathname === to;
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      onClick={onNavigate}
                      title={what}
                      aria-current={here ? 'page' : undefined}
                      className={`flex items-center outline-offset-2 hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark ${phone ? 'min-h-12 gap-2 py-1.5 text-[13px] uppercase leading-[1.2] tracking-[0.04em]' : 'min-h-10 gap-2 py-1 text-[13px] uppercase leading-relaxed tracking-[0.08em]'} ${here ? 'text-record-mark underline underline-offset-4' : 'text-record-ink'}`}
                    >
                      <span className="shrink-0" aria-hidden="true"><Mark size={22} /></span>
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