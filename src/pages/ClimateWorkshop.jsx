import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Printer } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import ShareCardButton from '@/components/climate/ShareCardButton';
import WorkshopStrip from '@/components/climate/workshop/WorkshopStrip';
import JanineTopicTop from '@/components/climate/workshop/JanineTopicTop';
import TheShortAnswer from '@/components/climate/workshop/TheShortAnswer';
import HandBack from '@/components/climate/workshop/HandBack';
import JanineSessionTile from '@/components/climate/workshop/JanineSessionTile';
import WorkshopClocks from '@/components/climate/workshop/WorkshopClocks';
import JanineAgenda from '@/components/climate/workshop/JanineAgenda';
import BrianTwoMinutes from '@/components/climate/workshop/BrianTwoMinutes';
import CopyLine from '@/components/climate/CopyLine';
import { recordAddress } from '@/components/climate/recordAddress';
import { buildWorkshopShareCard, WORKSHOP_CARD } from '@/components/climate/workshopCard';

// ── WHAT A STRANGER NEEDS, BECAUSE THESE THINGS GET FORWARDED ───────────────────
// A page sent to one person is read by six, and one of them is in another country with no
// idea who any of this is. So the page says who the people are, whose festival it is and
// what the record is, in four short lines — without turning into an about page.
const CONTEXT = [
  ['The record', 'A public record of climate solutions and crises. Every entry names who says so and links to where it started, and every entry is fingerprinted by the record’s own server so that a quiet edit shows up in public. No advertising, no sponsorship, no ranking — nobody can buy a place on it.'],
  ['CartoonAFRICA', 'The eighth international cartoon biennial, at the National Museum in Benin City, 28–30 November 2026. Its theme, in the festival’s own words: “SDG, African youths and democracy through humour lenses”.'],
  // The hour sheet named the host and the pictures and not the man whose campaign the whole
  // room is built on. Francis is in the room on the day, and a page that credits the festival
  // and forgets the person who has been running its cartoon campaign since 2012 is the kind of
  // omission that reads as a snub. Named here, plainly, from what the record already states
  // about the campaign — nothing about him that he has not said himself.
  ['Francis Umendu Odupute', 'Initiated the CartoonAFRICA International Biennial in November 2012 and has carried its SDG cartoon campaign since; the campaign was exhibited at the UN SDG Global Festival of Action in Bonn, 2–4 May 2019. The cartoon room is that campaign’s wall: every drawing on it is read against the seventeen goals he has been drawing them against for fourteen years.'],
  ['Janine M. H. Selendy', 'Founded Horizon International at Yale and has worked on this for four decades. She is hosting the hour — not speaking for it, and not filling it. This page is hers to cut, and the record is built in honour of her work rather than on top of it.'],
  ['This page', 'A proposal for that hour, set down before it happened. Read after 29 November, it is what was proposed — the drawings it produced live in the cartoon room.'],
];

// ── THE 29TH, WRITTEN DOWN SO NOBODY HAS TO WRITE IT ────────────────────────────
// Janine asked for the agenda and the details. This is that, in one address she can send
// to CEEW, to the festival's curator, or to a classroom — written as a proposal, because
// the hour is hers to cut, and a page that pretended otherwise would be us taking her
// session off her in the name of helping.
//
// The page now opens with HER topic, then the strip, and the strip ends in an empty frame.
// A reader who never reads a word of it still knows what the hour is: five frames, then the
// room's own. The last two minutes are a hand-back rather than a conclusion — see HandBack.
//
// Three rules hold it together. Nothing personal is on it: no addresses, no phone numbers,
// no joining link, because a workshop's link is hers to hand out and her guests' details
// are theirs. Everything about the festival is in the festival's own words. And the offer
// stays small — one blank panel at the end of the strip, inside an hour about African youth
// and democracy. There is no slot for the record in it: she wrote back plainly that she hosts
// and is not speaking for the hour, and that the panel is already presenting their own
// cartoons, so the eight minutes that used to sit at 00:18 came out.

const TOPIC = 'Climate change & the power of collective actions / creative interventions';

