import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Printer } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import ShareCardButton from '@/components/climate/ShareCardButton';
import JanineTopicTop from '@/components/climate/workshop/JanineTopicTop';
import TheShortAnswer from '@/components/climate/workshop/TheShortAnswer';
import JanineSessionTile from '@/components/climate/workshop/JanineSessionTile';
import WorkshopClocks from '@/components/climate/workshop/WorkshopClocks';
import JanineAgenda from '@/components/climate/workshop/JanineAgenda';
import WhoIsAlina from '@/components/climate/workshop/WhoIsAlina';
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
  // "not speaking for it, and not filling it" was both diminishing and untrue: the hour she
  // is hosting has her opening it and closing it in her own words. A line that shrinks the
  // host on the page she sends to her own institution is the opposite of a courtesy.
  ['Janine M. H. Selendy', 'Founded Horizon International at Yale and has worked on climate communication for four decades. Janine hosts the hour: she opens it, closes it, and takes the room for questions at the end. This page is hers to cut, and the record is built in honour of her work rather than on top of it.'],
  ['This page', 'A proposal for that hour, set down before it happened. Read after 29 November, it is what was proposed — the drawings it produced live in the cartoon room.'],
];

// ── THE 29TH, WRITTEN DOWN SO NOBODY HAS TO WRITE IT ────────────────────────────
// Janine asked for the agenda and the details. This is that, in one address she can send
// to CEEW, to the festival's curator, or to a classroom — written as a proposal, because
// the hour is hers to cut, and a page that pretended otherwise would be us taking her
// session off her in the name of helping.
//
// Her draft agenda arrived on 24 November, and it is the spine of this page now. It gives
// Brian two minutes on the platform and a place in the closing remarks — the exact opposite
// of what this page used to insist. Her order is printed in JanineAgenda, the two minutes are
// written out in BrianTwoMinutes, and the invented running order, the five-frame strip and the
// blank-panel hand-back are off the page: they described an hour nobody had scheduled, and a
// page that hands a room paper and pen for an exercise the host never asked for is a page
// setting people up to be confused on the day.
//
// Three rules hold it together. Nothing personal is on it: no addresses, no phone numbers,
// no joining link, because a workshop's link is hers to hand out and her guests' details
// are theirs. Everything about the festival is in the festival's own words. And the record's
// own speaking time in the hour is exactly the two minutes she granted — no more, and none
// taken.

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
      painted
      eyebrow="The record · 29 November 2026"
      marker="03 · Janine M. H. Selendy’s session · CartoonAFRICA 8th Biennial · Benin City"
      title={`“${TOPIC}”`}
      statement="Janine Selendy’s topic, in the festival’s own words — and the hour in her order, from the draft agenda Janine sent on 23 November and corrected on the 24th. It is her draft, circulated for comment: where she changes it, hers is the agenda and this page follows."
      returnTo="/ClimateCartoons"
      returnLabel="The cartoon room"
      footer="A proposal, not an announcement. The hour belongs to Janine; anything here can be cut."
      mobileCompact
      wide
    >
      <style>{`@media print { .no-print { display: none !important; } }`}</style>

      <JanineTopicTop />

      {/* Before the agenda, in the record's own red, because the agenda is what made her ask
          the question it answers — she could not tell, from the page as it stood, what was
          being asked of her. Her own sentence is not printed: it was written to one person,
          and it is hers. */}
      <TheShortAnswer />

      {/* The six questions CEEW asked in writing, answered in writing and in her order, so a
          five-minute call is not spent reading facts out loud. One link, one page. */}
      <Link
        to="/ClimateWorkshopAnswers"
        className="mt-3 flex items-center justify-between gap-3 border border-record-ink/20 bg-record-bone/50 px-3 py-2.5"
      >
        <span className="text-[12.5px] leading-snug" style={{ fontFamily: 'var(--font-reading)' }}>
          Asked six questions in writing? They are answered in writing, in her order.
        </span>
        <ArrowRight className="h-4 w-4 shrink-0" />
      </Link>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-record-ink/15 pb-3">
        {/* ── HER PRIVATE WORDS WERE STANDING ON A PUBLIC PAGE ────────────────────
            Brian, 25 November: "you're saying Janine finding it a struggle etc, that was
            personal to me, don't want to make Janine look stupid."

            He is right, and this line was the fault. A remark she made to him privately — that
            the hour was hard to shape — was printed here, in public, on a page she may send to
            CEEW. A woman who founded Horizon International and has run this for four decades is
            not somebody who needs a help-sheet, and saying so in public is not honesty; it is
            unkindness wearing honesty's coat. Her words are hers to give. This page describes an
            hour; it does not describe her difficulties with it. */}
        <p className="max-w-[42ch] text-[13px] leading-relaxed lg:text-[14.5px]" style={{ fontFamily: 'var(--font-reading)' }}>
          Set down by the person who built the record, for the hour Janine M. H. Selendy is hosting. It is hers to send,
          to cut, or to put down — and for anybody it reaches after her.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-record-muted">Set down 16 November 2026 · the hour’s order corrected 25 November</p>
      </div>

      {/* The five-frame strip and its blank sixth panel are not on this page any more. They
          illustrated an hour we invented — a drawing exercise nobody scheduled — and a strip
          that promises the room paper and pen for something the host never asked for is a
          page setting people up to be confused on the day. The files stay; if she ever wants
          the exercise, it comes back, and it comes back as hers. */}

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

      <WhoIsAlina />

      <BrianTwoMinutes />

      {/* HandBack described a closing on a blank panel that her agenda does not have. She
          closes with remarks and invites Francis and Brian to add a few words — that is item
          07 of her own draft, and it is in JanineAgenda. A page that rewrites the host's
          ending is worse than a page with one section fewer. */}
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

      <Section n="02 · Boundaries" title="What is not in this hour">
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

      {/* ── THIS TOLD THE ROOM TO GO AND DRAW, AND THE HOUR ASKS THE ROOM NOTHING ───
          Brian, 25 November: "I don't think we are inviting the audience to make drawings,
          are we?" No. The hour is cartoonists presenting their own work, CEEW presenting its
          cartoons, and questions at the end — nobody in that room is asked to make anything.
          A page sending the audience off to draw was inventing an exercise for a session that
          has none, which is the same fault the nineteen-minute drawing slot had, one layer
          down. What is left is the door that is genuinely open, said to the only people it is
          open to. */}
      <Section n="03 · The door" title="One thing, for a cartoonist reading this">
        <p className="border-l-2 border-record-red pl-3 text-[14px] leading-relaxed lg:text-[17px]" style={{ fontFamily: 'var(--font-reading)' }}>
          A drawing made by hand, a photograph of it, your name and one line in your own words. The wall does not close
          when the hour does — that is the only part of this that outlives the day.
        </p>
      </Section>

      <Section n="04 · Later" title="For whoever finds this in years to come">
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
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-record-muted">Share</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <ShareCardButton entry={WORKSHOP_CARD} build={buildWorkshopShareCard} label="Send the card" includeMessage windowTitle="Send the hour" />
          <button
            type="button"
            onClick={() => window.print()}
            className="flex min-h-[44px] items-center justify-center gap-2 border-2 border-record-ink px-4 py-3 font-mono text-[11px] font-black uppercase"
          >
            <Printer className="h-4 w-4" /> Print the hour
          </button>
        </div>
        <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-record-muted">
          The card is drawn here, on your own device: the festival’s own header, the three things every drawing on the record carries, and the day. No addresses, no joining link, nothing about anybody — and nothing asked of the room.
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