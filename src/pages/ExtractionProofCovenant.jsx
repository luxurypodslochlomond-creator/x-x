import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import RecordEpigraph from '@/components/climate/RecordEpigraph';

// ── THE COVENANT, SAID IN THE RECORD'S OWN VOICE ───────────────────────────────
// This page used to open as its own small website: its own bands, its own type sizes,
// its own way out. Anyone arriving from the record's governance line landed somewhere
// that did not look like the record — and a page about trust cannot afford to look
// like a different place. It now wears the record's shell, the same bands as Method,
// Support and the Founder page, so the covenant reads as part of the record it governs.
//
// Every claim below is written so a reviewer can check it against the code and the
// record's own privacy note (ClimatePrivacy), and each pillar says out loud how far
// along it is: BUILT, LICENCE IN PLACE, PLANNED, GROWING. Nothing is stated as
// finished when it is not — on this record, how well a thing is known is said on the
// thing itself. The names used are the record's own; the products that share the
// CIC's roof are not named here, because this record stands on its own.

const PILLARS = [
  {
    n: '01',
    status: 'BUILT · LIVE',
    title: 'The smallest set of data a record needs',
    // "No accounts" was too big a claim: keepers and checkers do sign in to work on the
    // record. What is true is narrower and better — a reader never has to, and neither does
    // anyone sending something in.
    body: 'What you submit, a contact email so we can reach you about it, and the country a reader reads from. No IP address is stored. No tracking cookies. No ad profiles. No reader accounts: nothing to sign up to before you read, or before you send something in. Anyone who copies this code inherits a reviewed, minimal database — not a surveillance engine. There is nothing here worth harvesting.',
  },
  {
    n: '02',
    status: 'LICENCES IN PLACE',
    title: 'CC BY-SA 4.0 and AGPL-3.0',
    // Both halves, named together, because this record gives away two different things and a
    // covenant that named only the code would leave the words — the entries themselves — with
    // no stated terms at all. Irrevocable is the load-bearing word: a licence of this kind,
    // once given, cannot be taken back, by this record or by anyone who takes it over.
    // ── THE DAY THE REPOSITORY EXISTED ────────────────────────────────────────────
    // This line used to say there was no public repository, and that the day one existed its
    // link would go here and the line would change. That day was 26 November 2026: the code
    // was pushed to GitHub and the repository was made public, and the page was checked from
    // outside a signed-in account before the link went on it — a private repository answers
    // 404 to every reader, and a link that fails is worse than the honest sentence it replaced.
    //
    // The words after it are deliberately modest. The repository holds two licence files: one
    // for the code and one for the words, each naming the full text it stands on rather than
    // reprinting it. So the page says exactly that, and no more than that.
    body: 'Both are already given, and both are irrevocable: once given, a licence of this kind cannot be taken back. The words: everything published on this record is under Creative Commons BY-SA 4.0 — take it, change it, print it, sell it, keep the name on it, and let whatever you make be this free too. The code: the GNU AGPL-3.0, open in its licence and in every line of it, with one condition — anyone who runs a modified version as a service must publish their changes too. Good actors are unaffected. The classic extraction play — take free code, close it, add tracking, sell it — stops being a clever move and becomes a licence violation anyone can point at, in public. The repository is public as of 26 November 2026, so none of this has to be taken on trust: every line can be read, copied and checked at github.com/luxurypodslochlomond-creator/x-x. Two licence files sit in it, one for the code and one for the words, and each names the full text it stands on.',
    // The names are the law, and the law is one tap away. A page asking a reader to take its
    // word on a licence should hand them the licence: same addresses as the plate on x = x.
    links: [
      { label: 'Read the code on GitHub', href: 'https://github.com/luxurypodslochlomond-creator/x-x' },
      { label: 'Read CC BY-SA 4.0', href: 'https://creativecommons.org/licenses/by-sa/4.0/legalcode' },
      { label: 'Read the GNU AGPL-3.0', href: 'https://www.gnu.org/licenses/agpl-3.0.html' },
    ],
  },
  {
    n: '03',
    status: 'PLANNED',
    title: 'The name stays with the record',
    body: 'Together We Change Climate, and the record itself. The code can be copied; the name, and the trust readers have placed in it, cannot be taken along with it. Anyone building on this starts under their own name, in the open, from zero.',
  },
  {
    n: '04',
    status: 'GROWING DAILY',
    title: 'The part nobody can copy: the evidence',
    body: 'The public counts of entries and readers, the review trail behind every entry, the outcome data — that history exists only here. A copy begins with none of it. In a record kept for the public, trust is the whole product: it cannot be copied, only earned.',
  },
];

