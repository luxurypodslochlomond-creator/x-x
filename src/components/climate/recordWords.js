// ── TWO WORDS ABOUT PEOPLE, WRITTEN ONCE ───────────────────────────────────────
// Brian, 17 November 2026: "should we change keepers word everywhere to custodians …
// better word than checkers, that would resonate slightly bit for right reasons."
//
// He is right, and the reasons are worth writing down so nobody has to re-argue it.
//
// KEEPER. It was doing two jobs badly. A keeper sounds like a person who holds something
// still — a zoo keeper, a gatekeeper — and the record's role is not to hold the record
// still but to answer for it: to say yes, or not yet, in their own name, and to be the
// person a reader can hold to that. CUSTODIAN is the word museums and archives use for
// exactly this: somebody who looks after a thing that is not theirs, on behalf of people
// they will never meet. That sentence is the whole of this record's ethic, and the word
// now says it in one go. It also stops the role sounding like a rank, which is the thing
// that made "keeper" grate.
//
// CHECKER. This one was worse. A checker checks — and a record whose entire claim is that
// it can be questioned cannot call the people who question it "checkers": the word sounds
// like a job at a barrier, and it invites the one misreading this record must never allow,
// that these are the people who decide what is true. They do not decide anything. They read
// what somebody else has already written, after the person who wrote it, and put their name
// to what they found.
//
// SECOND READER — and then SIGNATORY. The first replacement was honest and boring, and
// Brian said so on the same day: "sounds boring as fuck." He is right again. A record that
// prints x = x at the foot of every page does not get to call its most human act "the
// second reader". What these people actually do is put their name to somebody else's
// words, which is one of the oldest things a person can do with a record, and the name for
// it is as old as Roman law: a SIGNATORY is one who signs. So the role is the signatory,
// the line on an entry is "Signed by", and the list of them is the signatories. Nothing
// about what they may or may not do has changed — not one permission, not one button.
//
// WHAT THESE CONSTANTS ARE NOT. They are not the data. The code still says keeper and
// checker in its field names, routes and function names (ClimateChecker.is_keeper,
// /ClimateKeeperRoom, climateAccessChange …), because renaming stored fields is a migration
// and a migration is a day of risk for a word a reader never sees. This module is the one
// place the *reader's* words live, so the next change of mind is one file and not eighty.
export const CUSTODIAN = 'custodian';
export const CUSTODIANS = 'custodians';
export const CUSTODIANS_ROOM = 'Custodians’ room';

// "Signed by" is what an entry carries; "signatory" is what the person is called in a
// sentence; "Signatories" heads the list on the guest list.
export const SIGNED_BY = 'Signed by';
export const SIGNATORY = 'signatory';
export const SIGNATORIES = 'signatories';

// Capitalised where a list heading or a label needs it.
export const CUSTODIANS_TITLE = 'Custodians';
export const SIGNATORIES_TITLE = 'Signatories';