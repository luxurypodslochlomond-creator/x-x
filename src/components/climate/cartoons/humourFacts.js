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

// ── WHAT FRANCIS ACTUALLY SAID, NOT WHAT I HEARD ─────────────────────────────
// The first draft of this chapter was called "The laugh is the door" and argued like a
// pitch deck: the turn, the three beats, the honest edge. Brian, 28 November: "the laugh is
// at the door is wrong bro… what Francis meaning I think was that humour is missing for us
// in places… I think new might be too hardcore bro but the cartoon can be humour, does the
// platform need to be too? I don't think so… I hope we're not sounding like 'post gesture
// notification', tech guys on this planet talk like that and are not coolasfuck activists
// like Francis et al."
//
// He is right on all three counts, and they are the same fault. Francis's point is not that
// a laugh is a clever delivery mechanism for a statistic. It is that a movement which never
// laughs has lost something it needs, and that the humour belongs in the drawings — not in
// the platform's own voice, which should stay plain. So the title is his thought, the voice
// is a person talking rather than a strategist, and the room stops trying to be clever at
// the reader. The figures stay, because they are the record's spine, and the honest bit
// stays, because without it this is just a nicer brochure.
export const HUMOUR = {
  eyebrow: 'What this movement keeps leaving out',
  headline: 'The missing piece is a laugh.',
  standfirst:
    'Francis sent this over from his own biennial: a Dutch cartoonist and a team of researchers, asking out loud whether a joke can make a person act. It is the right question to ask of a wall of drawings — and it points at something this movement has been getting wrong for a long time. The case for the climate has been made for forty years with figures. The figures are all true. Most people stopped hearing them a long time ago.',
  research: {
    line:
      'DELIAH — Democratic Literacy and Humour — is a four-year research project on humour and democracy in Europe. Tjeerd Royaards, a Dutch cartoonist, gave its session at the 8th CartoonAFRICA International Biennial on 28 November 2026.',
    short: 'How can humour inspire action?',
    by: 'DELIAH, with Tjeerd Royaards · 28 November',
    href: 'https://deliaheu.substack.com/p/how-can-humour-inspire-action',
    label: 'The session, in their own words',
  },
  counted: 'What this record has already counted',
  turn: 'Read the five again. Nothing in you moved.',
  turnNote:
    'Not because they are wrong. Because a figure has no face in it, no hand in it, and no room in it for you.',
  beats: [
    {
      head: 'A drawing puts a face on it, and a name.',
      body:
        'A figure tells you how big it is. A drawing tells you who did it, who paid, and who is lying about it — and those are the three things a person can actually do something about.',
    },
    {
      head: 'A joke gets past the guard.',
      body:
        'Nobody was ever argued out of “not now”. A laugh opens the door and the fact walks in behind it — which is why the funniest drawing in this room is often the one carrying the worst news.',
    },
    {
      head: 'It travels as a picture.',
      body:
        'A report has to be believed before it gets repeated. A drawing gets forwarded, printed, pinned to a wall and redrawn by somebody who never read the report at all.',
    },
  ],
  edge: {
    head: 'And the honest bit.',
    body:
      'A laugh on its own is entertainment, and there is plenty of that about. The test was never whether you laughed — it is what you did next. That is why the evidence stands beside every drawing in this room, and why the drawing is never dressed up as proof.',
  },
  gift: {
    head: 'A gift is not a wage, and a laugh is not payment.',
    body:
      'The drawings on this wall were given: drawn by hand, handed over for nothing, by people who were not paid to make them. This room cannot fix that, and will not pretend otherwise. What it can do is keep every one of them whole, with the hand and the name that made it, and say so where the drawing hangs.',
  },
  // The words that travel under the picture when it is passed on. A card that arrives
  // without them is a poster for something the receiver cannot name.
  shareLine:
    'A figure tells you how big it is. A drawing gets you through the door to do something about it. The wall, with the record’s own figures beside it — and every drawing kept whole, with the hand and the name that made it.',
};

export const HUMOUR_CARD = {
  id: 'the-missing-piece-is-a-laugh',
  title: HUMOUR.headline,
};