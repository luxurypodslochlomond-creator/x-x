import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CopyLine from '@/components/climate/CopyLine';
import YaleLetter from '@/components/climate/host/YaleLetter';
import { useRecordFigures, show, TONGUES, HAND_WRITTEN_TONGUES } from '@/components/climate/recordFigures';

// ── THE SUMMARY ──────────────────────────────────────────────────────────────
// Not a pitch, and not a letter. Janine asked for the one thing that would help
// her write to Yale in her own words: where this actually is, and what it needs.
// So the page leads with what does not exist. A record that hides its gaps is a
// brochure, and the first thing a reader like Yale checks is whether the gaps
// have been declared before they were found.
//
// Nothing on this page asks her for money, because she has said she has none for
// it and neither do we. The ask is people and carrying. That is the whole summary.

// Every line with a figure in it walks to the thing it counts. A number a reader cannot
// reach is a number asking to be believed, and this page exists precisely so that nobody
// has to take our word for anything on it.
// ── EVERY FIGURE ON THIS PAGE IS ASKED, NOT REMEMBERED ───────────────────────────
// These two lists used to be constants with numbers typed into them, on a page that ends by
// saying every figure here was counted from the record. Three of those numbers had already
// stopped being true, and one of them — "14 of 19 entries carry no statement of how well they
// are known" — accused the record of a worse gap than it has: the real figure was four. Being
// wrong against yourself is still being wrong, and a document that goes to an institution is
// the last place on earth to be wrong about anything.
//
// So they are functions of the live counts now. And where a true figure cannot be counted by
// whoever is reading this page — the roster is closed to the record's own keys, the verdicts
// live in a custodian's office — the line is phrased without a number rather than with a stale
// one, and the three custodians are named instead of counted, because names can be checked and a
// numeral cannot.
const existsItems = (f) => [
  { t: `${show(f?.entries)} published entries — ${show(f?.solutions)} solutions, ${show(f?.crises)} crises`, to: 'TogetherChangeClimate' },
  { t: 'Every one of them carries a working link to its origin. No entry survives without one.', to: 'TogetherChangeClimate' },
  { t: `${show(f?.seals)} cryptographic seals — each entry fingerprinted, checkable in a reader’s own browser`, to: 'ClimateSeals' },
  { t: `${show(f?.wire)} wire entries, dated and sourced`, to: 'ClimateWire' },
  { t: `${show(f?.actions)} actions, each with an organiser’s own contact line`, to: 'TogetherChangeClimate' },
  { t: `${TONGUES} tongues, ${HAND_WRITTEN_TONGUES} written by hand and ${TONGUES - HAND_WRITTEN_TONGUES} made by machine, every one labelled as what it is`, to: 'TogetherChangeClimate' },
  { t: 'Custodians on the roster, named rather than counted: Gillian Barbara Brown, Brian Hughes, Janine Selendy', to: 'ClimateHandover' },
  { t: 'No account needed to read any of it. No tracking, no advertising, no paid placement.', to: 'ClimatePrivacy' },
];

const notYetItems = (f) => [
  { t: 'No independent verdicts. The checking office is built and nobody has signed into it.', to: 'ClimateFellows' },
  { t: `${show(f?.noVerification)} of ${show(f?.entries)} entries carry no statement of how well they are known.`, to: 'ClimateMethod' },
  { t: `${show(f?.groupsNoContact)} of ${show(f?.groups)} groups have no contact line, so nobody can actually join one yet.`, to: 'TogetherChangeClimate' },
  { t: `${show(f?.unsigned)} of ${show(f?.entries)} entries are unsigned. Nothing is attributed to a person who did not write it, and each entry says plainly that it is unsigned.`, to: 'ClimateMethod' },
  { t: 'The code is not public, so it cannot yet be audited or carried away.', to: 'ExtractionProofCovenant' },
  { t: 'No witness has yet been invited, so the checking office has had nobody in it.', to: 'ClimateFellows' },
];

