import React from 'react';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import HostAnswer from '@/components/climate/HostAnswer';
import CopyLine from '@/components/climate/CopyLine';
import ShareCardButton from '@/components/climate/ShareCardButton';
import CostLadder from '@/components/climate/CostLadder';
import { buildGuideShareCard } from '@/components/climate/shareCardImage';
import { recordAddress } from '@/components/climate/recordAddress';

// ── FOR JANINE, BEFORE IT IS SHARED ────────────────────────────────────────────
// Her five questions and her postscript, answered in the order she asked them.
// Not a pitch: a page she can read cold, check line by line, and then quote from
// without any of it turning out to be untrue later. Every answer that is a no, or
// a not yet, says so in the same size of letters as the ones that are yes.
// Every door here is real and opens on the record itself.

const INTRO_PARAGRAPH =
  'Together We Can Change the Course of Climate Change is a public record, not a feed. People share the solutions that are working where they are and the crises that need saying out loud. Every entry names where it came from and says how well it is known: one source, two independent sources, or an official record. Anyone can send an entry in, in any language, without an account. Nothing is ranked, nothing is advertised, and nothing can be paid into a better position. It is free to read, it is built to be checked and copied, and it is looking for a host to carry it.';

const DOORS = [
  { label: 'The record', page: 'TogetherChangeClimate', what: 'The front page: solutions, crises, actions, gatherings.' },
  { label: 'How it is made', page: 'ClimateMethod', what: 'Sources, the ladder, who decides, corrections in daylight.' },
  { label: 'The impact', page: 'ClimateImpact', what: 'Where it has been read, and what can be copied from it.' },
  { label: 'Every button', page: 'ClimateGuide', what: 'Each control on the record and the one thing it does.' },
  { label: 'The music room', page: 'ClimateMusic', what: 'Given music. Nothing plays until a reader presses play.' },
  { label: 'Terms', page: 'ClimateTerms', what: 'The ground the record stands on.' },
  { label: 'Privacy', page: 'ClimatePrivacy', what: 'What is kept, what is never kept, and who can read it.' },
];

