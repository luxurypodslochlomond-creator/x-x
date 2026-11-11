import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

/* ── ONE DOOR, MANY CLAIMS ──────────────────────────────────────────────────────
   The road note proved the shape: a claim worth checking gets a small tap instead of
   three more paragraphs, and inside it the record says where the claim came from and
   who can be asked.

   This is that shape made once, so the hill can carry as many of these as it needs
   without four copies of the same dialog drifting apart. A note is a label, a heading,
   some words, a rule, and the names of the people who published the thing — with the
   names clickable, because a source you cannot open is a decoration.

   Two rules held here on purpose. A note never gets a footnote in the machine's voice
   and then nothing behind it: no sources, no note. And a note is always about where a
   claim comes from — never a second place to make one. */

const READING = { fontFamily: 'var(--font-record-reading)' };
const SERIF = { fontFamily: 'var(--record-display)' };

export default function SourcedNote({
  trigger,
  title,
  description,
  paragraphs = [],
  footnote,
  sources = [],
  action,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="mt-3 inline-flex items-baseline gap-1.5 border-b border-record-ink/40 pb-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-record-ink active:text-record-mark"
        >
          {trigger}
          <span aria-hidden="true" className="text-record-mark">
            &rarr;
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[86dvh] w-[calc(100%-2rem)] max-w-[26rem] overflow-y-auto border border-record-ink/30 bg-record-paper p-0 text-record-ink">
        <div className="px-5 pb-5 pt-6">
          <DialogTitle className="text-[21px] leading-[1.15] text-record-ink" style={SERIF}>
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">{description || title}</DialogDescription>

          <div
            className="mt-2.5 space-y-2 border-t border-record-ink/20 pt-3 text-[14.5px] leading-[1.55] text-record-ink/90"
            style={READING}
          >
            {paragraphs.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          {footnote && (
            <p className="mt-3.5 font-mono text-[9.5px] uppercase leading-[1.9] tracking-[0.14em] text-record-ink/60">
              {footnote}
            </p>
          )}

          {sources.length > 0 && (
            <ul className="mt-2 space-y-1.5 border-t border-record-ink/20 pt-3">
              {sources.map((source) => (
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
          )}

          {action && (
            <a
              href={action.href}
              onClick={() => setIsOpen(false)}
              className="mt-4 flex min-h-[44px] items-center justify-center border-2 border-record-ink px-4 font-mono text-[10.5px] uppercase tracking-[0.13em] text-record-ink active:bg-record-ink active:text-record-paper"
            >
              {action.label}
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}