const NEEDS = [
  {
    n: '01',
    title: 'One reader with standing',
    body: 'A person, ideally inside an institution that teaches this, who reads the method and says in public whether it holds. Not an endorsement of the contents — a verdict on the method. If it fails, that gets published too.',
  },
  {
    n: '02',
    title: 'People who check',
    body: 'A witness reads an entry, follows its source, and signs their name to what they found. There are none. This is the only item on this page that cannot be built, bought, or automated — it is the reason for writing to anyone at all.',
  },
  {
    n: '03',
    title: 'Somebody to carry it',
    body: 'The technology, its building and its upkeep — and a fair living for the two people in Scotland who build it, so that tending this is the work rather than something done after it. Hosting itself is £1,000 a year at this size, £10,000 for ten years.',
  },
];

const missingItems = (f) => [
  ['Put a real name on every entry', 'Custodians sign their own when they are ready. Until then the record says each entry is unsigned rather than borrowing a name.'],
  ['Invite the first witnesses', 'Two or three named volunteers, and the checking office stops being empty.'],
  [`State the standing on all ${show(f?.entries)}`, `${show(f?.entries == null || f?.noVerification == null ? null : f.entries - f.noVerification)} do. ${show(f?.noVerification)} do not. An afternoon.`],
  ['Publish the code', 'Days rather than months. Until then nothing here can honestly be called auditable.'],
];

const NO_MONEY =
  'Nobody in this has the money for it. The founder it is built in honour of has said plainly that she does not, the two who built it are a community interest company in Scotland with no reserves, and no grant has been taken. That is why nothing on this page asks anybody for a cheque. It asks for people who can check it and a host who can carry it — and says so in that order, because the people matter more and are harder to get.';

// The copyable text is built from the same live counts as the page, so a reader who copies it
// into a letter is not carrying a different set of numbers to the one they just read.
const plainSummary = (f) => `THE SUMMARY — where the climate record is, and what it needs

WHAT IT IS
A public record of the climate solutions that work and the crises that need saying out loud. Every entry names its origin, states how well it is known, and carries a fingerprint anyone can check in their own browser. Nothing is ranked, nothing is advertised, nothing can be paid into a better position, and no account is needed to read any of it.

WHAT EXISTS TONIGHT
${show(f?.entries)} published entries (${show(f?.solutions)} solutions, ${show(f?.crises)} crises), every one with a working link to its origin.
${show(f?.seals)} cryptographic seals, each recomputable by a reader without trusting us.
${show(f?.wire)} wire entries, dated and sourced. ${show(f?.actions)} actions with organiser contact lines. ${TONGUES} tongues, each labelled by how it was made.
Custodians on the roster, named rather than counted: Gillian Barbara Brown, Brian Hughes, Janine Selendy.

WHAT DOES NOT EXIST YET
No independent verdicts — the checking office is built and empty.
${show(f?.noVerification)} of ${show(f?.entries)} entries carry no statement of how well they are known.
${show(f?.groupsNoContact)} of ${show(f?.groups)} groups have no contact line yet.
${show(f?.unsigned)} of ${show(f?.entries)} entries are unsigned, and each one says so rather than borrowing a name.
The code is not public, so it cannot yet be audited or carried away.
No checker has yet been invited, so nobody has been in the checking office.

WHAT IT NEEDS
1. One reader with standing — someone who reads the method and says in public whether it holds. Not an endorsement of the contents: a verdict on the method.
2. People who check — a checker reads an entry, follows its source, and signs their name. There are none, and this cannot be built or bought.
3. Somebody to carry it — the technology, its upkeep, and a fair living for the two people who build it. Hosting is £1,000 a year at this size, £10,000 for ten years.

WHAT STILL HAS TO HAPPEN BEFORE IT COULD BE CALLED FINISHED
Put a real name on every entry, as custodians are ready to sign their own. Invite the first witnesses. State the standing on all ${show(f?.entries)}. Publish the code.

ONE CORRECTION, MADE IN THE OPEN
39 entries previously carried the founder's name. She did not write them. All 39 were set back to unsigned on 6 November 2026, and this line is the record of it.

WHY IT HOLDS UP
The seal is the whole argument: an entry is fingerprinted by the server, and the fingerprint is recomputed in the reader's browser. If the words move, the fingerprints stop matching and the record says so in public. Nobody has to trust the people who built this to check it.

ON MONEY
Nobody in this has any. The founder it honours has said she does not, the two who built it are an asset-locked community interest company with no reserves, and no grant has been taken. Nothing here asks for a cheque. It asks for people who can check it, and a host who can carry it.`;

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

