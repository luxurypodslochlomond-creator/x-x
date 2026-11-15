import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildGuideShareCard } from '@/components/climate/shareCardImage';
import AskTheRecord from '@/components/climate/AskTheRecord';

// The note a volunteer reads before they arrive. It used to be nine blocks of prose at
// twelve pixels — a briefing document, and nobody reads a briefing document on a phone.
// The job is one sentence, so the page is now that sentence, three cards, and the way in.
// Nothing has been dropped that a person needs; the words that were doing the persuading
// rather than the explaining have gone.

const JOBS = [
  { n: '01', title: 'Check three entries', line: 'Pick the ones you half believe, not the easy ones.' },
  { n: '02', title: 'Bring one thing', line: 'Something working that others could copy — with its origin attached. Not a screenshot.' },
  { n: '03', title: 'Find one you think is wrong', line: 'Not to be polite about it. This is the most useful hour anybody gives this record.' },
];

// ── WHAT YOU KEEP, SAID AS IT ACTUALLY IS ──────────────────────────────────────
// Two of these three lines were not true, and a volunteer would have found out the day
// they wrote their first note. A checker's note is read by the keepers — it is not printed
// under the entry for the world, because the note names a person and says what they found,
// and printing that beside an entry would be a verdict on the origin, which the record is
// not entitled to give. What is public is their line on the roll, and the count of what
// they signed, drawn from the notes themselves. So the promise is the roll and the card,
// not a link with your name underneath somebody else's page.
const KEEP = [
  'Your name on every note you write — and no way to rewrite one afterwards. There is no edit path for a note, and a note is never deleted when a person leaves.',
  'Your name on the roll, with the work counted from your notes themselves, and a card you can hand to anyone who asks.',
  'Your email stays private. It is never on the roll, never beside a note, and kept only to reach you about your own.',
];

const NOT = [
  'No training course, no dashboard to learn, no weekly call to sit through.',
  'No quota, and no word like “content”.',
  'Nothing rewritten under your name. Nothing published as yours that you did not write.',
];

function Label({ children }) {
  return <p className="text-[10px] font-black font-mono uppercase tracking-[0.22em] text-[#6b6258] mb-2">{children}</p>;
}