const COMMITMENTS = [
  'The good use is the default path — extraction is not in the codebase to exploit.',
  'AI does the understanding; the human always keeps the deciding.',
  'Free to read, always. Money never buys a place on the record.',
  // The page twice tells a reader to check it against the privacy note, so it hands them the
  // note rather than sending them looking. A claim you can check is worth more than a claim
  // you are asked to trust, and only if the checking is one tap away.
  <>
    Every privacy claim is verifiable in the architecture, and in the record’s own{' '}
    <Link to="/ClimatePrivacy" className="underline decoration-dotted underline-offset-2 hover:text-[#b3261e]">
      privacy note
    </Link>{' '}
    — not only in the marketing.
  </>,
  'Anyone may copy this to help people. No one may quietly close it to harvest them.',
];

function Pillar({ n, status, title, body, links }) {
  return (
    <section className="border-2 border-[#141210] bg-[#f7f1e5]">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b-2 border-[#141210] bg-[#efe7d6]">
        <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#5a5246]">{n}</span>
        <span className="text-[9px] font-black font-mono uppercase tracking-widest px-2 py-0.5 border border-[#141210] bg-[#e2602a] text-[#141210]">
          {status}
        </span>
      </div>
      <div className="px-4 py-3.5">
        <h2
          className="font-black uppercase text-[#141210] leading-tight mb-2"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 1.9vw, 28px)', letterSpacing: '-0.01em' }}
        >
          {title}
        </h2>
        <p className="text-[12px] lg:text-[13px] font-mono leading-relaxed lg:leading-[1.75] text-[#141210]">{body}</p>
        {links?.length ? (
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] underline decoration-dotted underline-offset-2 hover:text-[#b3261e]"
              >
                {l.label}
              </a>
            ))}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export default function ExtractionProofCovenant() {
  return (
    <ClimateRecordShell
      eyebrow="Public covenant"
      marker="Open source · extraction-proof"
      title="Open source. Extraction-proof."
      statement="Anyone can copy this record's code — we invite it. What no one can copy is a reason to betray the people using it. Helping is the easy path; extraction is the pointless one."
      returnTo={createPageUrl('TogetherChangeClimate')}
      returnLabel="Back to the record"
      footer="This page is part of the record's method: it says what the record is made of, so that anyone — a reader, a funder, a review panel — can check it against the code and the privacy note, and say so if it does not hold."
    >
      <p className="text-[12px] lg:text-[13px] font-mono leading-relaxed lg:leading-[1.75] text-[#141210] mb-6">
        This record is built so that copying it helps people, and closing it does not pay. Four things hold that
        up. Each one says out loud how far along it is, because a promise about the future is worth less than a
        thing already done.
      </p>

      <div className="space-y-3">
        {PILLARS.map((p) => (
          <Pillar key={p.n} {...p} />
        ))}
      </div>

      {/* ── THE COMMITMENTS ── */}
      <section className="mt-8 border-2 border-[#141210] bg-[#f7f1e5] p-5">
        <h2
          className="font-black uppercase text-[#141210] mb-4"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.2vw, 32px)', letterSpacing: '-0.025em' }}
        >
          The five commitments
        </h2>
        <ul className="space-y-3">
          {COMMITMENTS.map((line, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#1e3a2b] border border-[#141210] text-[#efe7d6] text-[10px] font-black font-mono leading-none">
                {i + 1}
              </span>
              <span className="text-[12px] lg:text-[13px] font-mono text-[#141210] leading-relaxed lg:leading-[1.75]">{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── THE CLOSE — the record's own note, at the end of the argument ──
          Brian, 26 November: "no bro haha loved the footer but not the black box with Laurie
          Anderson sentence black and white this doesn't feel right bro". He is right, and the
          reason is the page rather than the sentence: every other plate on this page is the
          record's paper inside an ink rule, and the close was the one black rectangle on it —
          so her line arrived as a different publication stapled to the back of this one, in a
          voice the page does not use anywhere else. It is the page's own paper now, with her
          line set the way the page sets everything: ink for the sentence, the measured red for
          the half of it the record took its name from. Nothing about the debt changes — the
          quotation marks, her name, the song, the year and the limit are all still here, and
          they are easier to read on paper than they were in cream on black. */}
      <section className="mt-6 border-2 border-[#141210] bg-[#f7f1e5] px-5 py-6">
        <p className="text-[12px] lg:text-[13px] font-mono leading-relaxed text-[#141210] mb-4">
          You cannot stop bad actors from using AI. You can make the good version the easiest one to build, use
          and fund — by leaving the honest path as the shortest one through the code.
        </p>
        {/* The close of the argument is her line, marked as hers — quoted, signed, and with the
            limit on it stated underneath, because the whole page is about saying plainly what
            something is and what it is not. */}
        <RecordEpigraph compact label="The line this record is named after" />
        <p className="mt-3 text-[10px] font-mono text-[#5a5246] leading-relaxed">
          <Link to="/XEqualsX" className="underline decoration-dotted underline-offset-2 hover:text-[#e2602a]">
            What is borrowed, and what is owed
          </Link>
          .
        </p>
      </section>
    </ClimateRecordShell>
  );
}