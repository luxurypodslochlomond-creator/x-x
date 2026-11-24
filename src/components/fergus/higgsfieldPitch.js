// Fergus's note to Higgsfield. Written from what Brian told me on 24 November 2026:
// 17, semi-professional footballer with Shotts Bon Accord and their youngest ever
// signing, and cutting hair from a chair at the house with his own clients.
//
// What it deliberately does NOT contain: that he is skint, that a car deal went wrong,
// or anything that asks to be judged kindly. Robin's advice was right — hungry and
// disciplined, spoken plainly, no victim mindset — and the way to show that is to say
// what he will deliver and offer the numbers, not to explain what he lacks.

export const SUBJECT = 'Creator Partnership — Fergus Hughes, 17, barber and semi-pro footballer';

export const PITCH = `Hi,

I'm Fergus Hughes, 17, from Glasgow.

I'm a barber, and I play semi-professional football. I signed for Shotts Bon Accord as their record signing, and I cut hair from a chair at my house — my own clients, my own bookings, my own money.

I've been filming my cuts for a while, but with a phone and no real plan. I want to use Higgsfield properly: to make the kind of clips that stop someone scrolling, and to build an audience I actually own rather than rent.

Three things I'd make first:

1. A weekly cut series — one transformation, filmed properly, from the first clip to the finished fade.
2. Match-day edits — football content with the same finish as the big accounts.
3. Ads for my own chair, so the videos start paying for themselves.

I'll post consistently, I'll learn the tools properly, and I'll send you the numbers every month — views, followers, bookings. If it isn't working, you'll see it in the numbers before I do.

A friend, Robin, put me onto this.

Fergus Hughes
Instagram / TikTok: [your handle]
Phone: [your number]`;

// The four things Robin said, turned into what they actually look like on the page.
export const ROBIN_LINES = [
  {
    said: 'Show them you are hungry',
    looks: 'Not a claim — evidence. Training, a chair, his own bookings, at 17. That is already in the letter.',
  },
  {
    said: 'Show them you are disciplined',
    looks: 'Promise one series on one day each week, and then never miss it. A schedule kept is worth more than a big idea.',
  },
  {
    said: 'Show them you can speak clearly',
    looks: 'Short sentences. No adjectives doing the work. The letter above is about 220 words on purpose.',
  },
  {
    said: 'No victim mindset',
    looks: 'Nothing about being skint, the car, or being overlooked. What he will deliver, and the numbers to check it by.',
  },
];

// What Higgsfield's own pages actually say, checked 24 November 2026. This is the part that
// should settle Fergus's nerves: there is no follower floor, so he is not under-qualified.
export const WHAT_THEY_WANT = [
  {
    label: 'No follower floor, no portfolio requirement',
    text: 'Higgsfield states plainly that there is no follower minimum and no portfolio requirement, and that anyone creating with AI can apply — from a first audience to industry veterans. Every application gets an individual response. He is not too small to apply.',
    href: 'https://higgsfield.ai/blog/creator-partnership-program',
  },
  {
    label: 'The form asks for four things',
    text: 'Platforms, total audience, country, and a link to recent work. That is the whole ask. His answer is Glasgow, Scotland, a phone, and the 60-second video — which is why the video matters more than anything else he sends.',
    href: 'https://higgsfield.ai/creator-hub/help-center/business/how-do-i-join-a-partnership-or-creator-program',
  },
  {
    label: 'There are three programmes, and they pay differently',
    text: 'The Creator Partnership Programme is the partnership: monthly credits, early access to models, a private partner community and a direct line to the team. Higgsfield Earn runs paid campaigns and is open to creators of any size — that is the one that actually pays him. The affiliate route pays a share on referrals. Apply to the partnership, and ask about Earn in the same breath.',
    href: 'https://higgsfield.ai/creator-hub/help-center/business/how-do-i-join-a-partnership-or-creator-program',
  },
  {
    label: 'They publicly say they need different people',
    text: 'Higgsfield states it needs creators with different faces, voices, niches and editing styles, because campaigns need dozens of hooks. That is the argument: a 17-year-old barber from Glasgow who draws and plays piano is not a weaker applicant than a polished studio — he is a niche they do not have.',
    href: 'https://higgsfield.ai/creator-partnership-program',
  },
  {
    label: 'Who to write to',
    text: 'The form on the CPP page is the door. For partnership and brand enquiries the published address is marketing@higgsfield.ai. Their blog promises a direct contact once accepted, so the form is the honest route in — not a cold email to a stranger.',
    href: 'https://higgsfield.ai/creator-hub/help-center/business/how-do-i-join-a-partnership-or-creator-program',
  },
];

// The honest answer to Brian's question, kept here rather than softened in chat.
export const HIRE_VERDICT = {
  answer: 'Yes — with one gap.',
  hire: 'The work is real: a chair, his own bookings, his own money, at 17, and a football club that paid to sign him. That is not a story about wanting it, it is a record of having done it. Brands are not short of keen; they are short of people who turn up on a Tuesday and deliver. His own chair proves he already does.',
  gap: 'The form asks for a link to recent work, and right now there is nothing to click. That is the only thing standing between this note and a yes. Three posted clips fixes it — they do not have to be good, they have to exist.',
  why: 'And the thing he has that nobody else applying has: he draws, he paints, he plays. For a company selling AI video, a creator who can draw the frame before the machine fills it is not a nice extra. It is the job.',
};

