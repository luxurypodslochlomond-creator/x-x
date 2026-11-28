import { GLOBAL_EVIDENCE } from '@/components/climate/founder/founderEvidence';

// ── THE ROOM'S CASE, AND WHERE EVERY NUMBER IN IT COMES FROM ─────────────────
// Brian, 28 November: "think he wants something similar in the wire bro but obviously more
// coolasfuck… we have the deaths right bro?"
//
// We do — the record has counted them since the founder page was written, each figure with
// its own definition, reference period and source. So nothing is retyped here. The five
// figures below are looked up by id out of the record's own evidence file, because a number
// that lives in two places is a number that will one day disagree with itself, and this
// record's rule is that a figure never travels without the body that gave it.
const FIGURE_IDS = ['heating', 'poverty', 'hunger', 'water', 'pledges'];

export const HUMOUR_FIGURES = FIGURE_IDS
  .map((id) => GLOBAL_EVIDENCE.find((row) => row.id === id))
  .filter(Boolean);

export const HUMOUR = {
  eyebrow: 'The case for the joke',
  // The chapter's name, and the whole argument in four words.
  headline: 'The laugh is the door.',
  standfirst:
    'On 28 November 2026, in the same biennial this wall was gathered for, a Dutch cartoonist and a European research project put the question out loud: does humour actually make people act? It is the right question to ask of a room full of drawings, and it deserves a better answer than “yes, obviously”. Here is this room’s own answer, with the record’s own figures beside it.',
  // Their session, credited to them, because the record points at other people's work
  // rather than swallowing it.
  research: {
    line:
      'DELIAH — Democratic Literacy and Humour — is a four-year research project on humour and democracy in Europe. Tjeerd Royaards, a Dutch cartoonist, gave its session at the 8th CartoonAFRICA International Biennial on 28 November 2026.',
    href: 'https://deliaheu.substack.com/p/how-can-humour-inspire-action',
    label: 'The session, in their own words',
  },
  counted: 'What this record has already counted',
  turn: 'Read the five again. Nothing in you moved.',
  turnNote:
    'Not because they are wrong. Because a figure has no face in it, no hand in it, and no room in it for you.',
  beats: [
    {
      head: 'A drawing puts the face and the culprit in the same frame.',
      body:
        'A figure tells you how big it is. A drawing tells you who did it, who paid, and who is lying about it — and those three things are what a person can actually act on.',
    },
    {
      head: 'A joke drops the guard a fact puts up.',
      body:
        'Nobody has ever been argued out of “not now”. A laugh gets past that door before the flinch closes, and the fact walks in behind it.',
    },
    {
      head: 'It travels as a picture, not as an argument.',
      body:
        'A report has to be believed before it is repeated. A drawing gets forwarded, printed, pinned up and redrawn by somebody who never read the report at all.',
    },
  ],
  edge: {
    head: 'And the honest edge of it.',
    body:
      'A laugh that stops at the laugh is entertainment, and the world is not short of entertainment. The test was never whether you laughed. It is what you did next. That is why the evidence stands beside every drawing in this room, and why the drawing is never dressed up as proof.',
  },
  gift: {
    head: 'A gift is not a wage, and a laugh is not payment.',
    body:
      'Eight years of drawings have come to this campaign as gifts — drawn by hand, given for nothing, by people who were not paid for them. This room can only do one of those two things honestly, so it does it: every drawing is kept whole, with the hand and the name that made it, and it says so where the drawing hangs.',
  },
  // The words that travel under the picture when it is passed on. A card that arrives
  // without them is a poster for something the receiver cannot name.
  shareLine:
    'A figure tells you how big it is. A drawing gets you through the door to do something about it. The wall, with the record’s own figures beside it — and every drawing kept whole, with the hand and the name that made it.',
};

export const HUMOUR_CARD = {
  id: 'why-the-laugh-is-the-door',
  title: HUMOUR.headline,
};