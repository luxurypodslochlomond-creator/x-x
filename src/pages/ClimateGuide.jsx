import React from 'react';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import GuideBand from '@/components/climate/GuideBand';
import { PRIMARY_NAV, FOOTER_NAV } from '@/components/climate/recordFooterLinks';
import RecordPageIndex from '@/components/climate/RecordPageIndex';
import ShareCardButton from '@/components/climate/ShareCardButton';
import AskTheRecord from '@/components/climate/AskTheRecord';
import { buildGuideShareCard, buildWayInShareCard } from '@/components/climate/shareCardImage';

// The record's own mark for music, at the size of the words it stands beside. The note
// glyph is gone from this page: the fork is the record's, and the guide of the record's
// own buttons should not point at music with somebody else's sign.

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
  title: 'The guide',
  headline: 'The guide — every control on the record',
  marker: 'Every control, written out · and where it leads',
  body: 'Every button on the record, in the order you will meet it, and the one thing each one does. Tap a line and it takes you there.',
  inside: [
    '01 · The drawn navigation on every page',
    '02 · Sending something in',
    '03 · Reading one entry',
    '04 · Every tongue a reader can name',
    '05 · The first five minutes',
    '06 · The foot of every page',
    '07 · When you are the keeper',
    'Every open door, printed',
  ],
  closing: 'The same drawn marks lead to the same places on every page, with a short name beneath each one.',
  url_path: '/ClimateGuide',
};

const BAR = PRIMARY_NAV;

const SEND = [
  {
    label: 'Send an entry to the wire',
    to: createPageUrl('ClimateWire'),
    what: 'One dated, sourced thing that changed. The button sits at the top of the Wire.',
  },
  {
    label: 'Submit a solution, crisis, or action',
    to: createPageUrl('TogetherChangeClimate'),
    what: 'Read the record, then fill the form. An entry that carries its source goes on as it arrives; one without a source, or one the screening is unsure of, waits for a person.',
  },
  {
    label: 'Start a group',
    to: createPageUrl('TogetherChangeClimate'),
    what: 'People working on the same thing in one area. A name, a topic, a region, and one contact line.',
  },
  {
    label: 'Bring a drawing to the wall',
    to: '/ClimateCartoons',
    what: 'The room opened for the 29 November workshop on cartoons for climate: who drew it, where it came from, one line on what it is for — and the record’s machine reading, offered in the drawer’s hands to rewrite.',
  },
  // The door for artists is closed at Janine's request, 9 November 2026 — no invitation
  // to give music, because it takes a reader away from the entries of solutions and
  // crises. The music page and what was already given are untouched.
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
    what: 'On every entry\u2019s own page, on the wire, and on every track in the music room. One tap draws the card and offers it to the share sheet already on the device, picture and link together. It is drawn portrait, for a phone, not as a wide desktop banner, so it goes into a post as it is. The origin, the place and how well it is known ride inside the picture, so nothing goes out with its source cut off. Where a device has no share sheet, the card is put on screen to keep and pass on, never a silent download. Nothing is counted, and nothing follows anyone. This page has one of its own, above the bands, so the whole manual can be taken in one piece and handed on.',
  },
  {
    label: 'Correction',
    what: 'When the record is corrected, the correction stays in the open with the date it was made.',
  },
];

const TONGUE = [
  {
    label: 'The language bar',
    what: 'Under the masthead, on every page of the record. A tongue is translated once, kept, and handed to every reader after that — so the signatory never waits.',
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
    label: '3. Open Latest',
    to: createPageUrl('ClimateWire'),
    what: 'Dated, sourced entries. Press Send an entry to the wire to see the submission form.',
  },
  {
    label: '4. Press Search',
    to: createPageUrl('ClimateSearch'),
    what: 'Look up a country or a subject you already know about, and see what the record holds.',
  },
  {
    label: '5. Open Reach',
    to: createPageUrl('ClimateImpact'),
    what: 'Who is reading, in countries, and in which tongue — and how a reader can name their own nation.',
  },
  {
    label: '6. Change the language',
    what: 'The bar under the masthead. Every page of the record changes with it.',
  },
];

// ── THE FOUR ROOMS, WHICH IS WHAT IS ACTUALLY THERE ──────────────────────────────
// This list used to name seven buttons "in the order you will use them" — and the room
// has four. The extra three were pages a keeper reaches from inside the Record room, so
// a host reading this guide was being told there were seven doors and would have gone
// looking. What a keeper meets, in order, is here: Decide, Check, People, Record.
const KEEPER_DOORS = [
  {
    label: 'Decide',
    door: true,
    what: 'One entry at a time: on the record, or not yet. Both are written down in your name, and \u201cnot yet\u201d is never counted as a rejection.',
  },
  {
    label: 'Check',
    door: true,
    what: 'Read the sources behind an entry and say what you found. This room decides nothing — it is a second pair of eyes, and a checker is given this one only.',
  },
  {
    label: 'People',
    door: true,
    // Janine, by email, 13 November: "we have two excellent sounding volunteers to do
    // research and checks. How do I get them started on the platform?" — answered here, on
    // the page she was handed, because this is the only page she has. The line also had to
    // stop claiming two keys for everything: a checker is a pair of eyes and one keeper's
    // word puts them on the list. Only the keys themselves need two. Saying otherwise made
    // a keeper expect a delay that never comes, and made the record sound harder to join
    // than it is.
    what: 'Who holds a key and who is asking for one — and the door a volunteer comes in by: type their name and address, and the record writes to them with their way in. One keeper\u2019s word is enough for a checker, because a pair of eyes is not a set of keys. The keys themselves move on two: one keeper proposes, a second agrees.',
  },
  {
    label: 'Record',
    door: true,
    what: 'What the record holds and where a claim came from: how much is waiting, how much nobody has opened, and how many checks were made this week. Every number is a way in to the page where it is dealt with.',
  },
];