// Where the letter risks reading as a confident dobber, and the fix. Asked directly by Brian.
export const TONE_CHECK = [
  {
    line: '"I\'m not asking for a favour."',
    verdict: 'Cut it. This was the one line that could read as a chip on the shoulder.',
    why: 'It announces humility instead of showing it, and it puts the word "favour" in a stranger\'s head. It is already gone from the letter above.',
    done: true,
  },
  {
    line: '"You\'ll get the videos, and I\'ll send you the numbers. That\'s it."',
    verdict: 'Keep — but only if he can say it without smiling at himself.',
    why: 'On camera this is the strongest line in the film. In writing it would be too much. Read it flat and it sounds certain; read it with a grin it sounds like a lad.',
  },
  {
    line: '"I\'m not there to make up the numbers."',
    verdict: 'Fine on the football page, wrong for Higgsfield.',
    why: 'That page is for a coach who wants exactly that attitude. A video company has not asked him to be tough, so it would land as noise. It stays where it belongs.',
  },
  {
    line: '"If it isn\'t working, you\'ll see it in the numbers before I do."',
    verdict: 'This is the line that makes him look grown up.',
    why: 'It is the only line in the whole letter where he is not selling himself. Self-awareness reads as confidence; self-praise reads as the opposite.',
  },
  {
    line: 'Silence, mostly.',
    verdict: 'The real answer: he does not sound like a dobber because he barely says anything about himself.',
    why: 'Every line is a fact or a promise. No adjectives, no "passionate", no "huge opportunity". That restraint is the whole reason it works — so the biggest risk is him adding to it. Send it as it is.',
  },
];

// The walk-through, in order, with nothing assumed.
export const STEPS = [
  {
    n: '01',
    what: 'Sign up free at higgsfield.ai and use the free credits for a week.',
    why: 'So that when he writes "I want to use Higgsfield properly" he has actually used it. Nothing in the letter needs changing — but a person who has made ten clips talks differently in a reply than one who has made none.',
  },
  {
    n: '02',
    what: 'Post three clips this week. Rough is fine.',
    why: 'This is the only step he cannot skip. The form asks for a link to recent work, and an empty link is the whole application. Three posts on one account is enough to click.',
  },
  {
    n: '03',
    what: 'Film the 60 seconds, upload to YouTube as Unlisted, copy the link.',
    why: 'Unlisted plays for anyone with the link and does not show up in search. Check it opens in a private window on a phone before sending — if it asks for a sign-in, it is Private and the reviewer will see nothing.',
  },
  {
    n: '04',
    what: 'Open the Creator Partnership form and fill the four boxes honestly.',
    why: 'Platforms, total audience, country, link to recent work. Audience means the real number — 40 is a real number and nobody is judging it, because there is no follower floor. Never round it up; a checked figure that does not match is the only thing here that would actually cost him.',
  },
  {
    n: '05',
    what: 'Paste the note into the message box, or send it to marketing@higgsfield.ai with the subject line above.',
    why: 'Both routes are legitimate. If the form has a notes field, the form is enough; the email is for when it does not.',
  },
  {
    n: '06',
    what: 'End with one easy question.',
    why: 'Something like: "Is Earn open to someone starting out, or is that for later?" A question gives them a reason to reply that costs them one sentence. It also gets the paid side mentioned without asking for money.',
  },
  {
    n: '07',
    what: 'Wait two weeks. Then send one short follow-up. Then stop.',
    why: 'One follow-up reads as organised. Two reads as pressure. The follow-up should be one line: "Still keen — here is this week\'s clip." Attach the work, not the ask.',
  },
  {
    n: '08',
    what: 'Post the series anyway, starting Monday.',
    why: 'The work is the application; the form is only the door. If they say no this month, a month of clips makes the next application a different document entirely.',
  },
];

// Things that work on every platform, learned the hard way by everyone who does this.
export const UGC_TIPS = [
  'The first two seconds decide the whole video. Start mid-action — clippers already moving, pencil already on paper. Never start with a greeting.',
  'One idea per clip. If it needs a second idea, it is two clips.',
  'Captions always on. Most people watch with the sound off, and a silent video with no words is a video nobody watched.',
  'Post the same file to TikTok, Reels and Shorts. Three doors, one piece of work.',
  'Answer every comment in the first hour. The algorithm reads replies, and so do brands looking at the account.',
  'Keep every clip in one folder. The first thing a brand asks for after yes is b-roll.',
  'Never delete a video that flopped. It is evidence he turns up, and nobody else is looking at the view count.',
  'Say the price only when asked, and never drop it in a DM to seem easy. The number is the same on the second message as the first.',
  'Deliver one day early, once. Cheapest reputation he will ever buy.',
  'Send the numbers unasked after the first job — views, saves, comments. Nobody else does this, and it is the reason they come back.',
];

export const BEFORE_SENDING = [
  'Replace the two bracketed lines at the foot with his real Instagram or TikTok handle and his number. Nothing else in the letter needs editing.',
  'The video is the one thing they actually asked for: film the 60 seconds on the next page, upload it to YouTube as Unlisted, and put that link in the form and in the note.',
  'Apply through the Creator Partnership Program form on higgsfield.ai — that is the door. Their affiliate@ address is for established creators, so do not rely on an email getting read. If they reply from an address, answer it that day.',
  'Do not send the football profile page instead of this. That one is for a coach; this one is for a video company.',
  'If they ask for numbers and he does not have them yet, say so plainly and give the date he will. Never invent a figure.',
];