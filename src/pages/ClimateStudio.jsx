import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Zap, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';

// ── THE STUDIO ────────────────────────────────────────────────────────────────
// The room where a young reader makes something instead of only reading. It is called
// the Studio and not the kids' section, and not the fun section, for the same reason:
// a child who is told a thing is for children can smell it. ZAPP and the logo room are
// real tools that make real things, and they are the same tools an adult uses.
//
// The two rooms come first, the reading is the point behind them, and the privacy line
// is printed in the same size as everything else rather than hidden in a footer — a
// parent reading over a shoulder should be able to find it in one glance.
//
// Nothing here collects anything. No account, no name, no age, no school, no email. What
// is made stays in the child's own browser. That is the whole legal position, and it is
// stated on the page rather than in a policy nobody opens.

function Door({ to, icon: Icon, kicker, title, children, accent }) {
  return (
    <Link
      to={createPageUrl(to)}
      className="group flex flex-col justify-between border-2 border-[#141210] bg-[#f7f1e5] p-4 lg:p-5 min-h-[168px] active:bg-[#efe7d6] transition-colors"
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-8 h-8 flex items-center justify-center border-2 border-[#141210]" style={{ background: accent }}>
            <Icon className="w-4 h-4 text-[#141210]" />
          </span>
          <span className="text-[8.5px] font-black font-mono uppercase tracking-[0.18em] text-[#5a5246]">{kicker}</span>
        </div>
        <p className="font-black uppercase text-[#141210] leading-tight mb-1.5" style={{ fontFamily: 'var(--font-display)', fontSize: '19px', letterSpacing: '-0.01em' }}>
          {title}
        </p>
        <p className="text-[11.5px] font-mono leading-relaxed text-[#141210]/80">{children}</p>
      </div>
      <span className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-black font-mono uppercase tracking-[0.14em] text-[#141210] border-b-2 border-[#141210] self-start">
        Open it <ArrowRight className="w-3 h-3" />
      </span>
    </Link>
  );
}

function Never({ children }) {
  return (
    <li className="flex gap-2 text-[11.5px] font-mono leading-relaxed text-[#141210]">
      <span aria-hidden="true" className="text-[#b3261e] font-black">—</span>
      <span>{children}</span>
    </li>
  );
}

export default function ClimateStudio() {
  return (
    <ClimateRecordShell
      eyebrow="For whoever is still young enough to make things"
      marker="Two rooms · nothing to sign up for · nothing kept of you"
      title="The Studio"
      statement="Everything here starts as something you make — a game, a mark, a badge with your own initials on it. Then you go and find out what it is actually about."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International — and released to the world, the planet, all of us."
    >
      <section className="mb-8 lg:mb-12">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-[10px] font-black font-mono text-[#e2602a]">01</span>
          <h2 className="font-black uppercase text-[#141210] leading-tight" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 1.9vw, 28px)', letterSpacing: '-0.01em' }}>
            Two rooms, both of them for making
          </h2>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <Door to="Zapp" icon={Zap} kicker="Build a thing" title="ZAPP" accent="#e2602a">
            Say what you want — a game about the river at the end of your street, a quiz, a tool that
            counts something — and it is built and playing in a minute. Pick an animal to build with.
          </Door>
          <Door to="GenerateLogo" icon={Sparkles} kicker="Draw a mark" title="The Logo Room" accent="#b3261e">
            A crest for your street, a badge for the club, initials of your own. Make it, keep it, and
            use it as your picture anywhere. Nothing to install.
          </Door>
        </div>
        <p className="mt-3 text-[11px] font-mono leading-relaxed text-[#5a5246]">
          Both work in the browser on a school laptop or a phone. No download, no account, no email.
        </p>
      </section>

      <section className="mb-8 lg:mb-12 border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 px-4 py-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] font-black font-mono text-[#1e3a2b]">02</span>
          <h2 className="font-black uppercase text-[#141210] leading-tight" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 1.8vw, 25px)', letterSpacing: '-0.01em' }}>
            Then find out whether it is true
          </h2>
        </div>
        <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
          A game is only as good as the thing it is about. Read one entry on the record — what is working,
          or what is being lost — and then build something about that. A quiz on a river that is being
          restored. A badge for a beach that gets cleaned. A counter for the birds on your street.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-[11px] font-black font-mono uppercase tracking-wide">
          <Link to={createPageUrl('TogetherChangeClimate')} className="border-b-2 border-[#141210] text-[#141210] hover:text-[#1e3a2b] hover:border-[#1e3a2b]">
            Read the record
          </Link>
          <Link to={createPageUrl('Magic51')} className="border-b-2 border-[#141210] text-[#141210] hover:text-[#1e3a2b] hover:border-[#1e3a2b]">
            Magic51
          </Link>
          <Link to={createPageUrl('Literacy51')} className="border-b-2 border-[#141210] text-[#141210] hover:text-[#1e3a2b] hover:border-[#1e3a2b]">
            Reading
          </Link>
          <Link to={createPageUrl('GeorgieMaths')} className="border-b-2 border-[#141210] text-[#141210] hover:text-[#1e3a2b] hover:border-[#1e3a2b]">
            Maths
          </Link>
        </div>
      </section>

      <section className="mb-8 lg:mb-12">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-[10px] font-black font-mono text-[#e2602a]">03</span>
          <h2 className="font-black uppercase text-[#141210] leading-tight" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 1.9vw, 28px)', letterSpacing: '-0.01em' }}>
            What is never collected
          </h2>
        </div>
        <ul className="space-y-2">
          <Never>No account and no password. There is nothing here to sign into.</Never>
          <Never>No name, no age, no email, no school. Nobody is ever asked.</Never>
          <Never>What you make stays in your own browser, on your own device. Not on our shelf.</Never>
          <Never>Everything that appears on screen is read by a check before it is shown.</Never>
          <Never>Nothing is sold, nothing is ranked, and nothing is shown to strangers.</Never>
        </ul>
      </section>

      <section className="mb-2">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] font-black font-mono text-[#e2602a]">04</span>
          <h2 className="font-black uppercase text-[#141210] leading-tight" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 1.9vw, 28px)', letterSpacing: '-0.01em' }}>
            For the grown-up in the room
          </h2>
        </div>
        <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
          A teacher can put this on a whiteboard and hand out no logins, because there are none to hand
          out. Nothing is installed, no class list is created, and no work is uploaded anywhere. Every
          thing a child builds carries one line and no more:
        </p>
        <p className="mt-3 border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2.5 text-[11.5px] font-mono leading-relaxed text-[#141210]">
          An AI made this, it can be wrong — check with a grown-up if it matters.
        </p>
        <p className="mt-3 flex items-start gap-2 text-[11px] font-mono leading-relaxed text-[#5a5246]">
          <BookOpen className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>
            If something is made that a child wants to keep past that device, the grown-up saves it there
            and then — nothing is emailed, and no address is asked for.
          </span>
        </p>
      </section>
    </ClimateRecordShell>
  );
}