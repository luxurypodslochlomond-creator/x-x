// Shared wording keeps the header, footer and page index in agreement.
//
// ── FIVE DOORS, BECAUSE A THUMB ONLY HAS SO MUCH ROOM ─────────────────────────
// There were six places here plus the tongue, seven targets on a rail 393 pixels wide.
// Seven into 393 is about 56 each before padding, and the captions underneath them were
// already touching: "Founder" under "Search", "Impact" under "Map". Nothing was wrong
// with any single door. There were simply more doors than the screen can hold.
//
// Five is not a taste. Every tab bar a person already knows — iOS, Android, every phone
// setting they have ever opened — stops at five, because below that the target drops
// under a fingertip and the label stops being readable at a glance. So the rail is five,
// and the five are the five a reader actually arrives with, in the order they ask them:
// what is on the record, what changed, where it is, what was given to it, and find me
// something. Search is a door rather than a box because on a record of hundreds of
// entries it is the fastest way in, and it is the last door on the right, under the thumb.
//
// What came off is not gone. Readership and the founder are pages a reader meets once
// they are already inside, not questions they arrive with, so both live in the foot and
// in the contents sheet.
//
// The tongue is not in this list and should not be. A door goes somewhere; the tongue
// changes the voice of the page you are already standing on, which is why it sits on the
// masthead's own name line — the record's name on one side, the reader's tongue answering
// on the other — instead of taking a cell from a place to stand.
// ── THE MIDDLE DOOR IS THE COVENANT, AND IT SAYS WHAT THE PLATFORM IS ──────────
// Brian, 19 November: "x=x in middle should be red coolasfuck and underneath should say
// PLATFORM… i think platform is coolasfuck and x=x our hiding coolasfuck principles bro,
// time right etc as super intelligence new consciousness coming."
//
// It is the strongest thing that has been asked for on this rail, and it costs a word. The
// pivot of five doors was BASE 1 — the machine's own index — which is a useful door and a
// quiet claim. The pivot is now the one sentence the whole record rests on, printed in its
// own red.
//
// It said HELLO for an evening and it says PLATFORM again, on Brian's word: "that's weird
// says hello". He is right, and the reason is the one this rail was built on — a door that
// greets you instead of telling you where it goes is a riddle, and the word underneath was
// always meant to say what the thing is. The covenant is not a greeting. It is the platform,
// and the platform is x = x.
const PLATFORM_DOOR = {
  label: 'PLATFORM',
  to: '/XEqualsX',
  what: 'Why this record exists: Janine’s work, the planet, and how this is meant to help.',
};

const BASE_ONE_DOOR = {
  label: 'BASE 1',
  to: '/ClimateSearch',
  page: 'ClimateSearch',
  what: 'Ask the record’s own index — a place, a subject, a source.',
};

