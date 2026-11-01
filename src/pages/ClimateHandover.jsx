import React from 'react';
import { Link } from 'react-router-dom';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CostLadder from '@/components/climate/CostLadder';
import { createPageUrl } from '@/utils';

// ── FOR THE NEXT HOST ─────────────────────────────────────────────────────────
// The page a host reads before saying yes, and keeps afterwards. It is written as
// a list rather than a pitch: what moves, in what order, what it costs, and what
// the record will not let them do once it is theirs. The last section names what
// is still open, because a host who discovers a gap later has been sold something.

function Block({ n, title, children }) {
  return (
    <section className="border-t-2 border-[#141210]/20 pt-5 mt-6">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-[10px] font-black font-mono text-[#b3261e] tracking-[0.2em]">{n}</span>
        <h2 className="text-[13px] lg:text-[15px] font-black font-mono uppercase tracking-wide text-[#141210]">{title}</h2>
      </div>
      <div className="space-y-2.5 text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#3d362c]">{children}</div>
    </section>
  );
}

const STEPS = [
  ['Move the workspace, not a copy.', 'Entries, pictures, tracks and settings transfer into the host\'s own account as the same thing, with everything still in it. A rebuild would lose the dates, and the dates are the record.'],
  ['The domain, in the host\'s name, with its certificate.', 'Every citation points at it. An address belonging to somebody else is a record lent, not handed over.'],
  ['A sending domain, also theirs.', 'Sign-in and password emails come from it. A record that cannot send its own email cannot keep its own readers.'],
  ['A plan sized to storage, not to visits.', 'Reading is cheap. Pictures and music are the weight.'],
  ['Two named people with admin.', 'An editor, who decides what goes on, and a handler, who keeps it running. One person doing both is a single point of failure, and the separation is written on the record itself.'],
  ['The way out, tested once.', 'The record exports in full, without contact details, so no host can hold it hostage and no host is trapped by it. Export it before launch, not after a falling out.'],
];

const REFUSALS = [
  'Rank an entry. There is no ordering by attention, and no popularity count to buy.',
  'Sell a placement, a colour, a position, or a "verified" mark.',
  'Track a reader. No pixels, no advertising, no third-party analytics, no session recording.',
  'Edit an entry quietly. A correction is written on the entry, with its date, and stays there.',
  'Take an entry down without saying so. A removal leaves a dated note in its place.',
  'Let a machine sign. A signature is a person\'s name, and a machine has none to give.',
];

const OPEN = [
  ['The platform\'s source is not published yet.', 'Until it is, a host cannot build it, audit it or leave with it. This is the largest gap, and it is a step, not a principle.'],
  ['Thirty-nine sources, twenty-nine kept.', 'Each cited page was read on the day it went on the record and copied, with a fingerprint, so a quote cannot drift. Ten origins would not be read: a journal, a UN agency site, a news site, a PDF host, and YouTube, which answered too often in one go. Those ten entries still link to the origin, and each says plainly that no copy is held rather than letting the link stand in for the proof.'],
  ['No named editor on the masthead yet.', 'The record carries one accountable name and a contact line, or it says "unsigned" in the same size as everything else. It will not invent a name in the meantime.'],
];

export default function ClimateHandover() {
  return (
    <ClimateRecordShell
      eyebrow="For the next host"
      marker="What changes hands · in what order"
      title="Before you take it on"
      statement="Six things move, six things the record will not let you do, and three that are still open. No pitch, no adjective: the list you would want if it were your name on it."
      returnTo={createPageUrl('TogetherChangeClimate')}
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International."
    >
      <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210]">
        Taking this on is a small, boring job done consistently. If you want to know what the record actually is
        first, read <Link to={createPageUrl('ClimateMethod')} className="underline decoration-dotted underline-offset-2 hover:text-[#b3261e]">how it is made</Link>,
        not this page.
      </p>

      <Block n="01" title="What moves">
        <ol className="space-y-2">
          {STEPS.map(([lead, rest], i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#b3261e] font-black flex-shrink-0">{i + 1}.</span>
              <span><strong className="text-[#141210]">{lead}</strong> {rest}</span>
            </li>
          ))}
        </ol>
      </Block>

      <Block n="02" title="What it costs">
        <p>
          About <strong className="text-[#141210]">£1,000 a year</strong> at the size it is now, and £10,000 for ten
          years. That figure is storage and serving, not traffic. The rungs above it are a model, and are labelled as
          a model on the page below.
        </p>
      </Block>

      <CostLadder />

      <Block n="03" title="What the record will not let you do">
        <p>These are not policies that could be revised by a new host. They are how the thing is built.</p>
        <ul className="space-y-1.5">
          {REFUSALS.map((r, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#b3261e] font-black flex-shrink-0">×</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block n="04" title="Still open, and said first">
        <ul className="space-y-2">
          {OPEN.map(([lead, rest], i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#b3261e] font-black flex-shrink-0">·</span>
              <span><strong className="text-[#141210]">{lead}</strong> {rest}</span>
            </li>
          ))}
        </ul>
        <p className="border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 px-3 py-2.5 mt-3">
          A host who is told the gaps at the start is a partner. A host who finds them at month three is somebody who
          was sold a record. This page is corrected in the open whenever one of these closes.
        </p>
      </Block>

      <Block n="05" title="The first week, in order">
        <ol className="space-y-2">
          <li><strong className="text-[#141210]">Day one.</strong> Export the record and keep the file somewhere that is not the record. That is the host's own insurance, and it takes a minute.</li>
          <li><strong className="text-[#141210]">Day two.</strong> Move the workspace. Point the domain at it and check a citation on an entry opens the new address.</li>
          <li><strong className="text-[#141210]">Day three.</strong> Set the sending domain and send yourself a password reset. If that email does not arrive, nothing else about the record matters yet.</li>
          <li><strong className="text-[#141210]">Day four.</strong> Name the editor and the handler where the record can show them, or leave both saying "unsigned" until they are real.</li>
          <li><strong className="text-[#141210]">Day five.</strong> Read the review queue for the first time. Nothing publishes itself without a person, and that is the job.</li>
        </ol>
      </Block>

      <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#5a5246] border-t-2 border-[#141210]/20 pt-3 mt-6">
        If any line above stops being true, this page is the thing to correct first, and the correction goes where a
        reader can see it.
      </p>
    </ClimateRecordShell>
  );
}