import React from 'react';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import GuideBand from '@/components/climate/GuideBand';

// ── THE BUTTONS ──────────────────────────────────────────────────────────────────
// What Janine asked for, kept in the record's own hand: the list of buttons, in the
// order a host or handler meets them, each one saying what it does in a single line.
// It is a page of the record rather than a document beside it, so it wears the same
// paper, the same ink and the same lettering — and so the buttons it names can be
// tapped straight from the list. Nothing is described that is not there, and nothing
// behind the keeper's door is handed to a reader.

const BAR = [
  {
    label: 'Search',
    to: createPageUrl('ClimateSearch'),
    what: 'Type what you are looking for. It reads the record, and nothing else.',
  },
  {
    label: 'Record',
    to: createPageUrl('TogetherChangeClimate'),
    what: 'The front page: solutions that work, the crises that need saying out loud, actions and gatherings.',
  },
  {
    label: 'Wire',
    to: createPageUrl('ClimateWire'),
    what: 'Dated, sourced entries: what changed, where, and who says so. A public record, not a feed.',
  },
  {
    label: 'Map',
    to: createPageUrl('ClimateMap'),
    what: 'The whole record by place.',
  },
  {
    label: 'Impact',
    to: createPageUrl('ClimateImpact'),
    what: 'How many people have read the record, and from which countries. No one is tracked.',
  },
  {
    label: '🎵 Music',
    to: createPageUrl('ClimateMusic'),
    what: 'The music given to the record: Dillon Squire\u2019s track, free to listen, the master whole, nothing to buy. The glyph is the door.',
  },
  {
    label: 'Founder',
    to: createPageUrl('ClimateFounder'),
    what: 'Janine M. H. Selendy, and the work the record stands on.',
  },
  {
    label: 'Support',
    to: createPageUrl('ClimateSupport'),
    what: 'Keep the record running. A gift, given, not sold.',
  },
  {
    label: 'Method',
    to: createPageUrl('ClimateMethod'),
    what: 'How the record is made: what is allowed on it, and what is not.',
  },
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
    label: '🎵 Give the record your track',
    to: createPageUrl('ClimateMusic'),
    what: 'The artist\u2019s own door, on the music page: no account, no signature, no fee, and their name stays on the work. A track is read at once, not queued — a clean one goes up the moment it is given, and the record prints the master\u2019s real format, read out of the file\u2019s own header.',
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
    what: 'On the wire, and on every entry\u2019s own page. The card carries its origin, its place and how well it is known, so nothing travels without where it came from.',
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

const HANDLER = [
  {
    label: 'Review queue',
    door: true,
    what: 'Every submission waits for a person. Publish it, hold it, or turn it away — the screener\u2019s note is advice only.',
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

export default function ClimateGuide() {
  return (
    <ClimateRecordShell
      eyebrow="The Buttons"
      marker="Every way through the record · nothing hidden"
      title="The Buttons"
      statement="Every button on the record, in the order you will meet it, and the one thing each one does. Tap a line and it takes you there."
      returnTo={createPageUrl('TogetherChangeClimate')}
      returnLabel="Back to the record"
      footer="Handed to a host or handler, this page is the whole of the manual. Nothing on it needs memorising: the record’s buttons are words, and each one says what it does."
    >
      <GuideBand
        number="01"
        heading="The bar at the top of every page"
        note="These nine ride on every page of the record. Search wears a box and an icon, so it reads as a door; the places you read follow it, and then the glyph for the music given to the record; the last three are the record itself."
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
        heading="Every tongue on Earth"
        note="Nobody is left out of the record for the language they were born into."
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
        heading="When you are the handler"
        note="Four buttons sit behind the keeper’s door, on the address the record was given for you. A reader never sees them, and nothing on the record goes up or comes down without one of them being used."
        items={HANDLER}
      />
    </ClimateRecordShell>
  );
}