// The footer stays short; the directory above carries every other public destination.
const FOOT = [
  ...FOOTER_NAV,
  { label: 'Terms', to: '/ClimateTerms', what: 'The terms under which the record is used.' },
  { label: 'Privacy', to: '/ClimatePrivacy', what: 'What the record keeps, and what it never does.' },
  { label: 'The custodians’ room', to: '/ClimateKeeperRoom', what: 'Where invited custodians decide and signatories write their notes — one door, two kinds of key.' },
];

// The way in, as a card Janine can forward. Five lines, in the order a keeper does them,
// and one promise at the foot: no entry goes up without a person's name on it.
const WAY_IN_CARD = {
  id: 'way-in',
  badge: 'FOR A CUSTODIAN',
  title: 'The way in',
  body: 'Five lines, on a phone. Nothing here waits on a second person except the keys.',
  steps: [
    { do: 'Sign in with the address this record knows', what: 'Google, or a password. That address is the one it recognises.' },
    { do: 'Open the custodians\u2019 room', what: 'The drawn door at the top of any page. It opens to a custodian only.' },
    { do: 'People \u2192 add by email', what: 'A signatory goes on with one word. A custodian needs a second custodian to agree.' },
    { do: 'Decide: yes, or not yet', what: 'Yes writes your name on the entry. Not yet keeps it waiting, with your reason beside it.' },
    { do: 'Seal what went up', what: 'One tap. Anyone can check the seal in their own browser, without trusting us.' },
  ],
  closing: 'Nothing goes on this record without a person\u2019s name on it.',
  url_path: '/ClimateGuide',
};