export const PRIMARY_NAV = [
  { label: 'Record', to: '/TogetherChangeClimate', page: 'TogetherChangeClimate', what: 'What is on the record: solutions, crises, actions and groups.' },
  // ── THE DOOR IS CALLED SIGNALS, AND THE WORD IS NOT A NEW NAME FOR THE BOOK ───
  // Brian, 19 November: "you sure signals covers wire and news bro… and is it signals from
  // the record, what is our record platform, what signals out there — like crises is that a
  // signal, and solutions and actions and groups, and cartoons all signals right, and
  // music? Are the signals bro?"
  //
  // Not all of them, and saying so out loud is what keeps the word worth something. A
  // signal is something sent to be acted on: a crisis is a warning, an action is something
  // you can join now, a milestone is a marker, an initiative is a thing already working.
  // A solution is not a signal — it is the answer a signal points you at. A gathering is a
  // place, a drawing is a drawing, a track is a gift. So this is one room where changes are
  // announced, and the record is still the record: the book the signals are kept in.
  //
  // "News" was the wrong word for a second reason. It implies a news cycle, and half of
  // what stands behind this door is a warning rather than an event — and a record that
  // calls a warning "news" is asking to be read as a paper rather than believed as a source.
  { label: 'The Wire', to: '/ClimateWire', page: 'ClimateWire', what: 'Sourced updates: what changed, where, and who says so.' },
  // ── THE MACHINE STANDS IN THE MIDDLE OF THE RAIL, THE COVENANT UNDER IT ───────
  // Brian, 19 November: "sorry base 1 should be on top and platform below and in red."
  // So the pivot of the top row is the thing that answers, and x = x sits in the quiet row
  // beneath it, where it can be red without shouting over the five ways into the record.
  BASE_ONE_DOOR,
  { label: 'Map', to: '/ClimateMap', page: 'ClimateMap', what: 'Where each entry happened, and how far the record has been read.' },
  // ── THE ROOM OF CARTOONS COMES ONTO THE RAIL ────────────────────────────────
  // It was on the contents sheet only, filed under Elsewhere, on the reasoning that a room
  // of drawings is something a reader goes looking for rather than arrives at. That was
  // wrong for one plain reason: a room nobody is offered is a room nobody enters. Brian,
  // 18 November: "can't hide it — don't you think it should be in nav too, with a custom
  // cartoon icon?" It is on the rail now, at the end of the row, with its own drawn mark —
  // a speech balloon with a face in it — so the record offers the drawings it was given
  // instead of keeping them behind a sheet. It is not repeated on the sheet: one door, one
  // place. Six cells on a handset, which is the number this row was drawn for.
  // ── AND IT IS CALLED THE WALL, BECAUSE THAT IS WHAT THE ROOM IS ──────────────
  // The door said "Cartoons", which names the medium rather than the place, and it was the
  // last thing on the record still calling the room something its own masthead no longer
  // says. A wall is the trade's word in every newsroom and every salon on earth: the thing
  // a drawing goes up on, and the thing people stand in front of and argue. Eight letters,
  // the same as "Cartoons", so no cell on the rail grew a pixel for it.
  { label: 'The Wall', to: '/ClimateCartoons', page: 'ClimateCartoons', what: 'Drawings given to the record, with the hand that made them still on them.' },
];

// ── THE RAIL'S SECOND ROW ─────────────────────────────────────────────────────
// These three are the half of the record a reader needs once they are standing in it: why
// it exists, how an entry is checked, and what has been corrected. They were drawn as a
// second row of the rail for a while; the rail is one row of six now, so they are printed
// in the "How it is kept" part of the sheet and stay here as the one place their wording
// is written down.
export const RAIL_SECOND_NAV = [
  // ── THE DOOR IS CALLED WHAT THE ROOM IS CALLED ───────────────────────────────
  // It said "Why", which is the question, and the room behind it answers that question
  // with a mark rather than a sentence: x = x. Brian, 19 November: "why in nav should be
  // x = x I think… makes sense to me this way." It does, and for the plainest reason a
  // door can have — a door carries the name of the room behind it, and the page's name is
  // x = x. "Why" also asked the reader to guess what they would find; the mark tells them.
  // It is set exactly as it is set everywhere else on the record, lower case, so the
  // caption drops the printer's upper-casing for this one door and keeps its tracking.
  // ── AND IT STANDS IN THE MIDDLE OF THE ROW ──────────────────────────────────
  // Brian, 19 November: "can you put x = x in middle centre bro please." On a handset the
  // quieter row has four cells — these two and the founder's name, with Explore closing it —
  // and four cells have no middle, so the covenant takes the one place nearest to it, with
  // the two doors about how the record is kept either side of it. Method first, because how
  // an entry is checked is the question that makes the covenant worth reading.
  { label: 'Method', to: '/ClimateMethod', what: 'Where an entry came from, who checked it, and what has been put right since.' },
  // The centre of the quiet row, and the covenant's place: x = x, printed in the mark's red
  // with PLATFORM under it, between the two doors about how the record is kept.
  PLATFORM_DOOR,
];

