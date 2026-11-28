// ── THE ROOM'S OWN FACTS, IN ONE PLACE ─────────────────────────────────────────
// The cover, the biennial, the two editors and the workshop are printed in four places —
// the page's opening band, the pass-it-on card, the link preview and the anthology plate —
// and four copies of a date is how a record ends up disagreeing with itself. So they are
// written here once, and every one of those places reads them from here.
//
// The cover is the file Janine sent, stored publicly so it opens anywhere without a
// sign-in: it is CartoonAFRICA's picture, printed whole, never cropped, tinted or redrawn.
export const CARTOON_COVER = 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/04b7522a8_caib-2026-catalogue-cover.jpeg';

export const CARTOON_EVENT = {
  biennial: 'The 8th CartoonAFRICA International Biennial (CAIB) 2026',
  title: 'Climate Change and the Power of Collective Actions and Creative Interventions',
  when: '28–30 November 2026',
  where: 'National Museum, Benin City, Edo State, Nigeria',
  workshop: 'Janine Selendy’s workshop · Sunday 29 November · 3pm West Africa',
  // ── THE HOST'S JOINING DETAILS, IN FRANCIS'S OWN WORDS ───────────────────────
  // Francis sent these on WhatsApp at 14:11 on 28 November with one request: "Please share far
  // and wide among your friends. Let them join the meeting tomorrow." Until then the room said
  // the joining details came from the host, and left a box to paste them into. The host has now
  // given them, so the wall prints them: a person handed a flyer in a chat should be able to
  // walk straight in instead of asking somebody for a code.
  joining: {
    sentBy: 'Francis Umendu Odupute',
    link: 'https://us06web.zoom.us/j/72371978193?pwd=iV7l8AaKHPdgalL65Dmeqo-UVONhBSh.1',
    notes: 'https://us06web.zoom.us/j/72371978193?pwd=iV7l8AaKHPdgalL65Dmeqo-UVONhBSh.1&mynotes=on',
    meetingId: '723 7197 8193',
    passcode: '8skwa5',
    short: 'To join: us06web.zoom.us/j/72371978193 · passcode 8skwa5',
  },
  editors: 'Francis Umendu Odupute and Janine Selendy',
  // Janine, by WhatsApp on the evening of 18 November 2026: "By the way the art work of the
  // cover is by Francis." So the cover is not a house picture and not an unattributed
  // illustration — it is a named cartoonist's drawing, by the man who edits the book.
  // A room that gathers other people's drawings for a living does not print one without the
  // hand that made it, so his name travels with the picture wherever the picture goes: under
  // it on this page, on the pass-it-on card, and in the anthology's own facts.
  coverArt: 'Cover artwork by Francis Umendu Odupute',
  // The room in one line, used on the share card and anywhere the room introduces itself
  // without its own page around it. A card that carries a picture and a date but says
  // nothing about what it is has no bio: whoever receives it is looking at a poster for
  // something they cannot name. Africa and Asia are named because the room is neither.
  roomLine: 'A room of climate cartoons, with drawings from Africa, Asia and beyond.',
  // The line the pass-it-on card carries. A card sent for the event is not the room's
  // bio: whoever receives it has been handed a poster for one biennial, so it says what
  // the book is, in the anthology's own words, rather than describing a website.
  eventLine: 'An anthology of editorial cartoons and comics journalism by selected African and non-African cartoonists.',
  credit: 'CartoonAFRICA, prepared by African Press Cartoon services, 2026',
  // ── WHAT TRAVELS IN THE MESSAGE, NOT ONLY IN THE PICTURE ──────────────────────
  // A card shared into a chat arrives with a line of text under it, and that line was the
  // biennial's name and a web address and nothing else. So a cartoonist opening a forwarded
  // card saw a poster for something they could not name, in a place they were not told, for
  // an hour they did not know was online. The picture already says all of this; the message
  // has to say it too, because most people read the words before they open the picture.
  // Every fact here is one already held in this file — nothing new is claimed.
  shareLine: 'CartoonAFRICA 2026 · Benin City · 28–30 November. Climate cartoons and the people who draw them. Janine Selendy hosts one hour online: Sunday 29 November, 2pm UK · 3pm West Africa · 9am EST. Free. To join: us06web.zoom.us/j/72371978193 · passcode 8skwa5. Every drawing credited.',
};

// ── THE THREE DAYS, IN THE FESTIVAL'S OWN ORDER ────────────────────────────────
// Francis sent the printed flyer on 20 November 2026. It is the only source for this, so it
// is copied rather than summarised: his five items, his numbering, his spelling of his own
// programme. Two times are printed on it — the 9am opening in the room, and the 10am online
// session — and a third comes from the session's own page (10:00–11:30 Amsterdam time on
// Saturday 28 November). Nothing else has a time yet, so nothing else is given one: a
// programme that invents an hour is worse than one that says the hour is not fixed.
//
// The phone number on the flyer is deliberately not printed here. A mobile number on a public
// page is a number that gets scraped and called for years; the email address is enough for
// anybody who wants to ask about the biennial, and the number stays on the flyer he hands out.
export const CARTOON_PROGRAMME = {
  theme: 'SDG, African Youths and Democracy through Humour Lenses',
  items: [
    {
      n: '01',
      name: 'How can humour inspire action?',
      time: 'Saturday 28 November · 10:00–11:30 Amsterdam time (9:00–10:30 UK)',
      detail: 'A webinar led by the Dutch cartoonist Tjeerd Royaards, on how humour works and how it can be used to make people act, based on research by the European project Democratic Literacy and Humour (DELIAH). Online, open to all, on Google Meet.',
      link: { label: 'The session’s own page, with the joining link', href: 'https://deliaheu.substack.com/p/how-can-humour-inspire-action' },
      link2: { label: 'Register', href: 'https://howcanhumourinspireaction.rsvpify.com/' },
    },
    {
      n: '02',
      name: 'The travelling CartoonAFRICA SDG cartoon campaigns and artivism youth challenge and training series',
      // His own capital letters, from his own signature: "CAIB Curator". A man who has
      // carried this since 2012 is not described in lower case by anybody else's house style.
      time: 'Led by Francis Umendu Odupute, CAIB Curator',
      detail: 'The campaign that has been moving since 2019, when the United Nations SDG Action Campaign took the biennial’s cartoons to the SDG Global Festival of Action in Bonn, and from there into community halls and Africa Liberation Day events.',
    },
    {
      n: '03',
      name: 'Climate change and the power of collective actions and creative interventions',
      time: 'Sunday 29 November · 3pm West Africa (2pm UK)',
      detail: 'A virtual workshop led by Janine Selendy, founder of Horizon International at Yale University.',
      link: { label: 'Janine’s draft agenda', href: '/ClimateWorkshop#workshop-agenda', internal: true },
    },
    {
      n: '04',
      name: 'CartoonAFRICA Children’s Comics and Animation Funfair (CACCAFUN)',
      time: 'Time to be given by the organisers',
      detail: 'The children’s part of the biennial: comics and animation, made by children rather than for them.',
    },
    {
      n: '05',
      name: 'ACLAPS Awards',
      time: 'Time to be given by the organisers',
      detail: 'Recognising and celebrating those who have contributed to repositioning Africa’s cartoon industry.',
    },
  ],
  opening: 'The formal opening is in the room at the National Museum, Benin City, at 9:00am West Africa time (8:00 UK) on Saturday 28 November. The sessions themselves are hybrid: in the museum and online.',
  contact: 'africanpresscartoon@gmail.com',
};