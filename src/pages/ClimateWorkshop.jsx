import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Printer } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import ShareCardButton from '@/components/climate/ShareCardButton';
import WorkshopStrip from '@/components/climate/workshop/WorkshopStrip';
import { buildWorkshopShareCard, WORKSHOP_CARD } from '@/components/climate/workshopCard';

// ── THE 29TH, WRITTEN DOWN SO NOBODY HAS TO WRITE IT ────────────────────────────
// Janine asked for the agenda and the details. This is that, in one address she can send
// to CEEW, to the festival's curator, or to a classroom — written as a proposal, because
// the hour is hers to cut, and a page that pretended otherwise would be us taking her
// session off her in the name of helping.
//
// It used to open with four paragraphs, which is exactly the fault it was warning against:
// a workshop about drawings that had to be read to be understood. So the page now opens
// with the strip, and the strip ends in an empty frame. A reader who never reads a word of
// it still knows what the hour is: five frames, then the room's own.
//
// Three rules hold it together. Nothing personal is on it: no addresses, no phone numbers,
// no joining link, because a workshop's link is hers to hand out and her guests' details
// are theirs. Everything about the festival is in the festival's own words. And the offer
// stays small — one eight-minute block about the record inside an hour about African youth
// and democracy, because a longer one would be a different workshop.

const HOUR = [
  ['00:00', 'Four minutes · Why this hour exists', 'A cartoon can hold a hard idea without frightening the person holding it. That is why this is a workshop about drawings rather than a talk with slides.'],
  ['00:04', 'Eight minutes · Three drawings, shown whole', 'Three cartoons from What On Earth!, with their credit kept on them. One question asked of the room and not answered for it: what did that make you feel, before it told you anything?'],
  ['00:12', 'Six minutes · How a fortnightly cartoon gets made', 'The idea, the artist, the science check, the publish — from the team who make them, if they join the discussion.'],
  ['00:18', 'Eight minutes · Why collective action needs a record', 'One entry, its source, its seal, its keeper. No product, no sign-up, no price.'],
  ['00:26', 'Nineteen minutes · The draw', 'The strip goes up with its last panel missing. Everyone draws that panel, on paper, in pen or pencil.'],
  ['00:45', 'Seven minutes · Four panels, held up', 'Four people hold their panel to the camera and say what they drew. Not judged. Not ranked. Not scored.'],
  ['00:52', 'Six minutes · Where the drawings go', 'Sent in, looked at by a keeper, and put on the wall with the drawer’s name and their own line about it. Their email is never shown.'],
  ['00:58', 'Two minutes · One ask', 'Draw one more, next week, somewhere that is not a workshop — and send it.'],
];

const Section = ({ n, title, children }) => (
  <section className="mt-8">
    <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-record-red">{n}</p>
    <h2 className="mt-1 text-[19px] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
    <div className="mt-3">{children}</div>
  </section>
);

export default function ClimateWorkshop() {
  return (
    <ClimateRecordShell
      eyebrow="The record · 29 November 2026"
      marker="8th CartoonAFRICA International Biennial · Benin City"
      title="The 29th, written down"
      statement="One hour, five frames and a blank one. The session Janine Selendy is giving, set out so the room knows what it is getting before it arrives."
      returnTo="/ClimateCartoons"
      returnLabel="The cartoon room"
      footer="A proposal, not an announcement. The hour belongs to Janine; anything here can be cut."
    >
      <style>{`@media print { .no-print { display: none !important; } }`}</style>

      <WorkshopStrip />

      <p className="mt-4 font-mono text-[11px] leading-relaxed text-record-muted">
        8th CartoonAFRICA International Biennial · 28–30 November 2026 · National Museum, Benin City, Edo State, Nigeria ·
        hybrid. Workshop: Sunday 29 November, 3pm West Africa (2pm in Scotland).
      </p>

      <Section n="01 · The hour" title="Sixty minutes, to the minute">
        <ol className="divide-y divide-record-ink/15 border-y border-record-ink/15">
          {HOUR.map(([time, head, body]) => (
            <li key={time} className="grid grid-cols-[3.1rem_1fr] gap-3 py-2.5">
              <span className="font-mono text-[11px] font-bold tabular-nums text-record-red">{time}</span>
              <div>
                <h3 className="font-mono text-[11.5px] font-black uppercase leading-tight">{head}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-record-ink/85">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section n="02 · Afterwards" title="What happens to the drawings">
        <p className="text-[13.5px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
          Each one can be sent in from a phone, and it waits for a keeper — a person, not a filter — before it goes up. It
          is kept with three things and no more: the drawer’s name, where it came from, and one line in their own words.
        </p>
        <Link to="/ClimateCartoons" className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide underline decoration-dotted underline-offset-4">
          See the room it goes into <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Section>

      <Section n="03 · Boundaries" title="What is not in this hour">
        <ul className="space-y-1.5">
          {[
            'No pitch and no logo slide.',
            'No sign-up, no account, no price, nothing to install.',
            'No ranking of anybody’s drawing, and no address published.',
            'No picture of anybody: a room that was not photographed stays undrawn.',
          ].map((line) => (
            <li key={line} className="text-[13px] leading-relaxed text-record-ink/85">— {line}</li>
          ))}
        </ul>
      </Section>

      <Section n="04 · The ask" title="One thing, asked of the room">
        <p className="border-l-2 border-record-red pl-3 text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
          Draw one more next week, somewhere that is not a workshop — a bus, a kitchen table, a classroom — and send it in.
          The record is only worth what outlives the hour.
        </p>
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
      </div>
    </ClimateRecordShell>
  );
}