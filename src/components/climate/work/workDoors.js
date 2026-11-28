// ── WHAT IS ACTUALLY BUILT, GROUPED BY WHO NEEDS IT ───────────────────────────
// Janine asked, on 28 November 2026, what the last couple of years of work had been.
// The answer is not a product list: it is a set of doors, and each door is opened by a
// different person on a different night. So they are grouped by the person rather than
// by the technology, and every one of them is a page that exists and opens.
//
// Nothing in here is a plan, a mock-up or a roadmap. A line that could not be pointed at
// a working page was left out, because the only thing this page has that a pitch does not
// is that every claim can be checked by the person reading it.

export const DOOR_GROUPS = [
  {
    n: '02',
    head: 'If it is a person in trouble tonight',
    note: 'Free, no account, and no advertising anywhere near them.',
    doors: [
      { name: 'SORTED', line: 'A frightening letter, decoded into plain words and a next move, in any language.', to: '/Sorted' },
      { name: 'BuzzStop', line: 'Tinnitus, worked at with sound until it quietens.', to: '/BuzzStop' },
      { name: 'BuzzTrip', line: 'A vagal reset for panic, withdrawal and the small hours.', to: '/BuzzTrip' },
      { name: 'Frequencies', line: 'Pain, sleep and recovery tones, with every source linked.', to: '/FrequencyChamber' },
      { name: 'Shed51', line: 'Two people in a room, breathing at the same rate.', to: '/Shed51' },
    ],
  },
  {
    n: '03',
    head: 'If it is an animal',
    note: 'Built on published research, with the papers on the page rather than in a claim.',
    doors: [
      { name: 'PetSounds51', line: 'Sound therapy for a dog left alone, a horse in a box, a cat in a carrier.', to: '/PetSounds51' },
    ],
  },
  {
    n: '04',
    head: 'If it is a child',
    note: 'No sign-up, no account, no data kept about a child. Ever.',
    doors: [
      { name: 'Studio and ZAPP', line: 'A child describes a game and it is built in front of them, with a buddy and a plain warning that a machine made it.', to: '/Studio' },
      { name: 'Magic51 and Learn51', line: 'Reading, maths and life skills for any child with a phone, free, in their own language.', to: '/Magic51' },
      { name: 'Earth51', line: 'A litter scanner that turns a walk into a score a child wants to beat.', to: '/Earth51' },
    ],
  },
  {
    n: '05',
    head: 'If it is the planet',
    note: 'This is the part Janine has been building towards for thirty years, and it is now a room she can walk into.',
    doors: [
      { name: 'The record', line: 'Climate solutions, crises and actions, each dated, sourced and signed. Nothing sold, nothing ranked.', to: '/TogetherChangeClimate' },
      { name: 'The Wall', line: 'Thirty-two drawings by thirteen hands, each credited to the hand that made it and kept after the exhibition comes down.', to: '/ClimateCartoons' },
      { name: 'Photo51', line: 'A photograph of litter picked becomes a token, and the tokens are meant to become food, essentials and kit for the people doing the picking.', to: '/NewCleanup' },
      // ── A DESIGN, NOT A SERVICE ──
      // Brian, 28 November, reading this page before sending it: "when click on links to p2p
      // Mesh's and papers etc feels really odd you sure bit talking bullshit". He was right.
      // The line described a running network. What exists is a published design, and the door
      // says so now, because the one thing this page cannot afford is a sentence that turns out
      // to be a hope when the person reading it opens the door.
      { name: 'P2P Food Rescue', line: 'A design rather than a running service: surplus food moved between food banks directly over mesh, published in full so anybody can build it.', to: '/P2PFoodRescue' },
      { name: 'Aletheia', line: 'A question asked, an answer given, and the source beside every sentence of it.', to: '/Aletheia' },
    ],
  },
  {
    n: '06',
    head: 'If it is work',
    note: 'The paid tools exist so the free ones do not have to be sold.',
    doors: [
      { name: 'CB51', line: 'An artist managed without a label taking the work.', to: '/CB51' },
      { name: 'TRACKT', line: 'Hospital equipment found when it is needed, by tag rather than by hunt.', to: '/Trackt' },
      { name: 'CTRL51', line: 'Public money watched for price gouging before it is spent.', to: '/CTRL51' },
      { name: 'PROF51', line: 'A student held together through a term.', to: '/Prof51' },
    ],
  },
];

// The pages that hold the argument rather than the tools. Sent to somebody who asks
// "how do you know?" rather than "what does it do?".
export const WORKING_PAPERS = [
  { name: 'The method', line: 'How an entry gets on the record, who checks it and what happens when it is wrong.', to: '/ClimateMethod' },
  { name: 'The seals', line: 'Every entry fingerprinted, and the check run in the reader’s own browser rather than ours.', to: '/ClimateSeals' },
  { name: 'Privacy, in mathematics', line: 'What is counted, what is never counted, and the arithmetic behind both.', to: '/PrivacyMathematics' },
  { name: 'Technical specification', line: 'What the thing is made of, written for somebody who will not take our word for it.', to: '/TechnicalSpecification' },
  { name: 'The extraction-proof covenant', line: 'The promises about what this can never be turned into, published as a licence.', to: '/ExtractionProofCovenant' },
  { name: 'Open platform', line: 'Every API, documented, for anybody who wants to build on it instead of beside it.', to: '/Platform' },
];