// ── THE DESK ROW, AND WHY IT IS LONGER THAN THE PHONE'S ────────────────────────
// A handset fits five ways in and one mark that opens the rest. A desk does not have that
// problem and should not pretend to: the masthead is a thousand pixels wide and was
// showing six marks squeezed into half of it, with the half that mattered — why the record
// exists, how an entry is checked, what has been corrected — three clicks deep inside a
// sheet that dimmed the page to open.
//
// Those three are the record's whole claim to being believed, and they are exactly what a
// reader like Janine looks for the moment she lands. So on a desk they stand in the row.
//
// Ten marks, and the ten is deliberate: five ways in, those three, her name, and the one that
// opens everything else. Ten across a thousand pixels is a hundred each — the widest this row
// gets before a caption starts to crowd, which is the honest limit. Nothing else is added that
// a reader does not arrive with: the roll, the music room, the cartoons, the seals and the host
// page are all things a reader goes looking for, and they live in the sheet, which is what the
// sheet is for.
//
// Built from the same two lists the rail and the sheet already read, so a desk can never
// show a door the record has stopped offering, or name one differently to a phone.
// ── HER NAME ON THE ROW, AND WHY THAT IS NOT EGO ──────────────────────────────
// It is the obvious question and it deserves an answer rather than a shrug: a record whose
// entire claim is that a reader should be able to check it has to say who asked for it. A
// page of sourced entries with nobody's name on it is not more modest than one that carries
// its keeper — it is less checkable. Provenance is the whole argument, and provenance starts
// with a person.
//
// What it must not be is the first thing. So she stands at the end of the row, after the
// three that say how the record is kept and immediately before Doors — because Doors is not a
// door, it is the index of all of them, and a signature belongs above the index, not after it.
// First would make the record about her; absent would make it unaccountable; last before the
// index is the one position that is both honest and quiet.
//
// It is a desk's mark only. Nine doors plus this one is a hundred a cell across a thousand
// pixels, and a caption still reads. A phone has five fingers of room, and there she would be
// taking a cell from "what is on the record" — which is the question a thumb actually arrives
// with. The sheet keeps her too, under her fuller name, one tap further in.
export const DESK_FOUNDER = {
  label: 'Founder',
  to: '/ClimateFounder',
  what: 'Janine M. H. Selendy, and the record she asked for.',
};

// ── THE PHONE'S TWO ROWS: FIVE, THEN FOUR ─────────────────────────────────────
// Brian, 19 November: "method why and founder should be in nav too bro at top need to
// reduce size on mobile and add them right sequence bro… and can BASE 1 be in middle."
//
// He was right that the record's own account of itself was missing from the one screen
// most readers hold it on. Why it exists, how an entry is checked and whose name is on it
// are the three things a sceptical reader checks first, and on a phone all three were
// behind a sheet you had to know to open. A record that will not say who asked for it until
// you go looking is not more modest than one that does; it is less checkable.
//
// Two rows, and the numbers are the argument. Five ways in on the top row — the four ways of
// moving through what is on the record, with BASE 1 exactly in the middle of them, where a
// desk has always put it — and then the record's own account beneath: why, how, whose, and
// the index of everything else. Nine doors in the height of two rows, because the marks come
// down from twenty-eight to twenty-four and the second row is set smaller again, the way the
// desk's second row already is: the row a reader arrives with stays the loud one.
//
// Built from the same lists the desk and the sheet already read, so a phone can never offer
// a door the record has stopped offering, or name one differently to a desk.
// ── AND x = x WAS NOT IN THE MIDDLE ON A PHONE, BECAUSE FOUR CELLS HAVE NO MIDDLE ──
// Brian, 19 November, holding it: "bri x=x isn't in middle in mobile looks coolasfuck on
// desktop though bro". He is right, and the whole of it is arithmetic. A desk's lower row is
// Method, Founder, Music, x = x, Roll, Seals — and with Explore at its end that is seven
// cells, so the covenant stands in the fourth, which is the exact middle of seven. A phone's
// lower row was Method, x = x, Founder and Explore: four cells, and four cells have no middle
// at all, so the covenant sat one cell left of centre while the same mark stood dead centre
// on a desk. The same door in two different places on two screens is the one thing this
// masthead is built never to do.
//
// So the phone's lower row takes a fourth door — the fingerprints, which are the other half
// of what a reader can actually check and were two taps deep inside the sheet — and the row
// reads Method, Founder, x = x, Seals, Explore. Five cells, x = x in the third: the middle,
// on both glasses at last.
//
// Nothing is lost by the move. The seals come onto the masthead, so they leave the sheet
// (one door, one place — the rule the sheet already keeps), and the music room and the roll
// stay where they were: a desk's row, and a phone's sheet.
// One wording for the fingerprints' door, because it now stands in two rows.
const SEALS_DOOR = { label: 'Seals', to: '/ClimateSeals', what: 'Check an entry’s fingerprint against the words on the page.' };

