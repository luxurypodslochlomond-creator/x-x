// ── TWO WORDS ABOUT PEOPLE, WRITTEN ONCE ───────────────────────────────────────
// Brian, 17 November 2026: "should we change keepers word everywhere to custodians …
// better word than checkers, that would resonate slightly bit for right reasons."
//
// KEEPER → CUSTODIAN. A keeper sounds like a person who holds something still, and the
// record's role is not to hold the record still but to answer for it. CUSTODIAN is the word
// museums and archives use: somebody who looks after a thing that is not theirs, on behalf
// of people they will never meet. That sentence is the whole of this record's ethic.
//
// CHECKER → SIGNATORY → WITNESS. "Checker" sounded like a job at a barrier and invited the
// one misreading this record must never allow: that these are the people who decide what is
// true. "Signatory" was honest and legal but cold. Brian, 17 November: "witness is less
// harsh than attestor and has truth associated and people will love it." He is right, and
// the word only holds if the record says what was witnessed — the source, never the event.
// A witness to a link that opened is telling the truth; a witness to a flood they never saw
// would be telling a lie. So the role is WITNESS, the room is the witnesses’ room, and the
// line on an entry still says who put it there and when it was checked.
//
// ── RE-CHECKED, 26 NOVEMBER, AGAINST THE WORRY THAT THEY SOUND LIKE POWER ────────
// Brian: "is keepers making us feel greedy or power bro … is it custodians and witnesses or
// witnesses too strong." The worry is the right one and the answer is that these two words
// are the two that carry no power at all.
//
// A KEEPER holds something: a gatekeeper, a shopkeeper, a zoo's keeper. That is possession,
// and it was the word to lose. A CUSTODIAN holds a thing that is not theirs, for people they
// will never meet — in law they have duties and no title, and in Britain the custodian is
// also the person who cleans the building. Neither reading is powerful. Greed has no route
// in through it, because a custodian cannot own what they look after.
//
// WITNESS is not too strong, provided the record keeps its own rule: a witness says what was
// witnessed — the source, never the event. On that rule the word is the humblest on the page,
// because a witness decides nothing. They have no vote, no veto and no say in what is true;
// they say what they saw and put their name under it. "Verifier" or "attestor" would claim
// authority. Witness claims only eyes.
//
// The check found the vocabulary consistent in every label a reader sees, and two leaks of
// the retired word, both now fixed: the Wire's authorship panel ("The keeper who signed it")
// and the letter offered to a host ("a checker corps", "who keep it").
//
// WHAT THESE CONSTANTS ARE NOT. They are not the data. The code still says keeper and
// checker in field names, routes and function names (ClimateChecker.is_keeper,
// /ClimateKeeperRoom, checkerQueue …), because renaming stored fields is a migration and a
// migration is a day of risk for a word a reader never sees. This module is the one place
// the *reader's* words live, so the next change of mind is one file and not eighty.
export const CUSTODIAN = 'custodian';
export const CUSTODIANS = 'custodians';
export const CUSTODIANS_ROOM = 'Custodians’ room';

// "Signed by" is what an entry carries; "witness" is what the person is called in a
// sentence; "Witnesses" heads the list on the guest list.
export const SIGNED_BY = 'Signed by';
export const WITNESS = 'witness';
export const WITNESSES = 'witnesses';
export const WITNESSES_ROOM = 'Witnesses’ room';

// Kept so older imports never break: the same role, the word it used to wear.
export const SIGNATORY = WITNESS;
export const SIGNATORIES = WITNESSES;

// Capitalised where a list heading or a label needs it.
export const CUSTODIANS_TITLE = 'Custodians';
export const WITNESSES_TITLE = 'Witnesses';
export const SIGNATORIES_TITLE = WITNESSES_TITLE;