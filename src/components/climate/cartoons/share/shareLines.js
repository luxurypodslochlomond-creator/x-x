import { recordOrigin } from '@/components/climate/recordAddress';
import { CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';

// ── THE WORDS THAT TRAVEL WITH THE ROOM ────────────────────────────────────────
// Brian, 26 November, after the call with Alina and Janine: "we can spread this beyond
// WhatsApp… transmit everywhere with the right description."
//
// A link on its own travels badly. In a chat it is a blue line nobody opens, and on a
// feed it is a post with no bio. So the room now carries its own words, written for the
// place they are going — a group chat, a caption, a professional feed, a short post, one
// email — and each one is a plain description of what the wall is, with the address on
// the end where a thumb can reach it.
//
// Every fact here is one the record already holds: the biennial's own name and dates from
// cartoonEvent.js, the hands that signed the drawings, and a count read live from the wall
// when the page opens. Nothing is claimed that the room cannot show. Nothing asks anybody
// to pass anything on ten times: a record that begs is a chain letter.

export const ROOM_ADDRESS = `${recordOrigin()}/ClimateCartoons`;
export const HOUR_ADDRESS = `${recordOrigin()}/ClimateWorkshop`;

// ── THE DESCRIPTION, IN HER OWN WORDS ─────────────────────────────────────────
// Janine Selendy wrote this to Alina Sen at CEEW on 26 November 2026, after the call, when
// asked for a brief description of the initiative. It is quoted exactly — her spelling of
// "mobilization", her figure of 5.86 billion smartphones, her two paragraphs — because a
// description of somebody's work that has been tidied up is no longer their description.
// The salutation and her line about joining on Zoom are left out: they were to Alina, not
// about the work. Nothing is added to it, and her name stays on it wherever it travels.
export const JANINE_WORDS = `the initiative is international mobilization against climate change by means of the 5.86 billion smartphones, social media, and a web platform to alert to climate emergencies and to spread knowledge of efforts to mitigate climate change.

As people have early warning of emergencies, they will be better able to cope and as people learn about positive actions, they can benefit from those examples and be encouraged to do what they themselves can do.`;

const wall = (count) => (count ? `${count} climate cartoons` : 'A wall of climate cartoons');

// Her description on its own, kept apart from the room's words because it describes the
// whole initiative rather than this wall, and it travels with her name on it.
export function descriptionLine() {
  return {
    id: 'janine',
    where: 'Janine Selendy · the description, in her own words',
    note: 'Her words exactly, with her name kept on them and the room’s address after her sign-off. This is the shortest true description of the whole initiative this room belongs to.',
    text: `${JANINE_WORDS}\n\n— Janine Selendy, who hosts Sunday’s workshop\n\nThe cartoon room: ${ROOM_ADDRESS}`,
  };
}

// ── THE EVENT, NOT ONLY THE WALL ───────────────────────────────────────────────
// Alina Sen, after the call on 26 November: CEEW wants to share the event as well. So these
// are the words for the three days and for the hour, written for the same places, with the
// room's address on the end — because the wall is the thing a stranger can actually look at,
// and a poster for a museum in another country needs somewhere to lead.
//
// Every fact is read from cartoonEvent.js, the one place the biennial's name, dates and place
// are written. Nothing new is claimed, and the hour's length is deliberately not stated: the
// programme and the invitation still disagree about it, and it is the host's to settle.
export function eventLines() {
  const room = ROOM_ADDRESS;
  const hour = HOUR_ADDRESS;
  return [
    {
      id: 'event-chat',
      where: 'The event · WhatsApp, Signal, Telegram',
      note: 'The three days, the place, and the hour that is online — in one message that fits a chat.',
      text: `${CARTOON_EVENT.biennial}: ${CARTOON_EVENT.when}, ${CARTOON_EVENT.where}. A wall of climate cartoons is part of it, and ${CARTOON_EVENT.workshop} is open online. Every drawing keeps the name of the hand that made it. The room: ${room}`,
    },
    {
      id: 'event-caption',
      where: 'The event · Instagram or Facebook',
      note: 'A caption for the three days: what it is, where, and the one part anyone in the world can join.',
      text: `${CARTOON_EVENT.biennial}\n\n${CARTOON_EVENT.when} · ${CARTOON_EVENT.where}\n\n${CARTOON_EVENT.title} — a room of climate cartoons from Africa, Asia and beyond, every drawing carrying the name of the hand that made it.\n\n${CARTOON_EVENT.workshop}, online.\n\nFree to read, no account: ${room}\n\n#CartoonAFRICA #ClimateCartoons #BeninCity #ClimateAction`,
    },
    {
      id: 'event-linkedin',
      where: 'The event · LinkedIn',
      note: 'For institutions and partners: the biennial’s own name and dates first, then the part that is open to anyone.',
      text: `The 8th CartoonAFRICA International Biennial opens on ${CARTOON_EVENT.when} at the ${CARTOON_EVENT.where}.\n\nIts subject this year is “${CARTOON_EVENT.title}”, edited by ${CARTOON_EVENT.editors}. Alongside the exhibition there is a public wall of climate cartoons, drawn from the biennial and from CEEW's What On Earth! series, where every drawing carries the name of the hand that made it and the credit that holds it. Nothing is ranked and nothing is sold.\n\n${CARTOON_EVENT.workshop} is open online, and anyone can join it.\n\nThe wall: ${room}`,
    },
    {
      id: 'event-short',
      where: 'The event · X or Bluesky',
      note: 'One line for the three days, with the address last so it stays tappable.',
      text: `${CARTOON_EVENT.biennial} · ${CARTOON_EVENT.when} · ${CARTOON_EVENT.where}. Climate cartoons from Africa, Asia and beyond, every one signed by the hand that made it: ${room}`,
    },
    {
      id: 'event-hour',
      where: 'The hour only · any channel',
      note: 'For anyone who only needs Sunday: the workshop, online, and where to read about it.',
      text: `${CARTOON_EVENT.workshop} · online · climate change and the power of collective actions and creative interventions. The hour as it is set down: ${hour}`,
    },
  ];
}

export function shareLines(count) {
  const room = ROOM_ADDRESS;
  return [
    {
      id: 'chat',
      where: 'WhatsApp, Signal, Telegram',
      note: 'Short enough for a group chat, with the address on the end so one thumb opens it.',
      text: `${wall(count)} on one wall, from Africa, Asia and beyond, gathered for the 8th CartoonAFRICA International Biennial. Every drawing keeps the name of the hand that made it, and nothing is ranked or for sale. Free, no account: ${room}`,
    },
    {
      id: 'status',
      where: 'WhatsApp status or Stories · the shortest line there is',
      note: 'For the strip of text that disappears in a day: no hashtags, no ask, one address.',
      text: `${wall(count)}, every one signed by the hand that made it. Free, no account: ${room}`,
    },
    {
      id: 'caption',
      where: 'Instagram or Facebook',
      note: 'Written as a caption: the first line carries the whole thing for whoever does not read on.',
      text: `${wall(count)}, one wall.\n\nDrawings by cartoonists in Nigeria, India, the UK and beyond, gathered for the 8th CartoonAFRICA International Biennial — and each one carries the name of the hand that made it.\n\nJanine Selendy's workshop on climate and collective action is Sunday 29 November, 3pm West Africa · 2pm UK, online.\n\nThe room is free and open, no account: ${room}\n\n#ClimateCartoons #CartoonAFRICA #ClimateAction #EditorialCartoons`,
    },
    {
      id: 'linkedin',
      where: 'LinkedIn',
      note: 'For the institutions. It leads with the credit, because the credit is the part they check.',
      text: `A wall of ${count ? count : 'the'} climate cartoons has gone up, and it will still be standing when the festival closes.\n\nThe drawings come from the 8th CartoonAFRICA International Biennial and from CEEW's What On Earth! series — hands including Anoop Radhakrishnan, Shaunak Samvatsar, Devki Deshmukh and Francis Umendu Odupute, who started the biennial in 2012.\n\nTwo things make it more than a gallery post: every drawing carries the name of the hand that made it and the credit that holds it, and nothing is ranked, counted or sold.\n\nJanine Selendy's workshop is Sunday 29 November, 3pm West Africa · 2pm UK, online. The room: ${room}`,
    },
    {
      id: 'short',
      where: 'X or Bluesky',
      note: 'One line and the address, so it stays readable when it is quoted and re-quoted.',
      text: `${wall(count)} on one wall, each signed by the hand that made it. Workshop Sunday 29 November, 2pm UK, online. Free, no account: ${room}`,
    },
    {
      id: 'email',
      where: 'One email to one person',
      note: 'For a colleague, a funder or a host: short, and the only ask is that they look.',
      subject: 'A wall of climate cartoons, every one credited',
      text: `Hello,\n\nA wall of climate cartoons is open, and it will stay open after the festival it was gathered for.\n\nIt holds ${count ? count : 'a body of'} drawings — from CEEW's What On Earth! series in India, from cartoonists in Nigeria and the UK, and from the 8th CartoonAFRICA International Biennial at the National Museum in Benin City. Each drawing carries the name of the hand that made it, the credit that holds it, and a link to where it was first published. Nothing is ranked and nothing is for sale.\n\nJanine Selendy's workshop on climate and collective action is Sunday 29 November, 3pm West Africa · 2pm UK, online.\n\nThe room: ${room}\nThe hour, as it is set down: ${HOUR_ADDRESS}\n\nIf you draw, the door on the room's own page takes a drawing and hangs it with your name on it.\n\nWith thanks,\n`,
    },
    {
      id: 'sms',
      where: 'A text message',
      note: 'Short enough to arrive whole, and it still says whose hands made the drawings.',
      text: `${wall(count)}, each signed by the hand that made it. Free, no account: ${room}`,
    },
    {
      id: 'notice',
      where: 'A printed notice · a studio wall, a classroom, a shop window',
      note: 'No link to tap, so it gives the address to say out loud and the way to walk to it. Print it as it stands.',
      text: `CLIMATE CARTOONS — A WALL, FREE TO READ\n\nDrawings from the 8th CartoonAFRICA International Biennial at the National Museum, Benin City, 28–30 November 2026, and from CEEW's What On Earth! series.\n\nEvery drawing carries the name of the hand that made it. Nothing is ranked. Nothing is sold.\n\nRead it at ${room.replace(/^https?:\/\//, '')} — or type that address and tap the room of cartoons.\n\nJanine Selendy's workshop on climate change and the power of collective actions and creative interventions: Sunday 29 November, 3pm West Africa · 2pm UK, online.`,
    },
  ];
}

export const ONE_LINE = `${CARTOON_EVENT.roomLine} Free to read, every drawing credited.`;