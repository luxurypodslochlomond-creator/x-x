import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MARKS } from '@/components/stoneymollan/history';

/* ── WHAT THE ROAD IS, IN A POP-UP ──────────────────────────────────────────────
   A walker on this path is standing on a road that was carrying coffins across the
   muir centuries before a national trail was laid over it. That is worth one tap.

   So the walking paragraph carries a small door instead of three more paragraphs:
   the coffin road, the cross that went missing, and where the record keeps the
   rest. The words inside are the record's own — taken out of the history entries
   rather than written a second time here, so the pop-up and the history band can
   never drift apart on a fact.

   The sources are named and clickable, because the whole point of the hill's
   history as this record keeps it is that you can go and check it. */

const READING = { fontFamily: 'var(--font-record-reading)' };
const SERIF = { fontFamily: 'var(--record-display)' };

const COFFIN = MARKS.find((mark) => mark.number === '08');
const CROSS = MARKS.find((mark) => mark.number === '09');

const SOURCES = [
  { label: 'ScotWays — heritage path record', href: 'https://scotways.com/heritage-path/HP62/' },
  { label: 'John Muir Way — the route', href: 'https://johnmuirway.org/route' },
  {
    label: 'Three Lochs Way — Balloch to Helensburgh',
    href: 'https://threelochsway.co.uk/balloch-to-helensburgh',
  },
];

export default function TheRoadNote() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="mt-3 inline-flex items-baseline gap-1.5 border-b border-record-ink/40 pb-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-record-ink active:text-record-mark"
        >
          What this road is
          <span aria-hidden="true" className="text-record-mark">
            &rarr;
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[86dvh] w-[calc(100%-2rem)] max-w-[26rem] overflow-y-auto border border-record-ink/30 bg-record-paper p-0 text-record-ink">
        <div className="px-5 pb-5 pt-6">
          <DialogTitle className="text-[21px] leading-[1.15] text-record-ink" style={SERIF}>
            Older than the trail on it
          </DialogTitle>
          <DialogDescription className="sr-only">
            The coffin road under the John Muir Way, and the cross stone that went missing.
          </DialogDescription>

          <div
            className="mt-2.5 space-y-2 border-t border-record-ink/20 pt-3 text-[14.5px] leading-[1.55] text-record-ink/90"
            style={READING}
          >
            {COFFIN && <p>{COFFIN.body[0]}</p>}
            {CROSS && <p>{CROSS.body[0]}</p>}
            {CROSS && <p>{CROSS.body[1]}</p>}
            {COFFIN && <p>{COFFIN.body[2]}</p>}
          </div>

          <p className="mt-3.5 font-mono text-[9.5px] uppercase leading-[1.9] tracking-[0.14em] text-record-ink/60">
            {COFFIN?.source}
          </p>

          <ul className="mt-2 space-y-1.5 border-t border-record-ink/20 pt-3">
            {SOURCES.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.1em] text-record-ink underline decoration-record-ink/30 underline-offset-4"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#history"
            onClick={() => setIsOpen(false)}
            className="mt-4 flex min-h-[44px] items-center justify-center border-2 border-record-ink px-4 font-mono text-[10.5px] uppercase tracking-[0.13em] text-record-ink active:bg-record-ink active:text-record-paper"
          >
            The rest of the hill&rsquo;s history
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}