// ── THE INVENTED RUNNING ORDER IS GONE ────────────────────────────────────────
// What stood here was an hour-by-hour script of our own making — 00:00 open, 00:04 three
// drawings, 00:18 the draw, 00:37 four panels held up, 00:52 spare. It was written on
// 16 November, before Janine's draft agenda reached us on the 24th, and it got two things
// badly wrong in the direction that embarrasses a person in front of a room:
//
//   It invented a nineteen-minute drawing exercise she had not asked for.
//   And it went on insisting that "nobody from this record takes the microphone" while her
//   own draft gave Brian two minutes and a place in the closing remarks.
//
// Her agenda wins. It is printed in her order in JanineAgenda, and the two minutes she
// actually granted are written out in BrianTwoMinutes. Nothing of ours is left standing in
// for something of hers.

const Section = ({ n, title, children }) => (
  <section className="mt-8">
    <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-record-red lg:text-[11px]">{n}</p>
    <h2 className="mt-1 text-[19px] leading-tight lg:text-[27px]" style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
    <div className="mt-3">{children}</div>
  </section>
);

export default function ClimateWorkshop() {
  return (
    <ClimateRecordShell
      eyebrow="The record · 29 November 2026"
      marker="03 · Janine M. H. Selendy’s session · CartoonAFRICA 8th Biennial · Benin City"
      title={`“${TOPIC}”`}
      statement="Janine Selendy’s topic, in the festival’s own words — and her own draft agenda for the hour, in her order: Francis introduces her, she opens, Brian takes two minutes on where anyone can add a crisis or a solution, the cartoonists present their work, CEEW’s drawings go up as Alina speaks, and she closes. The record’s part in the hour is two minutes, and she gave them."
      returnTo="/ClimateCartoons"
      returnLabel="The cartoon room"
      footer="A proposal, not an announcement. The hour belongs to Janine; anything here can be cut."
      mobileCompact
      wide
    >
      <style>{`@media print { .no-print { display: none !important; } }`}</style>

      <JanineTopicTop />

      {/* Before the agenda, in the record's own red, because the agenda is what made her ask
          the question it answers: "I do not understand what you are seeking to achieve here." */}
      <TheShortAnswer />

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-record-ink/15 pb-3">
        <p className="max-w-[42ch] text-[13px] leading-relaxed lg:text-[14.5px]" style={{ fontFamily: 'var(--font-reading)' }}>
          Written for Janine M. H. Selendy, at her word that the hour was a struggle to shape — by the person who built
          the record, not by the host. A help-sheet, not a running order: hers to send, to cut, or to put down, and for
          anybody it reaches after her.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-record-muted">Set down 16 November 2026</p>
      </div>

      <div className="mt-4">
        <WorkshopStrip />
      </div>

      {/* This line used to say the slot was unconfirmed and that nothing here guessed at it —
          written on 16 November, before the festival's printed flyer reached us on the 20th.
          The flyer gives the hour, so the page was contradicting itself: one line said the time
          was unknown while the card, the programme and the cartoon room all printed 3pm. A page
          that disagrees with itself is the one fault a reader never forgives.

          And the flyer calls her hour a VIRTUAL workshop, while the pass-it-on card said "in the
          room and online". Both cannot be true, and the wrong one walks somebody to a museum in
          Benin City for an hour that is happening on a screen. So the format is attributed to the
          programme rather than asserted by us: if the programme is wrong, the programme is wrong,
          and this page is not the thing that made it up. */}
      <p className="mt-4 font-mono text-[11px] leading-relaxed text-record-muted">
        8th CartoonAFRICA International Biennial · 28–30 November 2026 · National Museum, Benin City, Edo State, Nigeria ·
        the biennial itself is hybrid, in the museum and online. Janine’s hour is Sunday 29 November, 3pm West Africa
        (2pm UK), as the festival’s printed programme has it — and that programme lists her hour as a virtual workshop,
        so this page does not promise a room in Benin City for it. If she moves it or changes its shape, the programme
        is right and this line is corrected in the open.
      </p>

      <WorkshopClocks />

      <JanineAgenda />

      <BrianTwoMinutes />

      <HandBack />

      <JanineSessionTile />

      <div className="mt-5 border border-record-ink/20 bg-record-bone/50 px-4 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-record-red">If this was forwarded to you</p>
        <dl className="mt-2.5 grid gap-2.5 lg:grid-cols-2 lg:gap-5">
          {CONTEXT.map(([term, line]) => (
            <div key={term} className="border-t border-record-ink/15 pt-2">
              <dt className="font-mono text-[10.5px] font-black uppercase tracking-wide">{term}</dt>
              <dd className="mt-0.5 text-[12.5px] leading-relaxed text-record-ink/85">{line}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Section n="03 · Boundaries" title="What is not in this hour">
        <ul className="space-y-1.5">
          {[
            'No pitch and no logo slide.',
            'No sign-up, no account, no price, nothing to install.',
            'No ranking of anybody’s drawing, and no address published.',
            'No picture of anybody: a room that was not photographed stays undrawn.',
            'Nobody explaining the drawings to the people who drew them.',
            'Two minutes from the record, and no more: her agenda gives Brian that slot, and he hands it straight back to Francis.',
          ].map((line) => (
            <li key={line} className="text-[13px] leading-relaxed text-record-ink/85 lg:text-[14.5px]">— {line}</li>
          ))}
        </ul>
      </Section>

      <Section n="04 · The ask" title="One thing, asked of the room">
        <p className="border-l-2 border-record-red pl-3 text-[14px] leading-relaxed lg:text-[17px]" style={{ fontFamily: 'var(--font-reading)' }}>
          Draw one more next week, somewhere that is not a workshop — a bus, a kitchen table, a classroom — and send it in.
          The record is only worth what outlives the hour.
        </p>
      </Section>

      <Section n="05 · Later" title="For whoever finds this in years to come">
        <p className="text-[13.5px] leading-relaxed lg:text-[15px]" style={{ fontFamily: 'var(--font-reading)' }}>
          This was set down on 16 November 2026, thirteen days before the session it describes. It is not a report of what
          happened — it is what was proposed, printed before the fact and left that way.
        </p>
        <p className="mt-3 text-[13.5px] leading-relaxed lg:text-[15px]" style={{ fontFamily: 'var(--font-reading)' }}>
          If the hour went ahead, what it produced is in the cartoon room, each drawing with the name of the hand that made
          it. If anything here changed on the day, the change is on the corrections page rather than quietly edited into this
          one. And if the session never happened at all, this page still says what was intended, which is the only honest
          thing for it to say.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          <Link to="/ClimateCartoons" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide underline decoration-dotted underline-offset-4">
            The Wall <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/ClimateCorrections" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide underline decoration-dotted underline-offset-4">
            Corrections, in the open <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      <div className="no-print mt-8 border-t border-record-ink/15 pt-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-record-muted">Pass it on</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <ShareCardButton entry={WORKSHOP_CARD} build={buildWorkshopShareCard} label="Send the card" />
          <button
            type="button"
            onClick={() => window.print()}
            className="flex min-h-[44px] items-center justify-center gap-2 border-2 border-record-ink px-4 py-3 font-mono text-[11px] font-black uppercase"
          >
            <Printer className="h-4 w-4" /> Print the hour
          </button>
        </div>
        <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-record-muted">
          The card is our own drawing: an empty frame, the date and the place. No addresses, no joining link, nothing about anybody.
        </p>
        {/* The address, so it can be pasted into a message rather than retyped from a card. */}
        <div className="mt-3 flex items-center gap-2 border border-record-ink/20 bg-record-bone/50 px-2 py-1.5">
          <code className="min-w-0 flex-1 truncate font-mono text-[11px] text-record-ink">{recordAddress('/ClimateWorkshop')}</code>
          <CopyLine text={recordAddress('/ClimateWorkshop')} label="Copy link" />
        </div>
      </div>
    </ClimateRecordShell>
  );
}