export const PHONE_NAV_ROWS = [
  PRIMARY_NAV,
  [RAIL_SECOND_NAV[0], DESK_FOUNDER, RAIL_SECOND_NAV[1], SEALS_DOOR],
];

// ── TWO ROWS ON A DESK, BECAUSE A SHEET WAS DOING A MASTHEAD'S JOB ────────────
// Brian, 18 November: "I'm sure two rows on top nav on desktop better bro and maybe more on
// desktop along top, as when you open explore the record there's lots going on quite complex
// bro not coolasfuck." He is right, and the fault was arithmetic: one row of a thousand
// pixels holds ten marks at a hundred each, so five real doors — why the record exists, how
// an entry is checked, who asked for it, the music, the people who check it — were living
// inside a panel that dimmed the page to open. A reader should not have to open an index to
// find out who is accountable for what they are reading.
//
// So the desk carries two rows. The first is the five ways in; the second is how the record
// is kept and what else is in it, with Explore at its end.
//
// Explore used to close the top row, which made it six cells — and six cells have no middle,
// so BASE 1 sat a hundred pixels left of the centre instead of on it. Brian, 19 November:
// "can make BASE 1 in middle of nav both desktop and mobile." Five doors and a middle is not
// a preference, it is arithmetic, and the phone had it right all along: Explore belongs after
// the record's own account of itself, not before it. The sheet keeps what a reader genuinely
// goes looking for — the brief, the covenant, the terms — which is the one job a sheet should
// have.
// ── THREE, THE COVENANT, THEN THREE MORE ──────────────────────────────────────
// Brian, 19 November: "can you put x = x in middle centre bro please." It had been the first
// cell of the row, at the far left, which made the one line the whole record rests on look
// like the opening item of a list. Six doors and Explore make seven cells, and seven cells
// have a true middle — so the covenant sits in it, with three doors either side, and the row
// reads outward from x = x instead of starting with it.
export const DESK_SECOND_ROW = [
  // How an entry is checked, whose name is on it, and the record's own signal.
  { label: 'Method', to: '/ClimateMethod', what: 'Where an entry came from, who checked it, and what has been put right since.' },
  { label: 'Founder', to: '/ClimateFounder', what: DESK_FOUNDER.what },
  { label: 'Music', to: '/ClimateMusic', what: 'The record’s theme, pressed to play. Nothing plays at you.' },
  // The middle cell, and the covenant's place on a desk: x = x in red, PLATFORM under it.
  PLATFORM_DOOR,
  // And what can be checked: the people, the fingerprints, and the index of everything else.
  { label: 'Roll', to: '/ClimateRoll', what: 'The people who check this record, in their own words.' },
  SEALS_DOOR,
];

export const DESK_NAV_ROWS = [PRIMARY_NAV, DESK_SECOND_ROW];

// The flat list, kept so anything that wants every desk door in one place still has it.
export const DESK_NAV = DESK_NAV_ROWS.flat();

