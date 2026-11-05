import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CopyLine from '@/components/climate/CopyLine';
import YaleLetter from '@/components/climate/host/YaleLetter';

// ── FOR A HOST'S EYES ─────────────────────────────────────────────────────────
// The ClimateHost page answers Janine's questions and deliberately names what is
// unfinished. This is the other document: what an institution reads before it agrees
// to carry something. Same facts, different order, and the gap stated first rather
// than buried, because a university finds the gap anyway and a brief that hides it
// has already failed as evidence of method.
//
// Every number below was counted from the record itself, not from a plan.

const FIGURES = [
  { n: '19', label: 'entries published', sub: '10 solutions · 9 crises' },
  { n: '3', label: 'actions on the record', sub: 'each with the organiser’s own contact line' },
  { n: '18', label: 'wire entries', sub: 'dated, sourced, nothing unsigned' },
  { n: '13', label: 'countries', sub: 'rough regions only, never a precise location' },
  { n: '16', label: 'independent origins', sub: 'named on the entry, every time' },
  { n: '29', label: 'citations frozen', sub: 'copied as they stood, with a fingerprint' },
  { n: '65', label: 'tongues', sub: '8 written by hand, 57 machine-made, said so' },
  { n: '4', label: 'gatherings', sub: 'people working on the same thing, by region' },
];

