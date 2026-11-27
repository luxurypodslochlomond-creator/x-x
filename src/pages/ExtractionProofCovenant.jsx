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
    status: 'IN USE',
    title: 'Read without joining',
    body: 'You do not need an account to read the record or send something in. Submissions and the contact details needed to handle them are stored. Entry openings are counted with a country where one is available. This is not a claim that nothing is stored: the privacy note explains what is kept, why it is kept and how to ask about it.',
  },
  {
    n: '02',
    status: 'LICENCES IN PLACE',
    title: 'Give others the right to build on it',
    body: 'Our own words are offered under CC BY-SA 4.0: you may copy and adapt them, including commercially, with attribution, changes identified and adaptations shared under the same terms. The code is offered under GNU AGPL-3.0. If people interact with a modified version over a network, they must be offered its corresponding source under that licence. These permissions cover work we can license, not other people’s drawings, photographs or source material. Those retain their own rights and credits. The licences give rights and responsibilities; they do not prevent every misuse, prohibit tracking in a copy or guarantee that a service will stay online.',
    links: [
      { label: 'Read the public code', href: 'https://github.com/luxurypodslochlomond-creator/x-x' },
      { label: 'Read CC BY-SA 4.0', href: 'https://creativecommons.org/licenses/by-sa/4.0/legalcode' },
      { label: 'Read GNU AGPL-3.0', href: 'https://www.gnu.org/licenses/agpl-3.0.html' },
    ],
  },
  {
    n: '03',
    status: 'STILL TO SETTLE',
    title: 'People still have to look after it',
    body: 'A licence does not decide who controls a service, pays for its hosting or takes responsibility for its future. Long-term stewardship needs people and clear agreements. A name or a symbol cannot settle that for them. Copying the code does not transfer anyone else’s identity or endorsement.',
  },
  {
    n: '04',
    status: 'ONGOING WORK',
    title: 'Let the work be questioned',
    body: 'Sources, dates, editorial names where a person has decided, and visible corrections help readers check the record. They do not make it infallible. Its public history can be read and, within the relevant rights, reused. Trust is not something this site owns or a reader owes it; it has to be earned through how the work is kept.',
  },
];

const COMMITMENTS = [
  'Help people find something useful, not keep them watching.',
  'Do not present AI screening or translation as proof. Make human editorial decisions identifiable.',
  'Free to read. No advertising or paid placement in the record.',
  <>Say what is stored and why, in the record’s <Link to="/ClimatePrivacy" className="underline underline-offset-2">privacy note</Link>.</>,
  'Keep sources and credits with the work. Say what changed when something is corrected.',
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
      eyebrow="Our commitments"
      marker="Open code · named sources · visible corrections"
      title="Open to use. Open to question."
      statement="This record is meant to help people, not turn their attention or their work into something to sell. Here is what we commit to, what can be reused, and what still depends on people."
      returnTo={createPageUrl('TogetherChangeClimate')}
      returnLabel="Back to the record"
      footer="These commitments can be questioned against the record, its public code and its privacy note. A promise on a page is not proof that it has been kept."
    >
      <p className="text-[12px] lg:text-[13px] font-mono leading-relaxed lg:leading-[1.75] text-[#141210] mb-6">
        No website is made safe from exploitation by calling itself extraction-proof. What matters is what it
        does, what people are allowed to reuse, and who is accountable when something goes wrong.
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
          The purpose is practical: keep useful knowledge available, credit the people behind it, and give
          others a way to build on it. The technology supports that work; it does not replace responsibility.
        </p>
        {/* The close of the argument is her line, marked as hers — quoted, signed, and with the
            limit on it stated underneath, because the whole page is about saying plainly what
            something is and what it is not. */}
        <RecordEpigraph compact label="The line this record is named after" />
        <p className="mt-3 text-[10px] font-mono text-[#5a5246] leading-relaxed">
          <Link to="/XEqualsX" className="underline decoration-dotted underline-offset-2 hover:text-[#e2602a]">
            Why this record exists
          </Link>
          .
        </p>
      </section>
    </ClimateRecordShell>
  );
}