// The terms of the record, stated in the masthead and again at its foot — these four
// are not destinations competing with the bar, they are the record's own rulebook.
export const FOOTER_NAV = [
  { label: 'Why this record', to: '/XEqualsX', what: 'Where this began, what it is for, and ways to use it.' },
  { label: 'Method & corrections', to: '/ClimateMethod', what: 'How entries are checked, who decides and what has been corrected.' },
  // "Contents" pointed here, and this is not the contents — the contents is the sheet the
  // masthead's Doors mark opens. This is the written guide: every control on the record, in
  // the order a reader meets it, and where each one leads. A name that promises one thing
  // and delivers another is the only kind of dishonesty this record can actually commit, so
  // the label now says what is behind it.
  { label: 'The guide', to: '/ClimateGuide', what: 'Every control on the record, written out, and where each one leads.' },
];

// ── THE REST OF THE BOOK ───────────────────────────────────────────────────────
// The foot of a printed record does a different job to its masthead: it is where the
// reader who has finished the page finds the things that are not on the way in. So the
// colophon carries exactly the doors the bar does not, and never a second copy of the
// bar — a foot that repeats the head teaches the reader that neither one matters.
export const ELSEWHERE_NAV = [
  // ── THE MUSIC ROOM STAYS, AND ONLY THE THEME IS IN IT ────────────────────────
  // The founder, 13 November 2026, half an hour after asking for the door off: "wasn't
  // room it was the tracks you enticed there… a taxi driver uploaded them which was very
  // kind but we need to mention the music door — Janine is speaking with Dillon too." So
  // the door stays open and the room stays findable; what changed is the room's contents.
  // MUSIC_HOLD holds every piece given until a person has heard it, and only the record's
  // theme stands — so a reader arriving today finds one honest line saying the theme is
  // being made with Dillon, and no shelf of somebody else's uploads to mistake for the
  // record's own signal. The tracks are not deleted and not judged: a taxi driver gave
  // them in good faith, and they wait their turn on the record.
  // ── THE MUSIC ROOM IS A DOOR HERE, BUT NOT ON THE RAIL ─────────────────────
  // It comes back here, on the contents sheet, where a reader who goes looking for the
  // music finds it: the record's theme, and the pieces given to it, each one pressed to
  // play and never played at anybody.
  //
  // It does not go back on the five-door rail, and that is not an oversight. Janine asked
  // for it in writing on 9 November: "it would be helpful to not distract by inviting
  // music… it will take viewers away from the entries of solutions and crises." That was
  // about arrival — the row a reader meets before they have read a single entry. A door on
  // the contents sheet invites nobody: you have to open the sheet and choose it. So the
  // request is kept and the room is reachable, which is the only version of this that
  // doesn't put the record in the position of quietly undoing her instruction.
  { label: 'The music room', to: '/ClimateMusic', what: 'The record’s theme, pressed to play. Nothing plays at you.' },
  // ── THE ROOM OF CARTOONS LEFT THIS SHEET FOR THE RAIL ───────────────────────
  // It lived here and it was the wrong place for it — a room of drawings that has to be
  // found by opening a sheet is a room nobody walks into. It now stands on the rail with
  // its own mark, and it is not repeated here, because a foot that repeats the head teaches
  // the reader that neither one matters.
  { label: 'Entry fingerprints', to: '/ClimateSeals', what: 'Check an entry’s fingerprint against the words on the page.' },
  // Reach came off this list when it went onto the rail: one door, one place. A foot that
  // repeats the masthead teaches a reader that neither one matters.
  { label: 'The founder', to: '/ClimateFounder', what: 'Janine M. H. Selendy, and the record she asked for.' },
  { label: 'Become a witness', to: '/ClimateFellows', what: 'What reading for the record involves, and how to ask to take part.' },
  // ── THE ROLL, AND WHY IT IS A DOOR HERE AND NOT ON THE RAIL ────────────────
  // The founder, 13 November: something coolasfuck for the checkers and volunteers that
  // is not a social network — their names, their own words, and the work that is actually
  // theirs, so they can see themselves on the record and Janine can see them too. It goes
  // beside the page that asks people to join, because the two questions are one: what is
  // this, and who is already doing it. A reader has to choose the sheet to find it, which
  // is right — a roll is not a room everybody walks into, and a volunteer's few lines
  // should not be dressed up as a feed.
  { label: 'Who witnesses', to: '/ClimateRoll', what: 'The people on the record’s list, in their own words, and what they have signed.' },
  { label: 'Host the record', to: '/ClimateHost', what: 'What carrying the record involves.' },
  // Support is off the record's doors at Janine's request, 9 November: "Donations can be
  // handled by a host. Please save this… for when we are discussing with a potential
  // host." The page is kept, in full and without her name on it — it simply is not being
  // offered to a reader while a host is being found.
];

