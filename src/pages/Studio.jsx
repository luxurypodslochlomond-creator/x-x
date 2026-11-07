import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Sparkles } from 'lucide-react';
import StudioDoor from '@/components/studio/StudioDoor';
import StudioPromises from '@/components/studio/StudioPromises';

// ── THE STUDIO — A ROOM IN THE RECORD ─────────────────────────────────────────
// Where a reader stops reading and starts making. You read what is happening to the world,
// then you make something about it, and the second part is how the next generation ends up
// knowing the first. Nobody is told they are learning; they are told to build a game about
// the river at the end of their street.
//
// It is set in the record's own voice now — one chiselled serif, sentence case, hierarchy from
// size and air — instead of condensed capitals with a hard shadow behind them. A headline
// shouted in a poster face made this the one room in the book that could not say anything
// quietly, and it read as a different product wearing the record's colours.
const CHIPS = [
  { to: '/TogetherChangeClimate', label: 'The record' },
  { to: '/Magic51', label: 'Magic51' },
  { to: '/Literacy51', label: 'Reading' },
  { to: '/GeorgieMaths', label: 'Maths' },
];

export default function Studio() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 pb-14 pt-8 lg:px-10">
      <p className="font-mono text-[9px] font-black uppercase tracking-[0.22em] text-record-mark">
        Studio · a room in the record
      </p>
      <h1
        className="mt-2.5 text-[#1a1612] leading-[0.95]"
        style={{ fontFamily: 'var(--record-display)', fontSize: 'clamp(34px, 9vw, 54px)', letterSpacing: '-0.025em' }}
      >
        Make something.
      </h1>
      <p
        className="mt-3 max-w-[46ch] leading-relaxed text-[#1a1612]/90"
        style={{ fontFamily: 'var(--font-record-reading)', fontSize: 15.5 }}
      >
        A game, a mark, a badge with your own initials on it. Both tools work right here in the
        browser, on a school laptop or a phone. Nothing to install, nothing to sign.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <StudioDoor to="/Studio/Zapp" icon={Zap} kicker="build a thing" title="ZAPP">
          Say what you want — a game about the river at the end of your street, a quiz,
          something that counts — and it is built and playing in a minute. Pick an animal to
          build with.
        </StudioDoor>

        <StudioDoor to="/Studio/Logo" icon={Sparkles} kicker="draw a mark" title="Logo Room">
          A crest for your street, a badge for the club, initials of your own. Make it, keep it,
          and use it as your picture anywhere.
        </StudioDoor>
      </div>

      {/* ── THE SUBJECT BEHIND THE MAKING ──
          The one step that turns a toy into knowing something. Said as advice, not a lesson. */}
      <section className="mt-9 border-t-2 border-[#1a1612] pt-4">
        <h2
          className="text-[#1a1612]"
          style={{ fontFamily: 'var(--record-display)', fontSize: 21, letterSpacing: '-0.01em' }}
        >
          Then find out if it is true
        </h2>
        <p
          className="mt-2 max-w-[54ch] leading-relaxed text-[#1a1612]/85"
          style={{ fontFamily: 'var(--font-record-reading)', fontSize: 14 }}
        >
          Read one entry on the record — something working, or something being lost — and build
          about that. A quiz on a river being restored. A badge for a beach that gets cleaned. A
          counter for the birds on your street.
        </p>
        <div className="mt-3.5 flex flex-wrap gap-2">
          {CHIPS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="border border-[#1a1612]/35 px-2.5 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.1em] text-[#1a1612] transition-colors hover:border-[#1a1612] hover:bg-[#efe7d6]"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <StudioPromises />
    </div>
  );
}