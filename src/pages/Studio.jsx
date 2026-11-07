import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

// ── THE STUDIO ────────────────────────────────────────────────────────────────
// Two tools, given a place of their own. The point of the room is that the tools stop
// being separate products a child is dropped into: from here, ZAPP and the Logo Room open
// inside this world, with this masthead still above them, so nothing arrives without
// context and nothing looks like an unfinished page.
//
// It is also where the learning happens without being called learning. A game needs a
// subject. The record holds the subject — what is working, what is being lost — and a
// child who makes something about a river has read about the river.
//
// Nothing on this page collects anything: no account, no name, no age, no school, no
// email. What is made stays in the browser it was made in.
function Print({ to, icon: Icon, kicker, title, children, ink, tilt }) {
  return (
    <Link
      to={to}
      className="group block border-2 border-[#141210] bg-[#FFFDF7] p-4 transition-transform active:translate-x-[2px] active:translate-y-[2px]"
      style={{ boxShadow: '7px 7px 0 #141210', transform: `rotate(${tilt}deg)` }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="grid h-10 w-10 place-items-center border-2 border-[#141210]" style={{ background: ink }}>
          <Icon className="h-5 w-5 text-[#FBF5E6]" />
        </span>
        <span className="text-[8px] font-black font-mono uppercase tracking-[0.18em] text-[#141210]/50">{kicker}</span>
      </div>
      <p className="mt-3 font-black uppercase leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: '27px', letterSpacing: '-0.02em' }}>
        {title}
      </p>
      <p className="mt-2 text-[11.5px] font-mono leading-relaxed text-[#141210]/80">{children}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 border-b-2 border-[#141210] text-[9px] font-black font-mono uppercase tracking-[0.14em]">
        Open it <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}

function Never({ children }) {
  return (
    <li className="flex gap-2 text-[11.5px] font-mono leading-relaxed">
      <span aria-hidden="true" className="font-black text-[#B3261E]">—</span>
      <span>{children}</span>
    </li>
  );
}

function Chip({ to, children }) {
  return (
    <Link
      to={to}
      className="border-2 border-[#141210] bg-[#FBF5E6] px-2.5 py-1.5 text-[10px] font-black font-mono uppercase tracking-[0.1em] active:bg-[#1B2BF0] active:text-[#FBF5E6]"
      style={{ boxShadow: '3px 3px 0 #141210' }}
    >
      {children}
    </Link>
  );
}

export default function Studio() {
  return (
    <div className="px-4 pb-14 pt-6">
      {/* ── THE BOARD, TOP LEFT ──
          Everything is set on the same grid: an eyebrow, a two-line shout, a line of plain
          words. No centred stack — the page is pinned up rather than laid out. */}
      <p className="text-[9px] font-black font-mono uppercase tracking-[0.2em] text-[#1B2BF0]">
        For whoever is still young enough to make things
      </p>
      <h1
        className="mt-2 font-black uppercase leading-[0.86] text-[#141210]"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 13vw, 68px)', letterSpacing: '-0.03em' }}
      >
        Make<br />
        <span className="text-[#1B2BF0]">something</span>
      </h1>
      <p className="mt-3 max-w-[30ch] text-[12.5px] font-mono leading-relaxed">
        A game, a mark, a badge with your own initials on it. Both tools work right here in the
        browser, on a school laptop or a phone. Nothing to install, nothing to sign.
      </p>

      <div className="mt-7 flex flex-col gap-4">
        <Print to="/Studio/Zapp" icon={Zap} kicker="build a thing" title="ZAPP" ink="#1B2BF0" tilt={-0.7}>
          Say what you want — a game about the river at the end of your street, a quiz, something that
          counts — and it is built and playing in a minute. Pick an animal to build with.
        </Print>

        <Print to="/Studio/Logo" icon={Sparkles} kicker="draw a mark" title="Logo Room" ink="#E2602A" tilt={0.7}>
          A crest for your street, a badge for the club, initials of your own. Make it, keep it, and
          use it as your picture anywhere.
        </Print>
      </div>

      {/* ── THE SUBJECT BEHIND THE MAKING ──
          The one step that turns a toy into learning, said as a piece of advice rather than a
          lesson: a game is only as good as the thing it is about. */}
      <section className="mt-10 border-2 border-[#141210] bg-[#FBF5E6] p-4" style={{ boxShadow: '7px 7px 0 #141210' }}>
        <div className="flex items-start gap-2">
          <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1B2BF0]" />
          <div>
            <p className="font-black uppercase leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: '19px', letterSpacing: '-0.01em' }}>
              Then find out if it is true
            </p>
            <p className="mt-2 text-[11.5px] font-mono leading-relaxed">
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
        <h2 className="font-black uppercase leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.01em' }}>
          What is never asked for
        </h2>
        <ul className="mt-3 space-y-2 border-l-4 border-l-[#141210] pl-3">
          <Never>No account and no password. There is nothing here to sign into.</Never>
          <Never>No name, no age, no email, no school.</Never>
          <Never>What you make stays in your own browser, on your own device.</Never>
          <Never>Everything that appears on screen is checked before it is shown.</Never>
          <Never>Nothing is sold, ranked, or shown to strangers.</Never>
        </ul>
        <p className="mt-4 border-2 border-[#141210] bg-[#FFFDF7] px-3 py-2.5 text-[11px] font-mono leading-relaxed">
          Every thing built here carries one line and no more: <span className="font-black">an AI made this, it can be
          wrong — check with a grown-up if it matters.</span>
        </p>
      </section>
    </div>
  );
}