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
  // "Janine Selendy names both" is gone. She asked, on 9 November, that this block be kept
  // "but without my name added" — it is written to be read by a host she is talking to, and
  // a list that drops her name into it hands the host a person to go around. The founder
  // still names both custodians; the page simply says founder.
  ['Two named custodians with admin, chosen by the founder.', 'One signs what goes on the record, one keeps it running. The founder names both — and names the custodian who follows — so the role is never left to whoever answers first. One person doing both is a single point of failure, and the separation is written on the record itself.'],
  ['The way out, tested once.', 'The record exports in full, without contact details, so no host can hold it hostage and no host is trapped by it. Export it before launch, not after a falling out.'],
];

// Each refusal carries how it is actually held: by the build, or by a custodian's word.
// Saying which is the difference between a rule and a hope, and a host is owed the
// difference before they say yes.
const REFUSALS = [
  ['Rank an entry. There is no ordering by attention, and no popularity count to buy.', 'built in'],
  ['Sell a placement, a colour, a position, or a "verified" mark.', 'built in'],
  ['Track a reader. No advertising, no third-party analytics, no session recording, and no address kept. A view is counted once per entry, by country only, with no identifier — that count is all the impact page shows.', 'built in'],
  ['Let a machine sign. A signature is a person\'s name, and a machine has none to give.', 'built in'],
  ['Edit an entry quietly. A correction is written on the entry, with its date, and stays there.', 'a custodian\'s word'],
  ['Take an entry down without saying so. A removal leaves a dated note in its place.', 'a custodian\'s word'],
];

const OPEN = [
  ['The platform\'s source is not published yet.', 'Until it is, a host cannot build it, audit it or leave with it. This is the largest gap, and it is a step, not a principle.'],
  ['Thirty-nine sources cited, twenty-nine kept — counted 2 November 2026.', 'Each cited page that would answer was read on the day it went on the record and copied, with a fingerprint, so a quote cannot drift. Ten origins would not be read: a journal, a UN agency site, a news site, a PDF host, and YouTube, which answered too often in one go. Those ten entries still link to the origin, and each says plainly that no copy is held rather than letting the link stand in for the proof. Both figures are counted from the record on the day they are written, never estimated, and dated so they cannot quietly go stale.'],
  ['No custodian named on the masthead yet.', 'Thirty-nine of the forty published entries carry the name of the person who signed them on — counted 2 November 2026: ten solutions, nine crises, eighteen on the wire, three actions. The one that does not carry a name says so in the same size as everything else, and the four groups carry an organiser rather than a signer, and say that. What is missing is one accountable custodian for the whole record, with a contact line a reader can use, and the record will not invent one in the meantime.'],
];

export default function ClimateHandover() {
  return (
    <ClimateRecordShell
      eyebrow="The Handover · for the next host"
      marker="What changes hands · in what order"
      title="Before you take it on"
      statement="Six things move, six things the record will not let you do, three that are still open, and one plain line on which account holds it today. No pitch, no adjective: the list you would want if it were your name on it."
      returnTo={createPageUrl('TogetherChangeClimate')}
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change."
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
          An estimate of <strong className="text-[#141210]">£1,000 a year</strong> at the size it is now. It is an
          estimate and not a quote: nobody has carried this for a year at a host&rsquo;s expense yet, so the first
          year&rsquo;s real bill is the first honest number, and it gets published when it exists. Reading is cheap.
          What is expensive is what the record keeps, so the figure follows storage, not visitors. The rungs above it
          are a model, and are labelled as a model on the page below.
        </p>
      </Block>

      <CostLadder />

      <Block n="03" title="What the record will not let you do">
        <p>
          Four of these the build enforces: there is nothing to buy, nothing counting, and no field a machine can sign.
          Two rest on a custodian&rsquo;s word, and the tag says which. The code cannot stop a person with admin from
          deleting an entry; it is said here rather than dressed up as a lock, and it is the whole reason the two custodians
          are two people.
        </p>
        <ul className="space-y-1.5">
          {REFUSALS.map(([r, by], i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#b3261e] font-black flex-shrink-0">×</span>
              <span>
                {r}{' '}
                <span className="text-[9px] font-black uppercase tracking-[0.1em] text-[#5a5246] whitespace-nowrap">({by})</span>
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block n="04" title="Who holds it today, and what the builder keeps">
        <p>
          <strong className="text-[#141210]">Today the builder holds the admin account.</strong> Universal Frequency 51
          CIC built the platform to the founder&rsquo;s specification and has been keeping it while there was nobody
          else to keep it. That is said here, first, rather than left for a host to find at month three.
        </p>
        <p>
          What the builder keeps once it changes hands is <strong className="text-[#141210]">nothing of the
          record</strong>: no account, no key, no veto, and no seat. Building is not keeping. Neither role is the
          builder&rsquo;s by default — the founder names both custodians, and the custodian who follows, and
          she may name the builder to either one if she chooses. That choice is hers each time, and it is never assumed.
        </p>
        <p>
          Help with the machinery can be asked for afterwards, on its own terms, paid or given. It is a separate
          arrangement and never a condition of the handover: a host who asks for nothing further from the builder loses
          nothing, and one who does is buying work, not permission.
        </p>
      </Block>

      <Block n="05" title="Still open, and said first">
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

      <Block n="06" title="The first week, in order">
        <ol className="space-y-2">
          <li><strong className="text-[#141210]">Day one.</strong> Export the record and keep the file somewhere that is not the record. That is the host's own insurance, and it takes a minute.</li>
          <li><strong className="text-[#141210]">Day two.</strong> Move the workspace. Point the domain at it and check a citation on an entry opens the new address.</li>
          <li><strong className="text-[#141210]">Day three.</strong> Set the sending domain and send yourself a password reset. If that email does not arrive, nothing else about the record matters yet.</li>
          <li><strong className="text-[#141210]">Day four.</strong> Put both custodians where the record can show them, named by the founder — or leave both saying "unsigned" until they are real names. A host does not fill these in for the record.</li>
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