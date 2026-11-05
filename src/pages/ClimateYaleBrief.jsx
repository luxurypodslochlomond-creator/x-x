import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CopyLine from '@/components/climate/CopyLine';
import YaleLetter from '@/components/climate/host/YaleLetter';

// ── WHAT GOES TO YALE ─────────────────────────────────────────────────────────
// Two documents in one page, because a letter to a place like Yale is never just a
// letter: it is a short covering letter and an enclosure that answers everything the
// letter is too polite to spell out.
//
//   The letter    — hers, in her voice, signed by her.
//   The enclosure — the record's own account of itself: what it is, what is unusual,
//                   where it honestly stands, what is left before launch, what is asked.
//
// Every figure below was counted from the record. The launch list is finite and small
// on purpose: a reader should finish it knowing exactly what is stopping this, and how
// little of it is.

const FIGURES = [
  { n: '19', label: 'entries published', sub: '10 solutions · 9 crises' },
  { n: '3', label: 'actions on the record', sub: 'each with an organiser’s own contact line' },
  { n: '18', label: 'wire entries', sub: 'dated and sourced, none unsigned' },
  { n: '13', label: 'countries', sub: 'rough regions only, never a precise location' },
  { n: '16', label: 'independent origins', sub: 'named on the entry, every time' },
  { n: '44', label: 'sealed entries', sub: 'fingerprinted and checkable by anyone' },
  { n: '29', label: 'citations frozen', sub: 'copied as they stood, with a fingerprint' },
  { n: '65', label: 'tongues', sub: '8 written by hand, 57 machine-made, said so' },
];

const LAUNCH = [
  {
    n: '1',
    what: 'Sign every entry with the name of the person who actually published it',
    why: 'All nineteen currently carry the founder’s name, and she did not write them. It is the first thing a panel checks, and the last thing a record can be careless about.',
    how: 'One evening. A keeper, one entry at a time.',
  },
  {
    n: '2',
    what: 'Name the keeper',
    why: 'A record meant to carry one accountable name and one contact line. Right now it carries neither, and a masthead will not be invented in the meantime.',
    how: 'A decision, not work. One name and one address.',
  },
  {
    n: '3',
    what: 'Set the standing on every entry',
    why: 'Six entries say how well they are known. Fourteen say nothing, which is honest but thin: a reader should never have to guess.',
    how: 'An afternoon. A keeper, reading each source once.',
  },
  {
    n: '4',
    what: 'Publish the source',
    why: 'Until the code is public a host cannot audit it, build it, or leave with it. This is the largest single gap on the record.',
    how: 'Days, not weeks. It is written and it exports.',
  },
  {
    n: '5',
    what: 'One launch address of its own',
    why: 'A record whose address belongs to somebody else is lent, not handed over. Every citation printed today points at a domain that can change hands.',
    how: 'An afternoon and a small yearly cost.',
  },
  {
    n: '6',
    what: 'The first independent verdicts',
    why: 'Not needed to show the record. Needed before anyone may call it checked. This is the one item on the list that money does not close.',
    how: 'People. The reason for the letter.',
  },
];

const ASKS = [
  { n: '01', title: 'A named academic sponsor', body: 'One person who reads the method and says in public whether it holds. Not an endorsement of the contents: a verdict on the method. If it fails, that is published too.' },
  { n: '02', title: 'A checker corps, with one named lead', body: 'People who read an entry, follow its source, and sign their name to what they found. The only item on any list here that cannot be bought.' },
  { n: '03', title: 'Consideration of carrying it', body: 'The hosting is £1,000 a year at present size, and £10,000 for ten years. That is the cheapest part of this and it is stated plainly so nobody has to ask twice.' },
  { n: '04', title: 'An honest verdict, in the open', body: 'If the answer is no, the record carries on and says so. If it is yes, the terms are published on the record where anyone can read them.' },
];

const PARTS = [
  'Letterhead and the company number',
  'A date and a named recipient',
  'A Re: line that says what this is and what is asked',
  'Who is writing, and why now',
  'What the record is, in one paragraph',
  'Three things that make it different',
  'Where it honestly stands',
  'A numbered ask',
  'An enclosure index',
  'A signature block',
];

function Section({ n, title, children }) {
  return (
    <section className="mb-8 lg:mb-11">
      <div className="flex items-baseline gap-2 mb-2.5">
        <span className="text-[10px] font-black font-mono text-[#e2602a]">{n}</span>
        <h2
          className="font-black uppercase text-[#141210] leading-tight"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 1.9vw, 27px)', letterSpacing: '-0.01em' }}
        >
          {title}
        </h2>
      </div>
      <div className="space-y-3 text-[12px] lg:text-[13px] font-mono leading-relaxed lg:leading-[1.8] text-[#141210]">
        {children}
      </div>
    </section>
  );
}

const ONE_PARAGRAPH =
  'Together We Can Change the Course of Climate Change is a public record of the climate solutions that work and the crises that need saying out loud. Every entry names its origin and states how well it is known, and every entry carries a fingerprint anyone can check in their own browser. Nothing is ranked, nothing is advertised, and nothing can be paid into a better position. It needs no account to read, it is built to be checked and copied, and it is looking for a host to carry it.';

