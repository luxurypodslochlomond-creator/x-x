import React from 'react';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import HostAnswer from '@/components/climate/HostAnswer';
import CopyLine from '@/components/climate/CopyLine';
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
      statement="You asked five things, and a sixth at the end. Here they are in the order you asked them, answered plainly, with the door that lets you check each one for yourself."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International."
    >
      <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#5a5246] mb-8 lg:mb-10">
        Two answers below are no, or not yet. They are written the same size as the yeses, because a host
        who finds a gap later stops trusting the whole page. Where a thing is not built, this says it is
        not built, and names what it would take.
      </p>

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
        <p>Music sits in one room of its own, entered on purpose. Every file in it was handed over by the artist at the door and is stored exactly as it was given, never re-encoded, never trimmed. Each track says on its face whether it may be taken away or only heard here, and that choice was the artist's, made once, not ours.</p>
        <p>Dillon's theme will stand at the head of that room as the record's signal. It is heard like every other piece: pressed to play, never played at anyone, and it gives no track a better place in the list.</p>
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
        <p>They are two different doors, and it is worth not letting them look like one in front of a host. <strong>Yes</strong> to sharing the record now, for comments and for finding the right host. <strong>Not yet</strong> to handing it over, because a handover is a list, and the list is short but real.</p>
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
          <Check done={false}><strong>A monthly figure.</strong> Nobody has signed a running cost to a named party yet. A host asks this on day one, and it should be answered before the conversation starts.</Check>
          <Check done={false}><strong>The domain and the sending domain,</strong> both in the host's name rather than ours. A record whose address belongs to somebody else is not handed over, it is lent.</Check>
          <Check done={false}><strong>One number to check.</strong> There is a litter total on the wider platform that is larger than it should be. It is being audited or removed, because it is the first figure anyone tests.</Check>
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
        <p className="border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2.5 mt-3">
          The monthly figure is the one still open, and it belongs in your first letter rather than your third
          conversation. It is being worked out now, and it will be a number a small organisation can carry.
        </p>
      </HostAnswer>

      <HostAnswer
        n="05"
        ask="Please tell me when it is ready and send me the necessary link(s)."
        verdict="Here they are, each one live"
        tone="yes"
      >
        <p>Every line below opens the real thing, and the address beside it can be copied straight into a letter or an email. Nothing here is a mock-up and nothing is behind a door.</p>

        <div className="border-2 border-[#141210] divide-y-2 divide-[#141210]/15 mt-2">
          {DOORS.map((d) => {
            const path = createPageUrl(d.page);
            const address = recordAddress(path);
            return (
              <div key={d.page} className="px-3 py-2.5 flex items-start justify-between gap-3">
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

      <HostAnswer
        n="06"
        ask="We look forward to your family visit, Dillon and his girlfriend as well. Spring would be best when the flowers are beginning to bloom, but you are also welcome before then."
        verdict="Spring, then"
        tone="yes"
      >
        <p>We would like that very much. Spring it is, with the flowers coming up, Dillon and his girlfriend with us. And if we are passing before then, we will knock.</p>
        <p>Thank you for trusting us with something this size. If anything on this page reads as a no, tell us and it becomes the next thing done.</p>
        <p className="font-black">Brian</p>
      </HostAnswer>
    </ClimateRecordShell>
  );
}