const ASKS = [
  {
    n: '01',
    title: 'A home for the hosting',
    body: 'The record at today’s size costs £1,000 a year to carry, and £10,000 for ten years. That is the smallest part of this and it is stated plainly because a host should not have to ask twice.',
  },
  {
    n: '02',
    title: 'A named academic sponsor',
    body: 'One person who reads the method page and says in public whether it holds. Not an endorsement of the record’s contents: a verdict on its method. If it does not hold, that verdict should be published too.',
  },
  {
    n: '03',
    title: 'People, which is the whole request',
    body: 'A checker corps with one named lead. A checker reads an entry, follows its source, and signs their name to what they found: stands, needs a second origin, or comes off. That is the only thing on this list that cannot be bought, and it is the difference between a catalogue and a record with a human being in it.',
  },
  {
    n: '04',
    title: 'A keeper’s post, costed rather than unpaid',
    body: 'The record needs one person answerable for what goes on it, and a second who keeps it running. Two names, never one. A role funded at a fair rate is a role that survives a change of circumstances; a role held on evenings is a single point of failure.',
  },
  {
    n: '05',
    title: 'An honest verdict, in the open',
    body: 'If Yale’s answer is no, the record carries on and says so. If the answer is yes, the terms are published on the record where anyone can read them.',
  },
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
  'Together We Can Change the Course of Climate Change is a public record of the climate solutions that work and the crises that need saying out loud. Every entry names its origin and states how well it is known. Nothing is ranked, nothing is advertised, and nothing can be paid into a better position. It needs no account to read, it is built to be checked and copied, and it is looking for a host to carry it.';

export default function ClimateYaleBrief() {
  return (
    <ClimateRecordShell
      eyebrow="For a host · prepared for Yale"
      marker="What exists · what is missing · what is being asked"
      title="What a host would be carrying"
      statement="Nineteen entries, thirteen countries, sixteen named origins. The method is built and has been used on real entries. What it lacks is people. Read the numbers first, then the request."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International — and offered to a host, not sold to one."
    >
      <Section n="00" title="In one paragraph">
        <div className="border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 px-3 lg:px-5 py-3 lg:py-4">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#5a5246]">
              Paste this anywhere
            </span>
            <CopyLine text={ONE_PARAGRAPH} label="Copy paragraph" />
          </div>
          <p className="text-[12px] lg:text-[13px] font-mono leading-relaxed">{ONE_PARAGRAPH}</p>
        </div>
      </Section>

      <Section n="01" title="What has been built and used">
        <p>
          Not a prototype and not a plan. The record is live, and every figure below was counted from it
          rather than projected.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 border-2 border-[#141210] mt-1">
          {FIGURES.map((f, i) => (
            <div
              key={f.label}
              className={`px-3 py-3 border-[#141210]/15 ${i % 2 === 0 ? 'border-r' : ''} ${i < FIGURES.length - 2 ? 'border-b' : ''} sm:border-b sm:border-r`}
            >
              <p className="font-black text-[#141210] leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: '26px' }}>
                {f.n}
              </p>
              <p className="text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] mt-1.5 leading-snug">
                {f.label}
              </p>
              <p className="text-[9.5px] font-mono text-[#5a5246] leading-snug mt-0.5">{f.sub}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section n="02" title="The method, in four rules">
        <p>
          <strong>Every entry carries its origin.</strong> A body’s own statement, a peer-reviewed journal,
          published media, an organisation on the ground, a first-hand dispatch, or a document. Which one it
          is, is printed on the entry.
        </p>
        <p>
          <strong>Every entry says how well it is known.</strong> One of three labels, and it is shown before
          the headline: <em>official record</em>, <em>corroborated</em> by two independent origins, or{' '}
          <em>single source</em>. The record will not print the second one without a second origin actually
          named, which is why most of it currently reads single source. That is the honest answer, not a
          shortfall in the code.
        </p>
        <p>
          <strong>No source, no entry.</strong> An entry with no traceable origin waits in a holding pen until
          a person finds the source or leaves it out. Citations are frozen as they stood, with a fingerprint,
          so a quote cannot quietly drift. An origin that would rather its copy were not kept can say so and
          the copy comes off.
        </p>
        <p>
          <strong>Corrections happen in daylight.</strong> A wrong entry is corrected on the entry itself,
          with the date and what changed. Nothing is edited quietly and nothing disappears. A machine may
          only ever say one thing: clean enough to go up, or wait for a person. It never rules on whether a
          claim is true and never signs with anybody’s name.
        </p>
      </Section>

      <Section n="03" title="What is not done, stated before it is found">
        <p className="border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 lg:px-5 py-3 lg:py-4">
          <strong>Independent checking has not begun.</strong> The office of checker exists on this record and
          nobody has yet signed a verdict in it. The audit trail is built and is empty. The verification
          labels are honest but thin: six entries carry one, and fourteen carry none because nobody has set
          one. Nineteen entries is a demonstration, not a corpus.
        </p>
        <p>
          The record also has no named keeper yet, and its source is not yet published. Both are being
          settled, and both are stated on the page that answers the founder’s questions rather than rounded
          up here.
        </p>
        <p>
          This is the whole reason for the approach. The machinery for independent checking is written and
          has been used to build nineteen worked examples. What it does not have is people. Asking a
          university for hosting would be asking for the cheapest part and the least useful. The request
          below is for the part that cannot be bought.
        </p>
      </Section>

      <Section n="04" title="What is being asked of a host">
        <div className="border-2 border-[#141210] divide-y divide-[#141210]/15">
          {ASKS.map((a) => (
            <div key={a.n} className="px-3 lg:px-4 py-3">
              <div className="flex items-baseline gap-2">
                <span className="text-[9.5px] font-black font-mono text-[#b3261e]">{a.n}</span>
                <h3 className="text-[11.5px] lg:text-[12.5px] font-black font-mono uppercase tracking-wide text-[#141210]">
                  {a.title}
                </h3>
              </div>
              <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#3a342c] mt-1.5">
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section n="05" title="What a host does not get">
        <p>
          No editorial control over what an entry says. No ability to remove an entry without a dated
          correction where anyone can see it. No ownership of the record’s address or its data. No lock-in:
          the whole thing exports on request, so no host can hold the record hostage and no host is trapped
          by it either.
        </p>
        <p>
          Money never buys a place on the record, a place in an entry, or a change to a claim. That rule is
          already written on the method page and it binds a host exactly as it binds us.
        </p>
      </Section>

      <Section n="06" title="What a host does get">
        <p>
          A teaching instrument with real provenance, where a student can follow any claim to the thing it
          came from without asking anyone’s permission. A research corpus that says out loud what it does not
          know. And a method published in full, so a department can test it, criticise it in print, or copy it
          for another subject entirely.
        </p>
        <p>
          A host’s name would sit at the head of it, credited on every page, with the founder’s work beside
          it rather than replaced by it.
        </p>
      </Section>

      <Section n="07" title="Who holds it today">
        <p>
          Universal Frequency 51 CIC, a community interest company registered in Scotland (SC870603), with two
          directors. No advertising, no sponsorship, no paid placement, and nothing on the record is for sale.
          The record was built at no cost to the founder and is offered to a host rather than sold to one.
        </p>
        <p>
          The terms a host agrees are published on the record itself, not kept in a drawer. Both the method
          and the terms are pages anyone can read before speaking to a person.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Link
            to={createPageUrl('ClimateMethod')}
            className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors"
          >
            Read the method
          </Link>
          <Link
            to={createPageUrl('ClimateHandover')}
            className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors"
          >
            What changes hands
          </Link>
          <Link
            to={createPageUrl('ClimateFounder')}
            className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors"
          >
            Janine and Horizon
          </Link>
        </div>
      </Section>

      <Section n="08" title="If the answer is no">
        <p>
          The record carries on. It is not built to need any particular host, and it will say plainly what it
          is and is not, whether or not anybody funds it. A no costs the record nothing except time, and is
          better than a maybe that lasts a year.
        </p>
      </Section>

      <Section n="09" title="The letter">
        <p>
          Written for the founder to change and sign, because the introduction should come from her and not
          from the people who built the thing.
        </p>
        <YaleLetter />
      </Section>

      <p className="text-[11px] lg:text-[12px] font-mono leading-relaxed text-[#5a5246] border-t-2 border-[#141210]/20 pt-3">
        Every figure on this page was counted from the record. Where a thing is not built it says so, and
        this page is corrected in the open when that changes.
      </p>
    </ClimateRecordShell>
  );
}