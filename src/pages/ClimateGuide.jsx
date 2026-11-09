import React from 'react';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import GuideBand from '@/components/climate/GuideBand';
import FOOTER_DOORS from '@/components/climate/recordFooterLinks';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildGuideShareCard } from '@/components/climate/shareCardImage';
import COOLASFUCKTuningFork from '@/components/shared/COOLASFUCKTuningFork';

// The record's own mark for music, at the size of the words it stands beside. The note
// glyph is gone from this page: the fork is the record's, and the guide of the record's
// own buttons should not point at music with somebody else's sign.
const FORK = <COOLASFUCKTuningFork size={15} tone="signal" className="flex-shrink-0" />;

// ── THE BUTTONS ──────────────────────────────────────────────────────────────────
// What Janine asked for, kept in the record's own hand: the list of buttons, in the
// order a host or keeper meets them, each one saying what it does in a single line.
// It is a page of the record rather than a document beside it, so it wears the same
// paper, the same ink and the same lettering — and so the buttons it names can be
// tapped straight from the list. Nothing is described that is not there, and nothing
// behind the keeper's door is handed to a reader.

// The page's own card. It is built from the page's own lines — the marker, the statement,
// the six headings and the close — so the manual that leaves the record says exactly what
// the manual on the record says. Nothing is added for the card and nothing is dropped.
const BUTTONS_CARD = {
  id: 'the-buttons',
  title: 'The Buttons',
  headline: 'The Buttons — every way through the record',
  marker: 'Every way through the record · nothing hidden',
  body: 'Every button on the record, in the order you will meet it, and the one thing each one does. Tap a line and it takes you there.',
  inside: [
    '01 · The bar at the top of every page',
    '02 · Sending something in',
    '03 · Reading one entry',
    '04 · Every tongue a reader can name',
    '05 · The first five minutes',
    '06 · The foot of every page',
    '07 · When you are the keeper',
  ],
  closing: "Nothing on it needs memorising: the record's buttons are words, and each one says what it does.",
  url_path: '/ClimateGuide',
};

const BAR = [
  { label: 'Search', to: '/ClimateSearch', what: 'Look up a place or subject in the record.' },
  { label: 'Record', to: '/TogetherChangeClimate', what: 'Solutions, crises, actions and gatherings.' },
  { label: 'Wire', to: '/ClimateWire', what: 'Dated, sourced accounts of what changed.' },
  { label: 'Map', to: '/ClimateMap', what: 'Explore the record by place.' },
  { label: 'Impact', to: '/ClimateImpact', what: 'Readership counts by country and region.' },
  { label: 'Founder', to: '/ClimateFounder', what: 'Janine M. H. Selendy and the work the record stands on.' },
];

const SEND = [
  {
    label: 'Send an entry to the wire',
    to: createPageUrl('ClimateWire'),
    what: 'One dated, sourced thing that changed. The button sits at the top of the Wire.',
  },
  {
    label: 'Submit a solution, crisis, or action',
    to: createPageUrl('TogetherChangeClimate'),
    what: 'Read the record, then fill the form. A person reads every one before it goes on.',
  },
  {
    label: 'Start a gathering',
    to: createPageUrl('TogetherChangeClimate'),
    what: 'People working on the same thing in one area. A name, a topic, a region, and one contact line.',
  },
  {
    label: 'Give the record your track',
    icon: FORK,
    to: createPageUrl('ClimateMusic'),
    what: 'The artist\u2019s own door, on the music page: no account, no signature, no fee, and their name stays on the work. A track is read at once, not queued — a clean one goes up the moment it is given, and the record prints the master\u2019s real format, read out of the file\u2019s own header. A set can be given the same way: one continuous work by a selector with many works inside it, kept whole and never cut into chapters, with the works inside it shown as the selector\u2019s own text and taken on their word. Nothing is ever converted, and the giver\u2019s own choice about the master is said on the track: offered to take whole, or heard here only. Where it is offered, the file is there to keep — so a format a browser will not stream is never a door closed.',
  },
];

const READING = [
  {
    label: 'Tap the picture',
    to: createPageUrl('TogetherChangeClimate'),
    what: 'Every card and every wire entry opens on its own page: the whole entry, and the origin it came from.',
  },
  {
    label: 'Who says so',
    to: createPageUrl('ClimateMethod'),
    what: 'Every entry names its origin, and says out loud how well it is known: one source, corroborated, or the body\u2019s own record.',
  },
  {
    label: 'Copy the citation',
    what: 'On the entry\u2019s own page. The entry, its origin and its date, ready to quote.',
  },
  {
    label: 'Share this entry as a card',
    what: 'On every entry\u2019s own page, on the wire, on every track, and in the band under the music on the front page. One tap draws the card and offers it to the share sheet already on the device, picture and link together. It is drawn portrait, for a phone, not as a wide desktop banner, so it goes into a post as it is. The origin, the place and how well it is known ride inside the picture, so nothing goes out with its source cut off. Where a device has no share sheet, the card is put on screen to keep and pass on, never a silent download. Nothing is counted, and nothing follows anyone. This page has one of its own, above the bands, so the whole manual can be taken in one piece and handed on.',
  },
  {
    label: 'Correction',
    what: 'When the record is corrected, the correction stays in the open with the date it was made.',
  },
];

const TONGUE = [
  {
    label: 'The language bar',
    what: 'Under the masthead, on every page of the record. A tongue is translated once, kept, and handed to every reader after that — so the second reader never waits.',
  },
];

