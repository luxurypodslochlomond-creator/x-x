// ── THREE LETTERS, ONE TUNE ────────────────────────────────────────────────────
// Brian, 26 November: "think need Scottish woodlands head office and council and
// Scottish water bri can we do all three save tune with one email?"
//
// One email cannot do all three, and the reason is practical rather than tidy: each body
// answers a different question, and a letter addressed to all of them lets each one reply
// "not us" and pass it on. Three letters, same voice, same shape — the numbered ask, the
// plain request to say so if it does not exist, the stated timescale, the rights reserved.
//
// The facts here are the ones Brian was given verbally and none of them are adopted as
// true: each is written as "I have been told", so the letter pins the claim on the person
// who made it without the record asserting it. That is the whole point of writing it down.

const SIGN = `Yours faithfully,

Brian Hughes
Upper Stoneymollan Cottage`;

export const LETTERS = [
  {
    id: 'woodlands',
    title: 'Scottish Woodlands · head office',
    sendTo:
      'The company’s head office or chief executive, using the contact on their own website — not Barry Harper’s address. The point of this one is that it arrives above him.',
    why: 'Because a written request has had no written answer, and the referral upwards was refused.',
    subject: 'Auchendennan Woodland Creation — request for a substantive response and for the permissions relied on',
    body: `Dear Sir or Madam,

I am writing to the company rather than to the officer handling this matter, because a written request has not received a written answer.

On 24 November I wrote to Barry Harper setting out six numbered matters arising from the proposed woodland creation at Auchendennan, and asked for a numbered response within 14 days. That letter supplemented my objection of 1 September, which remains outstanding.

Since then I have been told, in conversation and not in writing: that the council has given approval to use the road and to lay tarmac behind my gate at the start of the John Muir Way and the Three Lochs Way; that Scottish Water has been notified; that the forms and permissions cannot be given to me because the matter is with your legal advisers; and that I cannot be told the name of the senior person to whom this should be referred. I asked for that referral and it has not been made.

I would be grateful for the following in writing:

1. The name and role of the person with authority to amend or withdraw the proposal, and confirmation that this letter has been passed to them.
2. Whether any permission, consent or approval has been granted by any body for the use of that road or for laying tarmac on it, and by whom. If a permission exists, a copy of it.
3. Whether the works include forming, widening or surfacing a vehicular access beyond the road as it exists today, and if so, to what that access leads and for whose use.
4. Whether works are intended to begin before the six matters in my letter of 24 November are answered, and the intended start date.
5. A numbered response to each of those six matters.
6. The company's complaints procedure.

I am content to receive material by email. If any item cannot be supplied, please say which one and when it will be.

Nothing in this letter, and no silence in reply to it, amounts to agreement to the proposal or to any interference with the property, the water supply or the registered rights. All rights are reserved.

${SIGN}`,
  },
  {
    id: 'council',
    title: 'The council · roads and access',
    sendTo:
      'The council’s roads authority, and the access officer if the route is a core path. Copy the National Park Authority’s access team if the path falls inside the Park. Confirm which council covers the road before sending — do not guess it.',
    why: 'Because "the council has given the go ahead" is the claim everything else rests on, and it either exists in writing or it does not. The first numbered point is the one that settles it: public access and a public road are not the same thing.',
    subject: 'Road and access — Auchendennan, John Muir Way and Three Lochs Way: request for any permission granted',
    body: `Dear Sir or Madam,

I own Upper Stoneymollan Cottage. The access to it is the road at the start of the John Muir Way and the Three Lochs Way.

I have been told by Scottish Woodlands, acting for the adjoining landowner, that the council has given approval for the use of that road and for laying tarmac on it behind my gate, in connection with a proposed woodland creation at Auchendennan.

I am not asking you to take a view on that proposal. I am asking what exists in writing:

1. Whether that road is a public road — that is, whether it appears on the council's list of roads maintained at public expense. If it does not, on what basis vehicles are said to be entitled to use it.
2. Whether any permission, consent, licence or notice has been granted for the use of the road, or for laying tarmac on it, and under which power.
3. The conditions attached to any such consent, including vehicle weights and numbers, working hours, passing arrangements, condition surveys, and who is responsible for damage.
4. Whether any consent extends to forming, widening or surfacing a vehicular access beyond the road as it exists today, and if so, to what that access leads.
5. Whether the line of the John Muir Way or the Three Lochs Way is affected, and whether any restriction or diversion has been authorised, and by whom.
6. The officer and department holding that record.

One point, because it has been put to me as the reason the works are lawful: walkers, cyclists and horse riders using the route under the access rights in Part 1 of the Land Reform (Scotland) Act 2003 do not make a road public, those rights do not extend to motor vehicles, and they do not authorise any work on the surface.

If no such permission exists, I would be grateful for confirmation of that in writing, because that is itself the answer I need.

If this is not the correct authority for part of the request, please tell me which body holds it.

I would be grateful for a reply within 20 working days. If I do not receive one, I will make an environmental information request for the correspondence.

${SIGN}`,
  },
  {
    id: 'water',
    title: 'Scottish Water · customer and developer enquiries',
    sendTo:
      'Scottish Water’s published customer or developer enquiry route. Keep it to the water question only — a letter that also argues about trees invites a reply about trees.',
    why: 'Because "Scottish Water has been notified" is the easiest of the three claims to check, and the supply is a private pipe off their mains.',
    subject: 'Auchendennan — proposed woodland creation and works near a private service pipe: request for written confirmation',
    body: `Dear Sir or Madam,

I own Upper Stoneymollan Cottage. My domestic water supply is Scottish Water mains, delivered through a privately owned service pipe that runs beneath the access road at the start of the John Muir Way and the Three Lochs Way.

I have been told by Scottish Woodlands, acting for the adjoining landowner, that Scottish Water has been notified of proposed works at Auchendennan, including the use of that road and the laying of tarmac.

I would be grateful for confirmation in writing of:

1. Whether Scottish Water has been consulted or notified about these works, and on what date.
2. Whether any permit, consent or approval is required for works in the vicinity of Scottish Water assets, or of a private service pipe connected to the mains, and whether one has been granted.
3. Whether the works as described could affect the continuity, pressure or quality of the supply to my property, and what protection is required of the party carrying them out.
4. Who at Scottish Water holds the record of any notification, so that it can be requested.

If Scottish Water has no record of being notified, I would be grateful if you would say so plainly.

${SIGN}`,
  },
];