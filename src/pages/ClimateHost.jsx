import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import HostAnswer from '@/components/climate/HostAnswer';
import CopyLine from '@/components/climate/CopyLine';
import CostLadder from '@/components/climate/CostLadder';
import SendThisPage from '@/components/climate/host/SendThisPage';
import NoteToJanine from '@/components/climate/host/NoteToJanine';
import HandlerBrief from '@/components/climate/host/HandlerBrief';
import HandlerOrEditor from '@/components/climate/host/HandlerOrEditor';
import WhoHoldsTheKeys from '@/components/climate/host/WhoHoldsTheKeys';
import { recordAddress } from '@/components/climate/recordAddress';

// ── FOR JANINE, BEFORE IT IS SHARED ────────────────────────────────────────────
// Her five questions and her postscript, answered in the order she asked them.
// Nothing appears twice: each fact lives in one place, and where a thing is not
// built, it says so rather than being rounded up. Not for a host's eyes — it names
// what is unfinished, and that is hers to say in her own words.

const INTRO_PARAGRAPH =
  'Together We Can Change the Course of Climate Change is a public record, not a feed. People share the solutions working where they are, and the crises that need saying out loud. Every entry names where it came from and says how well it is known: one source, two independent sources, or an official record. Anyone can send an entry in, in any language, without an account. Nothing is ranked, nothing is advertised, and nothing can be paid into a better position. It is free to read, it is built to be checked and copied, and it is looking for a host to carry it.';

const DOORS = [
  { label: 'The record', page: 'TogetherChangeClimate', what: 'Front page: solutions, crises, actions, gatherings.' },
  { label: 'How it is made', page: 'ClimateMethod', what: 'Sources, verification, who decides, corrections.' },
  { label: 'The impact', page: 'ClimateImpact', what: 'Where it has been read.' },
  { label: 'The music room', page: 'ClimateMusic', what: 'The record’s theme, pressed to play.' },
  { label: 'The Buttons', page: 'ClimateGuide', what: 'Each control and the one thing it does.' },
  { label: 'The Brief', page: 'ClimateBrief', what: 'What is live, what is planned, and what is not built.' },
  { label: 'Terms', page: 'ClimateTerms', what: 'The ground it stands on.' },
  { label: 'Privacy', page: 'ClimatePrivacy', what: 'What is kept, and what never is.' },
];

function Check({ done, children }) {
  return (
    <li className="flex items-start gap-2 text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed">
      <span className={`flex-shrink-0 font-black ${done ? 'text-[#1e3a2b]' : 'text-[#b3261e]'}`}>{done ? '✓' : '·'}</span>
      <span>{children}</span>
    </li>
  );
}