export default function ClimateGuide() {
  return (
    <ClimateRecordShell
      compact
      eyebrow="The record · the way through"
      title="The guide"
      returnTo={createPageUrl('TogetherChangeClimate')}
      returnLabel="Back to the record"
      footer="Handed to a host or keeper, this page is the whole of the manual. The same drawn marks lead to the same places on every page, with a short name beneath each one."
    >
      {/* The manual's own card, before the writing: the whole guide can leave in one piece.
          Below it, the same thing said short — the way in, for a keeper who is starting
          today and has not got time to read a manual before she does her first entry. */}
      <div className="mb-6 space-y-2">
        <ShareCardButton
          entry={BUTTONS_CARD}
          build={buildGuideShareCard}
          label="Share the manual as a card"
        />
        <ShareCardButton
          entry={WAY_IN_CARD}
          build={buildWayInShareCard}
          label="Send the way in as a card"
        />
      </div>

      {/* ── ASK IT RATHER THAN WRITE TO SOMEBODY ────────────────────────────────────
          The page a host or keeper is handed should be able to answer back. This sits above
          the printed manual: a question typed here is answered from the same manual, in one
          sentence, with the door to walk through — so nobody waits on an inbox to find out
          what a button does, and nobody is given an answer the record cannot stand behind. */}
      <AskTheRecord />

      <h2 className="mb-5 text-2xl text-record-ink">Using the record</h2>

      <GuideBand
        number="01"
        heading="The drawn navigation on every page"
        note="The same drawings at the top and foot of the screen open Record, Wire, Map, Reach and Search. The foot also opens Why this record, How we check entries, Corrections and this guide. An invited keeper also sees the keeper’s door there."
        items={BAR}
      />

      <GuideBand
        number="02"
        heading="Sending something in"
        note="Anyone may send an entry in. An entry that carries the link to its source — and that the screening reads as clean — goes on the record as it arrives; one without a source, or one the screening is unsure of, waits for a person. The sender’s email is used only to reach them about it, and is never shown to a reader."
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
        note="How we check entries, Corrections and this guide. Terms, Privacy and keeper access sit below. The Doors mark in the masthead opens every open door on one screen, without leaving the page."
        items={FOOT}
      />

      <GuideBand
        number="07"
        heading="When you are the keeper"
        note="Four rooms sit behind the keeper’s door, in the order a keeper meets them. A checker is given the second one only. A reader never sees any of them, and nothing goes on the record or comes off it without one of them being used."
        items={KEEPER_DOORS}
      />

      {/* ── TWO JOBS, WALKED END TO END ─────────────────────────────────────────────
          Janine, by email: "Please walk me through the steps I should have her follow to
          sign in and find her way about." That is the whole reason these two bands exist.
          The rooms above say what each door is; these say what a person actually does, in
          the order they do it, in words that assume nothing.

          Two rules held to throughout. Nothing is promised that the record does not do —
          a checker still cannot publish, and a keeper still cannot put an entry up without
          their own name on it. And "not yet" is named as what it is, because the fastest
          way to lose a volunteer is to let them believe a hold means they were wrong. */}
      <GuideBand
        number="08"
        heading="If you are a checker, end to end"
        note="A checker is a pair of eyes. You read what is waiting, you say what you found, and you sign it with your own name. You cannot publish, change or delete anything — that is not a limit on your standing, it is what makes your note worth reading."
        items={[
          {
            label: '1 · A keeper puts you on the list',
            what: 'One keeper\u2019s word is enough for a checker, because a pair of eyes is not a set of keys. The record writes to you the same day with your way in, and names the keeper who put you there.',
          },
          {
            label: '2 · Sign in with that address',
            to: '/ClimateChecking',
            what: 'The invitation opens the checking room. Use the address the keeper typed — that is the one the record knows you by. If you have not set a password yet, the sign-in screen sends you one.',
          },
          {
            label: '3 · Open the first entry waiting',
            to: '/ClimateChecking',
            what: 'The queue is the work: entries a keeper wants a second opinion on. One at a time, newest first. Nothing is timed and nothing is counted against you.',
          },
          {
            label: '4 · Open the origin, not just the entry',
            what: 'Every entry carries the body, journal or document it came from, with a link. Read that. The entry is somebody\u2019s sentence about the source; the source is the thing you are checking.',
          },
          {
            label: '5 · Say what you found, in your own words',
            to: '/ClimateChecking',
            what: 'Three answers: it holds up, it does not, or you could not tell. All three are useful and none is a failure — "I could not tell" is often the most honest line on a page. Your name goes on it.',
          },
          {
            label: '6 · What happens next is not yours to carry',
            what: 'A keeper reads your note and decides: on the record, or not yet. A hold is never counted as you being wrong. Your note stays on the entry either way.',
          },
          {
            label: '7 · Your line on the roll, if you want one',
            to: '/ClimateRoll',
            what: 'A few words about yourself, written by you and by nobody else, standing beside your name. Leave it empty and you are simply not shown — the list itself stays private, and your address is never on it.',
          },
        ]}
      />

      <GuideBand
        number="09"
        heading="If you are the keeper, end to end"
        note="The keeper is the person the record answers to. Everything below is one sitting\u2019s work, in the order it is done; none of it needs anybody else\u2019s permission except the second key, which is the point of the second key."
        items={[
          {
            label: '1 · Put a volunteer on the list',
            to: '/ClimateKeeperRoom?tab=people',
            what: 'People, then their name and address. A checker is on with one keeper\u2019s word. A second keeper needs a second keeper: you propose, they agree, and only then do the keys move.',
          },
          {
            label: '2 · Tell the record to tap your screen',
            to: '/ClimateKeeperRoom?tab=people',
            what: 'The line at the top of People, one tap, on a phone or a laptop. After that you are tapped when something needs you and the letters stop — a letter is only sent when nobody\u2019s device answered.',
          },
          {
            label: '3 · Decide, one entry at a time',
            to: '/ClimateKeeperRoom?tab=decide',
            what: 'Read the entry and its origin, then say yes or not yet. Yes writes your name on the entry as its editor and a line in the audit trail. Not yet keeps it exactly as it is, with your reason beside it. Both are decisions and both are recorded.',
          },
          {
            label: '4 · Seal what you published',
            to: '/ClimateSeals',
            what: 'A fingerprint of the entry\u2019s words as they stood. Anyone can recompute it in their own browser, so a reader never has to trust us. If the words change without a new seal, the record says so in public.',
          },
          {
            label: '5 · Read where the record is thin',
            to: '/ClimateKeeperRoom?tab=counts',
            what: 'How much is waiting, how much nobody has opened, and how many checks were made this week. Every number is a door into the page where that work is done.',
          },
          {
            label: '6 · If you are ever unsure, do nothing',
            what: 'An entry that waits is not a failure; an entry that goes up unread is. Nothing on this record punishes a keeper for taking another day.',
          },
        ]}
      />

      {/* ── THE DOORS, TYPED ────────────────────────────────────────────────────────
          This page used to open with the drawn index under its own "Index" title, so the
          manual began with a second masthead: a reader met a menu on top of the writing,
          which is why the page felt like two pages stapled together. The sheet already
          opens the doors from anywhere, in drawn marks and on one screen. What the guide
          needs is that same list in print, for the hand carrying the page away — so it
          stands here at the foot and carries the same name as the sheet, so nobody has to
          work out whether they are two different things. They are not: one list, two forms. */}
      <section className="mt-10 border-t border-record-ink pt-6">
        <h2 className="mb-1 text-2xl text-record-ink">Every open door</h2>
        <p className="mb-5 text-[11px] font-mono uppercase tracking-[0.16em] text-record-muted">
          Contents · the same list the sheet opens, printed
        </p>
        <RecordPageIndex compact />
      </section>
    </ClimateRecordShell>
  );
}