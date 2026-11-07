import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

// ── THE STUDIO — A ROOM IN THE RECORD ─────────────────────────────────────────
// This is where a reader stops reading and starts making: a game, a quiz, a mark of their
// own. It lives inside the record, under the record's masthead and above its foot, because
// the two halves belong together — you read what is happening to the world, then you make
// something about it, and the second part is how the next generation ends up knowing the
// first. Nobody is told they are learning; they are told to build a game about the river at
// the end of their street.
//
// The look is a workbench rather than a page: prints pinned up on warm paper, ink borders,
// hard shadows, one word of signal orange each. Same paper, same ink and same two colours as
// the record around it, so it reads as the record's own workshop, not a separate product
// with its own branding.
function Print({ to, icon: Icon, kicker, title, children, ink, tilt }) {
  return (
    <Link
      to={to}
      className="block border-2 border-[#1a1612] bg-[#f4efe4] p-4 transition-transform active:translate-x-[2px] active:translate-y-[2px]"
      style={{ boxShadow: '6px 6px 0 rgba(26,22,18,0.85)', transform: `rotate(${tilt}deg)` }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="grid h-10 w-10 place-items-center border-2 border-[#1a1612]" style={{ background: ink }}>
          <Icon className="h-5 w-5 text-[#f4efe4]" />
        </span>
        <span className="text-[8px] font-black font-mono uppercase tracking-[0.18em] text-[#6b6258]">{kicker}</span>
      </div>
      <p
        className="mt-3 font-black uppercase leading-none text-[#1a1612]"
        style={{ fontFamily: 'var(--font-display)', fontSize: '26px', letterSpacing: '-0.02em' }}
      >
        {title}
      </p>
      <p className="mt-2 leading-relaxed text-[#1a1612]/85" style={{ fontFamily: 'var(--font-record-reading)', fontSize: '13.5px' }}>
        {children}
      </p>
      <span className="mt-3 inline-flex items-center gap-1.5 border-b-2 border-[#1a1612] text-[9px] font-black font-mono uppercase tracking-[0.14em] text-[#1a1612]">
        Open it <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}

function Chip({ to, children }) {
  return (
    <Link
      to={to}
      className="border-2 border-[#1a1612] bg-[#f4efe4] px-2.5 py-1.5 text-[10px] font-black font-mono uppercase tracking-[0.1em] text-[#1a1612] active:bg-[#e2602a]"
      style={{ boxShadow: '3px 3px 0 rgba(26,22,18,0.85)' }}
    >
      {children}
    </Link>
  );
}

function Never({ children }) {
  return (
    <li className="flex gap-2 leading-relaxed" style={{ fontFamily: 'var(--font-record-reading)', fontSize: '13.5px' }}>
      <span aria-hidden="true" className="font-mono font-black text-[#b3261e]">—</span>
      <span>{children}</span>
    </li>
  );
}

export default function Studio() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-12 pt-6 lg:px-10">
      {/* ── TOP LEFT, NOT CENTRED ──
          Pinned up rather than laid out: an eyebrow, a two-line shout, one line of plain
          words. Nothing in this room is stacked in the middle of the page. */}
      <p className="text-[9px] font-black font-mono uppercase tracking-[0.2em] text-[#b3261e]">
        For whoever is still young enough to make things
      </p>
      <h1
        className="mt-2 font-black uppercase leading-[0.86] text-[#1a1612]"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 12vw, 64px)', letterSpacing: '-0.03em' }}
      >
        Make<br />
        <span className="text-[#e2602a]">something</span>
      </h1>
      <p className="mt-3 max-w-[34ch] leading-relaxed text-[#1a1612]" style={{ fontFamily: 'var(--font-record-reading)', fontSize: '14.5px' }}>
        A game, a mark, a badge with your own initials on it. Both tools work right here in the
        browser, on a school laptop or a phone. Nothing to install, nothing to sign.
      </p>

      <div className="mt-7 flex flex-col gap-4">
        <Print to="/Studio/Zapp" icon={Zap} kicker="build a thing" title="ZAPP" ink="#b3261e" tilt={-0.7}>
          Say what you want — a game about the river at the end of your street, a quiz, something
          that counts — and it is built and playing in a minute. Pick an animal to build with.
        </Print>

        <Print to="/Studio/Logo" icon={Sparkles} kicker="draw a mark" title="Logo Room" ink="#e2602a" tilt={0.7}>
          A crest for your street, a badge for the club, initials of your own. Make it, keep it, and
          use it as your picture anywhere.
        </Print>
      </div>

      {/* ── THE SUBJECT BEHIND THE MAKING ──
          The one step that turns a toy into knowing something: a game is only as good as the
          thing it is about. Said as advice, not as a lesson. */}
      <section className="mt-9 border-2 border-[#1a1612] bg-[#efe7d6] p-4" style={{ boxShadow: '6px 6px 0 rgba(26,22,18,0.85)' }}>
        <div className="flex items-start gap-2">
          <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#b3261e]" />
          <div>
            <p
              className="font-black uppercase leading-none text-[#1a1612]"
              style={{ fontFamily: 'var(--font-display)', fontSize: '19px', letterSpacing: '-0.01em' }}
            >
              Then find out if it is true
            </p>
            <p className="mt-2 leading-relaxed text-[#1a1612]/85" style={{ fontFamily: 'var(--font-record-reading)', fontSize: '13.5px' }}>
              Read one entry on the record — something working, or something being lost — and build
              about that. A quiz on a river being restored. A badge for a beach that gets cleaned. A
              counter for the birds on your street.
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip to="/TogetherChangeClimate">The record</Chip>
          <Chip to="/Magic51">Magic51</Chip>
          <Chip to="/Literacy51">Reading</Chip>
          <Chip to="/GeorgieMaths">Maths</Chip>
        </div>
      </section>

      {/* ── WHAT IS NEVER ASKED FOR ── */}
      <section className="mt-9">
        <h2
          className="font-black uppercase leading-none text-[#1a1612]"
          style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.01em' }}
        >
          What is never asked for
        </h2>
        <ul className="mt-3 space-y-2 border-l-4 border-l-[#1a1612] pl-3">
          <Never>No account and no password. There is nothing here to sign into.</Never>
          <Never>No name, no age, no email, no school.</Never>
          <Never>What you make stays in your own browser, on your own device.</Never>
          <Never>Everything that appears on screen is checked before it is shown.</Never>
          <Never>Nothing is sold, ranked, or shown to strangers.</Never>
        </ul>
        <p className="mt-4 border-2 border-[#1a1612]/25 bg-[#efe7d6]/70 px-3 py-2.5 font-mono text-[10.5px] leading-relaxed text-[#1a1612]">
          Every thing built here carries one line and no more: <span className="font-black">an AI made this, it
          can be wrong — check with a grown-up if it matters.</span>
        </p>
      </section>
    </div>
  );
}