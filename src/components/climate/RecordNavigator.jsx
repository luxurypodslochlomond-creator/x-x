import React from 'react';
import { Link } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import { markFor } from '@/components/climate/pageMarks';
import '@/components/climate/record-navigator.css';

// ── THE DOCK THAT WALKS WITH YOU ───────────────────────────────────────────────
// Two earlier answers to this were both wrong, and the difference between them is the
// whole reason this file exists.
//
// First it was six equal cells with six equal marks and six equal words: a tab bar
// wearing paper. Then it was six words and no marks, which was tidier and truer to a
// sleeve, but it left the record with nothing to look at. A menu of words can only be
// read. A mark can be recognised before it is read — that is the thing a child, a
// cousin, anybody does with a sign — and the record is full of marks that were cut for
// its own doors. So the marks come back, and the words become captions under them,
// the way a plate in an atlas is named: the picture does the work, the caption settles
// any doubt. That is how a mark is understood without being turned back into a word.
//
// It follows you because a printed record's index cannot. On a phone the page is four
// hundred pixels wide; a way through that lives off the top of the glass is a way
// through you have to remember. So the dock is fixed to the foot of the glass, in the
// thumb's own reach, on the same paper as the page, with its top edge drawn by hand
// instead of ruled by a browser. Nothing is boxed, nothing is numbered, no cell draws
// a border round itself: it is a plinth the record stands on, not a control panel.
//
// One door is the record's whole hand: the six questions a reader actually arrives
// with. Everything else the record holds — the covenant, the seals, the music, the
// costs, every page it has — stays on the index at the foot of the book, so this dock
// adds a way through and takes nothing away. The name under a door is not a second
// navigation; it is that door saying who it is, once, quietly.
export default function RecordNavigator({ currentPage }) {
  return (
    <nav
      aria-label="The way through the record"
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[env(safe-area-inset-bottom)] pointer-events-none sm:px-6 sm:pb-4"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-[560px] bg-record-bone/95 shadow-[0_-10px_30px_-18px_rgba(26,22,18,0.55)] backdrop-blur-[2px] sm:max-w-[600px] sm:shadow-[0_10px_34px_-18px_rgba(26,22,18,0.55)]">
        {/* The edge of the plinth, drawn once and never straightened: a hairline with the
            tiny unsteadiness of a pen, so the dock belongs to the same hand as the plates
            rather than to the browser's border. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 4"
          preserveAspectRatio="none"
          className="block h-[4px] w-full text-record-ink/30"
        >
          <path
            d="M0 2.4C58 1.5 126 2.9 196 2.2 268 1.4 338 2.8 400 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>

        <ul className="grid grid-cols-6 items-end">
          {PRIMARY_NAV.map(({ label, to, page, what }) => {
            const active = currentPage === page;
            const Mark = markFor(to);
            return (
              <li key={to} className={active ? 'rec-nav-on' : undefined}>
                <Link
                  to={to}
                  aria-current={active ? 'page' : undefined}
                  aria-label={`${what}${active ? ' You are here.' : ''}`}
                  className={`flex min-h-[58px] flex-col items-center justify-end gap-1.5 pb-2 pt-3 outline-offset-4 transition-colors ${
                    active ? 'text-record-red' : 'text-record-ink/70 hover:text-record-red'
                  }`}
                >
                  <span className="rec-nav-mark">
                    <Mark size={active ? 27 : 25} />
                  </span>
                  <span className="font-mono text-[9px] uppercase leading-none tracking-[0.14em]">
                    {label}
                  </span>
                  <span aria-hidden="true" className="rec-nav-pip bg-record-mark" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}