export default function ClimateFellows() {
  return (
    <ClimateRecordShell
      eyebrow="For whoever is coming to help"
      marker="The job · what you keep · the way in"
      title="If you are coming to help"
      statement="Open the link. Read what the source actually says. Then say whether it holds. That is the whole job."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International — and released to the world, the planet, all of us."
    >
      {/* ── THE ONE RULE ── */}
      <section className="border-2 border-[#141210] bg-[#1e3a2b] px-4 py-5 lg:px-6 lg:py-6 mb-9">
        <p className="text-[10px] font-black font-mono uppercase tracking-[0.22em] text-[#f4efe4]/60 mb-2">The one rule</p>
        <p className="text-[#f4efe4] leading-tight" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 6vw, 34px)', letterSpacing: '-0.01em' }}>
          No source, no entry.
        </p>
        <p className="text-[12px] font-mono text-[#f4efe4]/75 leading-relaxed mt-2">
          If a claim cannot be traced to something outside this record, it does not go up.
        </p>
      </section>

      {/* ── ASK IT, BEFORE COMMITTING AN HOUR ────────────────────────────────────────
          Somebody deciding whether to volunteer has four questions and no wish to email a
          stranger to ask them. This answers from the manual, in their tongue, typed or spoken,
          and refuses to guess — which is the same promise the checking itself makes. */}
      <AskTheRecord
        suggestions={[
          'What does a checker actually do?',
          'How much time does this really take?',
          'Will my name be on what I write?',
        ]}
      />

      {/* ── THREE JOBS ── */}
      <section className="mb-9">
        <Label>Three sessions, not a programme</Label>
        <div className="grid gap-3 lg:grid-cols-3">
          {JOBS.map(job => (
            <div key={job.n} className="border-2 border-[#141210] bg-[#efe7d6] p-4">
              <span className="inline-grid place-items-center min-w-[1.9rem] h-[1.9rem] border-2 border-[#141210] bg-[#e2602a] text-[#f4efe4] text-[11px] font-black font-mono -rotate-3 mb-3">{job.n}</span>
              <h2 className="font-black uppercase text-[#141210] leading-tight mb-1.5" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 5vw, 22px)' }}>{job.title}</h2>
              <p className="text-[13px] text-[#141210]/80 leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>{job.line}</p>
            </div>
          ))}
        </div>
        <p className="text-[11.5px] font-mono text-[#6b6258] leading-relaxed mt-3">
          An hour is the real commitment. Nobody is counting it, and nobody will ask you for it.
        </p>
      </section>

      {/* ── KEEP / NOT ── */}
      <section className="grid gap-4 lg:grid-cols-2 mb-9">
        <div>
          <Label>What you keep</Label>
          <ul className="space-y-2.5">
            {KEEP.map(line => (
              <li key={line} className="relative pl-5 text-[13px] text-[#141210] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
                <span className="absolute left-0 top-0 text-[#1e3a2b] font-black">✓</span>{line}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Label>What we will not do</Label>
          <ul className="space-y-2.5">
            {NOT.map(line => (
              <li key={line} className="relative pl-5 text-[13px] text-[#141210] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
                <span className="absolute left-0 top-0 text-[#b3261e] font-black">✕</span>{line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── THE WAY IN ── */}
      <section className="border-t-2 border-[#141210] pt-5 mb-9">
        <Label>The way in — no form, no interview</Label>
        <ol className="space-y-2.5 mb-5">
          <li className="text-[13px] text-[#141210] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
            <strong>One line to a keeper:</strong> your name exactly as you want it signed, and the address you will sign in with.
          </li>
          <li className="text-[13px] text-[#141210] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
            <strong>A keeper types both onto the list</strong> and the record writes to you at that address with your way in. One keeper’s word is enough — a pair of eyes is not a set of keys.
          </li>
          <li className="text-[13px] text-[#141210] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
            <strong>Then read the <Link to={createPageUrl('ClimateMethod')} className="border-b-2 border-[#141210] font-bold">method</Link></strong> — it is the standard your notes will be held to. Put a line of your own on <Link to="/ClimateRoll" className="border-b-2 border-[#141210] font-bold">the roll</Link> whenever you like.
          </li>
        </ol>
        <Link
          to={createPageUrl('ClimateChecking')}
          className="inline-flex w-full lg:w-auto items-center justify-center min-h-[52px] px-6 bg-[#141210] text-[#f4efe4] text-[13px] font-black font-mono uppercase tracking-[0.16em] active:translate-y-px"
        >
          Open the checking page
        </Link>
      </section>

      {/* ── THE HONEST PART ── */}
      <section className="border-l-4 border-l-[#e2602a] bg-[#e2602a]/10 px-4 py-3 mb-9">
        <p className="text-[12.5px] text-[#141210] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
          Most of it is boring. Most entries are broadly right and nobody will read your note on them. The interesting ones are rare — which is exactly why finding one is worth the afternoon. Stop after three sessions and you owe this record nothing.
        </p>
        <p className="text-[12.5px] text-[#141210]/70 leading-relaxed mt-2" style={{ fontFamily: 'var(--font-reading)' }}>
          Two words inside this record: a <strong>keeper</strong> holds the keys — anything the screen flags waits for one, and any of them can take an entry off — and a <strong>checker</strong> reads a source and signs what they found. That is what you are. Volunteer, fellow, checker: the same person, and Trebuchet’s word “fellow” is a good one.
        </p>
      </section>

      {/* ── PASS IT ON ── */}
      <section className="border-t-2 border-[#141210] pt-5">
        <p className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#6b6258] mb-1.5">Pass it on</p>
        <p className="text-[13px] text-[#141210] leading-relaxed mb-3" style={{ fontFamily: 'var(--font-reading)' }}>
          Know somebody with an hour — a researcher, a student? Send them this page as a card. It carries its own address, so they land here rather than on a screenshot.
        </p>
        <ShareCardButton entry={FELLOWS_CARD} build={buildGuideShareCard} label="Send this page as a card" />
      </section>
    </ClimateRecordShell>
  );
}

// ── THE PAGE AS A CARD ─────────────────────────────────────────────────────────
// So it can be handed on without anybody writing an email. It carries the page's own
// words rather than a paraphrase, and its own address — the rule every card on this
// record keeps, because a page that travels as a screenshot arrives with its link cut
// off and nothing to open.
const FELLOWS_CARD = {
  badge: 'BECOME A CHECKER',
  marker: 'The job · what you keep · the way in',
  title: 'If you are coming to help',
  body: 'Open the link. Read what the source actually says. Then say whether it holds. That is the whole job.',
  inside: [
    'Check three entries already waiting',
    'Bring one thing that deserves to be here',
    'Find one entry you think is wrong',
  ],
  closing: 'An hour is the real commitment. Nobody is counting it, and nobody will ask you for it.',
  url_path: '/ClimateFellows',
};