// The terms it is kept under. These were reachable only from the foot, which put the
// record's own promises at the end of the longest scroll on the site.
export const TRUST_NAV = [
  { label: 'Terms', to: '/ClimateTerms', what: 'The terms this record is offered under.' },
  { label: 'Privacy', to: '/ClimatePrivacy', what: 'What the record collects, and what it refuses to.' },
];

export const SUPPORTING_PAGES = [
  { label: 'Project brief', to: '/ClimateBrief', what: 'What is live, what is planned, and what is still missing.' },
  // "Costs & responsibility" came off the foot with the handover sheet it pointed at: the
  // founder asked, on 9 November, that what it costs and what is still open be saved for
  // conversations with a potential host. The page is kept whole behind a keeper's key.
  //
  // ── THE STUDIO CAME OFF THE RECORD'S DOORS ────────────────────────────────────
  // The Studio is a good room and it is not this record's business. It stood on the
  // contents sheet among the doors of a climate record — a child's workshop beside the
  // founding letter — and a research panel opening that sheet would have to work out which
  // of these things belongs to the record and which is somebody else's product using the
  // same paper. The page is not deleted and the platform's own navigation still carries it;
  // it simply is not offered as a door of the record.
];

// The contents page: every public door once, in the order a reader meets it.
export const PAGE_INDEX = [
  ...PRIMARY_NAV,
  ...FOOTER_NAV,
  ...ELSEWHERE_NAV,
  ...TRUST_NAV,
  ...SUPPORTING_PAGES,
  { label: 'Open-source covenant', to: '/ExtractionProofCovenant', what: 'The terms under which the record is shared.' },
];

// One drawn index for the contents sheet and its permanent page. Never link it to itself.
//
// ── THREE PARTS, NOT FOUR ─────────────────────────────────────────────────────
// There were four, and the fourth held two doors — the brief and the studio — alone under a
// heading of its own. On a handset the sheet sets three doors across, so four parts fell as
// 3+2, 3+3, 3+1 and a lonely pair, and three of the four edges ended short. That is what read
// as an imbalance; nobody had to count it to feel it.
//
// The brief and the studio are things written about the record and made with it, which is
// what Elsewhere already means, so they go there: 5, 6, 6, and one short row in the whole
// sheet instead of three. Nothing is dropped, renamed or reordered — the same seventeen
// doors, in one fewer part.
// ── THE SEQUENCE, ASKED ABOUT AND ANSWERED ─────────────────────────────────────
// Brian, 16 November: "you sure sequence of every door is right? Founder should be up at
// the record and the rest — you sure right sequence too bro?" He was right on both counts,
// and the reason was that the parts were never drawn as a sequence at all: they were three
// piles of whatever list a door already lived in. "The record" was five ways in and nothing
// about the record itself, while the record's own provenance — why it exists, and whose
// name is on it — sat at number three under "Elsewhere", beside a room of cartoons.
//
// A contents page is a sentence, so it is now written as one, in the order a reader asks:
//
//   01 THE RECORD      what this is, why it exists, and who asked for it.
//   02 WAYS IN         the four ways of moving through what is on it.
//   03 HOW IT IS KEPT  the rulebook: how an entry is checked, what was corrected, the
//                      covenant it is shared under, and the terms it is offered on.
//   04 ELSEWHERE       the rooms you go looking for rather than arrive at.
//
// "The founder" is the change he asked for by name, and it belongs at 01 for the reason the
// masthead already gives: provenance is the first thing a sceptical reader checks, and a
// page of sourced entries with nobody's name on it is not more modest than one that carries
// its keeper — it is less checkable. Third in that part, never first: the record, then why
// it exists, then whose it is. First would make the record about her.
//
// Nothing was dropped, renamed or invented. The same nineteen doors, in an order that can be
// said out loud.
const FOUNDER_DOOR = ELSEWHERE_NAV.find(({ to }) => to === '/ClimateFounder');
const COVENANT_DOOR = PAGE_INDEX.find(({ to }) => to === '/ExtractionProofCovenant');

