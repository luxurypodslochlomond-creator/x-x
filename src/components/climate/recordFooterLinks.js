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
export const PRIMARY_NAV = [
  { label: 'Record', to: '/TogetherChangeClimate', page: 'TogetherChangeClimate', what: 'Solutions, crises, actions and groups.' },
  { label: 'Wire', to: '/ClimateWire', page: 'ClimateWire', what: 'Dated, sourced accounts of what changed.' },
  { label: 'Map', to: '/ClimateMap', page: 'ClimateMap', what: 'Explore entries by place.' },
  // ── REACH, AND WHY IT IS ON THE RAIL ────────────────────────────────────────
  // Readership sat only in the foot and in the contents sheet, which for a record whose
  // whole argument is that it can be seen and checked is the wrong place for the one page
  // that shows who is reading it and from where. It is called Reach rather than Impact
  // because Impact sounds like a funder's spreadsheet and this is a fact about a page: how
  // far it has got, in how many tongues. Reach is also a word the record already uses.
  { label: 'Reach', to: '/ClimateImpact', page: 'ClimateImpact', what: 'Who is reading the record, from where, in which tongue.' },
  // Music is off the rail at Janine's request, 9 November 2026: "it would be helpful to
  // not distract by inviting music… it will take viewers away from the entries of
  // solutions and crises." The page still exists, and still holds only the record's own
  // theme, but nothing on the record invites anybody to it any more.
  { label: 'BASE 1', to: '/ClimateSearch', page: 'ClimateSearch', what: 'Ask the record’s own index — a place, a subject, a source.' },
];

// ── THE RAIL'S SECOND ROW ─────────────────────────────────────────────────────
// These three are the half of the record a reader needs once they are standing in it: why
// it exists, how an entry is checked, and what has been corrected. They were drawn as a
// second row of the rail for a while; the rail is one row of six now, so they are printed
// in the "How it is kept" part of the sheet and stay here as the one place their wording
// is written down.
export const RAIL_SECOND_NAV = [
  { label: 'Why', to: '/XEqualsX', what: 'The covenant: equal human worth, drawn rather than argued.' },
  { label: 'Method', to: '/ClimateMethod', what: 'How entries are sourced, screened and checked.' },
  { label: 'Corrections', to: '/ClimateCorrections', what: 'Changes to the record, with dates and reasons.' },
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
const DESK_FOUNDER = {
  label: 'Founder',
  to: '/ClimateFounder',
  what: 'Janine M. H. Selendy, and the record she asked for.',
};

export const DESK_NAV = [...PRIMARY_NAV, ...RAIL_SECOND_NAV, DESK_FOUNDER];

// The terms of the record, stated in the masthead and again at its foot — these four
// are not destinations competing with the bar, they are the record's own rulebook.
export const FOOTER_NAV = [
  { label: 'Why this record', to: '/XEqualsX', what: 'The covenant: equal human worth, drawn rather than argued.' },
  { label: 'How we check entries', to: '/ClimateMethod', what: 'How entries are sourced, screened and checked.' },
  { label: 'Corrections', to: '/ClimateCorrections', what: 'Changes to the record, with dates and reasons.' },
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
  // ── THE ROOM OF CARTOONS ────────────────────────────────────────────────────
  // Janine asked for a space for cartoons for the workshop of 29 November. A door on the
  // contents sheet rather than on the rail, for the same reason the music room is here:
  // the rail is the five questions a reader arrives with, and this is a room a reader goes
  // looking for — and, on the day, a link that can be handed straight to the people on the
  // call without changing the front page of the record the week before a workshop.
  { label: 'The big picture', to: '/ClimateCartoons', what: 'Make a three-panel cartoon on the page, sign it, and put it on a wall. Any age, any hand, any language.' },
  { label: 'Entry fingerprints', to: '/ClimateSeals', what: 'Check an entry’s fingerprint, and what it proves.' },
  // Reach came off this list when it went onto the rail: one door, one place. A foot that
  // repeats the masthead teaches a reader that neither one matters.
  { label: 'The founder', to: '/ClimateFounder', what: 'Janine M. H. Selendy, and the record she asked for.' },
  { label: 'Become a checker', to: '/ClimateFellows', what: 'What checking involves, and how to ask to take part.' },
  // ── THE ROLL, AND WHY IT IS A DOOR HERE AND NOT ON THE RAIL ────────────────
  // The founder, 13 November: something coolasfuck for the checkers and volunteers that
  // is not a social network — their names, their own words, and the work that is actually
  // theirs, so they can see themselves on the record and Janine can see them too. It goes
  // beside the page that asks people to join, because the two questions are one: what is
  // this, and who is already doing it. A reader has to choose the sheet to find it, which
  // is right — a roll is not a room everybody walks into, and a volunteer's few lines
  // should not be dressed up as a feed.
  { label: 'Who is checking', to: '/ClimateRoll', what: 'The people on the record’s list, in their own words, and what they have signed.' },
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
    doors: [
      PRIMARY_NAV.find(({ to }) => to === '/TogetherChangeClimate'),
      FOOTER_NAV.find(({ to }) => to === '/XEqualsX'),
      FOUNDER_DOOR,
    ],
  },
  {
    title: 'Ways in',
    doors: PRIMARY_NAV.filter(({ to }) => to !== '/TogetherChangeClimate'),
  },
  {
    title: 'How it is kept',
    doors: [
      FOOTER_NAV.find(({ to }) => to === '/ClimateMethod'),
      FOOTER_NAV.find(({ to }) => to === '/ClimateCorrections'),
      COVENANT_DOOR,
      ...TRUST_NAV,
    ],
  },
  {
    title: 'Elsewhere',
    doors: [...ELSEWHERE_NAV.filter(({ to }) => to !== '/ClimateFounder'), ...SUPPORTING_PAGES],
  },
];

export default SUPPORTING_PAGES;