const FIRST = [
  {
    label: '1. Open the Record',
    to: createPageUrl('TogetherChangeClimate'),
    what: 'The front page, and the featured picture across the top.',
  },
  {
    label: '2. Open one entry',
    to: createPageUrl('TogetherChangeClimate'),
    what: 'Read it, then read where it came from. Nothing on the record stands without an origin.',
  },
  {
    label: '3. Open the Wire',
    to: createPageUrl('ClimateWire'),
    what: 'The dated entries. Press Send an entry to the wire to see the form a reader fills in.',
  },
  {
    label: '4. Press Search',
    to: createPageUrl('ClimateSearch'),
    what: 'Look up a country or a subject you already know about, and see what the record holds.',
  },
  {
    label: '5. Open Impact',
    to: createPageUrl('ClimateImpact'),
    what: 'Who is reading, in countries — and how a reader can name their own nation.',
  },
  {
    label: '6. Change the language',
    what: 'The bar under the masthead. Every page of the record changes with it.',
  },
];

const KEEPER_DOORS = [
  {
    label: 'The desk',
    door: true,
    what: 'Start here. What is waiting for a decision, what nobody has opened yet, and who is checking — every number a way in to the page where it is dealt with.',
  },
  {
    label: 'Review queue',
    door: true,
    what: 'Every submission waits for a person. Publish it, hold it, or turn it away — the screener\u2019s note is advice only.',
  },
  {
    label: 'The guest list',
    door: true,
    what: 'The people allowed to check an entry and nothing else. Add one and they are invited; take one off and it stops that moment. They never see who sent an entry.',
  },
  {
    label: "Keeper's log",
    door: true,
    what: 'The record\u2019s own diary: what a host said, what was decided and why, and what is still owed. A decision that is not written down gets re-made, differently, in six months.',
  },
  {
    label: 'Categories',
    door: true,
    what: 'Add, rename and reorder the record\u2019s categories without a developer, months or years from now.',
  },
  {
    label: 'Top crawl photos',
    door: true,
    what: 'The credited pictures across the top of the record, shrunk before they are stored so a phone opens them fast.',
  },
  {
    label: 'How well an entry is known',
    door: true,
    what: 'Set an entry\u2019s standing yourself: single source, corroborated, or the body\u2019s own record — left alone until a second origin is actually named.',
  },
];

// The same nine doors, in the same order, as the foot of every page. One word each.
const FOOT = [
  ...FOOTER_DOORS.map((item) => ({ label: item.label, to: item.to, what: item.what })),
  { label: 'Guide', to: '/ClimateGuide', what: 'This page: every control, and the one thing each does.' },
  { label: 'x = x', to: '/XEqualsX', what: 'The covenant: equal human worth, with the promises and their limits.' },
  { label: 'Terms', to: '/ClimateTerms', what: 'The ground the record stands on.' },
  { label: 'Privacy', to: '/ClimatePrivacy', what: 'What the record keeps, and what it never does.' },
];

export default function ClimateGuide() {
  return (
    <ClimateRecordShell
      eyebrow="The Buttons"
      marker="Every way through the record · nothing hidden"
      title="The Buttons"
      statement="Every button on the record, in the order you will meet it, and the one thing each one does. Tap a line and it takes you there."
      returnTo={createPageUrl('TogetherChangeClimate')}
      returnLabel="Back to the record"
      footer="Handed to a host or keeper, this page is the whole of the manual. Nothing on it needs memorising: the record’s buttons are words, and each one says what it does."
    >
      {/* The manual's own door out: one tap draws the whole page as a card, so a host or a
          keeper can take it with them and hand it on the way a track or an entry travels. */}
      <div className="mb-6">
        <ShareCardButton
          entry={BUTTONS_CARD}
          build={buildGuideShareCard}
          label="Share the manual as a card"
        />
      </div>

      <GuideBand
        number="01"
        heading="The bar at the top of every page"
        note="The top bar is for reading: Search, Record, Wire, Map, Impact and Founder. Invited keepers and checkers also see the Shed."
        items={BAR}
      />

      <GuideBand
        number="02"
        heading="Sending something in"
        note="Anyone may send an entry in. A person reads every entry before it stands on the record, and the sender’s email is used only to reach them about it. Music is the one exception, and it is deliberate: a track needs no source and no gate, so a clean one is on the record the moment it is given, and only a flagged one waits."
        items={SEND}
      />

      <GuideBand
        number="03"
        heading="Reading one entry"
        note="The record is read one entry at a time. Every entry carries its origin, and says how well it is known."
        items={READING}
      />

      <GuideBand
        number="04"
        heading="Every tongue a reader can name"
        note="Nobody is left out of the record for the language they were born into. Living tongues are carried whole; dead scripts are carried too, marked plainly as a machine's attempt, because nobody alive can check one."
        items={TONGUE}
      />

      <GuideBand
        number="05"
        heading="The first five minutes"
        note="The way to walk a visitor through the record, in order, without explaining anything."
        items={FIRST}
      />

      <GuideBand
        number="06"
        heading="The foot of every page"
        note="Nine doors, one word each, each with a hand-drawn mark for the thing behind it. No headings and no descriptions: press the mark. The covenant, the Guide, Terms, Privacy and the keeper / checker sign-in sit in a quiet line beneath them."
        items={FOOT}
      />

      <GuideBand
        number="07"
        heading="When you are the keeper"
        note="Seven buttons sit behind the keeper’s door, on the address the record was given for you, in the order you will use them. A reader never sees them, and nothing on the record goes up or comes down without one of them being used."
        items={KEEPER_DOORS}
      />
    </ClimateRecordShell>
  );
}