export const CONTENT_GROUPS = [
  {
    title: 'The record',
    // ── EVERY SHELF SAYS WHAT IT IS FOR, IN ONE LINE ────────────────────────────
    // Brian, 19 November: "when going to explore the record why does it feel complex…
    // this is our chance to tell people a story." He was reading an index of names and
    // getting no reason to care about any of them, which is what a filing cabinet does.
    // A shelf label that answers the reader's question in plain words — what is this,
    // why would I open it — turns the same doors into a walk through the record. The
    // line is a sentence, never a label: it is the only prose in the index.
    line: 'What this is, and whose name is on it.',
    doors: [
      PRIMARY_NAV.find(({ to }) => to === '/TogetherChangeClimate'),
      FOOTER_NAV.find(({ to }) => to === '/XEqualsX'),
      FOUNDER_DOOR,
    ],
  },
  {
    // "Ways in" was a lie on the contents: nobody was entering anything from that shelf, they
    // were going on to the wire, the map, the readership and the search. It says what it is now.
    title: 'More to read',
    line: 'What changed, where, and who says so.',
    doors: PRIMARY_NAV.filter(({ to }) => to !== '/TogetherChangeClimate'),
  },
  {
    // The same shelf, said in the record's own voice rather than a filing cabinet's: method,
    // corrections, the covenant, the terms and the privacy are all one claim, and the claim is
    // that nothing here is decided in the dark.
    title: 'Kept honest',
    line: 'How an entry is checked, and what was put right.',
    doors: [
      FOOTER_NAV.find(({ to }) => to === '/ClimateMethod'),
      COVENANT_DOOR,
      ...TRUST_NAV,
    ],
  },
  {
    // ── AND THE ORDER INSIDE THE SHELF IS A SENTENCE TOO ─────────────────────────
    // Brian, 19 November: "make sure not missed or duplicated … easy and logical … and
    // sequence bro." The doors here were in the order they happened to get written: the
    // music room first because it was argued about first, then the fingerprints, then the
    // two doors about the people who do the checking. Nothing was missing and nothing was
    // printed twice — the shelf simply had no order a reader could follow.
    //
    // So it reads in the order a reader asks: can I check this myself (the fingerprints),
    // can I take part (become a witness), who already does (who witnesses), what does
    // carrying it involve (host the record), what is still missing (the brief) — and the
    // music room last, because a room you go looking for belongs at the end of a list and
    // not in front of the record's proof. Its place in ELSEWHERE_NAV is untouched, so the
    // written guide's index still runs in the order it always has.
    title: 'Elsewhere',
    line: 'The rooms you go looking for, rather than arrive at.',
    doors: [
      ...ELSEWHERE_NAV.filter(({ to }) => to !== '/ClimateFounder' && to !== '/ClimateMusic'),
      ...SUPPORTING_PAGES,
      ...ELSEWHERE_NAV.filter(({ to }) => to === '/ClimateMusic'),
    ],
  },
];

export default SUPPORTING_PAGES;