// The page's own card, built from the page's own verdicts — so it can be handed on the
// way the manual and a wire entry are, as a picture with the address already on it,
// rather than as a line of text somebody has to retype.
const HOST_CARD = {
  id: 'for-janine',
  badge: 'FOR JANINE',
  title: 'Straight answers',
  headline: 'Straight answers, before the record is shared',
  marker: 'Your five questions · in your order · nothing rounded up',
  body: 'What is silent, what is ready, what a host must supply, and the seven doors that let anyone check every line.',
  inside: [
    '01 · Nothing plays by itself',
    '02 · Ready to be seen, not handed over',
    '03 · Five lines to include',
    '04 · Six things a host supplies',
    '05 · Seven doors, every one live',
  ],
  closing: 'Check any line before you quote it. Every claim here has a door beside it.',
  url_path: '/ClimateHost',
};

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
      marker="Your questions, in your order · nothing rounded up"
      title="Straight answers, before you share it"
      statement="The five things you asked, in your order, answered plainly — each one with the door that lets you check it for yourself."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International."
    >
      <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#5a5246] mb-6">
        Two answers below are no, or not yet, set in the same size as the yeses. Where a thing is not
        built, this says so and names what it would take.
      </p>

      {/* The page's own address, at the top, because the thing a host actually needs to
          do with this page is send it. One line, one button, no hunting in a footer. */}
      <div className="border-2 border-[#141210] bg-[#f7f1e5] px-3 py-2.5 mb-8 lg:mb-10 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#5a5246]">This page, to send</p>
          <p className="text-[11px] lg:text-[12px] font-mono text-[#141210] break-all mt-1">{recordAddress(createPageUrl('ClimateHost'))}</p>
          <p className="text-[10px] font-mono text-[#5a5246] leading-snug mt-1">One link. It opens this page on the record. Nothing to install, no account, no sign-in.</p>
        </div>
        <CopyLine text={recordAddress(createPageUrl('ClimateHost'))} label="Copy" />
      </div>

      {/* Hand it on as a card, the way a track and a wire entry travel: the picture
          carries the address, so it cannot arrive with its link cut off. */}
      <div className="mb-8 lg:mb-10">
        <ShareCardButton
          entry={HOST_CARD}
          build={buildGuideShareCard}
          label="Share these answers as a card"
        />
      </div>

      <HostAnswer
        n="01"
        ask="Please remove music and any other background trials that need to be cleared from the platform."
        verdict="Nothing plays by itself"
        tone="yes"
        doors={[
          { label: 'See the music room', to: createPageUrl('ClimateMusic') },
          { label: 'How music is given', to: createPageUrl('ClimateGuide') },
        ]}
      >
        <p>No sound starts anywhere on this record unless a reader presses play. There is no background music, no autoplay video, no sound behind a page. Nothing is left running over somebody's reading.</p>
        <p>Music sits in one room of its own, entered on purpose. Every file was handed over by the artist at the door and is stored exactly as given, never re-encoded. Each track says whether it may be taken away or only heard here, and that choice was the artist's, made once.</p>
        <p>One piece may stand at the head of that room as the record's signal, and that place is empty right now. Nothing is marked as the signal until a host and the artist settle it.</p>
        <p className="border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2.5">
          <strong>And the part you actually asked for.</strong> You asked for the music to be removed. So there
          are two honest options, and the choice is yours, not ours: leave the room as it is, silent until
          pressed; or take the music off the record altogether until a host is settled and the theme is
          cleared. If you want it off, it comes off in one step. Nothing else on the record depends on it.
        </p>
      </HostAnswer>

      <HostAnswer
        n="02"
        ask="Do you agree that we will then be ready to share our web platform with potential hosts?"
        verdict="Ready to be seen. Not yet ready to be handed over."
        tone="part"
        doors={[
          { label: 'How it is made', to: createPageUrl('ClimateMethod') },
          { label: 'The impact', to: createPageUrl('ClimateImpact') },
        ]}
      >
        <p>Two different doors, worth not letting look like one in front of a host. <strong>Yes</strong> to sharing the record now. <strong>Not yet</strong> to handing it over, because a handover is a list, and the list is short but real.</p>
        <p className="font-black text-[#141210] mt-2">What a host can already see for themselves:</p>
        <ul className="space-y-1.5 mt-1">
          <Check done>Every entry names where it came from, and says whether one source, two independent sources, or an official record stands behind it.</Check>
          <Check done>Corrections are made on the entry itself, with the date. Nothing is edited quietly.</Check>
          <Check done>No account is needed to read anything, in any language, on any phone.</Check>
          <Check done>Nothing is ranked, counted for popularity, or paid into a better position.</Check>
          <Check done>The method is written down, so a sceptic can check the record without asking us anything.</Check>
        </ul>
        <p className="font-black text-[#141210] mt-4">What a host will ask that we cannot answer yet:</p>
        <ul className="space-y-1.5 mt-1">
          <Check done={false}><strong>A public repository.</strong> The source is not published. That means a host cannot yet build it, audit it, or leave with it. This is the largest gap and it is a step, not a principle. Saying it now is cheaper than being caught by it later.</Check>
          <Check done={false}><strong>Locked citations.</strong> Fingerprinting each entry and pinning it so a citation cannot drift is designed, and not yet written. Until then a quote can be checked against the entry, but not frozen permanently.</Check>
          <Check done={false}><strong>A named editor.</strong> The record intends one named, accountable editor and a contact line. That name is being settled with you, and this page says so instead of inventing a masthead.</Check>
          <Check done><strong>The figure.</strong> Now published on this page — see <em>What keeping it alive costs</em> below: £1,000 a year at today's size, £10,000 for ten years. It is the keeper's own number, and it says so.</Check>
          <Check done={false}><strong>The domain and the sending domain,</strong> both in the host's name rather than ours. A record whose address belongs to somebody else is not handed over, it is lent.</Check>
        </ul>
        <p className="border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 px-3 py-2.5 mt-3">
          So: share it as a record for comment now, and describe the handover as a short list being closed,
          not as a finished thing. That is a stronger opening than a promise, because every line of it holds.
        </p>
      </HostAnswer>

      <HostAnswer
        n="03"
        ask="Is there anything else I should be sure to include in my introduction to our web platform?"
        verdict="Five lines, and three things to leave out for now"
        tone="yes"
      >
        <p>Include these, in your own voice: what it is; who it is for; how a reader can trust it; what it costs a reader; and what you are asking for.</p>
        <p>Leave these three out for now, because each one is checked in a minute and cannot be taken back: that it is launched, that entries are verified, and that it is funded or partnered. When those become true, the record will say so on its own page, and you can quote it from there.</p>

        <div className="border-2 border-[#141210] bg-[#f7f1e5] p-3 lg:p-4 mt-3">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#5a5246]">
              Paste this if it helps
            </span>
            <CopyLine text={INTRO_PARAGRAPH} label="Copy paragraph" />
          </div>
          <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210]">{INTRO_PARAGRAPH}</p>
        </div>
      </HostAnswer>

      <HostAnswer
        n="04"
        ask="Once it is launched, the host should handle all traffic and have whatever technical needs you might supply. Are there any?"
        verdict="Six, and none of them are exotic"
        tone="yes"
      >
        <p>Yes. In the plainest terms, so a host can cost them without a meeting:</p>
        <ol className="space-y-2 mt-1">
          <li><strong>1. The record itself.</strong> It runs on this platform. Handing it over means transferring the whole workspace, entries, pictures, tracks and settings, into the host's own account. Not a copy, not a rebuild: the same thing, moved, with everything still in it.</li>
          <li><strong>2. One domain, in the host's name,</strong> with its certificate. Every citation on the record points at it, so it has to be theirs to keep.</li>
          <li><strong>3. One sending domain,</strong> also theirs. Sign-in and password emails come from it, and a record that cannot send its own email cannot keep its own readers.</li>
          <li><strong>4. A plan sized to traffic.</strong> Reading is cheap. Pictures and music are the weight, so storage is the thing to size, not visits.</li>
          <li><strong>5. Two named people:</strong> an editor, who decides what goes on the record, and a handler, who keeps it running. Both need admin. One person doing both is a single point of failure.</li>
          <li><strong>6. A way out.</strong> The data exports, so no host can hold the record hostage, and no host is trapped by it either. That protects them as much as it protects the record.</li>
        </ol>
        <p className="border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 px-3 py-2.5 mt-3">
          The figure used to be the open one. It is answered below, in the same plain terms, so it can go in
          a first letter instead of a third conversation.
        </p>
      </HostAnswer>

      {/* The number, where a host will actually look for it — on the page that
          answers their questions, not tucked into a footer. */}
      <CostLadder />

      <HostAnswer
        n="05"
        ask="Please tell me when it is ready and send me the necessary link(s)."
        verdict="Here they are, each one live"
        tone="yes"
      >
        <p>Every line below opens the real thing, and the address beside it can be copied straight into a letter or an email. Nothing here is a mock-up and nothing is behind a door.</p>

        <div className="border-2 border-[#141210] mt-2 grid sm:grid-cols-2">
          {DOORS.map((d) => {
            const path = createPageUrl(d.page);
            const address = recordAddress(path);
            return (
              <div key={d.page} className="px-3 py-2.5 flex items-start justify-between gap-3 border-b border-[#141210]/15">
                <div className="min-w-0">
                  <a
                    href={path}
                    className="text-[11.5px] lg:text-[12.5px] font-black font-mono uppercase tracking-wide text-[#141210] hover:text-[#b3261e] transition-colors"
                  >
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
        Anything above that reads as a no becomes the next thing done, and the page is corrected in the
        open when it changes.
      </p>
    </ClimateRecordShell>
  );
}