export default function ClimateYaleBrief() {
  return (
    <ClimateRecordShell
      eyebrow="For Janine · the letter and what goes with it"
      marker="A covering letter · an enclosure · what is left before launch"
      title="What Yale would be sent"
      statement="A short letter in her voice, and the enclosure a place like Yale reads before it answers: what this is, what is unusual, where it honestly stands, what is still missing, and what is being asked."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International — and offered to a host, not sold to one."
    >
      <Section n="00" title="What a letter like this is expected to carry">
        <p>
          A university reads a letter like this against a shape it already knows. Miss a part and it reads as an
          approach from somebody who does not know how institutions decide. All ten are here.
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 mt-1">
          {PARTS.map((p) => (
            <li key={p} className="flex items-start gap-2 text-[11.5px] leading-snug">
              <span className="font-black text-[#1e3a2b] flex-shrink-0">✓</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <p className="border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2.5 mt-2">
          Two things only she can fill: the recipient's name, and her own account of her work. Nothing
          biographical has been invented anywhere on this page, because a letter that guessed at a life's work
          would fail at the first thing Yale checked.
        </p>
      </Section>

      <Section n="01" title="The letter">
        <YaleLetter />
      </Section>

      <div className="border-t-2 border-[#141210]/20 pt-6 mb-8">
        <p className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#5a5246]">
          The enclosure · what the letter refers to
        </p>
      </div>

      <Section n="02" title="The record, in one paragraph">
        <div className="border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 px-3 lg:px-5 py-3 lg:py-4">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#5a5246]">Paste this anywhere</span>
            <CopyLine text={ONE_PARAGRAPH} label="Copy paragraph" />
          </div>
          <p className="text-[12px] lg:text-[13px] font-mono leading-relaxed">{ONE_PARAGRAPH}</p>
        </div>
      </Section>

      <Section n="03" title="Where it stands today">
        <p>Counted from the record this week, not projected.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 border-2 border-[#141210] mt-1">
          {FIGURES.map((f, i) => (
            <div key={f.label} className={`px-3 py-3 border-[#141210]/15 ${i % 2 === 0 ? 'border-r' : ''} ${i < FIGURES.length - 2 ? 'border-b' : ''} sm:border-b sm:border-r`}>
              <p className="font-black text-[#141210] leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: '26px' }}>{f.n}</p>
              <p className="text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] mt-1.5 leading-snug">{f.label}</p>
              <p className="text-[9.5px] font-mono text-[#5a5246] leading-snug mt-0.5">{f.sub}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section n="04" title="What is still missing before launch">
        <p>
          Six things. Not a roadmap, and not a wish list: the whole distance between what exists tonight and a
          record that could be handed to a host without a caveat. Four of the six are days of work.
        </p>
        <div className="border-2 border-[#141210] divide-y divide-[#141210]/15 mt-1">
          {LAUNCH.map((item) => (
            <div key={item.n} className="px-3 lg:px-4 py-3">
              <div className="flex items-baseline gap-2">
                <span className="text-[9.5px] font-black font-mono text-[#b3261e]">{item.n}</span>
                <h3 className="text-[11.5px] lg:text-[12.5px] font-black font-mono uppercase tracking-wide text-[#141210] leading-snug">{item.what}</h3>
              </div>
              <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#3a342c] mt-1.5">{item.why}</p>
              <p className="text-[10px] font-mono uppercase tracking-wide text-[#8a8375] mt-1.5">{item.how}</p>
            </div>
          ))}
        </div>
        <p>
          Five of the six are ours. The sixth is why this page exists: no amount of building closes it, and it is
          the only one that changes what the record is rather than what it has.
        </p>
      </Section>

      <Section n="05" title="What is being asked of a host">
        <div className="border-2 border-[#141210] divide-y divide-[#141210]/15">
          {ASKS.map((a) => (
            <div key={a.n} className="px-3 lg:px-4 py-3">
              <div className="flex items-baseline gap-2">
                <span className="text-[9.5px] font-black font-mono text-[#b3261e]">{a.n}</span>
                <h3 className="text-[11.5px] lg:text-[12.5px] font-black font-mono uppercase tracking-wide text-[#141210]">{a.title}</h3>
              </div>
              <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#3a342c] mt-1.5">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section n="06" title="The ground it stands on">
        <p>
          The whole covenant is one line, and it is the record's own: <strong>x = x</strong>. A thing is what it
          is. Nothing on the record may be dressed up, and no one who tends it is above the rule they apply to it.
        </p>
        <p>
          From that follows the extraction-proof part, written down and published rather than promised: no
          advertising, no paid placement, no ranking, no lock-in, and a full export on request. Any host may leave
          with everything, and the record may leave any host. That protects them as much as it protects this.
        </p>
        <p>
          It was built in Scotland by two directors of a community interest company, around caring for family, and
          the company has no paid staff. The record was built at no cost to its founder. That is not a plea: it is
          the reason it can be offered instead of sold.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Link to={createPageUrl('XEqualsX')} className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors">x = x</Link>
          <Link to="/ExtractionProofCovenant" className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors">Extraction-proof</Link>
          <Link to={createPageUrl('ClimateSeals')} className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors">The seal</Link>
          <Link to={createPageUrl('ClimateMethod')} className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors">The method</Link>
          <Link to={createPageUrl('ClimateHandover')} className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors">What changes hands</Link>
        </div>
      </Section>

      <Section n="07" title="If the answer is no">
        <p>
          The record carries on. It is not built to need any particular host, and it will say plainly what it is
          and is not, whether or not anybody funds it. A no costs the record nothing except time, and is better
          than a maybe that lasts a year.
        </p>
      </Section>

      <p className="text-[11px] lg:text-[12px] font-mono leading-relaxed text-[#5a5246] border-t-2 border-[#141210]/20 pt-3">
        Every figure on this page was counted from the record. Where a thing is not built it says so, and this
        page is corrected in the open when that changes.
      </p>
    </ClimateRecordShell>
  );
}