function Column({ tone, heading, items }) {
  return (
    <div className="border-2 border-[#141210]">
      <p className={`px-3 py-2 text-[9.5px] font-black font-mono uppercase tracking-[0.18em] border-b-2 border-[#141210] ${tone}`}>
        {heading}
      </p>
      <ul className="divide-y divide-[#141210]/12">
        {items.map((item) => (
          <li key={item.t}>
            <Link
              to={createPageUrl(item.to)}
              className="group flex items-start gap-2 px-3 py-2 text-[11px] lg:text-[11.5px] font-mono leading-relaxed text-[#141210] hover:bg-[#141210]/5 hover:text-[#b3261e] transition-colors"
            >
              <span className="flex-1">{item.t}</span>
              <span aria-hidden="true" className="text-[#141210]/35 group-hover:text-[#b3261e] flex-shrink-0">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ClimateYaleBrief() {
  // Counted as the page opens. Until the answers come back every figure prints a dash — which
  // is the honest thing to print while you do not yet know, and the reason a reader never sees
  // a number here that was true at some other time.
  const f = useRecordFigures();

  return (
    <ClimateRecordShell
      eyebrow="For Janine · the summary, to use as she likes"
      marker="Where it is · what it needs · what is still missing"
      title="The Summary"
      statement="One page, no asking voice. What exists tonight, what does not, what it would take, and who it is for. Written to be handed over, copied whole, or read straight into a letter of her own."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Forty years of her work, carried into a record that does not need her to be alive to defend it — and cannot be bought out from under the people it was built for. For Janine. For whoever is reading it in a hundred years."
    >
      <div className="flex flex-wrap items-center gap-2 mb-7">
        <CopyLine text={plainSummary(f)} label="Copy the summary" />
        <Link
          to={createPageUrl('ClimateHost')}
          className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors"
        >
          Her five questions, answered
        </Link>
        {/* The letter is no longer printed on this page or on the brief: a letter belongs
            to the person who signs it, so it sits behind the record's own key. */}
        <Link
          to={createPageUrl('ClimateBrief')}
          className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors"
        >
          The brief
        </Link>
      </div>

      <Section n="01" title="What this is">
        <p>
          A public record of the climate solutions that work and the crises that need saying out loud. Every entry
          names its origin, states how well it is known, and carries a fingerprint anyone can check in their own
          browser.
        </p>
        <p>
          It is not a feed. Nothing is ranked, nothing is advertised, nothing can be paid into a better position, and
          no account is needed to read any of it — in any language, on any phone.
        </p>
      </Section>

      <Section n="02" title="Where it is, exactly">
        <p>
          Counted from the record, not projected. The right-hand column is the honest half, and it is printed first
          on purpose: an institute looks for whether the gaps were declared before they were found.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-1">
          <Column tone="bg-[#1e3a2b]/10 text-[#1e3a2b]" heading="Exists tonight" items={existsItems(f)} />
          <Column tone="bg-[#b3261e]/10 text-[#b3261e]" heading="Does not exist yet" items={notYetItems(f)} />
        </div>
        <p className="text-[11px] font-mono leading-relaxed text-[#5a5246] border-l-4 border-l-[#141210]/25 pl-3 mt-1">
          One correction, made in the open: 39 entries previously carried the founder’s name. She did not write
          them. All 39 were set back to unsigned on 6 November 2026.
        </p>
      </Section>

      <Section n="03" title="What it needs">
        <p>Three things, in the order that matters. The first two are why a letter gets written at all.</p>
        <div className="border-2 border-[#141210] divide-y divide-[#141210]/15 mt-1">
          {NEEDS.map((a) => (
            <div key={a.n} className="px-3 lg:px-4 py-3">
              <div className="flex items-baseline gap-2">
                <span className="text-[9.5px] font-black font-mono text-[#b3261e]">{a.n}</span>
                <h3 className="text-[11.5px] lg:text-[12.5px] font-black font-mono uppercase tracking-wide text-[#141210]">{a.title}</h3>
              </div>
              <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#3a342c] mt-1.5">{a.body}</p>
            </div>
          ))}
        </div>
        {/* A block here listed the five institutions she might approach, by name and link.
            It is gone, and the reason is the same one that took her signature off the
            letter: naming a prospective host before she has written to them, and before
            they have said anything at all, is a claim made on somebody else's behalf. A
            host's name belongs on the envelope of the letter she sends and nowhere else
            until they answer. If one of them says yes, the name goes on this page the same
            day, with their agreement beside it. */}
      </Section>

      <Section n="04" title="What is still missing">
        <p>Days of work, not years. Said out loud so nobody has to discover it.</p>
        <div className="border-2 border-[#141210] divide-y divide-[#141210]/15 mt-1">
          {missingItems(f).map(([what, why]) => (
            <div key={what} className="px-3 lg:px-4 py-2.5">
              <p className="text-[10.5px] font-black font-mono uppercase tracking-[0.12em] text-[#141210]">{what}</p>
              <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#3a342c] mt-1">{why}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section n="05" title="Why it holds up">
        <p>
          The seal is the whole argument. An entry is fingerprinted by the record's own server, and that fingerprint
          is recomputed in the reader's browser. If the words move, the fingerprints stop matching and the record
          says so about itself, in public. Nobody has to trust the people who built this in order to check it.
        </p>
        <p>
          What it refuses matters as much: no anonymous claims, no trending, no volume targets, no advertising, no
          paid placement, no lock-in. Any host may leave with everything.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Link to={createPageUrl('ClimateSeals')} className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors">Check a seal</Link>
          <Link to={createPageUrl('ClimateMethod')} className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors">The method</Link>
          <Link to={createPageUrl('ClimateHandover')} className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors">What changes hands</Link>
        </div>
      </Section>

      <Section n="06" title="On money">
        <div className="border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 lg:px-5 py-3 lg:py-4">
          <p>{NO_MONEY}</p>
        </div>
      </Section>

      <Section n="07" title="The letter, ready to send">
        <p>
          Three paragraphs, and no fourth: where the record stands, what is genuinely missing, and what it
          needs. Dated the day it is printed, and left for her to sign: four blanks, and all four are hers —
          the name, the department, the institution and the signature. Download it as a PDF, or copy the text
          into her own letter. Nothing has been invented, and nothing is signed on her behalf.
        </p>
      </Section>

      <YaleLetter />

      <p className="text-[11px] lg:text-[12px] font-mono leading-relaxed text-[#5a5246] border-t-2 border-[#141210]/20 pt-3 mt-8">
        Every figure here was counted from the record as this page opened — not typed in once and left to
        age. Where a count could not be made, the page prints a dash rather than the last number anyone
        wrote down, and where a true figure cannot be counted by whoever is reading, the line is written
        without a number at all. When something on this page stops being true it gets corrected in the
        open, like anything else on it.
      </p>
    </ClimateRecordShell>
  );
}