export default function ClimateHost() {
  return (
    <ClimateRecordShell
      eyebrow="For Janine · before it is shared"
      marker="Your five questions · in your order"
      title="Straight answers, before you share it"
      statement="The five things you asked, answered plainly. Where the answer is no, it is set in the same size as the yeses."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International."
    >
      <SendThisPage />

      <p className="text-[11px] lg:text-[12px] font-mono leading-relaxed text-[#5a5246] border-l-4 border-l-[#141210]/30 px-3 py-2 mb-3">
        One caution before you pass this on: it is written for you, not for a host. It names what is still
        unfinished. A host should hear that from you, in your own words, not find it as a footnote in a
        brochure. Send them the record and the method page; keep this page for your own check.
      </p>

      <div className="border-2 border-[#141210] bg-[#f7f1e5] px-3 lg:px-4 py-3 mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-black font-mono uppercase tracking-[0.16em] text-[#5a5246]">When it goes to a host</p>
          <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210] mt-1">
            The brief written for their eyes, with the figures counted from the record. The letter is kept
            private, behind your own key.
          </p>
        </div>
        <Link
          to="/ClimateHostBrief"
          className="px-3 py-2 border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e] transition-colors flex-shrink-0"
        >
          Open the brief
        </Link>
      </div>

      <HostAnswer
        n="01"
        ask="Please remove music and any other background trials that need to be cleared from the platform."
        verdict="Nothing plays by itself"
        tone="yes"
        doors={[
          { label: 'See the music room', to: createPageUrl('ClimateMusic') },
          { label: 'Every music control', to: createPageUrl('ClimateGuide') },
        ]}
      >
        <p>No music, no video and no sound starts anywhere on this record until a reader presses play. There is nothing running behind a page while somebody reads.</p>
        <p>Music lives in one room, entered on purpose and pressed to play. Every file was handed over by its artist and kept exactly as given, never re-encoded. Each track prints the artist's own choice: take it whole, or heard here only.</p>
        <p>One piece stands as the record's signal, and that place is being settled with the artist now: Dillon Squire is making it, and it will stand at the head of the room, pressed to play, the day it is given. Until then the room says so plainly, and the other pieces given to the record wait to be heard by a person rather than standing there in the meantime.</p>
        <p className="border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2.5">
          <strong>The part you actually asked for.</strong> You asked for the music to come off. It can — in one
          step, and nothing else on the record depends on it. Say the word and the room closes until a host is
          settled. The alternative is what is built now: the room stays, and stays silent until pressed.
        </p>
      </HostAnswer>

      <HostAnswer
        n="02"
        ask="Do you agree that we will then be ready to share our web platform with potential hosts?"
        verdict="Ready to be shown. Not yet ready to be handed over."
        tone="part"
        doors={[
          { label: 'How it is made', to: createPageUrl('ClimateMethod') },
          { label: 'The impact', to: createPageUrl('ClimateImpact') },
        ]}
      >
        <p><strong>Yes</strong> to showing the record now. <strong>Not yet</strong> to handing it over: a handover is a short list of things that must exist, and three of them do not yet.</p>

        <p className="font-black text-[#141210] mt-4">What anyone can check for themselves, today:</p>
        <ul className="space-y-1.5 mt-1">
          <Check done>Every entry names its source, and says whether one source, two independent sources, or an official record stands behind it.</Check>
          <Check done>Corrections are made on the entry itself, with the date. Nothing is edited quietly.</Check>
          <Check done>No account needed to read anything, in any language, on any phone.</Check>
          <Check done>Nothing is ranked, counted for popularity, or paid into a better position.</Check>
          <Check done>The method is written down, so a sceptic can check the record without asking us anything.</Check>
          <Check done>Citations are frozen as they stood: 29 of the origins this record cites have been read and copied with a fingerprint, so a quote cannot drift. The ten that could not be read carry no copy, and their entries say so plainly instead of letting a link stand in for the proof. Counted 15 November 2026.</Check>
        </ul>

        <p className="font-black text-[#141210] mt-4">Still open — each one is a step, not a principle:</p>
        <ul className="space-y-1.5 mt-1">
          <Check done={false}><strong>The source is not published.</strong> Until it is, a host cannot build it, audit it, or leave with it. This is the largest gap on the record.</Check>
          <Check done={true}><strong>The keepers are named.</strong> Gillian Barbara Brown, Brian Hughes and Janine M. H. Selendy hold the record's keys between them. Anything the screen flags waits for one of them, any of them can take an entry off, and no keeper can add or remove another keeper alone. One honest corner: an entry that is clean and carries its source goes up without being asked, and the record prints that it is unsigned rather than pretending a person signed it. Your own line stays yours to keep or hand on.</Check>
          <Check done={false}><strong>No domain in a host's name.</strong> A record whose address belongs to somebody else is lent, not handed over.</Check>
        </ul>

        <p className="border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 px-3 py-2.5 mt-3">
          Closed since the last draft: the cost, and the freezing of citations. The figure a letter can carry is on
          this page, in answer 04. Every cited source has been read and copied as it stood, and the ten origins that
          refused to be read are named rather than hidden. So: share it as a record open for comment, and describe
          the handover as a short list being closed. That holds, and a promise does not.
        </p>
      </HostAnswer>

      <HostAnswer
        n="03"
        ask="Is there anything else I should be sure to include in my introduction to our web platform?"
        verdict="Five lines in, three things left out"
        tone="yes"
      >
        <p>In your own voice: what it is; who it is for; how a reader can trust it; what it costs a reader; and what you are asking for.</p>
        <p>Leave these three out for now, because each is checked in a minute and cannot be taken back: that it is launched, that entries are verified, and that it is funded or partnered. When they become true the record will say so on its own page, and you can quote it from there.</p>

        <div className="border-2 border-[#141210] bg-[#f7f1e5] p-3 lg:p-4 mt-3">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#5a5246]">Paste this if it helps</span>
            <CopyLine text={INTRO_PARAGRAPH} label="Copy paragraph" />
          </div>
          <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210]">{INTRO_PARAGRAPH}</p>
        </div>

        <NoteToJanine />
      </HostAnswer>

      <HostAnswer
        n="04"
        ask="Once it is launched, the host should handle all traffic and have whatever technical needs you might supply. Are there any?"
        verdict="Six, and none of them exotic"
        tone="yes"
      >
        <p>The whole list a keeper needs, in the order they would do it — costable without a meeting:</p>
        <ol className="space-y-2 mt-1">
          <li><strong>1. The record itself.</strong> Transfer the whole workspace — entries, pictures, tracks, settings — into the host's own account. Not a copy and not a rebuild: the same thing moved, with everything still in it.</li>
          <li><strong>2. One domain in the host's name,</strong> with its certificate. Every citation points at it, so it has to be theirs to keep.</li>
          <li><strong>3. One sending domain,</strong> also theirs. Sign-in and password emails come from it, and a record that cannot send its own email cannot keep its own readers.</li>
          <li><strong>4. A plan sized to storage, not visits.</strong> Reading is cheap; pictures and music are the weight.</li>
          <li><strong>5. Two named keepers with admin:</strong> one who signs what goes on the record, one who keeps it running. One person doing both is a single point of failure. The keeper's job is written out in full below.</li>
          <li><strong>6. A way out.</strong> The data exports, so no host can hold the record hostage and no host is trapped by it. That protects them as much as the record.</li>
        </ol>
        <HandlerOrEditor />

        <HandlerBrief />

        <WhoHoldsTheKeys />

        <p className="border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 px-3 py-2.5 mt-3">
          The cost of all six is below: <strong>£1,000 a year</strong> at today's size, and £10,000 for ten years.
        </p>
      </HostAnswer>

      <CostLadder />

      <HostAnswer
        n="05"
        ask="Please tell me when it is ready and send me the necessary link(s)."
        verdict="Here they are, each one live"
        tone="yes"
      >
        <p>Every line below opens the real thing, and the address beside it copies straight into a letter. Nothing here is a mock-up, and nothing is behind a door.</p>

        <div className="border-2 border-[#141210] mt-2 grid sm:grid-cols-2">
          {DOORS.map((d) => {
            const path = createPageUrl(d.page);
            const address = recordAddress(path);
            return (
              <div key={d.page} className="px-3 py-2.5 flex items-start justify-between gap-3 border-b border-[#141210]/15">
                <div className="min-w-0">
                  <a href={path} className="text-[11.5px] lg:text-[12.5px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] transition-colors">
                    {d.label}
                  </a>
                  <p className="text-[10.5px] lg:text-[11.5px] font-mono text-[#5a5246] leading-snug mt-0.5">{d.what}</p>
                  <p className="text-[9.5px] font-mono text-[#8a8375] break-all mt-1">{address}</p>
                </div>
                <CopyLine text={address} label="Copy link" />
              </div>
            );
          })}
        </div>
      </HostAnswer>

      <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#5a5246] border-t-2 border-[#141210]/20 pt-3">
        Anything above that reads as a no becomes the next thing done, and this page is corrected in the open
        when it changes.
      </p>
    </ClimateRecordShell>
  );
}