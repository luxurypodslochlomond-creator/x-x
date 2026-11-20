// ── WHAT THIS IS, IN THE WORDS THAT CAN BE CHECKED LATER ───────────────────────
// A cartoonist asked, before the workshop, whether this room is part of somebody else's
// campaign or a platform of its own. The answer has to outlive the chat, because the next
// cartoonist will ask the same thing and nobody will have the message.
//
// ── WHAT BRIAN SAID ON 20 NOVEMBER, AND WHAT WAS WRONG ────────────────────────
// "the wall has lots of copy not needed in places sentences don't make sense or give wrong
// context bro and hard to find what this is for page and when get there it's opposite of
// cartoons bro for am and bring text how can we get better bro"
//
// He was right on every count, and the worst fault was the first line of the old page:
//
//     "No to the first. No to the second."
//
// The question has two halves. Answering "no" to both of them and then saying "it is one
// record with rooms in it" is a contradiction in the third sentence of a page written for
// somebody reading English as a second language. A reader who hits that stops trusting the
// rest, and should. The answer is not two noes: it is a no to the first, and a different
// kind of no to the second — it is not a website, but it is not nothing either.
//
// The second fault was length. Eleven sections of paragraphs is the opposite of a room full
// of drawings, and this page is the first thing a cartoonist sees. So the page now opens
// with the answer, then one plate that shows the difference between a website and this room
// side by side, and only then — folded away, for whoever wants it — the long version.
//
// The third fault was the biography. The old page told a cartoonist what he had studied, and
// what happened in Bonn in 2019, from one newspaper piece he had written himself. That is a
// single source being worn as settled fact, on a record whose whole argument is that a claim
// says how well it is known. It is cut to what the record can stand behind.
//
// Two rules for the copy, and both are for the reader rather than for style:
//
//   • Short sentences, no idiom, no slang. This page will be read by people who work in
//     English as a second or third language. A sentence that needs the reader to know what
//     "no skin off my nose" means is a sentence that excludes the person it was written for.
//   • Every claim here is one the record can be held to. What is not there is said to be
//     not there.
export const ASKED = [
  'Is this part of somebody else’s campaign, or is it a platform of its own?',
];

export const SOURCES = [
  {
    label: 'The Nigerian Observer, 24 April 2026 — “Story of the traveling CartoonAFRICA SDG cartoon campaigns and workshops”',
    href: 'https://nigerianobservernews.com/2026/04/story-of-the-traveling-cartoonafrica-sdg-cartoon-campaigns-and-workshops/',
  },
];

// Three lines, and they have to be read in order or the answer is wrong.
export const SHORT = [
  'It is not part of somebody else’s campaign.',
  'It is not a website for the biennial either.',
  'It is one room in a record, and the room holds cartoons.',
];

// ── THE TWO PLATES ─────────────────────────────────────────────────────────────
// This is the whole page in one picture, and it is the part to send to a cartoonist: what a
// website has to do, and what this room does instead. Two things, not one. Nobody is being
// asked to move a festival into a record, and nobody is being told a record replaces a site.
export const COMPARE = {
  left: {
    label: 'A website for the biennial',
    lines: [
      'A programme, and a call for entries.',
      'Rules, a jury, a way to receive work.',
      'A way to sell the book.',
      'Eight editions of history in one place.',
      'It carries a yearly bill. When the bill is not paid, the site goes dark.',
    ],
    verdict: 'You still need this. It is a different job, and it is not this.',
  },
  right: {
    label: 'This room',
    lines: [
      'The drawings, and nothing else.',
      'Who drew it, where it came from, and one line in the drawer’s own words.',
      'No bill, no renewal date, no invoice in anybody’s name.',
      'Prints as a single sheet, or as a whole exhibition for a classroom.',
    ],
    verdict: 'This is the wall that outlives the festival.',
  },
};

export const AFTER = {
  head: 'After the 29th, nothing comes down.',
  list: [
    'The credit line never comes off the picture. The name of the hand that made a drawing stays with that drawing.',
    'Every drawing keeps where it came from and when it arrived, so a reader can go and check it.',
    'Entries are fingerprinted. If the words are changed later, the fingerprint stops matching, and the record says so in public.',
    'Corrections are made in daylight, with the date written on them.',
    'The whole record can be taken out as one file, drawings included, at any time. If this place ever stopped, the drawings would still leave with the people who want them.',
  ],
};

// The long version, folded away. Same words as before, cut of the paragraphs that were
// saying the same thing twice, and kept for the reader who is deciding properly.
export const MORE = [
  {
    head: 'Who asked',
    paras: [
      'Francis Umendu Odupute, in Benin City. He started the CartoonAFRICA International Biennial in 2012 and has held it every other year since. The eighth opens on 28 November 2026 at the National Museum in Benin City, and its subject is the climate.',
      'That is fourteen years of gathering other people’s drawings. This room does not get to be careless with it.',
    ],
  },
  {
    head: 'What a machine may do here, and what it may not',
    paras: [
      'A machine may add one line about what it can see in a drawing. That line is kept apart from the artist’s, labelled as the machine’s, and it never stands in for the artist’s words.',
      'A machine cannot source a picture, so a machine cannot put a drawing on the wall. A person does that. A drawing that arrives waits for a keeper, and it is a keeper who says yes.',
    ],
  },
  {
    head: 'What the artist decides',
    paras: [
      'Which drawings go up. What the line under them says, in the artist’s own words, uncorrected. What the credit says. Whether an address is shown.',
      'And a drawing can be taken down. Ask, and it comes down. The record keeps a note that it was taken down, and why, in the open. Not to hold it against anybody, but so that nothing on this record disappears without trace, including a drawing that left at its artist’s request.',
    ],
  },
  {
    head: 'What to send',
    paras: [
      'One drawing. One line in the artist’s own words about what it is for. The credit as it should be printed, if the drawing is held by anyone other than the artist.',
      'That is the whole ask. Everything else on the wall follows from it.',
    ],
  },
  {
    head: 'What is not here',
    paras: [
      'No money for the biennial. No likes, no followers, no ranking, no view counts set beside another cartoonist’s to make one compete with the other. No advertising. No addresses sold. No rights taken: the drawing stays the artist’s.',
      'And no funder behind any of this yet. That should be known before any work is put here.',
    ],
  },
];