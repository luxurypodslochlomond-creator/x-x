import React from 'react';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';

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
    body: 'What you submit, a contact email so we can reach you about it, and the country a reader reads from. No IP address is stored. No tracking cookies. No ad profiles. No accounts. Anyone who copies this code inherits a reviewed, minimal database — not a surveillance engine. There is nothing here worth harvesting.',
  },
  {
    n: '02',
    status: 'LICENCE IN PLACE',
    title: 'AGPL-3.0',
    body: 'The GNU AGPL-3.0 licence is already written into this project. Open in its licence and in every line of it, with one condition: anyone who runs a modified version as a service must publish their changes too. Good actors are unaffected. The classic extraction play — take free code, close it, add tracking, sell it — becomes legally impossible. There is no public repository today: the code is held in a private workspace, and what is open is the record itself — every published entry, its source, and its corrections. The day a repository exists, its link goes here and this line changes. Until then the page says so plainly, rather than letting a reader find out the hard way.',
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
  'Every privacy claim is verifiable in the architecture, and in the record’s own privacy note — not only in the marketing.',
  'Anyone may copy this to help people. No one may quietly close it to harvest them.',
];

function Pillar({ n, status, title, body }) {
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

      {/* ── THE CLOSE — the record's own note, at the end of the argument ── */}
      <section className="mt-6 bg-[#141210] px-5 py-6">
        <p className="text-[12px] lg:text-[13px] font-mono leading-relaxed text-[#efe7d6] mb-4">
          You cannot stop bad actors from using AI. You can make the good version the easiest one to build, use
          and fund — by leaving the honest path as the shortest one through the code.
        </p>
        <p className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-[#e2602a] leading-relaxed">
          This is the time. And this is the record of the time.
        </p>
        <p className="text-[9px] font-mono text-[#efe7d6]/40 mt-2">
          Laurie Anderson · O Superman, 1981
        </p>
      </section>
    </ClimateRecordShell>
  );
}